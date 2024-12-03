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
        const transform = `translate3d(${this.position.x}px,${this.position.y}px,0) scale(${this.lifeSpan / 120})`
        this.element.style.transform = transform
    }

    die() {
        if (!this.element) return
        // 移除元素
        this.element.parentNode?.removeChild(this.element)
    }
}

export default Element


export const MouseTailText = `
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
        const transform = ` + '`' + 'translate3d(${this.position.x}px,${this.position.y}px,0) scale(${this.lifeSpan / 120})' + '`' + `
        this.element.style.transform = transform
    }

    die() {
        if (!this.element) return
        // 移除元素
        this.element.parentNode?.removeChild(this.element)
    }
}

export default Element
`