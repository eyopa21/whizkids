<template>
    <div class="bg-white dark:bg-gray-900 shadow-lg shadow-gray-200  dark:shadow-gray-700 rounded-2xl p-4 mb-6">
        <div class="flow-root">
            <h3 class="dark:text-gray-100 text-xl font-bold">Social accounts</h3>
            <ul class="divide-y divide-gray-200">
                <ClientOnly>
                    <li v-for="link in links" :key="link" class="py-4">
                        <div class="flex items-center space-x-4">


                            <div class="flex-shrink-0">

                                <Icon :name="link.icon" class=" w-5 h-5 text-white" />
                            </div>
                            <div class="flex-1 min-w-0">
                                <span class="block text-base font-semibold text-gray-900 dark:text-gray-400 truncate">
                                    {{ link.link_name }}
                                </span>
                                <a href="#" class="block text-sm font-normal text-fuchsia-500 truncate hover:underline">
                                    {{ link.the_link }}
                                </a>
                            </div>
                            <div class="inline-flex items-center space-x-2">

                                <VueButton @click="layout.showLinksModal = true; linkToBeEdited = link" name="Edit"
                                    variation="edit" type="button"
                                    className=" bg-white rounded-lg border border-gray-300 hover:bg-gray-50 hover:scale-[1.02] transition-transform" />
                                <VueButton @click="deleteLinks(link.id)" name="Delete" type="button" variation="delete"
                                    :loading="loading" />
                                <!--VueAlert v-if="layout.showDeleteAlert" @delete="deleteLinks(link.id)" :loading="loading" /-->
                            </div>
                        </div>
                    </li>
                </ClientOnly>

            </ul>

            <div class="mt-2 flex justify-end">
                <VueButton @click="layout.showLinksModal = true" name="Add New" type="button" variation="normal" />

            </div>
        </div>
    </div>

    <VueModal v-if="layout.showLinksModal" showSocialLinkModal="true" :link="linkToBeEdited"
        @close="linkToBeEdited = ''; layout.showLinksModal = false" />
</template>
<script setup>
import delete_query from '../queries/links/delete-links.gql'
const layout = useLayout();
const linkToBeEdited = ref('');
const nuxtApp = useNuxtApp();
const mainData = useData()
const links = ref(mainData.value.user?.links)




const { mutate: deleteLink, onDone, onError, loading } = useMutation(delete_query)
const deleteLinks = (id) => {

    deleteLink({ id: id })
    onDone(res => {
        nuxtApp.$reFetch()
        console.log(res)
        layout.value.showAlert = { error: false, message: 'Link Deleted successfully' }
    })
    onError(err => {
        console.log(err)
        if (err.message === 'no mutations exist') {
            layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
        }
        else layout.value.showAlert = { error: true, message: 'Deleteion not successfull' }
    })
}

</script>

