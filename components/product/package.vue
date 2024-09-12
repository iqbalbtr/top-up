<script setup lang="ts">
import type { ProductPackageType } from '~/types/product.type';
import type { SelectedType } from '~/pages/product/[productId].vue';

defineProps<{
    package: ProductPackageType,
    handleSelect: (type: string, data: ProductPackageType) => void,
    selected: SelectedType
}>()

</script>

<template>
    <button @click="handleSelect('product', package)"
        class="md:p-4 p-3 items-center relative active:bg-hoverSecondary duration-150 group w-full overflow-hidden rounded-md flex justify-between hover:scale-95 transition ease-in-out 
                                before:content-[''] before:absolute before:w-6 before:h-full before:-translate-x-12 hover:before:translate-x-[1100%] before:bg-primary/70 before:top-0 before:transition before:duration-500 before:skew-x-12"
        :class="selected.product?.code == package.code ? 'outline outline-offset-2 outline-accent bg-accent/10' : 'bg-secondary'">
        <div class="flex flex-col gap-2">
            <h3 class="text-sm md:text-base text-left line-clamp-1">{{ package.name }}</h3>
            <h6 class="text-xs md:text-sm text-left">Rp. {{ package.price }}</h6>
        </div>
        <img v-if="package.icon" :src="'/images/icon/' + package.icon" class="md:w-8 w-6 object-contain aspect-square" alt="diamond.jpeg"
            loading="lazy" decoding="async">
    </button>
</template>