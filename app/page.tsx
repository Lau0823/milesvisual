"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

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

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  };

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
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

  const navLinksLeft = [
    { href: "/bodas", label: "Bodas" },
    { href: "/prebodas", label: "Pre-Bodas" },
    { href: "/estudio", label: "Foto Estudio" },
  ];

  const navLinksRight = [
    { href: "/acercademi", label: "Acerca de mi" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <main className="min-h-screen bg-[#f7f5f2] text-[#1f1c1a]">
      {/* NAVBAR */}
      <header className="relative mx-auto flex w-full max-w-[1180px] items-center justify-between px-5 py-8 md:px-8">
        <nav className="hidden gap-8 md:flex">
          {navLinksLeft.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12px] tracking-[0.18em] text-neutral-700 transition hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="text-center">
          <p className="font-serif text-[32px] leading-[0.95] tracking-[0.08em] md:text-[42px]">
            MILES
            <br />
            VISUAL
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.34em] text-neutral-500">
            Fotografía
          </p>
        </Link>

        <nav className="hidden gap-8 md:flex">
          {navLinksRight.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12px] tracking-[0.18em] text-neutral-700 transition hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menú"
          className="flex h-10 w-10 items-center justify-center text-neutral-800 md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* MOBILE MENU */}
        <div
          className={`fixed inset-0 z-50 transition ${
            menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />

          <div
            className={`absolute right-0 top-0 flex h-full w-[82%] max-w-[360px] flex-col bg-[#f7f5f2] p-6 shadow-2xl transition-transform duration-300 ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-serif text-[26px] leading-[0.95] tracking-[0.08em]">
                  MILES
                  <br />
                  VISUAL
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.34em] text-neutral-500">
                  Fotografía
                </p>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
                className="flex h-10 w-10 items-center justify-center text-neutral-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-12 flex flex-col gap-5">
              {[...navLinksLeft, ...navLinksRight].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-neutral-200 pb-4 text-[13px] uppercase tracking-[0.22em] text-neutral-800"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* HERO CARRUSEL */}
      <section className="mx-auto w-full max-w-[1180px] px-5 pt-4 md:px-8 md:pt-6">
        <div
          className="relative overflow-hidden bg-[#ece8e1]"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative h-[58vh] min-h-[420px] max-h-[760px] sm:h-[62vh] md:h-[72vh] lg:h-[78vh]">
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
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/35 md:left-5 md:h-12 md:w-12"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          <button
            onClick={goToNext}
            aria-label="Siguiente slide"
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/35 md:right-5 md:h-12 md:w-12"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 md:bottom-6">
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
      <section className="mx-auto max-w-[1180px] px-5 py-8 md:px-8 md:py-20">
        <div className="mx-auto max-w-[680px] text-center">
          <p className="font-serif text-[30px] italic leading-[1.45] text-neutral-800 md:text-[44px]">
            La foto  perfecta,
            <br />
            es aquella que capta momentos inolvidables,
            <br />
            esos que solo suceden una sola vez .
          </p>

          <p className="mx-auto mt-6 max-w-[560px] text-sm leading-7 text-neutral-600 md:text-[15px]">
            Cada imagen está pensada para capturar la atmósfera, la emoción y la
            esencia de una historia real con una estética limpia, honesta y
            atemporal.
          </p>
        </div>
      </section>

      {/* ABOUT DARK */}
      <section className="bg-[#232120] py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8">
          <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1.1fr_0.7fr]">
            <div className="text-white">
              <p className="font-serif text-[32px] leading-[1.1] md:text-[42px]">
                MILES
                <br />
                VISUAL
              </p>

              <p className="mt-6 max-w-[240px] text-sm leading-7 text-white/70">
                Mi nombre es miles esteban Morales andrade fotografo y productor audio visual de 
                bodas colombiano, establecido en la ciudad de Villavicencio, amante y apasionado
                por este arte que es la fotografía. 
                <br />
                Nos dedicamos a plasmaar recuerdos con calidad y creatividad para toda la vida. somos un equipo
                capacitado y enfocado en brindar una experencia unica y diferente. 
              </p>

              <Link
                href="/acercademi"
                className="mt-8 inline-flex border border-white/30 px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-white transition hover:bg-white hover:text-black"
              >
                Acerca de mi 
              </Link>
            </div>

            <div className="relative h-[420px] overflow-hidden md:h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1400&q=80"
                alt="Fotógrafa"
                className="h-full w-full object-cover grayscale"
              />
            </div>

            <div className="text-white">
              <div className="relative h-[240px] overflow-hidden md:h-[280px]">
                <img
                  src="https://i.pinimg.com/1200x/e0/a1/31/e0a1319a4d121b1092ea4a8909ee0d64.jpg"
                  alt="Retrato editorial"
                  className="h-full w-full object-cover grayscale"
                />
              </div>

              <p className="mt-4 max-w-[220px] text-sm leading-7 text-white/70">
                Una mirada natural, editorial y sensible para crear imágenes con
                identidad propia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BODAS */}
      <section className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="max-w-[420px]">
            <p className="text-[13px] italic tracking-[0.02em] text-neutral-600">
              capturamos momentos
            </p>

            <h2 className="mt-3 font-serif text-[46px] leading-none md:text-[62px]">
              BODAS
            </h2>

            <p className="mt-6 text-sm leading-8 text-neutral-700 md:text-[15px]">
              Cobertura visual para parejas que quieren recordar su día con
              emoción, delicadeza y una narrativa estética que permanezca con el
              tiempo.
            </p>

            <Link
              href="/bodas"
              className="mt-8 inline-flex border border-neutral-500 px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-neutral-800 transition hover:bg-neutral-900 hover:text-white"
            >
              Ver galeria de Bodas
            </Link>
          </div>

          <div className="flex justify-center">
            <div className="h-[460px] w-full max-w-[340px] overflow-hidden md:h-[540px]">
              <img
                src="https://i.pinimg.com/736x/d2/1d/fa/d21dfadec8c43260e22b20c4d0c01675.jpg"
                alt="Sesión de bodas"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SHOOTINGS */}
      <section className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2 md:[&>*:first-child]:order-2">
          <div className="max-w-[420px]">
            <p className="text-[13px] italic tracking-[0.02em] text-neutral-600">
              Momentos autenticos
            </p>

            <h2 className="mt-3 font-serif text-[46px] leading-none md:text-[62px]">
              PRE-BODAS
            </h2>

            <p className="mt-6 text-sm leading-8 text-neutral-700 md:text-[15px]">
             Pareja, familia o retrato personal. Sesiones íntimas y
              naturales para retratar la esencia con una dirección visual sobria
              y elegante.
            </p>

            <Link
              href="/prebodas"
              className="mt-8 inline-flex border border-neutral-500 px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-neutral-800 transition hover:bg-neutral-900 hover:text-white"
            >
              Ver galeria Pre-bodas
            </Link>
          </div>

          <div className="flex justify-center">
            <div className="h-[460px] w-full max-w-[340px] overflow-hidden md:h-[540px]">
              <img
                src="https://i.pinimg.com/1200x/27/aa/85/27aa858375f9b77c92dc8ed22e4699a7.jpg"
                alt="Shootings"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STUDIO DAYS */}
      <section className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="max-w-[420px]">
            <p className="text-[13px] italic tracking-[0.02em] text-neutral-600">
              Editorial Creativa
            </p>

            <h2 className="mt-3 font-serif text-[46px] leading-none md:text-[62px]">
              FOTO ESTUDIO
            </h2>

            <p className="mt-6 text-sm leading-8 text-neutral-700 md:text-[15px]">
              Imágenes limpias y refinadas para retratos personales, sesiones
              artísticas o contenido visual con una composición minimalista y
              una luz suave.
            </p>

            <Link
              href="/estudio"
              className="mt-8 inline-flex border border-neutral-500 px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-neutral-800 transition hover:bg-neutral-900 hover:text-white"
            >
              ver galeria Foto estudio
            </Link>
          </div>

          <div className="flex justify-center">
            <div className="h-[460px] w-full max-w-[340px] overflow-hidden md:h-[540px]">
              <img
                src="https://i.pinimg.com/736x/0e/74/e1/0e74e1c2359ecc58ae37b7c405abd0d5.jpg"
                alt="Studio Days"
                className="h-full w-full object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-[#232120] py-16 md:py-20">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8">
          <div className="grid items-center gap-10 md:grid-cols-[340px_1fr]">
            <div className="h-[360px] overflow-hidden md:h-[430px]">
              <img
                src="https://i.pinimg.com/1200x/ae/8c/61/ae8c6124ec8e06911d82c07f143940df.jpg"
                alt="Pareja testimonial"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="text-white">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/50">
                Love Stories
              </p>

              <blockquote className="mt-5 max-w-[680px] font-serif text-[28px] italic leading-[1.35] md:text-[42px]">
                “Supimos inmediatamente después de nuestra primera reunión

