<template>
  <transition name="nav-slide">
    <div
      v-if="!uiStore.isModalOpen"
      class="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
    >

      <!-- User Dropdown -->
      <transition name="pop-up">
        <div
          v-if="isUserMenuOpen"
          class="w-64 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          <!-- Profile Header -->
          <div class="p-3 flex items-center gap-3 border-b border-zinc-800/80 bg-zinc-900/60">
            <div class="relative shrink-0">
              <img
                v-if="authStore.user?.avatar"
                :src="authStore.user.avatar"
                class="w-10 h-10 rounded-xl object-cover border border-zinc-700"
              />
              <div
                v-else
                class="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center"
              >
                <i class="fa-solid fa-user text-zinc-500 text-sm"></i>
              </div>
              <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-zinc-950 rounded-full"></span>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-white font-bold text-sm truncate">{{ authStore.user?.username || 'User' }}</p>
              <p class="text-xs text-zinc-500">{{ authStore.isOwner ? '👑 Owner' : 'Member' }}</p>
            </div>
          </div>

          <!-- Menu Items -->
          <div class="p-1.5">
            <button
              @click="logout"
              class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-950/50 hover:text-red-300 transition-all duration-150"
            >
              <i class="fa-solid fa-right-from-bracket text-xs w-4 text-center"></i>
              Sign out
            </button>
          </div>
        </div>
      </transition>

      <!-- Floating Bar -->
      <div
        ref="navBar"
        class="bg-zinc-950/95 backdrop-blur-xl border border-zinc-800 rounded-2xl p-1.5 flex items-center gap-0.5 shadow-2xl shadow-black/60"
      >

        <!-- Home -->
        <router-link to="/" custom v-slot="{ navigate, href, isExactActive }">
          <a
            :href="href"
            @click="navigate"
            :class="[
              'flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium whitespace-nowrap',
              isExactActive
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            ]"
          >
            <i class="fa-solid fa-house text-sm shrink-0"></i>
            <span>Home</span>
          </a>
        </router-link>

        <!-- Repos -->
        <router-link
          v-if="authStore.isInServer"
          to="/code"
          custom
          v-slot="{ navigate, href, isExactActive }"
        >
          <a
            :href="href"
            @click="navigate"
            :class="[
              'flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium whitespace-nowrap',
              isExactActive
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            ]"
          >
            <i class="fa-solid fa-code-branch text-sm shrink-0"></i>
            <span>Repos</span>
          </a>
        </router-link>

        <!-- Divider -->
        <div class="w-px h-5 bg-zinc-800 mx-1 shrink-0"></div>

        <!-- User Profile Button -->
        <button
          @click.stop="toggleUserMenu"
          :class="[
            'flex items-center gap-2 px-2 py-1.5 rounded-xl transition-all duration-200 shrink-0',
            isUserMenuOpen ? 'bg-zinc-800' : 'hover:bg-zinc-800'
          ]"
        >
          <!-- Avatar -->
          <div class="relative w-7 h-7 shrink-0">
            <img
              v-if="authStore.user?.avatar"
              :src="authStore.user.avatar"
              class="w-7 h-7 rounded-lg object-cover block"
            />
            <div
              v-else
              class="w-7 h-7 rounded-lg bg-zinc-700 flex items-center justify-center"
            >
              <i class="fa-solid fa-user text-zinc-400 text-xs"></i>
            </div>
            <!-- Online dot -->
            <span class="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 border-[1.5px] border-zinc-950 rounded-full"></span>
          </div>
          <!-- Username (sm and up) -->
          <span class="hidden sm:block text-sm font-medium text-zinc-300 max-w-[80px] truncate leading-none">
            {{ authStore.user?.username || 'Profile' }}
          </span>
          <i
            :class="[
              'fa-solid fa-chevron-up text-zinc-600 text-xs transition-transform duration-200 hidden sm:block',
              isUserMenuOpen ? '' : 'rotate-180'
            ]"
          ></i>
        </button>

      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useUIStore } from '../../stores/ui';

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

<style scoped>
.pop-up-enter-active {
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-up-leave-active {
  transition: all 0.15s ease-in;
}
.pop-up-enter-from,
.pop-up-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
}

.nav-slide-enter-active {
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.nav-slide-leave-active {
  transition: all 0.2s ease-in;
}
.nav-slide-enter-from,
.nav-slide-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(16px) scale(0.95);
}
.nav-slide-enter-to,
.nav-slide-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0) scale(1);
}
</style>