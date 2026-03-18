"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { useEffect, useState } from "react";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

const sans = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

type NavItem = {
  label: string;
  href: string;
};

type HeroSlide = {
  id: number;
  image: string;
  alt: string;
};

type WeddingSlide = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

type PlanItem = {
  id: string;
  name: string;
  image: string;
  price: string;
  details: string[];
};

const navLeft: NavItem[] = [
  { label: "Bodas", href: "#bodas" },
  { label: "Shootings", href: "#shootings" },
  { label: "Planes", href: "#planes" },
];

const navRight: NavItem[] = [
  { label: "Acerca de mí", href: "#about" },
  { label: "Contacto", href: "#contacto" },
];

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image:
      "https://i.pinimg.com/1200x/0a/3b/40/0a3b40b36d43b8b40106dbfc418def4b.jpg",
    alt: "Fotografía de boda cinematográfica",
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/1200x/57/06/ee/5706ee451c6c989fb4b4e38ccb7158da.jpg",
    alt: "Retrato romántico de pareja",
  },
  {
    id: 3,
    image:
      "https://i.pinimg.com/736x/e4/4b/ca/e44bcaa99e49d2f7c26b309620549c1b.jpg",
    alt: "Sesión editorial premium",
  },
  {
    id: 4,
    image:
      "https://i.pinimg.com/1200x/f2/0b/7f/f20b7f979cd5f1576c168686047669de.jpg",
    alt: "Pareja en celebración de boda",
  },
];

const weddingSlides: WeddingSlide[] = [
  {
    id: "w1",
    title: "Ceremonias con emoción real",
    subtitle:
      "Instantes irrepetibles contados con elegancia, atmósfera y una dirección visual que se siente cinematográfica.",
    image:
      "https://i.pinimg.com/736x/09/b4/8d/09b48d276d783c11c961fb384e5b1d4f.jpg",
  },
  {
    id: "w2",
    title: "Luz, piel y atmósfera",
    subtitle:
      "Una narrativa íntima para parejas que quieren recuerdos sofisticados, sensibles y profundamente memorables.",
    image:
      "https://i.pinimg.com/1200x/8a/50/36/8a5036a75979b4439ad62be98f12d377.jpg",
  },
  {
    id: "w3",
    title: "Celebraciones inolvidables",
    subtitle:
      "Cobertura viva, elegante y emocional para convertir cada momento en una memoria visual atemporal.",
    image:
      "https://i.pinimg.com/1200x/03/62/58/036258347b231e1e3eceaa4e23d1d388.jpg",
  },
];

const shootingSlides: HeroSlide[] = [
  {
    id: 1,
    image:
      "https://i.pinimg.com/1200x/cc/3a/a0/cc3aa061c6d0f064cb616f423038571a.jpg",
    alt: "Retrato editorial femenino",
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/736x/38/54/ff/3854ff04381c73298b30ef3bc513fa6c.jpg",
    alt: "Marca personal premium",
  },
  {
    id: 3,
    image:
      "https://i.pinimg.com/736x/20/29/c7/2029c71e79952ace3ccb6d08e2489c31.jpg",
    alt: "Shooting de moda editorial",
  },
  {
    id: 4,
    image:
      "https://i.pinimg.com/1200x/95/27/3c/95273c7af4a9cc0cfb73ab9f45d03fd0.jpg",
    alt: "Retrato masculino elegante",
  },
];

