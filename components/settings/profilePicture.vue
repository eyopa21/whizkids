<template>
    <div>
        <div
            class="bg-white dark:bg-gray-900 shadow-lg shadow-gray-200 dark:shadow-gray-700 dark:shadow-md rounded-2xl p-4 mb-6">

            <div class="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                <NuxtImg v-if="profilePicture.url" @click="changePicture()" quality="100" loading="lazy"
                    class="mb-4  hover:opacity-70 w-28 h-28 rounded-lg sm:mb-0 xl:mb-4 2xl:mb-0 shadow-lg shadow-gray-300 dark:shadow-gray-600"
                    :src="profilePicture.url" placeholder alt="profile-pic" />
                <NuxtImg v-else @click="changePicture()" quality="100" loading="lazy" provider="cloudinary"
                    class="mb-4  hover:opacity-70 w-28 h-28 rounded-lg sm:mb-0 xl:mb-4 2xl:mb-0 shadow-lg shadow-gray-300 dark:shadow-gray-600"
                    :src="mainData.user?.profile_picture?.split('upload')[1] ? mainData.user?.profile_picture?.split('upload')[1] : '/'"
                    placeholder alt="profile-pic" />
                <div>
                    <h3 class="mb-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
                        <ClientOnly>
                            {{ mainData.user.first_name + " " + mainData.user.last_name }}({{ mainData.user.user_name }})
                        </ClientOnly>
                    </h3>
                    <div class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                        <ClientOnly>
                            {{ mainData.user.profession }}
                        </ClientOnly>
                    </div>
                    <VueButton @click="updateProfilePicture()" class="" className="cursor-pointer" name="Change picture"
                        type="button" variation="normal" icon="profile-pic" :loading="updateLoading || uploadLoading" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import update_query from '../queries/users/update-profile-picture.gql'
import upload_image_query from '../queries/upload-image.gql'
const uid = useCookie('uid')
const mainData = useData()
const layout = useLayout();
const profilePicture = ref({
    url: '',
    base64: ''
});
const nuxtApp = useNuxtApp();
const changePicture = () => {

    var input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    input.onchange = (e) => {
        console.log(URL.createObjectURL(e.target.files[0]))
        profilePicture.value.url = URL.createObjectURL(e.target.files[0]);
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            profilePicture.value.base64 = reader.result.split(",")[1];

        };
    };
};
const { mutate: update, onDone: onUpdateDone, onError: onUpdateError, loading: updateLoading } = useMutation(update_query)
const { mutate: uploadImage, onDone: onUploadDone, onError: onUploadError, loading: uploadLoading } = useMutation(upload_image_query)

const updateProfilePicture = () => {

    if (profilePicture.value.base64) {

        uploadImage({ base64: profilePicture.value.base64 })

        onUploadDone(res => {
            update({ id: uid.value, profile_picture: res.data.UploadImage.url })
        })

        onUploadError(err => {
            console.log(err)

            if (err.message === 'no mutations exist') {
                layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
            }
            else layout.value.showAlert = { error: true, message: 'Uploading profile image faile, please try again' }
        })
        onUpdateDone(res => {
            nuxtApp.$reFetch()
            console.log("Updating done", res)
            layout.value.showAlert = { error: false, message: 'Updating profile Done' }

        })
        onUpdateError(err => {
            console.log(err)
            if (err.message === 'no mutations exist') {
                layout.value.showAlert = { error: true, message: 'Sorry!, You are not allowed for this operation' }
            }
            else layout.value.showAlert = { error: true, message: 'Updating profile image faile, please try again' }
        })

    } else {
        layout.value.showAlert = { error: true, message: 'Please select an image first' }
    }


}

</script>