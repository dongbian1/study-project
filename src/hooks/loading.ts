import { ref, computed } from 'vue'

// 声明loading 数量
const loadingCount = ref<number>(0)

/**
 * loading hook
 * 全局loading, 适用于多个请求统一loading, 每次发起一个Promise请求，loadingCount+1，请求结束loadingCount-1
 */
export const useLoading = computed({
    get() {
        // 如果还存在loading，则返回true
        return loadingCount.value > 0
    },
    set(val) {
        // 设置loading 数量, val为true则+1，为false则-1
        loadingCount.value += val ? 1 : -1
        // 设置loading 数量不能小于0
        loadingCount.value = Math.max(loadingCount.value, 0)
    }
})