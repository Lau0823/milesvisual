"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

const estudioGallery = [

   {
    id: 11,
    title: "Editorial clean",
    image:
      "/estudio/DSC00984.jpg.jpeg",
    description:
      "Una propuesta visual limpia, con dirección de pose, luz precisa y una atmósfera sofisticada para retratos de alto impacto.",
  },
   {
    id: 12,
    title: "Editorial clean",
    image:
      "/estudio/DSC09548.jpg (1).jpeg",
    description:
      "Una propuesta visual limpia, con dirección de pose, luz precisa y una atmósfera sofisticada para retratos de alto impacto.",
  },
   {
    id: 13,
    title: "Editorial clean",
    image:
      "/estudio/WhatsApp Image 2026-04-13 at 12.24.20 PM (2).jpeg",
    description:
      "Una propuesta visual limpia, con dirección de pose, luz precisa y una atmósfera sofisticada para retratos de alto impacto.",
  },
  {
    id: 1,
    title: "Editorial clean",
    image:
      "/estudio/WhatsApp Image 2026-04-13 at 12.24.20 PM (2).jpeg",
    description:
      "Una propuesta visual limpia, con dirección de pose, luz precisa y una atmósfera sofisticada para retratos de alto impacto.",
  },
  {
    id: 2,
    title: "Fashion portrait",
    image:
      "/estudio/WhatsApp Image 2026-04-13 at 12.24.20 PM (3).jpeg",
    description:
      "Retratos con fuerza visual, pensados para marcas personales, modelos, influencers y perfiles con una identidad editorial.",
  },
  {
    id: 3,
    title: "Studio mood",
    image:
      "/estudio/WhatsApp Image 2026-04-13 at 12.24.21 PM (4).jpeg",
    description:
      "La iluminación y la composición crean una escena con textura, intención y una sensación visual mucho más artística.",
  },
  {
    id: 4,
    title: "Persona y marca",
    image:
      "/estudio/WhatsApp Image 2026-04-13 at 12.24.24 PM.jpeg",
    description:
      "Imágenes que construyen presencia digital, elegancia y un lenguaje visual propio para tu marca personal.",
  },
  {
    id: 5,
    title: "Influencer session",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=80",
    description:
      "Contenido con intención estética para redes, campañas, branding personal o piezas visuales con acabado premium.",
  },
  {
    id: 6,
    title: "Fine art portrait",
    image:
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=1800&q=80",
    description:
      "Una mezcla de retrato, moda y dirección visual para crear imágenes con una presencia mucho más artística y memorable.",
  },
];

const estudioPlans = [
  {
    id: 1,
    name: "Editorial",
    subtitle: "Foto estudio",
    price: "$850.000",
    image: estudioGallery[0].image,
    items: [
      "Sesión en estudio con dirección visual",
      "Selección de fotos editadas en alta calidad",
      "Concepto estético definido",
      "Entrega digital curada",
    ],
  },
  {
    id: 2,
    name: "Portrait",
    subtitle: "Branding personal",
    price: "$1.100.000",
    image: estudioGallery[1].image,
    items: [
      "Retratos editoriales",
      "Imágenes para redes y perfil profesional",
      "Dirección de pose",
      "Entrega digital premium",
    ],
  },
  {
    id: 3,
    name: "Influencer",
    subtitle: "Contenido visual",
    price: "$1.400.000",
    image: estudioGallery[2].image,
    items: [
      "Sesión para contenido de marca personal",
      "Variedad de encuadres y estilos",
      "Selección final curada",
      "Entrega optimizada para digital",
    ],
  },
];

