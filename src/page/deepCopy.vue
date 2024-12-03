<template>
    <div class="h-[100%]">
        <div class="text-center text-[32px] font-bold py-3">深拷贝</div>
        <CodeMirror dark disabled v-model="script"
            :code-style="{ width: '100%', height: 'calc(100% - 50px)', fontSize: '18px' }" />
    </div>
</template>
<script setup lang="ts">
import { deepCopy, deepCopyText } from '../utils/deepCopy'
import CodeMirror from '@/components/CodeMirror/index.vue'

const script = ref<string>(deepCopyText);
</script>