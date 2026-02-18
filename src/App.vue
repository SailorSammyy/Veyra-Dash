<template>
  <div id="app" class="flex flex-col min-h-screen bg-zinc-950">
    
    <main class="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <FloatingNav />
  </div>
</template>

<script setup>
import FloatingNav from './components/Layout/FloatingNav.vue';
</script>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>