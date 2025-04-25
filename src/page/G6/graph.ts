/**
 * 根据节点ID查找图形数据中所有上下级节点ID
 * @param nodeId 要查找的节点ID
 * @param graphData 图形数据（包含nodes和edges数组）
 * @returns 包含所有上下级节点ID的数组
 */
export function findRelatedNodesInGraph(
  nodeId: string,
  graphData: { 
    nodes: Array<{ id: string, data?: any }>,
    edges: Array<{ source: string, target: string, data?: any }>
  }
): string[] {
  // 存储结果（使用Set避免重复）
  const relatedIds = new Set<string>();
  
  // 添加当前节点
  relatedIds.add(nodeId);
  
  // 创建节点连接关系映射
  const sourceToTargets = new Map<string, string[]>();
  const targetToSources = new Map<string, string[]>();
  
  // 构建连接关系映射
  graphData.edges.forEach(edge => {
    // 构建源节点到目标节点的映射
    if (!sourceToTargets.has(edge.source)) {
      sourceToTargets.set(edge.source, []);
    }
    sourceToTargets.get(edge.source)!.push(edge.target);
    
    // 构建目标节点到源节点的映射
    if (!targetToSources.has(edge.target)) {
      targetToSources.set(edge.target, []);
    }
    targetToSources.get(edge.target)!.push(edge.source);
  });
  
  // 查找所有下级节点（递归）
  function findDescendants(id: string, visited = new Set<string>()) {
    if (visited.has(id)) return; // 避免循环依赖
    visited.add(id);
    
    const targets = sourceToTargets.get(id) || [];
    targets.forEach(targetId => {
      relatedIds.add(targetId);
      findDescendants(targetId, visited);
    });
  }
  
  // 查找所有上级节点（递归）
  function findAncestors(id: string, visited = new Set<string>()) {
    if (visited.has(id)) return; // 避免循环依赖
    visited.add(id);
    
    const sources = targetToSources.get(id) || [];
    sources.forEach(sourceId => {
      relatedIds.add(sourceId);
      findAncestors(sourceId, visited);
    });
  }
  
  // 执行查找
  findDescendants(nodeId);
  findAncestors(nodeId);
  
  return Array.from(relatedIds);
}

/**
 * 在树形结构数据中查找节点及其所有祖先和后代
 * @param nodeId 要查找的节点ID
 * @param treeData 树形数据结构
 * @returns 相关节点ID和路径信息
 */
export function findGraphPathInfo(
  nodeId: string,
  treeData: any
) {
  // 存储所有相关节点ID
  const relatedIds = new Set<string>();
  // 存储祖先节点
  const ancestors = new Set<string>();
  // 存储后代节点
  const descendants = new Set<string>();
  
  // 添加当前节点
  relatedIds.add(nodeId);
  
  // 创建ID到节点的映射，方便快速查找
  const idToNodeMap = new Map<string, any>();
  // 创建子节点到父节点的映射
  const childToParentMap = new Map<string, string>();
  
  // 遍历树，构建映射
  function traverseTree(node: any, parentId: string | null = null) {
    if (!node) return;
    
    idToNodeMap.set(node.id, node);
    
    if (parentId) {
      childToParentMap.set(node.id, parentId);
    }
    
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach((child: any) => {
        traverseTree(child, node.id);
      });
    }
  }
  
  // 从树根开始遍历
  traverseTree(treeData);
  
  // 查找所有祖先节点
  function findAncestors(id: string) {
    let currentId = id;
    
    while (childToParentMap.has(currentId)) {
      const parentId = childToParentMap.get(currentId)!;
      ancestors.add(parentId);
      relatedIds.add(parentId);
      currentId = parentId;
    }
  }
  
  // 查找所有后代节点
  function findDescendants(node: any) {
    if (!node || !node.children) return;
    
    node.children.forEach((child: any) => {
      const childNode = idToNodeMap.get(child.id);
      if (childNode) {
        descendants.add(childNode.id);
        relatedIds.add(childNode.id);
        findDescendants(childNode);
      }
    });
  }
  
  // 执行查找
  findAncestors(nodeId);
  const targetNode = idToNodeMap.get(nodeId);
  if (targetNode) {
    findDescendants(targetNode);
  }
  
  // 构建转换后的edges数据
  const edges: Array<{source: string, target: string}> = [];
  
  // 从子节点到父节点映射创建边
  childToParentMap.forEach((parentId, childId) => {
    // 只包含与目标节点相关的边
    if (relatedIds.has(parentId) && relatedIds.has(childId)) {
      edges.push({
        source: parentId,
        target: childId
      });
    }
  });
  
  return {
    nodeId,
    relatedIds: Array.from(relatedIds),
    ancestors: Array.from(ancestors),
    descendants: Array.from(descendants),
    edges
  };
}

/**
 * 将树形结构转换为图形数据(节点和边的数组)
 * @param treeData 树形结构数据
 * @returns 包含nodes和edges数组的对象
 */
export function treeToGraph(treeData: any) {
  const nodes: Array<{id: string, data: any}> = [];
  const edges: Array<{source: string, target: string}> = [];
  
  function traverse(node: any) {
    if (!node) return;
    
    // 添加节点
    nodes.push({
      id: node.id,
      data: { ...node }
    });
    
    // 处理子节点
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach((child: any) => {
        // 添加边
        edges.push({
          source: node.id,
          target: child.id
        });
        
        // 递归处理子节点
        traverse(child);
      });
    }
  }
  
  // 从树根开始遍历
  traverse(treeData);
  
  return { nodes, edges };
} 