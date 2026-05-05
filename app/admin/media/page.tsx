"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAdminStore } from '../../../store/useAdminStore';
import { Image as ImageIcon, Plus, Trash2, Loader2, Upload, CheckCircle2, Edit3, ExternalLink } from 'lucide-react';

export default function MediaPage() {
  const { data: session } = useSession();
  const { mediaPosts, syncWithBackend } = useAdminStore();
  
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState('TODOS');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio' | 'identity'

  const { settings, updateSetting } = useAdminStore();
  const getSetting = (key: string) => settings.find(s => s.key === key)?.value || '';

  const [newPost, setNewPost] = useState({
    id: undefined as number | undefined,
    title: '',
    category: 'BODAS',
    file: null as File | null
  });
  
  const [isNewCategory, setIsNewCategory] = useState(false);
  const categories = Array.from(new Set(mediaPosts.map(p => p.category).filter(Boolean)));

  useEffect(() => {
    syncWithBackend();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setNewPost({ ...newPost, file: e.target.files[0] });
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.id && !newPost.file) return; // File is required only for new posts
    setUploading(true);
    const formData = new FormData();
    if (newPost.file) formData.append('file', newPost.file);
    formData.append('title', newPost.title);
    formData.append('category', newPost.category);
    formData.append('status', 'published');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const isEditing = !!newPost.id;
      const url = `${apiUrl}/media-posts${isEditing ? `/${newPost.id}` : ''}`;
      
      const res = await fetch(url, {
        method: isEditing ? 'PATCH' : 'POST',
        headers: { 'Authorization': `Bearer ${(session as any)?.accessToken}` },
        body: formData
      });
      if (res.ok) {
        setSuccess(true);
        setShowUploadModal(false);
        setNewPost({ id: undefined, title: '', category: 'BODAS', file: null });
        await syncWithBackend();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const err = await res.json().catch(() => ({}));
        alert(`Error: ${err.message || 'No se pudo guardar la publicación'}`);
      }
    } catch (error: any) {
      console.error(error);
      alert(`Error de red: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Eliminar esta publicación de la base de datos?')) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/media-posts/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${(session as any)?.accessToken}` }
        });
        
        if (res.ok) {
          await syncWithBackend();
        } else {
          const err = await res.json().catch(() => ({}));
          alert(`Error al eliminar: ${err.message || 'No se pudo eliminar la publicación'}`);
        }
      } catch (error: any) {
        console.error(error);
        alert(`Error de red: ${error.message}`);
      }
    }
  };

  const filteredPosts = filter === 'TODOS' ? mediaPosts : mediaPosts.filter(p => p.category.toUpperCase() === filter);

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="mv-script text-[32px] text-[var(--mv-sage)] leading-none mb-2">multimedia</p>
          <h2 className="text-4xl font-semibold tracking-tight uppercase">Gestión de Contenido</h2>
        </div>
        
        <div className="flex bg-white rounded-full p-1 border border-black/5 shadow-sm overflow-hidden mb-1 md:mb-0">
          <button onClick={() => setActiveTab('portfolio')} className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold transition ${activeTab === 'portfolio' ? 'bg-[var(--mv-ink)] text-white shadow-md' : 'text-black/30 hover:text-black'}`}>
            Portafolio
          </button>
          <button onClick={() => setActiveTab('identity')} className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold transition ${activeTab === 'identity' ? 'bg-[var(--mv-ink)] text-white shadow-md' : 'text-black/30 hover:text-black'}`}>
            Identidad del Sitio
          </button>
        </div>
      </div>

      {activeTab === 'portfolio' ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex bg-white rounded-full p-1 border border-black/5 shadow-sm overflow-hidden">
              {['TODOS', 'BODAS', 'PREBODAS', 'ESTUDIO', 'VIDEOS'].map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2 rounded-full text-[9px] uppercase tracking-widest font-bold transition ${filter === f ? 'bg-[var(--mv-sage)] text-white' : 'text-black/30 hover:text-black'}`}>{f}</button>
              ))}
            </div>
            <button onClick={() => { setNewPost({ id: undefined, title: '', category: 'BODAS', file: null }); setShowUploadModal(true); }} className="bg-[var(--mv-ink)] text-white px-6 py-3 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[var(--mv-sage)] transition flex items-center gap-2 shadow-lg"><Plus size={16} /> Nuevo Post de Portafolio</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-[32px] p-3 shadow-sm border border-black/5 flex flex-col hover:shadow-xl transition-all duration-500">
                <div className="aspect-[3/4] rounded-[24px] overflow-hidden relative group bg-[var(--mv-cream)]">
                  {post.cloudinaryUrl.endsWith('.mp4') || post.cloudinaryUrl.includes('/video/upload/') ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--mv-ink)] text-white/50">
                      <div className="p-4 rounded-full bg-white/10 mb-2">
                        <ImageIcon size={32} />
                      </div>
                      <span className="text-[8px] uppercase tracking-widest font-bold">Video Content</span>
                    </div>
                  ) : (
                    <img src={post.cloudinaryUrl} alt={post.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                  )}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-bold uppercase tracking-widest shadow-sm">
                    {post.category}
                  </div>
                </div>
                
                <div className="px-3 py-5 flex-1 flex flex-col">
                  <h4 className="text-[13px] font-bold uppercase tracking-tight text-[var(--mv-ink)] mb-1 truncate">{post.title}</h4>
                  <p className="text-[9px] uppercase tracking-widest text-black/30 font-bold mb-6">
                    {post.cloudinaryUrl.includes('/video/upload/') ? 'Producción Audiovisual' : 'Fotografía Editorial'}
                  </p>
                  
                  <div className="mt-auto space-y-2">
                    <div className="flex items-center justify-center gap-2 py-2 bg-green-50 text-green-600 rounded-xl text-[9px] font-bold uppercase tracking-widest border border-green-100">
                      <CheckCircle2 size={12} /> Publicado
                    </div>
                    <a href={post.cloudinaryUrl} target="_blank" rel="noopener noreferrer" className="w-full py-2 bg-[var(--mv-cream)] text-[var(--mv-ink)] rounded-xl text-[9px] font-bold uppercase tracking-widest border border-black/5 hover:bg-black/5 transition flex items-center justify-center gap-2">
                      <ExternalLink size={12} /> Ver Archivo
                    </a>
                    <div className="flex gap-2">
                      <button onClick={() => { setNewPost({ id: post.id, title: post.title, category: post.category, file: null }); setShowUploadModal(true); }} className="w-1/2 py-2 bg-black/5 hover:bg-black/10 text-black/60 rounded-xl text-[9px] font-bold uppercase tracking-widest transition flex items-center justify-center gap-2">
                        <Edit3 size={12} /> Editar
                      </button>
                      <button onClick={() => handleDelete(post.id!)} className="w-1/2 py-2 text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 rounded-xl text-[9px] font-bold uppercase tracking-widest transition flex items-center justify-center gap-2">
                        <Trash2 size={12} /> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Placeholder para subir */}
            <button onClick={() => { setNewPost({ id: undefined, title: '', category: 'BODAS', file: null }); setShowUploadModal(true); }} className="aspect-[3/4.5] rounded-[32px] border-2 border-dashed border-black/5 flex flex-col items-center justify-center gap-3 text-black/20 hover:text-[var(--mv-sage)] hover:border-[var(--mv-sage)]/30 transition-all group">
              <div className="p-4 bg-black/[0.02] group-hover:bg-[var(--mv-sage)]/5 rounded-full transition">
                <Plus size={32} />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold">Agregar Proyecto</span>
            </button>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { key: 'hero_video_url', label: 'Video Hero (Home)', desc: 'Fondo principal de la página de inicio' },
            { key: 'middle_video_url', label: 'Video Intermedio (Home)', desc: 'Video de transición en el medio del home' },
            { key: 'bodas_video_url', label: 'Cabecera Bodas', desc: 'Video de fondo para la página de bodas' },
            { key: 'prebodas_video_url', label: 'Cabecera Pre-Bodas', desc: 'Video de fondo para la página de pre-bodas' },
            { key: 'estudio_video_url', label: 'Cabecera Estudio', desc: 'Video de fondo para la página de estudio' },
            { key: 'acerca_video_url', label: 'Acerca de mí', desc: 'Video para la sección personal' },
          ].map((v) => (
            <div key={v.key} className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5 flex flex-col hover:shadow-xl transition-all duration-500 group">
              <div className="aspect-video rounded-[24px] overflow-hidden bg-[var(--mv-ink)] mb-6 relative">
                {getSetting(v.key) ? (
                  <video src={getSetting(v.key)} className="w-full h-full object-cover" muted loop autoPlay />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20">
                    <ImageIcon size={32} />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <div className="relative">
                    <input type="file" accept="video/*" onChange={async (e) => {
                      if (e.target.files?.[0] && session?.accessToken) {
                        const formData = new FormData();
                        formData.append('file', e.target.files[0]);
                        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings/upload-image/${v.key}`, {
                          method: 'POST',
                          headers: { 'Authorization': `Bearer ${(session as any).accessToken}` },
                          body: formData
                        });
                        if (res.ok) {
                          const data = await res.json();
                          await updateSetting((session as any).accessToken, v.key, data.value);
                          await syncWithBackend();
                        }
                      }
                    }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <button className="bg-white text-[var(--mv-ink)] px-6 py-3 rounded-full text-[9px] uppercase tracking-widest font-bold shadow-xl">Cambiar Video</button>
                  </div>
                </div>
              </div>
              <h4 className="text-sm font-bold uppercase tracking-tight text-[var(--mv-ink)] mb-1">{v.label}</h4>
              <p className="text-[10px] text-black/40 font-medium mb-6">{v.desc}</p>
              {getSetting(v.key) && (
                <a href={getSetting(v.key)} target="_blank" rel="noreferrer" className="mt-auto text-[9px] text-[var(--mv-sage)] underline uppercase tracking-widest font-bold">Ver original</a>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Modal Subida */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowUploadModal(false)} />
          <div className="relative bg-white rounded-[40px] w-full max-w-[500px] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <h3 className="text-2xl font-semibold uppercase tracking-tight mb-8">{newPost.id ? 'Editar Publicación' : 'Nueva Publicación'}</h3>
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-1">Título</label>
                <input type="text" required value={newPost.title} onChange={(e) => setNewPost({...newPost, title: e.target.value})} className="w-full bg-[var(--mv-cream)] rounded-2xl px-5 py-4 text-sm border border-black/5 outline-none focus:border-[var(--mv-sage)]" placeholder="Título del post..." />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-black/40">Categoría</label>
                  <button type="button" onClick={() => setIsNewCategory(!isNewCategory)} className="text-[9px] font-bold text-[var(--mv-sage)] hover:underline uppercase tracking-wider">
                    {isNewCategory ? 'Seleccionar existente' : '+ Nueva Categoría'}
                  </button>
                </div>
                {isNewCategory ? (
                  <input type="text" value={newPost.category} onChange={e => setNewPost({...newPost, category: e.target.value})} className="w-full bg-[var(--mv-cream)] rounded-2xl px-5 py-4 text-sm border border-black/5 outline-none focus:border-[var(--mv-sage)]" placeholder="Escribe nueva categoría..." autoFocus />
                ) : (
                  <select value={newPost.category} onChange={e => setNewPost({...newPost, category: e.target.value})} className="w-full bg-[var(--mv-cream)] rounded-2xl px-5 py-4 text-sm border border-black/5 outline-none appearance-none cursor-pointer">
                    <option value="" disabled>Seleccione una categoría</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    {categories.length === 0 && <option value="BODAS">BODAS</option>}
                    {categories.length === 0 && <option value="PREBODAS">PREBODAS</option>}
                    {categories.length === 0 && <option value="ESTUDIO">ESTUDIO</option>}
                    {categories.length === 0 && <option value="VIDEOS">VIDEOS</option>}
                  </select>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-1">Archivo (Imagen o Video)</label>
                <div className="relative group overflow-hidden bg-[var(--mv-cream)] border-2 border-dashed border-black/10 rounded-2xl p-10 text-center hover:border-[var(--mv-sage)] transition">
                  <input type="file" accept="image/*,video/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <Upload size={24} className="mx-auto text-black/20 mb-2" />
                  <p className="text-[10px] uppercase tracking-widest font-bold text-black/40">{newPost.file ? newPost.file.name : (newPost.id ? 'Dejar vacío para mantener el archivo actual' : 'Seleccionar archivo')}</p>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowUploadModal(false)} className="flex-1 px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-black/40 hover:text-black">Cancelar</button>
                <button type="submit" disabled={uploading || (!newPost.id && !newPost.file)} className="flex-1 bg-[var(--mv-ink)] text-white px-8 py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-[var(--mv-sage)] transition shadow-lg flex items-center justify-center gap-2">
                  {uploading ? <Loader2 size={16} className="animate-spin" /> : 'Publicar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
