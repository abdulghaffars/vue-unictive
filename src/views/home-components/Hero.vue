<script setup lang="ts">
import { InputSearch } from "ant-design-vue";
</script>

<template>
  <div class="flex">
    <div class="w-[60%] flex flex-col gap-4 justify-center items-center">
      <h1 class="font-bold text-[20px] sm:text-[30px] lg:text-[60px]">
        Discover Recipe & Delicious Food
      </h1>
      <InputSearch placeholder="Search recipe" />
    </div>
    <div class="w-[40%] flex justify-center items-center">
      <img src="@/assets/foodlp.png" alt="Hero" class="rounded-lg" />
    </div>
  </div>
</template>

<style scoped></style>
