<script setup lang="ts">
const isSearch = ref(false)
const isSidebar = ref(false)
const isLang = ref(false)
const { setLang } = usePreference()

</script>

<template>
    <nav
        class="flex px-3 md:px-24 py-4 w-full border-b border-secondary justify-between sticky top-0 z-[9999] backdrop-blur-sm bg-slate-900/90">
        <div class="flex gap-8">
            <button class="md:hidden" @click="isSidebar = !isSidebar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="bars" width="25">
                    <path fill="#fff"
                        d="M3,8H21a1,1,0,0,0,0-2H3A1,1,0,0,0,3,8Zm18,8H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm0-5H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z">
                    </path>
                </svg>
            </button>
            <div>
                <RouterLink to="/" class="text-xl">
                    <NuxtImg src="/logo.png" alt="logo.png" loading="eager" class="h-8 w-auto" decoding="async" />
                </RouterLink>
            </div>

            <div class="md:flex gap-6 pr-4 hidden items-center">
                <NavLink :href="'/'" :title="'Home'" />
                <NavLink :href="'/transaction'" :title="'Transactions'" />
                <NavLink :href="'/about'" :title="'About'" />
            </div>
        </div>

        <div @click="isSidebar = !isSidebar" v-if="isSidebar"
            class="top-0 left-0 w-full h-screen bg-black/50 fixed z-[999]"></div>
        <div :class="isSidebar ? 'translate-x-0' : '-translate-x-[150%]'"
            class="fixed z-[9999] transition duration-300 ease-in left-0 top-0 w-64 flex flex-col bg-secondary h-screen">
            <div class="w-full py-3 px-4 flex justify-between border-b border-primary">
                <RouterLink to="/" class="text-xl">
                    <NuxtImg src="/logo.jpg" alt="logo.jpg" loading="eager" class="h-8 w-auto" decoding="async" />
                </RouterLink>

                <button @click="isSidebar = !isSidebar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="times-circle" width="20">
                        <path fill="#fff"
                            d="M15.71,8.29a1,1,0,0,0-1.42,0L12,10.59,9.71,8.29A1,1,0,0,0,8.29,9.71L10.59,12l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L13.41,12l2.3-2.29A1,1,0,0,0,15.71,8.29Zm3.36-3.36A10,10,0,1,0,4.93,19.07,10,10,0,1,0,19.07,4.93ZM17.66,17.66A8,8,0,1,1,20,12,7.95,7.95,0,0,1,17.66,17.66Z">
                        </path>
                    </svg>
                </button>
            </div>
            <div class="flex flex-col py-6">
                <NavLink :class="'hover:bg-hoverSecondary/20 font-semibold px-4 py-3'" :href="'/'" :title="'Home'" />
                <NavLink :class="'hover:bg-hoverSecondary/20 font-semibold px-4 py-3'" :href="'/transaction'"
                    :title="'Transactions'" />
                <NavLink :class="'hover:bg-hoverSecondary/20 font-semibold px-4 py-3'" :href="'/about'"
                    :title="'About'" />
            </div>
        </div>

        <div class="flex gap-2 relative">
            <button @click="isSearch = !isSearch"
                class="py-1 px-3 border active:scale-95 transition border-secondary font-thin rounded-md flex items-center gap-3">
                <span>Cari</span>
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="search-alt"
                    width="18">
                    <path fill="#fff"
                        d="M21.07,16.83,19,14.71a3.08,3.08,0,0,0-3.4-.57l-.9-.9a7,7,0,1,0-1.41,1.41l.89.89A3,3,0,0,0,14.71,19l2.12,2.12a3,3,0,0,0,4.24,0A3,3,0,0,0,21.07,16.83Zm-8.48-4.24a5,5,0,1,1,0-7.08A5,5,0,0,1,12.59,12.59Zm7.07,7.07a1,1,0,0,1-1.42,0l-2.12-2.12a1,1,0,0,1,0-1.42,1,1,0,0,1,1.42,0l2.12,2.12A1,1,0,0,1,19.66,19.66Z">
                    </path>
                </svg>
            </button>
            <button @click="isLang = !isLang"
                class="py-1 px-3 border active:scale-95 transition border-secondary font-thin rounded-md flex items-center gap-2">
                <span>ID</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="globe" width="18">
                    <path fill="#fff"
                        d="M21.41,8.64s0,0,0-.05a10,10,0,0,0-18.78,0s0,0,0,.05a9.86,9.86,0,0,0,0,6.72s0,0,0,.05a10,10,0,0,0,18.78,0s0,0,0-.05a9.86,9.86,0,0,0,0-6.72ZM4.26,14a7.82,7.82,0,0,1,0-4H6.12a16.73,16.73,0,0,0,0,4Zm.82,2h1.4a12.15,12.15,0,0,0,1,2.57A8,8,0,0,1,5.08,16Zm1.4-8H5.08A8,8,0,0,1,7.45,5.43,12.15,12.15,0,0,0,6.48,8ZM11,19.7A6.34,6.34,0,0,1,8.57,16H11ZM11,14H8.14a14.36,14.36,0,0,1,0-4H11Zm0-6H8.57A6.34,6.34,0,0,1,11,4.3Zm7.92,0h-1.4a12.15,12.15,0,0,0-1-2.57A8,8,0,0,1,18.92,8ZM13,4.3A6.34,6.34,0,0,1,15.43,8H13Zm0,15.4V16h2.43A6.34,6.34,0,0,1,13,19.7ZM15.86,14H13V10h2.86a14.36,14.36,0,0,1,0,4Zm.69,4.57a12.15,12.15,0,0,0,1-2.57h1.4A8,8,0,0,1,16.55,18.57ZM19.74,14H17.88A16.16,16.16,0,0,0,18,12a16.28,16.28,0,0,0-.12-2h1.86a7.82,7.82,0,0,1,0,4Z">
                    </path>
                </svg>
            </button>

            <div v-show="isLang"
                class="absolute overflow-hidden animate-accordion-down top-full border-2 border-secondary right-0 bg-black/50 backdrop-blur-sm mt-2 rounded-md items-start flex flex-col">
                <button @click="() => setLang('id')" class="px-6  text-left active:bg-accent hover:bg-accent/30 w-full py-2">Indonesia</button>
                <button @click="() => setLang('en')" class="px-6  text-left  active:bg-accent hover:bg-accent/30 w-full py-2">English</button>
            </div>
        </div>
    </nav>

    <NavSearch :class="'animate-accordion-up'" v-show="isSearch" v-on:handle-search="(val) => isSearch = val"
        :is-search="isSearch" />
</template>