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


                    </div>
                </div>

                <div class="flex items-center w-full sm:justify-end">
                    <div v-if="route.name === 'attendances'" class="flex mr-8 space-x-2">

                        <VueFilter />
                    </div>
                    <div v-if="route.name === 'employees'">
                        <VueButton variation="normal" @click="showAddModal()"
                            :name="route.name == 'employees' ? 'Add Employees' : 'Add Attendance'" type="button"
                            icon="plus" />

                    </div>
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
const route = useRoute();

const showAddModal = () => {


    if (route.name == 'employees') layout.value.showEmployeeModal = true;
    else if (route.name == 'attendances') layout.value.showAttendanceModal = true

}
</script>

