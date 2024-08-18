import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table/table.component';
import { TableData } from './table/table-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TableComponent],
  template: `
    <h1>Datamon</h1>
    <h2>Your Pokémon db</h2>

    <app-table
      *ngFor="let pokemon of pokemonList"
      [pokemon]="pokemon"
    ></app-table>
  `,
})
export class AppComponent {
  title = 'Datamon';
  pokemonList: TableData[] = [
    {
      id: 1,
      name: 'Pikachu',
      type: ['Electric'],
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
    },
    {
      id: 2,
      name: 'Charizard',
      type: ['Fire', 'Flying'],
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png',
    },
    {
      id: 3,
      name: 'Bulbasaur',
      type: ['Grass', 'Poison'],
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
    },
    {
      id: 4,
      name: 'Squirtle',
      type: ['Water'],
      image: 'https://assets.pokemon.com/',
    },
  ];
}
