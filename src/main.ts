import App from './App.vue'
import { createApp } from 'vue'

import TDesign from 'tdesign-vue-next';
import directives from '@/directives/index'

import 'virtual:windi.css'
import 'mxgraph/javascript/src/css/common.css'
import 'mxgraph/javascript/src/css/explorer.css'

// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App)

// 自定义指令绑定
app.use(directives)

app.use(TDesign).mount('#app')
