<template>
  <div class="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4  2xl:col-span-2" style="position: relative;">

    <h3 class="text-xl font-bold leading-none text-gray-900">Acquisition Overview</h3>
    <div class="grid gap-6 lg:grid-cols-2">
    </div>
    <div class="py-6 text-5xl" style="min-height: 283.7px;">
      the chart
    </div>
    <div class="block overflow-x-auto w-full">
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            <th
              class="py-3 px-4 text-xs font-semibold text-left text-gray-700 uppercase align-middle whitespace-nowrap  border-r-0 border-l-0">
              Top Channels</th>
            <th
              class="py-3 px-4 text-xs font-semibold text-left text-gray-700 uppercase align-middle whitespace-nowrap  border-r-0 border-l-0">
              Users</th>
            <th
              class="py-3 px-4 text-xs font-semibold text-left text-gray-700 uppercase align-middle whitespace-nowrap  border-r-0 border-l-0 min-w-140-px">
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="i in 5" :key="i" class="text-gray-500">
            <th class="p-4 px-4 text-sm font-normal text-left align-middle whitespace-nowrap border-t-0">
              Organic Search</th>
            <td class="p-4 px-4 text-xs font-medium text-gray-900 align-middle whitespace-nowrap border-t-0">
              5,649</td>
            <td class="p-4 px-4 text-xs align-middle whitespace-nowrap border-t-0">
              <div class="flex items-center">
                <span class="mr-2 text-xs font-medium">30%</span>
                <div class="relative w-full">
                  <div class="w-full h-2 bg-gray-200 rounded-sm">
                    <div class="h-2 bg-cyan-500 rounded-sm" style="width: 30%"></div>
                  </div>
                </div>
              </div>
            </td>
          </tr>

        </tbody>
      </table>
    </div>

    <div class="flex justify-between items-center pt-3 border-t border-gray-200 sm:pt-6">
      <div>
        <button
          class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-2xl hover:text-gray-900"
          type="button" data-dropdown-toggle="sessions-dropdown">Last 7 days <svg class="ml-2 w-4 h-4" fill="none"
            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg></button>

        <div
          class="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg shadow-gray-200"
          id="sessions-dropdown" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top"
          style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(88px, 3575px, 0px);">
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
          Acquisition Report
          <svg class="ml-1 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
    <div class="resize-triggers">
      <div class="expand-trigger">
        <div style="width: 413px; height: 789px;"></div>
      </div>
      <div class="contract-trigger"></div>
    </div>
  </div>
</template>