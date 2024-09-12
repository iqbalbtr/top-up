<script setup lang="ts">
import type { ProductType } from '~/types/product.type';

defineProps<{
    isSearch: boolean
}>()
defineEmits<{
    (e: 'handleSearch', value: boolean): void
}>()

const { popular, products } = useProduct()

const search = ref();
const searchList = reactive([]) as ProductType[]

watch(search, (val) => {
    searchList.splice(0, searchList.length) as any;   

    if (!val) {
        searchList.push(...popular);
        return;
    }
    const result = products.filter(
        fo => fo.name.toLowerCase().includes(val.toLowerCase())
    );
    searchList.length = 0
    searchList.push(...result);
})

watchEffect(() => {
    if(searchList.length == 0){
        searchList.push(...popular);
    }
})



</script>

<template>
    <div @click="$emit('handleSearch', false)" class="fixed w-full top-0 h-full bg-black/50 z-[9999]">
        <div @click.stop
            class="fixed top-24 w-[80%] left-1/2 -translate-x-1/2 md:w-[550px] text-center z-50 bg-secondary rounded-md">
            <div class="w-full">
                <div class="w-full flex gap-5 items-center py-3 px-4">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="search-alt"
                            width="20">
                            <path fill="#fff"
                                d="M21.07,16.83,19,14.71a3.08,3.08,0,0,0-3.4-.57l-.9-.9a7,7,0,1,0-1.41,1.41l.89.89A3,3,0,0,0,14.71,19l2.12,2.12a3,3,0,0,0,4.24,0A3,3,0,0,0,21.07,16.83Zm-8.48-4.24a5,5,0,1,1,0-7.08A5,5,0,0,1,12.59,12.59Zm7.07,7.07a1,1,0,0,1-1.42,0l-2.12-2.12a1,1,0,0,1,0-1.42,1,1,0,0,1,1.42,0l2.12,2.12A1,1,0,0,1,19.66,19.66Z">
                            </path>
                        </svg>
                    </button>
                    <input v-model="search" type="text" class="bg-transparent rounded-md w-full">
                </div>
                <div class="max-h-[60vh] overflow-y-scroll">
                    <NuxtLink @click="$emit('handleSearch', false)" :to="'/product/'+game.slug" v-for="game in searchList" class="flex px-3 group gap-2 hover:bg-hoverSecondary/20 p-2">
                        <NuxtImg class="md:h-24 h-20 group-hover:scale-95 group-hover:outline outline-primary outline-offset-4 transition ease-in-out aspect-square bg-slate-600 rounded-md" :src="'/images/'+game.icon" :alt="game.slug"
                            loading="lazy" decoding="async" />
                        <div class="text-left py-1 group-hover:translate-x-2 transition px-3">
                            <h1 class="md:text-xl text-sm line-clamp-2 font-semibold">{{ game.name }}</h1>
                            <h4 class="text-sm">{{ game.publisher }}</h4>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>