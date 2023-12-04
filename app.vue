
<template>
  <div class="scroll-smooth min-h-screen bg-white dark:bg-gray-900">

    <NuxtLayout>
      <NuxtLoadingIndicator color="linear-gradient(to right, rgba(255,0,0,0.2), rgba(255,0,0,1))" :height="height" />
      <!-- here -->


      <div v-if="loading || adminLoading">
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
const ROLE = useCookie('ROLE')
nuxtApp.provide('reFetch', () => {
  console.log("refteching")
  if (ROLE.value === 'admin') {
    adminRefetch()
  } if (ROLE.value === 'employee') {
    refetch()
  }
  layout.value.showDeleteAlert = false
  layout.value.showEmployeeModal = false

})

const { load: adminLoad, result: adminResult, loading: adminLoading, refetch: adminRefetch } = useLazyQuery(admin_query)
const { load, result, loading, refetch } = useLazyQuery(current_employee_query, { id: uid.value ? uid.value : null }, { fetchPolicy: 'no-cache' })
setTimeout(async () => {
  if (ROLE.value === 'employee') {
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
      layout.value.showAlert = { error: true, message: error }
    }
  }
  else if (ROLE.value === 'admin') {
    console.log("mainfetch")
    try {
      await adminLoad();
      console.log("res", adminResult.value)
      if (adminResult.value) {

        mainData.value.employees = computed(() => {
          return adminResult.value.users;
        })
        mainData.value.attendances = computed(() => {
          return adminResult.value.attendance;
        })
      }
      else {
        layout.value.showAlert = { error: true, message: 'Cannot fetch, Please check your connection and try again' }
      }
    } catch (error) {
      console.log("eroror", error)
      layout.value.showAlert = { error: true, message: error }
    }

  }
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