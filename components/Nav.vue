<template>
  <div>

    <nav class="fixed z-30 w-full  dark:bg-gray-900 bg-gray-50">
      <div class="py-3 px-3 lg:px-5 lg:pl-3">
        <div class="flex justify-between items-center">
          <div class="flex justify-start items-center">
            <button @click="layout.showSideBar = !layout.showSideBar" id="toggleSidebar"
              class="hidden p-2 mr-4 text-gray-600 dark:text-gray-100 rounded cursor-pointer lg:inline hover:text-gray-900 dark:hover:text-gray-300">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
            <button @click="layout.showSideBar = !layout.showSideBar" id="toggleSidebarMobile"
              class="p-2 mr-2 text-gray-600 dark:text-gray-100 rounded cursor-pointer lg:hidden hover:text-gray-900 dark:hover:text-gray-300 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100">
              <svg v-if="layout.showSideBar == false" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"></path>
              </svg>
              <svg v-else class=" w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
            <div class="text-md font-semibold flex items-center lg:mr-1.5">

              <div class="ml-3 relative  block">
                <div>
                  <button @click="navButtons.showSettings = !navButtons.showSettings; navButtons.showNotification = false"
                    type="button" class=" flex text-sm  rounded-full focus:ring-4 focus:ring-gray-300">


                    <NuxtImg quality="100" loading="lazy" provider="cloudinary"
                      :src="mainData.user?.logo?.split('upload')[1] ? mainData.user?.logo?.split('upload')[1] : '/'"
                      placeholder class="mr-2 h-8 w-12 rounded-full ring-gray-300" alt="logo" />
                  </button>
                </div>
                <div v-if="mainData.currentGuest" :class="navButtons.showSettings ? 'visible h-56' : 'invisible h-0'"
                  class="transition-all duration-300 absolute z-50 my-4 text-base list-none bg-white dark:bg-gray-900 rounded divide-y divide-gray-100 shadow-lg dark:shadow-md shadow-gray-300 dark:shadow-gray-600">
                  <div class="py-3 px-4" role="none">
                    <p class="text-sm dark:text-gray-200 font-thin" role="none">
                      Loggedin as:
                    </p>
                    <p class="text-sm font-medium text-gray-900 dark:text-white truncate" role="none">
                      {{ mainData.currentGuest.email }} (Guest)
                    </p>
                  </div>
                  <ul class="py-1" role="none">
                    <li>
                      <NuxtLink to="/"
                        class="block py-2 px-4 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        role="menuitem">Dashboard</NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/settings"
                        class="block py-2 px-4 text-sm text-gray-700  dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        role="menuitem">Settings</NuxtLink>
                    </li>

                    <li>
                      <NuxtLink @click="logout()"
                        class="block py-2 px-4 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        role="menuitem">Sign
                        out</NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
              <span class="hidden ml-4 md:inline-block self-center text-xl font-bold whitespace-nowrap dark:text-white">{{
                title
              }}
                <span class="animate-pulse duration-1000 delay-1000 uppercase text-green-700">

                  <span v-if="mainData.currentGuest">(Guest)</span>
                  <span v-else>(user)</span>
                </span>
              </span>


            </div>
            <div class="hidden lg:block lg:pl-8">

            </div>
          </div>
          <div class="flex items-center">




            <VueLanguage class="mr-2" />
            <ClientOnly class="hidden lg:block" fallbackTag="span">
              <!-- this component will only be rendered on client side -->
              <VueButton class="hidden lg:block" className="relative" :name="time" type="button" variation="normal" />
              <template #fallback>
                <!-- this will be rendered on server side -->
                <VueButton class="hidden lg:block" className="relative" name="Loading the time" type="button"
                  variation="normal" />
              </template>
            </ClientOnly>

            <VueDarkMode />

          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
const {
  locale,
  availableLocales,
  t
} = useI18n()
const mainData = useData()
const layout = useLayout();
const auth = useAuth()
const router = useRouter();
const token = useCookie('token')
const uid = useCookie('uid')
const navButtons = ref({
  showNotification: true,
  showSettings: false
})
const time = ref(new Date().toLocaleTimeString())
setInterval(myTimer, 1000);

function myTimer() {
  time.value = new Date().toLocaleTimeString();
}
let i = 0;
const title = ref('')
let txt = t('welcome');
let speed = 50;

function typeWriter() {
  if (i < txt.length) {
    title.value += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
onMounted(() => {
  typeWriter()
})



const { onLogout } = useApollo()
const logout = () => {
  onLogout();
  // router.push('/auth/login')
  token.value = null
  uid.value = null
  reloadNuxtApp({
    path: "/auth/login",
    ttl: 1000, // default 10000
  });

}
</script>