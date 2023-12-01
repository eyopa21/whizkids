<template>
    <div
        class="items-center p-4 my-4 mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200 dark:shadow-gray-700 sm:flex sm:justify-between">
        <div class="flex items-center mb-4 sm:mb-0">
            <!--a href="#"
                class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800">
                <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"></path>
                </svg>
            </!a>
            <a-- href="#"
                class="inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800">
                <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"></path>
                </svg>
            </a-->
            <span class="text-sm font-normal text-gray-500">Showing <span
                    class="font-semibold text-gray-900 dark:text-white">{{ offset + 1 }}-{{ offset + props.amount }}</span>
                <!--span class="font-semibold text-gray-900 dark:text-white">{{ props.amount }}</!--span--></span>
        </div>
        <div class="flex items-center space-x-3">
            <button :disabled="offset <= 0" @click="prev()"
                class="inline-flex flex-1 cursor-pointer justify-center disabled:opacity-50 items-center py-2 px-3 text-sm font-medium text-center text-white bg-gradient-to-br from-dark-700 to-dark-900 rounded-lg shadow-md shadow-gray-300 dark:shadow-gray-600 hover:scale-[1.02] transition-transform">
                <svg class="mr-1 -ml-1 w-5 h-5" fill=" currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"></path>
                </svg>
                Previous
            </button>

            <button @click="next()" :disabled="props.amount < 3"
                class="inline-flex disabled:opacity-50 cursor-pointer flex-1 justify-center items-center py-2 px-3 text-sm font-medium text-center text-white bg-gradient-to-br from-dark-700 to-dark-900 rounded-lg shadow-md shadow-gray-300 dark:shadow-gray-600 hover:scale-[1.02] transition-transform">
                Next
                <svg class="ml-1 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import query from '../queries/users/get-users.gql'
const layout = useLayout()
const mainData = useData();
const uid = useCookie('uid')
const emit = defineEmits(['paginate'])
const nuxtApp = useNuxtApp();
const props = defineProps({
    offset: {
        required: false,
        type: Number
    },
    amount: {
        type: Number,
        required: true
    }
})
const offset = ref(0)

const next = async () => {

    offset.value += 3
    emit('paginate', offset.value)

}

const prev = () => {
    if (offset.value > 0) {

        offset.value -= 3
        emit('paginate', offset.value)
    }
}

</script>