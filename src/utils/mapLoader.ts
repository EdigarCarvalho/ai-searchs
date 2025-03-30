import { Graph } from '../models/Graph';
import { Node } from '../models/Node';

export function loadMap(filePath: string = 'default-map.json'): Promise<Graph> {
    return new Promise((resolve) => {
        // In a real app, this would load from a file
        // For this example, we'll create a simple graph directly
        const graphData = {
            nodes: [
                { id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }
            ],
            edges: [
                { from: 'A', to: 'B', weight: 5 },
                { from: 'A', to: 'C', weight: 3 },
                { from: 'B', to: 'D', weight: 2 },
                { from: 'C', to: 'D', weight: 6 }
            ]
        };
        
        const graph = new Graph();
        
        for (const node of graphData.nodes) {
            graph.addNode(new Node(node.id));
        }
        
        for (const edge of graphData.edges) {
            graph.addEdge(edge.from, edge.to, edge.weight);
        }
        
        resolve(graph);
    });
}