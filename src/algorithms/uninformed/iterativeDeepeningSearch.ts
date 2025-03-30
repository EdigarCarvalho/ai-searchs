export function iterativeDeepeningSearch(graph: any, startNode: any) {
    const depthLimitedSearch = (node: any, depth: number): any => {
        if (depth === 0 && node === startNode) {
            return { path: [node], found: true };
        }
        if (depth > 0) {
            for (const neighbor of graph.getNeighbors(node)) {
                const result = depthLimitedSearch(neighbor, depth - 1);
                if (result.found) {
                    return { path: [node, ...result.path], found: true };
                }
            }
        }
        return { path: [], found: false };
    };

    let depth = 0;
    let result;

    while (true) {
        result = depthLimitedSearch(startNode, depth);
        if (result.found) {
            return result;
        }
        depth++;
    }
}