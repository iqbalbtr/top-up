<script setup lang="ts">
import type { ApiResponse } from '~/types/type';
import type { AccountInfo, TransactionRequest } from '~/types/transaction.type';
import type { PaymentType } from '~/types/tripay.type';

export type SelectedType = {
    payment?: PaymentType,
    product?: {
        name: string,
        price: number,
        code: string;
        icon: string
    }
}

const router = useRouter()
const route = useRoute()
const { setNotif } = useNotification()
const isLoading = ref(false)

const selected = reactive<SelectedType>({})

const amount = ref(1)
const phone = ref()

const uid = ref();
const server = ref();

const isPayment = ref(false);

const paymentRequest = reactive({}) as AccountInfo
const { data: product } = await useFetch(`/api/products/${route.params.productId}`)

watchEffect(() => {
    if (selected.product && selected.payment) {
        const total = amount.value * selected.product.price
        if (total > selected.payment.maximum_amount) {
            handleSelect("payment", null)
        }
    }
})

watch(amount, (val, old) => {
    if (val < 0 || !old) {
        amount.value = 1
    }
})

function handleSelect(type: string, data: any) {
    Object.assign(selected, {
        ...selected,
        [type]: data
    })
}


async function buyProduct() {
    if (
        !uid.value && product.value?.result.uid.id ||
        !server.value && product.value?.result.uid.server ||
        !selected.payment ||
        !selected.product
    ) return setNotif('Please fill all field');


    try {
        isLoading.value = true
        const req = await $fetch("/api/chek-uid", {
            method: "POST",
            body: {
                uid: uid.value,
                server: server.value
            }
        })

        if (req.result) {
            Object.assign(paymentRequest, req.result)
            isPayment.value = true
        }
    } catch (error: any) {
        setNotif(error.response._data.message)
    } finally {
        isLoading.value = false
    }
}

async function createTransaction() {
    try {
        const payload: TransactionRequest = {
            phone: phone.value,
            method: selected.payment?.code!,
            product_code: selected.product?.code!,
            quantity: amount.value,
            account: paymentRequest as AccountInfo,
        }
        isLoading.value = true

        const req = await $fetch<ApiResponse<{ ref_code: string }>>(`/api/transactions`, {
            method: "post",
            body: payload
        })

        if (req.result) {
            router.push(`/transaction/${req.result.ref_code}`)
        }
    } catch (error: any) {
        setNotif(error.response._data.message)
    } finally {
        isLoading.value = false
    }
}
const { group: payment } = usePayment()

</script>

