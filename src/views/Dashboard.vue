<template>
  <div class="space-y-6" style="animation: fade-up 0.4s ease both;">
    <div
      v-if="authStore.isAuthenticated && !authStore.isInServer"
      class="flex flex-col sm:flex-row sm:items-center gap-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 sm:p-5"
    >
      <div class="flex items-start gap-3 flex-1">
        <div class="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
          <i class="fa-solid fa-triangle-exclamation text-zinc-400 text-sm"></i>
        </div>
        <div>
          <h3 class="font-semibold text-white text-sm">Server Membership Required</h3>
          <p class="text-zinc-500 text-xs mt-0.5 leading-relaxed">
            You must join the Discord server to access the source code section.
            Also you must relogin again!
          </p>
        </div>
      </div>
      <a
        href="https://dsc.gg/sailorsammyy"
        target="_blank"
        class="group relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold overflow-hidden shrink-0 w-full sm:w-auto active:scale-[0.98] transition-transform duration-100"
      >
        <span class="absolute inset-0 bg-white group-hover:bg-zinc-200 transition-colors duration-150"></span>
        <i class="fa-brands fa-discord relative z-10 text-black"></i>
        <span class="relative z-10 text-black">Join Server</span>
      </a>
    </div>
    <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
      <div>
        <p class="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-1">Overview</p>
        <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Dashboard</h1>
      </div>
      <div class="flex items-center gap-2 self-start sm:self-auto">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <span class="text-xs text-zinc-500">Live</span>
      </div>
    </div>
    <div v-if="stats" class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div
        v-for="(value, key, index) in stats"
        :key="key"
        class="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 sm:p-5 hover:border-zinc-700 transition-colors duration-200 group"
        :style="`animation: fade-up 0.4s ease both; animation-delay: ${index * 60}ms`"
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
    <div v-else-if="loadingStats" class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div
        v-for="i in 4"
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
    <div class="flex items-end justify-between pt-2">
      <div>
        <p class="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-1">Source Code</p>
        <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Stats</h2>
      </div>
    </div>
    <div v-if="sourceStats" class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div
        v-for="(item, index) in sourceStatCards"
        :key="item.label"
        class="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 sm:p-5 hover:border-zinc-700 transition-colors duration-200 group"
        :style="`animation: fade-up 0.4s ease both; animation-delay: ${index * 60}ms`"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold text-zinc-500 uppercase tracking-wider leading-none">
            {{ item.label }}
          </span>
          <div class="w-7 h-7 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 flex items-center justify-center transition-colors duration-200">
            <i :class="`${item.icon} text-zinc-400 text-xs`"></i>
          </div>
        </div>
        <div class="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">
          {{ item.value }}
        </div>
      </div>
      <div
        v-if="sourceStats.latest"
        class="col-span-2 lg:col-span-4 bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 sm:p-5 hover:border-zinc-700 transition-colors duration-200"
        style="animation: fade-up 0.4s ease both; animation-delay: 240ms"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Latest Added</span>
          <div class="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center">
            <i class="fa-solid fa-clock-rotate-left text-zinc-400 text-xs"></i>
          </div>
        </div>
        <div class="flex items-center justify-between gap-4">
          <p class="text-white font-semibold text-sm truncate">{{ sourceStats.latest.title || 'Untitled' }}</p>
          <a
            :href="sourceStats.latest.link"
            target="_blank"
            class="shrink-0 inline-flex items-center gap-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg transition-all duration-150"
          >
            <i class="fa-solid fa-link text-xs"></i>
            View
          </a>
        </div>
      </div>
    </div>
    <div v-else-if="loadingSourceStats" class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div
        v-for="i in 4"
        :key="i"
        class="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 sm:p-5 animate-pulse"
      >
        <div class="h-3 w-16 bg-zinc-800 rounded-lg mb-4"></div>
        <div class="h-8 w-12 bg-zinc-800 rounded-lg"></div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center py-12 gap-3 bg-zinc-900/40 border border-zinc-800 rounded-2xl">
      <div class="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center">
        <i class="fa-solid fa-code-branch text-zinc-600 text-lg"></i>
      </div>
      <p class="text-zinc-500 text-sm">No stats available.</p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';
import api from '../services/api';

const authStore = useAuthStore();
const stats = ref(null);
const loadingStats = ref(true);

const sourceStats = ref(null);
const loadingSourceStats = ref(true);

const formatKey = (key) => {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};

const getIcon = (key) => {
  const k = key.toLowerCase();
  if (k.includes('server'))                         return 'fa-solid fa-server';
  if (k.includes('guild') || k.includes('member')) return 'fa-solid fa-users';
  if (k.includes('user'))                           return 'fa-solid fa-user';
  if (k.includes('command') || k.includes('cmd'))  return 'fa-solid fa-terminal';
  if (k.includes('channel'))                        return 'fa-solid fa-hashtag';
  if (k.includes('message') || k.includes('msg'))  return 'fa-solid fa-message';
  if (k.includes('ping') || k.includes('latency')) return 'fa-solid fa-bolt';
  if (k.includes('uptime'))                         return 'fa-solid fa-clock';
  return 'fa-solid fa-chart-simple';
};

const sourceStatCards = computed(() => {
  if (!sourceStats.value) return [];
  return [
    { label: 'Total Sources',    icon: 'fa-solid fa-code-branch', value: sourceStats.value.total           ?? '—' },
    { label: 'With YouTube',   icon: 'fa-brands fa-youtube',    value: sourceStats.value.withYoutubeLink ?? '—' },
    { label: 'With Desc',      icon: 'fa-solid fa-align-left',  value: sourceStats.value.withDescription ?? '—' },
    { label: 'With Editors',   icon: 'fa-solid fa-users',       value: sourceStats.value.withEditors     ?? '—' },
  ];
});

onMounted(async () => {
  try {
    const res = await axios.get('https://veyra.wispbyte.cc/stats');
    stats.value = res.data;
  } catch {
    stats.value = null;
  } finally {
    loadingStats.value = false;
  }

  try {
    const res = await api.get('/api/source/stats');
    sourceStats.value = res.data;
  } catch {
    sourceStats.value = null;
  } finally {
    loadingSourceStats.value = false;
  }
});
</script>

<style scoped>
@keyframes fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
