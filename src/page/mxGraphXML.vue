<template>
    <div class="border-b p-3 gap-3 flex items-center">
        <t-link theme="primary" hover="color" @click="setXml">添加xml</t-link>
        <t-link theme="primary" hover="color" @click="getXml">查看xml</t-link>

        <t-link theme="primary" hover="color" @click="setZoom('large')">放大</t-link>
        <t-link theme="primary" hover="color" @click="setZoom('Small')">缩小</t-link>
    </div>
    <div ref="containerRef" class="graph_container"></div>
</template>
<script setup lang="ts">
// 引入MxGraph
import mxObject from "@/utils/VueMxGraphLoader";

const graph = ref(null);

// 解构
const { mxClient, mxUtils, mxGraph, mxRubberband, mxCodec } = mxObject;

const containerRef = useTemplateRef('containerRef');

const build = (container: HTMLDivElement) => {
    if (!mxClient.isBrowserSupported()) {
        mxUtils.error("浏览器不支持", 200, false);
        return;
    }

    const newGraph = new mxGraph(container);
    new mxRubberband(newGraph)
    newGraph.setEnabled(true);
    newGraph.setTooltips(true);
    newGraph.centerZoom = true;
    newGraph.resizeContainer = false;
    graph.value = newGraph;
};

const setXml = async () => {
    try {
        const response  = await fetch('../../public/mxgraph-base/xml/mxGraph.xml')
        const xml = await response.text()
        const doc = mxUtils.parseXml(xml);
        const codec = new mxCodec(doc);
        // @ts-ignore
        codec.decode(doc.documentElement, graph.value.getModel());
    } catch (error) {
        console.error('Error:', error);
    }
}

const setZoom = (type: 'large'| 'Small') => {
    if (type === 'large') {
        // @ts-ignore
        graph.value.zoomIn();
    } else {
        // @ts-ignore
        graph.value.zoomOut();
    }
}

const getXml = () => {
    const encoder = new mxCodec();
    // @ts-ignore
    const node = encoder.encode(graph.value.getModel());
    const xml = mxUtils.getXml(node);
    console.log(xml);
}

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
    height: calc(100vh - 67px);
    background: url('../assets/img/grid.gif')
}
</style>