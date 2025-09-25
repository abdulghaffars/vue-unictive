<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import ProductCard from '../components/ProductCard.vue';

const recipeList = ref<any>([])
const loading = ref(false)
const page = ref(1)
const hasMore = ref(true)
const loadMoreRef = ref<HTMLElement>()

async function loadMore() {
  if (loading.value || !hasMore.value) return
  
  loading.value = true
  try {
    const res = await fetch(`https://dummyjson.com/recipes?limit=10&skip=${(page.value - 1) * 10}`)
    const data = await res.json()
    
    recipeList.value.push(...data.recipes)
    hasMore.value = data.recipes.length === 10
    page.value++
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadMore()
  
  //scroll observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && hasMore.value && !loading.value) {
        loadMore()
      }
    })
  })
  
  if (loadMoreRef.value) {
    observer.observe(loadMoreRef.value)
  }
  
  onUnmounted(() => {
    observer.disconnect()
  })
})

</script>

<template>
  <div class="container mx-auto px-4">
    <h1 class="text-3xl font-bold mb-6">All Recipes</h1>
    
    <div class="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <ProductCard v-for="recipe in recipeList" :key="recipe.id" :recipe="recipe" />
    </div>
    
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      <p class="mt-2 text-gray-600">Loading more recipes...</p>
    </div>
    
    <!-- Manual Load More Button -->
    <div v-if="!loading && hasMore" class="text-center py-8">
      <button 
        @click="loadMore" 
        class="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Load More Recipes
      </button>
    </div>
    
    <!-- Auto load trigger (hidden) -->
    <div ref="loadMoreRef" class="h-4"></div>
    
    <div v-if="!hasMore && recipeList.length > 0" class="text-center py-8 text-gray-500">
      No more recipes to load
    </div>
  </div>
</template>

<style scoped></style>