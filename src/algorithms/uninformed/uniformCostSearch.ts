import { Graph } from '../../models/Graph';
import { SearchResult } from '../../models/SearchResult';

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
}

export function uniformCostSearch(graph: Graph, startNodeId: string, goalNodeId: string = 'Bucharest'): SearchResult {
    const priorityQueue = new PriorityQueue<string>();
    priorityQueue.enqueue(startNodeId, 0);
    
    const visited = new Set<string>();
    const distances = new Map<string, number>();
    const previous = new Map<string, string | null>();
    
    distances.set(startNodeId, 0);
    previous.set(startNodeId, null);
    
    while (!priorityQueue.isEmpty()) {
        const current = priorityQueue.dequeue();
        
        if (!current) continue;
        
        // If we found the goal, reconstruct the path and return
        if (current === goalNodeId) {
            return reconstructPath(startNodeId, goalNodeId, previous, distances);
        }
        
        if (visited.has(current)) continue;
        
        visited.add(current);
        
        const neighbors = graph.getNeighbors(current);
        
        for (const neighbor of neighbors) {
            if (visited.has(neighbor.id)) continue;
            
            const distance = distances.get(current)! + neighbor.weight;
            
            if (!distances.has(neighbor.id) || distance < distances.get(neighbor.id)!) {
                distances.set(neighbor.id, distance);
                previous.set(neighbor.id, current);
                priorityQueue.enqueue(neighbor.id, distance);
            }
        }
    }
    
    // If we didn't find a path to the goal
    return new SearchResult([], 0);
}

function reconstructPath(
    startNodeId: string, 
    goalNodeId: string, 
    previous: Map<string, string | null>,
    distances: Map<string, number>
): SearchResult {
    const path: string[] = [];
    let current = goalNodeId;
    
    // Reconstruct the path from goal to start
    while (current && current !== startNodeId) {
        path.unshift(current);
        const prev = previous.get(current);
        if (!prev) break;
        current = prev;
    }
    
    // Add the start node
    path.unshift(startNodeId);
    
    // Get the total distance to the goal
    const totalDistance = distances.get(goalNodeId) || 0;
    
    return new SearchResult(path, totalDistance);
}