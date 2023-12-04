export default defineNuxtRouteMiddleware((to, from) => {

console.log("to", to)

    
   
    const token = useCookie('token')
   const ROLE = useCookie('ROLE')
        
  

    if ((to.name === 'auth-login' || to.name==='auth-admin-login') && token.value) {
        return navigateTo('/');
    }
    if ((to.name === 'index' || to.name === 'main' ||to.name === 'employees' || to.name === 'attendances'  ) && !token.value) {

        return navigateTo("/auth/login");
    }
    if ((to.name === 'employees' || to.name === 'attendances' || to.name === 'index'  ) && ROLE.value!=='admin') {

        return navigateTo("/main");
    }
     if ((to.name === 'main' ) && ROLE.value==='admin') {

        return navigateTo("/");
    }
    
});