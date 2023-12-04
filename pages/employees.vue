<template>
    <div>
        <ClientOnly>
            <Search @search="(n) => (search(n))" :showDelete="selected.length ? true : false"
                @delete="layout.showDeleteAlert = true" :items="selected.length" />

            <div v-if="employees?.length == 0">
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
                                                        @change="select.selectAll(selected, checkBox, selectAllCheckBox, employees)"
                                                        id="checkbox-all" type="checkbox"
                                                        class="w-5 h-5 rounded border-gray-300 focus:ring-0 checked:bg-dark-900">
                                                    <label for="checkbox-all" class="sr-only">checkbox</label>
                                                </div>
                                            </th>
                                            <th scope="col"
                                                class="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5">
                                                Employee name
                                            </th>
                                            <th scope="col"
                                                class="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5">
                                                Role
                                            </th>
                                            <th scope="col"
                                                class="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5">
                                                Entry date
                                            </th>

                                            <th scope="col" class="p-4 lg:p-5 flex justify-end">
                                                <VueSort />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white  dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                        <tr v-for="(employee, key) in employees" :key="employee"
                                            class="hover:bg-gray-100 dark:hover:bg-gray-800 ">
                                            <td class="p-4 w-4 lg:p-5">
                                                <div class="flex items-center">
                                                    <input ref="checkBox"
                                                        @change="select.select(selected, checkBox, selectAllCheckBox, employees, employee.id, key)"
                                                        id="checkbox-194556" type="checkbox"
                                                        class="w-5 h-5 rounded border-gray-300 focus:ring-0 checked:bg-dark-900">
                                                    <label for="checkbox-194556" class="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <td class="p-4 text-sm font-normal text-gray-500  whitespace-nowrap lg:p-5">
                                                <div class="text-base font-semibold text-gray-900 dark:text-gray-400">{{
                                                    employee.full_name
                                                }}</div>
                                                <div class="text-sm font-normal text-gray-500 dark:text-gray-600">{{
                                                    employee.sex }}
                                                </div>
                                            </td>
                                            <td
                                                class="p-4 text-base font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap lg:p-5">
                                                {{ employee.role }}
                                            </td>
                                            <td
                                                class="p-4 text-base font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap lg:p-5">
                                                {{ employee.date_of_entry }}
                                            </td>

                                            <td class="flex justify-end p-4 space-x-2 whitespace-nowrap lg:p-5 ">
                                                <VueAttendButton :id="employee.id" />
                                                <VueButton
                                                    @click=" layout.showEmployeeModal = true; employeeToBeEdited = employee"
                                                    name="Edit Item" type="button" variation="edit" />

                                                <VueButton
                                                    @click="selected.length = 0; selected.push(employee.id); layout.showDeleteAlert = true"
                                                    name="Delete Employee" type="button" variation="delete" />
                                                <VueAlert v-if="layout.showDeleteAlert" @delete="deleteEmployee()"
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
            <!--VuePagination :amount="parseInt(employees?.length)" @paginate="(n) => { paginate(n) }" /-->
            <VueModal v-if="layout.showEmployeeModal" :employee="employeeToBeEdited"
                @close="layout.showEmployeeModal = false; employeeToBeEdited = ''" />

        </ClientOnly>
    </div>
</template>

<script setup>
import delete_query from '../queries/employee/delete-employees.gql'
const mainData = useData()
const employees = computed(() => {
    return mainData.value.employees
})
const layout = useLayout();
const employeeToBeEdited = ref('');
const select = useSelect()
const selected = ref(select.selected);
const checkBox = ref('')
const uid = useCookie('uid')
const selectAllCheckBox = ref('')

const nuxtApp = useNuxtApp()


const { mutate: DeleteEmployee, loading, onDone, onError } = useMutation(delete_query)
const deleteEmployee = async () => {
    if (selected.value) {
        DeleteEmployee({ id: selected.value })
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

const attend = (id) => {
    console.log("attend", id)
}
</script>