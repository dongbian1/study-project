<template>
    <div class="flex flex-col items-center justify-center h-[100%]">
        <div>我是第一个请求：{{ result[1] }}</div>
        <div>我是第二个请求：{{ result[2] }}</div>
        <div>我是第三个请求：{{ result[3] }}</div>
        <div>我是第四个请求：{{ result[4] }}</div>
        <div class="mt-5">
            <t-button @click="run" :loading="useLoading">发送请求</t-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useLoading } from '@/hooks/loading';

// type Result = ['1','2','3','4']
// type ResultField = Result[number]
// type GenerateObject = {[k in ResultField]: string | null}

type ResultField<Count extends number,Result extends string[] = []> = Result['length'] extends Count ? 
    Result[number] 
        : ResultField<Count, [...Result, `${Result['length']}`]>
type GenerateObject<Count extends number> = {[k in ResultField<Count>]: string | null}

type ResultData = Omit<GenerateObject<5>, '0'>

const result = ref<ResultData>({
    1: null,
    2: null,
    3: null,
    4: null,
});

const request = (time: number, key: keyof ResultData) => {
    return new Promise((resolve) => {
        useLoading.value = true
        setTimeout(() => {
            result.value[key] = '完成'
            useLoading.value = false
            resolve(true)
        }, time)
    })
}

const run = async () => {
    Object.keys(result.value).forEach((key, index) => {
        result.value[key as keyof ResultData] = null
        request((index + 1) * 1000, key as keyof ResultData)
    })
}

</script>                                                                