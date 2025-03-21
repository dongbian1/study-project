import{C as o}from"./index-DIlRhXE9.js";import{d as a,r as s,o as r,e as d,z as i,v as p,q as l,x as c}from"./index-CCRf4Tvv.js";const f={class:"h-[100%]"},T=a({__name:"tsFrontMark",setup(u){const n=s(`
type JSTypeMap = {
    string: string;
    number: number;
    boolean: boolean;
    symbol: symbol;
    bigint: bigint;
    undefined: undefined;
    object: object;
    function: Function;
}

type JSType = keyof JSTypeMap;

type Transfer<T extends JSType> = {
    [p in keyof T]: JSTypeMap[T[p]]
}

declare function addImpl<T extends JSType>(...args: [
    ...T,
    (...args: Transfer<T>) => any
]): void;

const addImpl = ('boolean', 'bigint', 'string', (a, b, c) => {})

`);return(m,e)=>(r(),d("div",f,[e[1]||(e[1]=i("div",{class:"text-center text-[32px] font-bold py-3"},"前置的不定量参数类型",-1)),p(o,{dark:"",disabled:"",modelValue:l(n),"onUpdate:modelValue":e[0]||(e[0]=t=>c(n)?n.value=t:null),"code-style":{width:"100%",height:"calc(100% - 50px)",fontSize:"18px"}},null,8,["modelValue"])]))}});export{T as default};
