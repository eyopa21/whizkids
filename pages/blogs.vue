<template>
    <div>
        <ClientOnly>


            <Search @search="(n) => (search(n))" :showDelete="selected.length ? true : false"
                @delete="layout.showDeleteAlert = true" :items="selected.length" />
            <div v-if="blogs?.length == 0">
                <NoDataFound />
            </div>
            <div v-else>


                <div class="flex flex-col my-6 mx-4 rounded-2xl shadow-xl shadow-gray-200 dark:shadow-gray-700 ">
                    <div class="overflow-x-auto rounded-2xl">
                        <div class="inline-block min-w-full align-middle">
                            <div class="overflow-hidden">
                                <table class="min-w-full divide-y divide-gray-200 table-fixed">
                                    <thead class="bg-white dark:bg-gray-900">
                                        <tr>
                                            <th scope="col" class="p-4 lg:p-5">
                                                <div class="flex items-center">
                                                    <input ref="selectAllCheckBox"
                                                        @change="select.selectAll(selected, checkBox, selectAllCheckBox, blogs)"
                                                        id="checkbox-all" type="checkbox"
                                                        class="w-5 h-5 rounded border-gray-300 focus:ring-0 checked:bg-dark-900">
                                                    <label for="checkbox-all" class="sr-only">checkbox</label>
                                                </div>
                                            </th>
                                            <th scope="col"
                                                class="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5">
                                                Title
                                            </th>
                                            <th scope="col"
                                                class="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5">
                                                Date
                                            </th>
                                            <th scope="col"
                                                class="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5">
                                                Category
                                            </th>

                                            <th scope="col" class="p-4 lg:p-5 flex justify-end">
                                                <VueSort />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                        <tr v-for="(blog, key) in blogs" :key="blog"
                                            class="hover:bg-gray-100 dark:hover:bg-gray-800">
                                            <td class="p-4 w-4 lg:p-5">
                                                <div class="flex items-center">
                                                    <input ref="checkBox"
                                                        @change="select.select(selected, checkBox, selectAllCheckBox, blogs, blog.id, key)"
                                                        id="checkbox-194556" type="checkbox"
                                                        class="w-5 h-5 rounded border-gray-300 focus:ring-0 checked:bg-dark-900">
                                                    <label for="checkbox-194556" class="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <td class="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                                                <div class="text-base font-semibold text-gray-900 dark:text-gray-400">{{
                                                    blog.title
                                                }}
                                                </div>
                                                <div class="text-sm font-normal text-gray-500 dark:text-gray-600">{{
                                                    blog.date
                                                }}
                                                </div>
                                            </td>
                                            <td
                                                class="p-4 text-base font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap lg:p-5">
                                                {{ blog.subtitle }}
                                            </td>
                                            <td
                                                class="p-4 text-base font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap lg:p-5">
                                                {{
                                                    blog.category
                                                }}
                                            </td>

                                            <td class="flex justify-end p-4 space-x-2 whitespace-nowrap lg:p-5">
                                                <VueButton @click="blogToBeEdited = blog; layout.showBlogModal = true"
                                                    name="Edit Item" type="button" variation="edit" />

                                                <VueButton
                                                    @click="selected.length = 0; selected.push(blog.id); layout.showDeleteAlert = true"
                                                    name="Delete Item" type="button" variation="delete" />

                                            </td>
                                            <VueAlert v-if="layout.showDeleteAlert" @delete="deleteBlog()"
                                                :loading="loading" />
                                        </tr>

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>



            </div>
            <VuePagination :amount="parseInt(blogs?.length)" @paginate="(n) => { paginate(n) }" />
            <VueModal v-if="layout.showBlogModal" :blog="blogToBeEdited"
                @close="layout.showBlogModal = false; blogToBeEdited = ''" />

        </ClientOnly>
    </div>
</template>

<script setup>
import delete_query from '../queries/blogs/delete-blogs.gql'
import Search_query from '../queries/blogs/search.gql'
const layout = useLayout();
const blogToBeEdited = ref('');
const mainData = useData();
const blogs = ref(mainData.value.user.blogs)
const select = useSelect()
const selected = ref(select.selected);
const checkBox = ref('')
const uid = useCookie('uid')
const selectAllCheckBox = ref('')
const nuxtApp = useNuxtApp();

const searchLoading = ref(false)
const { mutate: deleteBlogs, loading, onDone, onError } = useMutation(delete_query)
const deleteBlog = async () => {
    console.log("delete")

    if (selected.value) {
        deleteBlogs({ id: selected.value })
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
            else layout.value.showAlert = { error: true, message: 'Behavior deletion not successfully' }


        })
    } else {
        layout.value.showAlert = { error: false, message: 'Nothing to delete' }
    }


}



const search = async (searchValue) => {
    searchLoading.value = true
    const { onResult, onError, refetch, loading } = useQuery(Search_query, { search: "%" + searchValue + "%" }, { fetchPolicy: 'cache-and-network', })
    onResult(res => {
        blogs.value = res.data.blogs
    })
    onError(err => {
        layout.value.showAlert = { error: true, message: 'Searching failed' }
    })
}




import query from '../queries/users/get-users.gql'
const paginate = async (n) => {
    const { onResult, onError, refetch, loading } = useQuery(query, { id: uid.value, offset: n }, { fetchPolicy: 'no-cache', })
    onResult(res => {
        blogs.value = res.data.users_by_pk.blogs
    })
    onError(err => {
        console.log("test", err)
        layout.value.showAlert = { error: true, message: err }
    })
}
</script>