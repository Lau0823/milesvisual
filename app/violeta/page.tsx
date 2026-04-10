"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Music,
  MapPin,
  Gift,
  Camera,
  Sparkles,
  Heart,
  Flower2,
  Phone,
  Ticket,
  Send,
  Upload,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = {
  pink: "#F587BE",
  white: "#FFFFFF",
};

const DATA = {
  coverBackground: "/violeta.jpeg",
  youtubeVideoId: "VTH1zCgC1kI",
  names: "VIOLETA GUTIÉRREZ VALLEJO",
  fullDate: "Sábado, 2 de mayo, 2026",
  eventDate: "2026-05-02T19:00:00",
  location: "JR CASA DE EVENTOS, KM5 Vía Restrepo vereda la popaya",
  mapsUrl: "https://www.google.com/maps/dir/Eventos+y+Recepciones+JR,+Cl.+64b+%23107c-47,+Bogotá/Hotel+Campestre+Palma+Verde,+LA+POYATA+VIA+RESTREPO+ANTES+DEL+PEAJE,+50001,+Villavicencio,+Meta/@4.4091456,-73.8646524,10z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x8e3f9d9b0b256573:0xb5c10f42e52b3a28!2m2!1d-74.1291221!2d4.7001203!1m5!1m1!1s0x8e3e2d569380b169:0xb1968bcf54fc75a5!2m2!1d-73.5837965!2d4.1850812?entry=ttu&g_ep=EgoyMDI2MDQwNy4wIKXMDSoASAFQAw%3D%3D",
  whatsappConfirmaciones: "573226158713",
  whatsappMama: "573125433541",
  dressCodePhotos: [
    "https://i.pinimg.com/1200x/7a/cb/74/7acb74a70cbe107abd77b6b702d052ec.jpg",
    "https://i.pinimg.com/736x/d0/c9/f1/d0c9f144aaebf47db4f1cf39aebf7adc.jpg",
    "https://i.pinimg.com/736x/c3/31/aa/c331aa228e2d0d7a1515ff39d41b1eda.jpg",
    "https://i.pinimg.com/736x/07/52/19/07521996aba5ad6734e593ac87e5741c.jpg",
    "https://i.pinimg.com/1200x/c4/28/cb/c428cbfb0e03334c2615a644c8fc41d5.jpg",
  ],
  itinerary: [
    { time: "7:00 PM", event: "Recepción de Invitados", icon: <Flower2 size={20} /> },
    { time: "8:30 PM", event: "Entrada ", icon: <Sparkles size={20} /> },
    { time: "9:00 PM", event: "El Vals ", icon: <Heart size={20} /> },
    { time: "10:00 PM", event: "Cena ", icon: <Flower2 size={20} /> },
    { time: "11:30 PM", event: "Party ", icon: <Music size={20} /> },
  ],
};

