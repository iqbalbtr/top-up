<script setup lang="ts">
const router = useRouter()
const { popular } = useProduct()
const { localizedData, lang: lan } = usePreference()

</script>

<template>
    <LayoutSection>
        <TyphographySectionTitle :title="'⭐ Populer Sekarang'"
            :sub-title="'Berikut adalah beberapa produk yang kami rekomendasikan untuk kamu.'" />
        <div class="grid grid-cols-2 md:grid-cols-3 w-full gap-3 py-6">
            <HomeCardProduct  v-for="product in popular" :product="product"  />
        </div>
    </LayoutSection>
</template>