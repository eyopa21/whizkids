<template>
    <div>
        <form @submit.prevent="submit()">
            <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6">
                    <VueInput label="Name" name="name" type="text" placeholder="Service name"
                        :value="props.service ? props.service.name : ''" rule="required" />
                </div>
                <div class="col-span-6">
                    <VueInput label="Description" name="description" type="text" placeholder="Service description"
                        :textarea="true" :value="props.service ? props.service.description : ''"
                        rule="required|minLength:20" />
                </div>
                <div class="col-span-6">
                    <VueInput label="Icon" name="icon" type="text" placeholder="Copy and paste the icon here ..."
                        :textarea="true" :value="props.service ? props.service.icon : ''" rule="required" />
                    <span class="pl-2 -pt-2 text-xs font-thin text-gray-900 dark:text-gray-400">Hint: go to -
                        <a href="https://icones.js.org/" target="_blank" class="underline">https://icones.js.org/</a> and
                        copy the Icon name</span>
                </div>

            </div>
            <div class="  pt-6 mt-8 rounded-b border-t border-gray-200">

                <VueButton type="submit" name="Save all" variation="normal" :loading="updateLoading || insertLoading" />
            </div>
        </form>

    </div>
</template>

<script setup>

import { useForm } from "vee-validate";
const props = defineProps(['service'])


import insert_query from '../queries/services/insert-services.gql'
import update_query from '../queries/services/update-services.gql'
const uid = useCookie('uid')
const layout = useLayout();
const { handleSubmit } = useForm();
const nuxtApp = useNuxtApp()
const { mutate: updateServices, onDone: updateOnDOne, onError: updateOnError, loading: updateLoading } = useMutation(update_query)
const { mutate: insertServices, onDone: insertOnDone, onError: insertOnError, loading: insertLoading } = useMutation(insert_query)
const submit = handleSubmit((formValues) => {
    console.log(formValues);
    if (props.service) {

        console.log("updating")
        updateServices({ id: props.service.id, name: formValues.name, description: formValues.description, icon: formValues.icon })
    }
    else {

        console.log("inserting")
        insertServices({ user_id: uid.value, name: formValues.name, description: formValues.description, icon: formValues.icon })
    }
    updateOnDOne(res => {
        nuxtApp.$reFetch()
        console.log(res)

        layout.value.showAlert = { error: false, message: 'Service updating successfull' }
    })
    insertOnDone(res => {
        nuxtApp.$reFetch()
        console.log(res)


        layout.value.showAlert = { error: false, message: 'Service Adding successfull' }
    })
    updateOnError(err => {
        console.log(err)

        if (err.message === 'no mutations exist') {
            layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
        }
        else layout.value.showAlert = { error: true, message: 'Service updating error' }
    })
    insertOnError(err => {
        console.log(err.message)

        if (err.message === 'no mutations exist') {
            layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
        }
        else layout.value.showAlert = { error: true, message: 'Service Adding error' }
    })
})

</script>