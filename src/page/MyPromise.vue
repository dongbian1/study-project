<template>
  <div class="h-[100%]">
    <h1 class="text-center text-[32px] font-bold pt-3">MyPromise</h1>
    <div class="text-center leading-8 my-3">
      <p>Promise状态: {{ promiseStatus }}</p>
      <p>Promise结果: {{ promiseResult }}</p>
      <t-button @click="onTest">触发</t-button>
    </div>
    <CodeMirror
      dark
      disabled
      v-model="script" 
      :code-style="{ width: '100%', height: 'calc(100% - 160px)', fontSize: '18px' }"
    />
  </div>
</template>

<script setup lang="ts">
import MyPromise, { SimplePromiseText } from '../utils/Promise'
import CodeMirror from '@/components/CodeMirror/index.vue'

const script = ref<string>(SimplePromiseText);

const promiseStatus = ref<string>('')
const promiseResult = ref<string>('')

const onTest = () => {
  const promise = new MyPromise<string>((resolve) => {
    setTimeout(() => {
      resolve('成功')
    }, 5000)
  })

  promise.then((res) => {
    promiseStatus.value = 'resolved'
    promiseResult.value = res
    console.log(res)
    return 'then2:成功'
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    promiseStatus.value = 'rejected'
    promiseResult.value = err
  })
}
</script>