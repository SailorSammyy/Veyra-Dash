<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">

    <div
      class="relative z-10 w-full max-w-[380px] px-5 sm:px-0"
      style="animation: fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both;"
    >
      <div class="bg-[#0a0a0a] border border-zinc-800/80 rounded-3xl px-8 py-10">
        <div class="flex flex-col items-center text-center mb-10">
          <div class="w-11 h-11 rounded-2xl bg-white flex items-center justify-center mb-6">
            <i class="fa-solid fa-robot text-[15px] text-black"></i>
          </div>

          <h1 class="text-[26px] font-semibold text-white tracking-[-0.6px] leading-tight mb-2.5">
            Sign in to Veyra
          </h1>
          <p class="text-[14px] text-zinc-500 leading-relaxed max-w-[240px]">
            Connect your Discord account to access the dashboard.
          </p>
        </div>
        <a
          :href="discordAuthUrl"
          class="group flex items-center justify-center gap-2.5 w-full py-[11px] px-5 rounded-xl bg-white hover:bg-zinc-100 active:bg-zinc-200 active:scale-[0.985] transition-all duration-150 select-none"
        >
          <i class="fa-brands fa-discord text-[16px] text-black"></i>
          <span class="text-[14px] font-semibold text-black tracking-[-0.1px]">Continue with Discord</span>
        </a>

        <transition
          enter-active-class="transition-all duration-200 ease-out"
          leave-active-class="transition-all duration-150 ease-in"
          enter-from-class="opacity-0 translate-y-1"
          leave-to-class="opacity-0 translate-y-1"
        >
          <div
            v-if="route.query.error"
            class="mt-3.5 flex items-center gap-2 border border-zinc-800 rounded-xl px-3.5 py-3"
          >
            <i class="fa-solid fa-circle-exclamation text-zinc-500 text-xs shrink-0"></i>
            <p class="text-zinc-400 text-[12.5px]">Authentication failed. Please try again.</p>
          </div>
        </transition>
        <div class="h-px bg-zinc-800/80 mt-8 mb-5"></div>
        <p class="text-[12px] text-zinc-600 text-center leading-relaxed">
          By continuing, you agree to our
          <span class="text-zinc-400 hover:text-zinc-300 cursor-pointer transition-colors duration-100 underline underline-offset-2 decoration-zinc-700">terms of service</span>.
          <br />Only server members may access the dashboard.
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const discordAuthUrl = computed(() => {
  return `${import.meta.env.VITE_API_BASE_URL}/auth/discord`;
});
</script>

<style scoped>
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>