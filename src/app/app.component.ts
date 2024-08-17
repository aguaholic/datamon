import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableComponent],
  template: `
    <h1 class="text-3xl font-bold underline">Datamon</h1>
    <h2 class="">Your Pokémon db</h2>

    <app-table></app-table>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Datamon';
}
