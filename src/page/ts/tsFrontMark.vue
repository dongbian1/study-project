<template>
    <div class="h-[100%]">
        <div class="text-center text-[32px] font-bold py-3">前置的不定量参数类型</div>
        <CodeMirror dark disabled v-model="script"
            :code-style="{ width: '100%', height: 'calc(100% - 50px)', fontSize: '18px' }" />
    </div>
</template>
<script setup lang="ts">
import CodeMirror from '@/components/CodeMirror/index.vue'

const script = ref<string>(`
type JSTypeMap = {
    string: string;
    number: number;
    boolean: boolean;
    symbol: symbol;
    bigint: bigint;
    undefined: undefined;
    object: object;
    function: Function;
}

type JSType = keyof JSTypeMap;

type Transfer<T extends JSType> = {
    [p in keyof T]: JSTypeMap[T[p]]
}

declare function addImpl<T extends JSType>(...args: [
    ...T,
    (...args: Transfer<T>) => any
]): void;

const addImpl = ('boolean', 'bigint', 'string', (a, b, c) => {})

`);
</script>