interface IPokemonListResponseItem {
  name: string;
  url: string;
}

interface Sprite {
  front_default: string;
}

interface Types {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface IPokemonListResponse {
  next: string;
  count: number;
  previous: string;
  results: IPokemonListResponseItem[];
}

export interface IPokemonDetailResponse {
  id: number;
  name: string;
  sprites: Sprite;
  types: Types[];
}

export interface IPokemonListItem {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export interface IPaginatedPokemonList {
  records: number;
  results: IPokemonListItem[];
}

export interface IPokemon {
  id: number;
  name: string;
  order: number;
  weight: number;
  height: number;
  sprites: Sprite;
  base_experience: string;
}
