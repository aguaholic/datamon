import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

import { IPokemonListItem } from '../interfaces/pokemon.interface';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TableModule,
    RouterModule,
    PaginatorModule,
    IconFieldModule,
    InputIconModule,
  ],
  template: `
    @if (pokemonNotFound) {
      <div
        id="toast-warning"
        class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow"
        role="alert"
      >
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"
            />
          </svg>
        </div>

        <div class="ms-3 text-sm font-normal">Pokémon does not exist</div>
        <button
          type="button"
          (click)="handleCloseButton()"
          class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
          data-dismiss-target="#toast-warning"
          aria-label="Close"
        >

        <svg
            class="w-3 h-3"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    }

    <p-table
      dataKey="id"
      [value]="pokemonList"
      [rows]="rows"
      [tableStyle]="{ 'min-width': '25rem' }"
    >
      <ng-template pTemplate="caption">
        <div class="flex">
          <input
            pInputText
            type="text"
            (input)="this.saveSearch($event)"
            placeholder="Search by name"
          />

          <button
            [disabled]="!pokemonName || pokemonName.length === 0"
            (click)="this.handleSearch()"
          >
            Search
          </button>
        </div>
      </ng-template>

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
  router: Router = inject(Router);
  pokemonService: PokemonService = inject(PokemonService);

  first: number;
  rows: number;
  totalRecords!: number;

  pokemonList!: IPokemonListItem[];

  pokemonName!: string;
  pokemonNotFound: boolean;

  constructor() {
    this.first = 0;
    this.rows = 10;

    this.pokemonNotFound = false;

    this.pokemonService
      .getAllPokemonsPaginated(this.rows, this.first)
      .then((apiResponse) => {
        this.pokemonList = apiResponse.results;
        this.totalRecords = apiResponse.records;
      });
  }

  handlePageChange(event: PaginatorState): void {
    this.pokemonService
      .getAllPokemonsPaginated(this.rows, event.page!)
      .then((apiResponse) => {
        this.first = event.first!;
        this.pokemonList = apiResponse.results;
      });
  }

  saveSearch(event: Event): void {
    this.pokemonName = (event.target as HTMLInputElement).value;
  }

  handleSearch(): void {
    this.pokemonService
      .getPokemonByName(this.pokemonName.toLowerCase())
      .then((apiResponse) => {
        if (apiResponse) {
          this.pokemonNotFound = false;
          this.router.navigate([`pokemon/${apiResponse?.id}`]);
        } else {
          this.pokemonNotFound = true;
        }
      });
  }

  handleCloseButton() {
    this.pokemonNotFound = false;
  }
}
