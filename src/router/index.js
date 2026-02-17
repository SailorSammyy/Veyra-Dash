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
      meta: { requiresAuth: true, requiresOwner: true } // Note: requiresOwner logic handled manually below
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  
  // If we have a token but no user data, fetch it
  if (authStore.token && !authStore.user) {
    await authStore.fetchUser();
  }

  // SPECIFIC CHECK FOR REPOSITORIES (Server Membership)
  if (to.path === '/repositories') {
    if (!authStore.isAuthenticated) {
      next('/login');
    } else if (!authStore.isInServer) {
      // Redirect to dashboard with error flag
      next('/?error=not_in_server');
    } else {
      next();
    }
  } 
  // STANDARD CHECKS
  else if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresOwner && !authStore.isOwner) {
    next('/'); 
  } else {
    next();
  }
});

export default router;