<template>
    <section class="min-h-screen w-full ">
        <div v-if="isPayment" class="fixed w-full top-0 h-full bg-black/50 z-[9999]">
            <div
                class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-[80%] md:w-[550px] text-center z-50 bg-primary rounded-md">
                <div class="w-full">
                    <h1 class="text-xl font-semibold text-white pb-3">Buat pesanan</h1>
                    <p class="text-sm">Pastikan data akun Anda dan produk yang Anda pilih valid dan sesuai.</p>
                    <div class="p-6 rounded-md bg-hoverBg mt-6">
                        <table class="w-full text-left">
                            <tbody>
                                <tr>
                                    <td>Username</td>
                                    <td>{{ paymentRequest.username }}</td>
                                </tr>
                                <tr>
                                    <td>ID</td>
                                    <td>{{ uid }}</td>
                                </tr>
                                <tr v-if="server">
                                    <td>Server</td>
                                    <td>{{ server }}</td>
                                </tr>
                                <tr>
                                    <td>Item</td>
                                    <td>{{ selected.product?.name }}</td>
                                </tr>
                                <tr>
                                    <td>Product</td>
                                    <td>{{ product?.result?.name }}</td>
                                </tr>
                                <tr>
                                    <td>Jumlah</td>
                                    <td>{{ amount }}</td>
                                </tr>
                                <tr v-if="selected.payment && selected.product">
                                    <td>Total</td>
                                    <td> Rp. {{ selected.product.price * amount + selected.payment?.total_fee.flat }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="grid grid-cols-2 gap-2 mt-4">
                        <button :disabled="isLoading" @click="createTransaction"
                            class="p-1 text-sm md:text-base active:scale-95 bg-hoverSecondary rounded-md">Pesan
                            Sekarng!</button>
                        <button @click="isPayment = !isPayment"
                            class="p-1 active:scale-95 text-sm md:text-base bg-hoverBg rounded-md">Batalkan</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full h-[35vh]">
            <NuxtImg class="object-cover w-full h-full" src="/images/banner-1.webp" alt="" />
        </div>

        <div class="md:px-24 px-3 relative flex py-5 gap-12 bg-secondary">
            <NuxtImg :src="'/images/' + product?.result.icon"
                class="md:w-44 w-24 absolute -translate-y-1/3 aspect-square bg-slate-500 rounded-md" alt="" />
            <div class="translate-x-28 md:translate-x-56">
                <h1 class="font-semibold text-xl md:text-3xl line-clamp-2">{{ product?.result.name }}</h1>
                <h4 class="md:py-1">{{ product?.result.publisher }}</h4>

                <div class="flex gap-2 md:gap-6 text-xs pt-3 md:pt-4">
                    <span>Proses cepat</span>
                    <span>Proses cepat</span>
                    <span>Proses cepat</span>
                </div>
            </div>
        </div>

        <div class="md:px-24 px-3 py-12 md:flex justify-between w-full">
            <ProductTutorial />

            <div class="md:w-[65%] mt-8 md:mt-0">
                <ProductCard v-if="product?.result.uid.id" :number="1" :title="'Masukan Data akun'">

                    <div class="p-4">
                        <div class="grid grid-cols-2 gap-3">
                            <div v-if="product?.result.uid.id" class="flex flex-col gap-2">
                                <label for="">ID</label>
                                <input v-model="uid" type="text" class="bg-inputBg w-full py-1 px-3 rounded-md">
                            </div>
                            <div class="flex flex-col gap-2" v-if="product?.result.uid.server">
                                <label for="">Server</label>
                                <input v-model="server" type="text" class="bg-inputBg w-full py-1 px-3 rounded-md">
                            </div>
                        </div>
                        <p class="py-2 text-xs">Untuk menemukan ID & Server akun Anda, klik avatar Anda di pojok kiri
                            atas layar dan buka tab
                            Info Umum. Contoh: 12345678 (9864), maka ID adalah 12345678 dan Server adalah 9864</p>
                    </div>
                </ProductCard>

                <ProductCard :number="product?.result.uid.id ? 2 : 1" :title="'Pilih nominal'">
                    <div v-for="list in product?.result.package_group" class="p-4">
                        <h3 class="font-semibold py-3">{{ list.name }}</h3>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                            <ProductPackage v-for="paket in list.list" :handleSelect="handleSelect" :package="paket"
                                :selected="selected" />
                        </div>
                    </div>
                </ProductCard>

                <ProductCard :number="product?.result.uid.id ? 3 : 2" :title="'Jumlah Pembelian'">
                    <div class="p-4">
                        <div class="flex flex-col gap-2">
                            <label for="">Jumlah</label>
                            <div class="flex gap-3">
                                <input v-model="amount" type="number" min="1"
                                    class="w-full bg-inputBg py-1 px-3 rounded-md ">
                                <button @click="amount++"
                                    class="px-4 py-2 bg-primary active:scale-90 transition rounded-md">+</button>
                                <button @click="amount > 1 && amount--"
                                    class="px-4 py-2 bg-primary active:scale-90 transition rounded-md">-</button>
                            </div>
                        </div>
                    </div>
                </ProductCard>

                <ProductCard :number="product?.result.uid.id ? 4 : 3" :title="'Metode Pembayaran'">
                    <div class="flex flex-col p-4 gap-4">
                        <ProductPayment v-for="list in payment" :list="list" :amount="amount" :selected="selected"
                            :handleSelect="handleSelect" />
                    </div>
                </ProductCard>

                <ProductCard :number="product?.result.uid.id ? 5 : 4" :title="'Detail Kontak'">
                    <div class="p-4">
                        <div class="flex flex-col gap-2">
                            <label for="">No. WhatsApp</label>
                            <input type="text" class="w-full py-1 px-3 rounded-md bg-inputBg">
                        </div>
                    </div>
                </ProductCard>


                <div v-if="selected.product" class="flex flex-col gap-3 w-full sticky bottom-6 backdrop-blur-sm">
                    <div class="w-full flex gap-3 bg-black/50 p-4 rounded-md">
                        <img :src="'/images/' + product?.result.icon" class="h-16 rounded-md bg-slate-300 aspect-square"
                            alt="">
                        <div>
                            <h3>{{ selected.product.name }} x {{ amount }} Qty <span v-if="selected.payment?.name">- {{
                                    selected.payment.name }}</span></h3>
                            <h1 v-if="selected.payment">Rp. {{ selected.product.price * amount +
                                selected.payment?.total_fee.flat }}</h1>
                            <h1 v-else>Rp. 0</h1>
                        </div>
                    </div>

                    <button :disabled="isLoading" @click="buyProduct"
                        class="w-full py-2 bg-primary text-white rounded-md active:scale-95 transition">
                        Pesan Sekarang
                    </button>
                </div>
            </div>
        </div>


    </section>
</template>