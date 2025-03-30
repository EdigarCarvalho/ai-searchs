import { Graph } from '../../models/Graph';
import { SearchResult } from '../../models/SearchResult';

export function limitedDepthSearch(graph: Graph, startNodeId: string, depthLimit: number): SearchResult {
    const visited = new Set<string>();
    const stack: Array<{node: string, depth: number}> = [{node: startNodeId, depth: 0}];
    const path: string[] = [];
    
    while (stack.length > 0) {
        const { node, depth } = stack.pop()!;
        
        if (visited.has(node)) {
            continue;
        }
        
        visited.add(node);
        path.push(node);
        
        if (depth < depthLimit) {
            const neighbors = graph.getNeighbors(node);
            
            // Add neighbors in reverse order to explore left-to-right in DFS
            for (let i = neighbors.length - 1; i >= 0; i--) {
                if (!visited.has(neighbors[i].id)) {
                    stack.push({node: neighbors[i].id, depth: depth + 1});
                }
            }
        }
    }
    
    return new SearchResult(path, calculateTotalDistance(graph, path));
}

function calculateTotalDistance(graph: Graph, path: string[]): number {
    let totalDistance = 0;
    
    for (let i = 0; i < path.length - 1; i++) {
        totalDistance += graph.getEdgeWeight(path[i], path[i + 1]);
    }
    
    return totalDistance;
}