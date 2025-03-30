export function directionalSearch(graph: any, startNode: any): any {
    const explored = new Set();
    const queue = [startNode];
    const result = [];

    while (queue.length > 0) {
        const currentNode = queue.shift();
        if (!currentNode || explored.has(currentNode.id)) {
            continue;
        }

        explored.add(currentNode.id);
        result.push(currentNode);

        const neighbors = graph.getNeighbors(currentNode);
        for (const neighbor of neighbors) {
            if (!explored.has(neighbor.id)) {
                queue.push(neighbor);
            }
        }
    }

    return result;
}