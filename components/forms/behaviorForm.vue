<template>
    <div>
        <form @submit.prevent="submit()">

            <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 ">
                    <VueInput label="Title" name="title" type="text" placeholder="Behavior title"
                        :value="props.behavior ? props.behavior.title : ''" rule="required" />
                </div>
                <div class="col-span-6">
                    <VueInput label="Description" name="description" type="text" placeholder="Behavior description"
                        :textarea="true" :value="props.behavior ? props.behavior.description : ''"
                        rule="required|minLength:20" />
                </div>
                <div class="col-span-6">
                    <VueInput label="Icon" name="icon" type="text" placeholder="Copy and paste the icon here ..."
                        :textarea="true" :value="props.behavior ? props.behavior.icon : ''" rule="required" />
                    <span class="pl-2 -pt-2 text-xs font-thin text-gray-900 dark:text-gray-400">Hint: go to -
                        <a href="https://icones.js.org/" target="_blank" class="underline">https://icones.js.org/</a> and
                        copy the Icon name</span>
                </div>
            </div>

            <div class="  pt-6 mt-8 rounded-b border-t border-gray-200">

                <VueButton type="submit" name="Save all" variation="normal" :loading="updateLoadin || insertLoading" />
            </div>
        </form>

    </div>
</template>
<script setup>
import insert_query from '../queries/behaviors/insert-behaviors.gql'
import update_query from '../queries/behaviors/update-behaviors.gql'
import { useForm } from "vee-validate";
const props = defineProps(['behavior'])
const { handleSubmit } = useForm();
const layout = useLayout();
const uid = useCookie('uid')
const nuxtApp = useNuxtApp()


const { mutate: updateBehaviors, onDone: updateOnDOne, onError: updateOnError, laoding: updateLoadin } = useMutation(update_query)
const { mutate: insertBehaviors, onDone: insertOnDone, onError: insertOnError, loading: insertLoading } = useMutation(insert_query)
const submit = handleSubmit((formValues) => {
    console.log(formValues);

    if (props.behavior) {
        console.log("updating")
        updateBehaviors({ id: props.behavior.id, title: formValues.title, description: formValues.description, icon: formValues.icon })
    }
    else {
        console.log("inserting")
        insertBehaviors({ user_id: uid.value, title: formValues.title, description: formValues.description, icon: formValues.icon })
    }
    updateOnDOne(res => {
        nuxtApp.$reFetch()
        console.log(res)
        layout.value.showAlert = { error: false, message: 'Behavior updating successfull' }
    })
    insertOnDone(res => {
        nuxtApp.$reFetch()
        console.log(res)
        layout.value.showAlert = { error: false, message: 'Behavior Adding successfull' }
    })
    updateOnError(err => {
        console.log(err.message)
        console.log(err.code)
        if (err.message === 'no mutations exist') {
            layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
        }
        else layout.value.showAlert = { error: true, message: 'Behavior updating error' }
    })
    insertOnError(err => {
        console.log(err.message)
        if (err.message === 'no mutations exist') {
            layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
        }
        else layout.value.showAlert = { error: true, message: 'Behavior Adding error' }
    })
})

</script>