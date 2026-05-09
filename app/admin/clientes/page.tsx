"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useAdminStore } from '../../../store/useAdminStore';
import { Users, Search, Mail, Phone, Calendar, ArrowRight, ExternalLink, History, DollarSign, Tag } from 'lucide-react';
import Link from 'next/link';

interface ClientEntry {
  email: string;
  clientName: string;
  phone: string;
  totalSpent: number;
  reservations: any[];
  lastService: string;
  lastDate: string;
}

export default function ClientesPage() {
  const { data: session } = useSession();
  const { reservations, syncWithBackend } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (session?.accessToken) {
      syncWithBackend((session as any).accessToken);
    }
  }, [session, syncWithBackend]);

  const clientsData = useMemo(() => {
    const groups: { [key: string]: ClientEntry } = {};

    reservations.forEach(res => {
      const email = (res.email || 'sin-email@miles.com').toLowerCase().trim();

      if (!groups[email]) {
        groups[email] = {
          email,
          clientName: res.clientName,
          phone: res.phone || '---',
          totalSpent: 0,
          reservations: [],
          lastService: res.serviceType,
          lastDate: res.eventDate
        };
      }

      groups[email].reservations.push(res);
      const paidAmount = res.paymentStatus === 'paid' ? Number(res.value) : Number(res.anticipo || 0);
      groups[email].totalSpent += paidAmount;

      if (new Date(res.eventDate) > new Date(groups[email].lastDate)) {
        groups[email].lastDate = res.eventDate;
        groups[email].lastService = res.serviceType;
      }
    });

    return Object.values(groups).sort((a, b) => b.totalSpent - a.totalSpent);
  }, [reservations]);

  const filteredClients = clientsData.filter(c =>
    c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="mv-script text-[32px] text-[var(--mv-sage)] leading-none mb-2">gestión crm</p>
          <h2 className="text-4xl font-semibold tracking-tight uppercase">Base de Datos de Clientes</h2>
          <p className="text-sm text-black/40 mt-2 max-w-[600px]">
            Visualiza el historial completo de cada persona que ha confiado en Miles Visual. Agrupado automáticamente por contacto.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
          <input
            type="text"
            placeholder="Buscar por nombre o correo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-6 py-4 bg-white border border-black/5 rounded-2xl text-sm outline-none focus:border-[var(--mv-sage)] transition w-full md:w-80 shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="hidden lg:grid grid-cols-6 px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-black/30">
          <div className="col-span-2">Cliente</div>
          <div>Total Invertido</div>
          <div>Servicios</div>
          <div>Última Visita</div>
          <div className="text-right">Acciones</div>
        </div>

        {filteredClients.map((client) => (
          <div key={client.email} className="bg-white rounded-[32px] border border-black/5 p-6 lg:p-10 hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-6 items-center gap-6 relative z-10">

              <div className="col-span-1 lg:col-span-2 flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[var(--mv-cream)] text-[var(--mv-sage)] flex items-center justify-center border border-black/5 shadow-inner">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--mv-ink)] uppercase tracking-tight">{client.clientName}</h3>
                  <div className="flex flex-col gap-1 mt-1">
                    <p className="text-[11px] text-black/40 flex items-center gap-1.5 font-medium"><Mail size={12} /> {client.email}</p>
                    <p className="text-[11px] text-black/40 flex items-center gap-1.5 font-medium"><Phone size={12} /> {client.phone}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="lg:hidden text-[9px] uppercase tracking-widest font-bold text-black/30 mb-1">Inversión Total</p>
                <div className="flex items-center gap-1 text-xl font-bold text-[var(--mv-sage)]">
                  <DollarSign size={18} />
                  {client.totalSpent.toLocaleString()}
                </div>
              </div>

              <div>
                <p className="lg:hidden text-[9px] uppercase tracking-widest font-bold text-black/30 mb-1">Servicios</p>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-[var(--mv-cream)] rounded-full text-[11px] font-bold text-[var(--mv-ink)] border border-black/5">
                    {client.reservations.length} {client.reservations.length === 1 ? 'Sesión' : 'Sesiones'}
                  </div>
                </div>
              </div>

              <div>
                <p className="lg:hidden text-[9px] uppercase tracking-widest font-bold text-black/30 mb-1">Última Visita</p>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-[var(--mv-ink)] uppercase tracking-tight">{client.lastService}</p>
                  <p className="text-[10px] text-black/40 font-medium">{new Date(client.lastDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Link
                  href={`/admin/reservas?search=${encodeURIComponent(client.email)}`}
                  className="p-3 bg-black/5 text-[var(--mv-ink)] rounded-xl hover:bg-[var(--mv-ink)] hover:text-white transition flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                >
                  <History size={14} /> Historial
                </Link>
                <a
                  href={`https://wa.me/${client.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition"
                >
                  <ArrowRight size={14} className="-rotate-45" />
                </a>
              </div>

            </div>

            <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 bg-[var(--mv-cream)]/50 rounded-full blur-3xl transition-all group-hover:scale-150" />
          </div>
        ))}

        {filteredClients.length === 0 && (
          <div className="py-20 text-center bg-white rounded-[40px] border border-black/5 shadow-sm">
            <Users size={48} className="mx-auto text-black/5 mb-4" />
            <p className="text-[11px] uppercase tracking-widest text-black/30 font-bold">No se encontraron clientes con esos criterios</p>
          </div>
        )}
      </div>
    </div>
  );
}
