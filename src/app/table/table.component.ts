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
    <p-table
      dataKey="id"
      [value]="pokemonList"
      [rows]="rows"
      [tableStyle]="{ 'min-width': '25rem' }"
    >
      <ng-template pTemplate="caption">
        <div class="flex">
          <p-iconField iconPosition="left" class="ml-auto">
            <p-inputIcon>
              <i class="pi pi-search"></i>
            </p-inputIcon>

            <input
              pInputText
              type="text"
              (input)="this.handleSearch($event)"
              placeholder="Search by name"
            />
          </p-iconField>
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

  constructor() {
    this.first = 0;
    this.rows = 10;

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

  handleSearch(event: Event): void {
    const pokemonName = (event.target as HTMLInputElement).value;

    this.pokemonService.getPokemonByName(pokemonName).then((apiResponse) => {

      if (apiResponse) {
        this.router.navigate([`pokemon/${apiResponse?.id}`]);
      }
    });
  }
}
