<template>
    <div class="flex flex-col justify-center items-center px-6 pt-8 mx-auto md:h-screen">
        <div class="fixed top-8 right-8">
            <VueDarkMode />
        </div>
        <div
            class="p-10 w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-300 dark:shadow-gray-600">
            <div class="space-y-8">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                    Log in as a guest
                </h2>
                <form class="mt-8 space-y-6" @submit.prevent="login()">
                    <VueInput className="w-full " label="Your Email" type="text" name="email" placeholder="Type your email"
                        rule="email" />
                    <span class="text-xs text-fuchsia-500">Hint: Use - <strong>jobtennis21@gmail.com</strong></span>
                    <VueInput className="w-full " label="Your Password" type="password" name="password"
                        placeholder="**********" rule="password" />
                    <span class="text-xs text-fuchsia-500">Hint: Use - <strong>561529911</strong></span>
                    <div class="flex items-start">
                        <div class="ml-3 text-sm">
                            <NuxtLink to="/auth/login"
                                class="ml-auto text-sm text-gray-900 dark:text-white underline hover:underline">
                                Login as User
                            </NuxtLink>
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
import login_query from "../queries/guest-login.gql";
import query from "../../queries/users/get-users.gql";

const { onLogin, onLogout } = useApollo();
const router = useRouter();
const auth = useAuth();
const uid = useCookie("uid");
const token = useCookie("token");
const role = useCookie('role')
const mainData = useData();
const layout = useLayout();
const { mutate: guestlogin, onDone, onError } = useMutation(login_query);
const { handleSubmit } = useForm();
const loading = ref(false);
const login = handleSubmit(async (formValues) => {
    console.log(formValues);
    loading.value = true;
    guestlogin({
        email: formValues.email,
        password: formValues.password,
    });
    onDone(async (res) => {
        console.log(res)
        await onLogin(res.data.GuestLogin.token);
        uid.value = res.data.GuestLogin.user_id;
        token.value = res.data.GuestLogin.token;
        const { data, error } = await useLazyAsyncQuery(query, {
            id: res.data.GuestLogin.user_id,
        });
        if (error.value) {
            console.log("erororor", error.value);
            layout.value.showAlert = {
                error: true,
                message: error.value,
            };
            loading.value = false;
            onLogout();
            uid.value = null;
            token.value = null
        } else {

            mainData.value.user = data.value.users_by_pk;
            mainData.value.currentGuest = res.data.GuestLogin;
            layout.value.showAlert = {
                error: false,
                message: "Login success",
            };
            loading.value = false;
            reloadNuxtApp({
                path: "/",
                ttl: 1000,
            });
        }

    });
    onError((err) => {
        console.log("eroror", err);
        onLogout();
        token.value = null
        uid.value = null;
        loading.value = false;
        layout.value.showAlert = {
            error: true,
            message: err.message,
        };

    });
});







/*

   await onLogin(res.data.Login.token);
        uid.value = res.data.Login.id;
        token.value = res.data.Login.token;
        const { data, error } = await useLazyAsyncQuery(query, {
            id: res.data.Login.id,
        });
        if (error.value) {
            console.log("erororor", error.value);
            layout.value.showAlert = {
                error: true,
                message: error.value,
            };
            loading.value = false;
            onLogout();
        } else {
            mainData.value.user = data.value.users_by_pk;
            layout.value.showAlert = {
                error: false,
                message: "Login success",
            };
            loading.value = false;
        }
        router.push("/");

*/
</script>

