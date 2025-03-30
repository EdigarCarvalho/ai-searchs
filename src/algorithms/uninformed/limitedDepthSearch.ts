import { Graph } from '../../models/Graph';
import { SearchResult } from '../../models/SearchResult';

export function limitedDepthSearch(graph: Graph, startNodeId: string, depthLimit: number): SearchResult {
    const visited = new Set<string>();
    const stack: Array<{ nodeId: string; depth: number }> = [{ nodeId: startNodeId, depth: 0 }];
    const path: string[] = [];
    
    while (stack.length > 0) {
        const item = stack.pop()!;
        const { nodeId, depth } = item;
        
        if (!visited.has(nodeId)) {
            visited.add(nodeId);
            path.push(nodeId);
            
            if (depth < depthLimit) {
                const neighbors = graph.getNeighbors(nodeId);
                
                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor.id)) {
                        stack.push({ nodeId: neighbor.id, depth: depth + 1 });
                    }
                }
            }
        }
    }
    
    // Calculate total distance
    let totalDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
        totalDistance += graph.getEdgeWeight(path[i], path[i + 1]);
    }
    
    return new SearchResult(path, totalDistance);
}