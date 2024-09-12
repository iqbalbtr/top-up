<script setup lang="ts">
import type { ProductType } from '~/stores/product';

const { type } = useProduct()
const lists = reactive([]) as ProductType[];
const pageCount = computed(() => Math.ceil(type.list.length / 12));
const page = ref(1);

function loadMore() {
    if (page.value < pageCount.value) {
        const skip = page.value * 12
        const next = type.list.slice(skip, skip + 12)
        lists.push(...next)
        page.value++
    }
}

watchEffect(() => {
    lists.length = 0;
    lists.push(...type.list.slice(0, 12))
    page.value = 1
})

</script>

<template>
    <LayoutSection>
        <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full gap-3 md:gap-6 py-6">
            <HomeCardProductSecond  v-for="product in lists" :product="product" />
        </div>
        <div class="w-full flex justify-center">
            <button v-if="page < pageCount"
                class="text-white self-center active:scale-95 font-semibold bg-primary text-sm md:text-base py-2 px-6 rounded-md mt-5"
                @click="loadMore">Load more</button>
        </div>
    </LayoutSection>
</template>