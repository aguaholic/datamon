import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { IPokemon } from '../interfaces/pokemon.interface';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div>
      <a
        [routerLink]="['/']"
        routerLinkActive="router-link-active"
        class="text-green-600 hover:text-white border border-green-600 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        < Go back
      </a>

      <div
        class="p-2  mt-5 border-2 border-r-blue-500 border-t-green-500 border-l-red-500 border-b-yellow-500"
      >
        <div class="flex items-center justify-center h-screen">
          <div
            class="max-w-[400px] mx-auto bg-[#f3e67c] p-4 rounded-[20px] shadow-lg border-[21px] border-[#f4d700]"
          >
            <div class="flex justify-between items-center mt-[-10px]">
              <span
                class="text-xs font-bold text-black ml-[7px] mb-2 capitalize"
              >
                {{ pokemon?.name }}
              </span>
            </div>

            <div class="flex justify-between items-center">
              <h2 class="text-xl font-bold mb-[3px] ml-[7px] capitalize">
                {{ pokemon?.name }}
              </h2>

              <div class="flex ">
                <span class="text-xl text-red-700 mb-[3px]"
                  >{{ pokemon?.base_experience }} HP</span
                >
              </div>
            </div>

            <div class="ml-2 mr-2 mt-[-5px] mb-2 border-[6px] border-[#ba8e0f]">
              <img
                [src]="pokemon?.sprites?.front_default"
                [alt]="pokemon?.name"
                class="h-full w-full object-cover"
              />
            </div>

            <div
              class="text-xs mb-1 bg-[#bc8c0c] border border-[#bc8c0c] p-2 flex justify-center items-center h-[10px] w-[280px] italic font-semibold"
            >
              <span>height: {{ pokemon?.height }}</span>
            </div>

            <div class="flex items-center justify-between mb-4 mt-2">
              <img
                src="./energy.png"
                alt="Image Description"
                width="20"
                height="20"
                style="margin-left: 10px;"
              />
              <!-- TODO: render here abilities -->
              <span class="ml-[-10px] text-lg font-bold">{{
                pokemon?.name
              }}</span>

              <span class="text-xl font-semibold">10</span>
            </div>

            <div class="border-t-[2px] border-black my-2 py-2"></div>

            <div
              class="flex justify-between items-center text-xs flex-col md:flex-row"
            >
              <div class="mb-2 md:mb-0 font-semibold">
                <span class="mr-1">forms</span>
                <!-- TODO: render forms -->
                <div class="flex items-center">
                  <img
                    src="./fighting.png"
                    alt="Image Description"
                    width="20"
                    height="20"
                    style="margin-left: 17px;"
                  />
                </div>
              </div>

              <div class="mb-2 md:mb-0 font-semibold">
                <span class="mr-1">species</span>
                <!-- TODO: render species -->

                <div class="flex items-center">
                  <img
                    src="./energy.png"
                    alt="Image Description"
                    width="20"
                    height="20"
                    style="margin-left: 21px;"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PokemonComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  pokemonService = inject(PokemonService);
  pokemon: IPokemon | undefined;

  constructor() {
    const pokemonId = Number(this.route.snapshot.params['id']);

    this.pokemonService.getPokemonById(pokemonId).then((result) => {
      this.pokemon = result;
    });
  }
}
