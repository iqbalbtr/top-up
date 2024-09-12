<script setup lang="ts">
const isView = ref(false);

</script>

<template>
    <div class="md:w-[30%] flex flex-col gap-2">
        <button class="px-4 py-2 text-left bg-secondary rounded-md flex justify-between" @click="isView = !isView">
            <span>Cara dalam membeli </span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="transition" id="angle-down"
                :class="isView ? 'rotate-[180deg]' : 'rotate-0'" width="25">
                <path fill="#6563FF"
                    d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z">
                </path>
            </svg>
        </button>

        <div class="p-6 bg-secondary rounded-md animate-accordion-down" v-if="isView">
            <ul class="pl-3 list-decimal">
                <li>Pilih Nominal</li>
                <li>Masukkan Data Akun</li>
                <li>Tentukan Jumlah Pembelian</li>
                <li>Pilih Pembayaran</li>
                <li>Masukkan Kode Promo (jika ada)</li>
                <li>Isi Detail Kontak</li>
                <li>Klik <strong>Pesan Sekarang</strong> dan lakukan Pembayaran</li>
                <li>Selesai</li>
            </ul>
        </div>
    </div>
</template>