<template>
    <div class="border-b p-3 gap-3 flex items-center">
        <t-link theme="primary" hover="color" @click="getXml">查看xml</t-link>

        <t-link theme="primary" hover="color" @click="setZoom('large')">放大</t-link>
        <t-link theme="primary" hover="color" @click="setZoom('Small')">缩小</t-link>
    </div>
    <div ref="containerRef" class="graph_container"></div>
</template>
<script setup lang="ts">
// 引入MxGraph
import mxObject from "@/utils/VueMxGraphLoader";

const graph = ref();
const model = ref();

// 解构
const { mxClient, mxUtils, mxRubberband, mxCodec, mxConstants } = mxObject;

const containerRef = useTemplateRef('containerRef');

const build = (container: HTMLDivElement) => {
    if (!mxClient.isBrowserSupported()) {
        mxUtils.error("浏览器不支持", 200, false);
        return;
    }

    const newModel = new mxObject.mxGraphModel();
    const newGraph = new mxObject.mxGraph(container, newModel);
    graph.value = newGraph;
    model.value = newModel;
    initGetLabel();
    new mxRubberband(newGraph)
    newGraph.setEnabled(true);
    newGraph.setTooltips(true);
    newGraph.centerZoom = true;
    newGraph.resizeContainer = false;

    const parent = newGraph.getDefaultParent();
    newGraph.getModel().beginUpdate();

    try {
        const start = newGraph.insertVertex(parent, null, "开始我是一个很长很长很长很长很长很长很长很长的名字", 200, 20, 80, 30, 'start');
        const end = newGraph.insertVertex(parent, null, "结束", 200, 400, 80, 30, 'end');
        newGraph.insertEdge(parent, null, "我是一个很长很长很长很长很长很长很长很长的名字", start, end);

    } finally {
        newGraph.getModel().endUpdate();
    }
};

const initGetLabel = () => {
    // 超出部分换行
    graph.value.htmlLabels = true;
    graph.value.isWrapping = (cell: any) => {
        return cell.isVertex()
    }

    // 是否允许编辑
    graph.value.isCellEditable = (cell: any) => {
        return cell.isEdge();
    }

    // 超出部分省略
    graph.value.getLabel = (cell: any) => {
        const label = graph.value.convertValueToString(cell);
        const geometry = model.value.getGeometry(cell);
        if (cell.isEdge()) {
            return label.substring(0, 6) + '...';
        }

        if (
            !model.value.isCollapsed(cell) && 
            geometry != null && 
            (geometry.offset == null || (geometry.offset.x == 0 && geometry.offset.y == 0)) && 
            model.value.isVertex(cell) &&
            geometry.width >= 2
        ) {
            const style = graph.value.getStylesheet().getDefaultVertexStyle();
            const fontSize = style[mxConstants.STYLE_FONTSIZE] || mxConstants.DEFAULT_FONTSIZE;
            const max = geometry.width / (fontSize * 0.6);

            if (label.length > max) {
                return label.substring(0, max - 6) + '...';
            }
            return label;
        }
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