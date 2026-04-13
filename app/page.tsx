"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    image:
      "https://i.pinimg.com/1200x/da/91/0b/da910b0f6c710366c73c7a449dcfb17f.jpg",
    alt: "Novia editorial",
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/736x/e4/4b/ca/e44bcaa99e49d2f7c26b309620549c1b.jpg",
    alt: "Sesión de boda",
  },
  {
    id: 3,
    image:
      "https://i.pinimg.com/736x/9d/74/19/9d74193e5f836944495af87a260e203d.jpg",
    alt: "Sesión en exterior",
  },
  {
    id: 4,
    image:
      "https://i.pinimg.com/736x/b3/2b/b3/b32bb378642d7db14178ebe74f2644f8.jpg",
    alt: "Retrato editorial",
  },
];

const planes = [
  {
    id: 1,
    nombre: "Basic",
    imagen:
      "https://i.pinimg.com/736x/b9/79/83/b97983433a17dd40ed26c91d844def10.jpg",
    detalles: [
      "5 fotos impresas tamaño 15x20cm",
      "Cubrimiento del evento en formato digital (Aprox 200 fotos)",
      "USB con el material del evento",
      "Protocolo, decoración, recepción, maquillaje, hora loca",
    ],
    precio: "$1.500.000",
    whatsapp:
      "https://wa.me/573000000000?text=Hola%20Miles%20Visual,%20quiero%20cotizar%20el%20plan%20Basic",
  },
  {
    id: 2,
    nombre: "Clasic",
    imagen:
      "https://i.pinimg.com/736x/d3/28/56/d32856afbc9b2d989a58c207fbc13e15.jpg",
    detalles: [
      "10 fotos impresas tamaño 15x20cm",
      "Photobook de 30x30cm (5 hojas con 30 fotos plasmadas)",
      "Cubrimiento del evento en formato digital (Aprox 300 fotos)",
      "USB con material del evento",
      "Decoración, recepción, maquillaje, hora loca",
    ],
    precio: "$1.850.000",
    whatsapp:
      "https://wa.me/573000000000?text=Hola%20Miles%20Visual,%20quiero%20cotizar%20el%20plan%20Clasic",
  },
  {
    id: 3,
    nombre: "Premium",
    imagen:
      "https://i.pinimg.com/1200x/95/27/3c/95273c7af4a9cc0cfb73ab9f45d03fd0.jpg",
    detalles: [
      "15 fotos impresas tamaño 15x20cm",
      "Photobook de 30x30cm (10 hojas con 70 fotos plasmadas)",
      "Cubrimiento del evento en formato digital (Aprox 400 fotos)",
      "USB con material del evento",
      "Decoración, recepción, maquillaje, hora loca",
    ],
    precio: "$2.400.000",
    whatsapp:
      "https://i.pinimg.com/1200x/e5/da/bd/e5dabd0a8fafbdd3b1453772160e2139.jpg",
  },
  {
    id: 4,
    nombre: "Diamante",
    imagen:
      "https://i.pinimg.com/736x/2b/b5/7d/2bb57dd049225a223aa3100be0b9d977.jpg",
    detalles: [
      "Pre boda",
      "20 fotos impresas tamaño 15x20cm",
      "Photobook 30x30 (15 hojas con 90 fotos plasmadas)",
      "Cubrimiento del evento en formato digital",
      "USB con todo el material del evento",
      "Video clip",
    ],
    precio: "$2.850.000",
    whatsapp:
      "https://wa.me/573000000000?text=Hola%20Miles%20Visual,%20quiero%20cotizar%20el%20plan%20Diamante",
  },
  {
    id: 5,
    nombre: "Gold",
    imagen:
      "https://i.pinimg.com/736x/7d/17/7e/7d177ef98e5ab73b8024941f7db9e4f1.jpg",
    detalles: [
      "Pre boda",
      "15 fotos impresas tamaño 15x20cm",
      "Photobook 15x20 (5 hojas con 30 fotos plasmadas)",
      "Photobook 30x30 (18 hojas con 100 fotos plasmadas)",
      "USB con todo el material del evento",
      "Tomas de dron",
      "Video de tus sueños",
    ],
    precio: "$3.600.000",
    whatsapp:
      "https://wa.me/573000000000?text=Hola%20Miles%20Visual,%20quiero%20cotizar%20el%20plan%20Gold",
  },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [currentPlan, setCurrentPlan] = useState(0);

  const logoSrc = "/LOGO MILES AMARILLO_Mesa de trabajo 1.png";
  const bannerVideoSrc = "/Sesión fotográfica Pre Boda, sesión en exteriores [1].MP4";
  const bannerPoster =
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80";

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  };

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  const goToNextPlan = () => {
    setCurrentPlan((prev) => (prev + 1) % planes.length);
  };

  const goToPrevPlan = () => {
    setCurrentPlan((prev) => (prev - 1 + planes.length) % planes.length);
  };

  const goToPlan = (index: number) => {
    setCurrentPlan(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;

    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrev();
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f5f2] text-[#1f1c1a]">
      {/* HEADER SOLO LOGO GRANDE CENTRADO */}
      <header className="mx-auto flex w-full max-w-[1180px] items-center justify-center px-4 py-6 sm:px-5 sm:py-8 md:px-8 md:py-10">
        <Link href="/" className="flex items-center justify-center">
          <img
            src={logoSrc}
            alt="Miles Visual"
            className="h-[90px] w-auto max-w-[85vw] object-contain sm:h-[120px] md:h-[160px]"
          />
        </Link>
      </header>

      {/* VIDEO BANNER */}
      <section className="mx-auto w-full max-w-[1180px] px-4 pt-2 sm:px-5 md:px-8 md:pt-4">
        <div className="relative overflow-hidden rounded-none bg-black sm:rounded-sm">
          <div className="relative h-[62vh] min-h-[420px] max-h-[860px] sm:h-[70vh] md:h-[82vh]">
            <video
              className="h-full w-full object-cover"
              src={bannerVideoSrc}
              poster={bannerPoster}
              autoPlay
              muted
              loop
              playsInline
            />

            <div className="absolute inset-0 bg-black/35" />

            <div className="absolute inset-0 flex items-end">
              <div className="w-full px-5 pb-8 text-white sm:px-6 sm:pb-10 md:max-w-[620px] md:px-12 md:pb-12">
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/70 sm:text-[11px] sm:tracking-[0.34em]">
                  Fotografía y audiovisual
                </p>

                <h1 className="mt-3 font-serif text-[30px] leading-[0.95] sm:text-[38px] md:mt-4 md:text-[68px]">
                  Historias que se
                  <br />
                  sienten en foto
                  <br />y en video
                </h1>

                <p className="mt-4 max-w-[520px] text-[13px] leading-6 text-white/80 sm:text-sm sm:leading-7 md:mt-5 md:text-[15px]">
                  Una propuesta visual elegante y cinematográfica para parejas,
                  marcas y memorias que merecen verse con emoción, detalle y
                  belleza real.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-4">
                  <Link
                    href="/contacto"
                    className="inline-flex items-center justify-center gap-2 bg-white px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-neutral-900 transition hover:opacity-90 sm:px-6 sm:text-[11px] sm:tracking-[0.24em]"
                  >
                    <Play className="h-4 w-4" />
                    Ver propuesta
                  </Link>

                  <a
                    href="https://wa.me/573000000000?text=Hola%20Miles%20Visual,%20quiero%20cotizar%20foto%20y%20video"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center border border-white/40 px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-black sm:px-6 sm:text-[11px] sm:tracking-[0.24em]"
                  >
                    Cotizar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARRUSEL DE FOTOS */}
      <section className="mx-auto w-full max-w-[1180px] px-4 pt-4 sm:px-5 sm:pt-5 md:px-8 md:pt-8">
        <div
          className="relative overflow-hidden bg-[#ece8e1]"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative h-[42vh] min-h-[280px] max-h-[620px] sm:h-[50vh] md:h-[60vh] lg:h-[64vh]">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === current
                    ? "z-10 opacity-100"
                    : "pointer-events-none z-0 opacity-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 bg-black/5" />

          <button
            onClick={goToPrev}
            aria-label="Slide anterior"
            className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/35 sm:left-3 sm:h-10 sm:w-10 md:left-5 md:h-12 md:w-12"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          <button
            onClick={goToNext}
            aria-label="Siguiente slide"
            className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/35 sm:right-3 sm:h-10 sm:w-10 md:right-5 md:h-12 md:w-12"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-4 md:bottom-6">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Ir al slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  current === index
                    ? "w-8 bg-white"
                    : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FRASE CENTRAL */}
      <section className="mx-auto max-w-[1180px] px-4 py-10 sm:px-5 md:px-8 md:py-20">
        <div className="mx-auto max-w-[680px] text-center">
          <p className="font-serif text-[24px] italic leading-[1.45] text-neutral-800 sm:text-[30px] md:text-[44px]">
            La foto perfecta,
            <br />
            es aquella que capta momentos inolvidables,
            <br />
            esos que solo suceden una sola vez.
          </p>

          <p className="mx-auto mt-5 max-w-[560px] text-[13px] leading-7 text-neutral-600 sm:text-sm md:mt-6 md:text-[15px]">
            Cada imagen está pensada para capturar la atmósfera, la emoción y la
            esencia de una historia real con una estética limpia, honesta y
            atemporal.
          </p>
        </div>
      </section>

      {/* ABOUT DARK */}
      <section className="bg-[#042510] py-14 sm:py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-5 md:px-8">
          <div className="grid items-center gap-8 md:grid-cols-[0.8fr_1.1fr_0.7fr] md:gap-10">
            <div className="text-white">
              <img
                src={logoSrc}
                alt="Miles Visual"
                className="h-[52px] w-auto object-contain md:h-[78px]"
              />

              <p className="mt-6 max-w-[280px] text-[13px] leading-7 text-white/70 sm:text-sm">
                Mi nombre es Miles Esteban Morales Andrade, fotógrafo y productor
                audiovisual de bodas colombiano, establecido en la ciudad de
                Villavicencio, amante y apasionado por este arte que es la
                fotografía.
                <br />
                Nos dedicamos a plasmar recuerdos con calidad y creatividad para
                toda la vida. Somos un equipo capacitado y enfocado en brindar
                una experiencia única y diferente.
              </p>

              <Link
                href="/acercademi"
                className="mt-8 inline-flex border border-white/30 px-6 py-3 text-[10px] uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-black sm:text-[11px] sm:tracking-[0.24em]"
              >
                Acerca de mi
              </Link>
            </div>

            <div className="relative h-[380px] overflow-hidden sm:h-[420px] md:h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1400&q=80"
                alt="Fotógrafa"
                className="h-full w-full object-cover grayscale"
              />
            </div>

            <div className="text-white">
              <div className="relative h-[220px] overflow-hidden sm:h-[240px] md:h-[280px]">
                <img
                  src="https://i.pinimg.com/1200x/e0/a1/31/e0a1319a4d121b1092ea4a8909ee0d64.jpg"
                  alt="Retrato editorial"
                  className="h-full w-full object-cover grayscale"
                />
              </div>

              <p className="mt-4 max-w-[220px] text-[13px] leading-7 text-white/70 sm:text-sm">
                Una mirada natural, editorial y sensible para crear imágenes con
                identidad propia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BODAS */}
      <section className="mx-auto max-w-[1180px] px-4 py-14 sm:px-5 md:px-8 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <div className="max-w-[420px]">
            <p className="text-[13px] italic tracking-[0.02em] text-neutral-600">
              capturamos momentos
            </p>

            <h2 className="mt-3 font-serif text-[38px] leading-none sm:text-[46px] md:text-[62px]">
              BODAS
            </h2>

            <p className="mt-6 text-[13px] leading-8 text-neutral-700 sm:text-sm md:text-[15px]">
              Cobertura visual para parejas que quieren recordar su día con
              emoción, delicadeza y una narrativa estética que permanezca con el
              tiempo.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/bodas"
                className="inline-flex justify-center border border-neutral-500 px-6 py-3 text-[10px] uppercase tracking-[0.22em] text-neutral-800 transition hover:bg-neutral-900 hover:text-white sm:text-[11px] sm:tracking-[0.24em]"
              >
                Ver galeria de Bodas
              </Link>

              <a
                href="https://wa.me/573000000000?text=Hola%20Miles%20Visual,%20quiero%20cotizar%20mi%20boda"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center bg-[#042510] px-6 py-3 text-[10px] uppercase tracking-[0.22em] text-white transition hover:opacity-90 sm:text-[11px] sm:tracking-[0.24em]"
              >
                Cotizar boda
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="h-[420px] w-full max-w-[340px] overflow-hidden sm:h-[460px] md:h-[540px]">
              <img
                src="https://i.pinimg.com/736x/d2/1d/fa/d21dfadec8c43260e22b20c4d0c01675.jpg"
                alt="Sesión de bodas"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRE-BODAS */}
      <section className="mx-auto max-w-[1180px] px-4 py-14 sm:px-5 md:px-8 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2 md:[&>*:first-child]:order-2 md:gap-12">
          <div className="max-w-[420px]">
            <p className="text-[13px] italic tracking-[0.02em] text-neutral-600">
              Momentos autenticos
            </p>

            <h2 className="mt-3 font-serif text-[38px] leading-none sm:text-[46px] md:text-[62px]">
              PRE-BODAS
            </h2>

            <p className="mt-6 text-[13px] leading-8 text-neutral-700 sm:text-sm md:text-[15px]">
              Pareja, familia o retrato personal. Sesiones íntimas y naturales
              para retratar la esencia con una dirección visual sobria y
              elegante.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/prebodas"
                className="inline-flex justify-center border border-neutral-500 px-6 py-3 text-[10px] uppercase tracking-[0.22em] text-neutral-800 transition hover:bg-neutral-900 hover:text-white sm:text-[11px] sm:tracking-[0.24em]"
              >
                Ver galeria Pre-bodas
              </Link>

              <a
                href="https://wa.me/573000000000?text=Hola%20Miles%20Visual,%20quiero%20cotizar%20una%20preboda"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center bg-[#042510] px-6 py-3 text-[10px] uppercase tracking-[0.22em] text-white transition hover:opacity-90 sm:text-[11px] sm:tracking-[0.24em]"
              >
                Cotizar preboda
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="h-[420px] w-full max-w-[340px] overflow-hidden sm:h-[460px] md:h-[540px]">
              <img
                src="https://i.pinimg.com/1200x/27/aa/85/27aa858375f9b77c92dc8ed22e4699a7.jpg"
                alt="Shootings"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOTO ESTUDIO */}
      <section className="mx-auto max-w-[1180px] px-4 py-14 sm:px-5 md:px-8 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <div className="max-w-[420px]">
            <p className="text-[13px] italic tracking-[0.02em] text-neutral-600">
              Editorial Creativa
            </p>

            <h2 className="mt-3 font-serif text-[38px] leading-none sm:text-[46px] md:text-[62px]">
              FOTO ESTUDIO
            </h2>

            <p className="mt-6 text-[13px] leading-8 text-neutral-700 sm:text-sm md:text-[15px]">
              Imágenes limpias y refinadas para retratos personales, sesiones
              artísticas o contenido visual con una composición minimalista y
              una luz suave.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="/estudio"
                className="inline-flex justify-center border border-neutral-500 px-6 py-3 text-[10px] uppercase tracking-[0.22em] text-neutral-800 transition hover:bg-neutral-900 hover:text-white sm:text-[11px] sm:tracking-[0.24em]"
              >
                Ver galeria Foto estudio
              </Link>

              <a
                href="https://wa.me/573000000000?text=Hola%20Miles%20Visual,%20quiero%20cotizar%20una%20sesion%20de%20foto%20estudio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center bg-[#042510] px-6 py-3 text-[10px] uppercase tracking-[0.22em] text-white transition hover:opacity-90 sm:text-[11px] sm:tracking-[0.24em]"
              >
                Cotizar estudio
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="h-[420px] w-full max-w-[340px] overflow-hidden sm:h-[460px] md:h-[540px]">
              <img
                src="https://i.pinimg.com/736x/0e/74/e1/0e74e1c2359ecc58ae37b7c405abd0d5.jpg"
                alt="Studio Days"
                className="h-full w-full object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section className="mx-auto max-w-[1180px] px-4 py-14 sm:px-5 md:px-8 md:py-24">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-[11px] uppercase tracking-[0.24em] text-neutral-500 sm:text-[12px] sm:tracking-[0.28em]">
            paquetes disponibles
          </p>
          <h2 className="mt-4 font-serif text-[32px] leading-none sm:text-[38px] md:text-[58px]">
            PLANES DE BODA
          </h2>
          <p className="mx-auto mt-6 max-w-[620px] text-[13px] leading-8 text-neutral-600 sm:text-sm">
            Elige el plan que mejor se adapte a tu historia. Puedes deslizar o
            usar los botones para ver los 5 paquetes disponibles.
          </p>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white/70 shadow-sm sm:mt-12 sm:rounded-[2rem]">
          <div className="grid md:grid-cols-2">
            <div className="relative h-[320px] sm:h-[360px] md:h-[620px]">
              <img
                src={planes[currentPlan].imagen}
                alt={planes[currentPlan].nombre}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center px-5 py-8 sm:px-6 sm:py-10 md:px-12">
              <h3 className="text-center font-serif text-[34px] leading-none sm:text-[40px] md:text-[64px]">
                {planes[currentPlan].nombre}
              </h3>

              <div className="mx-auto mt-7 max-w-[420px] space-y-3 text-center text-[14px] leading-7 text-neutral-700 sm:mt-8 sm:space-y-4 sm:text-[15px]">
                {planes[currentPlan].detalles.map((detalle, index) => (
                  <p key={index}>{detalle}</p>
                ))}
              </div>

              <div className="mt-8 text-center sm:mt-10">
                <p className="font-serif text-[26px] italic text-neutral-700 sm:text-[30px]">
                  Valor
                </p>
                <p className="mt-2 text-[28px] font-medium text-neutral-900 sm:text-[30px] md:text-[42px]">
                  {planes[currentPlan].precio}
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
                <a
                  href={planes[currentPlan].whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full justify-center bg-[#042510] px-8 py-3 text-[10px] uppercase tracking-[0.22em] text-white transition hover:opacity-90 sm:w-auto sm:text-[11px] sm:tracking-[0.24em]"
                >
                  Cotizar este plan
                </a>

                <Link
                  href="/contacto"
                  className="inline-flex w-full justify-center border border-neutral-500 px-8 py-3 text-[10px] uppercase tracking-[0.22em] text-neutral-800 transition hover:bg-neutral-900 hover:text-white sm:w-auto sm:text-[11px] sm:tracking-[0.24em]"
                >
                  Más información
                </Link>
              </div>
            </div>
          </div>

          <button
            onClick={goToPrevPlan}
            aria-label="Plan anterior"
            className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/40 sm:left-3 sm:h-10 sm:w-10 md:left-5 md:h-12 md:w-12"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          <button
            onClick={goToNextPlan}
            aria-label="Siguiente plan"
            className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/40 sm:right-3 sm:h-10 sm:w-10 md:right-5 md:h-12 md:w-12"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-4 md:bottom-6">
            {planes.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPlan(index)}
                aria-label={`Ir al plan ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentPlan === index
                    ? "w-8 bg-white"
                    : "w-2.5 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-[#042510] py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-5 md:px-8">
          <div className="grid items-center gap-8 md:grid-cols-[340px_1fr] md:gap-10">
            <div className="h-[320px] overflow-hidden sm:h-[360px] md:h-[430px]">
              <img
                src="https://i.pinimg.com/1200x/ae/8c/61/ae8c6124ec8e06911d82c07f143940df.jpg"
                alt="Pareja testimonial"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="text-white">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/50 sm:text-[11px] sm:tracking-[0.28em]">
                Love Stories
              </p>

              <blockquote className="mt-5 max-w-[680px] font-serif text-[24px] italic leading-[1.35] sm:text-[28px] md:text-[42px]">
                “Supimos inmediatamente después de nuestra primera reunión que
                tenías que ser nuestro fotógrafo de bodas..”
              </blockquote>

              <p className="mt-7 max-w-[700px] text-[13px] leading-8 text-white/70 sm:mt-8 sm:text-sm">
                Cada imagen refleja calma, elegancia y emoción real. El
                resultado no solo es hermoso visualmente, también se siente
                auténtico y profundamente nuestro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[900px] px-4 py-16 text-center sm:px-5 sm:py-20 md:px-8 md:py-24">
        <p className="font-serif text-[24px] uppercase tracking-[0.05em] text-neutral-900 sm:text-[28px] md:text-[34px]">
          Tus momentos en imágenes
        </p>

        <p className="mx-auto mt-6 max-w-[620px] text-[13px] leading-8 text-neutral-600 sm:text-sm">
          Si buscas una estética elegante, natural y atemporal para contar tu
          historia, estaré encantado de acompañarte y crear imágenes con emoción
          y belleza real.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <Link
            href="/contacto"
            className="inline-flex w-full justify-center bg-[#042510] px-8 py-3 text-[10px] uppercase tracking-[0.22em] text-white transition hover:opacity-90 sm:w-auto sm:text-[11px] sm:tracking-[0.24em]"
          >
            Consultas
          </Link>

          <a
            href="https://wa.me/573000000000?text=Hola%20Miles%20Visual,%20quiero%20una%20cotizacion"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full justify-center border border-neutral-500 px-8 py-3 text-[10px] uppercase tracking-[0.22em] text-neutral-800 transition hover:bg-neutral-900 hover:text-white sm:w-auto sm:text-[11px] sm:tracking-[0.24em]"
          >
            Cotizar ahora
          </a>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="mx-auto max-w-[1180px] px-4 pb-14 sm:px-5 sm:pb-16 md:px-8">
        <div className="flex flex-col items-center gap-8">
          <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-500 sm:text-[11px] sm:tracking-[0.28em]">
            @MILESVISUAL
          </p>

          <div className="grid w-full max-w-[520px] grid-cols-3 gap-2 sm:gap-3">
            <div className="aspect-[1/1.15] overflow-hidden">
              <img
                src="https://i.pinimg.com/736x/f8/0e/4c/f80e4cab67957b5ebef436c1f0e7b82d.jpg"
                alt="Instagram 1"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-[1/1.15] overflow-hidden">
              <img
                src="https://i.pinimg.com/736x/70/eb/f6/70ebf6d0a9aef32ad61104b306b0deb3.jpg"
                alt="Instagram 2"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-[1/1.15] overflow-hidden">
              <img
                src="https://i.pinimg.com/736x/85/87/8f/85878f51753ff09ca3f915cced285f8b.jpg"
                alt="Instagram 3"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#232120] text-white">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-4 py-10 sm:px-5 md:px-8 lg:flex-row lg:items-center lg:justify-between">
          <nav className="flex flex-wrap justify-center gap-5 text-[11px] uppercase tracking-[0.16em] text-white/70 sm:gap-6 sm:text-[12px] sm:tracking-[0.18em] lg:justify-start">
            <Link href="/">Inicio</Link>
            <Link href="/bodas">Bodas</Link>
            <Link href="/prebodas">Pre-bodas</Link>
            <Link href="/estudio">Foto estudio</Link>
            <Link href="/contacto">Contacto</Link>
          </nav>

          <p className="text-center text-xs text-white/45">
            © 2026 MILES VISUAL
          </p>
        </div>
      </footer>
    </main>
  );
}