<template>
  <main>

    <div class="px-4 pt-6">
      <div class="grid grid-cols-1 gap-6 mb-6 w-full xl:grid-cols-2 2xl:grid-cols-4">
        <DashboardAnalysis v-for="i in 4" :key="i" />
      </div>
      <div v-if="ROLE === 'admin'" class="grid grid-cols-0 gap-6 mb-6 w-full xl:grid-cols-1 2xl:grid-cols-3">

        <!--DashboardMessages /-->
        <DashboardLogs />
      </div>
      <!--div class="grid grid-cols-1 gap-6 mb-6 w-full xl:grid-cols-2">
        <DashboardMap />
      </div>
      <div class="grid grid-cols-1 my-4 xl:grid-cols-2 2xl:grid-cols-3 xl:gap-6">

        <DashboardLatestCustomers />
        <DashboardChart />

      </div-->
    </div>


  </main>
</template>

<script setup>
const ROLE = useCookie('ROLE')




</script>