<template>
    <div
        class=" justify-between items-center p-4 mx-4 mt-4 mb-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-md shadow-gray-200 dark:shadow-gray-700 lg:p-5">
        <div class="mb-1 w-full">
            <div class=" items-center sm:flex ">
                <div class="flex space-x-4 divide-x divide-gray-100">
                    <div class="flex space-x-4">
                        <form class="mb-4 sm:pr-3 sm:mb-0 w-full">

                            <div class="relative mt-1 w-full sm:w-96">
                                {{ searchValue }}
                                <VueInput @emit-input="(n) => search(n)" name="search"
                                    :placeholder="`Search for ${route.name} `" type="search" />

                            </div>
                        </form>
                        <div v-if="props.items" class="flex items-center">
                            <div class="dark:text-gray-100 font-thin leading-4 -mt-2">

                                {{ props.items }} items selected
                            </div>
                        </div>
                    </div>
                    <div v-if="props.showDelete" class=" pl-2 space-x-1 md:flex items-center align-middle pt-2 ">

                        <a @click="emit('delete')"
                            class="inline-flex hover:scale-110 duration-1000  justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                            <svg class="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </a>
                        <!--a href="#"
                    class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                            clip-rule="evenodd"></path>
                    </svg>
                </a>

                <a href="#"
                    class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                </a>
                <a href="#"
                    class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z">
                        </path>
                    </svg>
                </a-->
                    </div>
                </div>

                <div class="flex items-center w-full sm:justify-end">

                    <VueButton v-if="route.name !== 'messages'" variation="normal" @click="showAddModal()" :name="route.name == 'projects' ? 'Add Project' :
                        route.name == 'skills' ? 'Add Skills' :
                            route.name == 'behaviors' ? 'Add Behavior' :
                                route.name == 'blogs' ? 'Add Blog' :
                                    route.name == 'services' ? 'Add Service' :
                                        route.name == 'timelines' ? 'Add Timeline' : ''" type="button" icon="plus" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const layout = useLayout();
const props = defineProps({
    showDelete: {
        type: Boolean,
        required: true
    },
    items: {
        type: Number,
        required: true
    }
})
const emit = defineEmits(['delete', 'search'])
const searchValue = ref('')

const search = (n) => {
    emit('search', n)
}
const route = useData().value;

const showAddModal = () => {


    if (route.name == 'projects') layout.value.showProjectModal = true
    else if (route.name == 'skills') layout.value.showSkillModal = true
    else if (route.name == 'behaviors') layout.value.showBehaviorModal = true;
    else if (route.name == 'blogs') layout.value.showBlogModal = true
    else if (route.name == 'services') layout.value.showServiceModal = true
    else if (route.name == 'timelines') layout.value.showTimelineModal = true
}
</script>