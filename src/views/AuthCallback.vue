<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black">
    <div class="text-center">
      <div class="w-12 h-12 border-2 border-zinc-700 border-t-white rounded-full animate-spin mx-auto mb-5"></div>
      <p class="text-white text-sm font-medium">Finalizing login...</p>
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