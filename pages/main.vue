
<script setup>
const layout = useLayout();
const query = gql`
mutation {
  Attend(employee_id: "854f2d15-be7c-429e-b190-014660d8d65a") {
    id
  }
}
`

const { mutate: attend, onDone, onError, loading } = useMutation(query)

const sign = () => {
    attend();
    onDone(res => {
        console.log(res)
        layout.value.showAlert = { error: false, message: 'You signed successfully' }
    })
    onError(err => {
        console.log(err)
        layout.value.showAlert = { error: true, message: err.message }
    })
}
</script>
<template>
    <div>
        <main>

            <div class="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-6">
                <div class="col-span-full mb-5 xl:mb-0">

                    <h1 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                        Profile
                    </h1>
                </div>

                <div class="col-span-full xl:col-auto">
                    <div
                        class="bg-white  dark:bg-gray-900 shadow-lg dark:shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-2xl p-4 mb-6">
                        <div class="sm:flex xl:block sm:space-x-4 xl:space-x-0">

                            <div>
                                <h2 class="text-xl font-bold dark:text-white">Abebe Kebede</h2>
                                <ul class="mt-2 space-y-1">
                                    <li class="flex items-center text-sm font-normal text-gray-500">
                                        <svg class="mr-2 w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                                clip-rule="evenodd"></path>
                                            <path
                                                d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z">
                                            </path>
                                        </svg>
                                        TEacher
                                    </li>
                                    <li class="flex items-center text-sm font-normal text-gray-500">
                                        <svg class="mr-2 w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                        Addis ababa, Ethiopia
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="mb-4 sm:flex xl:block">
                            <div class="sm:flex-1">
                                <address class="text-sm not-italic font-normal text-gray-500">
                                    <div class="mt-4">Email adress</div>
                                    <a class="text-sm font-medium text-gray-900 dark:text-white">yourname@flowbite.com</a>
                                    <div class="mt-4">Home adress</div>
                                    <div class="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Gerji mebrat hayl,
                                        <br>Addis Ababa
                                    </div>
                                    <div class="mt-4">Phone number</div>
                                    <div class="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        +251918784596
                                    </div>
                                </address>
                            </div>
                            <div class="flex justify-end">
                                <button @click="sign()" type="button"
                                    class="bg-red-500 hover:bg-red-700 py-2 px-8 rounded-xl text-white">
                                    <span v-if="!loading">Sign</span>
                                    <span v-else>Signing...</span>
                                </button>
                            </div>
                        </div>

                    </div>


                </div>
                <div class="col-span-2">
                    <div
                        class="bg-white dark:bg-gray-900 shadow-lg dark:shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-2xl p-4 mb-6">
                        <h3 class="mb-4 text-xl font-bold dark:text-white">General information</h3>
                        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                            <div class="sm:col-span-2">
                                <dt class="text-lg font-medium text-gray-900 dark:text-gray-200">About me</dt>
                                <dd class="mt-1 space-y-3 max-w-prose text-sm text-gray-500 dark:text-gray-400">
                                    <p>
                                        Dedicated, passionate, and accomplished Full Stack
                                        Developer with 9+ years of progressive experience
                                        working as an Independent Contractor for Google and
                                        developing and growing my educational social network
                                        that helps others learn programming, web design, game
                                        development, networking.
                                    </p>
                                    <p>
                                        Aside from my job, I like to create and contribute to
                                        open source projects. That helps me to learn a ton of
                                        new stuff, grow as a developer and support other open
                                        source projects.
                                    </p>
                                </dd>
                            </div>
                            <div>
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Education</dt>
                                <dd class="text-sm font-semibold text-gray-900 dark:text-white">
                                    Thomas Jeff High School, Stanford University
                                </dd>
                            </div>
                            <div>
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Work History
                                </dt>
                                <dd class="text-sm font-semibold text-gray-900  dark:text-white">
                                    Twitch, Google, Apple
                                </dd>
                            </div>
                            <div>
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Join Date</dt>
                                <dd class="text-sm font-semibold text-gray-900 dark:text-white">
                                    12-09-2021
                                </dd>
                            </div>
                            <div>
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Languages</dt>
                                <dd class="text-sm font-semibold text-gray-900 dark:text-white">
                                    English, German, Italian, Spanish
                                </dd>
                            </div>
                            <div>
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Organization
                                </dt>
                                <dd class="text-sm font-semibold text-gray-900 dark:text-white">
                                    Bergside Inc.
                                </dd>
                            </div>
                            <div>
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Role</dt>
                                <dd class="text-sm font-semibold text-gray-900 dark:text-white">
                                    Graphic Designer
                                </dd>
                            </div>
                            <div>
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Department
                                </dt>
                                <dd class="text-sm font-semibold text-gray-900 dark:text-white">
                                    Marketing
                                </dd>
                            </div>
                            <div>
                                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Birthday</dt>
                                <dd class="text-sm font-semibold text-gray-900 dark:text-white">
                                    15-08-1990
                                </dd>
                            </div>
                        </dl>
                    </div>

                </div>
            </div>
        </main>

    </div>
</template>