// useWebSocket.js
import { ref } from 'vue'

interface Options {
  // websocket url
  url: string
  // 接收消息出发事件
  receiveFun?: ((data: any) => void) | null
  // 心跳数据
  heartBeatData?: string
  // 心跳间隔，单位ms
  heartBeatInterval?: number
  // 断线重连间隔，单位ms
  reconnectInterval?: number
  // 最大重连次数
  maxReconnectAttempts?: number
}

interface State {
  // websocket配置
  options: Required<Options>
  // websocket实例
  socket: WebSocket | null
  // 心跳发送定时器
  heartBetaSendTimer: NodeJS.Timeout | null
  // 心跳超时定时器
  heartBetaTimeoutTimer: NodeJS.Timeout | null
  // 重连次数
  reconnectAttempts: number
  // 重连定时器
  reconnectTimeout: NodeJS.Timeout | null
}

enum SocketStatus {
  Connecting = '正在连接...',
  Connected = '连接已建立',
  Disconnecting = '连接正在关闭',
  Disconnected = '连接已断开'
}

const DEFAULT_OPTIONS: Required<Options> = {
  // websocket url
  url: '',
  // 你的心跳数据
  heartBeatData: '',
  // 心跳间隔，单位ms
  heartBeatInterval: 10 * 1000,
  // 断线重连间隔，单位ms
  reconnectInterval: 5 * 1000,
  // 最大重连次数
  maxReconnectAttempts: 10,
  // 接收消息触发事件
  receiveFun: null
}

export default (options?: Options) => {
  const state: State = {
    options: { ...DEFAULT_OPTIONS, ...options },
    socket: null,
    heartBetaSendTimer: null,
    heartBetaTimeoutTimer: null,
    reconnectAttempts: 0,
    reconnectTimeout: null
  }

  // 连接状态
  const status = ref<SocketStatus>(SocketStatus.Disconnected)

  // 关闭code
  const SocketCloseCode = 1000

  // 相应消息
  const message = ref<string>()

  // 连接
  const connect = () => {
    disconnect()
    status.value = SocketStatus.Connecting
    state.socket = new WebSocket(state.options.url)

    // websocket 连接成功
    state.socket.onopen = (openEvent) => {
      console.log('socket连接:', openEvent)
      status.value = SocketStatus.Connected
      state.reconnectAttempts = 0
      startHeartBeat()
    }

    // 收到消息
    state.socket.onmessage = (msgEvent) => {
      // 收到任何数据，重新开始心跳
      startHeartBeat()
      console.log('socket消息:', msgEvent)
      state.options.receiveFun && state.options.receiveFun(msgEvent.data)
      message.value = msgEvent.data
    }

    // 断开
    state.socket.onclose = (closeEvent) => {
      console.log('socket关闭:', closeEvent)
      status.value = SocketStatus.Disconnected
      if (closeEvent.code !== SocketCloseCode) {
        reconnect()
      }
    }

    //  错误
    state.socket.onerror = (errEvent) => {
      console.log('socket报错:', errEvent)
      status.value = SocketStatus.Disconnected
      reconnect()
    }
  }

  // 发送消息
  const onSend = (data: string) => {
    if (status.value === SocketStatus.Connected) {
      state.socket?.send(data)
    }
  }

  // 断开
  const disconnect = () => {
    // 连接断开了，同时停止心跳
    stopReconnect()
    if (state.socket && (state.socket.OPEN || state.socket.CONNECTING)) {
      console.log('socket断开连接')
      status.value = SocketStatus.Disconnecting
      state.socket.onmessage = null
      state.socket.onerror = null
      state.socket.onclose = null // 发送关闭帧给服务端
      state.socket.close(SocketCloseCode, 'normal closure')
      status.value = SocketStatus.Disconnected
      state.socket = null
    }
  }

  // 发送心跳
  const startHeartBeat = () => {
    onHeartBeat(() => {
      if (status.value === SocketStatus.Connected) {
        state.socket?.send(state.options.heartBeatData)
        console.log('socket心跳发送:', state.options.heartBeatData)
      }
    })
  }

  // 心跳
  const onHeartBeat = (callback: () => void) => {
    state.heartBetaSendTimer = setTimeout(() => {
      callback && callback()
      stopHeartBeat()
      onHeartBeat(callback) // 发送完心跳，继续发送下一次心跳
    }, state.options.heartBeatInterval)
  }

  // 停止心跳
  const stopHeartBeat = () => {
    state.heartBetaSendTimer && clearTimeout(state.heartBetaSendTimer)
    state.heartBetaTimeoutTimer && clearTimeout(state.heartBetaTimeoutTimer)
  }

  // 重连方法
  const reconnect = () => {
    if (
      status.value === SocketStatus.Connected ||
      status.value === SocketStatus.Connecting
    ) {
      return
    }
    stopHeartBeat()
    if (state.reconnectAttempts < state.options.maxReconnectAttempts) {
      console.log('socket重连:', state.reconnectAttempts) // 重连间隔，5秒起步，下次递增1秒
      const interval = Math.max(
        state.options.reconnectInterval,
        state.reconnectAttempts * 1000
      )
      console.log('间隔时间：', interval)
      state.reconnectTimeout = setTimeout(() => {
        if (
          status.value !== SocketStatus.Connected &&
          status.value !== SocketStatus.Connecting
        ) {
          connect()
        }
      }, interval)
      state.reconnectAttempts += 1
    } else {
      status.value = SocketStatus.Disconnected
      stopReconnect()
    }
  }

  // 停止重连
  const stopReconnect = () => {
    state.reconnectTimeout && clearTimeout(state.reconnectTimeout)
  }

  return {
    message,
    connect,
    onSend,
    disconnect
  }
}
