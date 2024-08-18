import { Component, Input, inject } from '@angular/core';
import { TableModule } from 'primeng/table';

import { IPokemonListItem } from '../interfaces/pokemon.interface';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule],
  template: `
    <p-table
      dataKey="id"
      [value]="pokemonList"
      [rows]="10"
      [paginator]="true"
      [tableStyle]="{ 'min-width': '75rem' }"
    >
      <ng-template pTemplate="header">
        <tr>
          <th>Id</th>
          <th>Sprite</th>
          <th>Name</th>
          <th>Type(s)</th>
        </tr>
      </ng-template>

      <ng-template pTemplate="body" let-pokemon>
        <tr [pSelectableRow]="pokemon">
          <td>
            {{ pokemon.id }}
          </td>

          <td>
            {{ pokemon.name }}
          </td>

          <td>
            <img [src]="pokemon.image" [alt]="pokemon.name" />
          </td>

          <td>
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
