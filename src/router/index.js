import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Repositories from '../views/Repositories.vue';
import AuthCallback from '../views/AuthCallback.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/auth-callback',
      name: 'auth-callback',
      component: AuthCallback
    },
    {
      path: '/code',
      name: 'source',
      component: Repositories,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  
  if (authStore.token && !authStore.user) {
    await authStore.fetchUser();
  }

  if (to.path === '/code') {
    if (!authStore.isAuthenticated) {
      next('/login');
    } else if (!authStore.isInServer) {
      next('/?error=not_in_server');
    } else {
      next();
    }
  } 
  else if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresOwner && !authStore.isOwner) {
    next('/'); 
  } else {
    next();
  }
});

export default router;