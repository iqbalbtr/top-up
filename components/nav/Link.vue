<script setup lang="ts">

defineProps({
    href: String,
    title: String
})

const path = useRoute()


</script>

<template>
    <NuxtLink class="text-base relative"
        :to="href">
        {{ title }}
        <div v-if="path.path === href " class="absolute hidden md:flex -bottom-[90%] w-full h-[2px] rounded-full bg-accent"></div>
    </NuxtLink>
</template>