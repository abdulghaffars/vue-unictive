<script setup lang="ts">
import {
  ClockCircleOutlined,
  DashboardFilled,
  FireOutlined,
  GlobalOutlined,
  ThunderboltOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;
const recipe = ref<any>(null);
async function getRecipe() {
  const res = await fetch(`https://dummyjson.com/recipes/${id}`);
  const data = await res.json();
  recipe.value = data;
  console.log(recipe.value);
}

onMounted(() => {
  getRecipe();
});
</script>

<template>
  <div v-if="recipe" class="container mx-auto px-4 py-8">
    <!-- Recipe Header -->
    <div class="flex flex-col items-center justify-center mb-8">
      <img
        :src="recipe.image"
        alt="Recipe Image"
        class="w-[500px] h-[500px] object-cover rounded-lg mb-6"
      />
      <h1 class="text-3xl font-bold text-center mb-4">{{ recipe.name }}</h1>
      <p class="text-gray-600 text-center max-w-2xl">
        {{ recipe.description }}
      </p>
    </div>

    <!-- Recipe Info Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="flex items-start gap-2 border rounded-lg p-3">
        <ClockCircleOutlined />
        <div>
          <p class="text-sm text-gray-500">Prep Time</p>
          <p class="font-semibold">{{ recipe.prepTimeMinutes }} min</p>
        </div>
      </div>
      <div class="flex items-start gap-2 border rounded-lg p-3">
        <DashboardFilled />
        <div>
          <p class="text-sm text-gray-500">Cook Time</p>
          <p class="font-semibold">{{ recipe.cookTimeMinutes }} min</p>
        </div>
      </div>
      <div class="flex items-start gap-2 border rounded-lg p-3">
        <UserOutlined />
        <div>
          <p class="text-sm text-gray-500">Servings</p>
          <p class="font-semibold">{{ recipe.servings }}</p>
        </div>
      </div>
      <div class="flex items-start gap-2 border rounded-lg p-3">
        <FireOutlined />
        <div>
          <p class="text-sm text-gray-500">Difficulty</p>
          <p class="font-semibold">{{ recipe.difficulty }}</p>
        </div>
      </div>
      <div class="flex items-start gap-2 border rounded-lg p-3">
        <ThunderboltOutlined />
        <div>
          <p class="text-sm text-gray-500">Calories</p>
          <p class="font-semibold">{{ recipe?.caloriesPerServing }} kcal</p>
        </div>
      </div>

      <div class="flex items-start gap-2 border rounded-lg p-3">
        <GlobalOutlined />
        <div>
          <p class="text-sm text-gray-500">Cuisine</p>
          <p class="font-semibold">{{ recipe?.cuisine || "Unknown" }}</p>
        </div>
      </div>
    </div>

    <!-- Ingredients Section -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
        <UnorderedListOutlined />
        Ingredients:
      </h2>
      <div class="bg-gray-50 px-6 rounded-lg">
        <ul class="space-y-2">
          <li
            v-for="ingredient in recipe.ingredients"
            :key="ingredient"
            class="flex items-start gap-2"
          >
            <span class="text-yellow-500 mt-1">-</span>
            <span class="pt-1">{{ ingredient }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Instructions Section -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
        <ClockCircleOutlined />
        Instructions:
      </h2>
      <div class="bg-gray-50 px-6 rounded-lg">
        <ol class="space-y-4">
          <li
            v-for="(instruction, index) in recipe.instructions"
            :key="index"
            class="flex items-start gap-3"
          >
            <span
              class="bg-yellow-400 text-black font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0"
            >
              {{ index + 1 }}
            </span>
            <span class="pt-1">{{ instruction }}</span>
          </li>
        </ol>
      </div>
    </div>

    <!-- Tags -->
    <div v-if="recipe.tags && recipe.tags.length" class="mb-8">
      <h3 class="text-lg font-semibold mb-3">Tags:</h3>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in recipe.tags"
          :key="tag"
          class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-8">
    <div
      class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"
    ></div>
    <p class="mt-2 text-gray-600">Loading recipe...</p>
  </div>
</template>

<style scoped></style>
