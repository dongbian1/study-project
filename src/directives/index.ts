import type { Directive } from "vue";

import { vClick } from "./VClick"

const directives: { [key: string]: Directive} = {
  'click': vClick
}

export default {
  install: (app: any) => {
    for (const key in directives) {
      app.directive(key, directives[key])
    }
    // 注册全局自定义指令
  }
}