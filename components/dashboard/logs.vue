<template>
    <div
        class="bg-white dark:bg-gray-900 shadow-lg shadow-gray-200 dark:shadow-md dark:shadow-gray-600 rounded-2xl p-4 overflow-hidden">

        <div class="flex justify-between items-center mb-4 border-b pb-1">
            <div>
                <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">Logs</h3>
                <span class="text-base font-normal text-gray-500 dark:text-gray-400">Every data will be backed up here
                    ...</span>
            </div>
            <div class="flex justify-end mr-8 items-center pt-3 sm:pt-6">
                <div>
                    <!--button @click="showFilters = !showFilters"
                        class="inline-flex items-center p-2 text-md font-bold text-center underline text-gray-500 rounded-2xl hover:text-gray-900 "
                        type="button" data-dropdown-toggle="transactions-dropdown">Sort <svg class="ml-2 w-4 h-4"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg></!--button-->


                    <!--div :class="showFilters ? 'visible h-48' : 'invisible h-0'"
                        class="transition-all duration-300 absolute z-50 my-4 text-base list-none bg-white dark:bg-gray-900 rounded divide-y divide-gray-100 shadow-lg dark:shadow-md shadow-gray-300 dark:shadow-gray-600">
                        <div class="py-3 px-4" role="none">

                        </div>
                        <ul class="py-1" role="none">
                            <li>
                                <a @click="sort('date')" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem">By Date</a>
                            </li>
                            <li>
                                <a @click="sort('operation')"
                                    class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">By
                                    Operation</a>
                            </li>
                            <li>
                                <a @click="sort('email')" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                    role="menuitem">By
                                    Email</a>
                            </li>
                        </ul>
                        <div class="py-1" role="none">
                            <a @click="sort('table')" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem">By
                                Table</a>
                        </div>
                    </!--div-->
                </div>

            </div>
        </div>

        <div v-if="logs">


            <div class="flex flex-col mt-8">
                <div class="overflow-x-auto rounded-2xl">
                    <div class="inline-block min-w-full align-middle">
                        <div class="overflow-hidden shadow-lg shadow-gray-200 sm:rounded-2xl">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th scope="col"
                                            class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Role
                                        </th>
                                        <th scope="col"
                                            class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Operation
                                        </th>

                                        <th scope="col"
                                            class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Table
                                        </th>
                                        <th scope="col"
                                            class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Description
                                        </th>
                                        <th scope="col"
                                            class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Date
                                        </th>
                                        <!--th scope="col" class="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Edit
                  </!--th-->
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200">
                                    <tr v-for="(i, key) in logs" :key="key">
                                        <td
                                            class="p-4 text-sm font-normal text-gray-900 dark:text-gray-400 whitespace-nowrap">
                                            <div class="flex items-center">
                                                {{ i.role }}
                                            </div>
                                        </td>
                                        <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                                            <span :class="{
                                                'from-green-400 to-green-700 ': i.method == 'INSERT',
                                                'from-red-400 to-red-700 ': i.method == 'DELETE',
                                                'from-blue-400 to-blue-700 ': i.method == 'UPDATE',

                                            }"
                                                class="text-white bg-gradient-to-br text-xs font-bold uppercase mr-2 px-2.5 py-1 rounded-md">
                                                {{ i.method }}
                                            </span>

                                        </td>
                                        <td
                                            class="p-4 text-sm font-semibold text-gray-900 dark:text-gray-400 whitespace-nowrap">
                                            {{ i.table }}
                                        </td>

                                        <td
                                            class="p-4 text-sm font-semibold text-gray-900 dark:text-gray-400 whitespace-nowrap">
                                            {{ i.description }}
                                        </td>
                                        <td class="p-4 whitespace-nowrap">
                                            {{ i.created_at }}
                                        </td>

                                    </tr>


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <div v-else>
            <div class="m-8 font-extrabold text-4xl">

                We are loading the logs, please wait
            </div>
        </div>
    </div>
</template>

<script setup>

import query from '../../queries/log/get-logs.gql'
import sort_query from '../../queries/log/sort-logs.gql'
const uid = useCookie('uid')
const logs = ref('')
const layout = useLayout();
const showFilters = ref(false)
const loading = ref(true);
if (uid.value) {
    const { onResult, onError, loading } = useQuery(query, { fetchPolicy: 'cache-first', })


    onResult(res => {
        loading.value = false
        console.log(res)
        logs.value = res.data?.logs
    })

    onError(err => {
        loading.value = false
        console.log(err)
        layout.value.showAlert = { error: true, message: "Cannot load logs" }
    })
}


const sort = (value) => {
    loading.value = true
    showFilters.value = false
    const sortValue = value === 'date' ? { "created_at": "asc" } : value === 'operation' ? { "operation": "asc" } : value === 'email' ? { "email": "asc" } : value === 'table' ? { "table": "asc" } : {};
    console.log(sortValue)
    const { onResult, onError } = useQuery(sort_query, { user_id: uid.value, sort: sortValue }, { fetchPolicy: 'no-cache', })
    onResult(res => {
        console.log(res)
        logs.value = res.data.logs
        loading.value = false
    })
    onError(err => {
        console.log(err)
        loading.value = false
        layout.value.showAlert = { error: true, message: "Sorting failed" }
    })
}

</script>