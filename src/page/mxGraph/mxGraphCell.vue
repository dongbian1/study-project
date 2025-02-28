<template>
    <div ref="containerRef" class="graph_container"></div>
</template>
<script setup lang="ts">
import _ from 'lodash'

// 引入MxGraph
import mxObject from "@/utils/VueMxGraphLoader";

// 解构
const { mxClient, mxUtils, mxGraph } = mxObject;

const containerRef = useTemplateRef('containerRef');

const build = (container: HTMLDivElement) => {
    if (!mxClient.isBrowserSupported()) {
        mxUtils.error("浏览器不支持", 200, false);
        return;
    }

    const graph = new mxGraph(container);
    const parent = graph.getDefaultParent();

    // 标识节点类型为图片，及图片路径
    const prefix = 'shape=image;image=mxgraph-base/images/icons48/keys.png;';

    graph.getModel().beginUpdate();
    try {
        graph.insertVertex(parent, null, 'Bottom', 60, 60, 60, 60,
            prefix + 'verticalLabelPosition=bottom;verticalAlign=top;rounded=0;fontWeight=bold;');
        graph.insertVertex(parent, null, 'Top', 140, 60, 60, 60,
            prefix + 'verticalLabelPosition=top;verticalAlign=bottom');
        graph.insertVertex(parent, null, 'Left', 60, 160, 60, 60,
            prefix + 'labelPosition=left;align=right');
        graph.insertVertex(parent, null, 'Right', 140, 160, 60, 60,
            prefix + 'labelPosition=right;align=left');
    }
    finally {
        // Updates the display
        graph.getModel().endUpdate();
    }

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