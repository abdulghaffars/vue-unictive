<script setup lang="ts">
import { defineProps, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

interface Recipe {
  id: number;
  name: string;
  image: string;
  rating?: number;
  tags?: string[];
}

const props = defineProps<{
  recipe: Recipe;
}>();

const router = useRouter();
const imgRef = ref<HTMLImageElement>();
const isLoaded = ref(false);

const handleClick = () => {
  router.push(`/recipe/${props.recipe.id}`);
};

onMounted(() => {
  // Fallback untuk browser lama
  if (!window.IntersectionObserver) {
    isLoaded.value = true;
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isLoaded.value = true;
          observer.disconnect();
        }
      });
    },
    {
      rootMargin: "50px", // Load 50px sebelum masuk viewport
    }
  );

  if (imgRef.value) {
    observer.observe(imgRef.value);
  }
});
</script>

<template>
  <div
    class="lg:w-[200px] md:w-[150px] w-[100px] h-[150px] relative group rounded-lg overflow-hidden cursor-pointer"
    @click="handleClick"
  >
    <div ref="imgRef" class="w-full h-full bg-gray-200">
      <img
        v-if="isLoaded"
        :src="recipe.image"
        :alt="recipe.name"
        class="w-full h-full object-cover"
      />
      <div
        v-else
        class="w-full h-full flex items-center justify-center text-gray-400"
      >
        Loading...
      </div>
    </div>
    <div
      class="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300 flex items-center justify-center"
    >
      <h1
        class="font-bold text-white text-center px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm lg:text-lg"
      >
        {{ recipe.name }}
      </h1>
    </div>
  </div> 
</template>

<style scoped></style>
