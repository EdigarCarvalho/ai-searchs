import { Graph } from '../models/Graph';
import { Node } from '../models/Node';
import { romaniaCities } from './heuristics';


/**
 * Loads the Romania map data into a Graph object
 */
export function loadMap(filePath?: string): Promise<Graph> {
  return new Promise((resolve) => {
    const graph = new Graph();
    
    // Add all cities as nodes
    Object.keys(romaniaCities).forEach(city => {
      graph.addNode(new Node(city));
    });
    
    // Add edges between cities
    Object.entries(romaniaCities).forEach(([city, connections]) => {
      Object.entries(connections).forEach(([neighbor, distance]) => {
        graph.addEdge(city, neighbor, distance);
      });
    });
    
    resolve(graph);
  });
}