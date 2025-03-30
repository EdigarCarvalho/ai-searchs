import { Graph } from '../models/Graph';
import { Node } from '../models/Node';

interface CityConnections {
  [city: string]: number;
}

interface RomaniaMap {
  [city: string]: CityConnections;
}

// Romania map data - city connections with distances
const romaniaCities: RomaniaMap = {
  Arad: { 
    Zerind: 75, 
    Sibiu: 140, 
    Timisoara: 118 
  },
  Zerind: { 
    Arad: 75, 
    Oradea: 71 
  },
  Oradea: { 
    Zerind: 71,
    Sibiu: 151 
  },
  Sibiu: { 
    Arad: 140, 
    Oradea: 151, 
    Rimnicu_Vilcea: 80, 
    Fagaras: 99 
  },
  Timisoara: { 
    Arad: 118, 
    Lugoj: 111 
  },
  Lugoj: { 
    Timisoara: 111, 
    Mehadia: 70 
  },
  Mehadia: { 
    Lugoj: 70, 
    Drobeta: 75 
  },
  Drobeta: { 
    Mehadia: 75, 
    Craiova: 120 
  },
  Craiova: { 
    Drobeta: 120, 
    Rimnicu_Vilcea: 146, 
    Pitesti: 138 
  },
  Rimnicu_Vilcea: { 
    Sibiu: 80, 
    Craiova: 146, 
    Pitesti: 97 
  },
  Fagaras: { 
    Sibiu: 99, 
    Bucharest: 211 
  },
  Pitesti: { 
    Rimnicu_Vilcea: 97, 
    Craiova: 138, 
    Bucharest: 101 
  },
  Bucharest: { 
    Fagaras: 211, 
    Pitesti: 101, 
    Giurgiu: 90, 
    Urziceni: 85 
  },
  Giurgiu: { 
    Bucharest: 90 
  },
  Urziceni: { 
    Bucharest: 85, 
    Hirsova: 98, 
    Vaslui: 142 
  },
  Hirsova: { 
    Urziceni: 98, 
    Eforie: 86 
  },
  Eforie: { 
    Hirsova: 86 
  },
  Vaslui: { 
    Urziceni: 142, 
    Iasi: 92 
  },
  Iasi: { 
    Vaslui: 92, 
    Neamt: 87 
  },
  Neamt: { 
    Iasi: 87 
  }
};

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