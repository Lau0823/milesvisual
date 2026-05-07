"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Plus, Edit3, Trash2, Tag, Loader2, Image as ImageIcon } from 'lucide-react';
import { useAdminStore } from '../../../store/useAdminStore';
import toast from 'react-hot-toast';
import { showConfirmToast } from '../../../components/admin/ConfirmToast';

interface Servicio {
  id: number;
  nombre: string;
  precio_base: number;
  duracion: number;
  descripcion: string;
  categoria: string;
  activo: boolean;
  destacado: boolean;
  imagen_url?: string;
  file?: File;
}

export default function PlanesPage() {
  const { data: session } = useSession();
  const { planes, fetchPlanes, savePlan, deletePlan } = useAdminStore();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Partial<Servicio> | null>(null);
  const [isNewCategory, setIsNewCategory] = useState(false);
  
  const categories = Array.from(new Set(planes.map(p => p.categoria).filter(Boolean)));

  useEffect(() => {
    const load = async () => {
      if (session?.accessToken) {
        await fetchPlanes((session as any).accessToken);
      }
      setLoading(false);
    };
    load();
  }, [session, fetchPlanes]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan || !session?.accessToken) return;
    
    const loadingToast = toast.loading('Guardando cambios...');
    try {
      await savePlan((session as any).accessToken, editingPlan);
      toast.success('¡Plan actualizado con éxito!', { id: loadingToast });
      setShowModal(false);
    } catch (error: any) {
      toast.error(`Error al guardar: ${error.message}`, { id: loadingToast });
    }
  };

  const handleDelete = async (id: number) => {
    showConfirmToast({
      title: '¿Confirmar eliminación?',
      message: 'Esta acción borrará el plan de forma permanente. No podrás deshacer este cambio.',
      onConfirm: async () => {
        const loadingToast = toast.loading('Eliminando plan...');
        try {
          if (!session?.accessToken) return;
          await deletePlan((session as any).accessToken, id);
          toast.success('Plan eliminado con éxito', { id: loadingToast });
        } catch (error: any) {
          toast.error(`Error: ${error.message}`, { id: loadingToast });
        }
      }
    });
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
        
        <button onClick={() => { setEditingPlan({ activo: true }); setShowModal(true); }} className="bg-[var(--mv-ink)] text-white px-6 py-3 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[var(--mv-sage)] transition flex items-center gap-2 shadow-lg">
          <Plus size={16} /> Crear Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {planes.map(plan => (
          <div key={plan.id} className={`bg-white rounded-[32px] p-8 shadow-sm border transition-all duration-500 group relative ${plan.destacado ? 'border-[var(--mv-gold)]/40 bg-[var(--mv-gold)]/[0.02] shadow-xl scale-[1.02]' : 'border-black/5 hover:shadow-xl'} ${!plan.activo ? 'opacity-50 grayscale' : ''}`}>
            
            {/* Badge Destacado Flotante */}
            {plan.destacado && (
              <div className="absolute -top-3 left-8 bg-[var(--mv-gold)] text-white text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 z-20">
                <Tag size={10} /> Destacado en Home ⭐
              </div>
            )}

            {/* Status indicator */}
            <div className={`absolute top-0 right-0 w-24 h-24 -mt-12 -mr-12 rounded-full ${plan.activo ? 'bg-[var(--mv-sage)]/10' : 'bg-red-500/10'} blur-xl transition-all group-hover:scale-150`} />
            
            {/* Imagen del Plan (Si existe) */}
            {plan.imagen_url && (
              <div className="mb-6 rounded-2xl overflow-hidden aspect-video bg-black/5 relative z-10">
                <img src={plan.imagen_url} alt={plan.nombre} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              </div>
            )}
            
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
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Categoría</label>
                    <button type="button" onClick={() => setIsNewCategory(!isNewCategory)} className="text-[9px] font-bold text-[var(--mv-sage)] hover:underline uppercase tracking-wider">
                      {isNewCategory ? 'Seleccionar existente' : '+ Nueva Categoría'}
                    </button>
                  </div>
                  {isNewCategory ? (
                    <div className="space-y-1">
                      <input type="text" value={editingPlan?.categoria || ''} onChange={e => setEditingPlan({...editingPlan, categoria: e.target.value})} className="w-full bg-[var(--mv-cream)] rounded-2xl px-5 py-4 text-sm border border-black/5 outline-none focus:border-[var(--mv-sage)]" placeholder="Escribe nueva categoría..." autoFocus />
                      <p className="text-[9px] text-black/30 px-1 italic">Ej: Bodas, Prebodas, Foto Estudio, Editorial...</p>
                    </div>
                  ) : (
                    <select value={editingPlan?.categoria || ''} onChange={e => setEditingPlan({...editingPlan, categoria: e.target.value})} className="w-full bg-[var(--mv-cream)] rounded-2xl px-5 py-4 text-sm border border-black/5 outline-none focus:border-[var(--mv-sage)] appearance-none cursor-pointer">
                      <option value="" disabled>Seleccione una categoría</option>
                      <optgroup label="Sugeridas">
                        <option value="Bodas">Bodas</option>
                        <option value="Prebodas">Prebodas</option>
                        <option value="Estudio">Estudio / Editorial</option>
                      </optgroup>
                      {categories.length > 0 && (
                        <optgroup label="Existentes">
                          {categories.filter(c => !['Bodas', 'Prebodas', 'Estudio'].includes(c)).map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </optgroup>
                      )}
                    </select>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-1">Precio Base ($)</label>
                <input type="number" required value={editingPlan?.precio_base || ''} onChange={e => setEditingPlan({...editingPlan, precio_base: Number(e.target.value)})} className="w-full bg-[var(--mv-cream)] rounded-2xl px-5 py-4 text-sm border border-black/5 outline-none focus:border-[var(--mv-sage)]" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-1">Descripción</label>
                <textarea rows={4} value={editingPlan?.descripcion || ''} onChange={e => setEditingPlan({...editingPlan, descripcion: e.target.value})} className="w-full bg-[var(--mv-cream)] rounded-2xl px-5 py-4 text-sm border border-black/5 outline-none focus:border-[var(--mv-sage)] resize-none" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-1">Imagen del Plan (Opcional)</label>
                <div className="relative group overflow-hidden bg-[var(--mv-cream)] border-2 border-dashed border-black/10 rounded-2xl p-6 text-center hover:border-[var(--mv-sage)] transition flex flex-col items-center justify-center">
                  <input type="file" accept="image/*" onChange={(e) => {
                    if (e.target.files?.[0]) setEditingPlan({...editingPlan, file: e.target.files[0]});
                  }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  
                  {editingPlan?.file ? (
                     <div className="flex flex-col items-center gap-2">
                        <img src={URL.createObjectURL(editingPlan.file)} alt="Preview" className="w-20 h-20 object-cover rounded-lg shadow-md border-2 border-[var(--mv-sage)]" />
                        <p className="text-[9px] uppercase tracking-widest font-bold text-[var(--mv-sage)]">Lista para subir: {editingPlan.file.name}</p>
                     </div>
                  ) : editingPlan?.imagen_url ? (
                     <div className="flex flex-col items-center gap-2">
                        <img src={editingPlan.imagen_url} alt="Current" className="w-16 h-16 object-cover rounded-lg shadow-sm" />
                        <p className="text-[9px] uppercase tracking-widest font-bold text-black/40">Imagen actual (clic para cambiar)</p>
                     </div>
                  ) : (
                     <>
                        <ImageIcon size={20} className="text-black/20 mb-2" />
                        <p className="text-[10px] uppercase tracking-widest font-bold text-black/40">Subir una imagen</p>
                     </>
                  )}
                </div>
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
