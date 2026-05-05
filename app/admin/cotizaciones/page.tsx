"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAdminStore } from '../../../store/useAdminStore';
import { Users, Mail, Phone, Calendar, ArrowRight, CheckCircle2, MoreHorizontal, Clock, MessageSquare, FileText } from 'lucide-react';
import { generateQuotePDF } from '../../../utils/pdfGenerator';

export default function CotizacionesPage() {
  const { data: session } = useSession();
  const { quoteRequests, syncWithBackend } = useAdminStore();

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
      default: return <span className="px-3 py-1 bg-black/5 text-black/40 rounded-full text-[9px] font-bold uppercase tracking-widest">Cerrado</span>;
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
                <button className="bg-[var(--mv-sage)] text-white px-5 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-[var(--mv-ink)] transition flex items-center gap-2">
                  <CheckCircle2 size={14} /> Confirmar
                </button>
                <button className="bg-white text-[var(--mv-ink)] px-5 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest border border-black/10 hover:bg-black/5 transition flex items-center gap-2">
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
    </div>
  );
}
