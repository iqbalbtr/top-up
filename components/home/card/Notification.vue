<script setup lang="ts">
import type { NotifType } from '~/stores/notifications';

defineProps<{
    data: NotifType
}>()

</script>

<template>
    <div class="px-8 bg-accent font-semibold rounded-md text-white py-3 animate-accordion-down">
        {{ data.message }}
    </div>
</template>