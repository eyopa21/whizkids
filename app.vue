
<template>
  <div class="scroll-smooth min-h-screen bg-white dark:bg-gray-900">

    <NuxtLayout>
      <NuxtLoadingIndicator color="linear-gradient(to right, rgba(255,0,0,0.2), rgba(255,0,0,1))" :height="height" />
      <!-- here -->


      <div v-if="loadin || loading">
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
import query from './queries/users/get-users.gql'
import guest_query from './queries/get-current-guest.gql'
import useLayout from './composables/useLayout';
const { clients, getToken, onLogin, onLogout } = useApollo()
const route = useRoute()

const layout = useLayout();

const queryy = gql`
query getUsers($limit: Int!) {
  users(limit: $limit) {
    id
  }
}`

const { data } = await useAsyncQuery(queryy, { limit: 2 })

if (data.value?.users) {
  // log response
  console.log(data.value.users)
}


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