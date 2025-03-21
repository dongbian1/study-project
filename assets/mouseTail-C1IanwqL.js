var m=Object.defineProperty;var u=(l,e,t)=>e in l?m(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t;var n=(l,e,t)=>u(l,typeof e!="symbol"?e+"":e,t);import{C as d}from"./index-DIlRhXE9.js";import{d as y,r,D as f,E as x,o as S,e as v,z as F,v as E,q as b,x as g}from"./index-CCRf4Tvv.js";class M{constructor(e){n(this,"characters");n(this,"colors");n(this,"lifeSpan",120);n(this,"initialStyles",{position:"fixed",top:0,display:"block",pointerEvents:"none",zIndex:99999,fontSize:"25px",willChange:"transform",color:"#FFFFFF"});n(this,"velocity",{x:0,y:0});n(this,"position",{x:0,y:0});n(this,"element",null);this.characters=e.characters,this.colors=e.colors,this.lifeSpan=e.lifeSpan||this.lifeSpan,this.initialStyles=e.initialStyles||this.initialStyles}init(e,t){const o=Math.floor(Math.random()*this.characters.length),c=this.characters[o],a=this.colors[o];this.velocity={x:(Math.random()<.5?-1:1)*(Math.random()/2),y:1},this.position={x:e-10,y:t-20},this.initialStyles.color=a,this.element=document.createElement("span"),this.element.innerHTML=c,this.ApplyStyle(this.element,this.initialStyles),this.update(),document.body.appendChild(this.element)}ApplyStyle(e,t){Object.assign(e.style,t)}update(){if(!this.element)return;this.position.x+=this.velocity.x,this.position.y+=this.velocity.y,this.lifeSpan--;const e=`translate3d(${this.position.x}px,${this.position.y}px,0) scale(${this.lifeSpan/120})`;this.element.style.transform=e}die(){var e;this.element&&((e=this.element.parentNode)==null||e.removeChild(this.element))}}const C=`
interface Props {
    // 拖尾符号
    characters: string[];
    // 颜色
    colors: string[];
    // 生命周期
    lifeSpan?: number;
    // 初始化样式
    initialStyles?: ElementStyles;
}

interface ElementStyles {
    // 绝对定位
    position: "fixed" | "absolute" | "relative";
    top: number;
    // 块级元素
    display: "block" | "inline-block";
    // 不响应鼠标事件
    pointerEvents: string;
    // 层级最高
    zIndex: number;
    // 字体大小
    fontSize: "25px";
    // 动画
    willChange: string;
    // 颜色
    color: string
}

class Element {
    // 拖尾符号类型数组
    private characters: string[];
    // 颜色数组
    private colors: string[];
    // // 初始化一个元素的生命周期为120,后续通过减少生命周期来控制拖尾符号的消失
    lifeSpan: number = 120;
    // 初始化样式
    initialStyles: ElementStyles = {
        position: "fixed",
        top: 0,
        display: "block",
        pointerEvents: "none",
        zIndex: 99999,
        fontSize: "25px",
        willChange: "transform",
        color: "#FFFFFF"
    }

    // 初始化速度
    velocity: { x: number, y: number } = { x: 0, y: 0 };
    // 初始化位置
    position: { x: number, y: number } = { x: 0, y: 0 };
    // 元素
    element: HTMLElement | null = null;

    constructor(props: Props) {
        this.characters = props.characters;
        this.colors = props.colors;
        this.lifeSpan = props.lifeSpan || this.lifeSpan;
        this.initialStyles = props.initialStyles || this.initialStyles;
    }

    init(x: number, y: number) {
        // 随机抽取一个字符
        const num = Math.floor(Math.random() * this.characters.length)
        const character = this.characters[num]
        const color = this.colors[num]
        // 初始化速度
        this.velocity = { x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2), y: 1 }
        // 初始化位置
        this.position = { x: x - 10, y: y - 20 }
        // 初始化颜色
        this.initialStyles.color = color;
        // 创建元素
        this.element = document.createElement("span");
        // 添加字符
        this.element.innerHTML = character
        // 添加样式
        this.ApplyStyle(this.element, this.initialStyles)
        // 更新字符状态
        this.update()
        // 添加元素到页面
        document.body.appendChild(this.element)
    }

    ApplyStyle(element: HTMLElement, styles: ElementStyles) {
        Object.assign(element.style, styles)
    }

    update() {
        if (!this.element) return
        // x轴移动
        this.position.x += this.velocity.x
        // y轴移动
        this.position.y += this.velocity.y
        // 减少生命周期
        this.lifeSpan--
        // 缩放
        const transform = \`translate3d(\${this.position.x}px,\${this.position.y}px,0) scale(\${this.lifeSpan / 120})\`
        this.element.style.transform = transform
    }

    die() {
        if (!this.element) return
        // 移除元素
        this.element.parentNode?.removeChild(this.element)
    }
}

export default Element
`,z={class:"h-[100%]"},L=y({__name:"mouseTail",setup(l){const e=r(C),t=r([]),o=r(["❤️","💛","💚","💙","💜","🖤"]),c=r(["#F8F8FF","#FFFFFF","#ADD8E6","#7BF2EA","#C0C0C0","#E0E0E0"]),a=()=>{for(let i=0;i<t.value.length;i++)t.value[i].update(),t.value[i].lifeSpan<0&&(t.value[i].die(),t.value=t.value.filter(s=>s!==t.value[i]));requestAnimationFrame(a)},h=i=>{const s=new M({characters:o.value,colors:c.value});s.init(i.clientX,i.clientY),t.value.push(s)};return f(()=>{a(),document.addEventListener("mousemove",h)}),x(()=>{document.removeEventListener("mousemove",h)}),(i,s)=>(S(),v("div",z,[s[1]||(s[1]=F("h1",{class:"text-center text-[32px] font-bold py-3"},"鼠标拖尾特性",-1)),E(d,{dark:"",disabled:"",modelValue:b(e),"onUpdate:modelValue":s[0]||(s[0]=p=>g(e)?e.value=p:null),"code-style":{width:"100%",height:"calc(100% - 50px)",fontSize:"18px"}},null,8,["modelValue"])]))}});export{L as default};
