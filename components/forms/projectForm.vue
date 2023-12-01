<template>
    <div>
        <form @submit.prevent="submit()">
            <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Title" name="title" type="text" placeholder="Project title"
                        :value="props.project ? props.project.title : ''" rule="required" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Subtitle" name="subtitle" type="text" placeholder="Project subtitle"
                        :value="props.project ? props.project.subtitle : ''" rule="required" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Date" name="date" type="date" placeholder="Project date"
                        :value="props.project ? props.project.date : ''" rule="required" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Link" name="link" type="text" placeholder="Project link"
                        :value="props.project ? props.project.link : ''" rule="required" />
                </div>
                <div class="col-span-6 sm:col-span-3">
                    <VueInput label="Client" name="client" type="text" placeholder="Clients's name"
                        :value="props.project ? props.project.client : ''" rule="required" />
                </div>
                <div class="col-span-full">
                    <VueInput label="Description" name="description" type="text" placeholder="Project Description"
                        :textarea="true" :value="props.project ? props.project.description : ''"
                        rule="required|minLength:20" />
                </div>

            </div>

            <div class="flex my-4 space-x-5 ">


                <a v-for="i in  projectImagestoPreview " class="hover:scale-110 -mr-3" :key="i">
                    <img @click="showImageModal = true" class="w-24 h-24 rounded-full border-2 border-white" :src="i"
                        alt="blog image">
                    <a @click="removeImage(i)" class="cursor-pointer"><svg
                            class="-mt-5 w-6 h-6 text-red-600 hover:scale-110" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clip-rule="evenodd"></path>
                        </svg></a>
                </a>


            </div>
            <div class="flex justify-center items-center w-full">
                <label
                    class="flex flex-col w-full h-32 rounded border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div @click="addImage()" class="flex flex-col justify-center items-center pt-5 pb-6">
                        <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12">
                            </path>
                        </svg>
                        <p class="py-1 text-sm text-gray-600">Upload a file or drag and drop</p>
                        <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input ref="input" type="file" multiple class="hidden">
                </label>
            </div>
            <div class="  pt-6 mt-8 rounded-b border-t border-gray-200">

                <VueButton type="submit" name="Save all" variation="normal"
                    :loading="updateLoading || uploadLoading || insertLoading" />
            </div>
        </form>
        <VueImageViewer @close="showImageModal = false" v-if="showImageModal" :images="projectImagestoPreview" />
    </div>
</template>

<script setup>
import insert_query from '../queries/projects/insert-projects.gql'
import update_query from '../queries/projects/update-projects.gql'
import upload_image_query from '../queries/upload-image.gql'
import { useForm } from "vee-validate";
const props = defineProps(['project'])
const layout = useLayout();
const allImages = ref(props.project ? props.project.images : [])
const projectImagestoPreview = ref(props.project ? [...props.project.images] : [])
const projectImagestoUpload = Object.assign([], props.project.images)
const uid = useCookie('uid')

const base64 = ref([])
const showImageModal = ref(false)
const nuxtApp = useNuxtApp();
const { handleSubmit } = useForm();
const { mutate: updateProjects, onDone: onUpdateDone, onError: onUpdateError, loading: updateLoading } = useMutation(update_query)
const { mutate: uploadImage, onDone: onUploadDone, onError: onUploadError, loading: uploadLoading } = useMutation(upload_image_query)
const { mutate: insertProjects, onDone: oninsertDone, onError: oninsertError, laoding: insertLoading } = useMutation(insert_query)

const submit = handleSubmit((formValues) => {
    console.log(formValues);

    if (props.project) {
        console.log("updating")
        if (base64.value.length) {
            for (let i in base64.value) {
                uploadImage({ base64: base64.value[i] })
            }
            onUploadDone(res => {

                projectImagestoUpload.push(res.data.UploadImage.url)

                if (projectImagestoPreview.value.length == projectImagestoUpload.length) {
                    console.log("to uplaod", projectImagestoUpload)
                    updateProjects({ id: props.project.id, images: projectImagestoUpload, title: formValues.title, subtitle: formValues.subtitle, client: formValues.client, link: formValues.link, date: formValues.date, description: formValues.description })
                }
            })

            onUploadError(err => {

                console.log(err)
                if (err.message === 'no mutations exist') {
                    layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
                }
                else layout.value.showAlert = { error: true, message: 'Image uploading falied' }

            })
            onUpdateDone(res => {
                nuxtApp.$reFetch()
                console.log("wowwwwwww Updating done", res)
                layout.value.showAlert = { error: false, message: 'Project update succesfull' }
            })
            onUpdateError(err => {

                console.log(err)
                if (err.message === 'no mutations exist') {
                    layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
                }
                else layout.value.showAlert = { error: true, message: 'project updating failed' }
            })

        } else {
            updateProjects({ id: props.project.id, images: projectImagestoUpload, title: formValues.title, subtitle: formValues.subtitle, client: formValues.client, link: formValues.link, date: formValues.date, description: formValues.description })
            onUpdateDone(res => {
                nuxtApp.$reFetch()
                console.log("Updating done", res)
                layout.value.showAlert.message = "Project update succesfull"
            })
            onUpdateError(err => {

                console.log(err)
                if (err.message === 'no mutations exist') {
                    layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
                }
                else layout.value.showAlert = { error: true, message: 'project updating failed' }

            })
        }
    }
    else {
        console.log("inserting")
        for (let i in base64.value) {
            uploadImage({ base64: base64.value[i] })
        }
        onUploadDone(res => {
            console.log("upload", projectImagestoUpload.length)
            console.log("preview", projectImagestoPreview.value.length)
            projectImagestoUpload.push(res.data.UploadImage.url)
            if (projectImagestoPreview.value.length == projectImagestoUpload.length) {
                insertProjects({ user_id: uid.value, images: projectImagestoUpload, title: formValues.title, subtitle: formValues.subtitle, client: formValues.client, link: formValues.link, date: formValues.date, description: formValues.description })
            }

        })

        onUploadError(err => {

            console.log(err)
            if (err.message === 'no mutations exist') {
                layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
            }
            else layout.value.showAlert = { error: true, message: 'Image uploading falied' }
        })
        oninsertDone(res => {
            nuxtApp.$reFetch()
            console.log("wowwwwwww Inserting done", res)
            layout.value.showAlert = { error: false, message: 'Project Added succesfully' }
        })
        oninsertError(err => {

            console.log(err)
            if (err.message === 'no mutations exist') {
                layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
            }
            else layout.value.showAlert = { error: true, message: 'project Adding failed' }
        })

    }

})

const input = ref('')
const addImage = () => {
    input.value.onchange = (e) => {
        console.log(URL.createObjectURL(e.target.files[0]))
        projectImagestoPreview.value.push(URL.createObjectURL(e.target.files[0]))
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            base64.value.push(reader.result.split(",")[1])
        };
    };
}

const removeImage = (theImage) => {
    projectImagestoPreview.value.splice(projectImagestoPreview.value.indexOf(theImage), 1)
    base64.value.splice(base64.value.indexOf(theImage), 1)
    projectImagestoUpload.splice(projectImagestoUpload.indexOf(theImage), 1)

}





</script>