que tenías que ser nuestro fotógrafo de bodas..”
              </blockquote>

              <p className="mt-8 max-w-[700px] text-sm leading-8 text-white/70">
                Cada imagen refleja calma, elegancia y emoción real. El
                resultado no solo es hermoso visualmente, también se siente
                auténtico y profundamente nuestro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[900px] px-5 py-20 text-center md:px-8 md:py-24">
        <p className="font-serif text-[28px] uppercase tracking-[0.06em] text-neutral-900 md:text-[34px]">
          Tus momentos en imágenes
        </p>

        <p className="mx-auto mt-6 max-w-[620px] text-sm leading-8 text-neutral-600">
          Si buscas una estética elegante, natural y atemporal para contar tu
          historia, estaré encantado de acompañarte y crear imágenes con emoción
          y belleza real.
        </p>

        <Link
          href="/contacto"
          className="mt-8 inline-flex bg-[#2a2725] px-8 py-3 text-[11px] uppercase tracking-[0.24em] text-white transition hover:opacity-90"
        >
      
Consultas  
        </Link>
      </section>

      {/* INSTAGRAM */}
      <section className="mx-auto max-w-[1180px] px-5 pb-16 md:px-8">
        <div className="flex flex-col items-center gap-8">
          <p className="text-[11px] uppercase tracking-[0.28em] text-neutral-500">
            @MILESVISUAL
          </p>

          <div className="grid w-full max-w-[520px] grid-cols-3 gap-3">
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
        <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-5 py-10 md:px-8 lg:flex-row lg:items-center lg:justify-between">
          <nav className="flex flex-wrap gap-6 text-[12px] uppercase tracking-[0.18em] text-white/70">
            <Link href="/">Inicio</Link>
            <Link href="/bodas">Bodas</Link>
            <Link href="/prebodas">Pre-bodas</Link>
            <Link href="/estudio">Foto estudio</Link>
            <Link href="/contacto">Contacto</Link>
          </nav>

          <p className="text-xs text-white/45">
            © 2026 MILES VISUAL 
          </p>
        </div>
      </footer>
    </main>
  );
}