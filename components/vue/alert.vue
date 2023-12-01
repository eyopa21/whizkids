<template>
    <div class="flex animate-fade duration-100 overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-48 md:top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full"
        id="delete-product-modal" aria-hidden="true">
        <div class="relative px-4 w-full max-w-md h-full md:h-auto">

            <div class="relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg">

                <div class="flex justify-end p-2">
                    <button @click="layout.showDeleteAlert = false" type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
                        data-modal-toggle="delete-product-modal">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>

                <div class="p-6 w-full pt-0 text-center">
                    <svg class="mx-auto w-20 h-20 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 class="mt-5 mb-6 text-xl font-normal text-gray-500">Are you sure you want to delete this
                        ?</h3>
                    <a @click="emit('delete')"
                        class="text-white cursor-pointer bg-gradient-to-br from-red-400 to-red-600  font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 shadow-md shadow-gray-300 dark:shadow-gray-600 hover:scale-[1.02] transition-transform">
                        <div v-if="props.loading">
                            <div class="w-full">
                                <div class=" inline-block  w-6 h-6 border-t-8 border-t-white rounded-full animate-spin">
                                </div>
                            </div>
                        </div>
                        <div v-else>Yes, I'm sure</div>

                    </a>
                    <a v-if="!props.loading" @click="layout.showDeleteAlert = false"
                        class="text-gray-900 bg-white cursor-pointer hover:bg-gray-100 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center hover:scale-[1.02] transition-transform"
                        data-modal-toggle="delete-product-modal">
                        No, cancel
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="block fixed  inset-0 z-30 bg-red-900 opacity-50"></div>
</template>

<script setup>
const layout = useLayout();
const props = defineProps(['data', 'loading'])
const emit = defineEmits(['delete'])
</script>

<style>
.animate-fade {

    animation-name: animate-fadeIn;
    animation-duration: 1s
}
</style>