const plans: PlanItem[] = [
  {
    id: "basic",
    name: "Basic",
    image:
      "https://i.pinimg.com/1200x/6d/a7/46/6da746c1826067d9e724d3c72d0a4db1.jpg",
    price: "$1.500.000",
    details: [
      "5 fotos impresas tamaño 15x20 cm",
      "Cubrimiento del evento en formato digital",
      "Aprox. 200 fotos",
      "USB con el material del evento",
      "Protocolo, decoración, recepción, maquillaje y hora loca",
    ],
  },
  {
    id: "classic",
    name: "Classic",
    image:
      "https://i.pinimg.com/736x/32/67/34/326734839f0b778ad52f7cb59591b313.jpg",
    price: "$1.850.000",
    details: [
      "10 fotos impresas tamaño 15x20 cm",
      "Photobook 30x30 cm",
      "5 hojas con 30 fotos plasmadas",
      "Cubrimiento del evento en formato digital",
      "Aprox. 300 fotos",
      "USB con material del evento",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    image:
      "https://i.pinimg.com/1200x/2e/71/a1/2e71a1a82e1e6748a84da942f170b50b.jpg",
    price: "$2.400.000",
    details: [
      "15 fotos impresas tamaño 15x20 cm",
      "Photobook 30x30 cm",
      "10 hojas con 70 fotos plasmadas",
      "Cubrimiento del evento en formato digital",
      "Aprox. 400 fotos",
      "USB con material del evento",
    ],
  },
  {
    id: "diamante",
    name: "Diamante",
    image:
      "https://i.pinimg.com/736x/87/d3/cf/87d3cf88fbbaf867860f0d8009eb957e.jpg",
    price: "$2.850.000",
    details: [
      "Pre boda",
      "20 fotos impresas tamaño 15x20 cm",
      "Photobook 30x30 cm",
      "15 hojas con 90 fotos plasmadas",
      "USB con todo el material del evento",
      "Video clip",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    image:
      "https://i.pinimg.com/736x/a2/49/3b/a2493bc7df7d14bfd2839bc57e201c56.jpg",
    price: "$3.600.000",
    details: [
      "Pre boda",
      "Photobook 15x20 cm y 30x30 cm",
      "18 hojas con 100 fotos plasmadas",
      "USB con todo el material del evento",
      "Tomas de drone",
      "Video de tus sueños",
    ],
  },
];

const whatsappUrl =
  "https://wa.me/573102345742?text=Hola%20Miles%20Visual%2C%20quiero%20cotizar%20mi%20evento";

const aboutTitle = "¿Quiénes somos?";
const aboutParagraphs = [
  "Hola, mi nombre es Miles Esteban Morales Andrade: fotógrafo y productor autoral audiovisual de bodas colombiano establecido en la ciudad de Valencia, Córdoba. Conectar y apasionar por estar entre arte es la fotografía.",
  "Me dedico a plasmar recuerdos con calidad y creatividad para toda la vida, sumo un equipo capacitado y enfocado en brindar una experiencia única y diferente en cada evento, cubriendo tus momentos con un detalle digno de catedral y proporcionando una dirección visual que te hace diferenciar por estilosa creatividad por la emoción de que no encargarse para que lo que vivan con nosotros se la película.",
];

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [activeWeddingSlide, setActiveWeddingSlide] = useState(0);
  const [activeShootingSlide, setActiveShootingSlide] = useState(0);
  const [activePlan, setActivePlan] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWeddingSlide((prev) => (prev + 1) % weddingSlides.length);
    }, 5200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveShootingSlide((prev) => (prev + 1) % shootingSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
      if (event.key === "ArrowRight") {
        setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
      }
      if (event.key === "ArrowLeft") {
        setActiveHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const nextHeroSlide = () => setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
  const prevHeroSlide = () =>
    setActiveHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const nextWeddingSlide = () =>
    setActiveWeddingSlide((prev) => (prev + 1) % weddingSlides.length);
  const prevWeddingSlide = () =>
    setActiveWeddingSlide((prev) => (prev - 1 + weddingSlides.length) % weddingSlides.length);

  const nextShooting = () =>
    setActiveShootingSlide((prev) => (prev + 1) % shootingSlides.length);
  const prevShooting = () =>
    setActiveShootingSlide((prev) => (prev - 1 + shootingSlides.length) % shootingSlides.length);

  const nextPlan = () => setActivePlan((prev) => (prev + 1) % plans.length);
  const prevPlan = () => setActivePlan((prev) => (prev - 1 + plans.length) % plans.length);

  const selectedPlan = plans[activePlan];

  return (
    <main
      className={`${serif.variable} ${sans.variable} bg-[#0a0a0a] font-sans text-[#f4efe7] selection:bg-white selection:text-black`}
    >
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-black/35 backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <nav className="hidden items-center gap-7 xl:flex">
            {navLeft.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative text-[11px] uppercase tracking-[0.3em] text-white/88 transition hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-white/80 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <a
            href="#top"
            className="font-serif text-2xl tracking-[0.18em] text-white sm:text-3xl"
          >
            Miles Visual
          </a>

          <nav className="hidden items-center gap-7 xl:flex">
            {navRight.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative text-[11px] uppercase tracking-[0.3em] text-white/88 transition hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-white/80 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white xl:hidden"
          >
            Menú
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/92 backdrop-blur-2xl xl:hidden"
          >
            <div className="flex h-full flex-col px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl text-white">Miles Visual</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full border border-white/15 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-white"
                >
                  Cerrar
                </button>
              </div>

              <div className="mt-16 flex flex-1 flex-col justify-center gap-7">
                {[...navLeft, ...navRight].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-serif text-4xl tracking-tight text-white/90"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="top" className="relative h-[100svh] min-h-[720px] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroSlides[activeHeroSlide].id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.015 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={heroSlides[activeHeroSlide].image}
              alt={heroSlides[activeHeroSlide].alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/10 to-black/42" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/18 via-transparent to-black/18" />

        <button
          onClick={prevHeroSlide}
          aria-label="Imagen anterior"
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/20 p-4 text-white backdrop-blur-md transition duration-300 hover:bg-white hover:text-black sm:left-6 lg:left-8"
        >
          ←
        </button>

        <button
          onClick={nextHeroSlide}
          aria-label="Imagen siguiente"
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/20 p-4 text-white backdrop-blur-md transition duration-300 hover:bg-white hover:text-black sm:right-6 lg:right-8"
        >
          →
        </button>

        <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-8">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setActiveHeroSlide(index)}
              aria-label={`Ir a imagen ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeHeroSlide === index ? "w-16 bg-white" : "w-8 bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:py-32">
        <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
          Fotografía · cine · memoria
        </p>
        <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-[-0.04em] text-white sm:text-6xl">
          Imágenes que no solo documentan un momento: lo convierten en una memoria
          visual elegante, sensible e imposible de olvidar.
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
          Cada historia se trabaja con intención visual, emoción real y una estética
          premium para que el resultado se sienta cinematográfico y atemporal.
        </p>
      </section>

      <section id="about" className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 lg:px-10 lg:py-20">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
              Acerca de mí
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.04em] text-white sm:text-6xl">
              Una presentación más editorial, romántica y elegante.
            </h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="rounded-[2rem] border border-[#d2c4ad]/20 bg-[#f4efe5] p-7 text-[#3b3127] shadow-[0_20px_80px_rgba(0,0,0,0.16)] sm:p-10">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#7b6f61]">
              Acerca de mí
            </p>
            <h3 className="mt-4 font-serif text-4xl leading-none sm:text-5xl">
              {aboutTitle}
            </h3>

            <div className="mt-8 space-y-6 text-[15px] leading-8 text-[#41362b] sm:text-base">
              {aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-[#8c7a65]/40 px-6 py-3 text-sm font-medium text-[#3a2f26] transition duration-300 hover:bg-[#3a2f26] hover:text-[#f4efe5]"
              >
                Más acerca de mí
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-3">
            <div className="relative h-[420px] overflow-hidden rounded-[1.5rem] sm:h-[560px] lg:h-[700px]">
              <Image
                src="https://i.pinimg.com/736x/a8/61/fe/a861fe93b9102f9edd73d3c8ff54955b.jpg"
                alt="Retrato del fotógrafo Miles Visual"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section id="bodas" className="mx-auto max-w-[1500px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-3">
            <div className="relative h-[420px] overflow-hidden rounded-[1.5rem] sm:h-[560px] lg:h-[680px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={weddingSlides[activeWeddingSlide].id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.015 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={weddingSlides[activeWeddingSlide].image}
                    alt={weddingSlides[activeWeddingSlide].title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/8 to-transparent" />

              <button
                onClick={prevWeddingSlide}
                aria-label="Foto de boda anterior"
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/20 p-4 text-white backdrop-blur-md transition duration-300 hover:bg-white hover:text-black sm:left-6"
              >
                ←
              </button>

              <button
                onClick={nextWeddingSlide}
                aria-label="Foto de boda siguiente"
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/20 p-4 text-white backdrop-blur-md transition duration-300 hover:bg-white hover:text-black sm:right-6"
              >
                →
              </button>

              <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
                {weddingSlides.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveWeddingSlide(index)}
                    aria-label={`Ir a foto de boda ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeWeddingSlide === index ? "w-16 bg-white" : "w-8 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-xl lg:pl-6">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
              Bodas
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.04em] text-white sm:text-6xl">
              {weddingSlides[activeWeddingSlide].title}
            </h2>
            <p className="mt-6 text-base leading-8 text-white/65 sm:text-lg">
              {weddingSlides[activeWeddingSlide].subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition duration-300 hover:scale-[1.02]"
              >
                Cotizar boda
              </a>
              <a
                href="#contacto"
                className="inline-flex rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-medium text-white transition duration-300 hover:bg-white hover:text-black"
              >
                Reservar fecha
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="shootings" className="py-24 lg:py-32">
        <div className="relative w-full overflow-hidden border-y border-white/10 bg-white/[0.03]">
          <div className="relative h-[460px] overflow-hidden sm:h-[620px] lg:h-[820px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={shootingSlides[activeShootingSlide].id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.015 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={shootingSlides[activeShootingSlide].image}
                  alt={shootingSlides[activeShootingSlide].alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/8 to-transparent" />

            <button
              onClick={prevShooting}
              aria-label="Shooting anterior"
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/20 p-4 text-white backdrop-blur-md transition duration-300 hover:bg-white hover:text-black sm:left-6 lg:left-8"
            >
              ←
            </button>

            <button
              onClick={nextShooting}
              aria-label="Shooting siguiente"
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-black/20 p-4 text-white backdrop-blur-md transition duration-300 hover:bg-white hover:text-black sm:right-6 lg:right-8"
            >
              →
            </button>

            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-8">
              {shootingSlides.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveShootingSlide(index)}
                  aria-label={`Ir al shooting ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeShootingSlide === index ? "w-16 bg-white" : "w-8 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 pt-14 text-center sm:px-6 lg:pt-16">
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
            Shootings
          </p>
          <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.04em] text-white sm:text-6xl">
            Retratos y sesiones con presencia, dirección y estética editorial.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            Un lenguaje visual contemporáneo para personas, marcas y proyectos que
            quieren verse memorables, sofisticados y profundamente intencionales.
          </p>
        </div>
      </section>

      <section id="planes" className="mx-auto max-w-[1500px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="mb-12 text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
            Planes
          </p>
          <h2 className="mt-4 font-serif text-4xl font-medium tracking-[-0.04em] text-white sm:text-6xl">
            Hay un plan esperando por ti.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65">
            
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {plans.map((plan, index) => {
            const active = index === activePlan;
            return (
              <button
                key={plan.id}
                onClick={() => setActivePlan(index)}
                className={`rounded-full px-5 py-2.5 text-sm transition ${
                  active
                    ? "bg-white text-black"
                    : "border border-white/15 bg-white/5 text-white hover:bg-white hover:text-black"
                }`}
              >
                {plan.name}
              </button>
            );
          })}
        </div>

        <div className="grid items-stretch overflow-hidden rounded-[2rem] border border-white/10 bg-[#f8f6f1] text-[#312820] shadow-[0_20px_80px_rgba(0,0,0,0.16)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[420px] sm:min-h-[520px] lg:min-h-[700px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPlan.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <Image
                  src={selectedPlan.image}
                  alt={selectedPlan.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPlan.id + "-content"}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-serif text-5xl font-medium tracking-tight sm:text-6xl">
                  {selectedPlan.name}
                </h3>

                <div className="mt-8 space-y-4 text-sm leading-7 text-[#4a3f35] sm:text-base">
                  {selectedPlan.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>

                <div className="mt-10">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#9c8b79]">
                    Valor
                  </p>
                  <p className="mt-2 text-3xl font-medium sm:text-4xl">
                    {selectedPlan.price}
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <button
                    onClick={prevPlan}
                    className="rounded-full border border-[#8c7a65]/30 px-5 py-3 text-sm transition hover:bg-[#312820] hover:text-[#f8f6f1]"
                  >
                    ← Anterior
                  </button>
                  <button
                    onClick={nextPlan}
                    className="rounded-full border border-[#8c7a65]/30 px-5 py-3 text-sm transition hover:bg-[#312820] hover:text-[#f8f6f1]"
                  >
                    Siguiente →
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[#312820] px-6 py-3 text-sm font-medium text-[#f8f6f1] transition hover:scale-[1.02]"
                  >
                    Cotizar este plan
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section id="contacto" className="mx-auto max-w-[1500px] px-4 pb-10 sm:px-6 lg:px-10 lg:pb-20">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div className="absolute -left-12 bottom-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-8 top-0 h-56 w-56 rounded-full bg-[#d8c3a3]/20 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                Contacto
              </p>
              <h2 className="mt-4 max-w-4xl font-serif text-4xl font-medium tracking-[-0.04em] text-white sm:text-6xl">
                Tu historia merece verse tan increíble como la imaginas.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
                Escríbeme para cotizar tu boda o tu shooting. Crearemos una
                experiencia visual sofisticada, auténtica y profundamente memorable.
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition duration-300 hover:scale-[1.02]"
            >
              Reservar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="font-serif text-3xl text-white">Miles Visual</div>
            <p className="mt-3 max-w-md text-sm leading-7 text-white/50">
              Fotografía y producción audiovisual con una estética cinematográfica,
              elegante y emocional.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[11px] uppercase tracking-[0.28em] text-white/55">
            <a href="#bodas" className="transition hover:text-white">
              Bodas
            </a>
            <a href="#shootings" className="transition hover:text-white">
              Shootings
            </a>
            <a href="#planes" className="transition hover:text-white">
              Planes
            </a>
            <a href="#about" className="transition hover:text-white">
              Acerca de mí
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              Contacto
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
