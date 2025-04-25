import { Rect as GRect, Text as GText } from '@antv/g';
import {
  Badge,
  CommonEvent,
  Label,
  Rect,
  RectStyleProps,
  LabelStyleProps,
  BadgeStyleProps
} from '@antv/g6';

// 定义TextStyleProps类型，因为@antv/g6未导出此类型
type CSSGlobalKeywords = 'inherit' | 'initial' | 'unset';

interface TextStyleProps {
  x: number;
  y: number;
  text: string;
  fontSize: number;
  fill: string;
  opacity?: number;
  textAlign?: 'left' | 'right' | 'center' | 'start' | 'middle' | 'end';
  textBaseline?: 'middle' | CSSGlobalKeywords | 'top' | 'hanging' | 'alphabetic' | 'ideographic' | 'bottom';
  transform?: any[];
  fontFamily?: string;
}

// 定义常量
const COLORS: Record<string, string> = {
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  default: '#1890ff'
};

// 选中节点的颜色
const ACTIVE_COLOR = '#3fc1c9';

const GREY_COLOR = '#e9e9e9';

class TreeNode extends Rect {
    get data() {
      return this.context.model.getNodeLikeDatum(this.id);
    }
  
    get childrenData() {
      return this.context.model.getChildrenData(this.id);
    }
  
    getLabelStyle(attributes: Required<RectStyleProps>): false | LabelStyleProps {
      const [width, height] = this.getSize(attributes);
      return {
        x: -width / 2 + 8,
        y: -height / 2 + 16,
        text: String(this.data.name || ''),
        fontSize: 12,
        opacity: 0.85,
        fill: '#000',
        cursor: 'pointer' as const,
      };
    }
  
    getPriceStyle(attributes: Required<RectStyleProps>): TextStyleProps {
      const [width, height] = this.getSize(attributes);
      return {
        x: -width / 2 + 8,
        y: height / 2 - 8,
        text: String(this.data.label || ''),
        fontSize: 16,
        fill: '#000',
        opacity: 0.85,
      };
    }
  
    drawPriceShape(attributes: Required<RectStyleProps>, container: any): void {
      const priceStyle = this.getPriceStyle(attributes);
      this.upsert('price', GText, priceStyle, container);
    }
  
    getCurrencyStyle(attributes: Required<RectStyleProps>): TextStyleProps {
      const [, height] = this.getSize(attributes);
      return {
        x: this.shapeMap['price'].getLocalBounds().max[0] + 4,
        y: height / 2 - 8,
        text: String(this.data.currency || ''),
        fontSize: 12,
        fill: '#000',
        opacity: 0.75,
      };
    }
  
    drawCurrencyShape(attributes: Required<RectStyleProps>, container: any): void {
      const currencyStyle = this.getCurrencyStyle(attributes);
      this.upsert('currency', GText, currencyStyle, container);
    }
  
  
    getCollapseStyle(attributes: Required<RectStyleProps>): false | BadgeStyleProps {
      if (this.childrenData.length === 0) return false;
      const { collapsed } = attributes;
      const [width, height] = this.getSize(attributes);
      return {
        backgroundFill: '#fff',
        backgroundHeight: 16,
        backgroundLineWidth: 1,
        backgroundRadius: 0,
        backgroundStroke: GREY_COLOR,
        backgroundWidth: 16,
        cursor: 'pointer' as const,
        fill: GREY_COLOR,
        fontSize: 16,
        text: collapsed ? '+' : '-',
        textAlign: 'center',
        textBaseline: 'middle',
        x: width / 2,
        y: 0,
      };
    }
  
    drawCollapseShape(attributes: Required<RectStyleProps>, container: any): void {
      const collapseStyle = this.getCollapseStyle(attributes);
      const btn = this.upsert('collapse', Badge, collapseStyle, container);
  
      if (btn && !Reflect.has(btn, '__bind__')) {
        Reflect.set(btn, '__bind__', true);
        btn.addEventListener(CommonEvent.CLICK, () => {
          const { collapsed } = this.attributes;
          const graph = this.context.graph;
          if (collapsed) graph.expandElement(this.id);
          else graph.collapseElement(this.id);
        });
      }
    }
  
    getProcessBarStyle(attributes: Required<RectStyleProps>): GRect['attributes'] {
      const { rate, status } = this.data;
      // 从attributes中安全地获取radius，即使它可能不存在
      const radius = 'radius' in attributes ? attributes.radius : 0;
      const color = COLORS[status as keyof typeof COLORS] || COLORS.default;
      const percent = `${Number(rate) * 100}%`;
      const [width, height] = this.getSize(attributes);
      return {
        x: -width / 2,
        y: height / 2 - 4,
        width: width,
        height: 4,
        radius: [0, 0, radius as number, radius as number],
        fill: `linear-gradient(to right, ${color} ${percent}, ${GREY_COLOR} ${percent})`,
      };
    }
  
    getKeyStyle(attributes: Required<RectStyleProps>): any {
      const keyStyle = super.getKeyStyle(attributes);
      
      // 通过属性直接应用颜色
      return {
        ...keyStyle,
        // fill由state配置控制
        lineWidth: 1,
        stroke: GREY_COLOR,
      };
    }
  
    render(attributes = this.parsedAttributes, container: any): void {
      super.render(attributes, container);
  
      this.drawPriceShape(attributes, container);
      this.drawCurrencyShape(attributes, container);
      this.drawCollapseShape(attributes, container);
    }
  }

export default TreeNode;
