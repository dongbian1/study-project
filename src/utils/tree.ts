/**
 * 根据ID查找树形数据中所有上下级节点ID
 * @param id 要查找的节点ID
 * @param treeData 树形数据数组
 * @returns 包含所有上下级节点ID的数组
 */
export function findRelatedNodeIds(id: string, treeData: any[]): string[] {
    const result = new Set<string>();
    const nodePathMap = new Map<string, string[]>();
    
    // 构建节点路径映射
    function buildNodePaths(nodes: any[], path: string[] = []) {
      for (const node of nodes) {
        const currentPath = [...path, node.id];
        nodePathMap.set(node.id, currentPath);
        
        if (node.children && node.children.length > 0) {
          buildNodePaths(node.children, currentPath);
        }
      }
    }
    
    // 查找所有下级节点ID
    function findDescendants(nodeId: string, nodes: any[]): string[] {
      const descendants: string[] = [];
      
      function traverse(items: any[]) {
        for (const item of items) {
          if (item.id === nodeId) {
            collectDescendants(item);
            return;
          }
          
          if (item.children && item.children.length > 0) {
            traverse(item.children);
          }
        }
      }
      
      function collectDescendants(node: any) {
        if (node.children && node.children.length > 0) {
          for (const child of node.children) {
            descendants.push(child.id);
            collectDescendants(child);
          }
        }
      }
      
      traverse(nodes);
      return descendants;
    }
    
    // 构建所有节点的路径
    buildNodePaths(treeData);
    
    // 添加当前节点ID
    result.add(id);
    
    // 添加所有上级节点ID
    const ancestorPath = nodePathMap.get(id) || [];
    ancestorPath.forEach(ancestorId => result.add(ancestorId));
    
    // 添加所有下级节点ID
    const descendants = findDescendants(id, treeData);
    descendants.forEach(descendantId => result.add(descendantId));
    
    return Array.from(result);
  }