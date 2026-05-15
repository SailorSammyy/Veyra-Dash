<template>
  <transition name="modal-fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md"
      @click.self="close"
    >
      <div
        class="bg-[#0a0a0a] w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl border border-white/[0.08] shadow-2xl shadow-black overflow-hidden"
      >
        <div class="flex justify-center pt-3 pb-1 sm:hidden">
          <div class="w-8 h-[3px] bg-white/10 rounded-full"></div>
        </div>
        <div class="px-6 pt-5 pb-4 flex items-start justify-between gap-4 border-b border-white/[0.06]">
          <div>
            <h3 class="text-[15px] font-semibold text-white tracking-tight">
              {{ isEditing ? 'Edit Source' : 'New Source' }}
            </h3>
            <p class="text-xs text-white/30 mt-0.5">
              {{ isEditing ? 'Update the details below.' : 'Fill in the details to add a new source.' }}
            </p>
          </div>
          <button
            @click="close"
            class="w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/40 hover:text-white flex items-center justify-center transition-all duration-150 shrink-0 mt-0.5"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <form @submit.prevent="handleSubmit" class="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div class="space-y-1.5">
            <label class="block text-[11px] font-medium text-white/35 uppercase tracking-[0.12em]">
              Source Link <span class="text-white/60 normal-case tracking-normal">*</span>
            </label>
            <div class="relative">
              <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/>
              </svg>
              <input
                v-model="form.link"
                type="url"
                required
                class="w-full bg-white/[0.04] border border-white/[0.08] focus:border-white/25 focus:bg-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none transition-all duration-150"
                placeholder="https://github.com/..."
              />
            </div>
          </div>
          <div class="space-y-1.5">
            <label class="block text-[11px] font-medium text-white/35 uppercase tracking-[0.12em]">
              YouTube Link <span class="text-white/20 normal-case tracking-normal font-normal">optional</span>
            </label>
            <div class="relative">
              <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <input
                v-model="form.youtube_link"
                type="url"
                class="w-full bg-white/[0.04] border border-white/[0.08] focus:border-white/25 focus:bg-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none transition-all duration-150"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </div>
          <div class="space-y-1.5">
            <label class="block text-[11px] font-medium text-white/35 uppercase tracking-[0.12em]">Title</label>
            <input
              v-model="form.title"
              type="text"
              class="w-full bg-white/[0.04] border border-white/[0.08] focus:border-white/25 focus:bg-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none transition-all duration-150"
              placeholder="Project name..."
            />
          </div>
          <div class="space-y-1.5">
            <label class="block text-[11px] font-medium text-white/35 uppercase tracking-[0.12em]">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full bg-white/[0.04] border border-white/[0.08] focus:border-white/25 focus:bg-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none transition-all duration-150 resize-none leading-relaxed"
              placeholder="Short description..."
            ></textarea>
          </div>
          <div v-if="isOwner" class="space-y-1.5">
            <label class="block text-[11px] font-medium text-white/35 uppercase tracking-[0.12em]">
              Allowed Editors
            </label>
            <input
              v-model="editorsInput"
              type="text"
              class="w-full bg-white/[0.04] border border-white/[0.08] focus:border-white/25 focus:bg-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none transition-all duration-150 font-mono"
              placeholder="Discord User IDs, comma-separated..."
            />
            <p class="text-[11px] text-white/20">Comma-separated Discord User IDs.</p>
          </div>
          <div class="flex gap-2.5 pt-1">
            <button
              type="button"
              @click="close"
              class="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white/40 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] hover:text-white/70 transition-all duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-black bg-white hover:bg-white/90 active:scale-[0.98] transition-all duration-150"
            >
              {{ isEditing ? 'Save Changes' : 'Add Source' }}
            </button>
          </div>

        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useUIStore } from '../stores/ui';

const props = defineProps(['show', 'source', 'isOwner']);
const emit = defineEmits(['close', 'submit']);
const uiStore = useUIStore();

const form = ref({
  link: '',
  youtube_link: '',
  title: '',
  description: '',
  allowed_editors: []
});
const editorsInput = ref('');

const isEditing = computed(() => !!props.source);

watch(() => props.show, (val) => {
  val ? uiStore.openModal() : uiStore.closeModal();
});

watch(() => props.source, (newSource) => {
  if (newSource) {
    form.value = { ...newSource };
    editorsInput.value = (newSource.allowed_editors || []).join(', ');
  } else {
    form.value = { link: '', youtube_link: '', title: '', description: '', allowed_editors: [] };
    editorsInput.value = '';
  }
}, { immediate: true });

const handleSubmit = () => {
  if (props.isOwner) {
    form.value.allowed_editors = editorsInput.value
      .split(',')
      .map(id => id.trim())
      .filter(id => id.length > 0);
  } else {
    delete form.value.allowed_editors;
  }
  emit('submit', form.value);
};

const close = () => emit('close');
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active > div,
.modal-fade-leave-active > div {
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-fade-enter-from > div,
.modal-fade-leave-to > div {
  transform: translateY(32px) scale(0.97);
}
</style>
