import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({
    port: 3000
})

wss.on('connection', (ws: WebSocket, req: any) => {
    console.log(ws, req)
})

console.log('ws server is running on port 8080')