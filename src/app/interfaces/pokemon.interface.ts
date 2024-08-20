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

interface Ability {
  ability: {
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

export interface IPokemonResponse {
  id: number;
  name: string;
  order: number;
  weight: number;
  height: number;
  sprites: Sprite;
  species: {
    name: string;
  };
  abilities: Ability[];
  base_experience: string;
}

export interface IPokemon {
  id: number;
  name: string;
  order: number;
  weight: number;
  height: number;
  sprites: Sprite;
  species: string;
  abilities: string[];
  base_experience: string;
}
