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

export function uniformCostSearch(graph: Graph, startNodeId: string): SearchResult {
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
    
    // Reconstruct path
    const resultPath: string[] = [];
    let currentNode: string | null = visited.size > 0 ? Array.from(visited)[visited.size - 1] : null;
    
    while (currentNode) {
        resultPath.unshift(currentNode);
        currentNode = previous.get(currentNode) || null;
    }
    
    // Get the total distance for the last node in the path
    const totalDistance = resultPath.length > 0 ? (distances.get(resultPath[resultPath.length - 1]) || 0) : 0;
    
    return new SearchResult(resultPath, totalDistance);
}