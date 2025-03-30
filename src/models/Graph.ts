import { Node } from './Node';

export class Graph {
    private nodes: Map<string, Node>;

    constructor() {
        this.nodes = new Map<string, Node>();
    }

    addNode(node: Node): void {
        this.nodes.set(node.id, node);
    }

    getNode(id: string): Node | undefined {
        return this.nodes.get(id);
    }

    addEdge(from: string, to: string, weight: number): void {
        const fromNode = this.nodes.get(from);
        if (fromNode) {
            fromNode.addEdge(to, weight);
        }
    }

    getNeighbors(nodeId: string): Array<{id: string, weight: number}> {
        const node = this.nodes.get(nodeId);
        return node ? node.edges.map(edge => ({id: edge.to, weight: edge.weight})) : [];
    }

    getEdgeWeight(fromId: string, toId: string): number {
        const fromNode = this.nodes.get(fromId);
        return fromNode ? fromNode.getEdgeWeight(toId) : Infinity;
    }
}