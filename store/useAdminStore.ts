import { create } from 'zustand';
import { db } from '../lib/db';

interface AdminState {
  settings: any[];
  planes: any[];
  reservations: any[];
  quoteRequests: any[];
  mediaPosts: any[];
  totalActiveReservations: number;
  totalPaidIncome: number;
  totalPendingIncome: number;
  totalPosts: number;
  refunds: number;
  expenses: number;
  loading: boolean;
  
  // Acciones globales
  syncWithBackend: (token?: string) => Promise<void>;
  loadLocalData: (token?: string) => Promise<void>;
  
  // Ajustes
  fetchSettings: (token: string) => Promise<void>;
  updateSetting: (token: string, key: string, value: string) => Promise<void>;
  saveBatchSettings: (token: string, settings: any[]) => Promise<boolean>;
  
  // Planes
  fetchPlanes: (token: string) => Promise<void>;
  savePlan: (token: string, plan: any) => Promise<void>;
  deletePlan: (token: string, id: number) => Promise<void>;
  
  // Media Posts
  fetchMediaPosts: (token: string) => Promise<void>;
  saveMediaPost: (token: string, post: any) => Promise<void>;
  deleteMediaPost: (token: string, id: number) => Promise<void>;

  // Reservas
  deleteReservation: (token: string, id: number) => Promise<void>;
  
  setLoading: (loading: boolean) => void;
}

const getApiUrl = () => {
  let API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
  if (typeof window !== 'undefined' && window.location.protocol === 'https:' && API.startsWith('http://')) {
    return API.replace('http://', 'https://');
  }
  return API;
};

