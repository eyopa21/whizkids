


<template>
    <div class="relative group"><a
            class=" flex  cursor-pointer text-[16px] font-semibold group-hover:text-primary  text-heading-light">

            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z">
                </path>
            </svg>
        </a>
        <ul
            class="top-full right-0 flex flex-col items-end absolute w-[200px]  pl-12 bg-gray-50  border-b-[3px] border-primary py-4 shadow-md shadow-gray-400 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-[20px] group-hover:translate-y-0 z-30">
            <li v-for="i in 3" :key="i" class="hover:bg-gray-200 ">
                <a @click="sort()" class="block text-heading-light font-semibold py-1 px-4 hover:text-primary">Sort by
                    name</a>
            </li>

        </ul>
    </div>
</template>

<script setup>


const sort = () => {
    console.log("sort")
}
</script>