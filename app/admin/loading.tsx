import { Loader2 } from 'lucide-react';

export default function AdminLoading() {
  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[32px] shadow-sm border border-black/5 flex flex-col items-center">
        <Loader2 className="w-8 h-8 text-[var(--mv-sage)] animate-spin mb-4" />
        <p className="text-[10px] uppercase tracking-widest font-bold text-black/40">Cargando Panel...</p>
      </div>
    </div>
  );
}
