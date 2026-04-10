"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Music, MapPin, Phone, Play,
  Gift, Camera, Sparkles, HelpCircle,
  Heart, Flower2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DATA = {
  names: { first: "VIOLETA", second: "GUTIERREZ VALLEJO" },
  year: 2026,
  whatsappNumber: "573125433541",
  fullDate: "Sábado, 2 de mayo, 2026",
  eventDate: "2026-05-02T19:00:00",
  location: "JR CASA DE EVENTOS, KM5 Vía Restrepo vereda la popaya",
  bannerImages: [
    'https://i.pinimg.com/1200x/6c/03/29/6c0329355b84a5149742e19c6af7dcfd.jpg',
    'https://i.pinimg.com/736x/d4/36/ea/d436ea07e97fa7c122c8232f822fc19c.jpg',
    'https://i.pinimg.com/736x/11/30/80/1130802fbd7ea08ede704dda2593e971.jpg',
  ],
  camilaPhotos: [
    'https://i.pinimg.com/1200x/6c/03/29/6c0329355b84a5149742e19c6af7dcfd.jpg',
    'https://i.pinimg.com/736x/d4/36/ea/d436ea07e97fa7c122c8232f822fc19c.jpg',
    'https://i.pinimg.com/736x/11/30/80/1130802fbd7ea08ede704dda2593e971.jpg',
  ],
  dressCodePhotos: [
    'https://i.pinimg.com/1200x/7a/cb/74/7acb74a70cbe107abd77b6b702d052ec.jpg',
    'https://i.pinimg.com/736x/d0/c9/f1/d0c9f144aaebf47db4f1cf39aebf7adc.jpg',
    'https://i.pinimg.com/736x/c3/31/aa/c331aa228e2d0d7a1515ff39d41b1eda.jpg',
    'https://i.pinimg.com/736x/07/52/19/07521996aba5ad6734e593ac87e5741c.jpg',
    'https://i.pinimg.com/1200x/c4/28/cb/c428cbfb0e03334c2615a644c8fc41d5.jpg',
  ],
  timelinePhotos: [
    { past: 'https://i.pinimg.com/736x/16/d6/52/16d652439537e05b26fdaed859ff8708.jpg', now: 'https://i.pinimg.com/736x/5d/20/04/5d2004c22cfd6a54c0165a7d2ea7a6d2.jpg' },
    { past: 'https://i.pinimg.com/736x/fd/74/ac/fd74ac5bdbc14ba0c03d39ad6cc736ab.jpg', now: 'https://i.pinimg.com/736x/64/3d/2f/643d2f47880985dabe65ebb5875200da.jpg' },
    { past: 'https://i.pinimg.com/1200x/9b/51/07/9b51074f25bdbea1de5b7bbf4314c2c5.jpg', now: 'https://i.pinimg.com/736x/b0/ce/f0/b0cef0dff5b4bbb6bf666ae4ea22dceb.jpg' },
    { past: 'https://i.pinimg.com/736x/f3/9c/0c/f39c0c346367b5cb8d176ba369375994.jpg', now: 'https://i.pinimg.com/736x/b6/05/4b/b6054b46a52cb00c6f85576c19e0a02f.jpg' },
  ],
  itinerary: [
    { time: "7:00 PM", event: "Recepción de Invitados", icon: <Flower2 size={20} /> },
    { time: "8:30 PM", event: "Entrada Triunfal", icon: <Sparkles size={20} /> },
    { time: "9:00 PM", event: "El Vals de los Sueños", icon: <Heart size={20} /> },
    { time: "10:00 PM", event: "Cena de Gala", icon: <Flower2 size={20} /> },
    { time: "11:30 PM", event: "Party Time & Sorpresas", icon: <Music size={20} /> },
  ],
  giftBrands: [
    { name: 'PANDORA', url: 'https://www.pandora.net/' },
    { name: 'O BOTICARIO', url: 'https://www.oboticario.com/' },
    { name: 'ZARA', url: 'https://www.zara.com/' }
  ],
  trivia: [
    { question: "¿Cuál es el destino soñado de Camila?", options: ["París", "Tokio", "Nueva York"], correct: 0 },
    { question: "¿Cuál es el color favorito de Camila?", options: ["Azul Cielo", "Rosa Pastel", "Lila"], correct: 1 },
    { question: "¿Qué postre prefiere Camila?", options: ["Helado", "Brownie con helado", "Cheesecake"], correct: 2 }
  ]
};

