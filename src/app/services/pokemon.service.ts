import { Injectable } from '@angular/core';

import {
  IPokemon,
  IPokemonListItem,
  IPokemonListResponse,
  IPaginatedPokemonList,
  IPokemonDetailResponse,
  IPokemonResponse,
} from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  /*
  TODO: move the base URL to the .env file
  */
  BASE_URL = 'https://pokeapi.co/api/v2';

  async getAllPokemonsPaginated(
    pageLength: number,
    selectePage: number,
  ): Promise<IPaginatedPokemonList> {
    const offset = selectePage > 0 ? pageLength * selectePage : 0;

    const pokemonListResponse = await fetch(
      `${this.BASE_URL}/pokemon?limit=${pageLength}&offset=${offset}`,
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

  async getPokemonById(pokemonId: number): Promise<IPokemon> {
    const pokemonResponse = await fetch(
      `${this.BASE_URL}/pokemon/${pokemonId}`,
    );

    const pokemon: IPokemonResponse = await pokemonResponse.json();

    return {
      id: pokemon.id,
      name: pokemon.name,
      order: pokemon.order,
      height: pokemon.height,
      weight: pokemon.weight,
      sprites: pokemon.sprites,
      species: pokemon.species.name,
      abilities: pokemon.abilities.map((ability) => ability.ability.name),
      base_experience: pokemon.base_experience,
    };
  }

  async getPokemonByName(name: string): Promise<IPokemon | null> {
    const pokemonResponse = await fetch(`${this.BASE_URL}/pokemon/${name}`);

    if (pokemonResponse.ok) {
      const pokemon: IPokemonResponse = await pokemonResponse.json();

      return {
        id: pokemon.id,
        name: pokemon.name,
        order: pokemon.order,
        height: pokemon.height,
        weight: pokemon.weight,
        sprites: pokemon.sprites,
        species: pokemon.species.name,
        abilities: pokemon.abilities.map((ability) => ability.ability.name),
        base_experience: pokemon.base_experience,
      };
    }

    return null;
  }
}
