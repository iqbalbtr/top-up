<script setup lang="ts">

const { notifications } = useNotification()

</script>

<template>
    <div v-if="notifications.length" class="fixed top-0 z-[99999] pt-5 flex-col-reverse h-auto left-1/2 -translate-x-1/2 flex justify-center items-center gap-3">
        <HomeCardNotification v-for="notif in notifications" :data="notif" />
    </div>
</template>