import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    isInServer: false,
    initialized: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    isOwner: (state) => state.user?.isOwner ?? false,
    canViewSource: (state) => state.isInServer,
  },
  actions: {
    async fetchUser() {
      this.loading = true;
      try {
        const response = await api.get('/api/user');
        this.user = response.data;
        this.isInServer = response.data.isInServer;
      } catch {
        this.user = null;
        this.isInServer = false;
      } finally {
        this.loading = false;
        this.initialized = true;
      }
    },
    async logout() {
      try {
        await api.post('/auth/logout');
      } catch {
      } finally {
        this.user = null;
        this.isInServer = false;
        this.initialized = true;
        window.location.href = '/login';
      }
    },
  },
});
