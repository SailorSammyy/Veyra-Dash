import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUIStore = defineStore('ui', () => {
  const isModalOpen = ref(false);

  const openModal = () => { isModalOpen.value = true; };
  const closeModal = () => { isModalOpen.value = false; };

  return { isModalOpen, openModal, closeModal };
});