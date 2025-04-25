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

      const ids = [targetId];
      if (targetType === "edge") {
        const edge = model.getEdgeDatum(targetId);
        ids.push(edge.source, edge.target);
      } else if (targetType === "node") {
        const pathInfo = findGraphPathInfo(targetId, HoverElement.data);
        
        if (pathInfo.relatedIds && pathInfo.relatedIds.length) {
          ids.push(...pathInfo.relatedIds);
        }
        
        const relatedNodeSet = new Set(pathInfo.relatedIds);
        
        try {
          if (pathInfo.edges && pathInfo.edges.length) {
            const allEdges = [];
            for (const nodeId of relatedNodeSet) {
              const connectedEdges = model.getRelatedEdgesData(nodeId);
              if (connectedEdges) {
                allEdges.push(...connectedEdges);
              }
            }
            
            const relatedEdges = allEdges.filter((edge: {source: string, target: string}) => 
              relatedNodeSet.has(edge.source) && relatedNodeSet.has(edge.target)
            );
            
            if (relatedEdges.length > 0) {
              ids.push(...relatedEdges.map(idOf));
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