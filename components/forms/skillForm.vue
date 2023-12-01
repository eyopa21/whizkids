<template>
    <div>
        <form @submit.prevent="submit()">



            <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-6">
                    <VueInput label="Skill Name" name="skill_name" type="text" placeholder="Skill name"
                        :value="props.skill ? props.skill.skill_name : ''" rule="required" />

                </div>

                <div class="col-span-6 sm:col-span-6 ">
                    <VueInput label="" name="value" type="number" placeholder="Skill percentage"
                        :value="props.skill ? props.skill.value : ''" rule="number:50,100" />
                    <!--div class="flex flex-row justify-between ">

                        <VueInput label="Percentage" name="percentage" type="range" placeholder="Skill percentage"
                            :value="props.skill ? props.skill.value : ''" rule="number" />
                        <VueInput label="" name="percentage" type="number" placeholder="Skill percentage"
                            :value="props.skill ? props.skill.value : ''" rule="number" />

                    </div-->


                </div>
                <div class="col-span-6">

                    <div class="flex justify-end items-center py-4 space-x-4 mt-2">

                        <div class="text-lg font-semibold text-gray-900 dark:text-gray-200">
                            Place on Right
                        </div>

                        <VueToggle id="right" :toggleData="right" @toggle="(a) => right = a" />
                    </div>
                </div>

            </div>


            <div class="  pt-6 mt-8 rounded-b border-t border-gray-200">

                <VueButton type="submit" name="Save all" variation="normal" :loading="updateLoading || insertLoading" />
            </div>
        </form>

    </div>
</template>

<script setup>

import insert_query from '../queries/skills/insert-skills.gql'
import update_query from '../queries/skills/update-skills.gql'
import { useForm } from "vee-validate";
const { handleSubmit } = useForm();
const props = defineProps(['skill'])
const layout = useLayout()
const uid = useCookie('uid')
const right = ref(props.skill ? props.skill.right : false)
const nuxtApp = useNuxtApp()
const { mutate: updateSkills, onDone: updateOnDOne, onError: updateOnError, loading: updateLoading } = useMutation(update_query)
const { mutate: insertSkills, onDone: insertOnDone, onError: insertOnError, loading: insertLoading } = useMutation(insert_query)
const submit = handleSubmit((formValues) => {
    console.log(formValues);
    if (props.skill) {

        console.log("updating")
        updateSkills({ id: props.skill.id, skill_name: formValues.skill_name, value: formValues.value, right: right.value })
    }
    else {

        console.log("inserting")
        insertSkills({ user_id: uid.value, skill_name: formValues.skill_name, value: formValues.value, right: right.value })
    }
    updateOnDOne(res => {
        console.log(res)
        nuxtApp.$reFetch()
        layout.value.showAlert = { error: false, message: 'Skiil updating successfull' }
    })
    insertOnDone(res => {
        console.log(res)
        nuxtApp.$reFetch()
        layout.value.showAlert = { error: false, message: 'Skiil Adding successfull' }
    })
    updateOnError(err => {
        console.log(err)

        if (err.message === 'no mutations exist') {
            layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
        }
        else layout.value.showAlert = { error: true, message: 'Skiil updating error' }
    })
    insertOnError(err => {
        console.log(err.message)

        if (err.message === 'no mutations exist') {
            layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
        }
        else layout.value.showAlert = { error: true, message: 'Skiil Adding error' }
    })
})

</script>