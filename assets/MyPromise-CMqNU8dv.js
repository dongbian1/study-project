var f=Object.defineProperty;var j=(n,e,t)=>e in n?f(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var i=(n,e,t)=>j(n,typeof e!="symbol"?e+"":e,t);import{C as y}from"./index-DIlRhXE9.js";import{d as R,r as c,l as g,o as C,e as b,z as l,t as u,q as d,v as p,b as x,x as k,h as T}from"./index-CCRf4Tvv.js";class h{constructor(e){i(this,"status");i(this,"value");i(this,"reason");i(this,"onResolvedCallbacks",[]);i(this,"onRejectedCallbacks",[]);this.status="pending",this.value=null,this.reason=void 0;const t=o=>{this.status==="pending"&&(this.status="resolved",this.value=o,this.onResolvedCallbacks.forEach(r=>r()))},a=o=>{this.status==="pending"&&(this.status="rejected",this.reason=o,this.onRejectedCallbacks.forEach(r=>r()))};try{e(t,a)}catch(o){a(o)}}then(e,t){return new h((a,o)=>{if(this.status==="resolved")try{a(e&&e(this.value))}catch(r){o(r)}if(this.status==="rejected")try{a(t&&t(this.reason))}catch(r){o(r)}this.status==="pending"&&(this.onResolvedCallbacks.push(()=>{try{a(e&&e(this.value))}catch(r){o(r)}}),this.onRejectedCallbacks.push(()=>{try{a(t&&t(this.reason))}catch(r){o(r)}}))})}catch(e){this.status==="rejected"&&e(this.reason)}}const P=`
/**
 * 手写Promise
 * 1.promise 有三个状态：pending，fulfilled，rejected
 * 2.new promise时， 需要传递一个executor()执行器，执行器立即执行
 * 3.executor接受两个参数，分别是resolve和reject
 * 4.promise 的默认状态是 pending
 * 5.promise 有一个value保存成功状态的值
 * 6.promise 有一个reason保存失败状态的值
 * 7.promise 只能从pending到rejected, 或者从pending到fulfilled，状态一旦确认，就不会再改变
 * 8.promise 必须有一个then方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 和 promise 失败的回调 onRejected
 * 9.如果调用 then 时，promise 已经成功，则执行onFulfilled，参数是promise的value
 * 10.如果调用 then 时，promise 已经失败，则执行onRejected, 参数是promise的reason
 * 11.如果调用 then 时，promise 是pending状态，需先注册回调，等promise状态确定后，再调用相应的回调
 * 12. Promise 需要是链式调用，即then方法返回一个promise
 */
class SimplePromise<T> {
    // 状态
    private status: 'pending' | 'resolved' | 'rejected';
    // 成功值
    private value: T | null;
    // 失败原因
    private reason: any;
    // 成功回调
    private onResolvedCallbacks: Array<() => void> = [];
    // 失败回调
    private onRejectedCallbacks: Array<() => void> = [];

    constructor(executor: (resolve: (value: T) => void, reject: (reason?: any) => void) => void) {
        this.status = 'pending';
        this.value = null;
        this.reason = undefined;

        // 添加成功回调
        const resolve = (value: T) => {
            if (this.status === 'pending') {
                this.status = 'resolved';
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }

        // 添加失败回调
        const reject = (reason?: any) => {
            if (this.status === 'pending') {
                this.status = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    /**
     * then方法
     * @param onResolved 成功回调
     * @param onRejected 失败回调
     */
    then(onResolved?: (value: T) => any, onRejected?: (reason?: any) => any) {
        // 返回一个新的Promise对象
        return new SimplePromise<T>((resolve, reject) => {
            // 状态为resolved时，执行成功回调
            if (this.status === 'resolved') {
                try {
                    resolve(onResolved && onResolved(this.value as T));
                } catch (error) {
                    reject(error);
                }
            }

            // 状态为rejected时，执行失败回调
            if (this.status === 'rejected') {
                try {
                    resolve(onRejected && onRejected(this.reason))
                } catch (error) {
                    reject(error);
                }
            }

            // 状态为pending时，将回调函数存入数组
            if (this.status === 'pending') {
                // 成功回调
                this.onResolvedCallbacks.push(() => {
                    try {
                        resolve(onResolved && onResolved(this.value as T))
                    } catch (error) {
                        reject(error);
                    }
                });

                // 失败回调
                this.onRejectedCallbacks.push(() => {
                    try {
                        resolve(onRejected && onRejected(this.reason))
                    } catch (error) {
                        reject(error);
                    }
                    
                });
            }
        })
    }

    /**
     * 失败回调
     * @param onRejected 失败回调
     */
    catch(onRejected: (reason?: any) => any) {
        if (this.status === 'rejected') {
            onRejected(this.reason);
        }
    }

}

export default SimplePromise;
`,_={class:"h-[100%]"},S={class:"text-center leading-8 my-3"},B=R({__name:"MyPromise",setup(n){const e=c(P),t=c(""),a=c(""),o=()=>{new h(s=>{setTimeout(()=>{s("成功")},5e3)}).then(s=>(t.value="resolved",a.value=s,console.log(s),"then2:成功")).then(s=>{console.log(s)}).catch(s=>{t.value="rejected",a.value=s})};return(r,s)=>{const v=g("t-button");return C(),b("div",_,[s[2]||(s[2]=l("h1",{class:"text-center text-[32px] font-bold pt-3"},"MyPromise",-1)),l("div",S,[l("p",null,"Promise状态: "+u(d(t)),1),l("p",null,"Promise结果: "+u(d(a)),1),p(v,{onClick:o},{default:x(()=>s[1]||(s[1]=[T("触发")])),_:1})]),p(y,{dark:"",disabled:"",modelValue:d(e),"onUpdate:modelValue":s[0]||(s[0]=m=>k(e)?e.value=m:null),"code-style":{width:"100%",height:"calc(100% - 160px)",fontSize:"18px"}},null,8,["modelValue"])])}}});export{B as default};
