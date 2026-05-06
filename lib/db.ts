import Dexie, { type EntityTable } from 'dexie';

export interface Reservation {
  id?: number;
  clientName: string;
  email: string;
  phone: string;
  serviceType: string;
  date: string; // Fecha de creación/reserva
  eventDate?: string; // Fecha del evento real
  time: string;
  value: number;
  anticipo?: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'pending' | 'partial' | 'paid';
  paymentSchedule?: { date: string; amount: number; isPaid: boolean }[]; // Pagos diferidos
  createdAt?: string;
  updatedAt?: string;
  synced?: boolean; // Para saber si está sincronizado con el backend
}

export interface MediaPost {
  id?: number;
  title: string;
  category: string;
  cloudinaryUrl: string;
  cloudinaryPublicId: string;
  status: 'draft' | 'published';
  createdAt?: string;
  updatedAt?: string;
  synced?: boolean;
}

export interface QuoteRequest {
  id?: number;
  clientName: string;
  email: string;
  phone: string;
  serviceInterested: string;
  message: string;
  ipAddress?: string;
  userAgent?: string;
  sourceUrl?: string;
  status: 'new' | 'contacted' | 'converted' | 'discarded';
  createdAt?: string;
  updatedAt?: string;
  synced?: boolean;
}

export interface MediaCache {
  id: string; // URL original de la imagen/video
  blob: Blob;
  type: string;
  updatedAt: string;
}

export interface JSONCache {
  key: string; // 'settings', 'plans', 'mediaPosts'
  data: any;
  updatedAt: string;
}

// Inicializar la base de datos local
const db = new Dexie('MilesVisualDB') as Dexie & {
  reservations: EntityTable<Reservation, 'id'>;
  mediaPosts: EntityTable<MediaPost, 'id'>;
  quoteRequests: EntityTable<QuoteRequest, 'id'>;
  mediaCache: EntityTable<MediaCache, 'id'>;
  jsonCache: EntityTable<JSONCache, 'key'>;
};

// Declarar esquema y versión
db.version(3).stores({
  reservations: '++id, eventDate, date, status, paymentStatus, synced',
  mediaPosts: '++id, category, status, synced',
  quoteRequests: '++id, status, synced',
  mediaCache: 'id',
  jsonCache: 'key',
});

export { db };
