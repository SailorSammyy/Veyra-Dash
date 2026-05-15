<template>
  <div class="min-h-screen text-white px-4 sm:px-10 py-8 sm:py-12">

    <div class="max-w-5xl mx-auto space-y-10">
      <div class="space-y-4">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-[10px] tracking-[0.3em] text-white/25 uppercase mb-1.5">Repository</p>
            <h1 class="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-none">Source Code</h1>
            <p class="text-xs text-white/25 mt-2">{{ filteredSources.length }}{{ search ? ` of ${sources.length}` : ` ${sources.length === 1 ? 'entry' : 'entries'}` }}</p>
          </div>
          <button
            v-if="authStore.isOwner"
            @click="openModal()"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 active:scale-95 transition-all duration-150 shrink-0 mt-1"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
            </svg>
            <span class="hidden sm:inline">Add Source</span>
            <span class="sm:hidden">Add</span>
          </button>
        </div>
        <div class="relative">
          <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="Search sources..."
            class="w-full sm:w-72 bg-white/[0.04] border border-white/[0.08] focus:border-white/20 focus:bg-white/[0.06] rounded-xl pl-9 pr-9 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none transition-all duration-150"
          />
          <button
            v-if="search"
            @click="search = ''"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors duration-150 p-0.5"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
      <div v-if="loading" class="flex flex-col items-center justify-center py-40 gap-4">
        <div class="w-6 h-6 rounded-full border border-white/10 border-t-white/60 animate-spin"></div>
        <p class="text-xs text-white/20 tracking-widest uppercase">Loading</p>
      </div>
      <div
        v-else-if="filteredSources.length === 0"
        class="flex flex-col items-center justify-center py-40 gap-3 rounded-2xl"
      >
        <div class="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center">
          <svg class="w-4.5 h-4.5 text-white/20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"/>
          </svg>
        </div>
        <p class="text-white/30 text-sm font-medium">{{ search ? 'No results found' : 'No sources yet' }}</p>
        <p class="text-white/15 text-xs">{{ search ? `Nothing matched "${search}"` : 'Add one to get started' }}</p>
      </div>
      <div v-else class="hidden lg:block rounded-2xl border border-white/[0.06] overflow-hidden">
        <div class="grid grid-cols-[4rem_1fr_8rem_2fr_6rem] bg-white/[0.02] border-b border-white/[0.06] px-2">
          <div class="px-3 py-3 text-[10px] tracking-[0.2em] text-white/20 uppercase">#</div>
          <div class="px-4 py-3 text-[10px] tracking-[0.2em] text-white/20 uppercase">Title</div>
          <div class="px-4 py-3 text-[10px] tracking-[0.2em] text-white/20 uppercase">Links</div>
          <div class="px-4 py-3 text-[10px] tracking-[0.2em] text-white/20 uppercase">Description</div>
          <div class="px-4 py-3 text-[10px] tracking-[0.2em] text-white/20 uppercase text-right">Actions</div>
        </div>
        <div
          v-for="(source, index) in filteredSources"
          :key="source.id"
          class="source-row group grid grid-cols-[4rem_1fr_8rem_2fr_6rem] border-b border-white/[0.04] last:border-0 hover:bg-white/[0.03] transition-colors duration-150 px-2"
        >
          <div class="px-3 py-4 flex items-center gap-2">
            <div class="w-[2px] h-4 rounded-full bg-gradient-to-b from-white/20 to-transparent group-hover:from-white/50 transition-all duration-200 shrink-0"></div>
            <span class="text-[11px] tabular-nums text-white/20 group-hover:text-white/50 transition-colors duration-150">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
          </div>
          <div class="px-4 py-4 flex flex-col justify-center gap-1 min-w-0">
            <span class="text-white/85 font-medium text-sm truncate">{{ source.title || 'Untitled' }}</span>
            <div v-if="source.allowed_editors?.length" class="flex items-center gap-1.5">
              <svg class="w-3 h-3 text-white/20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Z"/>
              </svg>
              <span class="text-[11px] text-white/20">{{ source.allowed_editors.length }} editor{{ source.allowed_editors.length > 1 ? 's' : '' }}</span>
            </div>
          </div>
          <div class="px-4 py-4 flex items-center gap-1.5">
            <a
              :href="source.link"
              target="_blank"
              title="View Code"
              class="w-7 h-7 rounded-lg border border-white/[0.07] flex items-center justify-center text-white/25 hover:text-white hover:border-white/25 hover:bg-white/[0.06] transition-all duration-150"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/>
              </svg>
            </a>
            <a
              v-if="source.youtube_link"
              :href="source.youtube_link"
              target="_blank"
              title="Watch Tutorial"
              class="w-7 h-7 rounded-lg border border-white/[0.07] flex items-center justify-center text-white/25 hover:text-white hover:border-white/25 hover:bg-white/[0.06] transition-all duration-150"
            >
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
          <div class="px-4 py-4 flex items-center min-w-0">
            <p class="text-white/20 text-xs truncate group-hover:text-white/40 transition-colors duration-150">
              {{ source.description || '—' }}
            </p>
          </div>
          <div class="px-4 py-4 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <template v-if="canEdit(source)">
              <button
                @click="openModal(source)"
                title="Edit"
                class="w-7 h-7 rounded-lg border border-white/[0.07] flex items-center justify-center text-white/30 hover:text-white hover:border-white/25 hover:bg-white/[0.06] transition-all duration-150"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"/>
                </svg>
              </button>
              <button
                @click="deleteSource(source.id)"
                title="Delete"
                class="w-7 h-7 rounded-lg border border-white/[0.07] flex items-center justify-center text-white/30 hover:text-red-400 hover:border-red-400/20 hover:bg-red-400/[0.05] transition-all duration-150"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                </svg>
              </button>
            </template>
            <span v-else class="text-[10px] text-white/15 border border-white/[0.06] px-2 py-1 rounded-lg tracking-widest uppercase">
              View
            </span>
          </div>
        </div>
      </div>
      <div v-if="!loading && filteredSources.length > 0" class="lg:hidden space-y-0 pb-24">
        <div
          v-for="(source, index) in filteredSources"
          :key="source.id"
          class="source-row relative py-4 border-b border-white/[0.05] last:border-0 space-y-3 transition-all duration-200"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-3 min-w-0">
              <div class="shrink-0 flex items-center gap-2 pt-0.5">
                <div class="w-[2px] h-4 rounded-full bg-gradient-to-b from-white/40 to-white/0"></div>
                <span class="text-[11px] tabular-nums text-white/25 w-5">
                  {{ String(index + 1).padStart(2, '0') }}
                </span>
              </div>
              <div class="min-w-0">
                <h3 class="text-white font-semibold text-[15px] leading-snug">{{ source.title || 'Untitled' }}</h3>
                <div v-if="source.allowed_editors?.length" class="flex items-center gap-1.5 mt-1">
                  <svg class="w-3 h-3 text-white/20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Z"/>
                  </svg>
                  <span class="text-[11px] text-white/20">{{ source.allowed_editors.length }} editor{{ source.allowed_editors.length > 1 ? 's' : '' }}</span>
                </div>
              </div>
            </div>

            <div v-if="canEdit(source)" class="flex items-center gap-1.5 shrink-0">
              <button
                @click="openModal(source)"
                class="w-8 h-8 rounded-xl border border-white/[0.08] flex items-center justify-center text-white/25 hover:text-white hover:border-white/25 hover:bg-white/[0.06] active:scale-95 transition-all duration-150"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"/>
                </svg>
              </button>
              <button
                @click="deleteSource(source.id)"
                class="w-8 h-8 rounded-xl border border-white/[0.08] flex items-center justify-center text-white/25 hover:text-red-400 hover:border-red-400/25 hover:bg-red-400/[0.06] active:scale-95 transition-all duration-150"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                </svg>
              </button>
            </div>
            <span v-else class="text-[10px] text-white/15 border border-white/[0.07] px-2.5 py-1 rounded-lg tracking-widest uppercase shrink-0">View</span>
          </div>
          <p v-if="source.description" class="text-white/30 text-[13px] leading-relaxed line-clamp-2 pl-9">
            {{ source.description }}
          </p>
          <div class="flex items-center gap-2 pl-9">
            <a
              :href="source.link"
              target="_blank"
              class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/[0.08] text-white/35 hover:text-white hover:border-white/20 text-xs font-medium active:scale-95 transition-all duration-150"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/>
              </svg>
              Source
            </a>
            <a
              v-if="source.youtube_link"
              :href="source.youtube_link"
              target="_blank"
              class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/[0.08] text-white/35 hover:text-white hover:border-white/20 text-xs font-medium active:scale-95 transition-all duration-150"
            >
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube
            </a>
          </div>
        </div>
      </div>

    </div>

    <SourceModal
      :show="showModal"
      :source="currentSource"
      :is-owner="authStore.isOwner"
      @close="closeModal"
      @submit="handleSave"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '../services/api';
