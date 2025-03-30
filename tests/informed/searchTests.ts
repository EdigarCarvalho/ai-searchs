import { Graph } from '../../src/models/Graph';
import { SearchResult } from '../../src/models/SearchResult';
import { greedySearch } from '../../src/algorithms/informed/greedySearch';
import { aStarAlgorithm } from '../../src/algorithms/informed/aStarAlgorithm';

describe('Informed Search Algorithms', () => {
    let graph: Graph;

    beforeEach(() => {
        graph = new Graph();
        // Setup the graph with nodes and edges for testing
        graph.addNode('A');
        graph.addNode('B');
        graph.addNode('C');
        graph.addEdge('A', 'B', 1);
        graph.addEdge('A', 'C', 4);
        graph.addEdge('B', 'C', 2);
    });

    test('Greedy Search should find the shortest path', () => {
        const result: SearchResult = greedySearch(graph, 'A');
        expect(result.path).toEqual(['A', 'B', 'C']);
        expect(result.totalDistance).toBe(3);
    });

    test('A* Algorithm should find the optimal path', () => {
        const result: SearchResult = aStarAlgorithm(graph, 'A', 'C');
        expect(result.path).toEqual(['A', 'B', 'C']);
        expect(result.totalDistance).toBe(3);
    });
});