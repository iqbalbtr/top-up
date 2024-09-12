<script setup lang="ts">
import type { ApiResponse } from '~/types/type';
import type { TransactionPayment } from '~/types/transaction.type';

const route = useRoute()
const expired = ref(0);
const { setNotif } = useNotification()

let intervalCountDown: NodeJS.Timeout;
let intervalStatusPayment: NodeJS.Timeout;

const { data } = await useFetch<ApiResponse<TransactionPayment>>(`/api/transactions/${route.params.transactionId}`);

const times = computed(() => {
    if (expired.value) {

        return {
            hours: Math.floor(expired.value / 3600),
            minutes: Math.floor((expired.value / 60) % 60),
            seconds: Math.floor((expired.value) % 60),
        }
    }
})

const getPaymentStatus = async () => {
    try {
        if (data.value?.result.status_payment !== "UNPAID")
            return
        const get = await $fetch<ApiResponse<string>>(`/api/transactions/status?invoice=${data.value.result.ref_code}`)
        if (get.result) {
            data.value.result.status_payment = get.result as any
        }
    } catch (error) {

    }
}

const countdown = () => {
    intervalCountDown = setInterval(() => {
        if (expired.value && expired.value >= 1000) {
            expired.value = --expired.value
        }
    }, 1000);
};

onMounted(() => {
    if (!data.value)
        return
    if (data.value?.result.expired > Math.floor(Date.now() / 1000) && data.value.result.status_payment === "UNPAID") {
        expired.value = data.value?.result.expired - Math.floor(Date.now() / 1000)
        countdown();
        getPaymentStatus()
    }
})

onUnmounted(() => {
    if (intervalCountDown || intervalStatusPayment) {
        clearInterval(intervalCountDown);
        clearInterval(intervalStatusPayment);
    }
});

</script>

