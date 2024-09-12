<script setup lang="ts">
import type { TransactionPayment } from '~/types/transaction.type';

const isView = ref(false);

defineProps<{
    data: TransactionPayment
}>()

</script>

<template>
    <div class="py-8 flex flex-col gap-2">
        <button class="p-2 flex justify-between bg-slate-700 rounded-md text-left" @click=" isView = !isView">
            <span>Rincian Pembayaran</span>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="transition" id="angle-down" :class="isView ? 'rotate-[180deg]' : 'rotate-0'" width="25">
                <path fill="#6563FF"
                    d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z">
                </path>
            </svg>
        </button>

        <div v-if="isView" class="p-3 bg-slate-700 rounded-md flex justify-between w-full animate-accordion-down">
            <div>
                <p>Harga</p>
                <p>Jumlah</p>
                <p>Subtotal</p>
                <p>Biaya</p>
            </div>
            <div class="text-right">
                <p>Rp. {{ data.order_items[0].price }}</p>
                <p>{{ data.order_items[0].quantity }}</p>
                <p>Rp. {{ data.order_items[0].sub_total }}</p>
                <p>Rp. {{ data.amount }}</p>
            </div>
        </div>
    </div>
</template>