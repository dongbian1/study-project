<template>
    <component
     :style="{ width: column?.el !== 'switch' ? '100%' : '' }"
     :is="column.render ?? `t-${column.el}`"
     v-model="props.modelValue[column.prop]"
     v-bind="{ ...placeholder, ...handleEnterProps }"
     :data="column.el === 'tree-select' ? columnEnum : []"
     :options="['cascader'].includes(column.el!) ? columnEnum : []"
    >
      <template
        v-if="column?.el && ['radio-group', 'select', 'checkbox-group'].includes(column?.el)"
      >
        <component
          :is="`t-${optionKey}`"
          v-for="(col, index) in columnEnum"
          :key="index"
          :label="col[fieldNames.label]"
          :value="col[fieldNames.value]"
          
        >
          {{ col[fieldNames.label] }}
        </component>
      </template>
    </component>
</template>
<script setup lang="ts">
import { EnterFormProps } from '../type';

defineOptions({
  name: 'FormItem'
})

const props = withDefaults(defineProps<{ column: EnterFormProps, modelValue: {[k: string]: any} }>(), {
  modelValue: () => ({})
})

const emit = defineEmits(["update:modelValue"]);

// 接收 enumMap
const enumMap = inject('enumMap', ref(new Map()))
const columnEnum = computed(() => {
  let enumData = enumMap.value.get(props.column.prop)
  if (!enumData) return []
  return enumData
})

// 处理默认 placeholder
const placeholder = computed(() => {
  const enter = props.column.enterProps
  const placeholder =
    enter?.placeholder ??
    (props?.column.el?.includes('input') ? '请输入' : '请选择') +
      props.column.label
  return { placeholder }
})

// 判断 fieldNames 设置 label && value && children 的 key 值
const fieldNames = computed(() => {
  return {
    label: props.column.fieldNames?.label ?? 'label',
    value: props.column.fieldNames?.value ?? 'value',
    children: props.column.fieldNames?.children ?? 'children'
  }
})

const handleEnterProps = computed(() => {
  const label = fieldNames.value.label
  const value = fieldNames.value.value
  const children = fieldNames.value.children
  const enterEl = props.column.el
  let enterProps = props.column.enterProps ?? {}
  if (enterEl === 'tree-select') {
    enterProps = {
      ...enterProps,
      props: { value, label, children },
    }
  }
  if (enterEl === 'cascader') {
    enterProps = {
      ...enterProps,
      keys: { value, label, children }
    }
  }
  return enterProps
})

const optionKey = computed(() => {
  const el = props.column.el
  switch (el) {
    case 'radio-group':
      return 'radio'
    case 'select':
      return 'option'
    case 'checkbox-group':
      return 'checkbox'
    default:
      return ''
  }
})


watch(() => props.modelValue, 
  (val) => {
    emit('update:modelValue', val)
  },
  { deep: true}
)
</script>