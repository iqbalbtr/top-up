<script setup lang="ts">
import type { SelectedType } from '~/pages/product/[productId].vue';
import type { PaymentGroup, PaymentType } from '~/types/tripay.type';

const {
    selected,
    amount,
    list
} = defineProps<{
    selected: SelectedType,
    list: PaymentGroup,
    amount: number,
    handleSelect: (type: string, data: PaymentType) => void; 
}>()

const isActive = ref(false);
const price = computed(() => selected.product?.price)

</script>

<template>
    <div class=" bg-primary rounded-md">
        <button @click="isActive = !isActive"
            class="font-semibold w-full text-left pb-3 bg-secondary p-4 rounded-t-md">{{ list.name }}</button>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 transition-all ease-in-out duration-700 overflow-hidden animate-accordion-down"
            v-if="isActive">
            <button v-for="(paket, index) in list.data" @click="handleSelect('payment', paket)" :key="index"
            :class="paket.code === selected.payment?.code ? 'outline outline-offset-2 outline-accent bg-accent/10' : 'bg-inputBg'"
                class="p-4 w-full active:bg-hoverSecondary transition ease-in-out hover:outline outline-offset-2 duration-150 hover:outline-hoverBg hover:scale-95  rounded-md flex flex-col justify-between">
                <NuxtImg :src="paket.icon_url" class="w-14 object-contain aspect-square" alt="wallet.jpg" loading="eager"/>
                <h6 class="text-sm pt-2">
                    Rp.
                    <span v-if="price">{{ amount * price     + paket.total_fee.flat }}</span>
                    <span v-else>0</span>
                </h6>
                <div class="flex flex-col border-t mt-1 w-full pt-2">
                    <p class="text-xs text-left pt-2">Proses cepat</p>
                </div>
            </button>
        </div>
        <div v-show="!isActive"
            class="px-8 overflow-hidden transition-all ease-in-out duration-700 animate-accordion-up  py-2 w-full justify-end flex gap-3">
            <NuxtImg v-for="paket in list.data" :src="paket.icon_url" class="h-4 shadow drop-shadow-lg" />
        </div>
    </div>
</template>
