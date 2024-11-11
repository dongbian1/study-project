import type { Directive } from "vue";

import { useLoading } from '../hooks/loading'

// 存储当前el，用于卸载组件时卸载事件
const map = new WeakMap<HTMLElement, Function>();

/**
 * 自定义指令，用于点击事件增加loading
 */
export const vClick: Directive = {
  mounted(el, binding) {
    // 获取事件、处理函数
    const { value, modifiers } = binding;
    async function handleClick(e: MouseEvent) {
      // 判断是否需要loading
      if (!modifiers.loading) return value(e);
      useLoading.value = true;
      try {
        await value(e);
      } finally {
        useLoading.value = false;
      }
    }
    map.set(el, handleClick);
    el.addEventListener("click", handleClick);
  },
  unmounted(el) {
    const handle = map.get(el);
    if (!handle) return
    el.removeEventListener("click", handle);
    map.delete(el);
  }
}