const FlipCard = ({ photoPair }: { photoPair: { past: string; now: string } }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="h-[320px] md:h-[450px] [perspective:1000px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-full w-full rounded-2xl md:rounded-[3rem] shadow-xl [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 rounded-2xl md:rounded-[3rem] overflow-hidden border-4 md:border-8 border-white [backface-visibility:hidden]">
          <Image src={photoPair.past} fill className="object-cover" alt="Past" />
          <div className="absolute bottom-4 inset-x-0 text-center">
            <span className="bg-white/90 px-3 py-1 rounded-full text-[10px] font-black text-pink-400 uppercase">
              Toca para girar
            </span>
          </div>
        </div>

        <div className="absolute inset-0 h-full w-full rounded-2xl md:rounded-[3rem] bg-pink-100 [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden border-4 md:border-pink-200">
          <Image src={photoPair.now} fill className="object-cover" alt="Now" />
        </div>
      </motion.div>
    </div>
  );
};

export default function InvitacionCamilaVIP() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const [guestName, setGuestName] = useState("");
  const [songLink, setSongLink] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [triviaStatus, setTriviaStatus] = useState<null | 'correct' | 'wrong'>(null);
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date(DATA.eventDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;
      if (difference > 0) {
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference / (1000 * 60 * 60)) % 24),
          m: Math.floor((difference / 1000 / 60) % 60),
          s: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => setCurrentImg((prev) => (prev + 1) % DATA.bannerImages.length), 4000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current) audioRef.current.play().catch(() => {});
  };

  const checkTrivia = (index: number) => {
    if (index === DATA.trivia[currentQuestion].correct) {
      setTriviaStatus('correct');
      setTimeout(() => {
        if (currentQuestion < DATA.trivia.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setTriviaStatus(null);
        }
      }, 1500);
    } else {
      setTriviaStatus('wrong');
      setTimeout(() => setTriviaStatus(null), 1000);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FFF9FB] text-pink-400 font-sans overflow-x-hidden w-full">
      <audio ref={audioRef} src="/audio/Bad Bunny - Enséñame a Bailar.MP3" loop />

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[url('/violeta.jpeg')] bg-cover bg-center"
          >
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 text-center w-full max-sm:max-w-xs">
              <Sparkles className="text-pink-300 mx-auto mb-4 animate-pulse" size={32} />

              <h2 className="caveat-title mb-3">
                Violeta
              </h2>

              <p className="text-white/85 text-sm tracking-[0.35em] uppercase mb-6">
                Mis XV
              </p>

              <button
                onClick={handleOpen}
                className="w-full bg-gradient-to-r from-[#CA0AD8] via-[#ED1D69] to-[#F8A807] text-white px-8 py-5 rounded-full font-black flex items-center justify-center gap-4 shadow-xl active:scale-95 transition-transform uppercase tracking-widest"
              >
                <Play size={18} fill="white" /> ABRIR INVITACIÓN
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
          {/* BANNER CON CUENTA REGRESIVA */}
          <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
              >
                <Image src={DATA.bannerImages[currentImg]} fill className="object-cover" alt="Banner" priority />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FFF9FB]" />
              </motion.div>
            </AnimatePresence>

            <div className="relative z-10 text-center px-4 w-full flex flex-col items-center gap-6">
              <h1 className="text-6xl sm:text-8xl md:text-[11rem] font-black tracking-tighter italic leading-[0.85] text-white drop-shadow-2xl">
                {DATA.names.first}
                <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>
                  {DATA.names.second}
                </span>
              </h1>

              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 flex items-center gap-2">
                <MapPin size={16} className="text-white" />
                <span className="text-white font-black uppercase tracking-[0.2em] text-[10px] md:text-sm">
                  {DATA.location}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 md:gap-4 mt-4">
                {[
                  { label: 'Días', val: timeLeft.d },
                  { label: 'Hrs', val: timeLeft.h },
                  { label: 'Min', val: timeLeft.m },
                  { label: 'Seg', val: timeLeft.s }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/90 backdrop-blur-lg w-16 h-16 md:w-24 md:h-24 rounded-2xl flex flex-col items-center justify-center shadow-2xl"
                  >
                    <span className="text-xl md:text-3xl font-black text-pink-400">{item.val}</span>
                    <span className="text-[8px] font-black uppercase text-pink-200">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ITINERARIO */}
          <section className="py-20 bg-white px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <Flower2 className="mx-auto text-[#6d0675] mb-4" size={40} />
                <h3 className="text-4xl font-black italic uppercase tracking-tighter text-[#6d0675]">
                  Itinerario
                </h3>
                <p className="text-[#6d0675] font-bold uppercase text-xs tracking-widest mt-2">
                  Momentos inolvidables
                </p>
              </div>

              <div className="relative border-l-2 border-dashed border-[#6d0675] ml-4 md:mx-auto md:w-fit">
                {DATA.itinerary.map((item, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i}
                    className="mb-12 ml-8 relative group"
                  >
                    <div className="absolute -left-[45px] top-0 bg-white border-2 border-pink-200 p-2 rounded-full text-[#6d0675] group-hover:rotate-45 transition-transform">
                      {item.icon}
                    </div>
                    <div className="bg-pink-50/50 p-6 rounded-[2rem] border border-pink-50 hover:bg-pink-50 transition-colors">
                      <span className="block text-[#6d0675] font-black text-sm mb-1">{item.time}</span>
                      <h4 className="text-xl font-black text-[#6d0675] uppercase italic tracking-tight">
                        {item.event}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* GALERÍA */}
          <section className="py-16 bg-white px-4 md:px-6 text-[#6d0675]">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <Camera size={24} />
                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-[#6d0675]">
                  The Gallery
                </h3>
                <div className="h-px flex-1 bg-[#6d0675]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {DATA.camilaPhotos.map((img, i) => (
                  <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                    <Image src={img} fill className="object-cover" alt="VIOLETA" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* DRESS CODE */}
          <section className="py-16 md:py-32 overflow-hidden bg-white border-y border-pink-50">
            <div className="text-center max-w-3xl mx-auto px-6 mb-12">
              <h3 className="text-4xl md:text-5xl italic uppercase mb-6 text-[#6d0675]">
                Dress Code
              </h3>

              <p className="text-[#6d0675] md:text-lg italic mb-6">
                Mujeres: vestido largo, un solo tono
              </p>

              <div className="flex justify-center items-center gap-5 mb-4">
                <span className="color-dot bg-black"></span>
                <span className="color-dot bg-pink-300"></span>
                <span className="color-dot bg-purple-400"></span>
                <span className="color-dot bg-gray-300"></span>
              </div>

              <p className="text-sm tracking-widest uppercase mb-6 text-[#6d0675]">
                colores reservados
              </p>

              <p className="text-base md:text-lg text-[#B69DB0] italic mb-4">
                Negro, gama de rosados, gamas morados y plateado.
              </p>

              <p className="text-base md:text-lg text-[#B69DB0] italic mb-4">
                Hombres: pantalón negro, camisa negra manga larga
              </p>

              <p className="text-sm text-pink-400 tracking-wide">
                No usar tennis si tienes más de 15 años
              </p>
            </div>

            <div className="flex gap-6 animate-scroll">
              {[...DATA.dressCodePhotos, ...DATA.dressCodePhotos].map((img, i) => (
                <div
                  key={i}
                  className={`bg-white p-3 md:p-5 pb-10 shadow-2xl w-64 md:w-80 flex-shrink-0 border border-pink-50 transition-transform ${
                    i % 2 === 0 ? 'rotate-2' : '-rotate-2'
                  }`}
                >
                  <div className="aspect-[3/4] relative mb-4 overflow-hidden rounded-lg">
                    <Image src={img} fill className="object-cover" alt="Dress Style" />
                  </div>
                  <p className="font-sacramento text-3xl md:text-5xl text-center text-pink-400">
                    Style {(i % DATA.dressCodePhotos.length) + 1}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ESCENARIO */}
          <section className="py-16 px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center">
            <div className="w-full md:flex-1 aspect-square relative rounded-[2rem] overflow-hidden shadow-2xl border-[8px] border-white">
              <Image src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3" fill className="object-cover" alt="Lugar" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <MapPin size={40} className="mb-4 mx-auto md:mx-0 text-[#ed1d69]" />
              <h3 className="text-4xl font-black mb-4 italic uppercase text-[#ed1d69]">El Escenario</h3>
              <p className="text-xl font-bold text-black mb-8">{DATA.location}</p>
              <button
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DATA.location)}`, '_blank')}
                className="bg-[#f587be] text-white px-10 py-5 rounded-full font-black shadow-lg uppercase text-sm active:scale-95 transition-transform"
              >
                CÓMO LLEGAR
              </button>
            </div>
          </section>

          {/* PLAYLIST */}
          <section className="py-16 px-4">
            <div className="max-w-3xl mx-auto p-8 md:p-12 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-pink-200 shadow-xl">
              <Music className="mx-auto mb-6 text-pink-400 animate-pulse" size={40} />
              <h3 className="text-3xl font-black mb-4 italic uppercase tracking-tighter">
                Armar la Playlist
              </h3>
              <p className="text-pink-300 font-bold mb-8">
                ¿Qué canción no puede faltar en la fiesta?
              </p>

              <div className="grid gap-4">
                <input
                  value={songLink}
                  onChange={(e) => setSongLink(e.target.value)}
                  className="bg-[#f587be] border-none p-5 rounded-2xl outline-none font-black text-center text-pink-400 placeholder:text-white"
                  placeholder="DEJA AQUÍ EL LINK DE LA CANCIÓN"
                />
                <button
                  onClick={() => window.open(`https://wa.me/${DATA.whatsappNumber}?text=¡Hola! Sugiero esta canción: ${songLink}`)}
                  className="bg-pink-400 text-white font-black py-5 rounded-2xl text-lg shadow-lg uppercase active:scale-95 transition-transform"
                >
                  SUGERIR CANCIÓN
                </button>
              </div>
            </div>
          </section>

          {/* PAST & NOW */}
          <section className="py-16 px-4 max-w-6xl mx-auto">
            <h3 className="text-center text-3xl font-black mb-12 italic uppercase tracking-tighter">
              Past & Now
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {DATA.timelinePhotos.map((photoPair, i) => (
                <FlipCard key={i} photoPair={photoPair} />
              ))}
            </div>
          </section>

          {/* TRIVIA */}
          <section className="py-16 px-4 text-center max-w-2xl mx-auto">
            <HelpCircle className="mx-auto mb-4 text-pink-300" size={32} />
            <h3 className="text-2xl font-black mb-8 italic uppercase">
              ¿Cuánto sabes de mí? ({currentQuestion + 1}/3)
            </h3>

            <div className="bg-white p-6 md:p-10 border-2 border-pink-100 rounded-[2rem] shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div key={currentQuestion} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="font-black text-lg md:text-2xl mb-8 text-pink-400">
                    {DATA.trivia[currentQuestion].question}
                  </p>
                  <div className="grid gap-3">
                    {DATA.trivia[currentQuestion].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => checkTrivia(i)}
                        className={`p-4 rounded-2xl font-black transition-all border-2 ${
                          triviaStatus === 'correct' && i === DATA.trivia[currentQuestion].correct
                            ? 'bg-yellow-50 border-green-400 text-green-600'
                            : triviaStatus === 'wrong'
                            ? 'bg-red-50 border-red-200 text-red-600'
                            : 'bg-pink-50 border-pink-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          {/* LLUVIA DE SOBRES */}
          <section className="relative py-20 px-4 overflow-hidden bg-[#6d0675]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,181,253,0.18),transparent_30%),radial-gradient(circle_at_bottom,rgba(244,114,182,0.12),transparent_35%)]" />

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className={`envelope-mobile envelope-${(i % 6) + 1}`}
                  style={{ left: `${(i * 5.5) % 100}%` }}
                >
                  ✉️
                </span>
              ))}
            </div>

            <div className="relative z-10 max-w-md mx-auto">
              <div className="rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-md shadow-2xl px-6 py-10 text-center">
                <Gift className="mx-auto mb-5 text-violet-200" size={34} />

                <h3 className="text-3xl md:text-4xl italic uppercase tracking-wide text-violet-100 mb-4">
                  Lluvia de Sobres
                </h3>

                <div className="w-20 h-px mx-auto mb-5 bg-gradient-to-r from-transparent via-violet-200 to-transparent" />

                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  Tu presencia es mi mejor regalo, pero si deseas tener un detalle conmigo,
                  lo recibiré con mucho cariño.
                </p>
              </div>
            </div>
          </section>

          {/* FRASE FINAL */}
          <section className="py-20 px-6 bg-white text-center">
            <div className="max-w-3xl mx-auto">
              <Heart className="mx-auto text-pink-400 mb-6 animate-pulse" size={32} />
              <p className="text-2xl md:text-3xl font-sacramento text-pink-400 mb-4">
                "Hoy celebramos la vida de nuestra hija, y nada nos haría más felices que compartir este sueño contigo."
              </p>
              <h5 className="font-black text-pink-300 uppercase tracking-[0.3em] text-xs mb-12">
                - Con amor, Papá y Mamá
              </h5>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.open(`https://wa.me/${DATA.whatsappNumber}?text=Hola Papá de Camila, tengo una duda sobre la fiesta...`, '_blank')}
                  className="flex-1 bg-white border-2 border-pink-200 text-pink-400 px-8 py-5 rounded-[2rem] font-black uppercase text-xs flex items-center justify-center gap-3 hover:bg-pink-50 transition-colors shadow-lg"
                >
                  <Phone size={16} /> LLAMAR A PAPÁ
                </button>

                <button
                  onClick={() => window.open(`https://wa.me/${DATA.whatsappNumber}?text=Hola Mamá de Camila, tengo una duda sobre la fiesta...`, '_blank')}
                  className="flex-1 bg-white border-2 border-pink-200 text-pink-400 px-8 py-5 rounded-[2rem] font-black uppercase text-xs flex items-center justify-center gap-3 hover:bg-pink-50 transition-colors shadow-lg"
                >
                  <Phone size={16} /> LLAMAR A MAMÁ
                </button>
              </div>
            </div>
          </section>

          {/* RSVP */}
          <section className="py-16 px-4 bg-[#FFF9FB]">
            <div className="max-w-3xl mx-auto p-8 md:p-12 text-center bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-pink-200 shadow-xl">
              <h2 className="text-3xl font-black mb-8 italic uppercase tracking-tighter">
                Reservar Ticket
              </h2>
              <div className="grid gap-4">
                <input
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="bg-[#ca0ad8] border-none p-5 rounded-2xl outline-none font-black text-center text-pink-400 placeholder:text-white"
                  placeholder="ESCRIBE TU NOMBRE"
                />
                <button
                  onClick={() => window.open(`https://wa.me/${DATA.whatsappNumber}?text=¡Hola! Confirmo mi asistencia para ${guestName}`)}
                  className="bg-pink-400 text-white font-black py-6 rounded-2xl text-lg shadow-lg uppercase tracking-widest active:scale-95 transition-transform"
                >
                  CONFIRMAR ASISTENCIA
                </button>
              </div>
            </div>
          </section>

          <footer className="py-16 bg-white text-center border-t border-pink-50">
            <div className="w-24 h-24 bg-pink-50 rounded-3xl mx-auto flex items-center justify-center border-2 border-dashed border-pink-200 mb-8 rotate-12">
              <span className="text-pink-300 font-black text-[10px] uppercase tracking-widest">
                VIOLETA XV
              </span>
            </div>
            <p className="font-black text-[10px] tracking-[1em] uppercase opacity-30">
              Violeta Gutierrez Vallejo • 2026
            </p>
          </footer>
        </motion.main>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;800&family=Sacramento&family=Caveat:wght@400;600;700&display=swap');

        .font-sacramento { font-family: 'Sacramento', cursive; }

        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #FFF9FB;
          margin: 0;
        }

        .caveat-title {
          font-family: 'Caveat', cursive;
          font-size: 4rem;
          line-height: 1;
          color: #ff8ae7;
          letter-spacing: 0.03em;
          text-shadow:
            0 0 6px #ff8ae7,
            0 0 15px #ff8ae7,
            0 0 30px #CA0AD8,
            0 0 50px #ED1D69;
        }

        @media (min-width: 768px) {
          .caveat-title {
            font-size: 6rem;
          }
        }

        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 25s linear infinite;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .color-dot {
          width: 22px;
          height: 22px;
          border-radius: 9999px;
          display: inline-block;
          animation: discoGlow 2.5s ease-in-out infinite alternate;
        }

        .color-dot:nth-child(1) { animation-delay: 0s; }
        .color-dot:nth-child(2) { animation-delay: 0.4s; }
        .color-dot:nth-child(3) { animation-delay: 0.8s; }
        .color-dot:nth-child(4) { animation-delay: 1.2s; }

        @keyframes discoGlow {
          0% {
            transform: scale(1);
            box-shadow: 0 0 5px rgba(255,255,255,0.2);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.2);
            box-shadow:
              0 0 10px rgba(255,255,255,0.6),
              0 0 20px rgba(255,105,180,0.6),
              0 0 30px rgba(168,85,247,0.6);
            opacity: 1;
          }
        }

        .envelope-mobile {
          position: absolute;
          top: -12%;
          font-size: 22px;
          opacity: 0.8;
          filter: drop-shadow(0 0 10px rgba(255,255,255,0.18));
          animation-name: fallMobile;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .envelope-1 { animation-duration: 7s; animation-delay: 0s; }
        .envelope-2 { animation-duration: 8s; animation-delay: 1s; }
        .envelope-3 { animation-duration: 6.5s; animation-delay: 2s; }
        .envelope-4 { animation-duration: 9s; animation-delay: 0.5s; }
        .envelope-5 { animation-duration: 7.5s; animation-delay: 1.5s; }
        .envelope-6 { animation-duration: 8.5s; animation-delay: 2.5s; }

        @keyframes fallMobile {
          0% {
            transform: translateY(-10%) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.85;
          }
          50% {
            transform: translateY(50vh) translateX(10px) rotate(12deg);
            opacity: 0.9;
          }
          100% {
            transform: translateY(110vh) translateX(-12px) rotate(-10deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}