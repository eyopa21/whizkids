export default defineNuxtRouteMiddleware((to, from) => {

console.log("to", to)

    
   
    const token = useCookie('token')
    const name = useRoute();
    const mainData = useData()
        
  

    if ((to.name === 'auth-login') && token.value) {
        return navigateTo('/');
    }
    if ((to.name === 'index' || to.name === 'main'  ) && !token.value) {

        return navigateTo("/auth/login");
    }
    if (from.name === 'auth-verify' && !is_verified) {
        return navigateTo("/auth/verify");
    }

});