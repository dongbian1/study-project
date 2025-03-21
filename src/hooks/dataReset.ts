import _ from 'lodash';
import { reactive, Ref, ref, UnwrapNestedRefs } from 'vue';

/**
 * 创建一个可重置的ref响应式数据
 * @param value 初始值
 * @param clone 克隆函数，默认使用lodash的深拷贝
 * @returns [响应式数据, 重置函数]
 */
export const useResettableRef = <T>(value: T, clone = _.cloneDeep): [Ref<T>, () => void] => {
  const state = ref<T>(clone(value)) as Ref<T>;

  const reset = () => {
    state.value = clone(value);
  };

  return [state, reset];
};

/**
 * 创建一个可重置的reactive响应式对象
 * @param values 初始对象值
 * @param clone 克隆函数，默认使用lodash的深拷贝
 * @returns [响应式对象, 重置函数]
 *
 * 注意：与useResettableRef不同，这个hook只适用于对象类型
 */
export const useResettableReactve = <T extends object>(
  values: T,
  clone = _.cloneDeep,
): [UnwrapNestedRefs<T>, () => void] => {
  const state = reactive<T>(clone(values));

  const reset = () => {
    Object.keys(state).forEach((key) => delete (state as any)[key]);
    Object.assign(state, clone(values));
  };
  return [state, reset];
};
