<template>
  <transition
    enter-active-class="transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
    leave-active-class="transition-all duration-200 ease-in"
    enter-from-class="opacity-0 translate-y-4 scale-95"
    leave-to-class="opacity-0 translate-y-4 scale-95"
  >
    <div
      v-if="!uiStore.isModalOpen"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
    >
      <div
        ref="navBar"
        class="relative flex items-center gap-0.5 px-1.5 py-1.5 rounded-2xl border border-white/[0.1] bg-white/[0.06] backdrop-blur-xl shadow-xl shadow-black/40"
      >
        <router-link to="/" custom v-slot="{ navigate, href, isExactActive }">
          <a
            :href="href"
            @click="navigate"
            :class="[
              'relative flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 whitespace-nowrap select-none',
              isExactActive
                ? 'text-white bg-white/[0.12]'
                : 'text-white/40 hover:text-white/80 hover:bg-white/[0.06]'
            ]"
          >
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline stroke-linecap="round" stroke-linejoin="round" points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>Home</span>
            <span v-if="isExactActive" class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/60"></span>
          </a>
        </router-link>
        <router-link
          v-if="authStore.isInServer"
          to="/source"
          custom
          v-slot="{ navigate, href, isExactActive }"
        >
          <a
            :href="href"
            @click="navigate"
            :class="[
              'relative flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 whitespace-nowrap select-none',
              isExactActive
                ? 'text-white bg-white/[0.12]'
                : 'text-white/40 hover:text-white/80 hover:bg-white/[0.06]'
            ]"
          >
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"/>
            </svg>
            <span>Sources</span>
            <span v-if="isExactActive" class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/60"></span>
          </a>
        </router-link>
        <div class="w-px h-4 bg-white/[0.1] mx-1 shrink-0"></div>
        <button
          @click.stop="toggleUserMenu"
          :class="[
            'flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl transition-all duration-150 select-none',
            isUserMenuOpen ? 'bg-white/[0.1]' : 'hover:bg-white/[0.06]'
          ]"
        >
          <div class="relative w-7 h-7 shrink-0">
            <img
              v-if="authStore.user?.avatar"
              :src="authStore.user.avatar"
              class="w-7 h-7 rounded-lg object-cover"
            />
            <div
              v-else
              class="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center"
            >
              <svg class="w-3.5 h-3.5 text-white/40" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
              </svg>
            </div>
            <span class="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 border-[1.5px] border-black/60 rounded-full"></span>
          </div>
          <span class="hidden sm:block text-[13px] font-medium text-white/70 max-w-[80px] truncate leading-none">
            {{ authStore.user?.username || 'Profile' }}
          </span>
          <svg
            :class="['w-3 h-3 text-white/30 transition-transform duration-200 hidden sm:block shrink-0', isUserMenuOpen ? 'rotate-180' : '']"
            fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m19 9-7 7-7-7"/>
          </svg>
        </button>

        <transition
          enter-active-class="transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          leave-active-class="transition-all duration-150 ease-in"
          enter-from-class="opacity-0 translate-y-2 scale-95"
          leave-to-class="opacity-0 translate-y-2 scale-95"
        >
          <div
            v-if="isUserMenuOpen"
            class="absolute bottom-[calc(100%+10px)] right-0 w-60 rounded-2xl border border-white/[0.08] bg-[#111111]/90 backdrop-blur-2xl shadow-2xl shadow-black/80 overflow-hidden origin-bottom-right"
          >
            <div class="px-4 py-3.5 flex items-center gap-3 border-b border-white/[0.07]">
              <div class="relative shrink-0">
                <img
                  v-if="authStore.user?.avatar"
                  :src="authStore.user.avatar"
                  class="w-9 h-9 rounded-xl object-cover"
                />
                <div
                  v-else
                  class="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center"
                >
                  <svg class="w-4 h-4 text-white/40" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                  </svg>
                </div>
                <span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-[1.5px] border-black/50 rounded-full"></span>
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-white text-[13px] font-semibold truncate leading-tight">
                  {{ authStore.user?.username || 'User' }}
                </p>
                <p class="text-white/50 text-[11px] mt-0.5">
                  {{ authStore.isOwner ? 'Owner' : 'Member' }}
                </p>
              </div>
            </div>
            <div class="p-1.5">
              <button
                @click="logout"
                class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-white/60 hover:text-white hover:bg-white/[0.06] active:scale-[0.98] transition-all duration-150 group"
              >
                <svg class="w-3.5 h-3.5 shrink-0 group-hover:text-red-400 transition-colors duration-150" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"/>
                </svg>
                <span class="group-hover:text-red-400 transition-colors duration-150">Sign out</span>
              </button>
            </div>
          </div>
        </transition>

      </div>

    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useUIStore } from '../stores/ui';

const authStore = useAuthStore();
const uiStore = useUIStore();
const isUserMenuOpen = ref(false);
const navBar = ref(null);

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

const logout = () => {
  authStore.logout();
  isUserMenuOpen.value = false;
};

const handleOutsideClick = (e) => {
  if (navBar.value && !navBar.value.contains(e.target)) {
    isUserMenuOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleOutsideClick);
});
</script>

<style scoped>
</style>
