<script setup lang="ts">
const { productType, getProductByType, type } = useProduct()


</script>

<template>
    <LayoutSection :class="'pb-6'">
        <TyphographySectionTitle :title="'👌 Populer sekarang'"
            :sub-title="'Berikut adalah beberapa produk yang kami rekomendasikan untuk kamu.'" />
        <div class="flex gap-2 md:gap-6 flex-wrap pt-6">
            <div v-for="product in productType">
                <button
                @click="() => getProductByType(product.slug)"
                :class="type.current === product.slug && 'bg-primary'"
                    class="text-white text-sm md:text-base hover:scale-105 hover:bg-primary transition rounded-lg font-semibold py-1 px-6 border border-primary">
                    {{ product.name }}
                </button>
            </div>
        </div>
    </LayoutSection>
</template>