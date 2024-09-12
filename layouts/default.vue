<script setup lang="ts">
const { storeProduct } = useProduct()
const { storePayment } = usePayment()
const route = useRoute()

const { data: product } = await useFetch("/api/products")
const { data: popular } = await useFetch("/api/products?type=popular")
const { data: recomen } = await useFetch("/api/products?type=recomendation")
const { data: payment } = await useFetch('/api/payment')

watchEffect(() => {
  if (product.value)
    storeProduct("products", product.value.result)
  if (popular.value)
    storeProduct("popular", popular.value?.result)
  if (recomen.value)
    storeProduct("recomen", recomen.value?.result)


  if (payment.value)
    storePayment(payment.value?.result)

})

watch(route, (val) => {
  window.scrollTo({
    top: 0
  })
})


</script>

<template>
  <main class="bg-slate-950 text-white">
    <HomeNotification />
    <NavBar />
    <slot></slot>
  </main>
</template>