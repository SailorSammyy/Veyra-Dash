<template>
  <transition
    enter-active-class="transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
    leave-active-class="transition-all duration-200 ease-in"
    enter-from-class="opacity-0 translate-y-4 scale-95"
    leave-to-class="opacity-0 translate-y-4 scale-95"
  >
    <div
      v-if="!uiStore.isModalOpen"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
    >

      <transition
        enter-active-class="transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        leave-active-class="transition-all duration-150 ease-in"
        enter-from-class="opacity-0 translate-y-2 scale-95"
        leave-to-class="opacity-0 translate-y-2 scale-95"
      >
        <div
          v-if="isUserMenuOpen"
          class="w-60 bg-[#0a0a0a] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/80"
        >
          <div class="px-4 py-3.5 flex items-center gap-3 border-b border-zinc-800/70">
            <div class="relative shrink-0">
              <img
                v-if="authStore.user?.avatar"
                :src="authStore.user.avatar"
                class="w-9 h-9 rounded-xl object-cover"
              />
              <div
                v-else
                class="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center"
              >
                <i class="fa-solid fa-user text-zinc-500 text-xs"></i>
              </div>
              <span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-[#0a0a0a] rounded-full"></span>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-white text-[13px] font-semibold tracking-[-0.2px] truncate leading-tight">
                {{ authStore.user?.username || 'User' }}
              </p>
              <p class="text-zinc-600 text-[11px] mt-0.5">
                {{ authStore.isOwner ? 'Owner' : 'Member' }}
              </p>
            </div>
          </div>
          <div class="p-1.5">
            <button
              @click="logout"
              class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-zinc-400 hover:text-red-400 hover:bg-red-500/8 transition-all duration-150"
            >
              <i class="fa-solid fa-right-from-bracket text-xs shrink-0"></i>
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </transition>
      <div
        ref="navBar"
        class="bg-[#0a0a0a] border border-zinc-800 rounded-2xl px-1.5 py-1.5 flex items-center gap-0.5 shadow-2xl shadow-black/70"
      >
        <router-link to="/" custom v-slot="{ navigate, href, isExactActive }">
          <a
            :href="href"
            @click="navigate"
            :class="[
              'flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-medium tracking-[-0.1px] transition-all duration-150 whitespace-nowrap',
              isExactActive
                ? 'bg-white text-black'
                : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
            ]"
          >
            <i class="fa-solid fa-house text-[12px] shrink-0"></i>
            <span>Home</span>
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
              'flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-medium tracking-[-0.1px] transition-all duration-150 whitespace-nowrap',
              isExactActive
                ? 'bg-white text-black'
                : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
            ]"
          >
            <i class="fa-solid fa-code-branch text-[12px] shrink-0"></i>
            <span>Sources</span>
          </a>
        </router-link>

        <div class="w-px h-4 bg-zinc-800 mx-1 shrink-0"></div>
        <button
          @click.stop="toggleUserMenu"
          :class="[
            'flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-xl transition-all duration-150',
            isUserMenuOpen ? 'bg-zinc-900' : 'hover:bg-zinc-900'
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
              class="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center"
            >
              <i class="fa-solid fa-user text-zinc-500 text-xs"></i>
            </div>
            <span class="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 border-[1.5px] border-[#0a0a0a] rounded-full"></span>
          </div>
          <span class="hidden sm:block text-[13px] font-medium tracking-[-0.1px] text-zinc-300 max-w-[72px] truncate leading-none">
            {{ authStore.user?.username || 'Profile' }}
          </span>
          <i
            :class="[
              'fa-solid fa-chevron-up text-zinc-600 text-[10px] transition-transform duration-200 hidden sm:block',
              isUserMenuOpen ? 'rotate-0' : 'rotate-180'
            ]"
          ></i>
        </button>

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

onMounted(() => window.addEventListener('click', handleOutsideClick));
onBeforeUnmount(() => window.removeEventListener('click', handleOutsideClick));
</script>