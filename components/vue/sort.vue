


<template>
    <div class="relative group"><a
            class=" flex  cursor-pointer text-[16px] font-semibold group-hover:text-primary  text-heading-light">

            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z">
                </path>
            </svg>
        </a>
        <ul
            class="top-full cursor-pointer min-w-full right-0 flex flex-col items-end absolute w-[200px]  pl-12 bg-gray-50   border-b-[3px] border-primary py-4 shadow-md shadow-gray-400 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-[20px] group-hover:translate-y-0 z-30">

            <li v-for="i in props.sortBy" :key="i">
                <a @click="sort(i)"
                    class="block hover:underline underline-offset-2 py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem">By
                    {{ i }}</a>
            </li>

        </ul>
    </div>
</template>

<script setup>
import employee_sort_query from '../../queries/employee/sort.gql'
import attendance_sort_query from '../../queries/attendances/sort.gql'
const props = defineProps(['sortBy'])
const emit = defineEmits(['sort'])
const route = useRoute();
const layout = useLayout();
const sort = (value) => {

    const sortValue = value === 'Name' ? { "full_name": "asc" } : value === 'Salary' ? { "salary": "asc" } : value === 'Entry Date' ? { "date_of_entry": "desc" } : {};
    console.log(sortValue)
    if (route.name === 'employees') {
        const { onResult, onError } = useQuery(employee_sort_query, { sort: sortValue }, { fetchPolicy: 'no-cache', })
        onResult(res => {
            console.log(res)
            emit('sort', res.data.users)
        })
        onError(err => {
            console.log(err)
            layout.value.showAlert = { error: true, message: "Sorting failed" }
        })
    } else if (route.name === 'attendances') {
        const attendanceSortValue = value === 'Name' ? { "user": { "full_name": "desc" } } : value === 'Date' ? { "date": "desc" } : {};

        const { onResult, onError } = useQuery(attendance_sort_query, { sort: attendanceSortValue }, { fetchPolicy: 'no-cache', })
        onResult(res => {
            console.log(res)
            emit('sort', res.data.attendance)
        })
        onError(err => {
            console.log(err)
            layout.value.showAlert = { error: true, message: "Sorting failed" }
        })
    }

}
</script>