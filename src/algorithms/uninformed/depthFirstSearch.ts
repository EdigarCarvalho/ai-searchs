import { Graph } from '../../models/Graph';
import { SearchResult } from '../../models/SearchResult';

export function depthFirstSearch(graph: Graph, startNodeId: string, goalNodeId: string = 'Bucharest'): SearchResult {
    const visited = new Set<string>();
    const stack: string[] = [startNodeId];
    const parent = new Map<string, string>();
    
    while (stack.length > 0) {
        const currentNodeId = stack.pop()!;
        
        // If we found the goal, reconstruct the path and return
        if (currentNodeId === goalNodeId) {
            return reconstructPath(graph, startNodeId, goalNodeId, parent);
        }
        
        if (!visited.has(currentNodeId)) {
            visited.add(currentNodeId);
            
            const neighbors = graph.getNeighbors(currentNodeId);
            
            // In DFS, we add neighbors in reverse order to get the correct exploration order when using a stack
            for (let i = neighbors.length - 1; i >= 0; i--) {
                const neighbor = neighbors[i];
                if (!visited.has(neighbor.id)) {
                    stack.push(neighbor.id);
                    if (!parent.has(neighbor.id)) {
                        parent.set(neighbor.id, currentNodeId);
                    }
                }
            }
        }
    }
    
    // If we didn't find a path to the goal
    return new SearchResult([], 0);
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