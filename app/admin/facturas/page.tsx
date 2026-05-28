"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAdminStore } from '../../../store/useAdminStore';
import { DollarSign, FileText, Download, Search, Filter, Mail, Phone, Calendar } from 'lucide-react';
import { generateQuotePDF } from '../../../utils/pdfGenerator';

export default function FacturasPage() {
  const { data: session } = useSession();
  const { reservations, syncWithBackend } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (session?.accessToken) {
      syncWithBackend((session as any).accessToken);
    }
  }, [session, syncWithBackend]);

  const confirmedReservations = reservations
    .filter(r => r.status === 'confirmed')
    .filter(r => r.clientName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <p className="mv-script text-[32px] text-[var(--mv-sage)] leading-none mb-2">finanzas</p>
          <h2 className="text-4xl font-semibold tracking-tight uppercase">Facturación & Cobros</h2>
          <p className="text-sm text-black/40 mt-2">
            Genera facturas y soportes de pago para tus reservas confirmadas.
          </p>
        </div>
        
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {confirmedReservations.map((res) => (
          <div key={res.id} className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5 hover:shadow-xl transition-all duration-500 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[var(--mv-cream)] flex items-center justify-center text-[var(--mv-sage)] border border-black/5">
                <DollarSign size={20} />
              </div>
              <span className={`px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest ${res.paymentStatus === 'paid' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                {res.paymentStatus === 'paid' ? 'Pagado' : 'Pendiente'}
              </span>
            </div>

            <h3 className="text-xl font-bold text-[var(--mv-ink)] uppercase tracking-tight mb-2">{res.clientName}</h3>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2 text-[10px] text-black/40 font-medium uppercase tracking-widest">
                <FileText size={12} /> {res.serviceType}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-black/40 font-medium uppercase tracking-widest">
                <Calendar size={12} /> {new Date(res.eventDate || '').toLocaleDateString()}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-black/5 flex items-center justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-widest font-bold text-black/30 mb-1">VALOR TOTAL</p>
                <p className="text-xl font-bold text-[var(--mv-sage)]">${Number(res.value).toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => generateQuotePDF(res as any, 'invoice')}
                  title="Descargar Factura"
                  className="p-3 bg-[var(--mv-ink)] text-white rounded-xl hover:bg-[var(--mv-sage)] transition shadow-md"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {confirmedReservations.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-black/5 shadow-sm">
             <FileText size={40} className="mx-auto text-black/10 mb-4" />
             <p className="text-[11px] uppercase tracking-widest text-black/30 font-bold">No hay facturas pendientes para generar</p>
          </div>
        )}
      </div>
    </div>
  );
}

