<template>
  <transition name="modal-fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm"
      @click.self="close"
    >
      <div class="bg-zinc-950 w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden">

        <div class="flex justify-center pt-3 pb-1 sm:hidden">
          <div class="w-10 h-1 bg-zinc-700 rounded-full"></div>
        </div>

        <div class="px-6 py-4 flex justify-between items-center border-b border-zinc-800/80">
          <div>
            <h3 class="text-base font-bold text-white">
              {{ isEditing ? 'Edit Repository' : 'Add Repository' }}
            </h3>
            <p class="text-xs text-zinc-500 mt-0.5">
              {{ isEditing ? 'Update the details below.' : 'Fill in the details to add a new repo.' }}
            </p>
          </div>
          <button
            @click="close"
            class="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-150"
          >
            <i class="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="p-6 space-y-4 max-h-[75vh] overflow-y-auto">

          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Source Link <span class="text-white">*</span>
            </label>
            <div class="relative">
              <i class="fa-solid fa-link absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm"></i>
              <input
                v-model="form.link"
                type="url"
                required
                class="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-600 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors duration-150"
                placeholder="https://github.com/user/repo"
              />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              YouTube Link <span class="text-zinc-600">(optional)</span>
            </label>
            <div class="relative">
              <i class="fa-brands fa-youtube absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm"></i>
              <input
                v-model="form.youtube_link"
                type="url"
                class="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-600 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors duration-150"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Title</label>
            <input
              v-model="form.title"
              type="text"
              class="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-600 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors duration-150"
              placeholder="Project name..."
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-600 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors duration-150 resize-none"
              placeholder="Short description..."
            ></textarea>
          </div>

          <div v-if="isOwner" class="space-y-1.5">
            <label class="block text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              <i class="fa-solid fa-user-shield mr-1"></i> Allowed Editors
            </label>
            <input
              v-model="editorsInput"
              type="text"
              class="w-full bg-zinc-900 border border-zinc-800 focus:border-indigo-600/60 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none font-mono transition-colors duration-150"
              placeholder="Discord User IDs, comma-separated..."
            />
            <p class="text-xs text-zinc-600">Comma-separated Discord User IDs.</p>
          </div>

          <div class="flex gap-3 pt-2">
            <button
              type="button"
              @click="close"
              class="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-400 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-all duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-black bg-white hover:bg-zinc-200 active:scale-95 transition-all duration-150 shadow-lg"
            >
              {{ isEditing ? 'Update' : 'Add Repository' }}
            </button>
          </div>

        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useUIStore } from '../../stores/ui';

const props = defineProps(['show', 'repo', 'isOwner']);
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

const isEditing = computed(() => !!props.repo);

watch(() => props.show, (val) => {
  val ? uiStore.openModal() : uiStore.closeModal();
});

watch(() => props.repo, (newRepo) => {
  if (newRepo) {
    form.value = { ...newRepo };
    editorsInput.value = (newRepo.allowed_editors || []).join(', ');
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
  transform: translateY(40px) scale(0.97);
}
</style>