<template>
    <div class="flex flex-col mt-32 md:mt-0 justify-center items-center px-6 pt-8 mx-auto md:h-screen">

        <div class="fixed top-8 right-8">

            <VueDarkMode />
        </div>
        <div
            class="p-10 w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-md shadow-gray-300 dark:shadow-gray-600 ">
            <div class="space-y-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                    Log in As Admin
                </h2>

                <form class="mt-8 space-y-6" @submit.prevent="login()">
                    <VueInput className="w-full " label="Your Email" type="text" name="email" placeholder="Type your email"
                        rule="email" />
                    <VueInput className="w-full " label="Your Password" type="password" name="password"
                        placeholder="**********" rule="password" />
                    <div class="flex items-start">
                        <div class="ml-3 text-sm">
                            <NuxtLink to="/auth/login"
                                class="ml-auto text-sm text-gray-900 dark:text-white underline hover:underline">Login as
                                Employee

                            </NuxtLink>
                        </div>
                        <NuxtLink to="/auth/forgot" class="ml-auto text-sm text-fuchsia-600 hover:underline">Lost Password?
                        </NuxtLink>
                    </div>

                    <VueButton :loading="loading || loadin" name="Login to your account" className="py-3  "
                        variation="normal" type="submit" />

                    <!--div class="text-sm font-medium text-gray-500">
                        Not registered?
                        <a href="" class="text-fuchsia-600 hover:underline">Create account</a>
                    </div-->
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useForm } from "vee-validate";
import login_query from '../queries/admin/login.gql'
import admin_query from '../queries/admin/get-admin-data.gql'

const { onLogin, onLogout } = useApollo()
const router = useRouter()

const uid = useCookie('uid');
const token = useCookie('token');
const mainData = useData()
const layout = useLayout()

const { mutate: Loginn, onDone, onError, loading } = useMutation(login_query)
const loadin = ref(false)
const { handleSubmit } = useForm();

const login = handleSubmit(async (formValues) => {
    console.log(formValues);

    loadin.value = true
    Loginn({ email: formValues.email, password: formValues.password })
    onDone(async res => {
        console.log(res.data.AdminLogin.token)
        await onLogin(res.data.AdminLogin.token)
        uid.value = res.data.AdminLogin.id
        token.value = res.data.AdminLogin.token
        const { data, error } = await useLazyAsyncQuery(admin_query, { fetchPolicy: 'no-cache' })
        if (error.value) {
            console.log("erororor", error.value)
            layout.value.showAlert = { error: true, message: error.value }
            onLogout()
            uid.value = null;
            token.value = null;
            loadin.value = false;
        } else {
            loadin.value = false
            mainData.value.employees = computed(() => {
                return data.value.users;
            })
            mainData.value.attendances = computed(() => {
                return data.value.attendance;
            })
            layout.value.showAlert = { error: false, message: 'Login success' }
            reloadNuxtApp({
                path: "/",
                ttl: 1000,
            });


        }

    })
    onError(err => {
        console.log("eroror", err)
        onLogout()
        token.value = null
        uid.value = null

        layout.value.showAlert = { error: true, message: err.message }
        loadin.value = false;
    })
})

</script>