export class Node {
    id: string;
    edges: Array<{to: string, weight: number}>;

    constructor(id: string) {
        this.id = id;
        this.edges = [];
    }

    addEdge(to: string, weight: number): void {
        this.edges.push({ to, weight });
    }

    getEdgeWeight(to: string): number {
        const edge = this.edges.find(e => e.to === to);
        return edge ? edge.weight : Infinity;
    }
}