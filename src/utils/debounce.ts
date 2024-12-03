/**
 * 手写防抖函数
 * @param func 函数
 * @param wait 防抖时间
 * @returns 
 */
const debounce = <F extends (...args: any[]) => void>(func: F, wait: number) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return (...args: Parameters<F>) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, wait)
    }
}

export default debounce;

export const debounceText = `
/**
 * 手写防抖函数
 * @param func 函数
 * @param wait 防抖时间
 * @returns 
 */
const debounce = <F extends (...args: any[]) => void>(func: F, wait: number) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return (...args: Parameters<F>) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, wait)
    }
}
`