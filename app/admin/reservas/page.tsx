"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAdminStore } from '../../../store/useAdminStore';
import { Calendar, Plus, Search, Filter, MoreHorizontal, CheckCircle2, Clock, XCircle, Loader2, Mail, Phone, CalendarDays, FileText } from 'lucide-react';
import { generateQuotePDF } from '../../../utils/pdfGenerator';

export default function ReservasPage() {
  const { data: session } = useSession();
  const { reservations, syncWithBackend } = useAdminStore();

  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const [newRes, setNewRes] = useState({
    clientName: '',
    email: '',
    phone: '',
    serviceType: 'Boda',
    eventDate: '',
    time: '',
    value: 0,
    status: 'pending',
    paymentStatus: 'pending'
  });

  useEffect(() => {
    syncWithBackend();
  }, []);

  const handleAddReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(session as any)?.accessToken}`
        },
        body: JSON.stringify({
          ...newRes,
          date: new Date().toISOString().split('T')[0]
        })
      });

      if (res.ok) {
        setShowAddModal(false);
        setNewRes({
          clientName: '', email: '', phone: '', serviceType: 'Boda',
          eventDate: '', time: '', value: 0, status: 'pending', paymentStatus: 'pending'
        });
        await syncWithBackend();
      }
    } catch (error) {
      console.error("Error adding reservation:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle2 className="text-green-500" size={16} />;
      case 'pending': return <Clock className="text-amber-500" size={16} />;
      case 'cancelled': return <XCircle className="text-red-500" size={16} />;
      default: return null;
    }
  };

  const filteredReservations = reservations
    .filter(r => filter === 'ALL' || r.status === filter)
    .filter(r => r.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || r.email.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/50 font-semibold mb-1">Operaciones</p>
          <h2 className="text-4xl font-semibold tracking-tight uppercase">Reservas & Agenda</h2>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={16} />
            <input 
              type="text" 
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-6 py-3 bg-white border border-black/5 rounded-full text-xs outline-none focus:border-[var(--mv-sage)] transition w-64 shadow-sm"
            />
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[var(--mv-ink)] text-white px-6 py-3 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[var(--mv-sage)] transition flex items-center gap-2 shadow-lg"
          >
            <Plus size={16} /> Nueva Reserva
          </button>
        </div>
      </div>

      {/* Tabs de Filtro */}
      <div className="flex gap-8 border-b border-black/5 mb-8">
        {[
          { id: 'ALL', label: 'Todas' },
          { id: 'confirmed', label: 'Confirmadas' },
          { id: 'pending', label: 'Pendientes' },
          { id: 'cancelled', label: 'Canceladas' },
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`pb-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all relative ${filter === tab.id ? 'text-[var(--mv-ink)]' : 'text-black/30'}`}
          >
            {tab.label}
            {filter === tab.id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--mv-sage)]" />}
          </button>
        ))}
      </div>

      {/* Tabla de Reservas */}
      <div className="bg-white rounded-[32px] overflow-hidden border border-black/5 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/[0.02] border-b border-black/5">
              <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-black/40">Cliente</th>
              <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-black/40">Servicio</th>
              <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-black/40">Fecha Evento</th>
              <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-black/40">Valor</th>
              <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-black/40">Estado</th>
              <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-black/40">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((res) => (
              <tr key={res.id} className="border-b border-black/5 hover:bg-black/[0.01] transition-colors group">
                <td className="px-8 py-6">
                  <div>
                    <p className="text-sm font-semibold text-[var(--mv-ink)]">{res.clientName}</p>
                    <div className="flex items-center gap-3 mt-1 opacity-40">
                       <span className="flex items-center gap-1 text-[10px]"><Mail size={10} /> {res.email}</span>
                       <span className="flex items-center gap-1 text-[10px]"><Phone size={10} /> {res.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="px-3 py-1 bg-[var(--mv-cream)] text-[var(--mv-sage)] text-[9px] font-bold uppercase tracking-widest rounded-full border border-[var(--mv-sage)]/10">
                    {res.serviceType}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-sm text-black/60">
                    <CalendarDays size={14} />
                    {new Date(res.eventDate || '').toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                    <span className="text-[10px] opacity-50 ml-1">at {res.time}</span>
                  </div>
                </td>
                <td className="px-8 py-6 font-medium text-sm">
                  ${Number(res.value).toLocaleString()}
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(res.status)}
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">{res.status}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => generateQuotePDF(res as any)}
                      className="p-2.5 bg-[var(--mv-cream)] text-[var(--mv-gold)] rounded-xl hover:bg-[var(--mv-gold)] hover:text-white transition flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest px-4"
                    >
                      <FileText size={14} /> PDF
                    </button>
                    <button className="p-2 hover:bg-black/5 rounded-full transition opacity-0 group-hover:opacity-100">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredReservations.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-sm text-black/20 font-medium">No se encontraron reservas</p>
          </div>
        )}
      </div>

      {/* Modal Nueva Reserva */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-[600px] p-8 shadow-2xl animate-in zoom-in-95 duration-300 overflow-y-auto max-h-[90vh]">
            <h3 className="text-2xl font-semibold uppercase tracking-tight mb-6">Crear Nueva Reserva</h3>
            
            <form onSubmit={handleAddReservation} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-black/40">Nombre del Cliente</label>
                  <input type="text" required value={newRes.clientName} onChange={(e) => setNewRes({...newRes, clientName: e.target.value})} className="w-full bg-[var(--mv-cream)] rounded-xl px-4 py-3 text-sm border border-black/5 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-black/40">Teléfono</label>
                  <input type="text" required value={newRes.phone} onChange={(e) => setNewRes({...newRes, phone: e.target.value})} className="w-full bg-[var(--mv-cream)] rounded-xl px-4 py-3 text-sm border border-black/5 outline-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest font-bold text-black/40">Email</label>
                <input type="email" required value={newRes.email} onChange={(e) => setNewRes({...newRes, email: e.target.value})} className="w-full bg-[var(--mv-cream)] rounded-xl px-4 py-3 text-sm border border-black/5 outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-black/40">Tipo de Servicio</label>
                  <select value={newRes.serviceType} onChange={(e) => setNewRes({...newRes, serviceType: e.target.value})} className="w-full bg-[var(--mv-cream)] rounded-xl px-4 py-3 text-sm border border-black/5 outline-none">
                    <option value="Boda">Boda</option>
                    <option value="Preboda">Preboda</option>
                    <option value="Estudio">Estudio</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-black/40">Valor (COP)</label>
                  <input type="number" required value={newRes.value} onChange={(e) => setNewRes({...newRes, value: Number(e.target.value)})} className="w-full bg-[var(--mv-cream)] rounded-xl px-4 py-3 text-sm border border-black/5 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-black/40">Fecha del Evento</label>
                  <input type="date" required value={newRes.eventDate} onChange={(e) => setNewRes({...newRes, eventDate: e.target.value})} className="w-full bg-[var(--mv-cream)] rounded-xl px-4 py-3 text-sm border border-black/5 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-black/40">Hora</label>
                  <input type="time" required value={newRes.time} onChange={(e) => setNewRes({...newRes, time: e.target.value})} className="w-full bg-[var(--mv-cream)] rounded-xl px-4 py-3 text-sm border border-black/5 outline-none" />
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-6 py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-black/5 transition">Cancelar</button>
                <button type="submit" disabled={loading} className="flex-1 bg-[var(--mv-ink)] text-white px-6 py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-[var(--mv-sage)] transition flex items-center justify-center gap-2 shadow-lg">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : 'Confirmar Reserva'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
