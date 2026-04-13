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
  Send,
  Upload,
  ShieldCheck,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = {
  pink: "#F587BE",
  white: "#FFFFFF",
};

const DATA = {
  backgroundImage: "/violeta.jpeg",
  nameImage: "/bannerv.png",
  fullDate: "Sábado, 2 de mayo, 2026",
  eventDate: "2026-05-02T19:00:00",
  displayDate: "Sábado, 2 de Mayo de 2026",
  displayTime: "7:00 PM",
  location: "JR CASA DE EVENTOS, KM5 Vía Restrepo vereda la popaya",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=4.1844722,-73.5841667",
  whatsappConfirmaciones: "573226158713",
  whatsappMama: "573125433541",
  dressCodePhotos: [
    "/CVV.jpeg",
    "/CVV1.jpeg",
    "/CVV.jpeg",
    "/CVV1.jpeg",
    "/CVV.jpeg",
  ],
  itinerary: [
    { time: "7:00 PM", event: "Recepción de Invitados", icon: <Flower2 size={20} /> },
    { time: "8:30 PM", event: "Entrada de violeta ", icon: <Sparkles size={20} /> },
    { time: "9:00 PM", event: "Vals ", icon: <Heart size={20} /> },
    { time: "10:00 PM", event: "Cena ", icon: <Flower2 size={20} /> },
    { time: "11:30 PM", event: "Party Time ", icon: <Music size={20} /> },
    { time: "2:00 AM", event: "Los papás pueden empezar a recoger a sus hijos", icon: <Clock size={20} /> },
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

  useEffect(() => {
    setMounted(true);
  }, []);

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
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0].name);
    }
  };

  const sendAction = (type: "confirm" | "song" | "mama" | "photo" | "maps") => {
    let url = "";

    switch (type) {
      case "confirm":
        url = `https://wa.me/${DATA.whatsappConfirmaciones}?text=${encodeURIComponent(
          `¡Hola! Confirmo mi asistencia: ${guestName}`
        )}`;
        break;
      case "song":
        url = `https://wa.me/${DATA.whatsappConfirmaciones}?text=${encodeURIComponent(
          `Sugerencia de canción: ${songName}`
        )}`;
        break;
      case "mama":
        url = `https://wa.me/${DATA.whatsappMama}?text=${encodeURIComponent(
          "Hola, hablo con la mamá de Violeta..."
        )}`;
        break;
      case "photo":
        url = `https://wa.me/${DATA.whatsappConfirmaciones}?text=${encodeURIComponent(
          `Mensaje: ${photoMessage}`
        )}`;
        break;
      case "maps":
        url = DATA.mapsUrl;
        break;
    }

    window.open(url, "_blank");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full relative bg-black overflow-x-hidden">
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
          >
            <div className="relative z-10 text-center px-4">
              <Sparkles className="mx-auto mb-6 animate-pulse text-white" size={45} />
              <h2 className="cover-title-neon mb-12">
  Follow the Glow <br /> of the Disco Ball
</h2>
              <button
                onClick={handleOpen}
                className="btn-pink px-12 py-5 rounded-full text-white uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(245,135,190,0.6)]"
              >
                ABRIR INVITACIÓN
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="invitation-content relative z-10 w-full px-4 py-8 space-y-12"
        >
          <section className="min-h-[85svh] flex flex-col items-center justify-center text-center">
            <img
              src={DATA.nameImage}
              alt="VIOLETA"
              className="w-full max-w-md mx-auto mb-8 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
            />

            <div className="grid grid-cols-4 gap-3 w-full max-w-sm mx-auto mb-6">
              {Object.entries(timeLeft).map(([unit, val], i) => (
                <div
                  key={i}
                  className="bg-white/95 p-3 rounded-2xl border-t-4 border-pink-400"
                >
                  <span className="text-2xl font-black block text-pink-600 leading-none">
                    {val}
                  </span>
                  <span className="text-[9px] uppercase font-black opacity-50 text-black">
                    {unit}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-white bg-black/40 backdrop-blur-md py-3 px-6 rounded-full inline-block border border-white/10">
              <p className="inner-text font-black uppercase tracking-[0.2em] text-xs">
                {DATA.displayDate} <span className="text-pink-400 mx-2">|</span> {DATA.displayTime}
              </p>
            </div>
          </section>

          <div className="glass-card p-10 max-w-2xl mx-auto text-white">
            <h3 className="section-title text-center text-4xl mb-10">Itinerario</h3>
            <div className="space-y-8 max-w-xs mx-auto">
              {DATA.itinerary.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-5 items-center border-l-2 border-dashed border-pink-500/30 pl-6 ml-2"
                >
                  <div className="p-3 bg-pink-500 rounded-full shrink-0">{item.icon}</div>
                  <div>
                    <p className="inner-time text-[10px] opacity-60 uppercase">{item.time}</p>
                    <p className="inner-main text-lg uppercase leading-tight">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card py-12 text-center overflow-hidden text-white">
            <h3 className="section-title text-4xl mb-8">Código de Vestuario</h3>
            <div className="grid grid-cols-1 gap-4 px-8 mb-10">
              <div className="bg-white/10 p-5 rounded-[2.5rem] border border-white/20">
                <p className="inner-time text-[10px] uppercase mb-1 opacity-60 tracking-widest">Mujer</p>
                <p className="inner-main text-xl uppercase tracking-[0.08em]">Vestido Largo unicolor</p>
                <span className="inline-block bg-pink-500/20 text-pink-300 text-[10px] px-3 py-1 rounded-full border border-pink-500/30 uppercase tracking-widest inner-time">
                  Sin Estampados
                </span>
              </div>
              <div className="bg-white/10 p-5 rounded-[2.5rem] border border-white/20">
                <p className="inner-time text-[10px] uppercase mb-1 opacity-60 tracking-widest">Hombres</p>
                <p className="inner-main text-xl uppercase tracking-[0.08em]">Camisa negra manga larga y pantalón negro</p>
              </div>
            </div>

            <p className="inner-time uppercase text-[10px] tracking-widest mb-8 text-pink-300">Colores Reservados</p>

            <div className="flex flex-col items-center gap-4 mb-12">
              {[
                { l: "Rosa", c: COLORS.pink },
                { l: "Morado", c: "#8b5cf6" },
                { l: "Negro", c: "#000" },
                { l: "Plata", c: "linear-gradient(45deg,#bbb,#fff,#999)" }
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between w-40 border-b border-white/10 pb-2">
                  <span className="inner-time text-[10px] uppercase tracking-widest">{c.l}</span>
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white/50"
                    style={{ background: c.c }}
                  />
                </div>
              ))}
            </div>

            <div className="relative flex overflow-hidden">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="flex gap-4 pr-4"
              >
                {[...DATA.dressCodePhotos, ...DATA.dressCodePhotos].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Dress code ${i + 1}`}
                    className="w-52 h-72 object-cover rounded-[3rem] border-2 border-white/20 flex-shrink-0"
                  />
                ))}
              </motion.div>
            </div>
          </div>

          <div className="glass-card p-10 text-center text-white">
            <ShieldCheck className="mx-auto mb-4" size={32} color={COLORS.pink} />
            <h3 className="section-title text-3xl mb-6">Notas importantes:</h3>
            <div className="text-left space-y-4 max-w-xs mx-auto text-sm uppercase tracking-[0.05em]">
              <p className="inner-main flex gap-3">
                <Sparkles size={16} className="text-pink-400 flex-shrink-0" />
                No se permite mala actitud
              </p>
              <p className="inner-main flex gap-3">
                <Sparkles size={16} className="text-pink-400 flex-shrink-0" />
                Prohibido quedarse sentado
              </p>
              <p className="inner-main flex gap-3">
                <Sparkles size={16} className="text-pink-400 flex-shrink-0" />
                Respetar el código de vestuario
              </p>
              <p className="inner-main flex gap-3">
                <Sparkles size={16} className="text-pink-400 flex-shrink-0" />
                Sonríe, baila, tomate fotos, y disfruta como si esta noche como si tambien fuera la tuya.
              </p>
            </div>
          </div>

          <div className="glass-card p-10 text-center text-white">
            <MapPin className="mx-auto mb-4" size={32} color={COLORS.pink} />
            <h3 className="section-title text-4xl mb-4">Lugar</h3>
            <p className="inner-main mb-8 text-sm opacity-90">{DATA.location}</p>
            <button
              onClick={() => sendAction("maps")}
              className="btn-pink w-full py-4 rounded-full uppercase text-xs tracking-widest"
            >
              CÓMO LLEGAR
            </button>
          </div>

          <div className="glass-card p-10 text-center text-white">
            <Music className="mx-auto mb-4 text-pink-400" size={32} />
            <h3 className="section-title text-3xl mb-4">Playlist</h3>
            <p className="inner-time text-[10px] uppercase opacity-60 mb-6 tracking-widest">
              Ayúdame a armar la mejor playlist! <br /> ¿Cuál canción crees que no puede faltar esa noche?
            </p>
            <input
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              placeholder="NOMBRE DEL INVITADO"
              className="input-style w-full p-4 rounded-2xl mb-4 bg-white/10 border border-white/20 text-center text-white uppercase"
            />
            <button
              onClick={() => sendAction("song")}
              className="btn-pink w-full py-4 rounded-full uppercase tracking-widest"
            >
              SUGERIR CANCIÓN
            </button>
          </div>

          <div className="glass-card p-10 text-center text-white">
            <Camera className="mx-auto mb-4 text-pink-400" size={32} />
            <p className="section-title text-lg mb-6 opacity-90">
              ¡Sube una foto conmigo y dejame un mensaje que podamos compartir!
            </p>
            <textarea
              value={photoMessage}
              onChange={(e) => setPhotoMessage(e.target.value)}
              placeholder="TEXTO"
              className="input-style w-full p-4 rounded-2xl mb-4 bg-white/10 border border-white/20 text-center text-white h-24"
            />
            <label className="input-style cursor-pointer bg-white/10 border-2 border-dashed border-pink-400/50 p-4 rounded-2xl w-full flex flex-col items-center justify-center gap-2 mb-4 text-xs uppercase">
              <Upload size={18} />
              {selectedFile ? selectedFile : "SUBE TU RECUERDO"}
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
            <button
              onClick={() => sendAction("photo")}
              className="btn-pink w-full py-4 rounded-full uppercase tracking-widest"
            >
              ¡ENVIAR!
            </button>
          </div>

          <div className="glass-card p-10 text-center border-2 border-dashed border-pink-500/50 text-white">
            <Gift className="mx-auto mb-4" size={40} color={COLORS.pink} />
            <h3 className="section-title text-3xl mb-4">Lluvia de Sobres</h3>
          </div>
<div className="glass-card p-10 max-w-2xl mx-auto text-center border-l-4 border-pink-500 text-white">
  <Heart className="mx-auto mb-6 text-red-500 fill-red-500 animate-pulse" size={28} />
  
  <p className="dedicatoria-text text-2xl leading-relaxed text-white">
    "Hoy celebramos la vida de Violeta, y nada nos haría más felices que compartir este sueño contigo."
  </p>

  <p className="con-amor-text mt-6 text-pink-300">
    Con amor, <br /> Andrés, Paula & Azul.
  </p>
</div>

          <div className="glass-card p-10 text-center text-white">
            <h3 className="section-title text-4xl mb-10">Asistencia</h3>
            <input
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="NOMBRE DEL INVITADO"
              className="input-style-dark w-full p-5 rounded-2xl mb-6 bg-white text-black text-center uppercase"
            />
            <div className="space-y-4">
              <button
                onClick={() => sendAction("confirm")}
                className="btn-pink w-full py-5 rounded-2xl uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Send size={18} /> CONFIRMAR
              </button>
              <button
                onClick={() => sendAction("mama")}
                className="btn-pink w-full py-4 rounded-2xl uppercase text-[10px] flex items-center justify-center gap-2"
              >
                <Phone size={16} /> HABLAR CON MAMÁ DE VIOLETA
              </button>
            </div>
          </div>

          <p className="text-center text-white/30 text-[8px] tracking-[0.6em] uppercase pb-10"></p>
        </motion.main>
      )}

     <style jsx global>{`
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Pacifico&display=swap');

  * {
    box-sizing: border-box;
  }

  body {
    background: black;
    margin: 0;
    padding: 0;
  }

  .invitation-content,
  .invitation-content p,
  .invitation-content span,
  .invitation-content h3,
  .invitation-content button,
  .invitation-content input,
  .invitation-content textarea,
  .invitation-content label {
    font-family: 'Oswald', sans-serif !important;
  }

  .section-title {
    font-family: 'Oswald', sans-serif !important;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #f7a8d0;
    text-shadow:
      0 0 6px rgba(245, 135, 190, 0.18),
      0 0 14px rgba(245, 135, 190, 0.12);
  }

  .inner-main {
    font-family: 'Oswald', sans-serif !important;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .inner-time {
    font-family: 'Oswald', sans-serif !important;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  .inner-text {
    font-family: 'Oswald', sans-serif !important;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .input-style,
  .input-style-dark {
    font-family: 'Oswald', sans-serif !important;
    font-weight: 400;
    letter-spacing: 0.06em;
  }

  .cover-title-neon {
    font-family: 'Pacifico', cursive !important;
    font-size: clamp(2.2rem, 8vw, 4.8rem);
    line-height: 1.1;
    text-transform: none;
    color: #fff4fb;
    letter-spacing: 0.01em;
    text-shadow:
      0 0 3px rgba(255, 255, 255, 0.95),
      0 0 8px rgba(255, 255, 255, 0.9),
      0 0 14px rgba(245, 135, 190, 0.95),
      0 0 24px rgba(245, 135, 190, 0.92),
      0 0 40px rgba(245, 135, 190, 0.85),
      0 0 65px rgba(245, 135, 190, 0.75),
      0 0 95px rgba(245, 135, 190, 0.65);
    animation: neonGlow 1.8s ease-in-out infinite alternate;
  }

  @keyframes neonGlow {
    from {
      opacity: 0.95;
      text-shadow:
        0 0 2px rgba(255, 255, 255, 0.95),
        0 0 6px rgba(255, 255, 255, 0.9),
        0 0 12px rgba(245, 135, 190, 0.92),
        0 0 22px rgba(245, 135, 190, 0.88),
        0 0 36px rgba(245, 135, 190, 0.8),
        0 0 56px rgba(245, 135, 190, 0.72),
        0 0 82px rgba(245, 135, 190, 0.6);
    }
    to {
      opacity: 1;
      text-shadow:
        0 0 4px rgba(255, 255, 255, 1),
        0 0 10px rgba(255, 255, 255, 0.95),
        0 0 18px rgba(245, 135, 190, 1),
        0 0 30px rgba(245, 135, 190, 0.96),
        0 0 48px rgba(245, 135, 190, 0.9),
        0 0 75px rgba(245, 135, 190, 0.82),
        0 0 110px rgba(245, 135, 190, 0.72);
    }
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(25px);
    border-radius: 2.5rem;
    border: 1px solid rgba(255, 255, 255, 0.15);
    margin-bottom: 2rem;
  }

  .btn-pink {
    background: #F587BE;
    color: white;
    transition: all 0.2s ease;
    box-shadow: 0 4px 15px rgba(245, 135, 190, 0.3);
    font-family: 'Oswald', sans-serif !important;
    font-weight: 500;
  }

  .btn-pink:active {
    transform: scale(0.95);
  }

  input::placeholder,
  textarea::placeholder {
    color: rgba(255, 255, 255, 0.75);
    font-family: 'Oswald', sans-serif !important;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .input-style-dark::placeholder {
    color: rgba(0, 0, 0, 0.55);
    font-family: 'Oswald', sans-serif !important;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  @media (max-width: 640px) {
    .cover-title-neon {
      font-size: 2.1rem;
      line-height: 1.15;
    }
  }

  .dedicatoria-text {
  color: #ffffff;
  font-family: 'Oswald', sans-serif !important;
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0.02em;
}

.con-amor-text {
  font-family: 'Pacifico', cursive !important;
  font-size: 1.2rem;
  line-height: 1.7;
  text-transform: none;
  letter-spacing: 0.02em;
}
`}</style>
    </div>
  );
}