import { Graph } from '../../models/Graph';
import { SearchResult } from '../../models/SearchResult';

export function directionalSearch(graph: Graph, startNodeId: string, endNodeId: string): SearchResult {
    // Bidirectional search from both start and end nodes
    const forwardVisited = new Set<string>([startNodeId]);
    const backwardVisited = new Set<string>([endNodeId]);
    
    const forwardQueue: string[] = [startNodeId];
    const backwardQueue: string[] = [endNodeId];
    
    const forwardParents = new Map<string, string>();
    const backwardParents = new Map<string, string>();
    
    let intersection: string | null = null;
    
    while (forwardQueue.length > 0 && backwardQueue.length > 0 && !intersection) {
        // Forward BFS step
        expandFrontier(
            graph, 
            forwardQueue, 
            forwardVisited, 
            forwardParents, 
            backwardVisited, 
            (node) => { intersection = node; }
        );
        
        if (intersection) break;
        
        // Backward BFS step
        expandFrontier(
            graph, 
            backwardQueue, 
            backwardVisited, 
            backwardParents, 
            forwardVisited, 
            (node) => { intersection = node; }
        );
    }
    
    if (intersection) {
        const path = reconstructPath(intersection, forwardParents, backwardParents);
        return new SearchResult(path, calculateTotalDistance(graph, path));
    }
    
    return new SearchResult([], 0); // No path found
}

function expandFrontier(
    graph: Graph,
    queue: string[],
    visited: Set<string>,
    parents: Map<string, string>,
    otherVisited: Set<string>,
    onIntersection: (node: string) => void
) {
    if (queue.length === 0) return;
    
    const current = queue.shift()!;
    
    for (const neighbor of graph.getNeighbors(current)) {
        if (!visited.has(neighbor.id)) {
            visited.add(neighbor.id);
            parents.set(neighbor.id, current);
            
            // Check if this node was visited by the other direction
            if (otherVisited.has(neighbor.id)) {
                onIntersection(neighbor.id);
                return;
            }
            
            queue.push(neighbor.id);
        }
    }
}

function reconstructPath(
    intersection: string,
    forwardParents: Map<string, string>,
    backwardParents: Map<string, string>
): string[] {
    // Build path from start to intersection
    const forwardPath: string[] = [];
    let current = intersection;
    
    while (forwardParents.has(current)) {
        forwardPath.unshift(current);
        current = forwardParents.get(current)!;
    }
    forwardPath.unshift(current); // Add the start node
    
    // Build path from intersection to end
    const backwardPath: string[] = [];
    current = intersection;
    
    while (backwardParents.has(current)) {
        if (current !== intersection) { // Avoid adding intersection twice
            backwardPath.push(current);
        }
        current = backwardParents.get(current)!;
    }
    backwardPath.push(current); // Add the end node
    
    // Combine paths
    return [...forwardPath, ...backwardPath.reverse()];
}

function calculateTotalDistance(graph: Graph, path: string[]): number {
    let totalDistance = 0;
    
    for (let i = 0; i < path.length - 1; i++) {
        totalDistance += graph.getEdgeWeight(path[i], path[i + 1]);
    }
    
    return totalDistance;
}