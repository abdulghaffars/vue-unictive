<script setup lang="ts">
import { onMounted, ref } from "vue";
import router from "../../router";

let newRecipe = ref<any>(null);
let recipeTags = ref<any>([]);

async function getLastRecipe() {
  const res = await fetch(
    "https://dummyjson.com/recipes?sortBy=reviewCount&order=desc&limit=10"
  );
  if (!res.ok) return;
  const data = await res.json();
  newRecipe.value = data?.recipes?.[0] ?? null;
  recipeTags.value = data?.recipes?.[0]?.tags ?? [];
}

onMounted(getLastRecipe);
</script>

<template>
  <div>
    <h1
      class="font-bold text-[20px] sm:text-[30px] lg:text-[60px] border-l-8 border-yellow-300 pl-4"
    >
      Popular Recipe
    </h1>
    <div
      class="flex flex-col-reverse sm:flex-row gap-4 sm:gap-8 lg:gap-16 justify-center items-center"
    >
      <div
        class="w-[60%] flex flex-col sm:gap-4 justify-center items-center sm:items-start"
      >
        <h1
          class="font-bold text-[20px] sm:text-[30px] lg:text-[60px] !mb-0 sm:mb-4"
        >
          {{ newRecipe?.name }}
        </h1>
        <div class="flex items-center gap-3 sm:mt-2">
          <a-rate
            starSize="1px"
            :value="Number(newRecipe?.rating) || 0"
            allow-half
            disabled
          />
          <span class="text-gray-600 text-[16px] sm:text-[18px] lg:text-[20px]">
            {{ newRecipe?.rating }}
          </span>
        </div>
        <div class="mt-2">
          <a-tag v-for="tag in recipeTags" :key="tag" color="blue">{{
            tag
          }}</a-tag>
        </div>
        <a-button
          @click="router.push(`/recipe/${newRecipe?.id}`)"
          type="primary"
          class="!bg-amber-300 !text-white !text-lg sm:!text-xl !h-auto"
          >View Recipe</a-button
        >
      </div>
      <div class="w-[40%]">
        <img :src="newRecipe?.image" alt="New Recipe" class="rounded-lg" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
