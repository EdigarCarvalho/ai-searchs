import { Graph } from '../../models/Graph';
import { SearchResult } from '../../models/SearchResult';

export function iterativeDeepeningSearch(
    graph: Graph, 
    startNodeId: string, 
    maxDepth: number = 10, 
    goalNodeId: string = 'Bucharest'
): SearchResult {
    const parent = new Map<string, string>();
    
    for (let depth = 0; depth <= maxDepth; depth++) {
        const result = depthLimitedSearch(graph, startNodeId, goalNodeId, depth, parent);
        
        if (result) {
            return reconstructPath(graph, startNodeId, goalNodeId, parent);
        }
    }
    
    // If we didn't find a path to the goal
    return new SearchResult([], 0);
}

function depthLimitedSearch(
    graph: Graph, 
    currentNodeId: string,
    goalNodeId: string,
    depth: number,
    parent: Map<string, string>,
    visited: Set<string> = new Set<string>()
): boolean {
    if (currentNodeId === goalNodeId) {
        return true; // Found the goal
    }
    
    if (depth <= 0) {
        return false;
    }
    
    visited.add(currentNodeId);
    
    const neighbors = graph.getNeighbors(currentNodeId);
    
    for (const neighbor of neighbors) {
        if (!visited.has(neighbor.id)) {
            parent.set(neighbor.id, currentNodeId);
            
            if (depthLimitedSearch(graph, neighbor.id, goalNodeId, depth - 1, parent, visited)) {
                return true;
            }
        }
    }
    
    visited.delete(currentNodeId); // Backtrack
    return false;
}

function reconstructPath(
    graph: Graph,
    startNodeId: string, 
    goalNodeId: string, 
    parent: Map<string, string>
): SearchResult {
    const path: string[] = [];
    let current = goalNodeId;
    let totalDistance = 0;
    
    // Reconstruct the path from goal to start
    while (current !== startNodeId) {
        path.unshift(current);
        const parentNode = parent.get(current);
        if (!parentNode) {
            // No path exists
            return new SearchResult([], 0);
        }
        
        totalDistance += graph.getEdgeWeight(parentNode, current);
        current = parentNode;
    }
    
    // Add the start node
    path.unshift(startNodeId);
    
    return new SearchResult(path, totalDistance);
}