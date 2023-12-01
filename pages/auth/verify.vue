<template>
    <main class="">
        <div class="fixed top-8 right-8">

            <VueDarkMode />
        </div>
        <div class="flex flex-col justify-center items-center px-6 pt-8 mx-auto md:h-screen pt:mt-0">

            <div
                class="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-md shadow-gray-300 dark:shadow-gray-600 md:mt-0 sm:max-w-screen-sm xl:p-0">
                <div class="p-10 w-full">
                    <h2 class="mb-3 text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
                        Verify your account {{ uid }}
                    </h2>
                    <p class="text-base font-normal text-gray-500">
                        Please enter the code that you recieved
                    </p>
                    <form class="mt-8 space-y-6" @submit.prevent="verify()">

                        <VueInput className="w-full " label="Your Verification code" type="text" name="code"
                            placeholder="*******" rule="required" />


                        <div class="flex justify-end">

                            <div>
                                <NuxtLink to="/auth/login"
                                    class="ml-auto font-bold text-md underline text-fuchsia-600 hover:underline">
                                    Back to
                                    Login
                                </NuxtLink>
                            </div>
                        </div>

                        <VueButton name="Verify" className="py-3  " variation="normal" type="submit" :loading="loading" />
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>

import verify_query from '../queries/verify.gql'
import query from '../queries/users/get-users.gql'
import { useForm } from "vee-validate";
const { onLogin, onLogout } = useApollo()
const layout = useLayout()
const router = useRouter()
const mainData = useData()
const { handleSubmit } = useForm();
const loading = ref(false)
const uid = useCookie('uid')
const token = useCookie('token');
const verify = handleSubmit((formValues) => {
    const { mutate: verify, onDone, onError } = useMutation(verify_query)
    loading.value = true
    console.log(formValues);
    verify({ id: uid.value, code: formValues.code })
    onDone(async res => {
        const { data, error } = await useLazyAsyncQuery(query, { id: uid.value })
        console.log(data)
        if (error.value) {
            console.log("erororor", error.value)
            layout.value.showAlert = { error: true, message: error.value }
            loading.value = false
            onLogout()
            uid.value = null;
            token.value = null;
        } else {
            mainData.value.user = data.value.users_by_pk
            layout.value.showAlert = { error: false, message: 'Login success' }
            loading.value = false
            router.push("/");
        }
    })
    onError(err => {
        console.log(err)
        loading.value = false
        layout.value.showAlert = { error: true, message: err.message }
    })
})

</script>