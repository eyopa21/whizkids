<template>
    <div>
        <form @submit.prevent="submit()">
            <div class="grid grid-cols-6 gap-6">
                <div class="col-span-12">
                    <VueInput label="Icon" name="icon" type="text" placeholder="select icon"
                        :value="props.link ? props.link.icon : ''" rule="required" />
                    <span class="pl-2 -pt-2 text-xs font-thin text-gray-900 dark:text-gray-400">Hint: go to -
                        <a href="https://icones.js.org/" target="_blank" class="underline">https://icones.js.org/</a> and
                        copy the Icon name</span>

                </div>
                <div class="col-span-12">
                    <VueInput label="Link Name" name="link_name" type="text" placeholder="The link name"
                        :value="props.link ? props.link.link_name : ''" rule="required" />

                </div>
                <div class="col-span-12">
                    <VueInput label="The Link" name="the_link" type="text" placeholder="https://facebook.com/..."
                        :value="props.link ? props.link.the_link : ''" rule="required" />
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
import insert_query from '../queries/links/insert-links.gql'
import update_query from '../queries/links/update-links.gql'
const layout = useLayout();
const props = defineProps(['link'])
const uid = useCookie('uid');
const nuxtApp = useNuxtApp();


const { handleSubmit } = useForm()
const { mutate: updateLinks, onDone: updateOnDone, onError: updateOnError, loading: updateLoading } = useMutation(update_query)
const { mutate: insertLinks, onDone: insertOnDone, onError: insertOnError, loading: insertLoading } = useMutation(insert_query)
const submit = handleSubmit((formValues) => {
    console.log(formValues);
    if (props.link) {

        console.log("updating")
        updateLinks({ id: props.link.id, link_name: formValues.link_name, the_link: formValues.the_link, icon: formValues.icon })
    }
    else {

        console.log("inserting")
        insertLinks({ user_id: uid.value, link_name: formValues.link_name, the_link: formValues.the_link, icon: formValues.icon })
    }
    updateOnDone(res => {
        nuxtApp.$reFetch()
        console.log(res)
        layout.value.showAlert = { error: false, message: 'Link updating successfull' }
    })
    insertOnDone(res => {
        nuxtApp.$reFetch()
        layout.value.showAlert = { error: false, message: 'Link Adding successfull' }
    })
    updateOnError(err => {
        console.log(err)

        if (err.message === 'no mutations exist') {
            layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
        }
        else layout.value.showAlert = { error: true, message: 'Link updating error' }
    })
    insertOnError(err => {
        console.log(err.message)

        if (err.message === 'no mutations exist') {
            layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
        }
        else layout.value.showAlert = { error: true, message: 'Link Adding error' }
    })
})


</script>