import { Injectable } from '@angular/core';
import {  IPokemonListResponse, IPokemonListResponseItem } from './interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  async getAllPokemons(): Promise<void> {
    /*
    TODO: move me to .env file
    */
    const pokemonListResponse = await fetch(
      "https://pokeapi.co/api/v2/pokemon"
    );

    const pokemonList: IPokemonListResponse = await pokemonListResponse.json();

    const pokemonDetails = await Promise.all(
      pokemonList.results.map(async pokemonItem => {

        const pokemonDetailResponse = await fetch(
          pokemonItem.url
        );

        const pokemonDetail = pokemonDetailResponse.json();

        return pokemonDetail;
      })
    );

    console.log(pokemonDetails);
  }
}
