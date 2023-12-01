<template>
    <div class=" min-h-screen">
        <ClientOnly>


            <main>
                <div
                    class="block justify-between items-center p-4 my-6 mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-md shadow-gray-200 dark:shadow-gray-700 sm:flex">
                    <div class="flex items-center divide-x divide-gray-100">
                        <div class="pr-3">
                            <NuxtLink @click="router.go(-1)"
                                class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>

                            </NuxtLink>
                        </div>
                        <div class="flex pl-0 space-x-2 sm:px-2 font-bold ml-2">

                            {{ message[0].email }}

                        </div>

                    </div>
                    <div class=" pl-0 space-x-2 divide-x divide-gray-100 flex px-2">

                        <div class="pl-2">
                            <div class="pl-3 text-sm font-medium text-gray-500">
                                {{ message[0].created_at?.split('T')[0] }} @
                                <span class="underline">

                                    {{ message[0].created_at?.split('T')[1].split('.')[0] }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-5">
                    <div class="flex items-center mb-4">

                        <div class="ml-4">
                            <div class="text-base font-semibold text-gray-900 dark:text-white truncate">
                                {{ message[0].name }}
                            </div>
                            <div class="text-sm text-gray-500 text-normal">
                                {{ message[0].email }}
                            </div>
                        </div>
                    </div>
                    <h1 class="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-300">
                        {{ message[0].subject }}
                    </h1>
                    <div class="space-y-2">

                        <p class="text-base font-normal text-gray-600">
                            {{ message[0].message }}
                        </p>

                    </div>
                </div>
                <div
                    class="fixed bottom-0 p-4 mx-4 mb-4 w-full bg-white dark:bg-gray-900 dark:border dark:border-gray-800 rounded-2xl shadow-lg dark:shadow-md shadow-gray-200 dark:shadow-gray-700 lg:fixed">
                    <div class="items-center sm:flex sm:divide-x sm:divide-gray-100 lg:pl-4">
                        <div class="mb-3 space-y-3 sm:flex sm:space-y-0 sm:mb-0">
                            <div>
                                <NuxtLink :to="`/messages/reply/${$route.params.id}`"
                                    class="text-white bg-gradient-to-br from-pink-500 to-violet-500 font-medium rounded-lg shadow-md shadow-gray-300 dark:shadow-gray-600 hover:scale-[1.02] transition-transform text-sm px-5 py-2.5 text-center inline-flex items-center justify-center w-full sm:w-auto mr-3">
                                    <svg class="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                    Reply
                                </NuxtLink>
                            </div>

                        </div>
                        <!--div class="flex pl-0 space-x-1 sm:pl-2">
                            <a href="#"
                                class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </a>
                            <a href="#"
                                class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </a>
                            <a href="#"
                                class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                                    </path>
                                </svg>
                            </a>
                            <a href="#"
                                class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </a>
                        </!--div-->
                    </div>
                </div>
            </main>
        </ClientOnly>
    </div>
</template>

<script setup>
const router = useRouter()

const route = useRoute()
const message = useData().value.user.messages?.filter(chat => {
    return chat.id === route.params.id
})

</script>