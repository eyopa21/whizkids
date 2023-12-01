<template>
    <div>

        <div class="animate-top overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full flex"
            id="kanban-card-modal" aria-modal="true" role="dialog">
            <div class="relative px-4 w-full max-w-4xl h-full md:h-auto lg:mt-52 lg:mb-4">

                <div class="relative bg-white rounded-2xl shadow-lg">

                    <div class="flex justify-between items-center p-4 rounded-t border-b md:px-6">
                        <div class="text-xl font-semibold">

                            <div v-if="props.blog">
                                Edit Blog
                            </div>
                            <div v-else>

                                Add New Blog
                            </div>
                        </div>
                        <button @click="emit('close')" type="button" data-modal-toggle="kanban-card-modal"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </div>

                    <FormsBlogForm :blog="props.blog" />
                </div>
            </div>
        </div>
        <div class="block fixed  inset-0 z-30 bg-gray-900 opacity-50"></div>
    </div>
</template>

<script setup>
const props = defineProps(['blog'])
const emit = defineEmits('close')


</script>