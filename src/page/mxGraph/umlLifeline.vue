<template>
    <div ref="containerRef" class="graph_container"></div>
</template>
<script setup lang="ts">
import _ from 'lodash'

// 引入MxGraph
import mxObject from "@/utils/VueMxGraphLoader";

// 解构
const { mxClient, mxUtils, mxGraph, mxEditor, mxConnectionConstraint, mxPoint } = mxObject;

const containerRef = useTemplateRef('containerRef');

const build = (container: HTMLDivElement) => {
    if (!mxClient.isBrowserSupported()) {
        mxUtils.error("浏览器不支持", 200, false);
        return;
    }

    const editor = new mxEditor();
    editor.setGraphContainer(container);

    const graph = editor.graph;
    const parent = graph.getDefaultParent();

    graph.getAllConnectionConstraints = (terminal: any) => {
      return [
        new mxConnectionConstraint(new mxPoint(0, 0), true),
      ]
    }

    graph.getModel().beginUpdate();
    try {
        graph.insertVertex(parent, null, '我是1号泳道', 60, 60, 200, 360,'shape=umlLifeline;');
    }
    finally {
        // Updates the display
        graph.getModel().endUpdate();
    }

    graph.getModel().endUpdate();

};

onMounted(() => {
    if (containerRef.value == undefined) {
        return;
    }
    const container = containerRef.value;
    build(container);
});
</script>
<style lang="scss" scoped>
.graph_container {
    width: 100%;
    height: calc(100vh - 20px);
    background: url('../assets/img/grid.gif')
}
</style>