export default function EstudioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState(1);

  const logoSrc = "/milesvisual/public/LOGO MILES AMARILLO_Mesa de trabajo 1.png";
  const heroVideoSrc = "/VIDEO 5.mp4";

  const navLeft = [
    { href: "/bodas", label: "Bodas" },
    { href: "/prebodas", label: "Pre-Bodas" },
    { href: "/estudio", label: "Foto Estudios" },
  ];

  const navRight = [
    { href: "/contacto", label: "Contacto" },
    { href: "/#planes", label: "Planes" },
    { href: "/acercademi", label: "Acerca de mí" },
  ];

  const activePlan = useMemo(
    () => estudioPlans.find((plan) => plan.id === selectedPlan) ?? estudioPlans[0],
    [selectedPlan]
  );

  const activePhoto =
    selectedPhoto !== null ? estudioGallery[selectedPhoto] : null;

  const prevPhoto = () => {
    if (selectedPhoto === null) return;
    setSelectedPhoto(
      (selectedPhoto - 1 + estudioGallery.length) % estudioGallery.length
    );
  };

  const nextPhoto = () => {
    if (selectedPhoto === null) return;
    setSelectedPhoto((selectedPhoto + 1) % estudioGallery.length);
  };

  return (
    <main className="bg-[var(--mv-cream)] text-[var(--mv-ink)]">
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden bg-black">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,14,0.10)_0%,rgba(5,10,14,0.18)_28%,rgba(5,10,14,0.52)_100%)]" />

        <header className="relative z-30 mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 py-6 md:px-8 md:py-8">
          <nav className="hidden items-center gap-8 xl:flex">
            {navLeft.map((item) => (
              <Link key={item.href} href={item.href} className="mv-nav-link-light">
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/" className="absolute left-1/2 top-6 z-30 -translate-x-1/2">
            <img
              src={logoSrc}
              alt="Miles Visual"
              className="h-[120px] w-auto max-w-[82vw] object-contain sm:h-[150px] md:h-[190px] lg:h-[220px]"
            />
          </Link>

          <nav className="hidden items-center gap-8 xl:flex">
            {navRight.map((item) => (
              <Link key={item.href} href={item.href} className="mv-nav-link-light">
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className="ml-auto flex h-10 w-10 items-center justify-center text-white xl:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div
            className={`fixed inset-0 z-50 transition ${
              menuOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setMenuOpen(false)} />
            <div
              className={`absolute right-0 top-0 flex h-full w-[86%] max-w-[360px] flex-col bg-[var(--mv-cream)] p-6 transition-transform duration-300 ${
                menuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between">
                <img src={logoSrc} alt="Miles Visual" className="h-[60px] w-auto object-contain" />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center"
                  aria-label="Cerrar menú"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="mt-12 flex flex-col gap-5">
                {[...navLeft, ...navRight].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="border-b border-black/10 pb-4 text-[13px] uppercase tracking-[0.12em] text-[var(--mv-ink)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </header>

        <div className="relative z-20 flex min-h-screen items-end">
          <div className="mx-auto w-full max-w-[1320px] px-4 pb-14 md:px-8 md:pb-16">
            <p className="text-[12px] uppercase tracking-[0.16em] text-white/78 md:text-[14px]">
              Portafolio artístico
            </p>
            <h1 className="mt-3 max-w-[860px] text-[36px] font-semibold uppercase leading-[0.94] tracking-[0.03em] text-white md:text-[72px]">
              FOTO ESTUDIO / EDITORIAL / BRANDING PERSONAL
            </h1>
          </div>
        </div>
      </section>

      {/* FRASE */}
      <section className="mx-auto max-w-[1180px] px-4 py-16 text-center md:px-8 md:py-24">
        <p className="mv-script text-[58px] leading-none text-[var(--mv-gold)] md:text-[98px]">
          artistic portraits
        </p>
        <h2 className="mt-3 text-[30px] font-semibold uppercase tracking-[0.03em] md:text-[52px]">
          UNA PÁGINA MÁS EDITORIAL, MÁS FASHION Y MÁS CREATIVA
        </h2>
      </section>

      {/* GRILLA */}
      <section className="space-y-0">
        {estudioGallery.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => setSelectedPhoto(index)}
            className="group relative block min-h-screen w-full overflow-hidden text-left"
          >
            <img
              src={photo.image}
              alt={photo.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,12,0.08)_0%,rgba(10,10,12,0.20)_32%,rgba(10,10,12,0.58)_100%)]" />

            <div className="relative z-10 flex min-h-screen items-end">
              <div className="mx-auto w-full max-w-[1320px] px-4 pb-14 md:px-8 md:pb-16">
                <p className="mv-script text-[72px] leading-none text-white/15 md:text-[150px]">
                  studio
                </p>
                <h3 className="mt-2 text-[30px] font-semibold uppercase tracking-[0.03em] text-white md:text-[52px]">
                  {photo.title}
                </h3>
                <p className="mt-4 max-w-[560px] text-[14px] leading-7 text-white/84 md:text-[17px] md:leading-8">
                  Toca para abrir esta imagen y ver su descripción.
                </p>
              </div>
            </div>
          </button>
        ))}
      </section>

      {/* MODAL */}
      {activePhoto && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm">
          <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="grid w-full max-w-[1200px] overflow-hidden rounded-[28px] bg-white md:grid-cols-[1fr_0.9fr]">
              <div className="relative min-h-[360px]">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-center px-6 py-8 md:px-10">
                <p className="mv-script text-[44px] leading-none text-[#789894] md:text-[68px]">
                  editorial
                </p>
                <h3 className="mt-2 text-[28px] font-semibold uppercase tracking-[0.03em] md:text-[42px]">
                  {activePhoto.title}
                </h3>
                <p className="mt-6 text-[15px] leading-8 text-[var(--mv-ink)]/78 md:text-[17px] md:leading-9">
                  {activePhoto.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PLANES */}
      <section className="mx-auto max-w-[1280px] px-4 py-20 md:px-8 md:py-28">
        <div className="mb-12 text-center">
          <p className="mv-script text-[44px] leading-none text-[var(--mv-gold)] md:text-[72px]">
            planes
          </p>
          <h2 className="text-[32px] font-semibold uppercase tracking-[0.03em] md:text-[58px]">
            EXPERIENCIAS DE ESTUDIO
          </h2>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          {estudioPlans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`rounded-[18px] px-4 py-4 text-center text-[12px] font-medium uppercase tracking-[0.12em] transition ${
                selectedPlan === plan.id
                  ? "bg-[#789894] text-white shadow-lg"
                  : "bg-white text-[var(--mv-ink)] shadow-sm"
              }`}
            >
              {plan.name}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-[30px] bg-white shadow-[0_22px_60px_rgba(0,0,0,0.08)]">
          <div className="grid md:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[360px] md:min-h-[680px]">
              <img
                src={activePlan.image}
                alt={activePlan.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="px-6 py-8 md:px-10 md:py-10">
              <p className="mv-script text-[44px] leading-none text-[#789894] md:text-[68px]">
                {activePlan.name}
              </p>
              <p className="mt-2 text-[13px] uppercase tracking-[0.12em] text-[var(--mv-ink)]/55">
                {activePlan.subtitle}
              </p>

              <ul className="mt-7 space-y-3">
                {activePlan.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-[10px] h-[5px] w-[5px] rounded-full bg-[#789894]" />
                    <span className="text-[15px] leading-7 text-[var(--mv-ink)]/82 md:text-[17px] md:leading-8">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-4">
                <span className="h-px flex-1 bg-black/10" />
                <p className="text-[22px] font-medium uppercase tracking-[0.06em] md:text-[28px]">
                  {activePlan.price}
                </p>
                <span className="h-px flex-1 bg-black/10" />
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://wa.me/573000000000?text=Hola%20Miles%20Visual,%20quiero%20cotizar%20este%20plan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mv-button-dark"
                >
                  Cotizar
                </a>
                <Link href="/estudio" className="mv-button-outline-dark">
                  Ver galería
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/8 bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-8">
          <nav className="flex flex-wrap gap-5">
            <Link href="/" className="mv-nav-link">
              Inicio
            </Link>
            <Link href="/bodas" className="mv-nav-link">
              Bodas
            </Link>
            <Link href="/prebodas" className="mv-nav-link">
              Pre-Bodas
            </Link>
            <Link href="/estudio" className="mv-nav-link">
              Foto Estudios
            </Link>
            <Link href="/contacto" className="mv-nav-link">
              Contacto
            </Link>
          </nav>

          <p className="text-[12px] uppercase tracking-[0.12em] text-black/45">
            © 2026 Miles Visual
          </p>
        </div>
      </footer>

      <a
        href="https://wa.me/573148112717?text=Hola%20Miles%20Visual"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-[120] flex h-14 w-14 items-center justify-center rounded-full bg-[#789894] text-white shadow-xl transition hover:scale-105"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </main>
  );
}