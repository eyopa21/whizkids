<template>
    <div>
        <form @submit.prevent="submit()">
            <div class="p-4 md:p-6 w-full">
                <div class="mb-3 pr-4  space-y-4 font-normal leading-none text-gray-900">
                    <VueInput className="" label="Title" type="text" name="title" placeholder="Blog title"
                        :value="props.blog ? props.blog.title : ''" rule="required" />
                    <VueInput className="" label="Subtitle" type="text" name="subtitle" placeholder="Blog subtitle"
                        :value="props.blog ? props.blog.subtitle : ''" rule="required" />

                    <VueInput className="w-full " label="Category" type="text" name="category" placeholder="Blog category"
                        :value="props.blog ? props.blog.category : ''" rule="required" />

                </div>
                <div class="flex flex-col justify-center items-start mb-5 space-y-3">

                    <div class="flex flex-row flex-wrap">
                        <div class="flex justify-start items-center">
                            <a v-for="i in  blogImagestoPreview " class="hover:scale-110 -mr-3" :key="i">
                                <img @click="showImageModal = true" class="w-16 h-16 rounded-full border-2 border-white"
                                    :src="i" alt="blog image">
                                <a @click="removeImage(i)" class="cursor-pointer"><svg
                                        class="-mt-5 w-6 h-6 text-red-600 hover:scale-110" fill="currentColor"
                                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            clip-rule="evenodd"></path>
                                    </svg></a>
                            </a>

                        </div>
                        <button @click="addImage()" type="button"
                            class="text-gray-900 my-4 bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-300 font-semibold rounded-2xl text-xs px-3 py-1.5 text-center inline-flex items-center ml-5">
                            <svg class="mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            Add Image
                        </button>

                    </div>
                </div>
                <div class="inline-flex mt-4 items-center mb-2 text-lg font-semibold text-center text-gray-900">
                    <svg class="mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                            clip-rule="evenodd"></path>
                    </svg>
                    Description
                </div>


                <div class="">

                    <VueInput name="description" label="Description" type="text" :textarea="true"
                        :value="props.blog ? props.blog.description : ''" placeholder=" Write a comment..."
                        rule="required|minLength:20" />
                </div>



                <div class="flex justify-end items-center py-4 space-x-4 mt-2">

                    <div class="text-lg font-semibold text-gray-900 dark:text-gray-200">
                        Comments(on/off)
                    </div>

                    <VueToggle id="is-commentable" :toggleData="isCommentable" @toggle="(a) => isCommentable = a" />
                </div>
                <hr>
                <div class="text-sm text-gray-500 flex justify-end mt-4">
                    Added by <a class="text-fuchsia-500 no-underline cursor-pointer hover:underline">
                        Job
                        Nigussie</a>, 22 hours ago
                </div>
            </div>

            <div class="grid grid-rows-2 grid-flow-col gap-2 p-4 rounded-b border-t border-gray-200 sm:grid-rows-1 md:p-6">

                <VueButton className="w-full inline-flex items-center justify-center text-white" type="submit"
                    name="Save all" variation="normal" :loading="uploadLoading || insertLoading || updateLoading" />




            </div>

        </form>
    </div>

    <VueImageViewer @close="showImageModal = false" v-if="showImageModal" :images="blogImagestoPreview" />
</template>

<script setup>
import insert_query from '../queries/blogs/insert-blogs.gql'
import update_query from '../queries/blogs/update-blogs.gql'
import upload_image_query from '../queries/upload-image.gql'
import { useForm } from "vee-validate";
const props = defineProps(['blog'])
const showImageModal = ref(false);
const isCommentable = ref(false)
const layout = useLayout();
const allImages = ref(props.blog ? [...props.blog.images] : [])
const blogImagestoPreview = ref(props.blog ? [...props.blog.images] : [])
const blogImagestoUpload = Object.assign([], props.blog.images)
const uid = useCookie('uid')
const base64 = ref([])
const { handleSubmit } = useForm();
const nuxtApp = useNuxtApp();
const { mutate: updateBlogs, onDone: onUpdateDone, onError: onUpdateError, loading: updateLoading } = useMutation(update_query)
const { mutate: uploadImage, onDone: onUploadDone, onError: onUploadError, loading: uploadLoading } = useMutation(upload_image_query)
const { mutate: insertBlogs, onDone: oninsertDone, onError: oninsertError, loading: insertLoading } = useMutation(insert_query)


