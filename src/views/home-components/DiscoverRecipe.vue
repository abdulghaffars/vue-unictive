<script setup lang="ts">
import { Button } from "ant-design-vue";
import { onMounted, ref } from "vue";
import router from "../../router";
import ProductCard from "../../components/ProductCard.vue";

const discoverRecipe = ref<any>(null);

async function getDiscoverRecipe() {
  const res = await fetch("https://dummyjson.com/recipes?limit=10");
  const data = await res.json();
  discoverRecipe.value = data?.recipes ?? [];
}

onMounted(getDiscoverRecipe);
</script>

<template>
  <div>
    <h1
      class="font-bold text-[20px] sm:text-[30px] lg:text-[60px] border-l-8 border-yellow-300 pl-4"
    >
      Discover Recipe
    </h1>
    <div class="flex gap-4 sm:gap-8 lg:gap-16 flex-wrap justify-center mb-6">
      <ProductCard v-for="recipe in discoverRecipe" :key="recipe.id" :recipe="recipe" />
    </div>
    <Button @click="router.push('/recipe-list')" type="primary" class="w-full !bg-amber-300 !text-white !text-lg sm:!text-xl lg:!text-2xl !h-auto">Discover More</Button>
  </div>
</template>

<style scoped></style>
