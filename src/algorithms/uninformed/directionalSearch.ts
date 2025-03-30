import { Graph } from '../../models/Graph';
import { SearchResult } from '../../models/SearchResult';

export function directionalSearch(graph: Graph, startNodeId: string, endNodeId: string): SearchResult {
    // Quick check if start and end are the same
    if (startNodeId === endNodeId) {
        return new SearchResult([startNodeId], 0);
    }
    
    // Bidirectional search from both start and end nodes
    const forwardVisited = new Set<string>([startNodeId]);
    const backwardVisited = new Set<string>([endNodeId]);
    
    const forwardQueue: string[] = [startNodeId];
    const backwardQueue: string[] = [endNodeId];
    
    const forwardParents = new Map<string, string>();
    const backwardParents = new Map<string, string>();
    
    let intersection: string | null = null;
    
    // Check initial connections - this handles the case where start and end are direct neighbors
    for (const neighbor of graph.getNeighbors(startNodeId)) {
        if (neighbor.id === endNodeId) {
            return new SearchResult([startNodeId, endNodeId], neighbor.weight);
        }
    }
    
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
        return reconstructPathBidirectional(
            graph, 
            startNodeId, 
            endNodeId, 
            intersection, 
            forwardParents, 
            backwardParents
        );
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

function reconstructPathBidirectional(
    graph: Graph,
    startNodeId: string,
    endNodeId: string,
    intersection: string,
    forwardParents: Map<string, string>,
    backwardParents: Map<string, string>
): SearchResult {
    // Build path from start to intersection
    const forwardPath: string[] = [];
    let current = intersection;
    
    while (current !== startNodeId) {
        forwardPath.unshift(current);
        const parent = forwardParents.get(current);
        if (!parent) break;
        current = parent;
    }
    forwardPath.unshift(startNodeId);
    
    // Build path from intersection to end (reversed)
    const backwardPath: string[] = [];
    current = intersection;
    
    while (current !== endNodeId) {
        const parent = backwardParents.get(current);
        if (!parent) break;
        backwardPath.push(parent);
        current = parent;
    }
    
    // Combine paths (avoiding duplicating the intersection)
    const completePath = [...forwardPath, ...backwardPath];
    
    // Calculate total distance
    let totalDistance = 0;
    for (let i = 0; i < completePath.length - 1; i++) {
        totalDistance += graph.getEdgeWeight(completePath[i], completePath[i + 1]);
    }
    
    return new SearchResult(completePath, totalDistance);
}