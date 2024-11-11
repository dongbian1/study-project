import { DialogProps, FormProps, FormRule } from "tdesign-vue-next"
import ProModal from './index.vue'

export type ModalProps = Omit<DialogProps, 'visible'> & {
    columns: Array<EnterFormProps>,
    formProps?: FormProps
    addApi?: (data: any) => Promise<any>,
    updateApi?: (data: any) => Promise<any>,
}


export type EnterFormProps = {
    el?: EnterType // 当前项输入框的类型
    label: string // 当前项标题
    prop: string // 当前输入项key
    rules?: Array<FormRule> // 当前项校验规则
    enum?: EnumProps[] | ((params?: any) => Promise<any>) // 枚举类型（字典）
    fieldNames?: FieldNamesProps // 指定 label && value && children 的 key 值
    enterProps?: any // 输入项参数，根据官方文档来传递，该属性所有值会透传到组件
    render?: (scope: EnterRenderScope) => VNode | string // 自定义输入项内容渲染（tsx语法）
}

export type EnterType =
    | 'input'
    | 'input-number'
    | 'textarea'
    | 'select'
    | 'tree-select'
    | 'cascader'
    | 'date-picker'
    | 'date-range-picker'
    | 'time-picker'
    | 'time-range-picker'
    | 'switch'
    | 'slider'
    | 'radio-group'
    | 'checkbox-group'
    | 'rate'
    | 'upload'

export type EnterRenderScope = {
    prop: string
    enterParam: { [key: string]: any }
}

export interface EnumProps {
    label: string // 选项框显示的文字
    value: any // 选项框值
    disabled?: boolean // 是否禁用此选项
    children?: EnumProps[] // 为树形选择时，可以通过 children 属性指定子选项
    [key: string]: any
}

export type FieldNamesProps = {
    label: string
    value: string
    children?: string
}

export type ProModalInstance = Omit<InstanceType<typeof ProModal>, keyof ComponentPublicInstance | keyof ModalProps>