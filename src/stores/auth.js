import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('veyra_token') || null,
    loading: false,
    isInServer: false, // NEW STATE
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isOwner: (state) => state.user && state.user.isOwner,
    canViewRepos: (state) => state.isInServer, // NEW GETTER
  },
  actions: {
    async fetchUser() {
      if (!this.token) return;
      this.loading = true;
      try {
        const response = await api.get('/api/user');
        this.user = response.data;
        this.isInServer = response.data.isInServer; // SYNC STATE
      } catch (error) {
        console.error('Failed to fetch user', error);
        this.logout();
      } finally {
        this.loading = false;
      }
    },
    setToken(token) {
      this.token = token;
      localStorage.setItem('veyra_token', token);
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isInServer = false;
      localStorage.removeItem('veyra_token');
      window.location.href = '/login';
    }
  },
});