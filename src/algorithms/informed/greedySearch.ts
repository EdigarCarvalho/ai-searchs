import { Graph } from '../../models/Graph';
import { SearchResult } from '../../models/SearchResult';

type Heuristic = (a: string, b: string) => number;

// Priority Queue for more efficient node selection
class PriorityQueue<T> {
    private items: Array<{ item: T, priority: number }>;

    constructor() {
        this.items = [];
    }

    enqueue(item: T, priority: number): void {
        this.items.push({ item, priority });
        this.items.sort((a, b) => a.priority - b.priority);
    }

    dequeue(): T | undefined {
        return this.items.shift()?.item;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
    
    includes(item: T): boolean {
        return this.items.some(i => i.item === item);
    }
}

export function greedySearch(
    graph: Graph, 
    startNodeId: string, 
    goalNodeId: string,
    heuristic: Heuristic
): SearchResult {
    // Quick check if start and end are the same
    if (startNodeId === goalNodeId) {
        return new SearchResult([startNodeId], 0);
    }
    
    const openQueue = new PriorityQueue<string>();
    openQueue.enqueue(startNodeId, heuristic(startNodeId, goalNodeId));
    
    const closedSet = new Set<string>();
    const cameFrom = new Map<string, string>();
    
    while (!openQueue.isEmpty()) {
        // Get the node with lowest heuristic value
        const current = openQueue.dequeue()!;
        
        // If we found the goal, reconstruct and return the path
        if (current === goalNodeId) {
            return reconstructPath(graph, cameFrom, startNodeId, goalNodeId);
        }
        
        // Mark as explored
        closedSet.add(current);
        
        // Explore neighbors
        for (const neighbor of graph.getNeighbors(current)) {
            if (closedSet.has(neighbor.id)) {
                continue; // Skip already explored nodes
            }
            
            if (!openQueue.includes(neighbor.id)) {
                cameFrom.set(neighbor.id, current);
                openQueue.enqueue(neighbor.id, heuristic(neighbor.id, goalNodeId));
            }
        }
    }
    
    return new SearchResult([], 0); // No path found
}

function reconstructPath(
    graph: Graph,
    cameFrom: Map<string, string>, 
    startNodeId: string,
    goalNodeId: string
): SearchResult {
    const path: string[] = [goalNodeId];
    let current = goalNodeId;
    let totalDistance = 0;
    
    while (current !== startNodeId) {
        const parent = cameFrom.get(current);
        if (!parent) {
            // No path exists
            return new SearchResult([], 0);
        }
        
        path.unshift(parent);
        totalDistance += graph.getEdgeWeight(parent, current);
        current = parent;
    }
    
    return new SearchResult(path, totalDistance);
}