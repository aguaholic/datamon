import { Component, Input, inject } from '@angular/core';
import { TableModule } from 'primeng/table';

import { IPokemonListItem } from '../interfaces/pokemon.interface';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule],
  template: `
    <p-table
      dataKey="id"
      selectionMode="single"
      [value]="pokemonList"
      [rows]="10"
      [paginator]="true"
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
          [pSelectableRow]="pokemon"
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
  `,
})
export class TableComponent {
  @Input() pokemonList!: IPokemonListItem[];

  pokemonService: PokemonService = inject(PokemonService);

  constructor() {
    this.pokemonService.getAllPokemons().then((result) => {
      this.pokemonList = result;
    });
  }
}
