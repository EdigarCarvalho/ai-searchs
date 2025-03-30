import { Graph } from '../../models/Graph';
import { SearchResult } from '../../models/SearchResult';

type Heuristic = (a: string, b: string) => number;

export function greedySearch(
    graph: Graph, 
    startNodeId: string, 
    goalNodeId: string,
    heuristic: Heuristic
): SearchResult {
    const openSet: string[] = [startNodeId];
    const closedSet = new Set<string>();
    const cameFrom = new Map<string, string>();
    
    while (openSet.length > 0) {
        // Sort openSet by heuristic value (ascending)
        openSet.sort((a, b) => heuristic(a, goalNodeId) - heuristic(b, goalNodeId));
        
        // Get the node with lowest heuristic value
        const current = openSet.shift()!;
        
        // If we found the goal, reconstruct and return the path
        if (current === goalNodeId) {
            const path = reconstructPath(cameFrom, current);
            return new SearchResult(path, calculateTotalDistance(graph, path));
        }
        
        // Mark as explored
        closedSet.add(current);
        
        // Explore neighbors
        for (const neighbor of graph.getNeighbors(current)) {
            if (closedSet.has(neighbor.id)) {
                continue; // Skip already explored nodes
            }
            
            if (!openSet.includes(neighbor.id)) {
                cameFrom.set(neighbor.id, current);
                openSet.push(neighbor.id);
            }
        }
    }
    
    return new SearchResult([], 0); // No path found
}

function reconstructPath(cameFrom: Map<string, string>, current: string): string[] {
    const totalPath = [current];
    while (cameFrom.has(current)) {
        current = cameFrom.get(current)!;
        totalPath.unshift(current);
    }
    return totalPath;
}

function calculateTotalDistance(graph: Graph, path: string[]): number {
    let totalDistance = 0;
    
    for (let i = 0; i < path.length - 1; i++) {
        totalDistance += graph.getEdgeWeight(path[i], path[i + 1]);
    }
    
    return totalDistance;
}