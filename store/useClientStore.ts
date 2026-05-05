import { create } from 'zustand';
import { db } from '../lib/db';

interface ClientState {
  getCachedMediaUrl: (url: string) => Promise<string>;
  clearCache: () => Promise<void>;
}

export const useClientStore = create<ClientState>((set) => ({
  getCachedMediaUrl: async (url: string) => {
    if (!url) return '';
    
    // Si es una URL relativa del proyecto (videos/logos locales), la devolvemos tal cual
    if (!url.startsWith('http') && !url.startsWith('blob:')) {
      return url;
    }

    try {
      const cached = await db.mediaCache.get(url);
      if (cached) {
        return URL.createObjectURL(cached.blob);
      }

      // Si no está cacheado, descargarlo
      const response = await fetch(url);
      const blob = await response.blob();

      // Guardar en cache
      await db.mediaCache.put({
        id: url,
        blob: blob,
        type: blob.type,
        updatedAt: new Date().toISOString(),
      });

      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error caching media:", error);
      return url; // Si falla el cacheo, devolvemos la URL original
    }
  },
  
  clearCache: async () => {
    await db.mediaCache.clear();
  }
}));
