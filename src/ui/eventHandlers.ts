import { Graph } from '../models/Graph';
import { SearchResult } from '../models/SearchResult';
import { loadMap } from '../utils/mapLoader';
import { visualizePath } from '../utils/pathVisualizer';
import { breadthFirstSearch, depthFirstSearch, uniformCostSearch, limitedDepthSearch } from '../algorithms/uninformed';
import { aStarAlgorithm } from '../algorithms/informed';

export async function setupEventHandlers() {
    const searchButton = document.getElementById('searchButton');
    const algorithmSelect = document.getElementById('algorithmSelect') as HTMLSelectElement;
    const startNodeInput = document.getElementById('startNodeInput') as HTMLInputElement;
    const endNodeInput = document.getElementById('endNodeInput') as HTMLInputElement;
    
    if (!searchButton || !algorithmSelect || !startNodeInput) {
        console.error('Required DOM elements not found');
        return;
    }
    
    const graph = await loadMap('map-data.json');
    
    searchButton.addEventListener('click', () => {
        const algorithm = algorithmSelect.value;
        const startNode = startNodeInput.value;
        const endNode = endNodeInput?.value || '';
        
        let result: SearchResult;
        
        switch (algorithm) {
            case 'bfs':
                result = breadthFirstSearch(graph, startNode);
                break;
            case 'ucs':
                result = uniformCostSearch(graph, startNode);
                break;
            case 'dfs':
                result = depthFirstSearch(graph, startNode);
                break;
            case 'lds':
                const depthLimit = 5; // Default depth limit
                result = limitedDepthSearch(graph, startNode, depthLimit);
                break;
            case 'astar':
                if (!endNode) {
                    alert('End node is required for A* algorithm');
                    return;
                }
                result = aStarAlgorithm(graph, startNode, endNode);
                break;
            default:
                result = new SearchResult([], 0);
                break;
        }
        
        visualizePath(result.path, result.totalDistance);
    });
}