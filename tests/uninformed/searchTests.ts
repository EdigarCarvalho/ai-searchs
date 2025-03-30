import { breadthFirstSearch } from '../../src/algorithms/uninformed/breadthFirstSearch';
import { uniformCostSearch } from '../../src/algorithms/uninformed/uniformCostSearch';
import { depthFirstSearch } from '../../src/algorithms/uninformed/depthFirstSearch';
import { limitedDepthSearch } from '../../src/algorithms/uninformed/limitedDepthSearch';
import { iterativeDeepeningSearch } from '../../src/algorithms/uninformed/iterativeDeepeningSearch';
import { directionalSearch } from '../../src/algorithms/uninformed/directionalSearch';
import { Graph } from '../../src/models/Graph';
import { Node } from '../../src/models/Node';
import { SearchResult } from '../../src/models/SearchResult';

describe('Uninformed Search Algorithms', () => {
    let graph: Graph;
    let startNode: Node;
    let goalNode: Node;

    beforeEach(() => {
        graph = new Graph();
        startNode = new Node('A');
        goalNode = new Node('B');
        graph.addNode(startNode);
        graph.addNode(goalNode);
        graph.addEdge(startNode, goalNode, 1);
    });

    test('Breadth-First Search', () => {
        const result: SearchResult = breadthFirstSearch(graph, startNode);
        expect(result).toBeDefined();
        expect(result.path).toContain(startNode);
        expect(result.path).toContain(goalNode);
    });

    test('Uniform Cost Search', () => {
        const result: SearchResult = uniformCostSearch(graph, startNode);
        expect(result).toBeDefined();
        expect(result.path).toContain(startNode);
        expect(result.path).toContain(goalNode);
    });

    test('Depth-First Search', () => {
        const result: SearchResult = depthFirstSearch(graph, startNode);
        expect(result).toBeDefined();
        expect(result.path).toContain(startNode);
        expect(result.path).toContain(goalNode);
    });

    test('Limited Depth Search', () => {
        const depthLimit = 1;
        const result: SearchResult = limitedDepthSearch(graph, startNode, depthLimit);
        expect(result).toBeDefined();
        expect(result.path).toContain(startNode);
        expect(result.path).toContain(goalNode);
    });

    test('Iterative Deepening Search', () => {
        const result: SearchResult = iterativeDeepeningSearch(graph, startNode);
        expect(result).toBeDefined();
        expect(result.path).toContain(startNode);
        expect(result.path).toContain(goalNode);
    });

    test('Directional Search', () => {
        const result: SearchResult = directionalSearch(graph, startNode);
        expect(result).toBeDefined();
        expect(result.path).toContain(startNode);
        expect(result.path).toContain(goalNode);
    });
});