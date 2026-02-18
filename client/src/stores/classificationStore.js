import { create } from 'zustand';
import { classificationAPI } from '../services/api';

const useClassificationStore = create((set) => ({
  classifications: [],
  current: null,
  dashboard: null,
  pagination: null,
  loading: false,
  classifying: false,

  fetchDashboard: async () => {
    set({ loading: true });
    try {
      const res = await classificationAPI.getDashboard();
      set({ dashboard: res.data.data });
    } finally {
      set({ loading: false });
    }
  },

  fetchClassifications: async (params = {}) => {
    set({ loading: true });
    try {
      const res = await classificationAPI.getAll(params);
      set({ classifications: res.data.data, pagination: res.data.pagination });
    } finally {
      set({ loading: false });
    }
  },

  fetchOne: async (id) => {
    set({ loading: true });
    try {
      const res = await classificationAPI.getOne(id);
      set({ current: res.data.data });
    } finally {
      set({ loading: false });
    }
  },

  classify: async (formData) => {
    set({ classifying: true });
    try {
      const res = await classificationAPI.create(formData);
      set({ current: res.data.data });
      return res.data.data;
    } finally {
      set({ classifying: false });
    }
  },

  deleteClassification: async (id) => {
    await classificationAPI.delete(id);
    set((state) => ({
      classifications: state.classifications.filter((c) => c._id !== id),
    }));
  },

  clearCurrent: () => set({ current: null }),
}));

export default useClassificationStore;
