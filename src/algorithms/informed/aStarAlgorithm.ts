import { Graph } from '../../models/Graph';
import { SearchResult } from '../../models/SearchResult';

type Heuristic = (a: string, b: string) => number;

export function aStarAlgorithm(
    graph: Graph,
    startNodeId: string,
    goalNodeId: string,
    heuristic: Heuristic = (a, b) => 0
): SearchResult {
    const openSet: string[] = [startNodeId];
    const cameFrom = new Map<string, string>();
    
    const gScore = new Map<string, number>();
    gScore.set(startNodeId, 0);
    
    const fScore = new Map<string, number>();
    fScore.set(startNodeId, heuristic(startNodeId, goalNodeId));
    
    while (openSet.length > 0) {
        // Find the node in openSet with the lowest fScore
        let current = openSet.reduce((lowest, nodeId) => 
            (fScore.get(nodeId) || Infinity) < (fScore.get(lowest) || Infinity) ? nodeId : lowest, 
            openSet[0]
        );
        
        if (current === goalNodeId) {
            const totalPath = reconstructPath(cameFrom, current);
            return new SearchResult(totalPath, gScore.get(current) || 0);
        }
        
        openSet.splice(openSet.indexOf(current), 1);
        
        for (const neighbor of graph.getNeighbors(current)) {
            const tentativeGScore = (gScore.get(current) || Infinity) + neighbor.weight;
            
            if (!gScore.has(neighbor.id) || tentativeGScore < (gScore.get(neighbor.id) || Infinity)) {
                cameFrom.set(neighbor.id, current);
                gScore.set(neighbor.id, tentativeGScore);
                fScore.set(neighbor.id, tentativeGScore + heuristic(neighbor.id, goalNodeId));
                
                if (!openSet.includes(neighbor.id)) {
                    openSet.push(neighbor.id);
                }
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