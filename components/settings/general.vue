<template>
    <div class="bg-white dark:bg-gray-900 shadow-lg shadow-gray-200 dark:shadow-gray-700 rounded-2xl p-4 mb-6">
        <h3 class="mb-4 text-xl font-bold dark:text-gray-100">General information</h3>
        <form @submit.prevent="submit()">
            <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">

                    <VueInput label="First Name" type="text" name="first_name" placeholder="Your name ..." rule="required"
                        :value="mainData.user.first_name" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Last Name" type="text" name="last_name" placeholder="Your father's name ..."
                        rule="required" :value="mainData.user.last_name" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Age" type="number" name="Age" placeholder="Your age ..." rule="number:10,100"
                        :value="24" />
                </div>
                <div class="col-span-6 sm:col-span-3">

                    <VueInput label="Profession" type="text" name="profession" placeholder="Your Profession ..."
                        rule="required" :value="mainData.user.profession" />
                </div>
                <div class="col-span-6 sm:col-span-3">

                    <VueInput label="Location" type="text" name="location" placeholder="Your location ..." rule="required"
                        :value="mainData.user.location" />
                </div>
                <div class="col-span-6 sm:col-span-3">

                    <VueInput label="Phone Numbeer" type="text" name="phone_number" placeholder="Your phone number ..."
                        rule="required" :value="mainData.user.phone_number" />
                </div>
                <div class="col-span-6 sm:col-span-3">

                    <VueInput label="Email" type="email" name="email" placeholder="Your email ..." rule="email"
                        :value="mainData.user.email" />
                </div>
                <div class="col-span-6 sm:col-span-3">

                    <VueInput label="Current workplace" type="text" name="current_workplace"
                        placeholder="Your cureent workplace ..." rule="required" :value="mainData.user.first_name" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Role" type="text" name="role" placeholder="Your Role ..." rule="required"
                        :value="mainData.user.role" />

                </div>
                <div class="col-span-12 sm:col-span-6">
                    <VueInput label="Description" :textarea="true" type="text" name="description"
                        placeholder="Some description" rule="required" :value="mainData.user.description" />
                </div>

                <div class="col-span-6 sm:col-full">

                    <VueButton name="Save all" type="submit" variation="normal" :loading="loading" />
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import query from '../queries/users/update-users.gql'

import { useForm } from "vee-validate";
const mainData = useData()
const layout = useLayout();
const { handleSubmit } = useForm();
const uid = useCookie('uid');
const nuxtApp = useNuxtApp()


const { mutate: updateUsers, onDone, onError, loading } = useMutation(query)
const submit = handleSubmit((formValues) => {

    console.log(formValues);
    updateUsers({ id: uid.value, email: formValues.email, first_name: formValues.first_name, last_name: formValues.last_name, date_of_birth: '1999-01-29', location: formValues.location, phone_number: formValues.phone_number, profession: formValues.profession, role: formValues.role, user_name: formValues.role, work_place: formValues.current_workplace, description: formValues.description })
    onDone(async res => {
        await nuxtApp.$reFetch()
        console.log(res)
        layout.value.showAlert = { error: false, message: 'Update successfull' }

    })
    onError(err => {
        console.log(err)
        if (err.message === 'no mutations exist') {
            layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
        }
        else layout.value.showAlert = { error: true, message: 'Update not successfull' }

    })
})
</script>