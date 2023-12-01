export default defineNuxtRouteMiddleware((to, from) => {



    
    //console.log("guard", from);
    const token = useCookie('token')
    const name = ref(to.name.slice(0, -5))
    const mainData = useData()
        //console.log("data", mainData.value.user.is_verified)
    const is_verified = ref(mainData.value.user.is_verified)

    if ((name.value === 'auth-login' || name.value === 'auth-forgot' || name.value === 'auth-guest-login') && token.value) {
        return navigateTo('/');
    }
    if ((name.value === 'index' || name.value === 'behaviors' || name.value === 'blogs' || name.value === 'projects' || name.value === 'settings' || name.value === 'services' || name.value === 'skills' || name.value === 'timelines' || name.value === 'messages' || name.value === 'messages-id' || name.value === 'messages-reply-id' || name.value === 'auth-verify') && !token.value) {

        return navigateTo("/auth/login");
    }
    if (from.name === 'auth-verify' && !is_verified) {
        return navigateTo("/auth/verify");
    }

});