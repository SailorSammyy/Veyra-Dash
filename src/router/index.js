import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Source from '../views/Source.vue';
import AuthCallback from '../views/AuthCallback.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/auth-callback',
      name: 'auth-callback',
      component: AuthCallback,
    },
    {
      path: '/source',
      name: 'source',
      component: Source,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.initialized) {
    await authStore.fetchUser();
  }

  if (to.name === 'auth-callback' || to.name === 'login') {
    return next();
  }

  if (to.path === '/source') {
    if (!authStore.isAuthenticated) {
      return next('/login');
    }
    if (!authStore.isInServer) {
      return next('/?error=not_in_server');
    }
    return next();
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next('/login');
  }

  if (to.meta.requiresOwner && !authStore.isOwner) {
    return next('/');
  }

  next();
});

export default router;
