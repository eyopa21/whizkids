<template>
  <div class="bg-white dark:bg-gray-900 shadow-lg shadow-gray-200 dark:shadow-gray-700 rounded-2xl p-4 ">

    <div class="flex justify-between items-center mb-4">
      <div>
        <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">Messages</h3>
        <span class="text-base font-normal text-gray-500 dark:text-gray-400">This is contact me message</span>
      </div>
      <!--div class="flex-shrink-0">
        <a href="#"
          class="p-2 text-sm font-medium text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">View
          all</a>
      </div-->
    </div>

    <div class="flex flex-col mt-8">
      <div class="overflow-x-auto rounded-2xl">
        <div class="inline-block min-w-full align-middle">
          <div class="overflow-hidden shadow-lg shadow-gray-200 sm:rounded-2xl">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Email
                  </th>
                  <th scope="col" class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Name
                  </th>
                  <th scope="col" class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Subject
                  </th>
                  <th scope="col" class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Phone number
                  </th>
                </tr>
              </thead>
              <tbody v-if="messages?.length" class="divide-y divide-gray-200">
                <tr v-for="(message, key) in messages" :key="key">
                  <td class="flex items-center p-4 text-sm font-normal text-gray-900 whitespace-nowrap">

                    <span class="mx-5 ml-0  w-32 text-base font-medium text-gray-900 dark:text-gray-400 sm:flex-none">{{
                      message.email }}</span>
                  </td>
                  <td class="p-4 text-sm font-semibold text-gray-900 dark:text-gray-400 whitespace-nowrap">
                    {{ message.full_name }}
                  </td>
                  <td class="p-4 text-sm font-semibold text-gray-900 dark:text-gray-400 whitespace-nowrap">
                    {{ message.subject }}
                  </td>
                  <td class="p-4 text-sm font-normal text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {{ message.phone_number }}
                  </td>
                </tr>

              </tbody>
              <div v-else class="mt-8 font-bold text-2xl">
                <div class="m-8 font-extrabold text-4xl">

                  Nothing here for now
                </div>
              </div>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="flex relative justify-end items-center pt-3 border-t sm:pt-6 mb-8">
      <!--div>
        <button @click="showFilter = !showFilter"
          class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-2xl hover:text-gray-900 dark:hover:text-gray-400"
          type="button">Last 7 days <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg></button>

        <div v-if="showFilter"
          class="absolute z-50 my-4 text-base list-none bg-white dark:bg-gray-900 rounded divide-y divide-gray-100 shadow-lg shadow-gray-200 dark:shadow-gray-700">
          <div class="py-3 px-4" role="none">
            <p class="text-sm font-medium text-gray-900 dark:text-gray-200 truncate" role="none">
              Sep 16, 2021 - Sep 22, 2021
            </p>
          </div>
          <ul class="py-1" role="none">
            <li v-for="i in 4" :key="i">
              <a href="#"
                class="block py-2 px-4 text-sm text-gray-700 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                role="menuitem">Yesterday</a>
            </li>

          </ul>

        </div>
      </div-->
      <div class="flex-shrink-0 ">
        <NuxtLink to="/messages"
          class="inline-flex items-center p-2 text-xs font-medium text-gray-900 dark:text-gray-500 uppercase rounded-lg sm:text-sm hover:bg-gray-100  dark:hover:bg-gray-700">
          View All
          <svg class="ml-1 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const showFilter = ref(false);

const mainData = useData()

const messages = ref(mainData.value.user.messages);
</script>