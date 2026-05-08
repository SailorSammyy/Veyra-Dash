<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Source Code</h1>
      </div>
      <button
        v-if="authStore.isOwner"
        @click="openModal()"
        class="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-zinc-200 active:scale-95 transition-all duration-150 shadow-lg w-full sm:w-auto justify-center"
      >
        <i class="fa-solid fa-plus text-xs"></i>
        Add Source
      </button>
    </div>

    <div v-if="loading" class="flex flex-col items-center justify-center py-20 gap-3">
      <div class="w-8 h-8 border-2 border-zinc-700 border-t-white rounded-full animate-spin"></div>
      <p class="text-zinc-500 text-sm">Loading sources...</p>
    </div>

    <div v-else-if="sources.length === 0" class="flex flex-col items-center justify-center py-20 gap-3 bg-zinc-900/60 rounded-2xl border border-zinc-800">
      <div class="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center">
        <i class="fa-solid fa-code-branch text-zinc-500 text-xl"></i>
      </div>
      <p class="text-zinc-400 font-medium">No source code found</p>
      <p class="text-zinc-600 text-sm">Add one to get started.</p>
    </div>

    <div v-else class="hidden md:block bg-zinc-900/60 rounded-2xl border border-zinc-800 overflow-hidden shadow-xl">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b border-zinc-800">
            <th class="px-5 py-3.5 text-xs font-semibold text-zinc-500 uppercase tracking-widest w-12 text-center">#</th>
            <th class="px-5 py-3.5 text-xs font-semibold text-zinc-500 uppercase tracking-widest">Title</th>
            <th class="px-5 py-3.5 text-xs font-semibold text-zinc-500 uppercase tracking-widest">Resources</th>
            <th class="px-5 py-3.5 text-xs font-semibold text-zinc-500 uppercase tracking-widest">Description</th>
            <th class="px-5 py-3.5 text-xs font-semibold text-zinc-500 uppercase tracking-widest text-right w-24">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(source, index) in sources"
            :key="source.id"
            class="border-b border-zinc-800/70 last:border-0 hover:bg-zinc-800/40 transition-colors duration-100 group"
          >
            <td class="px-5 py-4 text-center text-zinc-600 font-mono text-xs">
              {{ String(index + 1).padStart(2, '0') }}
            </td>

            <td class="px-5 py-4">
              <span class="text-white font-medium text-sm">{{ source.title || 'Untitled' }}</span>
              <div v-if="source.allowed_editors?.length" class="flex items-center gap-1 mt-1">
                <i class="fa-solid fa-users text-zinc-400 text-xs"></i>
                <span class="text-xs text-zinc-400">{{ source.allowed_editors.length }} editor(s)</span>
              </div>
            </td>

            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <a
                  :href="source.link"
                  target="_blank"
                  class="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all duration-150"
                  title="View Code"
                >
                  <i class="fa-solid fa-link text-sm"></i>
                </a>
                <a
                  v-if="source.youtube_link"
                  :href="source.youtube_link"
                  target="_blank"
                  class="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all duration-150"
                  title="Watch Tutorial"
                >
                  <i class="fa-brands fa-youtube text-sm"></i>
                </a>
              </div>
            </td>

            <td class="px-5 py-4 text-zinc-500 text-sm max-w-xs truncate">
              {{ source.description || '—' }}
            </td>

            <td class="px-5 py-4 text-right">
              <template v-if="canEdit(source)">
                <div class="flex items-center justify-end gap-1">
                  <button
                    @click="openModal(source)"
                    class="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all duration-150 flex items-center justify-center"
                    title="Edit"
                  >
                    <i class="fa-solid fa-pen text-xs"></i>
                  </button>
                  <button
                    @click="deleteSource(source.id)"
                    class="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all duration-150 flex items-center justify-center"
                    title="Delete"
                  >
                    <i class="fa-solid fa-trash text-xs"></i>
                  </button>
                </div>
              </template>
              <span v-else class="text-xs text-zinc-600 border border-zinc-800 px-2 py-1 rounded-lg">Read Only</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile cards -->
    <div v-if="!loading && sources.length > 0" class="md:hidden space-y-3">
      <div
        v-for="(source, index) in sources"
        :key="source.id"
        class="bg-zinc-900/70 rounded-2xl border border-zinc-800 p-4 space-y-3"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <span class="text-xs font-mono text-zinc-600 shrink-0">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="min-w-0">
              <p class="text-white font-semibold text-sm truncate">{{ source.title || 'Untitled' }}</p>
              <div v-if="source.allowed_editors?.length" class="flex items-center gap-1 mt-0.5">
                <i class="fa-solid fa-users text-zinc-400 text-xs"></i>
                <span class="text-xs text-zinc-400">{{ source.allowed_editors.length }} editor(s)</span>
              </div>
            </div>
          </div>

          <div v-if="canEdit(source)" class="flex items-center gap-1 shrink-0">
            <button
              @click="openModal(source)"
              class="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all duration-150 flex items-center justify-center"
            >
              <i class="fa-solid fa-pen text-xs"></i>
            </button>
            <button
              @click="deleteSource(source.id)"
              class="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-all duration-150 flex items-center justify-center"
            >
              <i class="fa-solid fa-trash text-xs"></i>
            </button>
          </div>
          <span v-else class="text-xs text-zinc-600 border border-zinc-800 px-2 py-1 rounded-lg shrink-0">Read Only</span>
        </div>

        <p v-if="source.description" class="text-zinc-500 text-xs leading-relaxed line-clamp-2">
          {{ source.description }}
        </p>

        <div class="flex items-center gap-2 pt-1">
          <a
            :href="source.link"
            target="_blank"
            class="inline-flex items-center gap-2 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg transition-all duration-150"
          >
            <i class="fa-solid fa-link text-sm"></i>
            Link
          </a>
          <a
            v-if="source.youtube_link"
            :href="source.youtube_link"
            target="_blank"
            class="inline-flex items-center gap-2 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg transition-all duration-150"
          >
            <i class="fa-brands fa-youtube text-sm"></i>
            YouTube
          </a>
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
import { ref, onMounted } from 'vue';
import api from '../services/api';
import SourceModal from '../components/SourceModal.vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const sources = ref([]);
const loading = ref(true);
const showModal = ref(false);
const currentSource = ref(null);

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
