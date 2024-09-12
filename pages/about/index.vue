<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen w-full">
    <LayoutSection :class="'max-w-lg'">
      <h1 class="font-semibold text-2xl md:text-4xl pt-6 pb-4">{{ useRuntimeConfig().public.appName }}</h1>
      <p class="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore modi vero velit explicabo iusto accusamus
        rerum molestias, dolorem unde voluptas doloremque illo adipisci deserunt!</p>
        <p class="pt-4">syam.shop@gmail.com</p>
      <div class="pt-12">
        <h3 class="font-semibold pb-4">Links</h3>
        <ul class="flex flex-col gap-2">
          <li class="hover:translate-x-2 text-textSecondary before:transition transition before:content-['>'] before:pr-2 before:hidden hover:before:inline"><a href="" >Facebook</a></li>
          <li class="hover:translate-x-2 text-textSecondary before:transition transition before:content-['>'] before:pr-2 before:hidden hover:before:inline"><a href="" >Instagram</a></li>
          <li class="hover:translate-x-2 text-textSecondary before:transition transition before:content-['>'] before:pr-2 before:hidden hover:before:inline"><a href="" >Youtube</a></li>
        </ul>
      </div>
    </LayoutSection>
  </div>
</template>
