import { 
    aStarAlgorithm, 
    breadthFirstSearch, 
    depthFirstSearch, 
    directionalSearch,
    greedySearch, 
    iterativeDeepeningSearch, 
    limitedDepthSearch, 
    uniformCostSearch 
} from '../algorithms';
import { Graph } from '../models/Graph';
import { SearchResult } from '../models/SearchResult';
import { loadMap } from '../utils/mapLoader';
import { visualizePath } from '../utils/pathVisualizer';
import { manhattanDistance, euclideanDistance, zeroHeuristic } from '../utils/heuristics';



export async function setupEventHandlers() {
    const searchButton = document.getElementById('searchButton');
    const algorithmSelect = document.getElementById('algorithmSelect') as HTMLSelectElement;
    const startNodeInput = document.getElementById('startNodeInput') as HTMLInputElement;
    const endNodeInput = document.getElementById('endNodeInput') as HTMLInputElement;
    const heuristicSelect = document.getElementById('heuristicSelect') as HTMLSelectElement;
    
    if (!searchButton || !algorithmSelect || !startNodeInput) {
        console.error('Required DOM elements not found');
        return;
    }
    
    const graph = await loadMap();
    
    searchButton.addEventListener('click', () => {
        console.log('Search button clicked');
        

        const algorithm = algorithmSelect.value;
        const startNode = startNodeInput.value;
        const endNode = endNodeInput?.value || 'Bucharest'; // Default to Bucharest if not specified
        
        // Select heuristic function
        let heuristicFunction = manhattanDistance;
        if (heuristicSelect) {
            switch (heuristicSelect.value) {
                case 'manhattan':
                    heuristicFunction = manhattanDistance;
                    break;
                case 'euclidean':
                    heuristicFunction = euclideanDistance;
                    break;
                case 'zero':
                    heuristicFunction = zeroHeuristic;
                    break;
            }
        }
        
        let result: SearchResult;
        
        switch (algorithm) {
            case 'bfs':
                result = breadthFirstSearch(graph, startNode, endNode);
                break;
            case 'ucs':
                result = uniformCostSearch(graph, startNode);
                break;
            case 'dfs':
                result = depthFirstSearch(graph, startNode);
                break;
            case 'lds':
                const depthLimit = 10; // Default depth limit
                result = limitedDepthSearch(graph, startNode, depthLimit);
                break;
            case 'ids':
                const maxDepth = 20; // Default max depth
                result = iterativeDeepeningSearch(graph, startNode, maxDepth);
                break;
            case 'directional':
                if (!endNode) {
                    alert('End node is required for directional search');
                    return;
                }
                result = directionalSearch(graph, startNode, endNode);
                break;
            case 'greedy':
                if (!endNode) {
                    alert('End node is required for greedy search');
                    return;
                }
                result = greedySearch(graph, startNode, endNode, heuristicFunction);
                break;
            case 'astar':
                if (!endNode) {
                    alert('End node is required for A* algorithm');
                    return;
                }
                result = aStarAlgorithm(graph, startNode, endNode, heuristicFunction);
                break;
            default:
                result = new SearchResult([], 0);
                break;
        }
        
        console.log(result);
        

        // Display the result
        visualizePath(result.path, result.totalDistance);
        
        // Add some detailed statistics
        const statsElement = document.getElementById('searchStats');
        if (statsElement) {
            statsElement.innerHTML = `
                <h3>Search Results</h3>
                <p>Algorithm: ${algorithm}</p>
                <p>Start: ${startNode}</p>
                <p>End: ${endNode}</p>
                <p>Path length: ${result.path.length} nodes</p>
                <p>Total distance: ${result.totalDistance} km</p>
                <p>Path: ${result.path.join(' → ')}</p>
            `;
        }
    });
}