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
const mainData = useData();
const layout = useLayout();
const attendances = computed(() => {
    return mainData.value.attendances;
})

const uid = useCookie('uid')






</script>