export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown"; // the API only has these values
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[]; // array of episode URLs
  url: string;
  created: string; // ISO date string
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string; // e.g. "S01E01"
  characters: string[]; // array of character URLs
  url: string;
  created: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[]; // array of character URLs
  url: string;
  created: string;
}

export interface PaginatedResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

export type CharacterResponse = PaginatedResponse<Character>;
export type EpisodeResponse = PaginatedResponse<Episode>;
export type LocationResponse = PaginatedResponse<Location>;