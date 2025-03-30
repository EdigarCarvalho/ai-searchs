import { Graph } from '../../models/Graph';
import { SearchResult } from '../../models/SearchResult';

export function depthFirstSearch(graph: Graph, startNodeId: string): SearchResult {
    const visited = new Set<string>();
    const stack: string[] = [startNodeId];
    const path: string[] = [];
    
    while (stack.length > 0) {
        const currentNodeId = stack.pop()!;
        
        if (!visited.has(currentNodeId)) {
            visited.add(currentNodeId);
            path.push(currentNodeId);
            
            const neighbors = graph.getNeighbors(currentNodeId);
            
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor.id)) {
                    stack.push(neighbor.id);
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