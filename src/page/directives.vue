<template>
    <div class="flex flex-col items-center justify-center h-[100%]">
        <div>我是一个请求：{{ result }}</div>
        <div class="mt-5">
            <t-button v-click.loading="request" :loading="useLoading">发送请求</t-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useLoading } from '@/hooks/loading';

const result = ref<string>('')

const request = () => {
    result.value = '请求中...'
    return new Promise((resolve) => {
        setTimeout(() => {
            result.value = '完成'
            resolve(true)
        }, 3000)
    })
}
</script>