<template>
  <div ref="containerRef" style="height: 100%" />
</template>

<script setup lang="tsx">
import {
  ExtensionCategory,
  Graph,
  register,
  treeToGraphData,
  type NodeData,
  type TreeData
} from "@antv/g6";

import dataJson from "./data.json";
import HoverElement from "./activate/HoverElement";
import TreeNode from "./activate/TreeNode";

const containerRef = ref<HTMLDivElement>();

const graph = ref<Graph>();

const graphData = ref<any>();

const intiGraph = () => {
  // 注册树节点类型

  graph.value = new Graph({
    container: containerRef.value,
    node: {
      type: "tree-node",
      style: {
        size: [202, 60],
        ports: [{ placement: "left" }, { placement: "right" }],
        radius: 4,
        fill: "#fff",
        clicks: {
          default: {
            fill: "#fff",
          },
          1: {
            fill: "#3fc1c9",
            stroke: "#3fc1c9",
            lineWidth: 2,
          },
        },
      },
      state: {
        active: {
          fill: '#3fc1c9',
          stroke: '#3fc1c9',
          lineWidth: 2,
        },
        selected: {
          fill: '#3fc1c9',
          stroke: '#3fc1c9',
          lineWidth: 2,
        }
      },
    },
    edge: {
      type: "cubic-horizontal",
      style: {
        stroke: "#CED4D9",
      },
    },
    layout: {
      type: "indented",
      direction: "LR",
      dropCap: false,
      indent: 300,
      getHeight: () => 60,
      preLayout: false,
    },
    behaviors: ["zoom-canvas", "drag-canvas", "hover-element"],
  });
};

const getData = () => {
  if (graph.value) {
    toRaw(graph.value).setData(
      treeToGraphData(dataJson as TreeData, {
        getNodeData: (datum: TreeData, depth: number): NodeData => {
          if (!datum.style) datum.style = {};
          if (!datum.children) return datum as unknown as NodeData;
          const { children, ...restDatum } = datum;
          return {
            ...restDatum,
            children: children.map((child: TreeData) => child.id)
          } as NodeData;
        },
      })
    );
    toRaw(graph.value).render();
    graphData.value = dataJson;

    // 设置数据
    HoverElement.setData(graphData.value);
    register(ExtensionCategory.BEHAVIOR, "hover-element", HoverElement);
    register(ExtensionCategory.NODE, "tree-node", TreeNode);
  }
};

onMounted(() => {
  intiGraph();
  getData();
  
});
</script>
