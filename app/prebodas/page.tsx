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

const prebodasGallery = [
  {
    id: 1,
    title: "Conexión auténtica",
    image:
      "/prebodas/WhatsApp Image 2026-04-08 at 5.01.08 PM.jpeg",
    description:
      "Sesiones pensadas para retratar la complicidad real de la pareja con una atmósfera íntima y elegante.",
  },
  {
    id: 2,
    title: "Preludio visual",
    image:  
      "/prebodas/WhatsApp Image 2026-04-08 at 5.01.09 PM (1).jpeg",
    description:
      "Un lenguaje visual más editorial para contar el antes del gran día desde una estética más sensible y cinematográfica.",
  },
  {
    id: 3,
    title: "Luz y movimiento",
    image:
      "/prebodas/WhatsApp Image 2026-04-08 at 5.01.09 PM (2).jpeg",
    description:
      "La dirección de luz, la postura y el movimiento construyen imágenes espontáneas pero visualmente refinadas.",
  },
  {
    id: 4,
    title: "Paisaje emocional",
    image:
      "/prebodas/WhatsApp Image 2026-04-08 at 5.01.09 PM (3).jpeg",
    description:
      "Integramos locación y emoción para que el entorno también sea parte de la historia visual.",
  },

  {
    id: 6,
    title: "Recuerdo previo",
    image:
      "/prebodas/WhatsApp Image 2026-04-08 at 5.01.10 PM (2).jpeg",
    description:
      "Una sesión previa que no solo documenta, sino que construye una memoria poderosa antes de la boda.",
  },
    {
    id: 7,
    title: "Recuerdo previo",
    image:
      "/prebodas/WhatsApp Image 2026-04-08 at 5.01.11 PM (1).jpeg",
    description:
      "Una sesión previa que no solo documenta, sino que construye una memoria poderosa antes de la boda.",
  },
    {
    id: 8,
    title: "Recuerdo previo",
    image:
      "/prebodas/WhatsApp Image 2026-04-08 at 5.01.11 PM (2).jpeg",
    description:
      "Una sesión previa que no solo documenta, sino que construye una memoria poderosa antes de la boda.",
  },
    {
    id: 10,
    title: "Recuerdo previo",
    image:
      "/prebodas/WhatsApp Image 2026-04-08 at 5.01.12 PM (1).jpeg",
    description:
      "Una sesión previa que no solo documenta, sino que construye una memoria poderosa antes de la boda.",
  },
    {
    id: 11,
    title: "Recuerdo previo",
    image:
      "/prebodas/WhatsApp Image 2026-04-08 at 5.01.12 PM.jpeg",
    description:
      "Una sesión previa que no solo documenta, sino que construye una memoria poderosa antes de la boda.",
  },
    {
    id: 12,
    title: "Recuerdo previo",
    image:
      "/prebodas/WhatsApp Image 2026-04-08 at 5.01.13 PM.jpeg",
    description:
      "Una sesión previa que no solo documenta, sino que construye una memoria poderosa antes de la boda.",
  },
    {
    id: 13,
    title: "Recuerdo previo",
    image:
      "/prebodas/WhatsApp Image 2026-04-08 at 5.01.14 PM (1).jpeg",
    description:
      "Una sesión previa que no solo documenta, sino que construye una memoria poderosa antes de la boda.",
  },
    {
    id: 14,
    title: "Recuerdo previo",
    image:
      "/prebodas/WhatsApp Image 2026-04-08 at 5.01.14 PM (2).jpeg",
    description:
      "Una sesión previa que no solo documenta, sino que construye una memoria poderosa antes de la boda.",
  },
    {
    id: 15,
    title: "Recuerdo previo",
    image:
      "/prebodas/WhatsApp Image 2026-04-08 at 5.01.14 PM.jpeg",
    description:
      "Una sesión previa que no solo documenta, sino que construye una memoria poderosa antes de la boda.",
  },
     {
    id: 16,
    title: "Recuerdo previo",
    image:
      "/prebodas/WhatsApp Image 2026-04-08 at 5.01.15 PM (1).jpeg",
    description:
      "Una sesión previa que no solo documenta, sino que construye una memoria poderosa antes de la boda.",
  },
    {
    id: 17,
    title: "Recuerdo previo",
    image:
      "/prebodas/WhatsApp Image 2026-04-08 at 5.01.15 PM.jpeg",
    description:
      "Una sesión previa que no solo documenta, sino que construye una memoria poderosa antes de la boda.",
  },
   
 
];

