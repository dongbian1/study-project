import{C as c}from"./index-DIlRhXE9.js";import{d as m,r as u,l as p,o as f,e as x,z as s,t as b,q as a,v as l,b as _,x as v,h as C}from"./index-CCRf4Tvv.js";const T=(r,o)=>{let e=null;return(...n)=>{e&&clearTimeout(e),e=setTimeout(()=>{r(...n)},o)}},V=`
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
`,g={class:"h-[100%]"},k={class:"text-center pb-3"},w={class:"mb-3"},F=m({__name:"debounce",setup(r){const o=u(V),e=u(0),n=T(()=>{e.value++},2e3);return(y,t)=>{const i=p("t-button");return f(),x("div",g,[t[2]||(t[2]=s("div",{class:"text-center text-[32px] font-bold pt-3"},"防抖",-1)),s("div",k,[s("div",w,"结果集："+b(a(e)),1),l(i,{onClick:a(n)},{default:_(()=>t[1]||(t[1]=[C("数据+1")])),_:1},8,["onClick"])]),l(c,{dark:"",disabled:"",modelValue:a(o),"onUpdate:modelValue":t[0]||(t[0]=d=>v(o)?o.value=d:null),"code-style":{width:"100%",height:"calc(100% - 120px)",fontSize:"18px"}},null,8,["modelValue"])])}}});export{F as default};
