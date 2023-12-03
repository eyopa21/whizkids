export default defineNuxtRouteMiddleware((to, from) => {

console.log("to", to)

    
   
    const token = useCookie('token')
   
        
  

    if ((to.name === 'auth-login' || to.name==='auth-admin-login') && token.value) {
        return navigateTo('/');
    }
    if ((to.name === 'index' || to.name === 'main'  ) && !token.value) {

        return navigateTo("/auth/login");
    }
    
});