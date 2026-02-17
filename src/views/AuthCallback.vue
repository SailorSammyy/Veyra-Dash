<template>
  <div class="min-h-screen flex items-center justify-center bg-dark">
    <div class="text-center">
      <div class="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-white font-medium">Finalizing login...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  const token = route.query.token;
  if (token) {
    authStore.setToken(token);
    authStore.fetchUser().then(() => {
      router.push('/');
    });
  } else {
    router.push('/login?error=missing_token');
  }
});
</script>