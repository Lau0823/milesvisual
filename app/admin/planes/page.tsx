"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Plus, Edit3, Trash2, Tag, Loader2, Image as ImageIcon } from 'lucide-react';

interface Servicio {
  id: number;
  nombre: string;
  precio_base: number;
  duracion: number;
  descripcion: string;
  categoria: string;
  activo: boolean;
  destacado: boolean;
}

export default function PlanesPage() {
  const { data: session } = useSession();
  const [planes, setPlanes] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Partial<Servicio> | null>(null);

  const fetchPlanes = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/servicios?limit=100`, {
        headers: {
          'Authorization': `Bearer ${(session as any)?.accessToken}`
        }
      });
      const data = await res.json();
      // El endpoint /servicios devuelve { data: [...], total, page, lastPage }
      setPlanes(data.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchPlanes();
    }
  }, [session]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;
    
    const isEditing = !!editingPlan.id;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/servicios${isEditing ? `/${editingPlan.id}` : ''}`;
    const method = isEditing ? 'PATCH' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(session as any)?.accessToken}`
        },
        body: JSON.stringify(editingPlan)
      });
      setShowModal(false);
      fetchPlanes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este plan?')) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/servicios/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${(session as any)?.accessToken}` }
      });
      fetchPlanes();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="animate-pulse h-full w-full bg-white/50 rounded-[40px] p-10" />;

  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="mv-script text-[32px] text-[var(--mv-sage)] leading-none mb-2">servicios</p>
          <h2 className="text-4xl font-semibold tracking-tight uppercase">Planes de Venta</h2>
          <p className="text-sm text-black/40 mt-2 max-w-[500px]">
             Administra los paquetes fotográficos, sus precios y descripciones. Esta información se refleja en tiempo real en la página pública.
          </p>
        </div>
        
        <button onClick={() => { setEditingPlan({ activo: true, duracion: 60 }); setShowModal(true); }} className="bg-[var(--mv-ink)] text-white px-6 py-3 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[var(--mv-sage)] transition flex items-center gap-2 shadow-lg">
          <Plus size={16} /> Crear Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {planes.map(plan => (
          <div key={plan.id} className={`bg-white rounded-[40px] p-8 shadow-sm border border-black/5 flex flex-col relative group overflow-hidden ${!plan.activo ? 'opacity-50 grayscale' : ''}`}>
            {/* Status indicator */}
            <div className={`absolute top-0 right-0 w-24 h-24 -mt-12 -mr-12 rounded-full ${plan.activo ? 'bg-[var(--mv-sage)]/10' : 'bg-red-500/10'} blur-xl transition-all group-hover:scale-150`} />
            
            <div className="flex items-center gap-4 mb-6 relative z-10">
               <div className="w-14 h-14 rounded-2xl bg-[var(--mv-cream)] text-[var(--mv-sage)] flex items-center justify-center border border-black/5">
                  <Tag size={24} />
               </div>
               <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-[var(--mv-ink)]">{plan.nombre}</h3>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-black/30">{plan.categoria}</p>
               </div>
            </div>

            <p className="text-sm text-black/50 leading-relaxed mb-8 flex-1 relative z-10 line-clamp-3">
               {plan.descripcion || 'Sin descripción'}
            </p>

            <div className="flex items-end justify-between pt-6 border-t border-black/5 relative z-10">
               <div>
                  <p className="text-[9px] uppercase tracking-widest font-bold text-black/30 mb-1">PRECIO BASE</p>
                  <p className="text-2xl font-bold text-[var(--mv-sage)]">$ {Number(plan.precio_base).toLocaleString()}</p>
               </div>
               <div className="flex gap-2">
                  <button onClick={() => { setEditingPlan(plan); setShowModal(true); }} className="p-3 bg-black/5 text-[var(--mv-ink)] rounded-xl hover:bg-black/10 transition">
                     <Edit3 size={14} />
                  </button>
                  <button onClick={() => handleDelete(plan.id)} className="p-3 bg-red-50 text-red-400 rounded-xl hover:bg-red-100 hover:text-red-500 transition">
                     <Trash2 size={14} />
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-[40px] w-full max-w-[600px] p-10 shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-8">
               {editingPlan?.id ? 'Editar Plan' : 'Nuevo Plan'}
            </h3>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-1">Nombre</label>
                  <input type="text" required value={editingPlan?.nombre || ''} onChange={e => setEditingPlan({...editingPlan, nombre: e.target.value})} className="w-full bg-[var(--mv-cream)] rounded-2xl px-5 py-4 text-sm border border-black/5 outline-none focus:border-[var(--mv-sage)]" />
                </div>
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-1">Categoría</label>
                  <input type="text" value={editingPlan?.categoria || ''} onChange={e => setEditingPlan({...editingPlan, categoria: e.target.value})} className="w-full bg-[var(--mv-cream)] rounded-2xl px-5 py-4 text-sm border border-black/5 outline-none focus:border-[var(--mv-sage)]" placeholder="Ej: Boda, Preboda..." />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-1">Precio Base ($)</label>
                  <input type="number" required value={editingPlan?.precio_base || ''} onChange={e => setEditingPlan({...editingPlan, precio_base: Number(e.target.value)})} className="w-full bg-[var(--mv-cream)] rounded-2xl px-5 py-4 text-sm border border-black/5 outline-none focus:border-[var(--mv-sage)]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-1">Duración (Mins)</label>
                  <input type="number" required value={editingPlan?.duracion || 60} onChange={e => setEditingPlan({...editingPlan, duracion: Number(e.target.value)})} className="w-full bg-[var(--mv-cream)] rounded-2xl px-5 py-4 text-sm border border-black/5 outline-none focus:border-[var(--mv-sage)]" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-1">Descripción</label>
                <textarea rows={4} value={editingPlan?.descripcion || ''} onChange={e => setEditingPlan({...editingPlan, descripcion: e.target.value})} className="w-full bg-[var(--mv-cream)] rounded-2xl px-5 py-4 text-sm border border-black/5 outline-none focus:border-[var(--mv-sage)] resize-none" />
              </div>

              <div className="flex flex-wrap items-center gap-8 pt-2">
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="activo" checked={editingPlan?.activo} onChange={e => setEditingPlan({...editingPlan, activo: e.target.checked})} className="w-4 h-4 accent-[var(--mv-sage)] cursor-pointer" />
                  <label htmlFor="activo" className="text-[11px] uppercase tracking-widest font-bold text-[var(--mv-ink)] cursor-pointer">Plan Activo y Público</label>
                </div>
                
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="destacado" checked={editingPlan?.destacado} onChange={e => setEditingPlan({...editingPlan, destacado: e.target.checked})} className="w-4 h-4 accent-[var(--mv-gold)] cursor-pointer" />
                  <label htmlFor="destacado" className="text-[11px] uppercase tracking-widest font-bold text-[var(--mv-gold)] cursor-pointer">Destacado en Home ⭐</label>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-black/40 hover:text-black transition">Cancelar</button>
                <button type="submit" className="flex-1 bg-[var(--mv-ink)] text-white px-8 py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-[var(--mv-sage)] transition shadow-lg">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
