"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAdminStore } from '../../../store/useAdminStore';
import { Users, Mail, Phone, Calendar, ArrowRight, CheckCircle2, MoreHorizontal, Clock, MessageSquare, FileText, X, Monitor, Link as LinkIcon, MapPin } from 'lucide-react';
import { generateQuotePDF } from '../../../utils/pdfGenerator';

export default function CotizacionesPage() {
  const { data: session } = useSession();
  const { quoteRequests, syncWithBackend, updateQuoteStatus } = useAdminStore();
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    if (session?.accessToken) {
      syncWithBackend(session.accessToken as string);
    }
  }, [session]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new': return <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[9px] font-bold uppercase tracking-widest border border-blue-100">Nuevo</span>;
      case 'contacted': return <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[9px] font-bold uppercase tracking-widest border border-amber-100">Contactado</span>;
      case 'converted': return <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[9px] font-bold uppercase tracking-widest border border-green-100">Convertido</span>;
      case 'discarded': return <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-[9px] font-bold uppercase tracking-widest border border-red-100">Descartado</span>;
      default: return <span className="px-3 py-1 bg-black/5 text-black/40 rounded-full text-[9px] font-bold uppercase tracking-widest">Desconocido</span>;
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedQuote || !session?.accessToken) return;
    setIsUpdatingStatus(true);
    try {
      await updateQuoteStatus(session.accessToken as string, selectedQuote.id, newStatus);
      setSelectedQuote({ ...selectedQuote, status: newStatus });
    } catch (error) {
      console.error("Failed to update status", error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-700">
      <div className="mb-10">
        <p className="mv-script text-[32px] text-[var(--mv-sage)] leading-none mb-2">leads</p>
        <h2 className="text-4xl font-semibold tracking-tight uppercase">Cotizaciones Recibidas</h2>
        <p className="text-sm text-black/40 mt-2">
          Gestione las solicitudes de presupuesto enviadas desde el formulario de contacto de la web pública.
        </p>
      </div>

      <div className="space-y-4">
        {quoteRequests.map((quote) => (
          <div key={quote.id} className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5 hover:shadow-xl transition-all duration-500 group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Info del Cliente */}
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-[var(--mv-cream)] flex items-center justify-center text-[var(--mv-sage)] border border-black/5">
                  <Users size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-[var(--mv-ink)] uppercase tracking-tight">{quote.clientName}</h3>
                    {getStatusBadge(quote.status)}
                  </div>
                  <div className="flex flex-wrap gap-4 text-[11px] text-black/40 font-medium uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Mail size={12} /> {quote.email}</span>
                    <span className="flex items-center gap-1.5"><Phone size={12} /> {quote.phone}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date((quote as any).date || quote.createdAt || '').toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Mensaje o Comentario */}
              {quote.message && (
                <div className="flex-1 max-w-[400px] px-6 py-4 bg-[var(--mv-cream)]/50 rounded-2xl border border-black/5 text-xs text-black/60 italic leading-relaxed">
                  "{quote.message}"
                </div>
              )}

              {/* Acciones */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => generateQuotePDF(quote as any)}
                  className="bg-white text-[var(--mv-gold)] px-5 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest border border-[var(--mv-gold)]/20 hover:bg-[var(--mv-gold)] hover:text-white transition flex items-center gap-2"
                >
                  <FileText size={14} /> PDF
                </button>
                <button 
                  onClick={() => {
                    const params = new URLSearchParams({
                      name: quote.clientName,
                      email: quote.email,
                      phone: quote.phone,
                      service: quote.serviceInterested,
                      convert: 'true'
                    });
                    window.location.href = `/admin/reservas?${params.toString()}`;
                  }}
                  className="bg-[var(--mv-sage)] text-white px-5 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-[var(--mv-ink)] transition flex items-center gap-2 shadow-sm"
                >
                  <ArrowRight size={14} /> Convertir a Reserva
                </button>
                <button 
                  onClick={() => setSelectedQuote(quote)}
                  className="bg-white text-[var(--mv-ink)] px-5 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest border border-black/10 hover:bg-black/5 transition flex items-center gap-2"
                >
                  Detalle
                </button>
              </div>

            </div>
          </div>
        ))}

        {quoteRequests.length === 0 && (
          <div className="py-20 text-center bg-white rounded-[40px] border border-black/5 shadow-sm">
             <MessageSquare size={40} className="mx-auto text-black/10 mb-4" />
             <p className="text-[11px] uppercase tracking-widest text-black/30 font-bold">Aún no hay cotizaciones recibidas</p>
          </div>
        )}
      </div>

      {/* Slide-over de Detalles */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 ${selectedQuote ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div 
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 backdrop-blur-sm ${selectedQuote ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setSelectedQuote(null)}
        />
        <div className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl transition-transform duration-300 transform flex flex-col ${selectedQuote ? 'translate-x-0' : 'translate-x-full'}`}>
          {selectedQuote && (
            <>
              <div className="p-6 border-b border-black/5 flex items-center justify-between bg-[var(--mv-cream)]/20">
                <h3 className="text-xl font-bold uppercase tracking-tight">Detalles del Prospecto</h3>
                <button 
                  onClick={() => setSelectedQuote(null)}
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                >
                  <X size={20} className="text-black/60" />
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">{selectedQuote.clientName}</h2>
                    <p className="text-sm text-black/50 font-medium">{selectedQuote.serviceInterested}</p>
                  </div>
                  {getStatusBadge(selectedQuote.status)}
                </div>

                <div className="space-y-6">
                  <div className="bg-[var(--mv-cream)] p-5 rounded-2xl border border-black/5 space-y-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/40">Datos de Contacto</h4>
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <Mail size={16} className="text-[var(--mv-sage)]" /> 
                      <a href={`mailto:${selectedQuote.email}`} className="hover:underline">{selectedQuote.email}</a>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <Phone size={16} className="text-[var(--mv-sage)]" /> 
                      <a href={`https://wa.me/${selectedQuote.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="hover:underline">{selectedQuote.phone}</a>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <Calendar size={16} className="text-[var(--mv-sage)]" /> 
                      {new Date(selectedQuote.date || selectedQuote.createdAt).toLocaleString()}
                    </div>
                  </div>

                  {selectedQuote.message && (
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">Mensaje</h4>
                      <p className="text-sm bg-black/5 p-4 rounded-xl leading-relaxed">
                        {selectedQuote.message}
                      </p>
                    </div>
                  )}

                  {/* Tracking / Huella Digital */}
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">Información de Origen</h4>
                    <div className="bg-white border border-black/10 rounded-2xl p-4 space-y-4">
                      {selectedQuote.sourceUrl && (
                        <div className="flex items-start gap-3">
                          <LinkIcon size={14} className="text-black/40 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Página de origen</p>
                            <a href={selectedQuote.sourceUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline break-all">
                              {selectedQuote.sourceUrl}
                            </a>
                          </div>
                        </div>
                      )}
                      {selectedQuote.userAgent && (
                        <div className="flex items-start gap-3">
                          <Monitor size={14} className="text-black/40 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Dispositivo (User Agent)</p>
                            <p className="text-xs text-black/60 break-all">{selectedQuote.userAgent}</p>
                          </div>
                        </div>
                      )}
                      {selectedQuote.ipAddress && (
                        <div className="flex items-start gap-3">
                          <MapPin size={14} className="text-black/40 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Dirección IP</p>
                            <p className="text-xs text-black/60">{selectedQuote.ipAddress}</p>
                          </div>
                        </div>
                      )}
                      {!selectedQuote.sourceUrl && !selectedQuote.userAgent && !selectedQuote.ipAddress && (
                        <p className="text-xs text-black/40 italic">No hay información de origen disponible para esta solicitud.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-black/5 bg-[var(--mv-cream)]/20">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3">Cambiar Estado</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    disabled={isUpdatingStatus || selectedQuote.status === 'new'}
                    onClick={() => handleStatusChange('new')}
                    className={`py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border ${selectedQuote.status === 'new' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-white border-black/10 hover:bg-black/5'}`}
                  >
                    Nuevo
                  </button>
                  <button 
                    disabled={isUpdatingStatus || selectedQuote.status === 'contacted'}
                    onClick={() => handleStatusChange('contacted')}
                    className={`py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border ${selectedQuote.status === 'contacted' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-white border-black/10 hover:bg-black/5'}`}
                  >
                    Contactado
                  </button>
                  <button 
                    disabled={isUpdatingStatus || selectedQuote.status === 'converted'}
                    onClick={() => handleStatusChange('converted')}
                    className={`py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border ${selectedQuote.status === 'converted' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-white border-black/10 hover:bg-black/5'}`}
                  >
                    Convertido
                  </button>
                  <button 
                    disabled={isUpdatingStatus || selectedQuote.status === 'discarded'}
                    onClick={() => handleStatusChange('discarded')}
                    className={`py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border ${selectedQuote.status === 'discarded' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white border-black/10 hover:bg-black/5'}`}
                  >
                    Descartado
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

