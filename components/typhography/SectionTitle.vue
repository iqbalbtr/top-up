<script setup lang="ts">
defineProps<{
    title: string,
    subTitle: string
}>()
</script>

<template>
    <div class="flex flex-col gap-1 md:gap-3">
        <h1 class="font-semibold text-base md:text-2xl">{{ title }}</h1>
        <h4 class="text-xs max-w-60 md:w-full md:text-sm">{{ subTitle }}</h4>
    </div>
</template>