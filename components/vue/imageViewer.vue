

<template>
    <div>

        <div
            class="flex flex-col p-4  max-h-screen max-w-screen fixed z-10 left-0 top-0 w-full h-full overflow-hidden bg-black opacity-90 animate-zoom">
            <div
                class=" fixed top-4 right-8 text-gray-400  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center">

                <button @click="emit('close')" type="button" class=" cursor-pointer">
                    <svg class="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>

            <div class=" h-3/4 p-2 flex justify-center animate-zoom">

                <img v-for="(i, key) in images" :key="key" :class="key == slide ? 'block' : 'hidden'"
                    class="max-h-screen max-w-screen h-full animate-zoom" :src="i" alt="">
            </div>
            <div class=" flex h-1/5 justify-center items-end space-x-2">
                <div v-for="(i, key) in images" :key="i">
                    <img @click="slide = key" :class="key == slide ? 'opacity-[100%]' : 'opacity-[20%]'"
                        class="w-24 h-20 hover:scale-110 duration-100 rounded" :src="i" alt="">
                </div>
            </div>
            <a class="cursor-pointer text-3xl  absolute top-[40%] hover:scale-110 p-8 text-white hover:bg-gradient-to-br from-pink-500 to-violet-500"
                @click="prev()">&#10094;</a>
            <a class="cursor-pointer text-3xl  absolute top-[40%] right-4 hover:scale-110 p-8 text-white hover:bg-gradient-to-br from-pink-500 to-violet-500"
                @click="next()">&#10095;</a>
        </div>

    </div>
</template>
<script setup>
const emit = defineEmits(['close'])
const slide = ref(0);
const test = ref('')
const props = defineProps(['images'])
const next = () => {
    slide.value++;
    if (slide.value > images.value.length - 1) slide.value = 0;
}
const prev = () => {
    slide.value--;
    if (slide.value < 0) slide.value = 3;
}
const images = ref(props.images)
</script>
<style>
.animate-zoom {

    animation-name: zoom;
    animation-duration: .5s
}
</style>