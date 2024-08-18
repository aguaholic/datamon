import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableComponent],
  template: `
    <h1 class="text-red-200">Datamon</h1>
    <h2>Your Pokémon db</h2>

    <app-table></app-table>
  `,
})
export class AppComponent {
  title = 'Datamon';
}
