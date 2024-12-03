/**
 * 深拷贝
 * @param obj 要拷贝的对象
 * @returns 新对象
 */
export const deepCopy = <T>(obj: T): T => {
    if (!['object', 'function'].includes(typeof obj) || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map((item: T) => {
            return deepCopy<T>(item);
        }) as T;
    }

    if (typeof obj === 'function') {
        const funcCopy = <F extends (...args: any[]) => void>(...args: Parameters<F>) => {
            return (obj as Function)(...args);
        }
        Object.setPrototypeOf(funcCopy, Object.getPrototypeOf(obj));
        return funcCopy as T;
    }

    const objCopy: {[k: string]: any} = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            objCopy[key] = deepCopy<T>(obj[key] as T);
        }
    }
    return objCopy as T;
}

export const deepCopyText = `
/**
 * 深拷贝
 * @param obj 要拷贝的对象
 * @returns 新对象
 */
export const deepCopy = <T>(obj: T): T => {
    if (!['object', 'function'].includes(typeof obj) || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map((item: T) => {
            return deepCopy<T>(item);
        }) as T;
    }

    if (typeof obj === 'function') {
        const funcCopy = <F extends (...args: any[]) => void>(...args: Parameters<F>) => {
            return (obj as Function)(...args);
        }
        Object.setPrototypeOf(funcCopy, Object.getPrototypeOf(obj));
        return funcCopy as T;
    }

    const objCopy: {[k: string]: any} = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            objCopy[key] = deepCopy<T>(obj[key] as T);
        }
    }
    return objCopy as T;
}
`