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
                        Forgot your password?
                    </h2>
                    <p class="text-base font-normal text-gray-500">
                        Type in your email and we will send you a code to
                        reset your password!
                    </p>
                    <form class="mt-8 space-y-6" @submit.prevent="forgotPassword()">

                        <VueInput className="w-full " label="Your Email" type="text" name="email"
                            placeholder="email@gmail.com" rule="email" />


                        <div class="flex justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" name="remember" type="checkbox"
                                        class="w-5 h-5 dark:bg-gray-400 rounded border-gray-300 focus:ring-3 focus:ring-0 checked:bg-dark-900"
                                        required="">
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="font-medium text-gray-900 dark:text-white">I accept the
                                        <a href="#" class="text-fuchsia-500 hover:underline">Terms and
                                            Conditions</a></label>
                                </div>
                            </div>
                            <div>
                                <NuxtLink to="/auth/login"
                                    class="ml-auto font-bold text-md underline text-fuchsia-600 hover:underline">
                                    Back to
                                    Login
                                </NuxtLink>
                            </div>
                        </div>

                        <VueButton name=" Reset password" className="py-3  " variation="normal" type="submit"
                            :loading="loading" />
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>

import { useForm } from "vee-validate";

import query from '../queries/forgot-password.gql'
const { mutate: forgot, onDone, onError } = useMutation(query)
const layout = useLayout()
const router = useRouter()
const { handleSubmit } = useForm();
const loading = ref(false)
const forgotPassword = handleSubmit((formValues) => {
    loading.value = true
    console.log(formValues);
    forgot({ email: formValues.email })
    onDone(res => {
        console.log(res)
        loading.value = false
        layout.value.showAlert = { error: false, message: 'We have sent a new password to your email' }
        router.push('/auth/login')
    })
    onError(err => {
        console.log(err)
        loading.value = false
        layout.value.showAlert = { error: true, message: err.message }
    })
})

</script>