import { create } from 'zustand';
import { authAPI } from '../services/api';

const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token') || null,
  loading: false,
  initialized: false,

  setUser: (user, token) => {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    }
    set({ user, token });
  },

  register: async (data) => {
    set({ loading: true });
    try {
      const res = await authAPI.register(data);
      const { user, token } = res.data.data;
      get().setUser(user, token);
      return { success: true };
    } catch (e) {
      return { success: false, message: e.response?.data?.message };
    } finally {
      set({ loading: false });
    }
  },

  login: async (data) => {
    set({ loading: true });
    try {
      const res = await authAPI.login(data);
      const { user, token } = res.data.data;
      get().setUser(user, token);
      return { success: true };
    } catch (e) {
      return { success: false, message: e.response?.data?.message };
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  fetchMe: async () => {
    try {
      const res = await authAPI.getMe();
      const user = res.data.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, initialized: true });
    } catch {
      set({ initialized: true });
    }
  },

  updateProfile: async (data) => {
    set({ loading: true });
    try {
      const res = await authAPI.updateProfile(data);
      const user = res.data.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      set({ user });
      return { success: true };
    } catch (e) {
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
