<template>
  <div class="flex flex-col items-center justify-center" :style="containerStyle">
    <div>123123</div>
    {{ type }}
    <span :style="{ color: '#fff', fontWeight: 600, fontSize: 16 }">
      {{ text }}
    </span>
  </div>
</template>
<script setup lang="tsx">
import { NodeData } from "@antv/g6";

const ACTIVE_COLOR = "#f6c523";

const COLOR_MAP = {
  "pre-inspection": "#3fc1c9",
  problem: "#8983f3",
  inspection: "#f48db4",
  solution: "#ffaa64",
};

const props = defineProps<{ data: NodeData }>();

// 节点是否被选中
const isHovered = computed(() => props.data.states?.includes("active"));

// 节点类型
const type = computed(() => props.data.type);

// 节点文本
const text = computed(() => props.data.text);

// 节点颜色
const color = computed(() =>
  isHovered.value ? ACTIVE_COLOR : COLOR_MAP[type.value as keyof typeof COLOR_MAP]
);

// 容器样式 - 使用color.value而不是color引用
const containerStyle = computed(() => ({
  width: "100px",
  height: "100px",
  background: color.value,
  border: `3px solid ${color.value}`,
  borderRadius: 16,
  cursor: "pointer",
}));

onMounted(() => {
  console.log("node mounted");
})
</script>
