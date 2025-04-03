<template>
    <MonacoEditor v-model="code" height="100" width="100" />
</template>
<script setup lang="ts">
import MonacoEditor from '@/components/MonacoEditor/index.vue'

const code = ref<string>('')
</script>