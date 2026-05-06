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
  
  setLoading: (loading: boolean) => void;
}

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
    // 1. Carga ultra-rápida desde Dexie (Caché local)
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
          // Recalcular métricas básicas de la caché para que no se vean en cero
          totalActiveReservations: (cache.reservations || []).filter((r: any) => r.status !== 'cancelled').length,
          totalPosts: (cache.mediaPosts || []).length
        });
      }
    } catch (e) {
      console.warn("Error cargando caché:", e);
    }

    // 2. Sincronización real con el servidor (en segundo plano)
    try {
      const API = process.env.NEXT_PUBLIC_API_URL;
      const headers: Record<string, string> = token ? { 'Authorization': `Bearer ${token}` } : {};
      
      const [resRes, quoteRes, settingsRes, planesRes, mediaRes] = await Promise.all([
        fetch(`${API}/reservations`, { headers }),
        fetch(`${API}/quotes`, { headers }),
        fetch(`${API}/settings`, { headers }),
        fetch(`${API}/servicios?limit=100`, { headers }),
        fetch(`${API}/media-posts`, { headers })
      ]);

      const reservations = resRes.ok ? await resRes.json() : get().reservations;
      const quoteRequests = quoteRes.ok ? await quoteRes.json() : get().quoteRequests;
      const settings = settingsRes.ok ? await settingsRes.json() : get().settings;
      const planesData = planesRes.ok ? await planesRes.json() : { data: get().planes };
      const mediaPosts = mediaRes.ok ? await mediaRes.json() : get().mediaPosts;
      const planes = planesData.data || [];

      // Calcular ingresos reales y egresos
      let paid = 0;
      let pending = 0;
      let refunds = 0;
      let expenses = 0;

      reservations.forEach((r: any) => {
        const val = Number(r.value || 0);
        const ant = Number(r.anticipo || 0);
        const dev = Number(r.devolucion || 0);
        const gas = Number(r.gastos_operativos || 0);

        // Pagado: Si es PAID es el valor total. Si no, solo el anticipo.
        // Importante: Restamos lo devuelto para saber cuánto dinero TENEMOS realmente.
        paid += (r.paymentStatus === 'paid' ? val : ant) - dev;
        
        // Pendiente: Solo si no está cancelada y no está pagada totalmente
        if (r.status !== 'cancelled' && r.paymentStatus !== 'paid') {
          pending += (val - ant);
        }

        refunds += dev;
        expenses += gas;
      });

      const activeReservationsCount = reservations.filter((r: any) => r.status !== 'cancelled').length;

      // 3. Guardar en Dexie para la próxima vez
      const now = new Date().toISOString();
      await Promise.all([
        db.jsonCache.put({ key: 'reservations', data: reservations, updatedAt: now }),
        db.jsonCache.put({ key: 'quoteRequests', data: quoteRequests, updatedAt: now }),
        db.jsonCache.put({ key: 'settings', data: settings, updatedAt: now }),
        db.jsonCache.put({ key: 'planes', data: planes, updatedAt: now }),
        db.jsonCache.put({ key: 'mediaPosts', data: mediaPosts, updatedAt: now }),
      ]);

      set({ 
        reservations, quoteRequests, settings, planes, mediaPosts,
        totalPaidIncome: paid,
        totalPendingIncome: pending,
        totalActiveReservations: activeReservationsCount,
        totalPosts: mediaPosts.length,
        // Añadimos estas métricas al estado (puedes expandir el AdminState si quieres verlas en el dashboard)
        refunds,
        expenses
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        set({ settings: data });
      }
    } catch (error) {
      console.error("Error fetching admin settings:", error);
    }
  },

  updateSetting: async (token, key, value) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ key, value })
      });
      
      if (res.ok) {
        const updatedSetting = await res.json();
        const currentSettings = [...get().settings];
        const index = currentSettings.findIndex(s => s.key === key);
        
        if (index !== -1) {
          currentSettings[index] = updatedSetting;
        } else {
          currentSettings.push(updatedSetting);
        }
        
        set({ settings: currentSettings });
      }
    } catch (error) {
      console.error("Error updating setting:", error);
    }
  },

  saveBatchSettings: async (token, settings) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ settings })
      });
      
      if (res.ok) {
        set({ settings });
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/servicios?limit=100`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        set({ planes: data.data || [] });
      }
    } catch (error) {
      console.error("Error fetching planes:", error);
    }
  },

  savePlan: async (token, plan) => {
    const isEditing = !!plan.id;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/servicios${isEditing ? `/${plan.id}` : ''}`;
    const method = isEditing ? 'PATCH' : 'POST';

    try {
      const formData = new FormData();
      // Solo excluimos el id (que va en la URL) y relaciones pesadas. 
      // El resto lo limpia el backend automáticamente con whitelist:true
      const excluded = ['id', 'ventasServicios'];
      
      Object.keys(plan).forEach(key => {
        if (!excluded.includes(key) && plan[key] !== undefined && plan[key] !== null) {
          if (plan[key] instanceof File) {
            formData.append(key, plan[key]);
          } else if (typeof plan[key] === 'boolean') {
            const boolVal = plan[key] ? 'true' : 'false';
            formData.append(key, boolVal);
          } else {
            formData.append(key, plan[key].toString());
          }
        }
      });

      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al guardar el plan');
      }
      
      await get().fetchPlanes(token);
    } catch (error) {
      console.error("Error saving plan:", error);
      throw error; // Re-lanzar para que el componente lo maneje
    }
  },

  deletePlan: async (token, id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/servicios/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al eliminar el plan');
      }
      
      set({ planes: get().planes.filter(p => p.id !== id) });
    } catch (error) {
      console.error("Error deleting plan:", error);
      throw error;
    }
  }
}));
