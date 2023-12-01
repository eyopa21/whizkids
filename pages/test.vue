<template>
  <div ref="testRef" class="scroll-smooth min-h-screen bg-white dark:bg-gray-900">

    {{ posts }}

    <div v-if="pending">
      pending
    </div>

    {{ pending }}
  </div>
</template>







<script setup>

const layout = useLayout();
const height = ref(50)
const { data: posts, pending } = await useLazyAsyncData(
  'posts',
  () => $fetch('/api/test')
)
/*
const { pending, data } = useAsyncData('/api/test', {
  lazy: true
})
*/
//const { data: datas } = await useAsyncData('/api/test')
//const { data: fetch } = await $fetch('/api/test')


//console.log("usefetch", data.value)


</script>



























