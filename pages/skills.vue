<template>
    <div>
        <ClientOnly>
            <Search @search="(n) => (search(n))" :showDelete="selected.length ? true : false"
                @delete="layout.showDeleteAlert = true" :items="selected.length" />

            <div v-if="skills?.length == 0">
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
                                                    <input
                                                        @change="select.selectAll(selected, checkBox, selectAllCheckBox, skills)"
                                                        ref="selectAllCheckBox" id="checkbox-all"
                                                        aria-describedby="checkbox-1" type="checkbox"
                                                        class="w-5 h-5 rounded border-gray-300 focus:ring-0 checked:bg-dark-900">
                                                    <label for="checkbox-all" class="sr-only">checkbox</label>
                                                </div>
                                            </th>
                                            <th scope="col"
                                                class="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5">
                                                Skill Name

                                            </th>
                                            <th scope="col"
                                                class="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5">
                                                Percentage
                                            </th>

                                            <th scope="col" class="p-4 lg:p-5 flex justify-end">
                                                <VueSort />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                        <tr v-for="(skill, key) in skills" :key="key"
                                            class=" hover:bg-gray-100 dark:hover:bg-gray-800">
                                            <td class="p-4 w-4 lg:p-5">
                                                <div class="flex items-center">
                                                    <input ref="checkBox"
                                                        @change="select.select(selected, checkBox, selectAllCheckBox, skills, skill.id, key)"
                                                        id="checkbox-194556" type="checkbox"
                                                        class="w-5 h-5 rounded border-gray-300 focus:ring-0 checked:bg-dark-900">
                                                    <label for="checkbox-194556" class="sr-only">checkbox</label>

                                                </div>
                                            </td>
                                            <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                                                <div class="text-base font-bold  text-gray-900 dark:text-gray-400">{{
                                                    skill.skill_name
                                                }}
                                                </div>

                                            </td>

                                            <td
                                                class="p-4 font-mono text-gray-900 dark:text-gray-400 whitespace-nowrap lg:p-5">
                                                {{
                                                    skill.value
                                                }}%
                                            </td>

                                            <td class=" p-4 space-x-2 whitespace-nowrap lg:p-5 flex justify-end">
                                                <VueButton @click="layout.showSkillModal = true; skillsToBeEdited = skill"
                                                    name="Edit Item" type="button" variation="edit" />

                                                <VueButton
                                                    @click="selected.length = 0; selected.push(skill.id); layout.showDeleteAlert = true"
                                                    name="Delete Item" type="button" variation="delete" />

                                            </td>
                                            <VueAlert v-if="layout.showDeleteAlert" @delete="deleteSkills()"
                                                :loading="loading" />
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
            <VuePagination :amount="parseInt(skills?.length)" @paginate="(n) => { paginate(n) }" />
            <VueModal v-if="layout.showSkillModal" :skill="skillsToBeEdited"
                @close="skillsToBeEdited = ''; layout.showSkillModal = false" />


        </ClientOnly>
    </div>
</template>

<script setup>
import delete_query from '../queries/skills/delete-skills.gql'
import Search_query from '../queries/skills/search.gql'
const mainData = useData()
const skills = ref(mainData.value.user.skills)
const layout = useLayout();
const skillsToBeEdited = ref('');
const select = useSelect()
const selected = ref(select.selected);
const checkBox = ref('')
const uid = useCookie('uid')
const selectAllCheckBox = ref('')

const nuxtApp = useNuxtApp()
const { mutate: deleteSkill, loading, onDone, onError } = useMutation(delete_query)
const deleteSkills = async () => {
    if (selected.value) {

        deleteSkill({ id: selected.value })
        onDone(res => {
            selectAllCheckBox.value.checked = false
            checkBox.value.forEach(checkBoxx => {
                checkBoxx.checked = false
            })
            selected.value = []
            layout.value.showAlert = { error: false, message: 'Skill deletion successful' }
            nuxtApp.$reFetch()
        })
        onError(err => {
            console.log(err)
            if (err.message === 'no mutations exist') {
                layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
            }
            else layout.value.showAlert = { error: true, message: 'skill deletion not successful' }

        })
    } else {
        layout.value.showAlert = { error: false, message: 'Nothing to delete' }
    }



}



const searchLoading = ref(false)
const search = async (searchValue) => {
    searchLoading.value = true
    const { onResult, onError, refetch, loading } = useQuery(Search_query, { search: "%" + searchValue + "%" }, { fetchPolicy: 'cache-and-network', })
    onResult(res => {
        skills.value = res.data.skills
    })
    onError(err => {
        layout.value.showAlert = { error: true, message: 'Searching failed' }
    })
}
import query from '../queries/users/get-users.gql'
const paginate = async (n) => {
    const { onResult, onError, refetch, loading } = useQuery(query, { id: uid.value, offset: n }, { fetchPolicy: 'no-cache', })
    onResult(res => {
        skills.value = res.data.users_by_pk.skills
    })
    onError(err => {
        console.log("test", err)
        layout.value.showAlert = { error: true, message: err }
    })




}

</script>