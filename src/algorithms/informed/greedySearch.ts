export function greedySearch(graph: any, startNode: any): any {
    const visited = new Set();
    const priorityQueue = new MinHeap();
    priorityQueue.insert({ node: startNode, cost: 0 });

    while (!priorityQueue.isEmpty()) {
        const { node } = priorityQueue.extractMin();
        
        if (visited.has(node)) continue;
        visited.add(node);

        if (graph.isGoal(node)) {
            return graph.getPath(node);
        }

        const neighbors = graph.getNeighbors(node);
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                const cost = graph.getHeuristic(neighbor);
                priorityQueue.insert({ node: neighbor, cost });
            }
        }
    }

    return null; // No path found
}

class MinHeap {
    private heap: any[];

    constructor() {
        this.heap = [];
    }

    insert(item: any) {
        this.heap.push(item);
        this.bubbleUp();
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return min;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    private bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].cost >= this.heap[parentIndex].cost) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    private bubbleDown() {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.cost < element.cost) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild.cost < element.cost) ||
                    (swap !== null && rightChild.cost < leftChild.cost)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }
}