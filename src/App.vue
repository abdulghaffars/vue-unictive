<script setup lang="ts">
import { computed } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const showHeader = computed(() => route.name !== 'login' && route.name !== 'not-found')
const showFooter = computed(() => route.name !== 'login' && route.name !== 'not-found')
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header v-show="showHeader" class="sticky top-0 z-50" />
    <main class="flex-1 mx-auto w-full">
      <router-view />
    </main>
    <Footer v-show="showFooter" class="" />
  </div>
</template>

<style scoped>
</style>
