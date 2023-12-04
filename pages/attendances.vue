<template>
    <div>

        <div>

            <ClientOnly>
                <Search @search="(n) => (search(n))" />
                <div>
                    <div class="flex flex-col my-6 mx-4 rounded-2xl shadow-xl shadow-gray-200 dark:shadow-gray-700">
                        <div class="overflow-x-auto rounded-2xl">
                            <div class="inline-block min-w-full align-middle">
                                <div class="overflow-hidden">
                                    <DashboardAttendances :attendances="mainData.attendances" />
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
                <!--VuePagination :amount="parseInt(employees?.length)" @paginate="(n) => { paginate(n) }" /-->
                <VueModal v-if="layout.showAttendanceModal" @close="layout.showAttendanceModal = false" />

            </ClientOnly>
        </div>
    </div>
</template>

<script setup>
import Search_query from '../queries/attendances/search.gql'
const mainData = useData();
const layout = useLayout();
let attendances = computed(() => {
    return mainData.value.attendances;
})

const uid = useCookie('uid')





const search = async (searchValue) => {
    console.log("val", searchValue)
    const { onResult, onError, refetch, loading } = useQuery(Search_query, { search: "%" + searchValue + "%" }, { fetchPolicy: 'cache-and-network', })
    onResult(res => {
        console.log("search", res)
        attendances = res.data?.attendance

    })
    onError(err => {
        console.log(err)
        layout.value.showAlert = { error: true, message: 'Searching failed' }
    })
}


</script>