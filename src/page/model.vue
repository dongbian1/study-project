<template>
  <div class="div">
    <t-button @click="onAdd">打开新增弹出层</t-button>
    <t-button @click="onUpdate">打开编辑弹出层</t-button>
    <CustomDialog ref="dialogRef" :columns="columns" placement="center" :width="800" :form-props="{ layout: 'inline' }" @success="onSuccess">
      <!-- <template #header>我是插槽</template>
      <template #footer>我是插槽</template> -->
    </CustomDialog>
  </div>
</template>

<script setup lang="ts">
import CustomDialog from '@/components/FormModel/index.vue'
import { EnterFormProps } from '@/components/FormModel/type';

// vue3 3.5版本可以通过ref获取组件实例
const helloWorldRef = useTemplateRef('dialogRef')

// 表单配置
const columns = ref<Array<EnterFormProps>>([
  { 
    el: 'input', 
    label: '输入框', 
    prop: 'input', 
    rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
  },
  {
    el: 'input-number',
    label: '数字输入框',
    prop: 'number',
    rules: [{ required: true, message: '请输入数字', trigger: 'blur' }]
  },
  {
    el: 'textarea',
    label: '文本域',
    prop: 'textarea',
    rules: [{ required: true, message: '请输入文本', trigger: 'blur' }]
  },
  { 
    el: 'select',
    label: '选择框', 
    prop: 'select',
    enum: [{ label: '男', value: 1 }, { label: '女', value: 2 }],
    rules: [{ required: true, message: '请选择性别', trigger: 'change' }]
  },
  {
    el: 'tree-select',
    label: '树选择器',
    prop: 'tree-select',
    enum: [
      { label: '一级 1', value: '1', children: [{ label: '二级 1-1', value: '1-1' }] }
    ],
    fieldNames: { label: 'label', value: 'value', children: 'children' },
    rules: [{ required: true, message: '请选择树节点', trigger: 'change' }]
  },
  {
    el: 'cascader',
    label: '级联选择器',
    prop: 'cascader',
    enum: [
      { label: '一级 1', value: '1', children: [{ label: '二级 1-1', value: '1-1' }] }
    ],
    rules: [{ required: true, message: '请选择级联节点', trigger: 'change' }]
  },
  {
    el: 'date-picker',
    label: '日期选择器',
    prop: 'date',
    rules: [{ required: true, message: '请选择日期', trigger: 'change' }]
  },
  {
    el: 'date-range-picker',
    label: '日期范围',
    prop: 'time',
    rules: [{ required: true, message: '请选择时间范围', trigger: 'change' }]
  },
  {
    el: 'time-picker',
    label: '时间选择器',
    prop: 'timePicker',
    rules: [{ required: true, message: '请选择时间', trigger: 'change' }]
  },
  {
    el: 'time-range-picker',
    label: '时间范围',
    prop: 'timeRangePicker',
    rules: [{ required: true, message: '请选择时间范围', trigger: 'change' }]
  },
  {
    el: 'switch',
    label: '开关',
    prop: 'switch',
    rules: [{ required: true, message: '请选择开关', trigger: 'change' }]
  },
  {
    el: 'slider',
    label: '滑块',
    prop: 'slider',
    rules: [{ required: true, message: '请选择滑块', trigger: 'change' }]
  },
  {
    el: 'radio-group',
    label: '单选框',
    prop: 'radio',
    enum: [{ label: '男', value: 1 }, { label: '女', value: 2 }],
    rules: [{ required: true, message: '请选择性别', trigger: 'change' }]
  },
  {
    el: 'checkbox-group',
    label: '多选框',
    prop: 'checkbox-group',
    enum: [{ label: '男', value: 1 }, { label: '女', value: 2 }],
    rules: [{ required: true, message: '请选择性别', trigger: 'change' }]
  },
  {
    el: 'rate',
    label: '评分',
    prop: 'rate',
    rules: [{ required: true, message: '请选择评分', trigger: 'change' }]
  }
]);

/**
 * 新增事件
 */
const onAdd = () => {
  helloWorldRef.value?.onShow()
}

/**
 * 编辑事件
 */
const onUpdate = () => {
  helloWorldRef.value?.onShow({
    id: 1,
    input: '1111'
  })
}

/**
 * 校验成功回调
 * @param data 表单数据
 */
const onSuccess = (data: any) => {
  console.log(data)
  helloWorldRef.value?.onChangeLoading(true)
}


</script>
<style scoped>
.div {
  display: flex;
  height: 100%;
  justify-content: space-around;
  align-items: center;
}
</style>