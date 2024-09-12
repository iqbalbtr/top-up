<script setup lang="ts">
const images = reactive([
    {
        src: "/images/banner-1.webp",
    }
]);

const slide = ref(0);
const current = computed(() => images[slide.value]);


const nextSlide = () => {
    if (slide.value < images.length - 1) {
        slide.value++;
    } else {
        slide.value = 0;
    }
};

onMounted(() => {
    setInterval(() => nextSlide(), 5000)
})

</script>

<template>
    <div class="w-full h-[20vh] sm:h-[35vh] md:h-[60vh] relative md:p-6 py-4 flex justify-center">
        <div class="relative h-full bg-slate-800 w-[90%]">
            <NuxtImg :src='current.src' class="w-full h-full object-cover rounded-md" alt="Slide Image" />
        </div>
    </div>
</template>
