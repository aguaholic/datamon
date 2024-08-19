import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TableModule } from 'primeng/table';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

import { IPokemonListItem } from '../interfaces/pokemon.interface';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, RouterModule, PaginatorModule],
  template: `
    <p-table
      dataKey="id"
      [value]="pokemonList"
      [rows]="rows"
      [tableStyle]="{ 'min-width': '25rem' }"
    >
      <ng-template pTemplate="header">
        <tr class="text-lg font-bold text-left tracking-widest">
          <th
            class="text-center border-b-2 border-r-2 border-blue-500 bg-blue-100"
          >
            Id
          </th>
          <th
            class="text-center border-b-2 border-r-2 border-green-500 bg-green-100"
          >
            Name
          </th>
          <th
            class="text-center border-b-2 border-r-2 border-red-500 bg-red-100"
          >
            Sprite
          </th>
          <th
            class="text-center border-b-2 border-r-2 border-yellow-500 bg-yellow-100"
          >
            Types
          </th>
        </tr>
      </ng-template>

      <ng-template pTemplate="body" let-pokemon>
        <tr
          [routerLink]="['/pokemon', pokemon.id]"
          routerLinkActive="router-link-active"
          class="text-sm font-normal text-gray-700 bg-gray-50 hover:bg-lime-300 capitalize"
        >
          <td class="border-r-2 border-yellow-500">
            {{ pokemon.id }}
          </td>

          <td class="border-r-2 border-blue-500 tracking-widest	">
            {{ pokemon.name }}
          </td>

          <td class="border-r-2 border-green-500">
            <img class="m-auto" [src]="pokemon.image" [alt]="pokemon.name" />
          </td>

          <td class="border-r-2 border-red-500 tracking-widest">
            {{ pokemon.types }}
          </td>
        </tr>
      </ng-template>
    </p-table>

    <p-paginator
    (onPageChange)="handlePageChange($event)"
    [first]="first"
    [rows]="rows"
    [totalRecords]="totalRecords"
    />
  `,
})
export class TableComponent {
  pokemonService: PokemonService = inject(PokemonService);

  first: number;
  rows: number;
  totalRecords!: number;

  pokemonList!: IPokemonListItem[];

  constructor() {
    this.first = 0;
    this.rows = 10;

    this.pokemonService.getAllPokemons(this.rows, this.first).then(apiResponse => {
      this.pokemonList = apiResponse.results;
      this.totalRecords = apiResponse.records;
    });
  }

  handlePageChange(event: PaginatorState): void {
    this.pokemonService.getAllPokemons(this.rows, event.page!).then(apiResponse => {
      this.first = event.first!;
      this.pokemonList = apiResponse.results;
    });
  }
}
