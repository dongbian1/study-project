<template>
  <div :style="style" ref="editor" />
</template>

<script setup lang="ts">
import { useMonacoEditor } from "./config";
import { onMounted, ref, toRaw, watch } from "vue";
import type { EditorOptions, MonacoEditorProps } from "./type";

// 默认配置
const defaultOptions: EditorOptions = {
  language: "python",
  theme: "Dark",
  minimap: { enabled: false },
  fontSize: 14,
  scrollBeyondLastLine: false,
  readOnly: false,
  completionKeywords: {
    keywords: ["myVar", "customAPI"],
    documentation: "项目自定义变量",
  },
};

const emits = defineEmits(["update:modelValue"]);

// 使用接口定义props
const props = withDefaults(defineProps<MonacoEditorProps>(), {
  width: "100%",
  height: "100%",
});

// 编辑器div ref
const editor = ref();

// 获取编辑器初始化事件
const { wrapper, initClientsEdit } = useMonacoEditor(
  "ws://101.42.40.199:18083/pylsp"
);

/**
 * 编辑器样式
 */
const style = computed(() => {
  return {
    height: `${props.height}${
      typeof props.height === "number"
        ? "px"
        : props.height.toString().indexOf("%") === -1
        ? "%"
        : ""
    }`,
    width: `${props.width}${
      typeof props.width === "number"
        ? "px"
        : props.width.toString().indexOf("%") === -1
        ? "%"
        : ""
    }`,
  };
});

/**
 * 初始化编辑器
 */
const init = () => {
  if (!editor.value) return;
  initClientsEdit(
    editor.value,
    {
      ...defaultOptions,
      ...props.options,
      value: props.modelValue,
    },
    (val: string) => {
      emits("update:modelValue", val);
    }
  );
};

onMounted(() => {
  init();
});

onUnmounted(() => {
  // 卸载编辑器
  toRaw(wrapper.value)?.dispose();
});
</script>