export const useAdminStore = create<AdminState>((set, get) => ({
  settings: [],
  planes: [],
  reservations: [],
  quoteRequests: [],
  mediaPosts: [],
  totalActiveReservations: 0,
  totalPaidIncome: 0,
  totalPendingIncome: 0,
  totalPosts: 0,
  refunds: 0,
  expenses: 0,
  loading: false,

  setLoading: (loading) => set({ loading }),

  syncWithBackend: async (token?: string) => {
    // 1. Carga inmediata desde Dexie (Caché local) para velocidad de UI
    try {
      const cachedData = await db.jsonCache.toArray();
      const cache: any = {};
      cachedData.forEach(item => { cache[item.key] = item.data; });

      if (Object.keys(cache).length > 0) {
        set({
          reservations: cache.reservations || [],
          quoteRequests: cache.quoteRequests || [],
          settings: cache.settings || [],
          planes: cache.planes || [],
          mediaPosts: cache.mediaPosts || [],
          totalActiveReservations: (cache.reservations || []).filter((r: any) => r.status !== 'cancelled').length,
          totalPosts: (cache.mediaPosts || []).length
        });
      }
    } catch (e) {
      console.warn("Error cargando caché:", e);
    }

    try {
      const API = getApiUrl();
      const headers: Record<string, string> = token ? { 'Authorization': `Bearer ${token}` } : {};
      
      // Cache buster para evitar que el navegador devuelva datos antiguos tras una eliminación
      const t = Date.now();
      const [resRes, quoteRes, settingsRes, planesRes, mediaRes] = await Promise.all([
        fetch(`${API}/reservations?t=${t}`, { headers }),
        fetch(`${API}/quotes?t=${t}`, { headers }),
        fetch(`${API}/settings?t=${t}`, { headers }),
        fetch(`${API}/servicios?limit=100&t=${t}`, { headers }),
        fetch(`${API}/media-posts?t=${t}`, { headers })
      ]);

      const [reservations, quoteRequests, settings, planesData, mediaPosts] = await Promise.all([
        resRes.ok ? resRes.json() : Promise.resolve(get().reservations),
        quoteRes.ok ? quoteRes.json() : Promise.resolve(get().quoteRequests),
        settingsRes.ok ? settingsRes.json() : Promise.resolve(get().settings),
        planesRes.ok ? planesRes.json() : Promise.resolve({ data: get().planes }),
        mediaRes.ok ? mediaRes.json() : Promise.resolve(get().mediaPosts)
      ]);

      const planes = planesData.data || planesData; // Soporte para ambos formatos

      // 3. Guardar en Dexie para la próxima vez (Actualización Atómica)
      const now = new Date().toISOString();
      await Promise.all([
        db.jsonCache.put({ key: 'reservations', data: reservations, updatedAt: now }),
        db.jsonCache.put({ key: 'quoteRequests', data: quoteRequests, updatedAt: now }),
        db.jsonCache.put({ key: 'settings', data: settings, updatedAt: now }),
        db.jsonCache.put({ key: 'planes', data: planes, updatedAt: now }),
        db.jsonCache.put({ key: 'mediaPosts', data: mediaPosts, updatedAt: now }),
      ]);

      // Calcular métricas
      let paid = 0, pending = 0, refunds = 0, expenses = 0;
      reservations.forEach((r: any) => {
        const val = Number(r.value || 0), ant = Number(r.anticipo || 0), dev = Number(r.devolucion || 0), gas = Number(r.gastos_operativos || 0);
        paid += (r.paymentStatus === 'paid' ? val : ant) - dev;
        if (r.status !== 'cancelled' && r.paymentStatus !== 'paid') pending += (val - ant);
        refunds += dev; expenses += gas;
      });

      set({ 
        reservations, quoteRequests, settings, planes, mediaPosts,
        totalPaidIncome: paid, totalPendingIncome: pending,
        totalActiveReservations: reservations.filter((r: any) => r.status !== 'cancelled').length,
        totalPosts: mediaPosts.length,
        refunds, expenses
      });
    } catch (error) {
      console.error("Error in syncWithBackend:", error);
    }
  },

  loadLocalData: async (token?: string) => {
    await get().syncWithBackend(token);
  },

  fetchSettings: async (token) => {
    try {
      const res = await fetch(`${getApiUrl()}/settings?t=${Date.now()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        set({ settings: data });
        await db.jsonCache.put({ key: 'settings', data, updatedAt: new Date().toISOString() });
      }
    } catch (error) {
      console.error("Error fetching admin settings:", error);
    }
  },

  updateSetting: async (token, key, value) => {
    try {
      const res = await fetch(`${getApiUrl()}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ key, value })
      });
      
      if (res.ok) {
        const updatedSetting = await res.json();
        const currentSettings = [...get().settings];
        const index = currentSettings.findIndex(s => s.key === key);
        if (index !== -1) currentSettings[index] = updatedSetting;
        else currentSettings.push(updatedSetting);
        
        set({ settings: currentSettings });
        await db.jsonCache.put({ key: 'settings', data: currentSettings, updatedAt: new Date().toISOString() });
      }
    } catch (error) {
      console.error("Error updating setting:", error);
    }
  },

  saveBatchSettings: async (token, settings) => {
    try {
      const res = await fetch(`${getApiUrl()}/settings/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ settings })
      });
      
      if (res.ok) {
        set({ settings });
        await db.jsonCache.put({ key: 'settings', data: settings, updatedAt: new Date().toISOString() });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error saving batch settings:", error);
      return false;
    }
  },

  fetchPlanes: async (token) => {
    try {
      const res = await fetch(`${getApiUrl()}/servicios?limit=100&t=${Date.now()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const planes = data.data || [];
        set({ planes });
        await db.jsonCache.put({ key: 'planes', data: planes, updatedAt: new Date().toISOString() });
      }
    } catch (error) {
      console.error("Error fetching planes:", error);
    }
  },

  savePlan: async (token, plan) => {
    const isEditing = !!plan.id;
    const url = `${getApiUrl()}/servicios${isEditing ? `/${plan.id}` : ''}`;
    const method = isEditing ? 'PATCH' : 'POST';

    try {
      const formData = new FormData();
      const excluded = ['id', 'ventasServicios', 'created_at', 'updated_at', 'slug'];
      Object.keys(plan).forEach(key => {
        if (!excluded.includes(key) && plan[key] !== undefined && plan[key] !== null) {
          if (plan[key] instanceof File) formData.append(key, plan[key]);
          else if (typeof plan[key] === 'boolean') formData.append(key, plan[key] ? 'true' : 'false');
          else formData.append(key, plan[key].toString());
        }
      });

      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      
      if (!res.ok) throw new Error('Error al guardar el plan');
      await get().fetchPlanes(token);
    } catch (error) {
      console.error("Error saving plan:", error);
      throw error;
    }
  },

  deletePlan: async (token, id) => {
    try {
      const res = await fetch(`${getApiUrl()}/servicios/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!res.ok) throw new Error('Error al eliminar el plan');
      
      const newPlanes = get().planes.filter(p => p.id !== id);
      set({ planes: newPlanes });
      await db.jsonCache.put({ key: 'planes', data: newPlanes, updatedAt: new Date().toISOString() });
    } catch (error) {
      console.error("Error deleting plan:", error);
      throw error;
    }
  },

  fetchMediaPosts: async (token) => {
    try {
      const res = await fetch(`${getApiUrl()}/media-posts?t=${Date.now()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        set({ mediaPosts: data });
        await db.jsonCache.put({ key: 'mediaPosts', data, updatedAt: new Date().toISOString() });
      }
    } catch (error) {
      console.error("Error fetching media posts:", error);
    }
  },

  saveMediaPost: async (token, post) => {
    const isEditing = !!post.id;
    const url = `${getApiUrl()}/media-posts${isEditing ? `/${post.id}` : ''}`;
    const method = isEditing ? 'PATCH' : 'POST';

    try {
      const formData = new FormData();
      if (post.file) formData.append('file', post.file);
      formData.append('title', post.title);
      formData.append('category', post.category);
      formData.append('status', 'published');

      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      
      if (!res.ok) throw new Error('Error al guardar el post');
      await get().fetchMediaPosts(token);
    } catch (error) {
      console.error("Error saving media post:", error);
      throw error;
    }
  },

  deleteMediaPost: async (token, id) => {
    try {
      const res = await fetch(`${getApiUrl()}/media-posts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!res.ok) throw new Error('No se pudo eliminar el post');
      
      const newMedia = get().mediaPosts.filter(p => p.id !== id);
      set({ mediaPosts: newMedia });
      await db.jsonCache.put({ key: 'mediaPosts', data: newMedia, updatedAt: new Date().toISOString() });
    } catch (error) {
      console.error("Error deleting media post:", error);
      throw error;
    }
  },

  deleteReservation: async (token, id) => {
    try {
      const res = await fetch(`${getApiUrl()}/reservations/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!res.ok) throw new Error('No se pudo eliminar la reserva');
      
      const newReservations = get().reservations.filter(r => r.id !== id);
      set({ reservations: newReservations });
      await db.jsonCache.put({ key: 'reservations', data: newReservations, updatedAt: new Date().toISOString() });
    } catch (error) {
      console.error("Error deleting reservation:", error);
      throw error;
    }
  }
}));
