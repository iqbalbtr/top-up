<script setup>
const search = ref();
const router = useRouter();

const { setNotif } = useNotification()
const isLoading = ref(false)

async function getDetailInvoice() {
    if (!search.value)
        return
    try {
        isLoading.value = true
        const get = await $fetch('/api/transactions/' + search.value)
        
        if (get.result) {
            router.push('/transaction/' + search.value)
        }
    } catch (error) {
        setNotif("Transaksi tidak ditemukan")
    }finally{
        isLoading.value = false
    }

}

</script>

<template>
    <LayoutSection :class="'flex flex-col md:gap-5'">
        <h1 class="text-2xl md:text-5xl pb-3 font-semibold">Cari Pesanan Mu!</h1>
        <p>Lacak transaksi kamu dengan cara memasukkan Nomor Invoice dibawah ini:</p>
        <div class="flex flex-col gap-1 w-full pt-3">
            <label for="search-transaction">Nomor Invoice Kamu</label>
            <input v-model="search" id="search-transaction" class="md:w-[40%] text-md py-1 bg-inputBg rounded-md px-2"
                type="text">
        </div>
        <button
        :disabled="isLoading"
            class="py-2 px-4 active:scale-95 w-fit mt-3 transition flex gap-3 bg-accent items-center text-white rounded-md"
            @click="getDetailInvoice">
            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="search-alt" width="20">
                <path fill="#fff"
                    d="M21.07,16.83,19,14.71a3.08,3.08,0,0,0-3.4-.57l-.9-.9a7,7,0,1,0-1.41,1.41l.89.89A3,3,0,0,0,14.71,19l2.12,2.12a3,3,0,0,0,4.24,0A3,3,0,0,0,21.07,16.83Zm-8.48-4.24a5,5,0,1,1,0-7.08A5,5,0,0,1,12.59,12.59Zm7.07,7.07a1,1,0,0,1-1.42,0l-2.12-2.12a1,1,0,0,1,0-1.42,1,1,0,0,1,1.42,0l2.12,2.12A1,1,0,0,1,19.66,19.66Z">
                </path>
            </svg>
            <span>Cari pesanan</span>
        </button>
    </LayoutSection>
</template>