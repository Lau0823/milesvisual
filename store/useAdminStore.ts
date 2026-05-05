import { create } from 'zustand';
import { db, Reservation, MediaPost, QuoteRequest } from '../lib/db';
import { liveQuery } from 'dexie';

interface AdminState {
  // KPIs
  totalActiveReservations: number;
  totalPaidIncome: number;
  totalPendingIncome: number;
  totalPosts: number;
  totalNewQuotes: number;
  
  // Data
  reservations: Reservation[];
  mediaPosts: MediaPost[];
  quoteRequests: QuoteRequest[];

  // Acciones
  loadLocalData: () => void;
  addReservation: (res: Omit<Reservation, 'id'>) => Promise<void>;
  updateReservation: (id: number, res: Partial<Reservation>) => Promise<void>;
  deleteReservation: (id: number) => Promise<void>;
  
  addMediaPost: (post: Omit<MediaPost, 'id'>) => Promise<void>;
  updateMediaPost: (id: number, post: Partial<MediaPost>) => Promise<void>;
  deleteMediaPost: (id: number) => Promise<void>;

  addQuoteRequest: (quote: Omit<QuoteRequest, 'id'>) => Promise<void>;
  updateQuoteRequest: (id: number, quote: Partial<QuoteRequest>) => Promise<void>;
  deleteQuoteRequest: (id: number) => Promise<void>;
  syncWithBackend: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  totalActiveReservations: 0,
  totalPaidIncome: 0,
  totalPendingIncome: 0,
  totalPosts: 0,
  totalNewQuotes: 0,
  reservations: [],
  mediaPosts: [],
  quoteRequests: [],

  // Esta función se llamará una vez cuando cargue el Dashboard
  loadLocalData: () => {
    // Suscribirse a cambios en la tabla reservations de Dexie
    liveQuery(() => db.reservations.toArray()).subscribe(reservations => {
      const totalActive = reservations.filter(r => r.status !== 'cancelled').length;
      const paidIncome = reservations.filter(r => r.paymentStatus === 'paid').reduce((acc, curr) => acc + Number(curr.value), 0);
      const pendingIncome = reservations.filter(r => r.paymentStatus === 'pending' && r.status !== 'cancelled').reduce((acc, curr) => acc + Number(curr.value), 0);

      set({
        reservations,
        totalActiveReservations: totalActive,
        totalPaidIncome: paidIncome,
        totalPendingIncome: pendingIncome,
      });
    });

    // Suscribirse a cambios en la tabla mediaPosts de Dexie
    liveQuery(() => db.mediaPosts.toArray()).subscribe(mediaPosts => {
      set({
        mediaPosts,
        totalPosts: mediaPosts.length,
      });
    });

    liveQuery(() => db.quoteRequests.toArray()).subscribe(quoteRequests => {
      set({
        quoteRequests,
        totalNewQuotes: quoteRequests.filter(q => q.status === 'new').length,
      });
    });
  },

  addReservation: async (res) => {
    await db.reservations.add({ ...res, synced: false });
  },

  updateReservation: async (id, res) => {
    await db.reservations.update(id, { ...res, synced: false });
  },

  deleteReservation: async (id) => {
    await db.reservations.delete(id);
  },

  addMediaPost: async (post) => {
    await db.mediaPosts.add({ ...post, synced: false });
  },

  updateMediaPost: async (id, post) => {
    await db.mediaPosts.update(id, { ...post, synced: false });
  },

  deleteMediaPost: async (id) => {
    await db.mediaPosts.delete(id);
  },

  addQuoteRequest: async (quote) => {
    // Al agregar una nueva cotización desde el frontend publico, guardamos la IP y metadata que tengamos a mano
    await db.quoteRequests.add({ ...quote, synced: false });
  },

  updateQuoteRequest: async (id, quote) => {
    await db.quoteRequests.update(id, { ...quote, synced: false });
  },

  deleteQuoteRequest: async (id) => {
    await db.quoteRequests.delete(id);
  },

  syncWithBackend: async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    try {
      const resReservations = await fetch(`${apiUrl}/reservations`);
      if (resReservations.ok) {
        const data = await resReservations.json();
        await db.reservations.bulkPut(data.map((r: any) => ({ ...r, synced: true })));
      }

      const resMedia = await fetch(`${apiUrl}/media-posts`);
      if (resMedia.ok) {
        const data = await resMedia.json();
        await db.mediaPosts.bulkPut(data.map((m: any) => ({ ...m, synced: true })));
      }

      const resQuotes = await fetch(`${apiUrl}/quotes`);
      if (resQuotes.ok) {
        const data = await resQuotes.json();
        await db.quoteRequests.bulkPut(data.map((q: any) => ({ ...q, synced: true })));
      }
    } catch (error) {
      console.error("Error syncing with backend:", error);
    }
  },
}));
