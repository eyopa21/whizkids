<template>
    <div :class="layout.showSideBar ? 'w-64' : 'w-0 lg:w-24'" id="sidebar"
        class="transition-all duration-[.5s] flex fixed top-0 left-0 z-20 flex-col flex-shrink-0 pt-16 h-full  lg:flex shadow-t-xl">
        <div id="inner-sidenav-transition"
            class="flex transition-all duration-[.5s] relative flex-col flex-1 pt-0 min-h-0 bg-gray-100 lg:bg-gray-50 dark:bg-gray-900 border-b-32"
            :class="layout.showSideBar ? 'lg:w-64  shadow-violet-500 shadow-lg lg:shadow-none mt-[.4px] lg: mt - 0' : 'lg:w-24'">
            <div class="flex overflow-y-auto flex-col flex-1 pt-8 pb-4">
                <div class="flex-1 px-3 bg-gray-50 dark:bg-gray-900" id="sidebar-items">
                    <ul class="pb-2 pt-1">
                        <!--li>
                            <form action="#" method="GET" class="lg:hidden">
                                <label for="mobile-search" class="sr-only">Search</label>
                                <div class="relative">
                                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <input type="text" name="email" id="mobile-search"
                                        class="bg-gray-50  border border-gray-300 text-dark-500 text-sm font-light rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full pl-10 p-2.5 mb-2"
                                        placeholder="Search">
                                </div>
                            </form>
                        </li-->
                        <li @click="layout.showSideBar = false" v-for="( i, key ) in  navs " :key="key" class="">


                            <NuxtLink :to="i.to"
                                class="flex items-center py-2.5 px-3 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 group  transition-all duration-200"
                                exact-active-class="bg-gray-200 dark:bg-gray-700">
                                <div
                                    class="bg-white dark:bg-gray-800 shadow-lg shadow-gray-300 dark:shadow-gray-800  w-8 h-8 p-2 mr-1 rounded-lg text-center grid place-items-center">

                                    <ClientOnly>
                                        <Icon :name="i.icon" class="dark:text-gray-300" />
                                    </ClientOnly>
                                </div>
                                <span :class="layout.showSideBar ? 'block' : 'lg:hidden'"
                                    class="ml-3 dark:text-white  text-sm font-light" sidebar-toggle-item=""> {{ i.name
                                    }}
                                </span>
                            </NuxtLink>
                            <hr v-if="key == 0"
                                class="border-0 mt-2 h-px last:mb-2 bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100">
                        </li>

                    </ul>


                </div>
            </div>
            <BottomSidebar />
        </div>
    </div>

    <div :class="layout.showSideBar ? 'block lg:hidden' : 'hidden'" class=" fixed inset-0 z-10 bg-gray-900 opacity-50"
        id="sidebarBackdrop"></div>
</template>

<script setup>
const shrink = ref(false)
const layout = useLayout();
const localePath = useLocalePath()
const props = defineProps(['class'])
const navs = ref([{
    name: 'Dashboard',
    to: '/',
    icon: 'heroicons:adjustments-horizontal-20-solid'
},

{
    name: 'Employees',
    to: '/employees',
    icon: 'raphael:anonymous'
},


{
    name: 'Main',
    to: '/main',
    icon: 'heroicons:code-bracket-20-solid'
},


])
</script>


<style></style>