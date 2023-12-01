<template>
  <div class="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4  mb-4 xl:mb-0">
    <div class="mb-4">
      <h3 class="mb-2 text-xl font-bold text-gray-900">Sessions by country</h3>
      <span class="text-base font-normal text-gray-500">View website visitors by hovering over the
        map</span>
    </div>
    <div class="text-5xl ">the map</div>
    <div class="flex justify-between items-center pt-3 mt-6 border-t border-gray-200 sm:pt-6">
      <div>
        <button
          class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-2xl hover:text-gray-900"
          type="button" data-dropdown-toggle="dropdown-sessions-by-country">Last 7 days <svg class="ml-2 w-4 h-4"
            fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg></button>

        <div
          class="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg shadow-gray-200"
          id="dropdown-sessions-by-country" data-popper-reference-hidden="" data-popper-escaped=""
          data-popper-placement="top"
          style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(88px, 2017.5px, 0px);">
          <div class="py-3 px-4" role="none">
            <p class="text-sm font-medium text-gray-900 truncate" role="none">
              Sep 16, 2021 - Sep 22, 2021
            </p>
          </div>
          <ul class="py-1" role="none">
            <li>
              <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Yesterday</a>
            </li>
            <li>
              <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Today</a>
            </li>
            <li>
              <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Last
                7 days</a>
            </li>
            <li>
              <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Last
                30 days</a>
            </li>
            <li>
              <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Last
                90 days</a>
            </li>
          </ul>
          <div class="py-1" role="none">
            <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Custom...</a>
          </div>
        </div>
      </div>
      <div class="flex-shrink-0">
        <a href="#"
          class="inline-flex items-center p-2 text-xs font-medium text-gray-900 uppercase rounded-lg sm:text-sm hover:bg-gray-100">
          Location Overview
          <svg class="ml-1 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>