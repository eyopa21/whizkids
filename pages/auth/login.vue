<template>
    <div class="flex flex-col mt-32 md:mt-0 justify-center items-center px-6 pt-8 mx-auto md:h-screen">

        <div class="fixed top-8 right-8">

            <VueDarkMode />
        </div>
        <div
            class="p-10 w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-md shadow-gray-300 dark:shadow-gray-600 ">
            <div class="space-y-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                    Welcome to Whizkids
                </h2>

                <form class="mt-8 space-y-6" @submit.prevent="login()">
                    <VueInput className="w-full " label="Your Email" type="text" name="email" placeholder="Type your email"
                        rule="email" />
                    <VueInput className="w-full " label="Your Password" type="password" name="password"
                        placeholder="**********" rule="password" />
                    <div class="flex items-start">
                        <div class="ml-3 text-sm">

                        </div>
                        <NuxtLink to="/auth/forgot" class="ml-auto text-sm text-fuchsia-600 hover:underline">Lost Password?
                        </NuxtLink>
                    </div>

                    <VueButton :loading="loading" name="Login to your account" className="py-3  " variation="normal"
                        type="submit" />

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
import login_query from '../queries/auth/employee-login.gql'
import current_employee_query from '../queries/employee/get-current-employee.gql'

const { onLogin, onLogout } = useApollo()
const router = useRouter()

const uid = useCookie('uid');
const token = useCookie('token');
const mainData = useData()
const layout = useLayout()

const { mutate: Login, onDone, onError, loading } = useMutation(login_query)
//const { onResult, onError: onQueryError, loading: onQueryLoading } = useQuery(current_employee_query, { id: uid.value })

const loadin = ref(false)
const { handleSubmit } = useForm();

const login = handleSubmit(async (formValues) => {
    console.log(formValues);

    loadin.value = true
    Login({ email: formValues.email, password: formValues.password })
    onDone(async res => {
        await onLogin(res.data.Login.token)
        uid.value = res.data.Login.id
        token.value = res.data.Login.token
        router.push('/')
        const { data, error } = await useLazyAsyncQuery(current_employee_query, { id: res.data.Login.id })
        if (error.value) {
            layout.value.showAlert = { error: true, message: error.value }
            onLogout()
            uid.value = null;
            token.value = null;
        } else {


            mainData.value.user = data.value.users_by_pk
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
    })
})

</script>