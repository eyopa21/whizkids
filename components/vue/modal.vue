<template>
  <div class="">

    <div
      class="flex animate-top top-12  overflow-y-auto overflow-x-hidden fixed right-0 left-0  z-50 justify-center items-center md:inset-0 h-modal sm:h-full">
      <div :class="route.name == 'blogs' ? 'md:mt-72 lg:mb-4 max-w-4xl' : 'max-w-2xl'"
        class="relative px-4 w-full  h-full md:h-auto ">

        <div :class="route.name == 'projects' ? 'xl:mt-52' : ''"
          class="relative  mb-2 bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-sm shadow-gray-700 dark:shadow-fuchsia-700">

          <div class="flex justify-between items-start p-5 rounded-t border-b">
            <h3 class="text-xl font-semibold dark:text-white">
              <div>
                <div>

                  Add New Employee
                </div>
              </div>




            </h3>
            <button @click="emit('close')" type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>

          <div class="p-6 space-y-6">

            <FormsEmployeeForm :employee="props.employee" />



          </div>



        </div>
      </div>
    </div>
    <div class="block fixed  inset-0 z-30 bg-gray-900 opacity-50"></div>

  </div>
</template>

<script setup>

const route = useData().value;
const emit = defineEmits(['close'])
const props = defineProps(['employee'])
</script>
