<template>
  <div
    class="min-h-screen text-white px-4 sm:px-10 py-8 sm:py-12 pb-28"
    style="animation: fadeUp 0.35s ease both;"
  >
    <div class="max-w-5xl mx-auto space-y-10">
      <div
        v-if="authStore.isAuthenticated && !authStore.isInServer"
        class="flex flex-col sm:flex-row sm:items-center gap-4 border border-white/[0.08] rounded-2xl p-4 sm:p-5 bg-white/[0.02]"
      >
        <div class="flex items-start gap-3 flex-1">
          <div class="w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
            <svg class="w-4 h-4 text-white/40" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
            </svg>
          </div>
          <div>
            <p class="text-white text-sm font-semibold">Server membership required</p>
            <p class="text-white/35 text-xs mt-0.5 leading-relaxed">Join the Discord server to access source code. You'll need to re-login after joining.</p>
          </div>
        </div>
        <a
          href="https://dsc.gg/sailorsammyy"
          target="_blank"
          class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 active:scale-95 transition-all duration-150 shrink-0 w-full sm:w-auto"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03Z"/>
          </svg>
          Join Server
        </a>
      </div>
      <div class="flex items-end justify-between">
        <div>
          <p class="text-[10px] tracking-[0.3em] text-white/25 uppercase mb-2">Overview</p>
          <h1 class="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-none">Dashboard</h1>
        </div>
        <div class="flex items-center gap-2 pb-1">
          <span class="relative flex h-1.5 w-1.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
            <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
          </span>
          <span class="text-[11px] text-white/30">Live</span>
        </div>
      </div>
      <section class="space-y-4">
        <p class="text-[10px] tracking-[0.25em] text-white/20 uppercase">Bot Statistics</p>
        <div v-if="loadingStats" class="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div v-for="i in 4" :key="i" class="rounded-2xl border border-white/[0.05] p-5 animate-pulse">
            <div class="h-2.5 w-14 bg-white/[0.06] rounded-full mb-5"></div>
            <div class="h-7 w-10 bg-white/[0.06] rounded-lg"></div>
          </div>
        </div>
        <div v-else-if="stats" class="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="(value, key, index) in stats"
            :key="key"
            class="stat-card group rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] p-5 transition-all duration-200"
            :style="`animation-delay: ${index * 50}ms`"
          >
            <div class="flex items-start justify-between mb-4">
              <p class="text-[10px] tracking-[0.2em] text-white/25 uppercase leading-none">{{ formatKey(key) }}</p>
              <div class="w-6 h-6 rounded-lg border border-white/[0.07] flex items-center justify-center shrink-0">
                <component :is="'svg'" v-html="getIconSvg(key)" class="w-3 h-3 text-white/30" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"></component>
              </div>
            </div>
            <p class="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">{{ value }}</p>
          </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center py-16 gap-3 rounded-2xl border border-white/[0.05]">
          <svg class="w-8 h-8 text-white/10" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/>
          </svg>
          <p class="text-white/20 text-sm">No statistics available</p>
        </div>
      </section>
      <div class="h-px bg-white/[0.05]"></div>
      <section class="space-y-4">
        <p class="text-[10px] tracking-[0.25em] text-white/20 uppercase">Source Code</p>
        <div v-if="loadingSourceStats" class="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div v-for="i in 4" :key="i" class="rounded-2xl border border-white/[0.05] p-5 animate-pulse">
            <div class="h-2.5 w-14 bg-white/[0.06] rounded-full mb-5"></div>
            <div class="h-7 w-10 bg-white/[0.06] rounded-lg"></div>
          </div>
        </div>
        <div v-else-if="sourceStats" class="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            v-for="(item, index) in sourceStatCards"
            :key="item.label"
            class="stat-card group rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] p-5 transition-all duration-200"
            :style="`animation-delay: ${index * 50}ms`"
          >
            <div class="flex items-start justify-between mb-4">
              <p class="text-[10px] tracking-[0.2em] text-white/25 uppercase leading-none">{{ item.label }}</p>
              <div class="w-6 h-6 rounded-lg border border-white/[0.07] flex items-center justify-center shrink-0">
                <svg class="w-3 h-3 text-white/30" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" v-html="item.iconPath"></svg>
              </div>
            </div>
            <p class="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">{{ item.value }}</p>
          </div>
          <div
            v-if="sourceStats.latest"
            class="stat-card col-span-2 lg:col-span-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] p-5 transition-all duration-200"
            style="animation-delay: 200ms"
          >
            <div class="flex items-center justify-between gap-4">
              <div class="min-w-0">
                <p class="text-[10px] tracking-[0.2em] text-white/25 uppercase mb-2">Latest Added</p>
                <p class="text-white font-semibold text-sm truncate">{{ sourceStats.latest.title || 'Untitled' }}</p>
              </div>
              <a
                :href="sourceStats.latest.link"
                target="_blank"
                class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/[0.08] text-white/40 hover:text-white hover:border-white/20 text-xs font-medium active:scale-95 transition-all duration-150 shrink-0"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/>
                </svg>
                View
              </a>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center py-16 gap-3 rounded-2xl border border-white/[0.05]">
          <svg class="w-8 h-8 text-white/10" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"/>
          </svg>
          <p class="text-white/20 text-sm">No source stats available</p>
        </div>
      </section>

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
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
};

const getIconSvg = (key) => {
  const k = key.toLowerCase();
  if (k.includes('server'))                         return '<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 17.25v.75a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3v-.75m19.5 0a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3m19.5 0v.75m-19.5-.75v.75M3.75 12h16.5M3.75 7.5h16.5"/>';
  if (k.includes('guild') || k.includes('member')) return '<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Z"/>';
  if (k.includes('user'))                           return '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>';
  if (k.includes('command') || k.includes('cmd'))  return '<path stroke-linecap="round" stroke-linejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"/>';
  if (k.includes('channel'))                        return '<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"/>';
  if (k.includes('ping') || k.includes('latency')) return '<path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/>';
  if (k.includes('uptime'))                         return '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>';
  return '<path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/>';
};

const sourceStatCards = computed(() => {
  if (!sourceStats.value) return [];
  return [
    {
      label: 'Total',
      value: sourceStats.value.total ?? '—',
      iconPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"/>',
    },
    {
      label: 'YouTube',
      value: sourceStats.value.withYoutubeLink ?? '—',
      iconPath: '<path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"/>',
    },
    {
      label: 'With Desc',
      value: sourceStats.value.withDescription ?? '—',
      iconPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"/>',
    },
    {
      label: 'With Editors',
      value: sourceStats.value.withEditors ?? '—',
      iconPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Z"/>',
    },
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
.stat-card { animation: fadeUp 0.25s ease both; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