<template>
    <section class="md:px-24 px-3 min-h-screen pb-32" v-if="data">
        <div class="flex flex-col gap-2 py-8">
            <h6 class="font-bold text-accent text-xl pb-2">Terima kasih</h6>
            <h1 v-if="data.result.status_payment === 'UNPAID'"
                class="text-2xl md:text-4xl text-textSecondary font-semibold">
                Harap lengkapi pembayaran</h1>
            <h1 v-else class="text-2xl md:text-4xl text-textSecondary font-semibold">Pembayaran telah selesai</h1>
            <p class="text-sm md:text-base">Pesanan kamu <span class="font-semibold text-accent"
                    v-text="route.params.transactionId + ' '"></span>
                <span v-if="data.result.status_payment === 'UNPAID'">menunggu
                    pembayaran sebelum dikirim</span>
                <span v-else>Sudah selesai</span>
            </p>
        </div>

        <div class="py-6 w-full flex flex-col items-start md:flex-row justify-between gap-4 md:gap-9 md:items-center">
            <div>
                <p class="pb-2" v-if="data.result.status_payment === 'UNPAID'">Pesanan ini akan kedaluwarsa pada</p>
                <p class="pb-2" v-else>Pesanan ini telah kedaluwarsa</p>
                <p v-if="expired && data.result.status_payment === 'UNPAID' && data.result.status_transaction === 'PENDING'"
                    class="py-2 px-6 text-white font-semibold bg-red-700 rounded-md">{{ times?.hours }}
                    hours, {{
                        times?.minutes }} minutes, {{ times?.seconds }} seconds left</p>
            </div>

            <a :href="`/api/transactions/${route.params.transactionId}/invoice`">
                <button @click="() => setNotif('Invoide diunduh')"
                    class="py-2 px-5 bg-accent rounded-md flex items-center gap-3 active:scale-95 transition">
                    <span>Unduh Invoice</span>
                    <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="invoice"
                        width="18">
                        <path fill="#fff"
                            d="M13,16H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM9,10h2a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Zm12,2H18V3a1,1,0,0,0-.5-.87,1,1,0,0,0-1,0l-3,1.72-3-1.72a1,1,0,0,0-1,0l-3,1.72-3-1.72a1,1,0,0,0-1,0A1,1,0,0,0,2,3V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12ZM5,20a1,1,0,0,1-1-1V4.73L6,5.87a1.08,1.08,0,0,0,1,0l3-1.72,3,1.72a1.08,1.08,0,0,0,1,0l2-1.14V19a3,3,0,0,0,.18,1Zm15-1a1,1,0,0,1-2,0V14h2Zm-7-7H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Z">
                        </path>
                    </svg>
                </button>
            </a>
        </div>


        <div class="py-10 grid gap-12 md:grid-cols-2 border-t border-primary">

            <div>
                <div class="flex gap-6">
                    <img class="md:h-56 h-44 w-28 md:w-40 rounded-md bg-slate-500 object-cover" :src="'/images/' + data?.result.product.icon"
                        :alt="'.jpeg'" loading="lazy">
                    <div>
                        <h1 class="font-semibold text-xl">{{ data?.result.product.name }}</h1>
                        <p class="pb-8">{{ data?.result.order_items[0].name }}</p>

                        <table class="text-sm p-1 font-semibold">
                            <tbody>
                                <tr v-if="data?.result.account.username">
                                    <td>Nickname</td>
                                    <td>: {{ data?.result.account.username }}</td>
                                </tr>
                                <tr v-if="data?.result.account.uid">
                                    <td>ID</td>
                                    <td>: {{ data?.result.account.uid }}</td>
                                </tr>
                                <tr v-if="data?.result.account.server">
                                    <td>Server</td>
                                    <td>: {{ data?.result.account.server }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <TransactionDetail :data="data.result" />

                <div class="flex justify-between">
                    <h1 class="text-xl nd:text-2xl font-semibold">Total pembayaran</h1>

                    <span class="py-1 px-4 border border-primary font-semibold text-xl rounded-md">Rp 120000</span>
                </div>

                <TransactionIntruction v-if="data.result.status_payment === 'UNPAID'"
                    v-for="instruction in data?.result.instructions" :intruction="instruction" />

            </div>

            <div>
                <div class="py-2">
                    <h1 class="text-xl md:text-2xl font-semibold">Metode pembayaran</h1>
                    <p>{{ data?.result.method }}</p>
                </div>

                <div class="pt-6" v-if="data?.result.pay_code && data.result.status_payment === 'UNPAID'">
                    <h1 class="text-xl md:text-2xl font-semibold">Kode pembayaran</h1>
                    <p @click="copyToClipboard(data?.result.pay_code, () => setNotif('Berhasil di salin'))"
                        class="py-1 cursor-pointer active:scale-95 transition w-fit text-accent px-4 border border-primary font-semibold text-xl rounded-md my-4">
                        {{ data?.result.pay_code }}</p>
                </div>

                <div class="pt-6" v-if="data?.result.pay_url && data.result.status_payment === 'UNPAID'">
                    <NuxtLink :to="data?.result.pay_url"
                        class="py-2 w-fit text-white px-4 hover:text-accent bg-accent hover:bg-transparent hover:border border-accent hover:scale-105 transition text-xl rounded-md my-4">
                        Lanjutkan Pembayaran</NuxtLink>
                </div>

                <div class="py-16 border-t border-primary mt-10">
                    <table class="w-full">
                        <tbody>
                            <tr>
                                <td>Nomor Invoice</td>
                                <td>: {{ data?.result.ref_code }}</td>
                            </tr>
                            <tr>
                                <td>Status Transaksi</td>
                                <td>: {{ data?.result.status_transaction }}</td>
                            </tr>
                            <tr>
                                <td>Status Pembayaran</td>
                                <td>: {{ data?.result.status_payment }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-if="data?.result.barcode && data.result.status_payment === 'UNPAID'">
                    <NuxtImg :src="data?.result.barcode" alt="qr.jpg"
                        class="w-60 rounded-sm aspect-square object-contain" />
                </div>
            </div>
        </div>

    </section>
    <!-- <Footer /> -->
</template>