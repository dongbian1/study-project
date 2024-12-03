<template>
    <div class="h-[100%]">
        <h1 class="text-center text-[32px] font-bold py-3">鼠标拖尾特性</h1>
        <CodeMirror dark disabled v-model="script"
            :code-style="{ width: '100%', height: 'calc(100% - 50px)', fontSize: '18px' }" />
    </div>
</template>
<script lang="ts" setup>
import MouseTail, { MouseTailText } from '../utils/MouseTail'
import CodeMirror from '@/components/CodeMirror/index.vue'

const script = ref<string>(MouseTailText);

// 元素数组
const elementGroup = ref<MouseTail[]>([])

// 拖尾符号
const characters = ref<string[]>(["❤️", "💛", "💚", "💙", "💜", "🖤"])

// 颜色数组
const colors = ref<string[]>(["#F8F8FF", "#FFFFFF", "#ADD8E6", "#7BF2EA", "#C0C0C0", "#E0E0E0"])

/**
 * 渲染函数
 */
const rander = () => {
    for (let i = 0; i < elementGroup.value.length; i++) {
        // 更新元素位置和状态
        elementGroup.value[i].update();
        // 判断元素是否已经消失
        if (elementGroup.value[i].lifeSpan < 0) {
            elementGroup.value[i].die()
            // 元素消失，移除元素
            elementGroup.value = elementGroup.value.filter((item) => item !== elementGroup.value[i])
        }
    }
    requestAnimationFrame(rander)
}

onMounted(() => {
    rander()
    document.addEventListener("mousemove", (v: MouseEvent) => {
        // 创建元素
        const e = new MouseTail({ characters: characters.value, colors: colors.value })
        e.init(v.clientX, v.clientY)
        elementGroup.value.push(e)
    })
})
</script>