import SourceModal from '../components/SourceModal.vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const sources = ref([]);
const loading = ref(true);
const showModal = ref(false);
const currentSource = ref(null);
const search = ref('');

const filteredSources = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return sources.value;
  return sources.value.filter(s =>
    (s.title || '').toLowerCase().includes(q) ||
    (s.description || '').toLowerCase().includes(q)
  );
});

const canEdit = (source) => {
  if (!authStore.user) return false;
  if (authStore.isOwner) return true;
  return source.allowed_editors && source.allowed_editors.includes(authStore.user.id);
};

const fetchSources = async () => {
  loading.value = true;
  try {
    const res = await api.get('/api/source');
    sources.value = res.data;
  } catch (error) {
    console.error('Failed to load sources', error);
  } finally {
    loading.value = false;
  }
};

const openModal = (source = null) => {
  currentSource.value = source;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  currentSource.value = null;
};

const handleSave = async (data) => {
  try {
    if (currentSource.value) {
      await api.put(`/api/source/${currentSource.value.id}`, data);
    } else {
      await api.post('/api/source', data);
    }
    closeModal();
    fetchSources();
  } catch (error) {
    alert(error.response?.data?.error || 'Error saving source');
  }
};

const deleteSource = async (id) => {
  if (!confirm('Are you sure you want to delete this source?')) return;
  try {
    await api.delete(`/api/source/${id}`);
    fetchSources();
  } catch (error) {
    alert(error.response?.data?.error || 'Error deleting source');
  }
};

onMounted(fetchSources);
</script>

<style scoped>
.source-row { animation: fadeUp 0.2s ease both; }
.source-row:nth-child(1) { animation-delay: 0.03s; }
.source-row:nth-child(2) { animation-delay: 0.06s; }
.source-row:nth-child(3) { animation-delay: 0.09s; }
.source-row:nth-child(4) { animation-delay: 0.12s; }
.source-row:nth-child(5) { animation-delay: 0.15s; }
.source-row:nth-child(6) { animation-delay: 0.18s; }
.source-row:nth-child(7) { animation-delay: 0.21s; }
.source-row:nth-child(8) { animation-delay: 0.24s; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
