<script setup lang="ts">
import Hero from './home-components/Hero.vue';
import NewRecipe from './home-components/NewRecipe.vue';
import PopularRecipe from './home-components/PopularRecipe.vue';
import DiscoverRecipe from './home-components/DiscoverRecipe.vue';

</script>

<template>
  <main class="container flex flex-col gap-4 sm:gap-8 lg:gap-16">
    <Hero />
    <NewRecipe />
    <PopularRecipe />
    <DiscoverRecipe />
  </main>
</template>
