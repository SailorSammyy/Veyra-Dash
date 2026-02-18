<template>
  <!-- Fixed full-screen, breaks out of App.vue's container entirely -->
  <div class="login-root fixed inset-0 z-50 flex items-center justify-center bg-zinc-950 overflow-hidden">

    <div class="grid-bg absolute inset-0 pointer-events-none"></div>

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[140px] pointer-events-none"></div>

    <div class="login-card relative z-10 w-full px-4 sm:px-0 sm:w-[360px]">

      <div class="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent mb-px"></div>

      <div class="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/60">

        <div class="flex flex-col items-center mb-7">
          <div class="w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4 shadow-lg">
            <i class="fa-solid fa-robot text-2xl text-indigo-400"></i>
          </div>
          <h1 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Veyra</h1>
          <p class="text-zinc-500 text-xs sm:text-sm mt-1.5 text-center leading-relaxed">
            Sign in with Discord to access your dashboard.
          </p>
        </div>

        <a
          :href="discordAuthUrl"
          class="discord-btn relative flex items-center justify-center gap-3 w-full py-3 px-5 rounded-xl font-semibold text-sm text-white overflow-hidden shadow-lg"
        >
          <span class="discord-btn-bg absolute inset-0 transition-colors duration-200"></span>
          <i class="fa-brands fa-discord text-lg relative z-10"></i>
          <span class="relative z-10">Continue with Discord</span>
        </a>

        <transition name="err-fade">
          <div
            v-if="route.query.error"
            class="mt-4 flex items-center gap-2 bg-red-950/50 border border-red-900/60 rounded-xl px-3 py-2.5"
          >
            <i class="fa-solid fa-circle-exclamation text-red-400 text-sm shrink-0"></i>
            <p class="text-red-400 text-xs">Authentication failed. Please try again.</p>
          </div>
        </transition>

        <p class="text-zinc-600 text-xs text-center mt-5 leading-relaxed">
          By continuing, you agree to our terms.<br>
          Only server members may access the dashboard.
        </p>

      </div>

      <div class="h-px w-full bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent mt-px"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const discordAuthUrl = computed(() => {
  return `https://veyra-backend.vercel.app/auth/discord`;
});
</script>

<style scoped>
.grid-bg {
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
}

.login-card {
  animation: card-in 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes card-in {
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
}

.discord-btn-bg { background-color: #5865F2; }
.discord-btn:hover .discord-btn-bg { background-color: #4752c4; }
.discord-btn:active { transform: scale(0.98); }
.discord-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%);
  border-radius: inherit;
  pointer-events: none;
}

.err-fade-enter-active { transition: all 0.25s ease; }
.err-fade-leave-active { transition: all 0.2s ease;  }
.err-fade-enter-from,
.err-fade-leave-to { opacity: 0; transform: translateY(-4px); }
</style>