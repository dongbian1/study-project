<template>
    <div ref="containerRef" class="graph_container"></div>
</template>
<script setup lang="ts">
import _ from 'lodash'

// 引入MxGraph
import mxObject from "@/utils/VueMxGraphLoader";

// 解构
const { mxClient, mxUtils, mxGraph, mxEditor } = mxObject;

const containerRef = useTemplateRef('containerRef');

const build = (container: HTMLDivElement) => {
    if (!mxClient.isBrowserSupported()) {
        mxUtils.error("浏览器不支持", 200, false);
        return;
    }

    const editor = new mxEditor();

    editor.layoutSwimlanes = true;
    editor.layoutDiagram = true;
    editor.maintainSwimlanes = true;

    editor.setGraphContainer(container);

    const graph = editor.graph;
    console.log(editor)

    const parent = graph.getDefaultParent();


    graph.getModel().beginUpdate();
    try {
        graph.insertVertex(parent, null, '我是1号泳道', 60, 60, 200, 360,'shape=swimlane;');
        graph.insertVertex(parent, null, '我是2号泳道', 360, 360, 200, 360,'shape=swimlane;');
        graph.insertVertex(parent, null, '我是模块', 0, 0, 50, 50);
    }
    finally {
        // Updates the display
        graph.getModel().endUpdate();
    }

    setTimeout(() => {
        graph.insertVertex(parent, null, '我是3号泳道', 60, 60, 200, 360,'shape=swimlane;');
    },5000)
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