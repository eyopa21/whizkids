<template>
    <div class="relative flex flex-row justify-center">


        <div class="tooltip">
            <ClientOnly>
                <Icon name='charm:power' class="w-6 h-6" />
            </ClientOnly>
            <span class="tooltiptext text-white bg-gray-900 dark:bg-gray-200 dark:text-black">{{ props.label }}</span>
        </div>


    </div>
</template>


<script setup>
const props = defineProps({
    icon: {
        type: String,
        required: false
    },
    label: {
        type: String,
        required: false
    }
})
</script>

<style>
.tooltip {
    position: relative;
    display: inline-block;

}

.tooltiptext {
    visibility: hidden;
    width: 120px;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 50%;
    margin-left: -60px;
}

.tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
}
</style>