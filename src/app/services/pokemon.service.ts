import { Injectable } from '@angular/core';

import {
  IPaginatedPokemonList,
  IPokemonDetailResponse,
  IPokemonListItem,
  IPokemonListResponse,
} from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  // TODO: remove this
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async getAllPokemons(pageLength: number, selectePage: number): Promise<IPaginatedPokemonList> {

    const offset = selectePage > 0 ? pageLength * selectePage : 0;

    /*
    TODO: move the base URL to the .env file
    */
    const pokemonListResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${pageLength}&offset=${offset}`,
    );

    const pokemonList: IPokemonListResponse = await pokemonListResponse.json();

    const pokemonDetails: IPokemonListItem[] = await Promise.all(
      pokemonList.results.map(async (pokemonItem) => {
        const pokemonDetailResponse = await fetch(pokemonItem.url);

        const pokemonDetail: IPokemonDetailResponse =
          await pokemonDetailResponse.json();

        return {
          id: pokemonDetail.id,
          name: pokemonDetail.name,
          image: pokemonDetail.sprites.front_default,
          types: pokemonDetail.types.map((t) => t.type.name),
        };
      }),
    );

    return {
      results: pokemonDetails,
      records: pokemonList.count,
    };
  }
}
