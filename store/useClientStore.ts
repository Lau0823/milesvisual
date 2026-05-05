import { create } from 'zustand';
import { db } from '../lib/db';

interface ClientState {
  settings: any[];
  plans: any[];
  mediaPosts: any[];
  isLoaded: boolean;
  loadPublicData: () => Promise<void>;
  getCachedMediaUrl: (url: string) => Promise<string>;
  clearCache: () => Promise<void>;
}

export const useClientStore = create<ClientState>((set, get) => ({
  settings: [],
  plans: [],
  mediaPosts: [],
  isLoaded: false,

  loadPublicData: async () => {
    // 1. Cargar datos del Cache de Dexie (Instantáneo)
    try {
      const cachedSettings = await db.jsonCache.get('settings');
      const cachedPlans = await db.jsonCache.get('plans');
      const cachedMedia = await db.jsonCache.get('mediaPosts');
      
      if (cachedSettings || cachedPlans || cachedMedia) {
        set({ 
          settings: cachedSettings?.data || [], 
          plans: cachedPlans?.data || [], 
          mediaPosts: cachedMedia?.data || [],
          isLoaded: true 
        });
      }
    } catch (e) {
      console.warn("Dexie cache miss or error:", e);
    }

    // 2. Fetch en background para actualizar (Revalidate)
    try {
      let API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
      
      if (typeof window !== 'undefined' && window.location.protocol === 'https:' && API.startsWith('http://')) {
        API = API.replace('http://', 'https://');
      }
      
      const [settingsRes, plansRes, mediaRes] = await Promise.all([
        fetch(`${API}/settings`),
        fetch(`${API}/servicios/catalogo`),
        fetch(`${API}/media-posts`)
      ]);

      const settings = settingsRes.ok ? await settingsRes.json() : [];
      const plans = plansRes.ok ? await plansRes.json() : [];
      const mediaPosts = mediaRes.ok ? await mediaRes.json() : [];

      set({ settings, plans, mediaPosts, isLoaded: true });

      // 3. Guardar en Dexie para la próxima vez
      const now = new Date().toISOString();
      await Promise.all([
        db.jsonCache.put({ key: 'settings', data: settings, updatedAt: now }),
        db.jsonCache.put({ key: 'plans', data: plans, updatedAt: now }),
        db.jsonCache.put({ key: 'mediaPosts', data: mediaPosts, updatedAt: now })
      ]);

      // Precargar media localmente en background para Dexie
      mediaPosts.forEach((item: any) => {
        if (item.cloudinaryUrl) get().getCachedMediaUrl(item.cloudinaryUrl);
      });
    } catch (error) {
      console.error("Error loading public data:", error);
    }
  },

  getCachedMediaUrl: async (url: string) => {
    if (!url) return '';
    
    if (!url.startsWith('http') && !url.startsWith('blob:')) {
      return url;
    }

    try {
      const cached = await db.mediaCache.get(url);
      if (cached) return URL.createObjectURL(cached.blob);

      const response = await fetch(url);
      const blob = await response.blob();

      await db.mediaCache.put({
        id: url,
        blob: blob,
        type: blob.type,
        updatedAt: new Date().toISOString(),
      });

      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error caching media:", error);
      return url;
    }
  },
  
  clearCache: async () => {
    await db.mediaCache.clear();
  }
}));
