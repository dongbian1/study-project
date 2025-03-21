import{C as r}from"./index-DIlRhXE9.js";import{d as n,r as s,o as a,e as p,z as i,v as d,q as c,x as u}from"./index-CCRf4Tvv.js";const y=`
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
`,f={class:"h-[100%]"},C=n({__name:"deepCopy",setup(l){const o=s(y);return(b,e)=>(a(),p("div",f,[e[1]||(e[1]=i("div",{class:"text-center text-[32px] font-bold py-3"},"深拷贝",-1)),d(r,{dark:"",disabled:"",modelValue:c(o),"onUpdate:modelValue":e[0]||(e[0]=t=>u(o)?o.value=t:null),"code-style":{width:"100%",height:"calc(100% - 50px)",fontSize:"18px"}},null,8,["modelValue"])]))}});export{C as default};
