"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useAdminStore } from '../../../store/useAdminStore';
import { Calendar, Plus, Search, Filter, MoreHorizontal, CheckCircle2, Clock, XCircle, Loader2, Mail, Phone, CalendarDays, FileText, CreditCard, DollarSign, Edit3, Trash2 } from 'lucide-react';
import { generateQuotePDF } from '../../../utils/pdfGenerator';
import toast from 'react-hot-toast';
import { showConfirmToast } from '../../../components/admin/ConfirmToast';

export default function ReservasPage() {
  const { data: session } = useSession();
  const { reservations, planes, syncWithBackend, fetchPlanes, deleteReservation } = useAdminStore();

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingRes, setEditingRes] = useState<any>(null);
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id: number) => {
    showConfirmToast({
      title: '¿Eliminar esta reserva?',
      message: 'Esta acción es irreversible y afectará tus métricas de finanzas y la agenda.',
      onConfirm: async () => {
        const loadingToast = toast.loading('Eliminando reserva...');
        try {
          if (!session?.accessToken) return;
          await deleteReservation((session as any).accessToken, id);
          toast.success('Reserva eliminada con éxito', { id: loadingToast });
        } catch (error: any) {
          toast.error(`Error: ${error.message}`, { id: loadingToast });
        }
      }
    });
  };

  // Estados temporales para los inputs de valor (evitar el problema del cero a la izquierda)
  const [valInput, setValInput] = useState('');
  const [antInput, setAntInput] = useState('');
  const [devInput, setDevInput] = useState('');
  const [gasInput, setGasInput] = useState('');

  const [formRes, setFormRes] = useState({
    clientName: '',
    email: '',
    phone: '',
    serviceType: 'Personalizado',
    eventDate: '',
    time: '',
    value: 0,
    anticipo: 0,
    devolucion: 0,
    gastos_operativos: 0,
    notas_admin: '',
    status: 'pending',
    paymentStatus: 'pending'
  });

  useEffect(() => {
    if (session?.accessToken) {
      syncWithBackend(session.accessToken as string);
      fetchPlanes(session.accessToken as string);
    }
  }, [session, syncWithBackend, fetchPlanes]);

  // Lógica para convertir Cotización -> Reserva
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('convert') === 'true') {
      const name = params.get('name') || '';
      const email = params.get('email') || '';
      const phone = params.get('phone') || '';
      const service = params.get('service') || 'Personalizado';

      // Buscar si el servicio coincide con un plan para poner el precio
      const matchedPlan = planes.find(p => p.nombre.toLowerCase() === service.toLowerCase() || p.categoria.toLowerCase() === service.toLowerCase());
      const price = matchedPlan ? Number(matchedPlan.precio_base) : 0;

      setFormRes(prev => ({
        ...prev,
        clientName: name,
        email: email,
        phone: phone,
        serviceType: matchedPlan ? matchedPlan.nombre : 'Personalizado',
        value: price
      }));
      setValInput(price > 0 ? price.toString() : '');
      setShowModal(true);
      // Limpiar la URL para que no se abra de nuevo al recargar
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  // Al abrir el modal para editar, sincronizamos los inputs
  const openModal = (res: any = null) => {
    if (res) {
      setEditingRes(res);
      setFormRes({
        clientName: res.clientName,
        email: res.email || '',
        phone: res.phone || '',
        serviceType: res.serviceType,
        eventDate: res.eventDate || '',
        time: res.time || '',
        value: Number(res.value),
        anticipo: Number(res.anticipo || 0),
        devolucion: Number(res.devolucion || 0),
        gastos_operativos: Number(res.gastos_operativos || 0),
        notas_admin: res.notas_admin || '',
        status: res.status,
        paymentStatus: res.paymentStatus
      });
      setValInput(res.value > 0 ? res.value.toString() : '');
      setAntInput(res.anticipo > 0 ? res.anticipo.toString() : '');
      setDevInput(res.devolucion > 0 ? res.devolucion.toString() : '');
      setGasInput(res.gastos_operativos > 0 ? res.gastos_operativos.toString() : '');
    } else {
      setEditingRes(null);
      setFormRes({
        clientName: '', email: '', phone: '', serviceType: 'Personalizado',
        eventDate: '', time: '', value: 0, anticipo: 0,
        devolucion: 0, gastos_operativos: 0, notas_admin: '',
        status: 'pending', paymentStatus: 'pending'
      });
      setValInput('');
      setAntInput('');
      setDevInput('');
      setGasInput('');
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading(editingRes ? 'Actualizando reserva...' : 'Creando reserva...');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const method = editingRes ? 'PATCH' : 'POST';
      const url = editingRes ? `${apiUrl}/reservations/${editingRes.id}` : `${apiUrl}/reservations`;

      // Calcular estado de pago automáticamente si no se ha tocado
      let pStatus = formRes.paymentStatus;
      if (formRes.anticipo <= 0) pStatus = 'pending';
      else if (formRes.anticipo < formRes.value) pStatus = 'partial';
      else pStatus = 'paid';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(session as any)?.accessToken}`
        },
        body: JSON.stringify({
          ...formRes,
          paymentStatus: pStatus,
          date: new Date().toISOString().split('T')[0]
        })
      });

      if (res.ok) {
        toast.success(editingRes ? 'Reserva actualizada' : 'Reserva creada con éxito', { id: loadingToast });
        setShowModal(false);
        await syncWithBackend((session as any)?.accessToken);
      } else {
        throw new Error('Error en el servidor');
      }
    } catch (error) {
      toast.error('Hubo un error al procesar la reserva', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const handlePlanChange = (planName: string) => {
    if (planName === 'Personalizado') {
      setFormRes({ ...formRes, serviceType: 'Personalizado' });
    } else {
      const selectedPlan = planes.find(p => p.nombre === planName);
      if (selectedPlan) {
        setFormRes({
          ...formRes,
          serviceType: selectedPlan.nombre,
          value: Number(selectedPlan.precio_base)
        });
        setValInput(selectedPlan.precio_base > 0 ? selectedPlan.precio_base.toString() : '');
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: any = {
      pending: 'bg-amber-50 text-amber-600 border-amber-200',
      confirmed: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      cancelled: 'bg-rose-50 text-rose-600 border-rose-200',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${styles[status] || styles.pending}`}>
        {status}
      </span>
    );
  };

  const getSetting = (key: string, defaultValue: string = '') => {
    const settings = (useAdminStore.getState() as any).settings;
    if (Array.isArray(settings)) {
      return settings.find((s: any) => s.key === key)?.value || defaultValue;
    }
    return defaultValue;
  };

  const siteLogo = getSetting('site_logo', 'https://res.cloudinary.com/dgfp5gcjr/image/upload/v1714290580/milesvisual/logo_white.png');

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
            onClick={() => openModal()}
            className="bg-[var(--mv-ink)] text-white px-6 py-3 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[var(--mv-sage)] transition flex items-center gap-2 shadow-lg"
          >
            <Plus size={16} /> Nueva Reserva
          </button>
        </div>
      </div>

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

      <div className="bg-white rounded-[32px] border border-black/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-black/[0.02] border-b border-black/5">
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-black/40">Cliente</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-black/40">Servicio</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-black/40">Fecha Evento</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-black/40">Finanzas</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-black/40">Estado</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-black/40 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((res) => {
                const saldo = Number(res.value) - Number(res.anticipo || 0);
                return (
                  <tr key={res.id} className="border-b border-black/5 hover:bg-black/[0.01] transition-colors group">
                    <td className="px-8 py-6">
                      <div>
                        <p className="text-sm font-semibold text-[var(--mv-ink)]">{res.clientName}</p>
                        <div className="flex flex-col gap-1 mt-1 opacity-40">
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
                        {res.eventDate ? new Date(res.eventDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) : '---'}
                        <span className="text-[10px] opacity-50 ml-1">at {res.time}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-medium text-[11px]">
                      <div className="space-y-1">
                        <div className="flex justify-between w-24">
                          <span className="opacity-40 uppercase">Total:</span>
                          <span>${Number(res.value).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between w-24 text-[var(--mv-sage)]">
                          <span className="opacity-40 uppercase">Antic:</span>
                          <span>${Number(res.anticipo || 0).toLocaleString()}</span>
                        </div>
                        <div className={`flex justify-between w-24 font-bold ${saldo > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                          <span className="opacity-40 uppercase">Saldo:</span>
                          <span>${saldo.toLocaleString()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-2">
                        {getStatusBadge(res.status)}
                        <div className={`text-[8px] uppercase tracking-tighter font-bold px-2 py-0.5 rounded-md border w-fit ${res.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                          PAGO: {res.paymentStatus}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={async () => {
                            const t = toast.loading("Generando documento...");
                            try {
                              await generateQuotePDF(res as any, 'quote', siteLogo);
                              toast.success("PDF generado con éxito", { id: t });
                            } catch (e) {
                              toast.error("Error al generar PDF", { id: t });
                              console.error(e);
                            }
                          }}
                          className="p-2.5 bg-[var(--mv-cream)] text-[var(--mv-gold)] rounded-xl hover:bg-[var(--mv-gold)] hover:text-white transition flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest px-4 shadow-sm"
                        >
                          <FileText size={14} /> PDF
                        </button>
                        <button
                          onClick={() => openModal(res)}
                          className="p-2.5 bg-black/5 text-black/40 rounded-xl hover:bg-[var(--mv-ink)] hover:text-white transition shadow-sm"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(res.id)}
                          className="p-2.5 bg-rose-50 text-rose-400 rounded-xl hover:bg-rose-500 hover:text-white transition shadow-sm"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-[32px] w-full max-w-[700px] p-8 shadow-2xl animate-in zoom-in-95 duration-300 overflow-y-auto max-h-[95vh]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-semibold uppercase tracking-tight">{editingRes ? 'Editar Reserva' : 'Nueva Reserva'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-black/5 rounded-full"><XCircle size={24} className="text-black/20" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-black/5 p-6 rounded-3xl space-y-4">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-2 border-b border-black/5 pb-2">Datos del Cliente</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-black/40 ml-1">Nombre Completo</label>
                    <input type="text" required value={formRes.clientName} onChange={(e) => setFormRes({ ...formRes, clientName: e.target.value })} className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-black/5 outline-none focus:border-[var(--mv-sage)]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-black/40 ml-1">Teléfono / WhatsApp</label>
                    <input type="text" required value={formRes.phone} onChange={(e) => setFormRes({ ...formRes, phone: e.target.value })} className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-black/5 outline-none focus:border-[var(--mv-sage)]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-black/40 ml-1">Correo Electrónico</label>
                  <input type="email" required value={formRes.email} onChange={(e) => setFormRes({ ...formRes, email: e.target.value })} className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-black/5 outline-none focus:border-[var(--mv-sage)]" />
                </div>
              </div>

              <div className="bg-[var(--mv-cream)]/50 p-6 rounded-3xl space-y-4 border border-[var(--mv-sage)]/10">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--mv-sage)] mb-2 border-b border-[var(--mv-sage)]/10 pb-2">Detalles del Servicio & Finanzas</p>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-black/40 ml-1">Seleccionar Plan</label>
                    <select
                      value={formRes.serviceType}
                      onChange={(e) => handlePlanChange(e.target.value)}
                      className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-black/5 outline-none focus:border-[var(--mv-sage)]"
                    >
                      <option value="Personalizado">--- Personalizado ---</option>
                      {planes.map(p => (
                        <option key={p.id} value={p.nombre}>{p.nombre} (${Number(p.precio_base).toLocaleString()})</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-black/40 ml-1">Valor Total (COP)</label>
                    <div className="relative">
                      <DollarSign size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" />
                      <input
                        type="text"
                        required
                        value={valInput}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').replace(/^0+/, '');
                          setValInput(val);
                          setFormRes({ ...formRes, value: Number(val) });
                        }}
                        placeholder="0"
                        className="w-full bg-white rounded-xl pl-10 pr-4 py-3 text-sm border border-black/5 outline-none focus:border-[var(--mv-sage)] font-bold text-[var(--mv-ink)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-[var(--mv-sage)] ml-1">Anticipo / Abono</label>
                    <div className="relative">
                      <CreditCard size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--mv-sage)]/30" />
                      <input
                        type="text"
                        value={antInput}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').replace(/^0+/, '');
                          setAntInput(val);
                          setFormRes({ ...formRes, anticipo: Number(val) });
                        }}
                        placeholder="0"
                        className="w-full bg-white rounded-xl pl-10 pr-4 py-3 text-sm border border-[var(--mv-sage)]/20 outline-none focus:border-[var(--mv-sage)] font-bold text-[var(--mv-sage)]"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-black/40 ml-1">Saldo Pendiente</label>
                    <div className="w-full bg-black/5 rounded-xl px-4 py-3 text-sm font-bold text-amber-600">
                      ${(formRes.value - formRes.anticipo).toLocaleString()}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-black/40 ml-1">Estado Reserva</label>
                    <select value={formRes.status} onChange={(e) => setFormRes({ ...formRes, status: e.target.value })} className="w-full bg-white rounded-xl px-4 py-3 text-[10px] uppercase font-bold border border-black/5 outline-none">
                      <option value="pending">Pendiente</option>
                      <option value="confirmed">Confirmada</option>
                      <option value="cancelled">Cancelada</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-black/5">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-rose-500/60 ml-1">Devolución (Refund)</label>
                    <div className="relative">
                      <DollarSign size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-300" />
                      <input
                        type="text"
                        value={devInput}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').replace(/^0+/, '');
                          setDevInput(val);
                          setFormRes({ ...formRes, devolucion: Number(val) });
                        }}
                        placeholder="0"
                        className="w-full bg-rose-50/30 rounded-xl pl-10 pr-4 py-3 text-sm border border-rose-100 outline-none focus:border-rose-300 text-rose-600 font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-black/40 ml-1">Gastos Operativos</label>
                    <div className="relative">
                      <DollarSign size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" />
                      <input
                        type="text"
                        value={gasInput}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').replace(/^0+/, '');
                          setGasInput(val);
                          setFormRes({ ...formRes, gastos_operativos: Number(val) });
                        }}
                        placeholder="0"
                        className="w-full bg-white rounded-xl pl-10 pr-4 py-3 text-sm border border-black/5 outline-none focus:border-[var(--mv-sage)] font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-black/40 ml-1">Notas Internas / Motivo Cancelación</label>
                  <textarea
                    value={formRes.notas_admin}
                    onChange={(e) => setFormRes({ ...formRes, notas_admin: e.target.value })}
                    placeholder="Escribe aquí detalles sobre devoluciones, gastos o por qué se canceló la sesión..."
                    className="w-full bg-white rounded-xl px-4 py-3 text-xs border border-black/5 outline-none focus:border-[var(--mv-sage)] min-h-[80px] resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-black/40 ml-1">Fecha del Evento</label>
                  <input type="date" required value={formRes.eventDate} onChange={(e) => setFormRes({ ...formRes, eventDate: e.target.value })} className="w-full bg-black/5 rounded-xl px-4 py-3 text-sm border border-black/5 outline-none focus:border-[var(--mv-sage)]" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-black/40 ml-1">Hora</label>
                  <input type="time" required value={formRes.time} onChange={(e) => setFormRes({ ...formRes, time: e.target.value })} className="w-full bg-black/5 rounded-xl px-4 py-3 text-sm border border-black/5 outline-none focus:border-[var(--mv-sage)]" />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-black/5 transition">Cerrar</button>
                <button type="submit" disabled={loading} className="flex-1 bg-[var(--mv-ink)] text-white px-8 py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-[var(--mv-sage)] transition flex items-center justify-center gap-2 shadow-lg group">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : (
                    <>
                      <DollarSign size={14} className="group-hover:scale-110 transition" />
                      {editingRes ? 'Guardar Cambios' : 'Crear Reserva & Notificar'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