const submit = handleSubmit((formValues) => {

    console.log(formValues);
    if (props.blog) {
        if (base64.value.length) {
            for (let i in base64.value) {
                uploadImage({ base64: base64.value[i] })
            }

            onUploadDone(res => {
                blogImagestoUpload.push(res.data.UploadImage.url)
                if (blogImagestoPreview.value.length === blogImagestoUpload.length) {
                    updateBlogs({ id: props.blog.id, images: blogImagestoUpload, title: formValues.title, subtitle: formValues.subtitle, category: formValues.category, is_commentable: isCommentable.value, description: formValues.description })
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
                layout.value.showAlert = { error: false, message: 'Blog update succesfull' }

            })
            onUpdateError(err => {

                console.log(err)

                if (err.message === 'no mutations exist') {
                    layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
                }
                else layout.value.showAlert = { error: true, message: 'Blog updating falied' }
            })

        } else {
            updateBlogs({ id: props.blog.id, images: blogImagestoUpload, title: formValues.title, subtitle: formValues.subtitle, category: formValues.category, is_commentable: isCommentable.value, description: formValues.description })
            onUpdateDone(res => {
                nuxtApp.$reFetch()
                console.log("wowwwwwww Updating done", res)
                layout.value.showAlert = { error: false, message: 'Blog update succesfull' }
            })
            onUpdateError(err => {
                console.log(err)
                if (err.message === 'no mutations exist') {
                    layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
                }
                else layout.value.showAlert = { error: true, message: 'Blog updating failed' }

            })
        }
    }
    else {
        for (let i in base64.value) {

            uploadImage({ base64: base64.value[i] })
        }

        onUploadDone(res => {

            blogImagestoUpload.push(res.data.UploadImage.url)
            if (blogImagestoPreview.value.length == blogImagestoUpload.length) {
                insertBlogs({ user_id: uid.value, images: blogImagestoUpload, title: formValues.title, subtitle: formValues.subtitle, category: formValues.category, is_commentable: isCommentable.value, description: formValues.description })
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

            layout.value.showAlert = { error: false, message: 'Blog added successully' }

        })
        oninsertError(err => {

            console.log(err)
            layout.value.showAlert.message = "Blog adding failed"
            if (err.message === 'no mutations exist') {
                layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
            }
            else layout.value.showAlert = { error: true, message: 'Blog adding failed' }

        })

    }

})

const input = ref('')
const addImage = () => {

    var input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = (e) => {
        console.log(URL.createObjectURL(e.target.files[0]))
        blogImagestoPreview.value.push(URL.createObjectURL(e.target.files[0]))
        allImages.value.push(URL.createObjectURL(e.target.files[0]))
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            base64.value.push(reader.result.split(",")[1])
        };
    };
}

const removeImage = (theImage) => {

    blogImagestoPreview.value.splice(blogImagestoPreview.value.indexOf(theImage), 1)
    base64.value.splice(base64.value.indexOf(theImage), 1)
    blogImagestoUpload.splice(blogImagestoUpload.indexOf(theImage), 1)
}

const test = ref(
    'I made some wireframes that we would like you to follow since we are building it in Googles Material DesignPlease learn more about this and see how to improve standard material design into something beautiful.But besides that, you can just do it how you like. Next Friday should be done.Next Monday we should deliver the first iteration.Make sure, we have a good result to be delivered by the day. '
)
</script>
