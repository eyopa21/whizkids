
<template>
  <div class="scroll-smooth min-h-screen bg-white dark:bg-gray-900">

    <NuxtLayout>
      <NuxtLoadingIndicator color="linear-gradient(to right, rgba(255,0,0,0.2), rgba(255,0,0,1))" :height="height" />
      <!-- here -->


      <div v-if="loading">
        <VueMainLoading />
      </div>
      <NuxtPage v-else />

    </NuxtLayout>

    <transition enter-from-class="translate-x-[20px] opacity-0" leave-to-class="translate-x-[20px] opacity-0"
      enter-active-class="transition-all duration-[0.3s] ease-out" leave-active-class="transition-all duration-[0.8s]">
      <VueToast v-if="layout.showAlert.message !== ''" />
    </transition>

  </div>
</template>




<script setup>
import admin_query from './queries/admin/get-admin-data.gql'
import current_employee_query from './queries/employee/get-current-employee.gql'
import useLayout from './composables/useLayout';
const { clients, getToken, onLogin, onLogout } = useApollo()
const route = useRoute()
const router = useRouter();
const nuxtApp = useNuxtApp();
const layout = useLayout();
const mainData = useData();
const height = 10;
const uid = useCookie('uid');
const token = useCookie('token');
nuxtApp.provide('reFetch', () => {
  console.log("refteching")
  refetch()
  layout.value.showDeleteAlert = false
  layout.value.showEmployeeModal = false

})

//const { data } = await useAsyncQuery(employee_query)
const { load, result, loading, refetch } = useLazyQuery(current_employee_query, { id: uid.value ? uid.value : null })
setTimeout(async () => {
  try {
    await load();
    console.log("res", result.value)
    if (result.value) {
      mainData.value.user = computed(() => {
        return result.value.users_by_pk;
      })
    }
    else {
      layout.value.showAlert = { error: true, message: 'Cannot fetch, Please check your connection and try again' }
    }
  } catch (error) {
    console.log("eroror", error)
  }



  getToken().then(async (res) => {
    console.log(res)
    token.value = res;
    if (res) {
      const claims = await JSON.parse(atob(res.split(".")[1]));
      uid.value = claims.user_id ? claims.user_id : claims.uid;
      const { data, error } = await useLazyAsyncQuery(admin_query)
      if (error.value) {
        console.log(error.value)
        layout.value.showAlert = { error: true, message: error }
      } else {
        console.log(data.value)

        mainData.value.employees = computed(() => {
          return result.value.employees;
        })
        mainData.value.attendances = computed(() => {
          return result.value.attendances;
        })
      }
    } else {
      console.log("no token")
      onLogout()
      token.value = null
      uid.value = null
      router.push('/auth/login')
    }


  }).catch(err => {
    console.log("auth err", err)
    onLogout()
    token.value = null
    uid.value = null

    router.push('/auth/login')

  })
}, 0)



</script>
















<style>
/* Page transition */
.slide-fade-enter-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

/* Add Animation */
.animate-top {

  animation-name: animatetop;
  animation-duration: 1s
}


@keyframes zoom {
  from {
    transform: scale(0)
  }

  to {
    transform: scale(1)
  }
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0
  }

  to {
    top: 0;
    opacity: 1
  }
}

@keyframes animate-fadeIn {
  from {
    opacity: 0
  }

  to {
    opacity: 1
  }
}
</style>