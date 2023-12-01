<template>
  <div ref="body" id="body" class=" scroll-smooth">

    <Nav v-if="isLoggedIn" :body="body" />
    <div :class="isLoggedIn ? 'bg-white dark:bg-gray-800 pt-16' : ''" class="flex overflow-hidden">
      <Sidebar v-if="isLoggedIn" :class="layout.showSideBar ? 'block lg:w-64 ' : 'hidden lg:block lg:w-24'" />
      <div class="transition-all duration-[.7s] h-full w-full bg-gray-50 dark:bg-slate-900 relative overflow-y-auto"
        :class="layout.showSideBar ? 'lg:ml-64' : isLoggedIn ? 'lg:ml-24' : ''">

        <slot />
        <div v-if="route.name !== 'messages-message-id'" class="mt-16">

          <Footer v-if="isLoggedIn" />
        </div>

      </div>
    </div>
    <div class="svgMap-tooltip">
      <div class="svgMap-tooltip-content-wrapper"></div>
      <div class="svgMap-tooltip-pointer"></div>
    </div>

    <svg id="SvgjsSvg1089" width="2" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev"
      style="overflow: hidden; top: -100%; left: -100%; position: absolute; opacity: 0;">
      <defs id="SvgjsDefs1090"></defs>
      <polyline id="SvgjsPolyline1091" points="0,0"></polyline>
      <path id="SvgjsPath1092" d="M0 0 "></path>
    </svg>
  </div>
</template>

<script setup>
const layout = useLayout();
const route = useRoute();

const body = ref('')



const isLoggedIn = computed(() => {
  if (route.name.includes('auth')) return false
  else return true
})
</script>