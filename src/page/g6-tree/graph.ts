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
 * 根据节点ID查找图形数据中的完整路径
 * @param nodeId 要查找的节点ID
 * @param graphData 图形数据
 * @returns 包含上下级关系信息的对象
 */
export function findGraphPathInfo(
  nodeId: string,
  graphData: { 
    nodes: Array<{ id: string, data?: any }>,
    edges: Array<{ source: string, target: string, data?: any }>
  }
) {
  const relatedIds = findRelatedNodesInGraph(nodeId, graphData);
  
  // 获取相关节点详细信息
  const relatedNodes = graphData.nodes.filter(node => 
    relatedIds.includes(node.id)
  );
  
  // 获取相关连接边
  const relatedEdges = graphData.edges.filter(edge => 
    relatedIds.includes(edge.source) && relatedIds.includes(edge.target)
  );
  
  // 识别上级和下级节点
  const ancestors = new Set<string>();
  const descendants = new Set<string>();
  
  // 构建临时图并查找上下级
  const graph = new Map<string, { in: string[], out: string[] }>();
  
  // 初始化所有节点
  relatedNodes.forEach(node => {
    graph.set(node.id, { in: [], out: [] });
  });
  
  // 添加边的信息
  relatedEdges.forEach(edge => {
    const sourceNode = graph.get(edge.source);
    const targetNode = graph.get(edge.target);
    
    if (sourceNode) {
      sourceNode.out.push(edge.target);
    }
    
    if (targetNode) {
      targetNode.in.push(edge.source);
    }
  });
  
  // 使用BFS查找上级节点
  function findAncestorsBFS(id: string) {
    const visited = new Set<string>([id]);
    const queue = [...(graph.get(id)?.in || [])];
    
    while (queue.length > 0) {
      const currentId = queue.shift()!;
      if (visited.has(currentId)) continue;
      
      visited.add(currentId);
      ancestors.add(currentId);
      
      const node = graph.get(currentId);
      if (node) {
        queue.push(...node.in);
      }
    }
  }
  
  // 使用BFS查找下级节点
  function findDescendantsBFS(id: string) {
    const visited = new Set<string>([id]);
    const queue = [...(graph.get(id)?.out || [])];
    
    while (queue.length > 0) {
      const currentId = queue.shift()!;
      if (visited.has(currentId)) continue;
      
      visited.add(currentId);
      descendants.add(currentId);
      
      const node = graph.get(currentId);
      if (node) {
        queue.push(...node.out);
      }
    }
  }
  
  findAncestorsBFS(nodeId);
  findDescendantsBFS(nodeId);
  
  return {
    nodeId,
    relatedIds,
    ancestors: Array.from(ancestors),
    descendants: Array.from(descendants),
    relatedNodes,
    relatedEdges
  };
} 