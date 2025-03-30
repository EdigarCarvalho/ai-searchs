import { Graph } from '../../models/Graph';
import { SearchResult } from '../../models/SearchResult';

export function breadthFirstSearch(graph: Graph, startNodeId: string, goalNodeId: string = 'Bucharest'): SearchResult {
    const visited = new Set<string>([startNodeId]);
    const queue: string[] = [startNodeId];
    const parent: Map<string, string> = new Map(); // To track the path
    
    while (queue.length > 0) {
        const currentNodeId = queue.shift()!;
        
        // If we found the goal, reconstruct and return the path
        if (currentNodeId === goalNodeId) {
            return reconstructPath(graph, startNodeId, goalNodeId, parent);
        }
        
        const neighbors = graph.getNeighbors(currentNodeId);
        
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor.id)) {
                visited.add(neighbor.id);
                queue.push(neighbor.id);
                parent.set(neighbor.id, currentNodeId);
            }
        }
    }
    
    // If we didn't find a path to the goal
    return new SearchResult([], 0);
}

function reconstructPath(graph: Graph, startNodeId: string, goalNodeId: string, parent: Map<string, string>): SearchResult {
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