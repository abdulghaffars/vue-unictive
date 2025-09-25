<script setup lang="ts">
import { Button } from "ant-design-vue";
import router from "../router";
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { isAuthenticated, clearToken, clearStoredUser } from '../utils/auth'

const route = useRoute()
const isLoggedIn = ref(false)

onMounted(async () => {
  isLoggedIn.value = await isAuthenticated()
})

watch(() => route.fullPath, async () => {
  isLoggedIn.value = await isAuthenticated()
})

const handleLogin = () => {
  router.push("/login");
};

const handleLogout = async () => {
  clearToken()
  clearStoredUser()
  isLoggedIn.value = false
  router.push("/login");
};

const handleHome = () => {
  router.push("/");
};

const handleAddRecipe = () => {
  router.push("/add-recipe");
};

const handleRecipeList = () => {
  router.push("/recipe-list");
};
</script>

<template>
  <header class="">
    <nav
      class="mx-auto px-4 md:px-8 lg:px-16 py-3 flex items-center justify-between shadow-2xl"
    >
      <div>
        <Button type="text" @click="handleHome">Home</Button>
        <Button type="text" @click="handleAddRecipe">Add recipe</Button>
        <Button type="text" @click="handleRecipeList">Recipe list</Button>
      </div>

      <div>
        <Button v-if="!isLoggedIn" type="primary" class="!bg-amber-300 !text-black" @click="handleLogin">Log in</Button>
        <Button v-if="isLoggedIn" type="primary" class="!bg-amber-300 !text-black" @click="handleLogout">Log out</Button>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
