export class SearchResult {
    path: string[];
    totalDistance: number;

    constructor(path: string[] = [], totalDistance: number = 0) {
        this.path = path;
        this.totalDistance = totalDistance;
    }
}