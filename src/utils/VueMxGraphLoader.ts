import vueMxFactory from "./BaseMxGraphLoader";

const vueMx:any = vueMxFactory({
    mxBasePath: "/mxgraph-base",
    mxImageBasePath: "/mxgraph-base/images", 
});

// 这个必须要，因为内部有些函数需要从window中取对应的对象.不然某些功能会出问题.
Object.assign(window, vueMx);

// 导出重命名，以区分对应的类型.
const vueMxObject:any = {};
Object.keys(vueMx).forEach(key => {
    if(key.startsWith("mx")){
        vueMxObject[key] = vueMx[key];
    }
});
export default vueMxObject;
