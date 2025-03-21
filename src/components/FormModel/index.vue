<template>
  <t-dialog
    :visible="visible"
    v-bind="{ ...props }"
    :header="props.header ? props.header : formData.id ? '编辑' : '新增'"
    :confirm-loading="dialogLoading"
    :on-confirm="props.onConfirm ? props.onConfirm : onConfirm"
    :on-close="props.onClose ? props.onClose : onClose"
  >
    <template v-if="isHeader" #header>
      <slot name="header"></slot>
    </template>
    <t-form ref="formRef" style="padding: 10px" :data="formData" v-bind="{ ...props.formProps }">
      <t-form-item
        v-for="item in props.columns"
        :key="item.prop"
        :label="item.label"
        :name="item.prop"
        :rules="item.rules"
        :label-align="item.labelAlign"
      >
        <form-item v-model="formData" :column="item" />
      </t-form-item>
    </t-form>
    <template v-if="isFooter" #footer>
      <slot name="footer"></slot>
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useResettableRef } from '@/hooks/dataReset';

import FormItem from './FormItem/index.vue';
import { EnterFormProps, ModalProps } from './type';
import { FormInstanceFunctions } from 'tdesign-vue-next';

/**
 * Props 需要使用DialogProps实例，这样可以将Dialog所有事件属性通过外层控制
 * 因为使用了DialogProps 有些默认值需要指定，不适用withDefaults指定传入得所有属性为null，会覆盖掉组件中默认属性
 */
const props = withDefaults(defineProps<ModalProps>(), {
  showOverlay: true,
  closeBtn: true,
  footer: true,
  width: 600,
});

// 获取组件所有插槽
const slot = useSlots();

// 回调事件
const emit = defineEmits(['success']);

// 是否显示弹出框
const visible = ref<boolean>(false);
// 确定按钮loading状态
const dialogLoading = ref<boolean>(false);

// Form表单Ref事件
const formRef = ref<FormInstanceFunctions>();

// Form表单数据
const [formData, resetFormData] = useResettableRef<{ [k: string]: any }>({});

// 是否显示头部插槽
const isHeader = computed(() => {
  return !!slot.header;
});

// 是否显示底部插槽
const isFooter = computed(() => {
  return !!slot.footer;
});

// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map<string, { [key: string]: any }[]>());
provide('enumMap', enumMap);
const setEnumMap = async (col: EnterFormProps) => {
  if (!col.enum) return;
  // 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
  if (typeof col.enum !== 'function') {
    enumMap.value.set(col.prop!, col.enum!);
  } else {
    const { result } = await col.enum();
    enumMap.value.set(col.prop!, result);
  }
};

// 增加默认值
const enterColumn = ref<EnterFormProps[]>();

watchEffect(() => {
  enterColumn.value = props.columns.map((col) => {
    if (col.enum) {
      setEnumMap(col);
    }
    if (!col.el) col.el = 'input';
    return col;
  });
});

// 监听 columns，如果存在时间范围选择器，则默认值为空数组
watchEffect(() => {
  props.columns.forEach((col) => {
    if (col.el && ['date-range-picker', 'time-range-picker', 'checkbox-group'].includes(col.el)) {
      if (!formData.value[col.prop!]) {
        formData.value[col.prop!] = [];
      }
    }
  });
});

/**
 * 弹出框确定事件
 */
const onConfirm = () => {
  formRef.value?.validate().then((res) => {
    if (res !== true) return;
    if (formData.value.id) {
      if (props.updateApi) {
        dialogLoading.value = true;
        props.updateApi(formData.value).finally(() => {
          dialogLoading.value = false;
        });
        return;
      }
    } else if (props.addApi) {
      dialogLoading.value = true;
      props.addApi(formData.value).finally(() => {
        dialogLoading.value = false;
      });
      return;
    }
    emit('success', formData.value);
  });
};

/**
 * 弹出框打开事件
 * @param data 编辑时传入数据
 */
const onShow = (data?: { [k: string]: any }) => {
  visible.value = true;
  if (data) {
    formData.value = _.cloneDeep(data);
    formRef.value?.reset();
  }
};

/**
 * 弹出层关闭事件
 */
const onClose = () => {
  visible.value = false;
  resetFormData();
  formRef.value?.reset();
};

const onChangeLoading = (val: boolean) => {
  dialogLoading.value = val;
};

defineExpose({
  onShow,
  onClose,
  onConfirm,
  onChangeLoading,
});
</script>
