<template>
    <div>
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
                        <div class="flex pl-4 space-x-2 text-gray-500 dark:text-gray-400">New Message</div>

                    </div>

                </div>
                <form v-if="message" @submit.prevent="send()"
                    class="right-0 bottom-0 p-5 mx-4 mb-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-md shadow-gray-200 dark:shadow-gray-700 xl:p-6">
                    <div class="mb-4 space-y-4 lg:mb-5">
                        <div>

                            <VueInput name="message_to" type="text" placeholder="To" rule="email"
                                :value="message[0].email" />
                        </div>
                        <div>
                            <VueInput name="subject" type="text" placeholder="Subject" rule="required" />
                        </div>
                        <div>

                            <VueInput name="message" type="text" :textarea="true" placeholder="Write the message here ..."
                                rule="required|minLength:20" />
                        </div>
                    </div>
                    <div class="items-center sm:flex sm:divide-x sm:divide-gray-100">
                        <div class="mb-3 space-y-3 sm:flex sm:space-y-0 sm:mb-0">
                            <VueButton name="send" type="submit" variation="normal" icon="send" :loading="loading" />
                        </div>

                    </div>
                </form>
            </main>
        </ClientOnly>
    </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import insert_query from '../queries/messages/insert-messages.gql'
const mainData = useData();
const router = useRouter()
const route = useRoute()
const uid = useCookie('uid')
const layout = useLayout();
const message = useData().value.user.messages?.filter(chat => {
    return chat.id === route.params.id
})

const { handleSubmit } = useForm();



const nuxtApp = useNuxtApp();

const { mutate: sendMessage, onDone, onError, loading } = useMutation(insert_query)
const send = handleSubmit((formValues) => {
    console.log(formValues);


    sendMessage({ user_id: uid.value, full_name: mainData.value.user.first_name + ' ' + mainData.value.user.last_name, email: formValues.message_to, subject: formValues.subject, message: formValues.message, phone_number: mainData.value.user.phone_number })

    onDone(res => {
        console.log(res)
        nuxtApp.$reFetch()
        layout.value.showAlert = { error: false, message: 'You have successfully send a message' }
        router.push('/messages')

    })

    onError(err => {
        console.log(err)
        if (err.message === 'no mutations exist') {
            layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
        }
        else layout.value.showAlert = { error: true, message: err.message }

    })

})

</script>