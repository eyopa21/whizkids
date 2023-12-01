<template>
    <div>
        <div>
            <ClientOnly>

                <Search @search="(n) => (search(n))" :showDelete="selected.length ? true : false"
                    @delete="layout.showDeleteAlert = true" :items="selected.length" />
                <div v-if="messages?.length == 0">
                    <NoDataFound />
                </div>
                <main v-else>

                    <div class="flex flex-col mx-4">
                        <div class="overflow-x-auto">
                            <div class="inline-block min-w-full align-middle">
                                <div class="overflow-hidden mb-6 rounded-2xl">
                                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-fixed">
                                        <thead class="bg-white dark:bg-gray-900">
                                            <tr>
                                                <th scope="col" class="p-4 lg:p-5">
                                                    <div class="flex items-center">
                                                        <input ref="selectAllCheckBox"
                                                            @change="select.selectAll(selected, checkBox, selectAllCheckBox, messages)"
                                                            id="checkbox-all" type="checkbox"
                                                            class="w-5 h-5 rounded border-gray-300 focus:ring-0 checked:bg-dark-900">
                                                        <label for="checkbox-all" class="sr-only">checkbox</label>
                                                    </div>

                                                </th>
                                                <th scope="col" class="p-4 lg:p-5 flex justify-end">
                                                    <VueSort />
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody
                                            class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">


                                            <tr v-for="(message, key) in messages" :key="key" class=" ">
                                                <td class="p-4 w-4">
                                                    <div class="inline-flex items-center space-x-4">
                                                        <div>
                                                            <input ref="checkBox"
                                                                @change="select.select(selected, checkBox, selectAllCheckBox, messages, message.id, key)"
                                                                id="checkbox-1" type="checkbox"
                                                                class="w-5 h-5 rounded border-gray-300 focus:ring-0 checked:bg-dark-900">
                                                            <label for="checkbox-1" class="sr-only">checkbox</label>
                                                        </div>
                                                        <svg class="w-6 h-6 text-gray-500 hover:text-yellow-500" fill="none"
                                                            stroke="currentColor" viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                </td>
                                                <td @click="navigate(message)"
                                                    class="flex cursor-pointer justify-between items-start hover:bg-gray-100 dark:hover:bg-gray-800">

                                                    <div class="flex items-start mr-8 p-4 space-x-4 whitespace-nowrap">
                                                        <Icon class="w-6 h-6 rounded-full text-fuchsia-500"
                                                            name="heroicons:user-20-solid" />

                                                        <div
                                                            class="text-base  font-semibold text-gray-900 dark:text-gray-400">
                                                            {{ message.full_name }}
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="p-4 text-base flex items-start font-semibold text-gray-900 dark:text-gray-500 max-w-sm xl:max-w-screen-md 2xl:max-w-screen-lg truncate overflow-hidden">
                                                        {{ message.message }}
                                                    </div>
                                                    <div
                                                        class="p-4 whitespace-nowrap text-base font-medium text-gray-900 dark:text-gray-400">
                                                        {{ message.created_at }}
                                                    </div>
                                                </td>
                                                <VueAlert v-if="layout.showDeleteAlert" @delete="deleteMessages()"
                                                    :loading="loading" />
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <VuePagination :amount="parseInt(messages?.length)" @paginate="(n) => { paginate(n) }" />
            </ClientOnly>
        </div>

    </div>
</template>

<script setup>
import delete_query from '../../queries/messages/delete-messages.gql'
import Search_query from '../queries/messages/search.gql'
const router = useRouter()
const select = useSelect()
const layout = useLayout();
const selected = ref(select.selected);
const checkBox = ref('')
const selectAllCheckBox = ref('')
const uid = useCookie('uid')

const navigate = (message) => {

    router.push('/messages/message-' + message.id)
    mainData.value.message = message
}
const mainData = useData();
const messages = ref(mainData.value.user.messages);
const nuxtApp = useNuxtApp()

const { mutate: deleteMessage, loading, onDone, onError } = useMutation(delete_query)
const deleteMessages = async () => {
    console.log("delete")

    if (selected.value) {
        deleteMessage({ id: selected.value })
        onDone(res => {
            selectAllCheckBox.value.checked = false
            checkBox.value.forEach(checkBoxx => {
                checkBoxx.checked = false
            })
            selected.value = []
            layout.value.showAlert = { error: false, message: 'Message deletion successful' }
            nuxtApp.$reFetch()
        })
        onError(err => {
            console.log(err)


            layout.value.showAlert = { error: true, message: 'Message deletion not successful' }
        })
    } else {
        layout.value.showAlert = { error: false, message: 'Nothing delete' }
    }


}

const searchLoading = ref(false);
const search = async (searchValue) => {
    searchLoading.value = true
    const { data, error, refresh } = await useAsyncQuery(Search_query, { search: "%" + searchValue + "%" })
    if (error.value) {
        searchLoading.value = false
        layout.value.showAlert.message = error.value
        layout.value.showAlert = { error: true, message: 'Searching failed' }

    } else {
        messages.value = data.value.messages
        searchLoading.value = false
    }
}

import query from '../queries/users/get-users.gql'
const paginate = async (n) => {
    const { onResult, onError, refetch, loading } = useQuery(query, { id: uid.value, offset: n }, { fetchPolicy: 'no-cache', })
    onResult(res => {
        messages.value = res.data.users_by_pk.messages
    })
    onError(err => {
        console.log("test", err)
        layout.value.showAlert = { error: true, message: err }
    })


}
</script>