export default function InvitacionVioletaCompleta() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ días: 0, horas: 0, min: 0, seg: 0 });
  const [guestName, setGuestName] = useState("");
  const [songName, setSongName] = useState("");
  const [photoMessage, setPhotoMessage] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date(DATA.eventDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;
      if (difference > 0) {
        setTimeLeft({
          días: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
          min: Math.floor((difference / 1000 / 60) % 60),
          seg: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current) audioRef.current.play().catch(() => {});
  };

  const sendAction = (type: string) => {
    let url = "";
    switch(type) {
      case "confirm": url = `https://wa.me/${DATA.whatsappConfirmaciones}?text=¡Hola! Confirmo mi asistencia. Mi nombre es: ${guestName}`; break;
      case "song": url = `https://wa.me/${DATA.whatsappConfirmaciones}?text=¡Hola! Mi sugerencia para la playlist es: ${songName}`; break;
      case "mama": url = `https://wa.me/${DATA.whatsappMama}?text=¡Hola! Hablo con la mamá de Violeta...`; break;
      case "photo": url = `https://wa.me/${DATA.whatsappConfirmaciones}?text=¡Hola! Te envío esta foto con este mensaje: ${photoMessage}`; break;
      case "maps": url = DATA.mapsUrl; break;
    }
    window.open(url, "_blank");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full relative bg-black overflow-x-hidden font-sans">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <iframe 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350%] h-full md:w-full md:h-[110%]"
          src={`https://www.youtube-nocookie.com/embed/${DATA.youtubeVideoId}?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=${DATA.youtubeVideoId}&playsinline=1`} 
          allow="autoplay; encrypted-media" 
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <audio ref={audioRef} src="/Bad Bunny - Enséñame a Bailar.MP3 " loop />

      <AnimatePresence>
        {!isOpen && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${DATA.coverBackground})` }}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 text-center px-4">
              <Sparkles className="mx-auto mb-4 animate-pulse" size={45} color={COLORS.pink} />
              <h2 className="cover-title mb-8">FOLLOW THE GLOW OF THE DISCO BALL</h2>
              <button onClick={handleOpen} className="btn-pink px-12 py-5 rounded-full font-black text-white uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(245,135,190,0.6)]">
                ABRIR INVITACIÓN
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 w-full px-4 py-8 space-y-12">
          
          {/* 1. BANNER */}
          <section className="min-h-[85svh] flex flex-col items-center justify-center text-center">
            <h1 className="name-banner text-6xl md:text-[9rem] text-white drop-shadow-[0_10px_20px_rgba(0,0,0,1)] uppercase mb-10">{DATA.names}</h1>
            <div className="grid grid-cols-4 gap-3 w-full max-w-sm">
              {Object.entries(timeLeft).map(([unit, val], i) => (
                <motion.div key={i} animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="bg-white/95 p-3 rounded-2xl border-t-4 border-pink-400">
                  <span className="text-2xl font-black block text-pink-600 leading-none">{val}</span>
                  <span className="text-[9px] uppercase font-black opacity-50">{unit}</span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 2. ITINERARIO */}
          <div className="glass-card p-10 max-w-2xl mx-auto">
            <h3 className="section-title text-center text-4xl mb-10 italic text-white">Itinerario</h3>
            <div className="space-y-8 max-w-xs mx-auto text-white">
              {DATA.itinerary.map((item, i) => (
                <div key={i} className="flex gap-5 items-center border-l-2 border-dashed border-pink-500/30 pl-6 ml-2">
                  <div className="p-3 bg-pink-500 rounded-full">{item.icon}</div>
                  <div>
                    <p className="text-[10px] font-black opacity-50 uppercase">{item.time}</p>
                    <p className="text-lg font-bold uppercase">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. CÓDIGO DE VESTUARIO */}
          <div className="glass-card py-12 text-center overflow-hidden">
            <h3 className="section-title text-4xl mb-8 italic text-white">Dress Code</h3>
            <div className="grid grid-cols-1 gap-4 px-8 mb-10 text-white font-bold">
              <div className="bg-white/10 p-5 rounded-[2.5rem] border border-white/20">
                <p className="text-[10px] uppercase mb-1 opacity-60 tracking-widest">Damas</p>
                <p className="text-xl italic uppercase">Vestido largo unicolor</p>
              </div>
              <div className="bg-white/10 p-5 rounded-[2.5rem] border border-white/20">
                <p className="text-[10px] uppercase mb-1 opacity-60 tracking-widest">Caballeros</p>
                <p className="text-lg italic uppercase">Pantalón negro y camisa negra manga larga</p>
              </div>
            </div>
            <p className="font-black uppercase text-[10px] tracking-widest mb-6 text-pink-300">Colores Reservados</p>
            <div className="flex justify-center gap-6 mb-12">
              {[{l:'Rosa',c:COLORS.pink},{l:'Morado',c:'#8b5cf6'},{l:'Negro',c:'#000'},{l:'Plata',c:'linear-gradient(45deg,#bbb,#fff,#999)'}].map((c,i)=>(
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full border-2 border-white/50" style={{background:c.c}} />
                  <span className="text-[8px] font-black text-white uppercase">{c.l}</span>
                </div>
              ))}
            </div>
            <div className="relative flex overflow-hidden">
              <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="flex gap-4 pr-4">
                {[...DATA.dressCodePhotos, ...DATA.dressCodePhotos].map((img, i) => (
                  <img key={i} src={img} className="w-52 h-72 object-cover rounded-[3rem] border-2 border-white/20 flex-shrink-0" />
                ))}
              </motion.div>
            </div>
          </div>

          {/* 4. LUGAR */}
          <div className="glass-card p-10 text-center text-white">
            <MapPin className="mx-auto mb-4" size={32} color={COLORS.pink} />
            <h3 className="section-title text-4xl mb-4 italic text-white">Lugar</h3>
            <p className="font-bold mb-8 text-sm opacity-80">{DATA.location}</p>
            <button onClick={() => sendAction("maps")} className="btn-pink w-full py-4 rounded-full font-black uppercase text-xs tracking-widest">CÓMO LLEGAR</button>
          </div>

          {/* 5. ARMÁ LA PLAYLIST */}
          <div className="glass-card p-10 text-center text-white">
            <Music className="mx-auto mb-4 text-pink-400" size={32} />
            <h3 className="section-title text-3xl mb-4 italic text-white">Ayúdame a armar la mejor playlist</h3>
            <p className="text-[11px] mb-8 font-black uppercase opacity-60">¿Cuál canción crees que no puede faltar esta noche?</p>
            <input value={songName} onChange={(e)=>setSongName(e.target.value)} placeholder="CANCIÓN / ARTISTA" className="w-full p-4 rounded-2xl mb-4 bg-white/10 border border-white/20 text-center font-bold text-white uppercase" />
            <button onClick={() => sendAction("song")} className="btn-pink w-full py-4 rounded-full font-black uppercase tracking-widest">ENVIAR CANCIÓN</button>
          </div>

          {/* 6. POSTEAR FOTO */}
          <div className="glass-card p-10 text-center text-white">
            <Camera className="mx-auto mb-4 text-pink-400" size={32} />
            <h3 className="section-title text-3xl mb-4 italic text-white">Sube tu Foto</h3>
            <p className="text-[11px] mb-8 font-black uppercase opacity-60 italic">Comparte un recuerdo conmigo antes de la fiesta</p>
            <textarea value={photoMessage} onChange={(e)=>setPhotoMessage(e.target.value)} placeholder="ESCRIBE UN MENSAJE..." className="w-full p-4 rounded-2xl mb-4 bg-white/10 border border-white/20 text-center text-sm font-bold h-24 text-white" />
            <label className="cursor-pointer bg-white/10 border-2 border-dashed border-pink-400/50 p-4 rounded-2xl w-full flex items-center justify-center gap-2 mb-4 font-black text-xs">
              <Upload size={18} /> SELECCIONAR FOTO
              <input type="file" className="hidden" />
            </label>
            <button onClick={() => sendAction("photo")} className="btn-pink w-full py-4 rounded-full font-black uppercase tracking-widest">ENVIAR AL WHATSAPP</button>
          </div>

          {/* 7. REGLAS */}
          <div className="glass-card p-10 text-center text-white">
            <ShieldCheck className="mx-auto mb-4" size={32} color={COLORS.pink} />
            <h3 className="section-title text-3xl mb-6 italic text-white">Reglas del Evento</h3>
            <div className="text-left space-y-4 max-w-xs mx-auto text-sm font-bold opacity-80 uppercase tracking-tighter">
              <p className="flex gap-3"><Sparkles size={16} className="text-pink-400 flex-shrink-0" /> DERECHO DE ADMISIÓN: Prohibido traer gente que no sepa pasarla bueno.</p>
              <p className="flex gap-3"><Sparkles size={16} className="text-pink-400 flex-shrink-0" /> No traer acompañantes sin confirmar</p>
              <p className="flex gap-3"><Sparkles size={16} className="text-pink-400 flex-shrink-0" /> Respetar el código de vestuario</p>
            </div>
          </div>

          {/* 8. LLUVIA DE SOBRES */}
          <div className="glass-card p-10 text-center border-2 border-dashed border-pink-500/50 text-white">
            <Gift className="mx-auto mb-4" size={40} color={COLORS.pink} />
            <h3 className="section-title text-3xl mb-4 italic text-white">Lluvia de Sobres</h3>
            <p className="text-sm font-bold italic opacity-90 leading-relaxed px-4">
              "Tu presencia es mi mayor regalo pero puedes llevar un sobrecito con muchos millones para mi 🤍"
            </p>
          </div>

          {/* 9. DEDICATORIA */}
          <div className="glass-card p-10 max-w-2xl mx-auto text-center border-l-4 border-pink-500 text-white">
            <Heart className="mx-auto mb-6 text-red-500 fill-red-500 animate-pulse" size={28} />
            <p className="text-2xl font-serif italic leading-relaxed">
              "Hija, eres nuestro sueño hecho realidad. Que este nuevo camino que inicias esté lleno de luz y felicidad. Te amamos con toda el alma."
            </p>
            <p className="mt-6 font-black uppercase text-[10px] text-pink-300 tracking-[0.4em]">— Tus Padres —</p>
          </div>

          {/* 10. CONFIRMACIÓN */}
          <div className="glass-card p-10 text-center text-white">
            <h3 className="section-title text-4xl mb-10 italic text-white font-bold">Asistencia</h3>
            <input value={guestName} onChange={(e)=>setGuestName(e.target.value)} placeholder="ESCRIBE TU NOMBRE" className="w-full p-5 rounded-2xl mb-6 bg-white text-black font-black text-center" />
            <div className="space-y-4">
              <button onClick={() => sendAction("confirm")} className="btn-pink w-full py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2"><Send size={18} /> CONFIRMAR WHATSAPP</button>
              <button onClick={() => sendAction("mama")} className="btn-pink w-full py-4 rounded-2xl font-black uppercase text-[10px] flex items-center justify-center gap-2"><Phone size={16} /> HABLAR CON MAMÁ DE VIOLETA</button>
            </div>
          </div>

          {/* 11. TARJETA DE CINE GLASS (FOOTER) */}
          <div className="max-w-md mx-auto mt-20 px-2 pb-20">
            <div className="glass-card relative overflow-hidden p-8 border-none bg-white/10 backdrop-blur-3xl shadow-2xl">
              <div className="absolute top-1/2 -left-5 w-10 h-10 bg-black rounded-full -translate-y-1/2" />
              <div className="absolute top-1/2 -right-5 w-10 h-10 bg-black rounded-full -translate-y-1/2" />
              <div className="border-b-2 border-dashed border-white/20 pb-6 mb-6 flex justify-between items-start text-white/60">
                <Ticket size={28} className="opacity-40" />
                <div className="text-right">
                  <p className="font-mono text-[9px] font-black uppercase tracking-widest">ADMIT ONE</p>
                  <p className="font-mono text-[9px] font-black uppercase">SÁB. 02 MAYO 2026</p>
                </div>
              </div>
              <div className="text-center text-white">
                <p className="font-mono text-[8px] uppercase tracking-[0.5em] opacity-50 mb-2">Exclusive Event</p>
                <h4 className="name-banner text-3xl uppercase leading-none">{DATA.names}</h4>
                <p className="font-serif italic text-sm mt-4 opacity-70">"A Night Full of Stars"</p>
              </div>
              <div className="mt-8 flex flex-col items-center opacity-40">
                <div className="h-12 w-full bg-[repeating-linear-gradient(90deg,white,white_1px,transparent_1px,transparent_4px)]" />
                <p className="font-mono text-[8px] mt-2 tracking-[0.3em]">#VIOLETAXVCEREMONY</p>
              </div>
            </div>
          </div>
          <p className="text-center text-white/30 text-[8px] tracking-[0.6em] uppercase pb-10">Design by Si Forever Studio</p>
        </motion.main>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,700&family=Montserrat:wght@400;700;900&family=Caveat:wght@700&family=Playfair+Display:wght@900&display=swap');
        body { background: black; margin: 0; padding: 0; font-family: 'Montserrat', sans-serif; }
        .name-banner { font-family: 'Playfair Display', serif; font-weight: 900; letter-spacing: -3px; line-height: 0.8; }
        .section-title { font-family: 'Cormorant Garamond', serif; font-weight: 700; }
        .cover-title { font-family: 'Caveat', cursive; font-size: 2.2rem; color: white; text-shadow: 0 0 15px #F587BE; }
        .glass-card { background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(25px); border-radius: 2.5rem; border: 1px solid rgba(255, 255, 255, 0.15); }
        .btn-pink { background: #F587BE; color: white; transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .btn-pink:active { transform: scale(0.94); filter: brightness(0.9); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}