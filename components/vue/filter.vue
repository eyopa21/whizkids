<template>
    <div class="flex">
        <a
            class="relative  mr-4 inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
            <input @input="dateFilter(date)" v-model="date" type="date" class=" w-16 rounded h-full py-1">

        </a>

        <select v-model="shift" @change="shiftFilter(shift)" id="settings-language" name="countries"
            class="border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5">
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>

        </select>
    </div>
</template>

<script setup>

import shift_filter_query from '../../queries/attendances/filter-shift.gql'

import date_filter_query from '../../queries/attendances/filter-date.gql'
const date = ref(null)
const shift = ref('')
const route = useRoute();
const layout = useLayout();
const mainData = useData();
const dateFilter = (value) => {

    const { onResult, onError } = useQuery(date_filter_query, { date: value }, { fetchPolicy: 'no-cache', })
    onResult(res => {
        console.log(res)
        mainData.value.attendances = computed(() => {
            return res.data?.attendance
        })

    })
    onError(err => {
        console.log(err)
        layout.value.showAlert = { error: true, message: "Sorting failed" }
    })


}
const shiftFilter = (value) => {
    console.log("val", shift.value)
    const { onResult, onError } = useQuery(shift_filter_query, { shift: value }, { fetchPolicy: 'no-cache', })
    onResult(res => {
        console.log(res)
        mainData.value.attendances = computed(() => {
            return res.data?.attendance
        })

    })
    onError(err => {
        console.log(err)
        layout.value.showAlert = { error: true, message: "Sorting failed" }
    })


}
</script>