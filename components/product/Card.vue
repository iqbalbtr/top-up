<script setup lang="ts">
defineProps<{
    number: number,
    title: string
}>()
</script>

<template>
    <div class="bg-background rounded-md mb-5">
        <div class="flex bg-secondary rounded-t-md">
            <h1 class="text-xl px-4 bg-hoverSecondary rounded-tl-md py-2 font-semibold">{{ number }}</h1>
            <h3 class="py-2 px-4 text-base font-semibold">{{ title }}</h3>
        </div>
        <slot></slot>
    </div>
</template>