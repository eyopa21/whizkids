<template>
    <div>
        <label :for="props.id" class="flex relative items-center cursor-pointer">
            <input type="checkbox" :id="props.id" class="sr-only" @change="value = !value; emit('toggle', value)"
                :checked="value">
            <span class="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full border-2 border-gray-200 toggle-bg"></span>
        </label>

    </div>
</template>

<script setup>
const props = defineProps({
    id: {
        type: String,
        required: true
    },
    toggleData: {
        type: Boolean,
        required: true
    }
})

const value = ref(props.toggleData)

const emit = defineEmits(['toggle'])

const test = computed(() => {

    return props.toggleData

})
</script>