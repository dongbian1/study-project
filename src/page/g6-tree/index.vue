<template>
  <div ref="containerRef" style="height: 100%" />
</template>

<script setup lang="tsx">
import { ExtensionCategory, Graph, NodeData, register } from "@antv/g6";

import dataJson from "./data.json";
import HoverElement from "./activate/HoverElement";
import Node from "./component/node.vue";

const ACTIVE_COLOR = "#f6c523";

const COLOR_MAP = {
  "pre-inspection": "#3fc1c9",
  problem: "#8983f3",
  inspection: "#f48db4",
  solution: "#ffaa64",
};

const containerRef = ref<HTMLDivElement>();

const graph = ref<Graph>();

const graphData = ref<any>();

const obtainSize = (data: NodeData): [number, number] => {
  if (!data.data) return [200, 80];
  switch (data.data?.type) {
    case "pre-inspection":
      return [240, 120];
    case "problem":
      return [200, 120];
    case "inspection":
      return [330, 100];
    case "solution":
      return [200, 120];
    default:
      return [200, 80];
  }
};

const intiGraph = () => {
  graph.value = new Graph({
    container: containerRef.value,
    layout: {
      type: "dendrogram",
      direction: "LR", // 水平布局，从左到右
      nodeSep: 200, // 增加同级节点间距
      rankSep: 400, // 增加层级间距
    },
    node: {
      type: "html",
      style: {
        innerHTML: (data: NodeData) => {
          // 是否选中
          const isHovered = data.states?.includes("active");

          // 类型
          const type = data.data?.type;

          // 模块颜色
          const color = isHovered
            ? ACTIVE_COLOR
            : COLOR_MAP[type as keyof typeof COLOR_MAP];

          const size = obtainSize(data);

          // 模块样式
          const style = {
            width: `${size[0]}px`,
            height: `${size[1]}px`,
            background: color,
            border: `3px solid ${color}`,
            borderRadius: 16,
            cursor: "pointer",
          };

          // 是否显示折叠按钮
          const isFold = graphData.value.edges.filter(
            (item: any) => item.source === data.id
          );

          return `<div style="${Object.entries(style)
            .map(([key, value]) => `${key}: ${value}`)
            .join(";")}">
              <div style="padding: 10px 20px; font-size: 14px; color: #fff;">
                ${data.data?.text}
                ${
                  isFold.length > 0
                    ? `<span style="float: right; font-size: 20px; cursor: pointer;">${
                        isFold.length > 0 ? "-" : "+"
                      }</span>`
                    : ""
                }</div>
              </div>
            </div>`;
        },
        size: (data: NodeData) => obtainSize(data),
      },
      state: {
        active: {
          halo: false,
        },
        selected: {
          halo: false,
        },
      },
    },
    edge: {
      type: "polyline",
      style: {
        stroke: "#8b9baf",
        endArrow: true,
        labelBackgroundRadius: 4,
        router: {
          type: "orth",
        },
      },
      state: {
        active: {
          stroke: "#1890ff",
          lineWidth: 2,
        },
      },
    },
    behaviors: ["zoom-canvas", "drag-canvas", "hover-element"],
  });
};

const getData = () => {
  if (graph.value) {
    toRaw(graph.value).setData(dataJson);
    toRaw(graph.value).render();
    graphData.value = dataJson;

    // 设置数据
    HoverElement.setData(graphData.value);
    register(ExtensionCategory.BEHAVIOR, "hover-element", HoverElement);
  }
};

onMounted(() => {
  intiGraph();
  getData();

  // setTimeout(() => {
    if (graph.value) {
      toRaw(graph.value).on('click', (event: any) => {
        console.log(event);
      })
    }
  // }, 3000);
  // toRaw(graph.value).collapseElement('0');
});
</script>
