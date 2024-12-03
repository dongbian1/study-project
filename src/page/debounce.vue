<template>
  <div class="h-[100%]">
    <div class="text-center text-[32px] font-bold pt-3">防抖</div>
    <div class="text-center pb-3">
      <div class="mb-3">结果集：{{ count }}</div>
      <t-button @click="addCount">数据+1</t-button>
    </div>
    <CodeMirror
      dark
      disabled
      v-model="script" 
      :code-style="{ width: '100%', height: 'calc(100% - 120px)', fontSize: '18px' }"
    />
  </div>
</template>
<script setup lang="ts">
import debounce, { debounceText } from '../utils/debounce'
import CodeMirror from '@/components/CodeMirror/index.vue'

const script = ref<string>(debounceText);
const count = ref<number>(0)

const addCount = debounce(() => {
  count.value++
}, 2000)

</script>