<template>
  <div
    class="bg-white dark:bg-gray-900 shadow-lg shadow-gray-200 dark:shadow-md dark:shadow-gray-600 rounded-2xl p-4 overflow-hidden">

    <div class="flex justify-between items-center mb-4 border-b pb-1">
      <div>
        <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">Attendances</h3>
        <span class="text-base font-normal text-gray-500 dark:text-gray-400">Attendance logs</span>
      </div>

    </div>

    <div>


      <div class="flex flex-col mt-8">
        <div class="overflow-x-auto rounded-2xl">
          <div class="inline-block min-w-full align-middle">
            <div class="overflow-hidden shadow-lg shadow-gray-200 sm:rounded-2xl">
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Date
                    </th>
                    <th scope="col" class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Time
                    </th>
                    <th scope="col" class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Shift
                    </th>



                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="(i, key) in mainData.user.attendances" :key="key">
                    <td class="p-4 text-sm font-normal text-gray-900 dark:text-gray-400 whitespace-nowrap">
                      <div class="flex items-center">
                        {{ i.date }}
                      </div>
                    </td>

                    <td class="p-4 text-sm font-semibold text-gray-900 dark:text-gray-400 whitespace-nowrap">
                      {{ i.time?.split('.')[0] }}
                    </td>
                    <td
                      class="p-4 text-sm font-semibold uppercase underline text-gray-900 dark:text-gray-400 whitespace-nowrap">
                      {{ i.shift }}
                    </td>


                  </tr>


                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


    </div>

  </div>
</template>

<script setup>
const mainData = useData();
const attendances = ref(mainData.value.user.attendances)

</script>