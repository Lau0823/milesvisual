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

  const [newPost, setNewPost] = useState({
    title: '',
    category: 'BODAS',
    file: null as File | null
  });

  useEffect(() => {
    syncWithBackend();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setNewPost({ ...newPost, file: e.target.files[0] });
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', newPost.file);
    formData.append('title', newPost.title);
    formData.append('category', newPost.category);
    formData.append('status', 'published');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/media-posts`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${(session as any)?.accessToken}` },
        body: formData
      });
      if (res.ok) {
        setSuccess(true);
        setShowUploadModal(false);
        setNewPost({ title: '', category: 'BODAS', file: null });
        await syncWithBackend();
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Eliminar esta publicación?')) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      await fetch(`${apiUrl}/media-posts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${(session as any)?.accessToken}` }
      });
      await syncWithBackend();
    }
  };

  const filteredPosts = filter === 'TODOS' ? mediaPosts : mediaPosts.filter(p => p.category.toUpperCase() === filter);

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="mv-script text-[32px] text-[var(--mv-sage)] leading-none mb-2">media</p>
          <h2 className="text-4xl font-semibold tracking-tight uppercase">Publicación y Gestión</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-white rounded-full p-1 border border-black/5 shadow-sm overflow-hidden">
            {['TODOS', 'BODAS', 'PREBODAS', 'ESTUDIO', 'VIDEOS'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2 rounded-full text-[9px] uppercase tracking-widest font-bold transition ${filter === f ? 'bg-[var(--mv-sage)] text-white' : 'text-black/30 hover:text-black'}`}>{f}</button>
            ))}
          </div>
          <button onClick={() => setShowUploadModal(true)} className="bg-[var(--mv-ink)] text-white px-6 py-3 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[var(--mv-sage)] transition flex items-center gap-2 shadow-lg"><Plus size={16} /> Nuevo Post</button>
        </div>
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
                <button onClick={() => handleDelete(post.id!)} className="w-full py-2 text-red-400 hover:text-red-600 text-[9px] font-bold uppercase tracking-widest transition flex items-center justify-center gap-2">
                  <Trash2 size={12} /> Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Placeholder para subir */}
        <button onClick={() => setShowUploadModal(true)} className="aspect-[3/4.5] rounded-[32px] border-2 border-dashed border-black/5 flex flex-col items-center justify-center gap-3 text-black/20 hover:text-[var(--mv-sage)] hover:border-[var(--mv-sage)]/30 transition-all group">
          <div className="p-4 bg-black/[0.02] group-hover:bg-[var(--mv-sage)]/5 rounded-full transition">
            <Plus size={32} />
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold">Agregar Proyecto</span>
        </button>
      </div>

      {/* Modal Subida */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowUploadModal(false)} />
          <div className="relative bg-white rounded-[40px] w-full max-w-[500px] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <h3 className="text-2xl font-semibold uppercase tracking-tight mb-8">Nueva Publicación</h3>
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-1">Título</label>
                <input type="text" required value={newPost.title} onChange={(e) => setNewPost({...newPost, title: e.target.value})} className="w-full bg-[var(--mv-cream)] rounded-2xl px-5 py-4 text-sm border border-black/5 outline-none focus:border-[var(--mv-sage)]" placeholder="Título del post..." />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-1">Categoría</label>
                <select value={newPost.category} onChange={(e) => setNewPost({...newPost, category: e.target.value})} className="w-full bg-[var(--mv-cream)] rounded-2xl px-5 py-4 text-sm border border-black/5 outline-none">
                  <option value="BODAS">BODAS</option>
                  <option value="PREBODAS">PREBODAS</option>
                  <option value="ESTUDIO">ESTUDIO</option>
                  <option value="VIDEOS">VIDEOS</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-black/40 ml-1">Archivo (Imagen o Video)</label>
                <div className="relative group overflow-hidden bg-[var(--mv-cream)] border-2 border-dashed border-black/10 rounded-2xl p-10 text-center hover:border-[var(--mv-sage)] transition">
                  <input type="file" accept="image/*,video/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <Upload size={24} className="mx-auto text-black/20 mb-2" />
                  <p className="text-[10px] uppercase tracking-widest font-bold text-black/40">{newPost.file ? newPost.file.name : 'Seleccionar archivo'}</p>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowUploadModal(false)} className="flex-1 px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-black/40 hover:text-black">Cancelar</button>
                <button type="submit" disabled={uploading || !newPost.file} className="flex-1 bg-[var(--mv-ink)] text-white px-8 py-4 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-[var(--mv-sage)] transition shadow-lg flex items-center justify-center gap-2">
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
