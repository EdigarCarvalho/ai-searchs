import { Graph } from '../../models/Graph';
import { SearchResult } from '../../models/SearchResult';

export function breadthFirstSearch(graph: Graph, startNodeId: string): SearchResult {
    const result = new SearchResult([], 0);
    const visited = new Set<string>([startNodeId]);
    const queue: string[] = [startNodeId];
    
    while (queue.length > 0) {
        const currentNodeId = queue.shift()!;
        result.path.push(currentNodeId);
        
        const neighbors = graph.getNeighbors(currentNodeId);
        
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor.id)) {
                visited.add(neighbor.id);
                queue.push(neighbor.id);
            }
        }
    }
    
    // Calculate total distance
    result.totalDistance = calculateTotalDistance(graph, result.path);
    return result;
}

function calculateTotalDistance(graph: Graph, path: string[]): number {
    let totalDistance = 0;
    
    for (let i = 0; i < path.length - 1; i++) {
        totalDistance += graph.getEdgeWeight(path[i], path[i + 1]);
    }
    
    return totalDistance;
}