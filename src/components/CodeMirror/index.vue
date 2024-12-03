<template>
    <Codemirror 
        v-model="props.modelValue"
        :style="codeStyle" 
        :extensions="extensions" 
        v-bind="$attrs"
        @ready="handleReady"
        @change="onChange" 
        @focus="onFocus" 
        @blur="onBlur"
    />
</template>
<script setup lang="ts">
interface Props {
    modelValue: string; // 代码字符串
    codeStyle?: CSSProperties; // 代码样式
    dark?: boolean; // 是否暗黑主题
}
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';


const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    codeStyle: () => ({
        width: '1000px',
        height: '190px',
        fontSize: '16px'
    }),
    dark: false,
    code: '',
});

const emits = defineEmits([
    'update:modelValue',
    'ready',
    'change',
    'focus',
    'blur',
]);

const extensions = props.dark ? [javascript(), oneDark] : [javascript()];

/**
 * 初始化
 */
const handleReady = (payload: any) => {
    emits('ready', payload);
}

/**
 * 代码变化
 * @param value 代码字符串
 * @param viewUpdate 
 */
const onChange = (value: string, viewUpdate: any) => {
    emits('update:modelValue', value);
    emits('change', value, viewUpdate);
}

/**
 * 获取焦点
 * @param view CodeMirror实例
 */
const onFocus = (view: any) => {
    emits('focus', view);
}

/**
 * 失去焦点
 * @param view CodeMirror实例
 */
const onBlur = (view: any) => {
    emits('blur', view);
}
</script>
<style lang="scss" scoped>
:deep(.cm-editor) {
    border-radius: 8px;
    outline: none;
    border: 1px solid transparent;

    .cm-scroller {
        border-radius: 8px;
    }
}

:deep(.cm-focused) {
    border: 1px solid fade(#000, 48%);
}
</style>