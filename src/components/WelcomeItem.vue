<script setup lang="ts">
defineSlots<{
  default: () => any
  icon?: () => any
  heading?: () => any
}>()
</script>

<template>
  <section class="mb-8">
    <div class="flex items-center gap-3 mb-2">
      <span class="shrink-0">
        <slot name="icon" />
      </span>
      <h3 class="text-lg font-semibold">
        <slot name="heading" />
      </h3>
    </div>
    <div class="text-gray-600">
      <slot />
    </div>
  </section>
  
</template>

<style scoped>
</style>


