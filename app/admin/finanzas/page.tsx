"use client";

import { useAdminStore } from '../../../store/useAdminStore';
import { DollarSign, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function FinanzasPage() {
  const { reservations, totalPaidIncome, totalPendingIncome } = useAdminStore();

  // Agrupar ingresos por mes
  const getMonthlyIncome = () => {
    const monthly: Record<string, number> = {};
    reservations.forEach(res => {
      if (res.paymentStatus === 'paid') {
        const date = new Date(res.eventDate || '');
        const monthYear = date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
        monthly[monthYear] = (monthly[monthYear] || 0) + Number(res.value);
      }
    });
    return Object.entries(monthly).map(([month, total]) => ({ month, total }));
  };

  const monthlyData = getMonthlyIncome();

  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-700">
      <div className="mb-10">
        <p className="mv-script text-[32px] text-[var(--mv-sage)] leading-none mb-2">finanzas</p>
        <h2 className="text-4xl font-semibold tracking-tight uppercase">Resumen Mensual</h2>
        <p className="text-sm text-black/40 mt-2 max-w-[500px]">
          El switch de cada reserva cambia entre pagado y pendiente. Cuando está en pagado, el valor se suma automáticamente al mes correspondiente.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_350px] gap-8">
        
        {/* Listado de Meses (Estilo Imagen) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
              <p className="text-[11px] uppercase tracking-widest text-black/30 font-bold">No hay ingresos registrados este mes</p>
            </div>
          )}
        </div>

        {/* Sidebar de Resumen */}
        <div className="space-y-6">
          <div className="bg-[var(--mv-sage)] text-white rounded-[32px] p-8 shadow-lg">
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-70 font-bold mb-2">Total Recaudado</p>
            <h3 className="text-4xl font-bold tracking-tight">$ {totalPaidIncome.toLocaleString()}</h3>
            <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold bg-white/10 w-fit px-3 py-1.5 rounded-full">
              <ArrowUpRight size={12} /> +12.5% vs mes anterior
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/40 font-bold mb-2">Pendiente por Cobrar</p>
            <h3 className="text-2xl font-semibold text-[var(--mv-ink)]">$ {totalPendingIncome.toLocaleString()}</h3>
            <p className="text-[10px] text-black/30 mt-4 leading-relaxed">
              Basado en reservas confirmadas que aún no han completado su pago total.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
