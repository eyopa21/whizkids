
<template>
    <div>
        <ClientOnly>


            <Search @search="(n) => (search(n))" :showDelete="selected.length ? true : false"
                @delete="layout.showDeleteAlert = true" :items="selected.length" />
            <div v-if="behaviors?.length == 0">
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
                                                        @change="select.selectAll(selected, checkBox, selectAllCheckBox, behaviors)"
                                                        id="checkbox-all" type="checkbox"
                                                        class="w-5 h-5 rounded border-gray-300 focus:ring-0 checked:bg-dark-900">
                                                    <label for="checkbox-all" class="sr-only">checkbox</label>
                                                </div>
                                            </th>
                                            <th scope="col"
                                                class="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5">
                                                Name {{ loading }}
                                            </th>
                                            <th scope="col"
                                                class="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5">
                                                Description
                                            </th>

                                            <th scope="col" class="p-4 lg:p-5 flex justify-end">
                                                <VueSort />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                        <tr v-for="(behavior, key) in behaviors" :key="key"
                                            class="hover:bg-gray-100 dark:hover:bg-gray-800">
                                            <td class="p-4 w-4 lg:p-5">
                                                <div class="flex items-center">
                                                    <input ref="checkBox"
                                                        @change="select.select(selected, checkBox, selectAllCheckBox, behaviors, behavior.id, key)"
                                                        id="checkbox-194556" type="checkbox"
                                                        class="w-5 h-5 rounded border-gray-300 focus:ring-0 checked:bg-dark-900">
                                                    <label for="checkbox-194556" class="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                                                <div class="text-base font-semibold text-gray-900 dark:text-gray-400">{{
                                                    behavior.title
                                                }}</div>

                                            </td>
                                            <td
                                                class="p-4 text-base font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap lg:p-5">
                                                {{ behavior.description }}
                                            </td>

                                            <td class="flex justify-end p-4 space-x-2 whitespace-nowrap lg:p-5">

                                                <VueButton
                                                    @click=" behaviorToBeEdited = behavior; layout.showBehaviorModal = true"
                                                    name="Edit Item" type="button" variation="edit" />

                                                <VueButton
                                                    @click="selected.length = 0; selected.push(behavior.id); layout.showDeleteAlert = true"
                                                    name="Delete Item" type="button" variation="delete" />
                                            </td>
                                            <VueAlert v-if="layout.showDeleteAlert" @delete="deleteBehaviors()"
                                                :loading="loading" />
                                        </tr>

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>




            </div>
            <VuePagination :amount="parseInt(behaviors?.length)" @paginate="(n) => { paginate(n) }" />
            <VueModal v-if="layout.showBehaviorModal" :behavior="behaviorToBeEdited"
                @close="layout.showBehaviorModal = false; behaviorToBeEdited = ''" />
        </ClientOnly>
    </div>
</template>

<script setup>
import delete_query from '../queries/behaviors/delete-behaviors.gql'

import Search_query from '../queries/behaviors/search.gql'


const mainData = useData();
const behaviors = ref(mainData.value.user.behaviors)
const layout = useLayout();
const behaviorToBeEdited = ref('');
const select = useSelect()
const selected = ref(select.selected);
const checkBox = ref('')
const uid = useCookie('uid')
const selectAllCheckBox = ref('')
const nuxtApp = useNuxtApp()

const searchLoading = ref(false)
const { mutate: deleteBehavior, onDone, onError, loading } = useMutation(delete_query)
const deleteBehaviors = async () => {
    if (selected.value) {

        deleteBehavior({ id: selected.value })
        onDone(res => {
            selectAllCheckBox.value.checked = false
            checkBox.value.forEach(checkBoxx => {
                checkBoxx.checked = false
            })

            layout.value.showAlert = { error: false, message: 'Behavior deleted successfully' }
            selected.value = []
            nuxtApp.$reFetch()
        })
        onError(err => {
            console.log(err)

            if (err.message === 'no mutations exist') {
                layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
            }
            else layout.value.showAlert = { error: true, message: 'Behavior deleted not successfully' }
        })

    } else {
        layout.value.showAlert = { error: false, message: 'Nothing to delete' }
    }

}

const search = async (searchValue) => {
    searchLoading.value = true
    const { onResult, onError, refetch, loading } = useQuery(Search_query, { search: "%" + searchValue + "%" }, { fetchPolicy: 'cache-and-network', })
    onResult(res => {
        behaviors.value = res.data.behaviors
    })
    onError(err => {
        layout.value.showAlert = { error: true, message: 'Searching failed' }
    })
}
import query from '../queries/users/get-users.gql'
const paginate = async (n) => {
    const { onResult, onError, refetch, loading } = useQuery(query, { id: uid.value, offset: n }, { fetchPolicy: 'no-cache', })
    onResult(res => {
        behaviors.value = res.data.users_by_pk.behaviors
    })
    onError(err => {
        console.log("test", err)
        layout.value.showAlert = { error: true, message: err }
    })


}

</script>