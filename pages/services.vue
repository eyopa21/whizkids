<template>
    <div>
        <ClientOnly>


            <Search @search="(n) => (search(n))" :showDelete="selected.length ? true : false"
                @delete="layout.showDeleteAlert = true" :items="selected.length" />
            <div v-if="services?.length == 0">
                <NoDataFound />
            </div>
            <div v-else>


                <div class="flex flex-col my-6 mx-4 rounded-2xl shadow-xl shadow-gray-200 dark:shadow-gray-700">
                    <div class="overflow-x-auto rounded-2xl">
                        <div class="inline-block min-w-full align-middle">
                            <div class="overflow-hidden">
                                <table class="min-w-full divide-y divide-gray-200 table-fixed">
                                    <thead class="bg-white dark:bg-gray-900">
                                        <tr>
                                            <th scope="col" class="p-4 lg:p-5">
                                                <div class="flex items-center">
                                                    <input ref="selectAllCheckBox"
                                                        @change="select.selectAll(selected, checkBox, selectAllCheckBox, services)"
                                                        id="checkbox-all" type="checkbox"
                                                        class="w-5 h-5 rounded border-gray-300 focus:ring-0 checked:bg-dark-900">
                                                    <label for="checkbox-all" class="sr-only">checkbox</label>
                                                </div>
                                            </th>
                                            <th scope="col"
                                                class="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5">
                                                Name
                                            </th>
                                            <th scope="col"
                                                class="p-4 text-xs  font-medium text-left text-gray-500 uppercase lg:p-5">
                                                Description
                                            </th>


                                            <th scope="col" class="p-4 lg:p-5 flex justify-end">
                                                <VueSort />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                        <tr v-for="(service, key) in services" :key="service"
                                            class="hover:bg-gray-100 dark:hover:bg-gray-800">
                                            <td class="p-4 w-4 lg:p-5">
                                                <div class="flex items-center">
                                                    <input ref="checkBox"
                                                        @change="select.select(selected, checkBox, selectAllCheckBox, services, service.id, key)"
                                                        id="checkbox-194556" type="checkbox"
                                                        class="w-5 h-5 rounded border-gray-300 focus:ring-0 checked:bg-dark-900">
                                                    <label for="checkbox-194556" class="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                                                <div class="text-base font-semibold text-gray-900 dark:text-gray-400">{{
                                                    service.name }}
                                                </div>

                                            </td>
                                            <td
                                                class="p-4 text-base font-medium max-w-8 text-gray-900 dark:text-gray-500 whitespace-nowrap lg:p-5">
                                                {{ service.description }}

                                            </td>


                                            <td class="flex justify-end p-4 space-x-2 whitespace-nowrap lg:p-5">

                                                <VueButton
                                                    @click="serviceToBeEdited = service; layout.showServiceModal = true"
                                                    name="Edit Item" type="button" variation="edit" />

                                                <VueButton
                                                    @click="selected.length = 0; selected.push(service.id); layout.showDeleteAlert = true"
                                                    name="Delete Item" type="button" variation="delete" />
                                                <VueAlert v-if="layout.showDeleteAlert" @delete="deleteServices()"
                                                    :loading="loading" />

                                            </td>
                                        </tr>

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>



            </div>
            <VuePagination :amount="parseInt(services?.length)" @paginate="(n) => { paginate(n) }" />
            <VueModal v-if="layout.showServiceModal" :service="serviceToBeEdited"
                @close="layout.showServiceModal = false; serviceToBeEdited = ''" />

        </ClientOnly>
    </div>
</template>

<script setup>

import delete_query from '../queries/services/delete-service.gql'
import Search_query from '../queries/services/search.gql'
const mainData = useData();
const services = ref(mainData.value.user.services)
const layout = useLayout();
const select = useSelect()
const selected = ref(select.selected);
const uid = useCookie('uid')
const serviceToBeEdited = ref('');
const checkBox = ref('')
const selectAllCheckBox = ref('')
const nuxtApp = useNuxtApp()



const { mutate: deleteService, onDone, onError, loading } = useMutation(delete_query)
const deleteServices = async () => {
    if (selected.value) {
        deleteService({ id: selected.value })
        onDone(res => {
            selectAllCheckBox.value.checked = false
            checkBox.value.forEach(checkBoxx => {
                checkBoxx.checked = false
            })
            selected.value = []
            layout.value.showAlert = { error: false, message: 'Service deletion successful' }
            nuxtApp.$reFetch()
        })
        onError(err => {
            console.log(err)
            if (err.message === 'no mutations exist') {
                layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
            }
            else layout.value.showAlert = { error: true, message: 'Service deletion not successful' }


        })

    } else {
        layout.value.showAlert = { error: false, message: ' Nothing to delete' }
    }


}

const searchLoading = ref(false)
const search = async (searchValue) => {
    searchLoading.value = true
    const { onResult, onError, refetch, loading } = useQuery(Search_query, { search: "%" + searchValue + "%" }, { fetchPolicy: 'cache-and-network', })
    onResult(res => {
        services.value = res.data.services
    })
    onError(err => {
        layout.value.showAlert = { error: true, message: 'Searching failed' }
    })
}


import query from '../queries/users/get-users.gql'
const paginate = async (n) => {
    const { onResult, onError, refetch, loading } = useQuery(query, { id: uid.value, offset: n }, { fetchPolicy: 'no-cache', })
    onResult(res => {
        services.value = res.data.users_by_pk.services
    })
    onError(err => {
        console.log("test", err)
        layout.value.showAlert = { error: true, message: err }
    })

}
</script>