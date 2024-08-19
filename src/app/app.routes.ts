import { Routes } from '@angular/router';

import { PokemonComponent } from './pokemon/pokemon.component';
import { TableComponent } from './table/table.component';

export const routes: Routes = [
  {
    path: '',
    component: TableComponent,
    title: 'Home - Datamon',
  },
  {
    path: 'pokemon/:id',
    component: PokemonComponent,
    title: 'Pokemon - Datamon',
  },
];
