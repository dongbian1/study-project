<template>
  <div class="master">
    <div class="left">
      <div 
        :class="`module ${item.key === selectData?.key ? 'select' : ''}`" 
        v-for="item in data" 
        :key="item.key" 
        @click="moduleClick(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="right">
      <component :is="selectData?.component" />
    </div>
  </div>
</template>
<script setup lang="ts">

interface Data {
  key: string;
  name: string;
  component: any
}

const data = shallowRef<Data[]>([
  { key: 'model',name: '模态框', component: defineAsyncComponent(() => import('@/page/model.vue')) },
  { key: 'loading', name: '全局loading', component: defineAsyncComponent(() => import('@/page/loading.vue')) },
  { key: 'directives', name: '自定义指令', component: defineAsyncComponent(() => import('@/page/directives.vue')) },
  { key: 'debounce', name: '手写防抖函数', component: defineAsyncComponent(() => import('@/page/debounce.vue')) },
  { key: 'deepCopy', name: '手写深拷贝', component: defineAsyncComponent(() => import('@/page/deepCopy.vue')) },
  { key: 'promise', name: '手写Promise', component: defineAsyncComponent(() => import('@/page/MyPromise.vue')) },
  { key: 'mouseTail', name: '鼠标拖尾特效', component: defineAsyncComponent(() => import('@/page/mouseTail.vue')) },
  { key: 'Im', name: 'IM实时通信', component: defineAsyncComponent(() => import('@/page/im.vue')) },
  { key: 'tsFrontMark', name: '前置的不定量参数类型', component: defineAsyncComponent(() => import('@/page/ts/tsFrontMark.vue')) },
  { key: 'mxgraphCell', name: 'mxGraph图片节点', component: defineAsyncComponent(() => import('@/page/mxGraph/mxGraphCell.vue')) },
  { key: 'mxgraphXML', name: 'mxGraph XML', component: defineAsyncComponent(() => import('@/page/mxGraph/mxGraphXML.vue')) },
  { key: 'mxGraphLabel', name: 'mxGraph标签', component: defineAsyncComponent(() => import('@/page/mxGraph/mxGraphLabel.vue')) },
  { key: 'mxGraphSwimlanes', name: 'mxGraph泳道图', component: defineAsyncComponent(() => import('@/page/mxGraph/mxGraphSwimlanes.vue')) },
  { key: 'mxGraphUmlLifeline', name: 'mxGraph时序图', component: defineAsyncComponent(() => import('@/page/mxGraph/umlLifeline.vue')) },
  { key: 'MonacoEditor', name: 'MonacoEditor编辑器', component: defineAsyncComponent(() => import('@/page/monacoEditor.vue')) },
])

const selectData = shallowRef<Data>();

const moduleClick = (item: Data) => {
  selectData.value = item
}
</script>

<style scoped lang="scss">
.master {
  padding: 10px;
  display: flex;
  height: calc(100vh);
  justify-items: center;
  justify-content: space-between;
  .left,.right {
    height: 100%;
    border-radius: 10px;
    border: 1px solid #ccc;
  }
  .left {
    width: 200px;
    .module {
      width: 100%;
      height: 50px;
      padding: 10px;
      border-bottom: 1px solid #ccc;
      cursor: pointer;
      &:first-child{
        border-top-left-radius: 10px;
        border-top-right-radius: 10px
      }
      &:hover {
        background-color: #ccc;
      }
    }
  }
  .right {
    width: calc(100% - 200px - 20px);
  }

  .select {
    color: #fff;
    background-color: var(--td-brand-color-8);
    &:first-child{
      border-top-left-radius: 10px;
      border-top-right-radius: 10px
    }
    &:hover {
      background-color: var(--td-brand-color-8) !important;
    }
  }
}
</style>