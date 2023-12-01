<template>
    <div>
        <form @submit.prevent="submit()">
            <div class="grid grid-cols-6 gap-6">
                <div class="col-span-12">
                    <VueInput label="User name" name="user_name" type="text" placeholder="User name here...."
                        rule="required" />

                </div>
                <div class="col-span-12">
                    <VueInput label="Email" name="email" type="email" placeholder="The email here ... " rule="email" />
                </div>

                <div class="col-span-12">
                    <div class="flex justify-start items-center py-4 space-x-4">

                        <div class="text-lg font-semibold text-gray-900 dark:text-white">
                            Super Admin
                        </div>

                        <VueToggle id="super-guest" :toggleData="isSuperGuest" @toggle="(a) => isSuperGuest = a" />
                    </div>
                </div>


            </div>

            <div class="  pt-6 mt-8 rounded-b border-t border-gray-200">

                <VueButton type="submit" name="Save all" variation="normal" :loading="loading" />

            </div>
        </form>

    </div>
</template>
<script setup>
import query from '../queries/guests/invite-guests.gql'
import { useForm } from "vee-validate";
const props = defineProps(['invite'])
const uid = useCookie('uid')
const layout = useLayout();

const isSuperGuest = ref(false)
const nuxtApp = useNuxtApp()
const { handleSubmit } = useForm();
const { mutate: invite, onDone, onError, loading } = useMutation(query)
const submit = handleSubmit((formValues) => {
    console.log(formValues);
    invite({ user_id: uid.value, email: formValues.email, user_name: formValues.user_name, is_super_guest: isSuperGuest.value })
    onDone(res => {
        nuxtApp.$reFetch()
        console.log(res)
        layout.value.showAlert = { error: false, message: 'Invitation sent successfully' }
    })
    onError(err => {
        console.log(err.message)
        if (err.message === 'Uniqueness violation. duplicate key value violates unique constraint "guests_email_key"') layout.value.showAlert = { error: true, message: 'This guest is already invited' }
        if (err.message === 'no mutations exist') {
            layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
        }
        else layout.value.showAlert = { error: true, message: 'Invitation not successful' }
    })

})


</script>