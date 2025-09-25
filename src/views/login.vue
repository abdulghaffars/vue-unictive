<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import bgImage from '@/assets/bgautentification.png'
import uniLogo from '@/assets/uni-recipe.png'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const router = useRouter()

const email = ref('')
const password = ref('')
const agree = ref(false)
const loading = ref(false)
const error = ref('')

async function handleSubmit() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Email dan password wajib diisi.'
    return
  }
  if (!agree.value) {
    error.value = 'Anda harus menyetujui syarat & ketentuan.'
    return
  }
  loading.value = true
  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email.value,
        password: password.value,
        expiresInMins: 360,
      }),
    })
    
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login gagal')
    }
    
    localStorage.setItem('token', data.accessToken)
    localStorage.setItem('user', JSON.stringify(data))
    
    await Swal.fire({
      icon: 'success',
      title: 'Login berhasil',
      text: `Selamat datang, ${data.firstName}!`,
      timer: 1500,
      showConfirmButton: false,
    })
    router.replace('/')
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Gagal login. Coba lagi.'
    error.value = errorMessage
    Swal.fire({
      icon: 'error',
      title: 'Gagal login',
      text: errorMessage,
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-full flex flex-col md:flex-row mx-auto">
    <div
      class="hidden md:block w-full md:w-1/2 h-screen bg-cover bg-center relative"
      :style="{ backgroundImage: `url(${bgImage})` }"
    >
      <div class="absolute inset-0 bg-yellow-300/50"></div>
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <img :src="uniLogo" alt="Uni Recipe" class="w-40 h-auto" />
        <div class="text-3xl font-bold text-white">Uni Recipe</div>
      </div>
    </div>

    <!-- Right side with form -->
    <div class="w-full md:w-1/2 flex flex-col px-8 md:px-20 pt-16 md:pt-32">
      <div class="flex items-center justify-between mb-2">
        <p class="text-2xl font-semibold">Welcome</p>
        <!-- <a-button size="small" @click="router.push('/')">back to home</a-button> -->
      </div>
      <p class="text-gray-600 mb-6">Log in into your existing account</p>

      <form @submit.prevent="handleSubmit" class="space-y-4 mb-4">
        <div class="flex flex-col gap-2">
        <a-input
          v-model:value="email"
          type="text"
          name="username"
          placeholder="enter your username"
        />
        <a-input-password
          v-model:value="password"
          name="password"
          placeholder="enter your password"
        />
        </div>
        <div class="flex items-center gap-2">
          <a-checkbox v-model:checked="agree" id="terms" />
          <label for="terms" class="text-sm">I agree to terms & conditions</label>
        </div>
        <a-button
          type="primary"
          class=" border rounded-lg py-2 px-4 mt-2 !bg-yellow-300 !text-black"
          html-type="submit"
          :loading="loading"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </a-button>
      </form>

      <p v-if="error" class="mt-4 text-red-500 !w-full mb-4">{{ error }}</p>
      <p class="text-sm text-gray-600 cursor-pointer">Forgot Password?</p>
      <p class="mt-2 text-sm">
        Don't have an account?
        <router-link to="/register" class="text-amber-300 hover:underline">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
</style>


