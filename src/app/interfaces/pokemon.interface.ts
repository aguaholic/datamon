export interface IPokemonListResponseItem {
  name: string;
  url: string;
}

export interface IPokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: IPokemonListResponseItem[];
}

export interface IPokemonListItem {
  id: number;
  name: string;
  type: string[];
  image: string;
}
