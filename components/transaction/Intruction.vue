<script setup lang="ts">
import type { Instruction } from '~/types/tripay.type';


defineProps<{
    intruction: Instruction
}>()

const isView = ref(false);
</script>
<template>
    <div class="my-4">
        <button class="w-full py-2 text-left flex justify-between text-md font-semibold bg-hoverBg  rounded-md  px-5"
            @click="isView = !isView">
            <span>{{
                intruction.title }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="transition" id="angle-down"
                :class="isView ? 'rotate-[180deg]' : 'rotate-0'" width="25">
                <path fill="#6563FF"
                    d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z">
                </path>
            </svg>
        </button>
        <div v-if="isView" class="px-8 py-2 my-4 bg-hoverBg rounded-md animate-accordion-down">
            <ul class="list-decimal animate-accordion-down">
                <li v-for="steps in intruction.steps" v-html="steps"></li>
            </ul>
        </div>
    </div>
</template>