<script setup lang="ts">
import type { ProductType } from '~/types/product.type';

defineProps<{
    product: ProductType
}>()

</script>

<template>
    <NuxtLink :to="'/product/' + product.slug" class="md:h-80 sm:h-64 h-52 relative group w-full">
        <div
            class="absolute flex top-0 left-0 outline outline-offset-4 outline-primary opacity-0 group-hover:scale-105 group-hover:opacity-100 rounded-md right-0 bottom-0 transition duration-300">
        </div>
        <div
            class="w-full h-full relative rounded-md overflow-hidden hover:scale-105 transition-all duration-200 ease-in-out">
            <img class="h-full bg-slate-700 w-full transition rounded-md object-cover" :src="'/images/' + product.icon"
                :alt="`${product.slug}.png`" loading="lazy" decoding="async">
            <div
                class="absolute bg-gradient-to-t transition group-hover:from-slate-900 flex items-end top-0 left-0  bottom-0 right-0 p-2 md:p-5">
                <div class="translate-y-[150%] transition duration-300 ease-in-out group-hover:translate-y-0">
                    <h4 class="font-semibold text-sm md:text-lg line-clamp-2">{{ product.name }}</h4>
                    <h6 class="text-xs md:text-base">{{ product.publisher }}</h6>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>