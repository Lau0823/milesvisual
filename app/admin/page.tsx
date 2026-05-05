"use client";

import { useState, useEffect } from 'react';
import { useAdminStore } from '../../store/useAdminStore';
import { 
  Calendar, DollarSign, TrendingUp, Users, ArrowUpRight, 
  Clock, CheckCircle2, Image as ImageIcon, MoreVertical, 
  Search, Plus, Filter, Mail, Phone, CalendarDays, Upload, Trash2, ChevronLeft, ChevronRight, Activity
} from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function DashboardPage() {
  const { data: session } = useSession();
  const { 
    totalActiveReservations, totalPaidIncome, totalPendingIncome, totalPosts, 
    reservations, mediaPosts, syncWithBackend 
  } = useAdminStore();

  const [loading, setLoading] = useState(false);
  const [currentDateObj, setCurrentDateObj] = useState(new Date());
  
  const [newRes, setNewRes] = useState({
    clientName: '', email: '', phone: '', serviceType: 'Boda', eventDate: '', time: '', value: ''
  });

  useEffect(() => {
    syncWithBackend();
  }, []);

  const getMonthlyIncome = () => {
    const monthly: Record<string, number> = {};
    reservations.forEach(res => {
      if (res.paymentStatus === 'paid') {
        const date = new Date(res.eventDate || new Date());
        const monthYear = date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
        monthly[monthYear] = (monthly[monthYear] || 0) + Number(res.value);
      }
    });
    return Object.entries(monthly).map(([month, total]) => ({ month, total }));
  };

  const monthlyData = getMonthlyIncome();

  // --- Dynamic Calendar Logic ---
  const currentMonth = currentDateObj.toLocaleDateString('es-ES', { month: 'long' });
  const currentYear = currentDateObj.getFullYear();
  const daysInMonth = new Date(currentYear, currentDateObj.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentDateObj.getMonth(), 1).getDay();
  
  // Find days in this month that have reservations
  const daysWithReservations = reservations
    .filter(r => r.eventDate && new Date(r.eventDate || '').getMonth() === currentDateObj.getMonth() && new Date(r.eventDate || '').getFullYear() === currentYear)
    .map(r => new Date(r.eventDate || '').getDate());

  const currentMonthReservations = reservations.filter(r => 
    r.eventDate && new Date(r.eventDate || '').getMonth() === currentDateObj.getMonth() && new Date(r.eventDate || '').getFullYear() === currentYear
  );

  const prevMonth = () => setCurrentDateObj(new Date(currentYear, currentDateObj.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDateObj(new Date(currentYear, currentDateObj.getMonth() + 1, 1));

  // --- Form Logic ---
  const handleCreateReservation = async (status: string) => {
    if (!newRes.clientName || !newRes.eventDate) return alert("Nombre y Fecha son obligatorios");
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      await fetch(`${apiUrl}/reservations`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(session as any)?.accessToken}`
        },
        body: JSON.stringify({ 
          ...newRes, 
          value: Number(newRes.value) || 0,
          status, 
          paymentStatus: 'pending' 
        })
      });
      await syncWithBackend();
      setNewRes({ clientName: '', email: '', phone: '', serviceType: 'Boda', eventDate: '', time: '', value: '' });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="animate-in fade-in duration-700 space-y-8 pb-20">
      
      {/* HEADER DASHBOARD */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-black/40 font-bold mb-1">PANEL DE GESTIÓN</p>
          <h2 className="text-4xl font-semibold tracking-tight uppercase">DASHBOARD</h2>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-white border border-black/5 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-black/5 transition shadow-sm">EXPORTAR</button>
          <button className="px-6 py-2.5 bg-[#789894] text-white rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-[#66827e] transition shadow-sm">NUEVO REGISTRO</button>
        </div>
      </div>

      {/* KPI CARDS SUPERIORES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'RESERVAS ACTIVAS', value: totalActiveReservations, icon: <Calendar size={16} /> },
          { label: 'INGRESO PAGADO', value: `$ ${totalPaidIncome.toLocaleString()}`, icon: <CheckCircle2 size={16} /> },
          { label: 'PENDIENTE', value: `$ ${totalPendingIncome.toLocaleString()}`, icon: <Clock size={16} /> },
          { label: 'PUBLICACIONES', value: totalPosts, icon: <ImageIcon size={16} /> },
        ].map((kpi, i) => (
          <div key={i} className="bg-white rounded-[24px] p-7 shadow-sm border border-black/5 flex justify-between items-start hover:shadow-md transition">
            <div>
              <p className="text-[8px] uppercase tracking-[0.25em] font-bold text-black/30 mb-4">{kpi.label}</p>
              <h3 className="text-2xl font-bold tracking-tight">{kpi.value}</h3>
            </div>
            <div className="p-2 bg-[var(--mv-cream)] text-[var(--mv-sage)] rounded-lg">
              {kpi.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
        
        {/* COLUMNA IZQUIERDA: GESTIÓN MANUAL + FINANZAS + MEDIA */}
        <div className="space-y-8">
          
          {/* GESTIÓN MANUAL (FORMULARIO ACTIVO) */}
          <div className="bg-white rounded-[40px] p-10 shadow-sm border border-black/5">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="mv-script text-[24px] text-[var(--mv-gold)] leading-none">reservas</p>
                <h4 className="text-2xl font-bold uppercase tracking-tight">GESTIÓN MANUAL</h4>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={14} />
                <input type="text" placeholder="Buscar cliente o servicio" className="pl-10 pr-6 py-2.5 bg-[var(--mv-cream)]/50 border border-black/5 rounded-full text-[10px] outline-none w-64" />
              </div>
            </div>

            <div className="grid md:grid-cols-[1fr_240px] gap-8">
              <div className="bg-[var(--mv-cream)]/50 rounded-[32px] p-8 border border-black/5">
                <div className="flex items-center justify-between mb-6">
                  <h5 className="text-[10px] uppercase tracking-widest font-bold text-black/40">NUEVA RESERVA</h5>
                  <Plus size={16} className="text-black/20" />
                </div>
                <div className="space-y-4">
                  <input type="text" value={newRes.clientName} onChange={e => setNewRes({...newRes, clientName: e.target.value})} placeholder="Nombre del cliente" className="w-full bg-white rounded-xl px-5 py-3.5 text-xs border border-black/5 outline-none focus:border-[var(--mv-sage)] transition" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="email" value={newRes.email} onChange={e => setNewRes({...newRes, email: e.target.value})} placeholder="Correo" className="w-full bg-white rounded-xl px-5 py-3.5 text-xs border border-black/5 outline-none focus:border-[var(--mv-sage)] transition" />
                    <input type="text" value={newRes.phone} onChange={e => setNewRes({...newRes, phone: e.target.value})} placeholder="Teléfono" className="w-full bg-white rounded-xl px-5 py-3.5 text-xs border border-black/5 outline-none focus:border-[var(--mv-sage)] transition" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <select value={newRes.serviceType} onChange={e => setNewRes({...newRes, serviceType: e.target.value})} className="w-full bg-white rounded-xl px-5 py-3.5 text-xs border border-black/5 outline-none text-black/70">
                      <option value="Boda">Boda</option>
                      <option value="Preboda">Preboda</option>
                      <option value="Estudio">Estudio</option>
                    </select>
                    <input type="number" value={newRes.value} onChange={e => setNewRes({...newRes, value: e.target.value})} placeholder="Valor (Ej: 1500)" className="w-full bg-white rounded-xl px-5 py-3.5 text-xs border border-black/5 outline-none focus:border-[var(--mv-sage)] transition" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="date" value={newRes.eventDate} onChange={e => setNewRes({...newRes, eventDate: e.target.value})} className="w-full bg-white rounded-xl px-5 py-3.5 text-xs border border-black/5 outline-none text-black/70" />
                    <input type="time" value={newRes.time} onChange={e => setNewRes({...newRes, time: e.target.value})} className="w-full bg-white rounded-xl px-5 py-3.5 text-xs border border-black/5 outline-none text-black/70" />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button onClick={() => handleCreateReservation('pending')} disabled={loading} className="flex-1 py-4 bg-[#789894] text-white rounded-2xl text-[9px] font-bold uppercase tracking-widest hover:bg-[#66827e] transition">
                      {loading ? '...' : 'CREAR RESERVA'}
                    </button>
                    <button onClick={() => handleCreateReservation('confirmed')} disabled={loading} className="flex-1 py-4 bg-white border border-black/5 text-black/60 rounded-2xl text-[9px] font-bold uppercase tracking-widest hover:bg-black/5 transition">
                      {loading ? '...' : 'ENVIAR CONFIRMACIÓN'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                 <p className="text-[9px] uppercase tracking-widest font-bold text-[var(--mv-ink)] bg-[var(--mv-cream)] px-4 py-3 rounded-xl border border-black/5 text-center">CLIENTES/SERVICIOS</p>
                 <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
                    {reservations.map((r, i) => (
                      <div key={r.id} className="pb-4 border-b border-black/5 last:border-0 group cursor-pointer hover:bg-black/5 p-2 rounded-xl transition">
                        <div className="flex justify-between items-start">
                          <h6 className="text-[11px] font-bold uppercase tracking-tight text-[var(--mv-ink)] group-hover:text-[var(--mv-sage)] transition">{r.clientName}</h6>
                          <div className={`w-1.5 h-1.5 rounded-full ${r.status === 'confirmed' ? 'bg-[var(--mv-sage)]' : 'bg-amber-400'}`} />
                        </div>
                        <p className="text-[9px] opacity-40 truncate mb-1">{r.email || r.phone}</p>
                        <p className="text-[8px] uppercase tracking-widest font-bold text-[var(--mv-gold)]">{r.serviceType}</p>
                      </div>
                    ))}
                    {reservations.length === 0 && <p className="text-xs text-center opacity-40 italic mt-10">No hay reservas aún</p>}
                 </div>
              </div>
            </div>
          </div>

          {/* RESUMEN MENSUAL (FINANZAS) */}
          <div className="bg-white rounded-[40px] p-10 shadow-sm border border-black/5">
            <div className="flex items-start gap-10">
              <div className="min-w-[200px]">
                <p className="mv-script text-[24px] text-[var(--mv-gold)] leading-none">finanzas</p>
                <h4 className="text-2xl font-bold uppercase tracking-tight">RESUMEN MENSUAL</h4>
              </div>
              <p className="text-[10px] text-black/40 leading-relaxed max-w-[400px]">
                Los ingresos se agrupan aquí cuando cambias el estado de pago de una reserva a "Pagado". Se calculan con base en la fecha del evento.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-10">
               {monthlyData.map((m, i) => (
                 <div key={i} className="bg-[var(--mv-cream)]/40 p-6 rounded-[28px] border border-black/5 hover:border-[var(--mv-sage)] transition duration-300">
                    <p className="text-[8px] uppercase tracking-widest font-bold text-black/30 mb-3">{m.month}</p>
                    <h5 className="text-xl font-bold text-[var(--mv-sage)]">$ {m.total.toLocaleString()}</h5>
                 </div>
               ))}
               {monthlyData.length === 0 && <p className="text-xs opacity-40 italic col-span-3">Aún no hay ingresos registrados para mostrar un resumen.</p>}
            </div>
          </div>

          {/* PUBLICACIÓN Y GESTIÓN (MEDIA) */}
          <div className="bg-white rounded-[40px] p-10 shadow-sm border border-black/5">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="mv-script text-[24px] text-[var(--mv-gold)] leading-none">media</p>
                <h4 className="text-2xl font-bold uppercase tracking-tight">PUBLICACIÓN Y GESTIÓN</h4>
              </div>
              <div className="flex gap-2">
                 <button className="px-6 py-2.5 bg-[#789894] text-white rounded-full text-[9px] uppercase tracking-widest font-bold flex items-center gap-2 shadow-sm hover:bg-[#66827e] transition"><ImageIcon size={14} /> GESTIONAR GALERÍA</button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {mediaPosts.slice(0, 4).map((p, i) => (
                 <div key={i} className="bg-[var(--mv-cream)]/40 p-2.5 rounded-[24px] border border-black/5 group">
                    <div className="aspect-[3/4] rounded-[20px] overflow-hidden mb-4 relative bg-black/5">
                       <img src={p.cloudinaryUrl} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                       <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 rounded-full text-[7px] font-bold tracking-widest uppercase">{p.category}</div>
                    </div>
                    <div className="px-1 space-y-3 pb-2">
                       <h6 className="text-[10px] font-bold uppercase truncate">{p.title}</h6>
                       <div className="flex items-center justify-center py-1.5 bg-[#789894]/10 text-[#789894] rounded-lg text-[7px] font-bold uppercase tracking-widest">PUBLICADO</div>
                    </div>
                 </div>
               ))}
               {mediaPosts.length === 0 && <div className="col-span-4 py-10 text-center text-xs opacity-40 italic">No hay publicaciones en la galería.</div>}
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: AGENDA VISUAL + SISTEMA ACTIVO */}
        <div className="space-y-8">
          
          {/* CALENDARIO Y AGENDA DINÁMICO */}
          <div className="bg-white rounded-[40px] p-10 shadow-sm border border-black/5">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="mv-script text-[24px] text-[var(--mv-gold)] leading-none">calendario</p>
                <h4 className="text-2xl font-bold uppercase tracking-tight">AGENDA VISUAL</h4>
              </div>
              <div className="flex gap-2">
                <button onClick={prevMonth} className="p-2 bg-[var(--mv-cream)] rounded-lg text-black/40 hover:text-black transition"><ChevronLeft size={16} /></button>
                <button onClick={nextMonth} className="p-2 bg-[var(--mv-cream)] rounded-lg text-black/40 hover:text-black transition"><ChevronRight size={16} /></button>
              </div>
            </div>

            <div className="mb-10">
               <p className="text-[10px] uppercase tracking-widest font-bold text-center mb-6 text-[var(--mv-ink)]">
                 {currentMonth} {currentYear}
               </p>
               <div className="grid grid-cols-7 gap-2 text-center text-[9px] font-bold text-black/30 mb-4">
                  {['D','L','M','M','J','V','S'].map(d => <div key={d}>{d}</div>)}
               </div>
               <div className="grid grid-cols-7 gap-2">
                  {/* Celdas vacías para alinear el primer día del mes */}
                  {Array.from({length: firstDayOfMonth}).map((_, i) => <div key={`empty-${i}`} />)}
                  
                  {/* Días del mes */}
                  {Array.from({length: daysInMonth}).map((_, i) => {
                    const dayNumber = i + 1;
                    const hasReservation = daysWithReservations.includes(dayNumber);
                    return (
                      <div key={dayNumber} className={`aspect-square flex items-center justify-center rounded-xl text-[10px] font-semibold transition cursor-default
                        ${hasReservation ? 'bg-[#789894] text-white shadow-md hover:bg-[#66827e]' : 'bg-black/[0.02] hover:bg-black/5'}
                      `}>
                        {dayNumber}
                      </div>
                    );
                  })}
               </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-black/5">
               <div className="flex justify-between items-center">
                 <p className="text-[9px] uppercase tracking-widest font-bold text-black/40">RESERVAS ESTE MES</p>
                 <span className="text-[9px] font-bold bg-[var(--mv-cream)] px-2 py-1 rounded text-black/40">{currentMonthReservations.length}</span>
               </div>
               
               {currentMonthReservations.slice(0, 3).map((r, i) => (
                 <div key={r.id} className="bg-[var(--mv-cream)]/30 p-6 rounded-[28px] border border-black/5 hover:bg-[var(--mv-cream)] transition">
                    <div className="flex justify-between items-start mb-4">
                       <h6 className="text-[13px] font-bold uppercase tracking-tight">{r.clientName}</h6>
                       <span className="text-[9px] opacity-40 font-bold">{new Date(r.eventDate || '').toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}</span>
                    </div>
                    <p className="text-[10px] opacity-40 uppercase tracking-widest font-bold mb-6">{r.serviceType}</p>
                    <div className="flex gap-2">
                       <button className={`flex-1 py-2.5 rounded-xl text-[8px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition ${r.status === 'confirmed' ? 'bg-white border border-black/5 text-[var(--mv-sage)]' : 'bg-[#789894] text-white hover:bg-[#66827e]'}`}>
                         {r.status === 'confirmed' ? <><CheckCircle2 size={12} /> CONFIRMADO</> : 'CONFIRMAR'}
                       </button>
                    </div>
                 </div>
               ))}
               {currentMonthReservations.length === 0 && (
                 <p className="text-xs text-center opacity-40 italic py-6 bg-black/[0.02] rounded-2xl">Libre. Sin reservas para este mes.</p>
               )}
            </div>
          </div>

          {/* ESTADO DEL SISTEMA (ANTES VISTA FUTURA) */}
          <div className="bg-[var(--mv-ink)] text-white rounded-[40px] p-10 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10">
               <Activity size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                 <div className="p-2 bg-white/10 text-[var(--mv-gold)] rounded-lg">
                    <Activity size={18} />
                 </div>
                 <h4 className="text-xl font-bold uppercase tracking-tight">ESTADO DEL SISTEMA</h4>
              </div>
              <div className="space-y-6">
                 <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                    <p className="text-[8px] uppercase tracking-widest font-bold text-white/40 mb-3">CONEXIÓN BACKEND</p>
                    <p className="text-[11px] leading-relaxed text-white/80">
                      La interfaz se encuentra 100% conectada a la base de datos PostgreSQL. Todos los módulos operativos.
                    </p>
                 </div>
                 <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                    <p className="text-[8px] uppercase tracking-widest font-bold text-white/40 mb-4">MÓDULOS ACTIVOS</p>
                    <ul className="space-y-4">
                       <li className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/80">
                          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--mv-sage)]"><CheckCircle2 size={12} className="text-white" /></div> 
                          Sincronización Google Calendar
                       </li>
                       <li className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/80">
                          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--mv-sage)]"><CheckCircle2 size={12} className="text-white" /></div> 
                          Correos Transaccionales (Nodemailer)
                       </li>
                       <li className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/80">
                          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--mv-sage)]"><CheckCircle2 size={12} className="text-white" /></div> 
                          Subida a Nube Cloudinary
                       </li>
                    </ul>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
