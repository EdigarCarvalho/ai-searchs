// Define interfaces for our data structures
interface CityConnections {
  [city: string]: number;
}

interface RomaniaMap {
  [city: string]: CityConnections;
}

// Map of Romania cities with their connections and distances
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

// Straight-line distances to Bucharest (used for heuristic calculations)
const straightLineDistanceToBucharest: {[city: string]: number} = {
  Arad: 366,
  Bucharest: 0,
  Craiova: 160,
  Drobeta: 242,
  Eforie: 161,
  Fagaras: 176,
  Giurgiu: 77,
  Hirsova: 151,
  Iasi: 226,
  Lugoj: 244,
  Mehadia: 241,
  Neamt: 234,
  Oradea: 380,
  Pitesti: 100,
  Rimnicu_Vilcea: 193,
  Sibiu: 253,
  Timisoara: 329,
  Urziceni: 80,
  Vaslui: 199,
  Zerind: 374
};

/**
 * Calculates the heuristic distance between two cities using straight-line distances to Bucharest.
 * This is optimized for finding paths to Bucharest, which is the goal in the classic Romania problem.
 */
export function manhattanDistance(a: string, b: string): number {
  // If destination is Bucharest, use the straight-line distance
  if (b === 'Bucharest') {
    return straightLineDistanceToBucharest[a] || 0;
  }
  
  // If both a and b are Bucharest, distance is 0
  if (a === 'Bucharest' && b === 'Bucharest') {
    return 0;
  }
  
  // If a is Bucharest, use distance from b to Bucharest
  if (a === 'Bucharest') {
    return straightLineDistanceToBucharest[b] || 0;
  }
  
  // For other city pairs, use a simple distance estimate
  // This is a fallback when we don't have the specific heuristic
  return Math.abs((straightLineDistanceToBucharest[a] || 0) - (straightLineDistanceToBucharest[b] || 0));
}

/**
 * Uses the straight-line distance to Bucharest as the Euclidean distance heuristic.
 * For the Romania map problem, this is the standard admissible heuristic.
 */
export function euclideanDistance(a: string, b: string): number {
  // Our implementation is identical to manhattanDistance because we're
  // using the provided straight-line distances, which are already Euclidean
  return manhattanDistance(a, b);
}

/**
 * Function that always returns 0 - equivalent to Dijkstra's algorithm
 * when used with A*
 */
export function zeroHeuristic(a: string, b: string): number {
  return 0;
}

/**
 * Returns the actual edge weight between two directly connected cities,
 * or Infinity if they're not directly connected.
 * This can be used to verify neighbor connections during search.
 */
export function getActualDistance(a: string, b: string): number {
  if (romaniaCities[a] && romaniaCities[a][b] !== undefined) {
    return romaniaCities[a][b];
  }
  return Infinity;
}