<template>
    <div class="bg-white dark:bg-gray-900 shadow-lg shadow-gray-200  dark:shadow-gray-700 rounded-2xl p-4 mb-6">
        <h3 class="mb-4 text-xl font-bold dark:text-gray-100">Password information</h3>
        <form @submit.prevent="changePassword()">
            <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">

                    <VueInput label="Current password" type="password" name="current_password" placeholder="**********"
                        rule="password" />

                </div>
                <div class="col-span-6 sm:col-span-3">

                    <VueInput label="New password" type="password" name="new_password" placeholder="**********"
                        rule="password" />
                </div>
                <div class="col-span-6 sm:col-span-3">

                    <VueInput label="Confirm password" type="password" name="confirm-password" placeholder="**********"
                        rule="confirmed:@new_password" />
                </div>
                <div class="col-span-full">
                    <div class="text-sm font-medium dark:text-gray-300">
                        Password requirements:
                    </div>
                    <div class="mb-1 text-sm font-normal text-gray-500">
                        Ensure that these requirements are met:
                    </div>
                    <ul class="pl-4 space-y-1 text-gray-500">
                        <li class="text-xs font-normal">
                            At least 10 characters (and up to 100 characters)
                        </li>
                        <li class="text-xs font-normal">
                            At least one lowercase character
                        </li>
                        <li class="text-xs font-normal">
                            Inclusion of at least one special character, e.g., ! @
                            # ?
                        </li>
                        <li class="text-xs font-normal">
                            Some text here
                        </li>
                    </ul>
                </div>
                <div class="col-span-6 sm:col-full">
                    <VueButton name="Save all" type="submit" variation="normal" :loading="loading" />
                </div>
            </div>
        </form>
    </div>
</template>
<script setup>
import query from '../queries/change-password.gql'
import { useForm } from "vee-validate";
const { handleSubmit } = useForm();
const uid = useCookie('uid')
const layout = useLayout()
const { mutate: change, onDone, onError, loading } = useMutation(query)
const nuxtApp = useNuxtApp();
const changePassword = handleSubmit((formValues) => {

    console.log(formValues);
    change({ id: uid.value, old_password: formValues.current_password, new_password: formValues.new_password })
    onDone(res => {
        console.log(res)
        layout.value.showAlert = { error: false, message: 'You have changed your password successfully' }
        nuxtApp.$reFetch()

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