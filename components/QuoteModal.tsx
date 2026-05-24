import React, { useState, useEffect } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  whatsappUrl: string;
}

export default function QuoteModal({ isOpen, onClose, planName, whatsappUrl }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
      
      const payload = {
        ...formData,
        serviceInterested: planName,
        userAgent: navigator.userAgent,
        sourceUrl: window.location.href,
        status: 'new'
      };

      const res = await fetch(`${API}/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        console.error('Error al enviar cotización');
        // Aún si falla la API (ej. sin conexión), podemos redirigir a WhatsApp
        window.open(whatsappUrl, '_blank');
        onClose();
      }
    } catch (error) {
      console.error('Network error:', error);
      // Fallback a whatsapp en caso de error
      window.open(whatsappUrl, '_blank');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={handleOverlayClick}
    >
      <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute right-5 top-5 h-10 w-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors z-10"
        >
          <X size={20} className="text-black/60" />
        </button>

        {!isSuccess ? (
          <div className="p-8 md:p-10">
            <h3 className="text-3xl font-semibold uppercase tracking-tight mb-2 pr-10">
              Cotizar Plan
            </h3>
            <p className="text-sm text-black/50 mb-8 font-medium uppercase tracking-widest">
              {planName}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-black/40 mb-2">Nombre completo</label>
                <input 
                  type="text" 
                  required
                  value={formData.clientName}
                  onChange={e => setFormData({...formData, clientName: e.target.value})}
                  className="w-full bg-black/5 border-none rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#789894] outline-none transition-all"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-black/40 mb-2">Correo electrónico</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black/5 border-none rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#789894] outline-none transition-all"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-black/40 mb-2">Teléfono</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-black/5 border-none rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#789894] outline-none transition-all"
                    placeholder="Ej. +57 300..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-black/40 mb-2">Detalles / Fecha tentativa</label>
                <textarea 
                  rows={3}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-black/5 border-none rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#789894] outline-none transition-all resize-none"
                  placeholder="Cuéntanos un poco sobre tu evento..."
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full mt-4 bg-[#789894] hover:bg-[#5a7673] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#789894]/30 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Enviando...</span>
                ) : (
                  <>Enviar y continuar a WhatsApp <Send size={14} /></>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-10 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
              <MessageCircle size={36} />
            </div>
            <h3 className="text-2xl font-semibold uppercase tracking-tight mb-3">
              ¡Solicitud Recibida!
            </h3>
            <p className="text-sm text-black/60 mb-8 leading-relaxed">
              Hemos registrado tus datos. Haz clic abajo para enviarnos el mensaje por WhatsApp y recibir atención inmediata.
            </p>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#25D366]/30"
            >
              Abrir WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
