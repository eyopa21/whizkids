<template>
    <div
        class="animate-top flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full">
        <div class="relative px-4 w-full max-w-2xl h-full md:h-auto  lg:mb-4">

            <div class="relative bg-white rounded-2xl shadow-lg ">

                <div class="flex justify-between items-start p-5 rounded-t border-b">
                    <h3 class="text-xl font-semibold">

                        <div v-if="props.timeline">
                            Edit Timeline
                        </div>
                        <div v-else>
                            Add New Timeline
                        </div>
                    </h3>
                    <button @click="emit('close')" type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
                        data-modal-toggle="add-product-modal">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>

                <div class="p-6 space-y-6">
                    <FormsTimelineForm :timeline="props.timeline" />
                </div>

                <div class="p-6 rounded-b border-t border-gray-200">
                    <button
                        class="text-white font-medium text-sm px-5 py-2.5 text-center rounded-lg bg-gradient-to-br from-pink-500 to-violet-500 shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
                        type="submit">Add product</button>
                </div>

            </div>
        </div>
    </div>
    <div class="block fixed  inset-0 z-30 bg-gray-900 opacity-50"></div>
</template>

<script setup>

const props = defineProps(['timeline'])
const emit = defineEmits(['close'])
</script>