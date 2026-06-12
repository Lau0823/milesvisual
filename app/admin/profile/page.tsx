"use client";

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useAdminStore } from '../../../store/useAdminStore';
import { User, Camera, Shield, Save, Loader2, Key, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const { uploadAvatar, updateProfile, changePassword } = useAdminStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    username: '',
    telefono: '',
    foto_perfil_url: ''
  });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        nombre: session.user.name || '',
        email: session.user.email || '',
        username: (session.user as any).username || '',
        telefono: (session.user as any).telefono || '',
        foto_perfil_url: (session.user as any).foto_perfil_url || ''
      });
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const token = (session as any)?.accessToken;
      if (!token) throw new Error('No estás autenticado');

      await updateProfile(token, {
        nombre: formData.nombre,
        username: formData.username,
        email: formData.email,
        telefono: formData.telefono,
        foto_perfil_url: formData.foto_perfil_url
      });

      setSuccess(true);
      await update({
        ...session,
        user: {
          ...session?.user,
          name: formData.nombre,
          email: formData.email,
          foto_perfil_url: formData.foto_perfil_url
        }
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }

    setPasswordLoading(true);
    try {
      const token = (session as any)?.accessToken;
      if (!token) throw new Error('No estás autenticado');

      await changePassword(token, {
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword
      });

      setPasswordSuccess('Contraseña actualizada con éxito');
      setTimeout(() => {
        setIsPasswordModalOpen(false);
        setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
        setPasswordSuccess('');
      }, 2000);
    } catch (error: any) {
      setPasswordError(error.message || 'Error de conexión con el servidor');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-black/50 font-semibold mb-1">Configuración</p>
        <h2 className="text-4xl font-semibold tracking-tight uppercase">Mi Perfil</h2>
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-8">

        <div className="space-y-6">
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4 group cursor-pointer">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                id="avatar-upload"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (file.size > 5 * 1024 * 1024) return toast.error('El archivo supera los 5 MB');
                  
                  const toastId = toast.loading('Subiendo foto...');
                  try {
                    const token = (session as any)?.accessToken;
                    if (!token) throw new Error('No estás autenticado');
                    
                    const data = await uploadAvatar(token, file);
                    
                    setFormData(prev => ({ ...prev, foto_perfil_url: data.foto_perfil_url }));
                    await update({
                      ...session,
                      user: {
                        ...session?.user,
                        foto_perfil_url: data.foto_perfil_url
                      }
                    });
                    toast.success('Foto actualizada con éxito', { id: toastId });
                  } catch (error: any) {
                    toast.error(error.message || 'Error de conexión', { id: toastId });
                  }
                }}
              />
              <label htmlFor="avatar-upload" className="w-full h-full block cursor-pointer">
                <div className="w-full h-full rounded-full bg-[var(--mv-cream)] border-2 border-black/5 overflow-hidden flex items-center justify-center pointer-events-none">
                  {formData.foto_perfil_url ? (
                    <img src={formData.foto_perfil_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-black/20" />
                  )}
                </div>
                <div className="absolute bottom-0 right-0 p-2 bg-[var(--mv-sage)] text-white rounded-full shadow-md hover:scale-110 transition group-hover:bg-[var(--mv-ink)]">
                  <Camera size={16} />
                </div>
              </label>
            </div>
            <h3 className="text-xl font-semibold uppercase tracking-tight">{formData.nombre || 'Usuario'}</h3>
            <p className="text-[10px] uppercase tracking-widest text-black/40 font-medium mt-1">{(session?.user as any)?.rol || 'Admin'}</p>
          </div>

          <div className="bg-black/5 rounded-[24px] p-6 border border-black/5">
            <div className="flex items-center gap-3 mb-4">
              <Shield size={18} className="text-[var(--mv-sage)]" />
              <p className="text-[11px] uppercase tracking-widest font-semibold">Seguridad</p>
            </div>
            <p className="text-xs text-black/50 leading-relaxed">
              Tu contraseña se mantiene cifrada. Si decides cambiarla, asegúrate de usar al menos 8 caracteres con símbolos.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-black/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Nombre Completo</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full bg-[var(--mv-cream)]/50 rounded-2xl px-5 py-4 text-sm outline-none border border-black/5 focus:border-[var(--mv-sage)] transition"
                  placeholder="Ej. Juan Pérez"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  disabled
                  className="w-full bg-black/5 rounded-2xl px-5 py-4 text-sm outline-none border border-black/5 text-black/40 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[var(--mv-cream)]/50 rounded-2xl px-5 py-4 text-sm outline-none border border-black/5 focus:border-[var(--mv-sage)] transition"
                  placeholder="admin@milesvisual.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Teléfono</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full bg-[var(--mv-cream)]/50 rounded-2xl px-5 py-4 text-sm outline-none border border-black/5 focus:border-[var(--mv-sage)] transition"
                  placeholder="+57 300 000 0000"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-black/5">
              <div className="space-y-2 flex items-center justify-between bg-black/5 p-4 rounded-2xl border border-black/5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-black/80">Contraseña de Acceso</p>
                  <p className="text-[10px] text-black/40 mt-1">Cambia tu contraseña de forma segura.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="bg-white border border-black/10 text-black px-6 py-3 rounded-xl text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[var(--mv-sage)] hover:text-white hover:border-[var(--mv-sage)] transition flex items-center gap-2 shadow-sm"
                >
                  <Key size={14} /> Cambiar Contraseña
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              {success && (
                <p className="text-[11px] uppercase tracking-wider text-green-600 font-semibold animate-bounce">
                  ¡Perfil actualizado con éxito!
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="ml-auto bg-[var(--mv-ink)] text-white px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[var(--mv-sage)] transition flex items-center gap-3 disabled:opacity-50"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
        {isPasswordModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[32px] p-8 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-300">
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="absolute top-6 right-6 text-black/40 hover:text-black transition"
              >
                <X size={20} />
              </button>
              <div className="mb-6">
                <div className="w-12 h-12 bg-[var(--mv-cream)] rounded-full flex items-center justify-center mb-4">
                  <Shield size={24} className="text-[var(--mv-sage)]" />
                </div>
                <h3 className="text-xl font-semibold uppercase tracking-tight">Cambiar Contraseña</h3>
                <p className="text-xs text-black/50 mt-1">Ingresa tu contraseña actual y la nueva contraseña para actualizarla.</p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Contraseña Actual</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.oldPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                    className="w-full bg-[var(--mv-cream)]/50 rounded-xl px-4 py-3 text-sm outline-none border border-black/5 focus:border-[var(--mv-sage)] transition"
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Nueva Contraseña</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full bg-[var(--mv-cream)]/50 rounded-xl px-4 py-3 text-sm outline-none border border-black/5 focus:border-[var(--mv-sage)] transition"
                    placeholder="Mínimo 6 caracteres"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black/40 ml-1">Confirmar Nueva Contraseña</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full bg-[var(--mv-cream)]/50 rounded-xl px-4 py-3 text-sm outline-none border border-black/5 focus:border-[var(--mv-sage)] transition"
                    placeholder="Repite la nueva contraseña"
                  />
                </div>

                {passwordError && <p className="text-red-500 text-xs font-semibold mt-2">{passwordError}</p>}
                {passwordSuccess && <p className="text-green-600 text-xs font-semibold mt-2">{passwordSuccess}</p>}

                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="w-full mt-6 bg-[var(--mv-ink)] text-white px-6 py-4 rounded-xl text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[var(--mv-sage)] transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {passwordLoading ? <Loader2 size={16} className="animate-spin" /> : 'Actualizar Contraseña'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
