import { Graph } from '../../models/Graph';
import { SearchResult } from '../../models/SearchResult';

export function iterativeDeepeningSearch(graph: Graph, startNodeId: string, maxDepth: number = 10): SearchResult {
    let result = new SearchResult([], 0);
    
    for (let depth = 0; depth <= maxDepth; depth++) {
        const visited = new Set<string>();
        const path: string[] = [];
        
        if (dls(graph, startNodeId, depth, visited, path)) {
            result = new SearchResult(path, calculateTotalDistance(graph, path));
            break;
        }
    }
    
    return result;
}

function dls(
    graph: Graph, 
    currentNodeId: string, 
    depth: number, 
    visited: Set<string>,
    path: string[]
): boolean {
    if (depth < 0) {
        return false;
    }
    
    visited.add(currentNodeId);
    path.push(currentNodeId);
    
    if (depth === 0) {
        return true;
    }
    
    const neighbors = graph.getNeighbors(currentNodeId);
    
    for (const neighbor of neighbors) {
        if (!visited.has(neighbor.id)) {
            if (dls(graph, neighbor.id, depth - 1, visited, path)) {
                return true;
            }
        }
    }
    
    path.pop();
    return false;
}

function calculateTotalDistance(graph: Graph, path: string[]): number {
    let totalDistance = 0;
    
    for (let i = 0; i < path.length - 1; i++) {
        totalDistance += graph.getEdgeWeight(path[i], path[i + 1]);
    }
    
    return totalDistance;
}