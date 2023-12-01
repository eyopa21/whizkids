<template>
    <div>
        <form @submit.prevent="submit()">
            <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Title" name="title" type="text" placeholder="Timeline title"
                        :value="props.timeline ? props.timeline.title : ''" rule="required" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Location" name="location" type="text" placeholder="Timeline location"
                        :value="props.timeline ? props.timeline.location : ''" rule="required" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="From" name="from" type="date" placeholder="From..."
                        :value="props.timeline ? props.timeline.from : ''" rule="required" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="To" name="to" type="date" placeholder="... to"
                        :value="props.timeline ? props.timeline.to : ''" rule="required" />
                </div>
                <div class="col-span-full">
                    <div class="mb-4">
                        <VueInput name="Type" label="Type" type="select" :value="props.timeline ? props.timeline.type : ''"
                            rule="required" placeholder="Select your timeline type" />
                    </div>
                </div>
                <div class="col-span-full">
                    <VueInput label="Description" name="description" type="text" placeholder="Timeline Description"
                        :textarea="true" :value="props.timeline ? props.timeline.description : ''"
                        rule="required|minLength:20" />
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

const props = defineProps(['timeline'])

const { handleSubmit } = useForm();
import insert_query from '../queries/timelines/insert-timelines.gql'
import update_query from '../queries/timelines/update-timelines.gql'
const layout = useLayout();
const uid = useCookie('uid')
const nuxtApp = useNuxtApp()
const { mutate: updateTimelines, onDone: updateOnDOne, onError: updateOnError, loading: updateLoading } = useMutation(update_query)
const { mutate: insertTimelines, onDone: insertOnDone, onError: insertOnError, loading: insertLoading } = useMutation(insert_query)
const submit = handleSubmit((formValues) => {
    console.log(formValues);
    if (props.timeline) {

        console.log("updating")
        updateTimelines({ id: props.timeline.id, title: formValues.title, description: formValues.description, location: formValues.location, from: formValues.from, to: formValues.to, type: formValues.Type })
    } else {
        console.log("inserting")

        insertTimelines({ user_id: uid.value, title: formValues.title, description: formValues.description, location: formValues.location, from: formValues.from, to: formValues.to, type: formValues.Type })
    }
    updateOnDOne(res => {
        console.log(res)
        nuxtApp.$reFetch()
        layout.value.showAlert = { error: false, message: 'Timeline updating successfull' }
    })
    insertOnDone(res => {
        console.log(res)
        nuxtApp.$reFetch()
        layout.value.showAlert = { error: false, message: 'Timeline Adding successfull' }
    })
    updateOnError(err => {
        console.log(err)

        if (err.message === 'no mutations exist') {
            layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
        }
        else layout.value.showAlert = { error: true, message: 'Timeline updating error' }
    })
    insertOnError(err => {
        console.log(err.message)

        if (err.message === 'no mutations exist') {
            layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
        }
        else layout.value.showAlert = { error: true, message: 'Timeline Adding error' }
    })
})


</script>