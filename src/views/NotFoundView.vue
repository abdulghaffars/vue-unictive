<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
    <div class="w-full max-w-2xl">
      <a-result status="404" title="404" sub-title="Halaman yang Anda cari tidak ditemukan atau sudah dipindahkan.">
        <template #extra>
          <div class="flex items-center justify-center gap-3">
            <router-link to="/">
              <a-button type="primary">Kembali ke Beranda</a-button>
            </router-link>
            <router-link to="/">
              <a-button>Telusuri Halaman</a-button>
            </router-link>
          </div>
        </template>
      </a-result>
      <div class="mt-6 text-center text-sm text-gray-500">
        Kode: 404 • Jika ini kesalahan, coba refresh atau kembali nanti.
        <div class="mt-2">Anda akan dialihkan ke beranda dalam 5 detik…</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
let timeoutId: number | undefined

onMounted(() => {
  timeoutId = window.setTimeout(() => {
    router.replace('/')
  }, 5000)
})

onBeforeUnmount(() => {
  if (timeoutId) {
    window.clearTimeout(timeoutId)
  }
})

</script>

<style scoped>
</style>


