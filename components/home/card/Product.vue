<script setup lang="ts">
import type { ProductType } from '~/types/product.type';

defineProps<{
    product: ProductType
}>()

</script>

<template>
    <NuxtLink :to="'/product/' + product.slug"
        class="w-full h-20 md:h-24 px-2 items-start relative group bg-slate-800 flex gap-2 md:gap-5 p-2 rounded-md ease-in-out transition duration-200 hover:scale-95 z-10">
        <img class="h-full aspect-square bg-slate-700 object-cover rounded-md z-20" :src="'/images/'+ product.icon"
            :alt="product.icon" loading="lazy" decoding="async">
        <div class="z-20 pt-3">
            <h3 class="text-xs line-clamp-1 md:text-lg font-semibold">{{ product.name }}</h3>
            <h6 class="text-xs md:text-sm">{{ product.publisher }}</h6>
        </div>
        <div
            class="absolute flex top-0 left-0 outline-primary opacity-0 right-0 bottom-0 outline outline-2 group-hover:outline-offset-4 rounded-md ease-in-out scale-95 group-hover:opacity-100 z-0 group-hover:scale-100 transition duration-300">
        </div>
    </NuxtLink>
</template>