const plans = [
  {
    id: 1,
    name: "Basic",
    subtitle: "Fotografía",
    price: "$1.500.000",
    image: prebodasGallery[0].image,
    items: [
      "5 fotos impresas tamaño 15x20 cm",
      "Cubrimiento del evento en formato digital (aprox. 200 fotos)",
      "USB con el material del evento",
      "Protocolo, decoración, recepción, maquillaje y hora loca",
    ],
  },
  {
    id: 2,
    name: "Clasic",
    subtitle: "Fotografía",
    price: "$1.850.000",
    image: prebodasGallery[1].image,
    items: [
      "10 fotos impresas tamaño 15x20 cm",
      "Photobook 30x30 cm",
      "Cubrimiento en formato digital",
      "USB con material del evento",
      "Decoración, recepción, maquillaje y hora loca",
    ],
  },
  {
    id: 3,
    name: "Premium",
    subtitle: "Fotografía",
    price: "$2.400.000",
    image: prebodasGallery[2].image,
    items: [
      "15 fotos impresas tamaño 15x20 cm",
      "Photobook 30x30 cm premium",
      "Más de 400 fotografías editadas",
      "USB con el material completo",
    ],
  },
  {
    id: 4,
    name: "Diamante",
    subtitle: "Foto + Video",
    price: "$2.850.000",
    image: prebodasGallery[3].image,
    items: [
      "Pre boda",
      "20 fotos impresas tamaño 15x20 cm",
      "Photobook premium",
      "Cubrimiento digital",
      "USB con material completo",
      "Video clip",
    ],
  },
  {
    id: 5,
    name: "Gold",
    subtitle: "Experiencia completa",
    price: "$3.600.000",
    image: prebodasGallery[4].image,
    items: [
      "Pre boda",
      "15 fotos impresas",
      "Photobook 15x20 y 30x30",
      "USB con todo el material",
      "Tomas de dron",
      "Video principal",
    ],
  },
];

export default function PrebodasPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState(1);

  const logoSrc = "/LOGO MILES AMARILLO_Mesa de trabajo 1.png";
  const heroVideoSrc = "/VIDEO 5.mp4";

  const navLeft = [
    { href: "/bodas", label: "Bodas" },
    { href: "/prebodas", label: "Pre-Bodas" },
    { href: "/estudio", label: "Foto Estudios" },
  ];

  const navRight = [
    { href: "/contacto", label: "Contacto" },
    { href: "/#planes", label: "Planes" },
    { href: "/acercami", label: "Acerca de mí" },
  ];

  const activePlan = useMemo(
    () => plans.find((plan) => plan.id === selectedPlan) ?? plans[0],
    [selectedPlan]
  );

  const activePhoto =
    selectedPhoto !== null ? prebodasGallery[selectedPhoto] : null;

  const prevPhoto = () => {
    if (selectedPhoto === null) return;
    setSelectedPhoto(
      (selectedPhoto - 1 + prebodasGallery.length) % prebodasGallery.length
    );
  };

  const nextPhoto = () => {
    if (selectedPhoto === null) return;
    setSelectedPhoto((selectedPhoto + 1) % prebodasGallery.length);
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,20,0.10)_0%,rgba(7,16,20,0.18)_30%,rgba(7,16,20,0.40)_100%)]" />

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
              Portafolio
            </p>
            <h1 className="mt-3 max-w-[760px] text-[36px] font-semibold uppercase leading-[0.94] tracking-[0.03em] text-white md:text-[76px]">
              PRE-BODAS
            </h1>
          </div>
        </div>
      </section>

      {/* FRASE */}
      <section className="mx-auto max-w-[1180px] px-4 py-16 text-center md:px-8 md:py-24">
        <p className="mv-script text-[54px] leading-none text-[var(--mv-gold)] md:text-[92px]">
          Conexión auténtica
        </p>
        <h2 className="mt-3 text-[30px] font-semibold uppercase tracking-[0.03em] md:text-[54px]">
          ANTES DEL GRAN DÍA TAMBIÉN EXISTE UNA HISTORIA QUE MERECE SER CONTADA
        </h2>
      </section>

      {/* GRILLA 1 x 6 */}
      <section className="space-y-0">
        {prebodasGallery.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => setSelectedPhoto(index)}
            className="group relative block min-h-screen w-full overflow-hidden text-left"
          >
            <img
              src={photo.image}
              alt={photo.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,19,20,0.10)_0%,rgba(17,19,20,0.20)_35%,rgba(17,19,20,0.52)_100%)]" />

            <div className="relative z-10 flex min-h-screen items-end">
              <div className="mx-auto w-full max-w-[1320px] px-4 pb-14 md:px-8 md:pb-16">
                <p className="mv-script text-[68px] leading-none text-white/18 md:text-[140px]">
                  pre-bodas
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
                  pre-bodas
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
            EXPERIENCIAS DISPONIBLES
          </h2>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-5">
          {plans.map((plan) => (
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
                <Link href="/prebodas" className="mv-button-outline-dark">
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