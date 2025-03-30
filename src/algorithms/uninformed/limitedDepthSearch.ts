import { Graph } from '../../models/Graph';
import { SearchResult } from '../../models/SearchResult';

export function limitedDepthSearch(graph: Graph, startNodeId: string, depthLimit: number, goalNodeId: string = 'Bucharest'): SearchResult {
    const visited = new Set<string>();
    const stack: Array<{node: string, depth: number}> = [{node: startNodeId, depth: 0}];
    const parent = new Map<string, string>();
    
    while (stack.length > 0) {
        const { node, depth } = stack.pop()!;
        
        // If we found the goal, reconstruct the path and return
        if (node === goalNodeId) {
            return reconstructPath(graph, startNodeId, goalNodeId, parent);
        }
        
        if (visited.has(node)) {
            continue;
        }
        
        visited.add(node);
        
        if (depth < depthLimit) {
            const neighbors = graph.getNeighbors(node);
            
            // Add neighbors in reverse order to explore left-to-right in DFS
            for (let i = neighbors.length - 1; i >= 0; i--) {
                const neighbor = neighbors[i];
                if (!visited.has(neighbor.id)) {
                    stack.push({node: neighbor.id, depth: depth + 1});
                    if (!parent.has(neighbor.id)) {
                        parent.set(neighbor.id, node);
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