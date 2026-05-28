"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Settings, Save, Globe, Layout, MessageCircle, Loader2, CheckCircle2, User as UserIcon } from 'lucide-react';
import { useAdminStore } from '../../../store/useAdminStore';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { data: session } = useSession();
  const { settings, fetchSettings, saveBatchSettings } = useAdminStore();
  const [localSettings, setLocalSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (session?.accessToken) {
        await fetchSettings((session as any).accessToken);
      }
      setFetching(false);
    };
    load();
  }, [session, fetchSettings]);

  useEffect(() => {
    if (settings.length > 0 && localSettings.length === 0) {
      setLocalSettings(settings);
    }
  }, [settings, localSettings.length]);

  const handleUpdate = (key: string, value: string) => {
    setLocalSettings(prev => {
      const exists = prev.find(s => s.key === key);
      if (exists) {
        return prev.map(s => s.key === key ? { ...s, value } : s);
      } else {
        return [...prev, { key, value, description: 'Configuración de Layout' }];
      }
    });
  };

  const saveSettings = async () => {
    if (!session?.accessToken) return;
    setLoading(true);
    setSuccess(false);

    const loadingToast = toast.loading('Guardando configuración...');
    try {
      const ok = await saveBatchSettings((session as any).accessToken, localSettings);
      if (ok) {
        setSuccess(true);
        toast.success('Configuración actualizada con éxito', { id: loadingToast });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        toast.error('No se pudo guardar la configuración', { id: loadingToast });
      }
    } catch (error) {
      toast.error('Error de conexión con el servidor', { id: loadingToast });
    }
    setLoading(false);
  };

  const getSetting = (key: string, defaultValue: string = '') => localSettings.find(s => s.key === key)?.value || defaultValue;

  // Layout Ordering Logic
  const layoutOrderString = getSetting('home_layout_order') || 'WELCOME,ABOUT,BODAS,PREBODAS,ESTUDIO,PLANES,CTA';
  const layoutOrder = layoutOrderString.split(',').filter(Boolean);

  const moveSection = (index: number, direction: number) => {
    const newOrder = [...layoutOrder];
    if (direction === -1 && index > 0) {
      [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
    } else if (direction === 1 && index < newOrder.length - 1) {
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    }
    handleUpdate('home_layout_order', newOrder.join(','));
  };

  if (fetching) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-[var(--mv-sage)]" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/50 font-semibold mb-1">Configuración del Sitio</p>
          <h2 className="text-4xl font-semibold tracking-tight uppercase">Ajustes Web</h2>
        </div>
        <button
          onClick={saveSettings}
          disabled={loading}
          className="bg-[var(--mv-ink)] text-white px-8 py-3 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[var(--mv-sage)] transition flex items-center gap-3 disabled:opacity-50 shadow-xl"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Guardar Cambios
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Estructura Home (Layout Order) */}
        <section className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[var(--mv-cream)] rounded-lg">
              <Layout size={20} className="text-[var(--mv-sage)]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold uppercase tracking-tight">Estructura Dinámica (Home)</h3>
              <p className="text-xs text-black/40 mt-1">Controla el orden en el que aparecen las secciones en la página principal.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 p-6 bg-[var(--mv-cream)]/30 rounded-3xl border border-black/5">
            {layoutOrder.map((section: string, index: number) => (
              <div key={section} className="flex items-center bg-white px-4 py-2.5 rounded-xl border border-black/5 shadow-sm">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--mv-ink)] mr-4">
                  {index + 1}. {section}
                </span>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveSection(index, -1)}
                    disabled={index === 0}
                    className="w-5 h-4 flex items-center justify-center bg-black/5 hover:bg-black/10 rounded disabled:opacity-30 transition"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveSection(index, 1)}
                    disabled={index === layoutOrder.length - 1}
                    className="w-5 h-4 flex items-center justify-center bg-black/5 hover:bg-black/10 rounded disabled:opacity-30 transition"
                  >
                    ▼
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SEO & Metadatos */}
        <section className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[var(--mv-cream)] rounded-lg">
              <Globe size={20} className="text-[var(--mv-sage)]" />
            </div>
            <h3 className="text-xl font-semibold uppercase tracking-tight">SEO & Visibilidad</h3>
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Título de la Web</label>
              <input type="text" value={getSetting('seo_title')} onChange={(e) => handleUpdate('seo_title', e.target.value)} className="w-full bg-[var(--mv-cream)]/50 rounded-2xl px-5 py-4 text-sm border border-black/5 focus:border-[var(--mv-sage)] outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Meta Descripción</label>
              <textarea rows={3} value={getSetting('seo_description')} onChange={(e) => handleUpdate('seo_description', e.target.value)} className="w-full bg-[var(--mv-cream)]/50 rounded-2xl px-5 py-4 text-sm border border-black/5 focus:border-[var(--mv-sage)] outline-none transition resize-none" />
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[var(--mv-cream)] rounded-lg">
              <Layout size={20} className="text-[var(--mv-sage)]" />
            </div>
            <h3 className="text-xl font-semibold uppercase tracking-tight">Portada (Hero)</h3>
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Imagen de Fondo (Cloudinary)</label>
              <div className="flex gap-4 items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      const formData = new FormData();
                      formData.append('file', e.target.files[0]);
                      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                      const res = await fetch(`${apiUrl}/settings/upload-image/hero_image_url`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${(session as any)?.accessToken}` },
                        body: formData
                      });
                      if (res.ok) {
                        const data = await res.json();
                        handleUpdate('hero_image_url', data.value);
                      }
                    }
                  }}
                  className="text-[10px]"
                />
                {getSetting('hero_image_url') && <img src={getSetting('hero_image_url')} className="w-10 h-10 rounded-lg object-cover shadow-md" />}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Video de Fondo (Hero Video)</label>
              <div className="flex gap-4 items-center">
                <input
                  type="file"
                  accept="video/*"
                  onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      const formData = new FormData();
                      formData.append('file', e.target.files[0]);
                      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                      const res = await fetch(`${apiUrl}/settings/upload-image/hero_video_url`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${(session as any)?.accessToken}` },
                        body: formData
                      });
                      if (res.ok) {
                        const data = await res.json();
                        handleUpdate('hero_video_url', data.value);
                      }
                    }
                  }}
                  className="text-[10px]"
                />
                {getSetting('hero_video_url') && (
                  <div className="flex items-center gap-3">
                    <video src={getSetting('hero_video_url')} className="w-16 h-16 object-cover rounded border border-black/10" muted loop autoPlay />
                    <a href={getSetting('hero_video_url')} target="_blank" rel="noreferrer" className="text-[9px] text-blue-500 underline uppercase tracking-widest font-bold">Ver Video</a>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Video Intermedio (Middle Video)</label>
              <div className="flex gap-4 items-center">
                <input
                  type="file"
                  accept="video/*"
                  onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      const formData = new FormData();
                      formData.append('file', e.target.files[0]);
                      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                      const res = await fetch(`${apiUrl}/settings/upload-image/middle_video_url`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${(session as any)?.accessToken}` },
                        body: formData
                      });
                      if (res.ok) {
                        const data = await res.json();
                        handleUpdate('middle_video_url', data.value);
                      }
                    }
                  }}
                  className="text-[10px]"
                />
                {getSetting('middle_video_url') && (
                  <div className="flex items-center gap-3">
                    <video src={getSetting('middle_video_url')} className="w-16 h-16 object-cover rounded border border-black/10" muted loop autoPlay />
                    <a href={getSetting('middle_video_url')} target="_blank" rel="noreferrer" className="text-[9px] text-blue-500 underline uppercase tracking-widest font-bold">Ver Video</a>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Video Página Bodas</label>
              <div className="flex gap-4 items-center">
                <input
                  type="file"
                  accept="video/*"
                  onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      const formData = new FormData();
                      formData.append('file', e.target.files[0]);
                      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                      const res = await fetch(`${apiUrl}/settings/upload-image/bodas_video_url`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${(session as any)?.accessToken}` },
                        body: formData
                      });
                      if (res.ok) {
                        const data = await res.json();
                        handleUpdate('bodas_video_url', data.value);
                      }
                    }
                  }}
                  className="text-[10px]"
                />
                {getSetting('bodas_video_url') && (
                  <div className="flex items-center gap-3">
                    <video src={getSetting('bodas_video_url')} className="w-16 h-16 object-cover rounded border border-black/10" muted loop autoPlay />
                    <a href={getSetting('bodas_video_url')} target="_blank" rel="noreferrer" className="text-[9px] text-blue-500 underline uppercase tracking-widest font-bold">Ver Video</a>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Video Página Pre-Bodas</label>
              <div className="flex gap-4 items-center">
                <input
                  type="file"
                  accept="video/*"
                  onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      const formData = new FormData();
                      formData.append('file', e.target.files[0]);
                      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                      const res = await fetch(`${apiUrl}/settings/upload-image/prebodas_video_url`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${(session as any)?.accessToken}` },
                        body: formData
                      });
                      if (res.ok) {
                        const data = await res.json();
                        handleUpdate('prebodas_video_url', data.value);
                      }
                    }
                  }}
                  className="text-[10px]"
                />
                {getSetting('prebodas_video_url') && (
                  <div className="flex items-center gap-3">
                    <video src={getSetting('prebodas_video_url')} className="w-16 h-16 object-cover rounded border border-black/10" muted loop autoPlay />
                    <a href={getSetting('prebodas_video_url')} target="_blank" rel="noreferrer" className="text-[9px] text-blue-500 underline uppercase tracking-widest font-bold">Ver Video</a>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Video Página Estudio</label>
              <div className="flex gap-4 items-center">
                <input
                  type="file"
                  accept="video/*"
                  onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      const formData = new FormData();
                      formData.append('file', e.target.files[0]);
                      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                      const res = await fetch(`${apiUrl}/settings/upload-image/estudio_video_url`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${(session as any)?.accessToken}` },
                        body: formData
                      });
                      if (res.ok) {
                        const data = await res.json();
                        handleUpdate('estudio_video_url', data.value);
                      }
                    }
                  }}
                  className="text-[10px]"
                />
                {getSetting('estudio_video_url') && (
                  <div className="flex items-center gap-3">
                    <video src={getSetting('estudio_video_url')} className="w-16 h-16 object-cover rounded border border-black/10" muted loop autoPlay />
                    <a href={getSetting('estudio_video_url')} target="_blank" rel="noreferrer" className="text-[9px] text-blue-500 underline uppercase tracking-widest font-bold">Ver Video</a>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Video Página 15 Años</label>
              <div className="flex gap-4 items-center">
                <input
                  type="file"
                  accept="video/*"
                  onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      const formData = new FormData();
                      formData.append('file', e.target.files[0]);
                      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                      const res = await fetch(`${apiUrl}/settings/upload-image/15anos_video_url`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${(session as any)?.accessToken}` },
                        body: formData
                      });
                      if (res.ok) {
                        const data = await res.json();
                        handleUpdate('15anos_video_url', data.value);
                      }
                    }
                  }}
                  className="text-[10px]"
                />
                {getSetting('15anos_video_url') && (
                  <div className="flex items-center gap-3">
                    <video src={getSetting('15anos_video_url')} className="w-16 h-16 object-cover rounded border border-black/10" muted loop autoPlay />
                    <a href={getSetting('15anos_video_url')} target="_blank" rel="noreferrer" className="text-[9px] text-blue-500 underline uppercase tracking-widest font-bold">Ver Video</a>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Video Acerca de mí</label>
              <input
                type="file"
                accept="video/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const formData = new FormData();
                    formData.append('file', file);
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/media/upload`, {
                      method: 'POST',
                      headers: { 'Authorization': `Bearer ${(session as any)?.accessToken}` },
                      body: formData
                    });
                    if (res.ok) {
                      const data = await res.json();
                      handleUpdate('about_video_url', data.value);
                    }
                  }
                }}
                className="text-[10px]"
              />
              {getSetting('about_video_url') && (
                <div className="flex items-center gap-3">
                  <video src={getSetting('about_video_url')} className="w-16 h-16 object-cover rounded border border-black/10" muted loop autoPlay />
                  <a href={getSetting('about_video_url')} target="_blank" rel="noreferrer" className="text-[9px] text-blue-500 underline uppercase tracking-widest font-bold">Ver Video</a>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Título Principal (Hero Title)</label>
              <input type="text" value={getSetting('hero_title')} onChange={(e) => handleUpdate('hero_title', e.target.value)} className="w-full bg-[var(--mv-cream)]/50 rounded-2xl px-5 py-4 text-sm border border-black/5 focus:border-[var(--mv-sage)] outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Subtítulo Corto</label>
              <input type="text" value={getSetting('hero_subtitle')} onChange={(e) => handleUpdate('hero_subtitle', e.target.value)} className="w-full bg-[var(--mv-cream)]/50 rounded-2xl px-5 py-4 text-sm border border-black/5 focus:border-[var(--mv-sage)] outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Descripción Larga</label>
              <textarea rows={3} value={getSetting('hero_description')} onChange={(e) => handleUpdate('hero_description', e.target.value)} className="w-full bg-[var(--mv-cream)]/50 rounded-2xl px-5 py-4 text-sm border border-black/5 focus:border-[var(--mv-sage)] outline-none transition resize-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Número de WhatsApp (ej: 573148112717)</label>
              <input type="text" value={getSetting('whatsapp_number', '573148112717')} onChange={(e) => handleUpdate('whatsapp_number', e.target.value)} className="w-full bg-[var(--mv-cream)]/50 rounded-2xl px-5 py-4 text-sm border border-black/5 focus:border-[var(--mv-sage)] outline-none transition" />
            </div>
          </div>
        </section>

        {/* Acerca de mí */}
        <section className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[var(--mv-cream)] rounded-lg">
              <UserIcon size={20} className="text-[var(--mv-sage)]" />
            </div>
            <h3 className="text-xl font-semibold uppercase tracking-tight">Acerca de Mí (Biografía)</h3>
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Imagen de Perfil</label>
              <div className="flex gap-4 items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      const formData = new FormData();
                      formData.append('file', e.target.files[0]);
                      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                      const res = await fetch(`${apiUrl}/settings/upload-image/about_image_url`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${(session as any)?.accessToken}` },
                        body: formData
                      });
                      if (res.ok) {
                        const data = await res.json();
                        handleUpdate('about_image_url', data.value);
                      }
                    }
                  }}
                  className="text-[10px]"
                />
                {getSetting('about_image_url') && <img src={getSetting('about_image_url')} className="w-10 h-10 rounded-lg object-cover shadow-md" />}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Título de Sección</label>
              <input type="text" value={getSetting('about_title')} onChange={(e) => handleUpdate('about_title', e.target.value)} className="w-full bg-[var(--mv-cream)]/50 rounded-2xl px-5 py-4 text-sm border border-black/5 focus:border-[var(--mv-sage)] outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Biografía Párrafo 1</label>
              <textarea rows={4} value={getSetting('about_text_1')} onChange={(e) => handleUpdate('about_text_1', e.target.value)} className="w-full bg-[var(--mv-cream)]/50 rounded-2xl px-5 py-4 text-sm border border-black/5 focus:border-[var(--mv-sage)] outline-none transition resize-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Biografía Párrafo 2</label>
              <textarea rows={4} value={getSetting('about_text_2')} onChange={(e) => handleUpdate('about_text_2', e.target.value)} className="w-full bg-[var(--mv-cream)]/50 rounded-2xl px-5 py-4 text-sm border border-black/5 focus:border-[var(--mv-sage)] outline-none transition resize-none" />
            </div>
          </div>
        </section>

        {/* Contacto & Redes */}
        <section className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[var(--mv-cream)] rounded-lg">
              <MessageCircle size={20} className="text-[var(--mv-sage)]" />
            </div>
            <h3 className="text-xl font-semibold uppercase tracking-tight">Contacto & Redes</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Email Público</label>
              <input type="email" value={getSetting('contact_email')} onChange={(e) => handleUpdate('contact_email', e.target.value)} className="w-full bg-[var(--mv-cream)]/50 rounded-2xl px-5 py-4 text-sm border border-black/5 focus:border-[var(--mv-sage)] outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">WhatsApp / Teléfono</label>
              <input type="text" value={getSetting('contact_phone')} onChange={(e) => handleUpdate('contact_phone', e.target.value)} className="w-full bg-[var(--mv-cream)]/50 rounded-2xl px-5 py-4 text-sm border border-black/5 focus:border-[var(--mv-sage)] outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">URL Instagram</label>
              <input type="text" value={getSetting('instagram_url')} onChange={(e) => handleUpdate('instagram_url', e.target.value)} className="w-full bg-[var(--mv-cream)]/50 rounded-2xl px-5 py-4 text-sm border border-black/5 focus:border-[var(--mv-sage)] outline-none transition" />
            </div>
          </div>
        </section>
      </div>

      {success && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[var(--mv-ink)] text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-4">
          <CheckCircle2 size={20} className="text-[var(--mv-sage)]" />
          <p className="text-sm font-medium uppercase tracking-widest">Ajustes guardados correctamente</p>
        </div>
      )}
    </div>
  );
}

