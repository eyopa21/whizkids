<template>
    <div :class="layout.showSideBar ? 'flex-row p-4 space-x-4' : 'hidden lg:block flex-col p-4 pr-0'"
        class=" relative bottom-0 left-0 justify-center  w-full lg:flex bg-gray-100 dark:bg-gray-900"
        sidebar-bottom-menu="">

        <a @click="logout()"
            class="inline-flex justify-center p-2 text-gray-500 dark:text-gray-400 rounded cursor-pointer hover:text-dark-500 hover:bg-gray-200 dark:hover:bg-gray-700">

            <VueTooltip :label="'Logout '" />
        </a>





    </div>
</template>

<script setup>
const layout = useLayout();

const router = useRouter();
const token = useCookie('token')
const uid = useCookie('uid')
const ROLE = useCookie('ROLE')

const { onLogout } = useApollo()
const logout = () => {
    onLogout();
    // router.push('/auth/login')
    token.value = null;
    uid.value = null;
    ROLE.value = null;

    reloadNuxtApp({
        path: "/auth/login",
        ttl: 1000, // default 10000
    });

}
</script>