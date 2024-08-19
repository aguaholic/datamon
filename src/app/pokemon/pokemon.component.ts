import { Component, inject } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [RouterModule],
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
              <span class="text-xs font-bold text-black ml-[7px] mb-[-6px]"
                >Thicc Pokemon</span
              >
            </div>
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-bold mb-[3px] ml-[7px]">Thicc Pikachu</h2>
              <div class="flex items-center">
                <span class="text-xl text-red-700 mb-[3px]">40 HP</span>
                <img
                  src="electric.png"
                  alt="Image Description"
                  width="20"
                  height="20"
                  class="ml-2 mb-1 mr-1.5"
                />
              </div>
            </div>

            <div class="ml-2 mr-2 mt-[-5px] mb-2 border-[6px] border-[#ba8e0f]">
              <img
                src="/pikachu.jpg"
                alt="Thicc Pikachu"
                class="h-full w-full object-cover"
              />
            </div>
            <div class="flex justify-center">
              <img
                src="1st.svg"
                alt="Image Description"
                width="27"
                height="27"
                style="margin-right: 4px; margin-left: -29px; margin-top: -5px"
              />
              <div
                class="text-xs mb-1 bg-[#bc8c0c] border border-[#bc8c0c] p-2 flex justify-center items-center h-[10px] w-[280px] italic font-semibold"
              >
                <span>Thicc Pokemon. Width: TH' IC", Weight: MYB</span>
              </div>
            </div>
            <div class="flex items-center justify-between mb-4 mt-2">
              <img
                src="energy.png"
                alt="Image Description"
                width="20"
                height="20"
                style="margin-left: 10px;"
              />
              <span class="ml-[-10px] text-lg font-bold">Clap</span>
              <span class="text-xl font-semibold">10</span>
            </div>
            <div class="border-t-[2px] border-black my-2 py-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <img
                    src="electric.png"
                    alt="Image Description"
                    width="20"
                    height="20"
                    style="margin-left: -7px;"
                  />
                  <img
                    src="energy.png"
                    alt="Image Description"
                    width="20"
                    height="20"
                    style="margin-left: 4px; margin-right: 19px;"
                  />
                </div>
                <div>
                  <span class="text-lg font-bold">
                    <p>Thunder Cheeks</p>
                  </span>
                  <span class="text-xs font-semibold">
                    <p>
                      Flip a coin. If tails, Thicc Pikachu deals 10 damage to
                      itself.
                    </p>
                  </span>
                </div>
                <span class="text-xl font-semibold">30</span>
              </div>
            </div>
            <div class="border-t-[2px] border-black"></div>
            <div
              class="flex justify-between items-center text-xs flex-col md:flex-row"
            >
              <div class="mb-2 md:mb-0 font-semibold">
                <span class="mr-1">weakness</span>
                <div class="flex items-center">
                  <img
                    src="fighting.png"
                    alt="Image Description"
                    width="20"
                    height="20"
                    style="margin-left: 17px;"
                  />
                </div>
              </div>
              <div class="flex items-center mb-2 md:mb-0 font-semibold">
                <span class="mr-1 mt-[-17px]">resistance</span>
              </div>
              <div class="mb-2 md:mb-0 font-semibold">
                <span class="mr-1">retreat cost</span>
                <div class="flex items-center">
                  <img
                    src="energy.png"
                    alt="Image Description"
                    width="20"
                    height="20"
                    style="margin-left: 21px;"
                  />
                </div>
              </div>
            </div>
            <div
              class="text-xs text-left mt-4 border-[2px] border-[#bc8c0c] pl-2 font-semibold mt-[3px]"
            >
              <p>
                When several of these Thicc Pokemon gather, their thicc electric
                cheeks can cause thunder storms. LV.12 #25
              </p>
            </div>
            <div
              class="text-right text-xs mt-[-2px] mb-[-14px] mr-[-6px] font-semibold"
            >
              <span>??/50</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                fill="black"
                class="inline-block ml-[2px] mr-[-5px] mb-[2.2px]"
              >
                <circle cx="4" cy="4" r="4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PokemonComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
}
