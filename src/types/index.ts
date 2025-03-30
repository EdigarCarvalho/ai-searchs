export interface Node {
    id: string;
    edges: Edge[];
}

export interface Edge {
    target: Node;
    weight: number;
}

export interface Graph {
    nodes: Node[];
    addNode(node: Node): void;
    addEdge(sourceId: string, targetId: string, weight: number): void;
    getNeighbors(nodeId: string): Edge[];
}

export interface SearchResult {
    path: Node[];
    totalDistance: number;
}