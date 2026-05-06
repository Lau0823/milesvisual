"use client";

import { useAdminStore } from '../../../store/useAdminStore';
import { DollarSign, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function FinanzasPage() {
  const { reservations, totalPaidIncome, totalPendingIncome, refunds, expenses } = useAdminStore();

  // Agrupar ingresos reales por mes (Flujo de Caja)
  const getMonthlyCashFlow = () => {
    const monthly: Record<string, number> = {};
    reservations.forEach(res => {
      const val = Number(res.value || 0);
      const ant = Number(res.anticipo || 0);
      const dev = Number(res.devolucion || 0);
      
      // Dinero real que entró de esta reserva
      const actualReceived = (res.paymentStatus === 'paid' ? val : ant) - dev;

      if (actualReceived > 0) {
        const date = new Date(res.eventDate || res.createdAt || '');
        const monthYear = date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
        monthly[monthYear] = (monthly[monthYear] || 0) + actualReceived;
      }
    });
    return Object.entries(monthly).map(([month, total]) => ({ month, total }));
  };

  const monthlyData = getMonthlyCashFlow();
  const netUtility = totalPaidIncome - expenses;

  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-700">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="mv-script text-[32px] text-[var(--mv-sage)] leading-none mb-2">finanzas</p>
          <h2 className="text-4xl font-semibold tracking-tight uppercase">Dashboard de Utilidad</h2>
          <p className="text-sm text-black/40 mt-2 max-w-[500px]">
            Cálculo basado en flujo de caja real (Pagos Recibidos - Devoluciones - Gastos).
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-white px-6 py-4 rounded-2xl border border-black/5 shadow-sm">
            <p className="text-[9px] uppercase tracking-widest text-black/40 font-bold mb-1">Utilidad Neta</p>
            <h4 className={`text-xl font-bold ${netUtility >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              $ {netUtility.toLocaleString()}
            </h4>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_350px] gap-8">
        
        {/* Listado de Meses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 content-start">
          {monthlyData.length > 0 ? monthlyData.map((data, idx) => (
            <div key={idx} className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5 hover:shadow-xl transition-all duration-500">
              <p className="text-[10px] uppercase tracking-[0.3em] text-black/40 font-bold mb-4">{data.month}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-semibold tracking-tight">$ {data.total.toLocaleString()}</h3>
                <div className="p-2 bg-green-50 text-green-600 rounded-full">
                  <TrendingUp size={16} />
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-20 text-center bg-black/[0.02] rounded-[32px] border-2 border-dashed border-black/5">
              <p className="text-[11px] uppercase tracking-widest text-black/30 font-bold">Sin ingresos registrados</p>
            </div>
          )}
        </div>

        {/* Sidebar de Resumen */}
        <div className="space-y-6">
          <div className="bg-[var(--mv-sage)] text-white rounded-[32px] p-8 shadow-lg">
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-70 font-bold mb-2">Ingresos (Caja)</p>
            <h3 className="text-4xl font-bold tracking-tight">$ {totalPaidIncome.toLocaleString()}</h3>
            <p className="text-[10px] opacity-60 mt-4 leading-relaxed">
              Total de anticipos y pagos finales recibidos, menos devoluciones.
            </p>
          </div>

          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5 space-y-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-black/40 font-bold mb-2">Pendiente por Cobrar</p>
              <h3 className="text-2xl font-semibold text-[var(--mv-ink)]">$ {totalPendingIncome.toLocaleString()}</h3>
            </div>
            
            <div className="pt-6 border-t border-black/5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-rose-500/60 font-bold mb-2">Egresos Totales</p>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-black/40 italic">Devoluciones:</span>
                  <span className="font-bold text-rose-600">-$ {refunds.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-black/40 italic">Costos Operativos:</span>
                  <span className="font-bold text-rose-600">-$ {expenses.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[var(--mv-cream)] rounded-[24px] border border-[var(--mv-sage)]/10">
            <p className="text-[10px] text-[var(--mv-sage)] font-bold italic leading-relaxed">
              "El éxito no es solo lo que facturas, sino lo que logras retener."
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
