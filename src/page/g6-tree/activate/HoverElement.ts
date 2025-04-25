import { HoverActivate, idOf } from "@antv/g6";
import { findGraphPathInfo } from "../graph";

class HoverElement extends HoverActivate {
    // 使用静态数据，但初始为null
    static data: any = null;
    
    // 静态方法设置数据
    static setData(newData: any) {
      HoverElement.data = newData;
    }
    
    getActiveIds(event: any) {
      const { model, graph } = this.context;
      const { targetType, target } = event;
      const targetId = target.id;

      console.log('targetId', targetId);
      graph.collapseElement(targetId);

      const ids = [targetId];
      if (targetType === "edge") {
        const edge = model.getEdgeDatum(targetId);
        ids.push(edge.source, edge.target);
      } else if (targetType === "node") {
        const pathInfo = findGraphPathInfo(targetId, HoverElement.data);
        
        ids.push(...pathInfo.relatedIds);
        
        const relatedNodeSet = new Set(pathInfo.relatedIds);
        
        try {
          for (const nodeId of relatedNodeSet) {
            const connectedEdges = model.getRelatedEdgesData(nodeId);
            if (connectedEdges && connectedEdges.length) {
              const filteredEdges = connectedEdges.filter((edge: {source: string, target: string}) => 
                relatedNodeSet.has(edge.source) && relatedNodeSet.has(edge.target)
              );
              
              if (filteredEdges.length > 0) {
                ids.push(...filteredEdges.map(idOf));
              }
            }
          }
        } catch (e) {
          console.warn('处理边时出错:', e);
        }
      }

      graph.frontElement(ids);
      return ids;
    }
  }

export default HoverElement;