interface IPokemonListResponseItem {
  name: string;
  url: string;
}

export interface IPokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: IPokemonListResponseItem[];
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
