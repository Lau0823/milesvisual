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
  backgroundImage: "/violeta.jpeg", 
  names: "VIOLETA GUTIÉRREZ VALLEJO",
  fullDate: "Sábado, 2 de mayo, 2026",
  eventDate: "2026-05-02T19:00:00", 
  displayDate: "2 de Mayo de 2026", 
  displayTime: "7:00 PM",
  location: "JR CASA DE EVENTOS, KM5 Vía Restrepo vereda la popaya",
  // Se actualizó el enlace con las coordenadas exactas proporcionadas
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=4.1844722,-73.5841667",
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
    { time: "8:30 PM", event: "Entrada de violeta ", icon: <Sparkles size={20} /> },
    { time: "9:00 PM", event: "Vals ", icon: <Heart size={20} /> },
    { time: "10:00 PM", event: "Cena ", icon: <Flower2 size={20} /> },
    { time: "11:30 PM", event: "Party Time ", icon: <Music size={20} /> },
  ],
};

export default function InvitacionVioletaFinal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ días: 0, horas: 0, min: 0, seg: 0 });
  const [guestName, setGuestName] = useState("");
  const [songName, setSongName] = useState("");
  const [photoMessage, setPhotoMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0].name);
    }
  };

  const sendAction = (type: string) => {
    let url = "";
    switch(type) {
      case "confirm": 
        url = `https://wa.me/${DATA.whatsappConfirmaciones}?text=¡Hola! Confirmo mi asistencia. Mi nombre es: ${guestName}`; 
        break;
      case "song": 
        url = `https://wa.me/${DATA.whatsappConfirmaciones}?text=¡Hola! Esta canción no puede faltar en la playlist: ${songName}`; 
        break;
      case "mama": 
        url = `https://wa.me/${DATA.whatsappMama}?text=¡Hola! Hablo con la mamá de Violeta...`; 
        break;
      case "photo": 
        const message = encodeURIComponent(`¡Aquí va un recuerdo para la historia de Violeta! 📸\n\nMensaje: ${photoMessage}`);
        url = `https://wa.me/${DATA.whatsappConfirmaciones}?text=${message}`; 
        break;
      case "maps": 
        url = DATA.mapsUrl; 
        break;
    }
    window.open(url, "_blank");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full relative bg-black overflow-x-hidden font-sans">
      
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${DATA.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" /> 
      </div>

      <audio ref={audioRef} src="/Bad Bunny - Enséñame a Bailar.MP3" loop />

      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] flex items-center justify-center"
          >
            <div className="relative z-10 text-center px-4">
              <Sparkles className="mx-auto mb-6 animate-pulse text-white" size={45} />
              <h2 className="cover-title-heavy mb-12">
                FOLLOW THE GLOW <br/> OF THE DISCO BALL
              </h2>
              <button onClick={handleOpen} className="btn-pink px-12 py-5 rounded-full font-black text-white uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(245,135,190,0.6)]">
                ABRIR INVITACIÓN
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 w-full px-4 py-8 space-y-12">
          
          <section className="min-h-[85svh] flex flex-col items-center justify-center text-center">
            <h1 className="name-banner text-5xl md:text-[7.5rem] text-white drop-shadow-[0_10px_20px_rgba(0,0,0,1)] uppercase mb-8 leading-[0.85]">
                {DATA.names.split(' ').map((word, i) => (
                    <span key={i} className="block mb-2">{word}</span>
                ))}
            </h1>

            <div className="grid grid-cols-4 gap-3 w-full max-sm mx-auto mb-6">
              {Object.entries(timeLeft).map(([unit, val], i) => (
                <motion.div key={i} animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="bg-white/95 p-3 rounded-2xl border-t-4 border-pink-400">
                  <span className="text-2xl font-black block text-pink-600 leading-none">{val}</span>
                  <span className="text-[9px] uppercase font-black opacity-50 text-black">{unit}</span>
                </motion.div>
              ))}
            </div>

            <div className="text-white bg-black/40 backdrop-blur-md py-3 px-6 rounded-full inline-block border border-white/10">
              <p className="font-black uppercase tracking-[0.2em] text-xs">
                {DATA.displayDate} <span className="text-pink-400 mx-2">|</span> {DATA.displayTime}
              </p>
            </div>
          </section>

          {/* ITINERARIO */}
          <div className="glass-card p-10 max-w-2xl mx-auto text-white">
            <h3 className="section-title text-center text-4xl mb-10 italic">Itinerario</h3>
            <div className="space-y-8 max-w-xs mx-auto">
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

          {/* DRESS CODE */}
          <div className="glass-card py-12 text-center overflow-hidden text-white">
            <h3 className="section-title text-4xl mb-8 italic">Dress Code</h3>
            <div className="grid grid-cols-1 gap-4 px-8 mb-10 font-bold">
              <div className="bg-white/10 p-5 rounded-[2.5rem] border border-white/20">
                <p className="text-[10px] uppercase mb-1 opacity-60 tracking-widest">Damas</p>
                <p className="text-xl italic uppercase tracking-tighter mb-1">Vestido Largo</p>
                <span className="inline-block bg-pink-500/20 text-pink-300 text-[10px] px-3 py-1 rounded-full border border-pink-500/30 uppercase tracking-widest font-black">
                  Sin Estampados
                </span>
              </div>
              <div className="bg-white/10 p-5 rounded-[2.5rem] border border-white/20 flex flex-col justify-center">
                <p className="text-[10px] uppercase mb-1 opacity-60 tracking-widest">Caballeros</p>
                <p className="text-xl italic uppercase tracking-tighter">Traje Formal</p>
              </div>
            </div>
            
            <p className="font-black uppercase text-[10px] tracking-widest mb-6 text-pink-300">Colores Reservados</p>
            <div className="flex justify-center gap-6 mb-12">
              {[{l:'Rosa',c:COLORS.pink},{l:'Morado',c:'#8b5cf6'},{l:'Negro',c:'#000'},{l:'Plata',c:'linear-gradient(45deg,#bbb,#fff,#999)'}].map((c,i)=>(
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full border-2 border-white/50" style={{background:c.c}} />
                  <span className="text-[8px] font-black uppercase">{c.l}</span>
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

          {/* REGLAS */}
          <div className="glass-card p-10 text-center text-white">
            <ShieldCheck className="mx-auto mb-4" size={32} color={COLORS.pink} />
            <h3 className="section-title text-3xl mb-6 italic">Reglas</h3>
            <div className="text-left space-y-4 max-w-xs mx-auto text-sm font-bold opacity-80 uppercase tracking-tighter">
              <p className="flex gap-3">
                <Sparkles size={16} className="text-pink-400 flex-shrink-0" /> 
                DERECHO DE ADMISIÓN: SI NO VAS A BAILAR, LAVA LOS PLATOS
              </p>
              <p className="flex gap-3">
                <Sparkles size={16} className="text-pink-400 flex-shrink-0" /> 
                No acompañantes sin confirmar
              </p>
              <p className="flex gap-3">
                <Sparkles size={16} className="text-pink-400 flex-shrink-0" /> 
                Respetar el código de vestuario
              </p>
            </div>
          </div>

          {/* LUGAR */}
          <div className="glass-card p-10 text-center text-white">
            <MapPin className="mx-auto mb-4" size={32} color={COLORS.pink} />
            <h3 className="section-title text-4xl mb-4 italic">Lugar</h3>
            <p className="font-bold mb-8 text-sm opacity-80">{DATA.location}</p>
            <button onClick={() => sendAction("maps")} className="btn-pink w-full py-4 rounded-full font-black uppercase text-xs tracking-widest">CÓMO LLEGAR</button>
          </div>

          {/* PLAYLIST */}
          <div className="glass-card p-10 text-center text-white">
            <Music className="mx-auto mb-4 text-pink-400" size={32} />
            <h3 className="section-title text-3xl mb-4 italic">Playlist</h3>
            <p className="text-[10px] font-black uppercase opacity-60 mb-6 tracking-widest">
                Ayúdame a armar la mejor playlist! <br/> ¿Cuál canción crees que no puede faltar esa noche?
            </p>
            <input value={songName} onChange={(e)=>setSongName(e.target.value)} placeholder="NOMBRE DE LA CANCIÓN" className="w-full p-4 rounded-2xl mb-4 bg-white/10 border border-white/20 text-center font-bold text-white uppercase" />
            <button onClick={() => sendAction("song")} className="btn-pink w-full py-4 rounded-full font-black uppercase tracking-widest">SUGERIR CANCIÓN</button>
          </div>

          {/* SECCIÓN DE FOTO */}
          <div className="glass-card p-10 text-center text-white">
            <Camera className="mx-auto mb-4 text-pink-400" size={32} />
            <h3 className="section-title text-3xl mb-4 italic">¡Papaparazzi Time!</h3>
            <p className="section-title text-lg mb-6 opacity-90">
                Dicen que una foto vale más que mil palabras... <br/> ¡Sube una conmigo y sé parte de mi historia! 📸✨
            </p>
            <textarea value={photoMessage} onChange={(e)=>setPhotoMessage(e.target.value)} placeholder="CUÉNTAME ALGO DIVERTIDO..." className="w-full p-4 rounded-2xl mb-4 bg-white/10 border border-white/20 text-center text-sm font-bold h-24 text-white" />
            <label className="cursor-pointer bg-white/10 border-2 border-dashed border-pink-400/50 p-4 rounded-2xl w-full flex flex-col items-center justify-center gap-2 mb-4 font-black text-xs">
              <Upload size={18} /> {selectedFile ? selectedFile : "SUBIR MI MEJOR MOMENTO"}
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
            <button onClick={() => sendAction("photo")} className="btn-pink w-full py-4 rounded-full font-black uppercase tracking-widest">¡ENVIAR A VIOLETA!</button>
          </div>

          {/* LLUVIA DE SOBRES */}
          <div className="glass-card p-10 text-center border-2 border-dashed border-pink-500/50 text-white">
            <Gift className="mx-auto mb-4" size={40} color={COLORS.pink} />
            <h3 className="section-title text-3xl mb-4 italic">Lluvia de Sobres</h3>
            <p className="text-sm font-bold italic opacity-90 px-4">
              "Tu presencia es mi mayor regalo pero puedes llevar un sobrecito con mucho cariño para mi 🤍"
            </p>
          </div>

          {/* DEDICATORIA PADRES */}
          <div className="glass-card p-10 max-w-2xl mx-auto text-center border-l-4 border-pink-500 text-white">
            <Heart className="mx-auto mb-6 text-red-500 fill-red-500 animate-pulse" size={28} />
            <p className="section-title text-2xl italic leading-relaxed">
              "Hoy celebramos la luz que traes a nuestras vidas. Eres nuestro mayor orgullo, y ver como floreces es el regalo más hermoso que Dios nos ha dado."
            </p>
            <p className="mt-6 font-black uppercase text-[10px] text-pink-300 tracking-[0.4em]">— Con amor, Tus Padres —</p>
          </div>

          {/* ASISTENCIA */}
          <div className="glass-card p-10 text-center text-white">
            <h3 className="section-title text-4xl mb-10 italic font-bold">Asistencia</h3>
            <input value={guestName} onChange={(e)=>setGuestName(e.target.value)} placeholder="ESCRIBE TU NOMBRE" className="w-full p-5 rounded-2xl mb-6 bg-white text-black font-black text-center" />
            <div className="space-y-4">
              <button onClick={() => sendAction("confirm")} className="btn-pink w-full py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2"><Send size={18} /> CONFIRMAR</button>
              <button onClick={() => sendAction("mama")} className="btn-pink w-full py-4 rounded-2xl font-black uppercase text-[10px] flex items-center justify-center gap-2"><Phone size={16} /> HABLAR CON MAMÁ DE VIOLETA</button>
            </div>
          </div>

          {/* TICKET FINAL */}
      

          <p className="text-center text-white/30 text-[8px] tracking-[0.6em] uppercase pb-10">Design by Si Forever Studio</p>
        </motion.main>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,700&family=Montserrat:wght@400;700;900&family=Playfair+Display:wght@900&display=swap');
        
        body { background: black; margin: 0; padding: 0; font-family: 'Montserrat', sans-serif; }
        .name-banner { font-family: 'Playfair Display', serif; font-weight: 900; letter-spacing: -1px; }
        .section-title { font-family: 'Cormorant Garamond', serif; font-weight: 700; }

        .cover-title-heavy { 
          font-family: 'Montserrat', sans-serif !important; 
          font-size: 2.8rem; 
          line-height: 1;
          color: #fff; 
          font-weight: 900;
          letter-spacing: -1px;
          text-transform: uppercase;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(245, 135, 190, 0.4);
          animation: pulseGlow 2s ease-in-out infinite alternate;
        }

        @keyframes pulseGlow {
          from { text-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(245, 135, 190, 0.3); transform: scale(1); }
          to { text-shadow: 0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(245, 135, 190, 0.6); transform: scale(1.02); }
        }

        .glass-card { 
          background: rgba(255, 255, 255, 0.08); 
          backdrop-filter: blur(25px); 
          border-radius: 2.5rem; 
          border: 1px solid rgba(255, 255, 255, 0.15); 
        }

        .btn-pink { background: #F587BE; color: white; transition: all 0.2s ease; box-shadow: 0 4px 15px rgba(245, 135, 190, 0.3); }
        .btn-pink:active { transform: scale(0.95); }
      `}</style>
    </div>
  );
}