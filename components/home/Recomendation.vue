<script setup lang="ts">
const { recomen } = useProduct()
const router = useRouter()

</script>

<template>
    <LayoutSection>
        <TyphographySectionTitle :title="'⭐Rekomendasi'"
            :sub-title="'Berikut adalah beberapa produk yang kami rekomendasikan untuk kamu.'" />
        <div class="grid grid-cols-2 md:grid-cols-3 w-full gap-3 py-6">
            <HomeCardProduct  v-for="product in recomen" :product="product"  />
        </div>
    </LayoutSection>
</template>