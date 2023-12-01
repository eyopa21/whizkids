<template>
    <div :class="layout.showAlert.error ? 'bg-red-600' : layout.showAlert.warning ? 'bg-orange-400' : 'bg-green-600'"
        class="fixed z-[80] w-[75%] sm:w-full top-16 right-2 flex items-center md:w-full max-w-md p-4 space-x-4 text-white  divide-x divide-gray-200 rounded-lg shadow   space-x "
        role="alert">

        <div class="w-5 h-8 mx-4 text-white ">
            <button @click="close()" type="button"
                class="text-gray-200 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="user-modal">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
        <div class="pl-4 text-sm font-normal"> {{ layout.showAlert.message }} </div>
    </div>
</template>

<script setup>
const layout = useLayout();

const uid = useCookie('uid');
const token = useCookie('token')
const { onLogout } = useApollo()


if (layout.value.showAlert.message === 'http exception when calling webhook' || layout.value.showAlert.message === 'Failed to fetch') {
    layout.value.showAlert.message = 'Connection error, Please try again'
} else if (layout.value.showAlert.message === 'Could not verify JWT: JWTExpired') {
    layout.value.showAlert.message = 'Session expired'
    onLogout();
    uid.value = null
    token.value - null
    reloadNuxtApp({
        path: "/auth/login",
        ttl: 1000,
    });

}

else if (layout.value.showAlert.message === 'not a valid json response from webhook') {
    layout.value.showAlert.message = 'Connection error, please try again'
    reloadNuxtApp({
        ttl: 1000,
    });

}

const close = () => {
    layout.value.showAlert.message = '';
    layout.value.showAlert.warning = false;

}
setTimeout(() => {
    layout.value.showAlert.message = '';
    layout.value.showAlert.warning = false;

}, 5000);
</script>