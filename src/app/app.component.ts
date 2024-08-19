import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TableComponent } from './table/table.component';
import { PokemonComponent } from './pokemon/pokemon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, TableComponent, PokemonComponent],
  template: `
    <div class="p-5">
      <h1
        class="mb-6 text-4xl font-extrabold tracking-widest text-gray-900 md:text-5xl underline decoration-8 decoration-blue-500"
      >
        Datamon
      </h1>
      <h2 class="mb-6 text-2xl font-bold tracking-widest">
        Your <span class="text-yellow-500 bg-blue-500">Pokémon</span> DB
      </h2>

      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  title = 'Datamon';
}
