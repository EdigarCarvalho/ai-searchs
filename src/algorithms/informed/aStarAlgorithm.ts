import { Graph } from '../../models/Graph';
import { SearchResult } from '../../models/SearchResult';

type Heuristic = (a: string, b: string) => number;

// Priority Queue for efficient node selection
class PriorityQueue<T> {
    private items: Array<{ item: T, priority: number }>;
    private valueMap: Map<T, number>;

    constructor() {
        this.items = [];
        this.valueMap = new Map();
    }

    enqueue(item: T, priority: number): void {
        // Update priority if item already exists
        if (this.valueMap.has(item)) {
            this.remove(item);
        }
        
        this.items.push({ item, priority });
        this.valueMap.set(item, priority);
        this.items.sort((a, b) => a.priority - b.priority);
    }

    dequeue(): T | undefined {
        const result = this.items.shift()?.item;
        if (result) {
            this.valueMap.delete(result);
        }
        return result;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
    
    has(item: T): boolean {
        return this.valueMap.has(item);
    }
    
    remove(item: T): void {
        const index = this.items.findIndex(i => i.item === item);
        if (index !== -1) {
            this.items.splice(index, 1);
            this.valueMap.delete(item);
        }
    }
}

export function aStarAlgorithm(
    graph: Graph,
    startNodeId: string,
    goalNodeId: string,
    heuristic: Heuristic = (a, b) => 0
): SearchResult {
    // Quick check if start and end are the same
    if (startNodeId === goalNodeId) {
        return new SearchResult([startNodeId], 0);
    }
    
    const openSet = new PriorityQueue<string>();
    openSet.enqueue(startNodeId, heuristic(startNodeId, goalNodeId));
    
    const cameFrom = new Map<string, string>();
    
    const gScore = new Map<string, number>();
    gScore.set(startNodeId, 0);
    
    const fScore = new Map<string, number>();
    fScore.set(startNodeId, heuristic(startNodeId, goalNodeId));
    
    const closedSet = new Set<string>();
    
    while (!openSet.isEmpty()) {
        // Get node with lowest fScore
        const current = openSet.dequeue()!;
        
        // If we found the goal, reconstruct and return the path
        if (current === goalNodeId) {
            return reconstructPath(graph, cameFrom, startNodeId, goalNodeId, gScore.get(goalNodeId) || 0);
        }
        
        closedSet.add(current);
        
        // Explore neighbors
        for (const neighbor of graph.getNeighbors(current)) {
            if (closedSet.has(neighbor.id)) {
                continue; // Skip already evaluated nodes
            }
            
            const tentativeGScore = (gScore.get(current) || 0) + neighbor.weight;
            
            if (!gScore.has(neighbor.id) || tentativeGScore < gScore.get(neighbor.id)!) {
                // This path is better than any previous one
                cameFrom.set(neighbor.id, current);
                gScore.set(neighbor.id, tentativeGScore);
                
                const f = tentativeGScore + heuristic(neighbor.id, goalNodeId);
                fScore.set(neighbor.id, f);
                
                openSet.enqueue(neighbor.id, f);
            }
        }
    }
    
    return new SearchResult([], 0); // No path found
}

function reconstructPath(
    graph: Graph,
    cameFrom: Map<string, string>, 
    startNodeId: string,
    goalNodeId: string,
    totalCost: number
): SearchResult {
    const path: string[] = [goalNodeId];
    let current = goalNodeId;
    
    while (current !== startNodeId) {
        const parent = cameFrom.get(current);
        if (!parent) {
            // No path exists
            return new SearchResult([], 0);
        }
        
        path.unshift(parent);
        current = parent;
    }
    
    return new SearchResult(path, totalCost);
}