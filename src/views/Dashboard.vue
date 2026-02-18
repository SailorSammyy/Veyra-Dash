<template>
  <div class="space-y-6 dashboard-root">

    <div
      v-if="authStore.isAuthenticated && !authStore.isInServer"
      class="flex flex-col sm:flex-row sm:items-center gap-4 bg-yellow-950/30 border border-yellow-900/50 rounded-2xl p-4 sm:p-5"
    >
      <div class="flex items-start gap-3 flex-1">
        <div class="w-8 h-8 rounded-xl bg-yellow-900/50 flex items-center justify-center shrink-0 mt-0.5">
          <i class="fa-solid fa-triangle-exclamation text-yellow-500 text-sm"></i>
        </div>
        <div>
          <h3 class="font-semibold text-yellow-400 text-sm">Server Membership Required</h3>
          <p class="text-zinc-400 text-xs mt-0.5 leading-relaxed">
            You must join the Discord server to access the source code section.
            Also you must relogin again!
          </p>
        </div>
      </div>
      <a
        href="https://dsc.gg/sailorsammyy"
        target="_blank"
        class="discord-join-btn relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden shrink-0 w-full sm:w-auto"
      >
        <span class="absolute inset-0 bg-[#5865F2] transition-colors duration-200"></span>
        <i class="fa-brands fa-discord relative z-10"></i>
        <span class="relative z-10">Join Server</span>
      </a>
    </div>

    <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
      <div>
        <p class="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-1">Overview</p>
        <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Dashboard</h1>
      </div>
      <div class="flex items-center gap-2 self-start sm:self-auto">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span class="text-xs text-zinc-500">Live</span>
      </div>
    </div>

    <div v-if="stats" class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div
        v-for="(value, key, index) in stats"
        :key="key"
        class="stat-card bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 sm:p-5 hover:border-zinc-700 transition-colors duration-200 group"
        :style="`animation-delay: ${index * 60}ms`"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold text-zinc-500 uppercase tracking-wider leading-none">
            {{ formatKey(key) }}
          </span>
          <div class="w-7 h-7 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 flex items-center justify-center transition-colors duration-200">
            <i :class="`${getIcon(key)} text-zinc-400 text-xs`"></i>
          </div>
        </div>
        <div class="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">
          {{ value }}
        </div>
      </div>
    </div>

    <div v-else-if="loading" class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div
        v-for="i in 5"
        :key="i"
        class="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 sm:p-5 animate-pulse"
      >
        <div class="h-3 w-16 bg-zinc-800 rounded-lg mb-4"></div>
        <div class="h-8 w-12 bg-zinc-800 rounded-lg"></div>
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center py-16 gap-3 bg-zinc-900/40 border border-zinc-800 rounded-2xl">
      <div class="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center">
        <i class="fa-solid fa-chart-simple text-zinc-600 text-lg"></i>
      </div>
      <p class="text-zinc-500 text-sm">No statistics available.</p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';

const authStore = useAuthStore();
const stats = ref(null);
const loading = ref(true);

const formatKey = (key) => {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};


const getIcon = (key) => {
  const k = key.toLowerCase();
  if (k.includes('server'))                          return 'fa-solid fa-server';
  if (k.includes('guild') || k.includes('member'))  return 'fa-solid fa-users';
  if (k.includes('user'))                            return 'fa-solid fa-user';
  if (k.includes('command') || k.includes('cmd'))   return 'fa-solid fa-terminal';
  if (k.includes('channel'))                         return 'fa-solid fa-hashtag';
  if (k.includes('message') || k.includes('msg'))   return 'fa-solid fa-message';
  if (k.includes('ping') || k.includes('latency'))  return 'fa-solid fa-bolt';
  if (k.includes('uptime'))                          return 'fa-solid fa-clock';
  return 'fa-solid fa-chart-simple';
};

onMounted(async () => {
  try {
    const res = await axios.get('https://m3u8proxy.kimora.workers.dev/?url=https://veyra.wispbyte.cc/stats');
    stats.value = res.data;
  } catch (err) {
    console.error('Could not fetch stats:', err);
    stats.value = null;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.dashboard-root {
  animation: fade-up 0.4s ease both;
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.stat-card {
  animation: fade-up 0.4s ease both;
}

.discord-join-btn:hover span:first-child {
  background-color: #4752c4;
}
.discord-join-btn:active {
  transform: scale(0.98);
}
</style>