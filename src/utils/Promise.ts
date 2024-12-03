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

export const SimplePromiseText = `
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
`