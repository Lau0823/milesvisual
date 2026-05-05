"use client";

import Link from "next/link";
<<<<<<< HEAD
import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Instagram,
  Menu,
  MessageCircle,
  Star,
  X,
} from "lucide-react";

const bodasImages = [
  "/Bodas/1.jpeg",
  "/Bodas/2.jpeg",
  "/Bodas/3.jpeg",
   "/Bodas/4.jpeg",
   "/Bodas/5.jpeg",
   "/Bodas/6.jpeg",
];

const prebodasImages = [
  "/prebodas/WhatsApp Image 2026-04-08 at 5.01.09 PM (1).jpeg",
  "/prebodas/WhatsApp Image 2026-04-08 at 5.01.10 PM (2).jpeg",
  "/prebodas/WhatsApp Image 2026-04-08 at 5.01.11 PM (2).jpeg",
];

const estudioImages = [
  "/estudio/DSC09548.jpg (1).jpeg",
  "/estudio/WhatsApp Image 2026-04-13 at 12.24.20 PM (2).jpeg",
  "/estudio/WhatsApp Image 2026-04-13 at 12.24.24 PM.jpeg",
=======
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=80",
  },
];

const bodasImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
];

const prebodasImages = [
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80",
];

const estudioImages = [
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=80",
>>>>>>> origin/main
];

const plans = [
  {
    id: 1,
<<<<<<< HEAD
    name: "Basic",
    subtitle: "Fotografía",
    price: "$1.500.000",
    image:
      "/Bodas/8.jpeg",
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
    image:
      "https://i.pinimg.com/1200x/44/0a/be/440abe02ff2cff0f6fce3b0ed3a41e0a.jpg",
    items: [
      "10 fotos impresas tamaño 15x20 cm",
      "Photobook 30x30 cm (5 hojas con 30 fotos plasmadas)",
      "Cubrimiento del evento en formato digital (aprox. 300 fotos)",
      "USB con el material del evento",
      "Decoración, recepción, maquillaje y hora loca",
    ],
  },
  {
    id: 3,
    name: "Premium",
    subtitle: "Fotografía",
    price: "$2.400.000",
    image:
      "https://i.pinimg.com/736x/d1/8e/e2/d18ee24424e28b9caa7a2b53313987f4.jpg",
    items: [
      "15 fotos impresas tamaño 15x20 cm",
      "Photobook 30x30 cm (10 hojas con 70 fotos plasmadas)",
      "Cubrimiento del evento en formato digital (aprox. 400 fotos)",
      "USB con el material del evento",
      "Decoración, recepción, maquillaje y hora loca",
    ],
  },
{
  id: 4,
  name: "Diamante",
  subtitle: "Foto + Video",
  price: "$2.850.000",
  video: "VIDEO 5.mp4", // 👈 NUEVO
  image:
    "https://i.pinimg.com/736x/f7/c7/4b/f7c74bbf0fc3ffc1fe7b318f4a3140a8.jpg",
  items: [
    "Pre boda",
    "20 fotos impresas tamaño 15x20 cm",
    "Photobook 30x30 cm (15 hojas con 90 fotos plasmadas)",
    "Cubrimiento del evento en formato digital",
    "USB con todo el material del evento",
    "Video clip",
  ],
},
  {
    id: 5,
    name: "Gold",
    subtitle: "Experiencia completa",
    price: "$3.600.000",
    image:
      "https://i.pinimg.com/1200x/5f/c7/4a/5fc74aa29aba24b0b0d348c52b19f4e6.jpg",
    items: [
      "Pre boda",
      "15 fotos impresas tamaño 15x20 cm",
      "Photobook 15x20 cm (5 hojas con 30 fotos plasmadas)",
      "Photobook 30x30 cm (18 hojas con 100 fotos plasmadas)",
      "USB con todo el material del evento",
      "Tomas de dron",
      "Video de tus sueños",
    ],
  },
];

const testimonials = [
  {
    id: 1,
    name: "Laura & Sebastián",
    role: "Boda",
    image:
      "https://i.pinimg.com/736x/6b/95/31/6b95313616fabae658757872c8e5717c.jpg",
    text:
      "La experiencia fue impecable. Todo se sintió elegante, natural y profundamente nuestro.",
  },
  {
    id: 2,
    name: "Mariana Rojas",
    role: "Pre-Boda",
    image:
      "https://i.pinimg.com/736x/63/97/6f/63976f2d87d11c368fcaa3456a935773.jpg",
    text:
      "Las fotos tienen una atmósfera hermosa. Nos sentimos guiados, cómodos y el resultado fue espectacular.",
  },
  {
    id: 3,
    name: "Valentina",
    role: "Cobertura completa",
    image:
      "https://i.pinimg.com/736x/ad/01/5d/ad015dd3e19f14a58317f42de3393632.jpg",
    text:
      "Cada imagen parece editorial pero sin perder emoción. Fue justo lo que soñé.",
  },
];

function FullscreenSlider({
  title,
  script,
  eyebrow,
  images,
  current,
  onPrev,
  onNext,
  galleryHref,
  quote,
}: {
  title: string;
  script: string;
  eyebrow: string;
  images: string[];
  current: number;
  onPrev: () => void;
  onNext: () => void;
  galleryHref: string;
  quote: string;
}) {
  return (
    <section className="relative min-h-screen overflow-hidden">
=======
    name: "Premium",
    subtitle: "Fotografía",
    items: [
      "Cubrimiento fotográfico de 10 a 12 horas por el fotógrafo y asistente.",
      "450 fotografías editadas en alta resolución.",
      "Galería online privada con todas las fotografías.",
      "Memoria USB con el material fotográfico.",
      "1 retablo o portarretrato 30x40 cm.",
      "Presentación de las fotos con musicalización.",
      "Photobook 30x30 cm de lujo personalizado.",
      "Sesión preboda de 40 fotografías editadas.",
    ],
    price: "COP 4'499.000",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    name: "Gold",
    subtitle: "Fotografía",
    items: [
      "Cobertura completa del evento con narrativa fotográfica.",
      "Más de 500 fotografías editadas en alta resolución.",
      "Galería privada para compartir con familiares.",
      "Caja premium con USB personalizado.",
      "Photobook de lujo 30x30 cm.",
      "Sesión preboda incluida.",
      "Acompañamiento visual en momentos clave del evento.",
      "Entrega cuidada con estética editorial.",
    ],
    price: "COP 5'200.000",
    image:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    name: "Diamond",
    subtitle: "Foto + Video",
    items: [
      "Cobertura extendida con equipo audiovisual.",
      "Fotografía editorial completa del día.",
      "Selección final curada y editada.",
      "Galería online y entrega premium.",
      "Photobook y pieza impresa fine art.",
      "Sesión preboda premium.",
      "Tomas especiales y dirección visual.",
      "Propuesta integral para una historia inolvidable.",
    ],
    price: "COP 6'100.000",
    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80",
  },
];

function FadeCarousel({
  images,
  currentIndex,
  alt,
  heightClass = "h-[420px] md:h-[580px]",
}: {
  images: string[];
  currentIndex: number;
  alt: string;
  heightClass?: string;
}) {
  return (
    <div className="mv-service-frame">
>>>>>>> origin/main
      {images.map((image, index) => (
        <img
          key={image}
          src={image}
<<<<<<< HEAD
          alt={`${title} ${index + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
            current === index ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,19,20,0.14)_0%,rgba(17,19,20,0.26)_35%,rgba(17,19,20,0.54)_100%)]" />

      <div className="absolute inset-0 z-10 flex items-end">
        <div className="w-full px-4 pb-12 pt-24 md:px-8 md:pb-16">
          <div className="mx-auto max-w-[1320px]">
            <p className="pointer-events-none absolute left-1/2 top-[18%] -translate-x-1/2 font-[Allura] text-[72px] leading-none text-white/15 sm:text-[100px] md:text-[160px]">
              {script}
            </p>

            <div className="max-w-[720px] text-white">
              <p className="text-[12px] uppercase tracking-[0.16em] text-white/80 md:text-[14px]">
                {eyebrow}
              </p>
              <h2 className="mt-3 text-[34px] font-semibold uppercase leading-[0.92] tracking-[0.03em] md:text-[72px]">
                {title}
              </h2>
              <p className="mt-5 max-w-[560px] text-[14px] leading-7 text-white/86 md:text-[17px] md:leading-8">
                {quote}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://wa.me/573000000000?text=Hola%20Miles%20Visual,%20quiero%20cotizar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mv-button-light"
                >
                  Cotizar
                </a>
                <Link href={galleryHref} className="mv-button-outline-light">
                  Ver galería
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button onClick={onPrev} className="mv-arrow left-4" aria-label={`Anterior en ${title}`}>
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button onClick={onNext} className="mv-arrow right-4" aria-label={`Siguiente en ${title}`}>
        <ChevronRight className="h-5 w-5" />
      </button>
    </section>
  );
}

function FullscreenVideoSection({
  src,
  eyebrow,
  title,
}: {
  src: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,20,0.12)_0%,rgba(7,16,20,0.18)_30%,rgba(7,16,20,0.42)_100%)]" />

      <div className="relative z-10 flex min-h-screen items-end">
        <div className="mx-auto w-full max-w-[1320px] px-4 pb-14 md:px-8 md:pb-16">
          <p className="text-[12px] uppercase tracking-[0.16em] text-white/78 md:text-[14px]">
            {eyebrow}
          </p>
          <h2 className="mt-3 max-w-[760px] text-[34px] font-semibold uppercase leading-[0.94] tracking-[0.03em] text-white md:text-[72px]">
            {title}
          </h2>
        </div>
      </div>
    </section>
=======
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
            currentIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
          }`}
        />
      ))}
      <div className={`relative ${heightClass}`} />
    </div>
>>>>>>> origin/main
  );
}

export default function HomePage() {
<<<<<<< HEAD
  const [menuOpen, setMenuOpen] = useState(false);

  const [bodasIndex, setBodasIndex] = useState(0);
  const [prebodasIndex, setPrebodasIndex] = useState(0);
  const [estudioIndex, setEstudioIndex] = useState(0);

  const [selectedPlan, setSelectedPlan] = useState(1);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const logoSrc = "/LOGO MILES AMARILLO_Mesa de trabajo 1.png";
  const heroVideoSrc = "/VIDEO 1.mp4";
  const middleVideoSrc = "/VIDEO 2.mp4";

  const activePlan = useMemo(
    () => plans.find((plan) => plan.id === selectedPlan) ?? plans[0],
    [selectedPlan]
  );

  const navLeft = [
    { href: "/bodas", label: "Bodas" },
    { href: "/prebodas", label: "Pre-Bodas" },
    { href: "/estudio", label: "Foto Estudios" },
  ];

  const navRight = [
    { href: "/contacto", label: "Contacto" },
    { href: "#planes", label: "Planes" },
    { href: "acercademi", label: "Acerca de mí" },
  ];

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
      </section>

      {/* ACERCA */}
      <section id="acerca" className="mx-auto max-w-[1280px] px-4 py-8 md:px-8 md:py-16">
        <div className="grid items-center gap-10 md:grid-cols-[0.95fr_1.05fr]">
          <div className="relative h-[470px] md:h-[620px]">
            <img
              src="Miles/WhatsApp Image 2026-04-13 at 12.24.20 PM (1).jpeg"
              alt="Fotógrafo 1"
              className="absolute left-0 top-0 h-[72%] w-[62%] rounded-[30px] object-cover shadow-[0_22px_60px_rgba(0,0,0,0.10)]"
            />
            <img
              src="/Miles/WhatsApp Image 2026-04-13 at 12.24.19 PM.jpeg"
              alt="Fotógrafo 2"
              className="absolute bottom-0 right-0 h-[72%] w-[62%] rounded-[30px] object-cover shadow-[0_22px_60px_rgba(0,0,0,0.10)]"
            />
          </div>

          <div>
            <p className="text-[34px] font-semibold uppercase leading-none tracking-[0.03em] md:text-[62px]">
              ¿QUIÉNES
            </p>
            <p className="text-[34px] font-light uppercase leading-none tracking-[0.03em] md:text-[62px]">
            
            </p>
            <p className="mv-script -mt-1 text-[56px] leading-none text-[var(--mv-sage)] md:text-[92px]">
               SOMOS?
            </p>

            <p className="mt-8 max-w-[680px] text-[15px] leading-8 text-[var(--mv-ink)]/74 md:text-[17px] md:leading-9">
              Mi nombre es Miles Esteban Morales Andrade, fotógrafo y productor
              audiovisual de bodas colombiano, establecido en la ciudad de
              Villavicencio, amante y apasionado por este arte que es la
              fotografía.
            </p>

            <p className="mt-5 max-w-[680px] text-[15px] leading-8 text-[var(--mv-ink)]/74 md:text-[17px] md:leading-9">
              Nos dedicamos a plasmar recuerdos con calidad y creatividad para
              toda la vida. Somos un equipo capacitado y enfocado en brindar una
              experiencia única y diferente en cada evento que cubrimos.
            </p>

           
          </div>
        </div>
      </section>

      {/* BODAS */}
      <FullscreenSlider
        title="BODAS"
        script="Inolvidables"
        eyebrow="Momentos inolvidables"
        images={bodasImages}
        current={bodasIndex}
        onPrev={() =>
          setBodasIndex((prev) => (prev - 1 + bodasImages.length) % bodasImages.length)
        }
        onNext={() => setBodasIndex((prev) => (prev + 1) % bodasImages.length)}
        galleryHref="/bodas"
        quote="Coberturas con una mirada elegante, emocional y cinematográfica para contar tu historia con belleza y verdad."
      />

      {/* VIDEO FULLSCREEN EN LA MITAD */}
      <FullscreenVideoSection
        src={middleVideoSrc}
        eyebrow=""
        title="Disfruta tu boda. Nosotros nos encargamos de los recuerdos"
      />

      {/* PREBODAS */}
      <FullscreenSlider
        title="PRE-BODAS"
        script="Auténticas"
        eyebrow="Conexión real"
        images={prebodasImages}
        current={prebodasIndex}
        onPrev={() =>
          setPrebodasIndex((prev) => (prev - 1 + prebodasImages.length) % prebodasImages.length)
        }
        onNext={() => setPrebodasIndex((prev) => (prev + 1) % prebodasImages.length)}
        galleryHref="/prebodas"
        quote="Sesiones delicadas y editoriales para retratar la complicidad, la atmósfera y la emoción antes del gran día."
      />

      {/* FOTO ESTUDIO */}
      <FullscreenSlider
        title="FOTO ESTUDIO"
        script="Esencia"
        eyebrow="Luz y detalle"
        images={estudioImages}
        current={estudioIndex}
        onPrev={() =>
          setEstudioIndex((prev) => (prev - 1 + estudioImages.length) % estudioImages.length)
        }
        onNext={() => setEstudioIndex((prev) => (prev + 1) % estudioImages.length)}
        galleryHref="/estudio"
        quote="Retratos y piezas visuales pensadas desde la dirección, la estética y una presencia visual más editorial."
      />

      {/* PLANES */}
      <section id="planes" className="mx-auto max-w-[1280px] px-4 py-20 md:px-8 md:py-28">
        <div className="mb-12 text-center">
          <p className="mv-script text-[44px] leading-none text-[var(--mv-gold)] md:text-[72px]">
            planes
          </p>
          <h2 className="text-[32px] font-semibold uppercase tracking-[0.03em] md:text-[58px]">
            EXPERIENCIAS DISPONIBLES
          </h2>
        </div>

        {/* LAS 5 TABS VISIBLES */}
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
                <Link href="/bodas" className="mv-button-outline-dark">
                  Ver galería
=======
  const [showIntro, setShowIntro] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const [heroIndex, setHeroIndex] = useState(0);
  const [bodasIndex, setBodasIndex] = useState(0);
  const [prebodasIndex, setPrebodasIndex] = useState(0);
  const [estudioIndex, setEstudioIndex] = useState(0);
  const [currentPlan, setCurrentPlan] = useState(0);

  const logoSrc = "/LOGO MILES AMARILLO_Mesa de trabajo 1.png";
  const bannerVideoSrc = "/Sesión fotográfica Pre Boda, sesión en exteriores [1].MP4";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setBodasIndex((prev) => (prev + 1) % bodasImages.length);
      setPrebodasIndex((prev) => (prev + 1) % prebodasImages.length);
      setEstudioIndex((prev) => (prev + 1) % estudioImages.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { href: "/bodas", label: "Bodas" },
    { href: "/prebodas", label: "Pre-Bodas" },
    { href: "/estudio", label: "Foto Estudio" },
    { href: "/acercademi", label: "Acerca de mí" },
    { href: "/contacto", label: "Contacto" },
  ];

  const nextHero = () => setHeroIndex((prev) => (prev + 1) % heroSlides.length);
  const prevHero = () =>
    setHeroIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const nextPlan = () => setCurrentPlan((prev) => (prev + 1) % plans.length);
  const prevPlan = () =>
    setCurrentPlan((prev) => (prev - 1 + plans.length) % plans.length);

  return (
    <>
      {showIntro && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#789894]">
          <div className="animate-[introReveal_1.6s_ease_forwards] text-center">
            <img
              src={logoSrc}
              alt="Miles Visual"
              className="mx-auto h-[120px] w-auto object-contain sm:h-[150px] md:h-[190px]"
            />
          </div>
        </div>
      )}

      <main className="min-h-screen overflow-x-hidden bg-[var(--mv-cream)] text-[var(--mv-ink)]">
        {/* HERO */}
        <section className="relative min-h-screen overflow-hidden bg-black">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={bannerVideoSrc}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,20,0.16)_0%,rgba(7,16,20,0.28)_36%,rgba(7,16,20,0.68)_100%)]" />

         

          {/* NAVBAR */}
          <header className="relative z-30 mx-auto flex w-full max-w-[1320px] items-center justify-between px-4 py-6 md:px-8 md:py-8">
            <nav className="hidden items-center gap-8 lg:flex">
              {navLinks.slice(0, 3).map((item) => (
                <Link key={item.href} href={item.href} className="mv-nav-link-light">
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/"
              className="absolute left-1/2 top-5 z-30 -translate-x-1/2 md:top-6"
            >
              <img
                src={logoSrc}
                alt="Miles Visual"
                className="h-[120px] w-auto max-w-[84vw] object-contain sm:h-[150px] md:h-[190px] lg:h-[230px]"
              />
            </Link>

            <nav className="hidden items-center gap-8 lg:flex">
              {navLinks.slice(3).map((item) => (
                <Link key={item.href} href={item.href} className="mv-nav-link-light">
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              onClick={() => setMenuOpen(true)}
              className="ml-auto flex h-10 w-10 items-center justify-center text-white lg:hidden"
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
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setMenuOpen(false)}
              />

              <div
                className={`absolute right-0 top-0 flex h-full w-[86%] max-w-[360px] flex-col bg-[var(--mv-cream)] p-6 transition-transform duration-300 ${
                  menuOpen ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div className="flex items-center justify-between">
                  <img
                    src={logoSrc}
                    alt="Miles Visual"
                    className="h-[60px] w-auto object-contain"
                  />
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="flex h-10 w-10 items-center justify-center"
                    aria-label="Cerrar menú"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <nav className="mt-12 flex flex-col gap-5">
                  {navLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="border-b border-black/10 pb-4 font-sans text-[13px] uppercase tracking-[0.12em] text-[var(--mv-ink)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </header>

          {/* HERO CONTENT */}
          <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-[1320px] items-end px-4 pb-14 pt-[220px] sm:pt-[250px] md:px-8 md:pb-16 lg:items-center lg:pt-[170px]">
            <div className="max-w-[920px] text-white">
              <span className="mv-chip">Fotografía + audiovisual</span>

              <p className="mt-6 font-sans text-[18px] font-light uppercase tracking-[0.12em] sm:text-[24px] md:text-[32px]">
                HAGAMOS <span className="normal-case tracking-normal">de TUS</span>
              </p>

              <h1 className="mt-1 font-sans text-[34px] font-semibold uppercase leading-[0.95] tracking-[0.02em] sm:text-[52px] md:text-[82px]">
                FOTOS SOÑADAS
              </h1>

              <p className="mv-script mt-1 text-[50px] leading-none text-white sm:text-[78px] md:text-[122px]">
                una realidad
              </p>

              <p className="mt-6 max-w-[720px] font-sans text-[14px] leading-7 text-white/85 md:text-[18px] md:leading-8">
                Fotografía y audiovisual con una mirada editorial, emocional y
                cinematográfica para parejas que quieren recuerdos que realmente
                se sientan.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contacto" className="mv-button-light">
                  Cotizar experiencia
                </Link>
                <Link href="/bodas" className="mv-button-outline-light">
                  Ver portafolio
>>>>>>> origin/main
                </Link>
              </div>
            </div>
          </div>
<<<<<<< HEAD
        </div>
      </section>

      {/* REDES */}
      <section className="mx-auto max-w-[1180px] px-4 py-16 md:px-8 md:py-24">
        <div className="rounded-[30px] bg-[#789894] px-6 py-12 text-center text-white shadow-[0_22px_60px_rgba(0,0,0,0.08)] md:px-10 md:py-16">
          <p className="mv-script text-[44px] leading-none text-white md:text-[72px]">
            Redes
          </p>
          <h2 className="mt-2 text-[28px] font-semibold uppercase tracking-[0.03em] md:text-[48px]">
            CONECTA CON NUESTRO UNIVERSO VISUAL
          </h2>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://www.instagram.com/milesvisual_producciones/"
              target="_blank"
              rel="noopener noreferrer"
              className="mv-button-light"
            >
              <Instagram className="mr-2 h-4 w-4" />
              Instagram
            </a>

            <a
              href="https://wa.me/573148112717"
              target="_blank"
              rel="noopener noreferrer"
              className="mv-button-outline-light"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="mx-auto max-w-[1180px] px-4 py-20 md:px-8 md:py-28">
        <div className="mb-12 text-center">
          <p className="mv-script text-[44px] leading-none text-[var(--mv-gold)] md:text-[72px]">
            Testimonios
          </p>
          <h2 className="text-[32px] font-semibold uppercase tracking-[0.03em] md:text-[54px]">
            LO QUE DICEN DE LA EXPERIENCIA
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-[30px] bg-white px-6 py-10 shadow-[0_22px_60px_rgba(0,0,0,0.06)] md:px-10 md:py-12">
          <div className="mx-auto max-w-[760px] text-center">
            <img
              src={testimonials[testimonialIndex].image}
              alt={testimonials[testimonialIndex].name}
              className="mx-auto h-20 w-20 rounded-full object-cover"
            />

            <div className="mt-5 flex justify-center gap-1 text-[#d4a85d]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>

            <p className="mt-5 text-[16px] leading-8 text-[var(--mv-ink)]/78 md:text-[18px] md:leading-9">
              “{testimonials[testimonialIndex].text}”
            </p>

            <p className="mt-5 text-[16px] font-semibold">
              {testimonials[testimonialIndex].name}
            </p>
            <p className="mt-1 text-[12px] uppercase tracking-[0.12em] text-[var(--mv-ink)]/50">
              {testimonials[testimonialIndex].role}
            </p>
          </div>

          <button
            onClick={() =>
              setTestimonialIndex(
                (prev) => (prev - 1 + testimonials.length) % testimonials.length
              )
            }
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={() =>
              setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
            }
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
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

      {/* WHATSAPP FLOTANTE */}
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
=======

          {/* HERO ARROWS */}
          <button onClick={prevHero} className="mv-arrow left-4">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={nextHero} className="mv-arrow right-4">
            <ChevronRight className="h-5 w-5" />
          </button>
        </section>

        {/* BIENVENIDA */}
        <section className="mx-auto max-w-[1280px] px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[920px] text-center">
            <p className="mv-script text-[46px] leading-none text-[var(--mv-gold)] md:text-[78px]">
              Bienvenidos
            </p>
            <h2 className="mt-2 font-sans text-[30px] font-semibold uppercase tracking-[0.03em] md:text-[54px]">
              UNA EXPERIENCIA VISUAL QUE SE SIENTE
            </h2>
            <p className="mx-auto mt-6 max-w-[760px] font-sans text-[15px] leading-8 text-[var(--mv-ink)]/80 md:text-[18px] md:leading-9">
              Cada historia merece una estética cuidada, una dirección sensible y
              una experiencia que conecte desde el primer vistazo hasta la última
              entrega.
            </p>
          </div>
        </section>

        {/* ACERCA DE MI */}
        <section className="bg-[#789894] py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-4 md:px-8">
            <div className="grid items-center gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
              <div className="relative min-h-[440px]">
                <div className="absolute left-0 top-0 h-[260px] w-[56%] overflow-hidden rounded-[20px] md:h-[320px]">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80"
                    alt="Retrato principal"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="absolute right-0 top-10 h-[300px] w-[68%] overflow-hidden rounded-[20px] md:h-[370px]">
                  <img
                    src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1000&q=80"
                    alt="Retrato artístico"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="absolute bottom-0 left-[12%] h-[140px] w-[34%] overflow-hidden rounded-[18px] md:h-[180px]">
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"
                    alt="Detalle"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="text-white">
                <p className="mv-script text-[46px] leading-none text-white md:text-[78px]">
                  acerca de mí
                </p>
                <h2 className="mt-2 font-sans text-[30px] font-semibold uppercase tracking-[0.03em] md:text-[52px]">
                  HISTORIAS REALES, MIRADA EDITORIAL
                </h2>

                <p className="mt-6 max-w-[720px] font-sans text-[15px] leading-8 text-white/92 md:text-[18px] md:leading-9">
                  Soy Miles, fotógrafo y productor audiovisual. Mi trabajo nace
                  de la sensibilidad, la estética y la intención de transformar
                  cada momento en una pieza visual con emoción, carácter y
                  presencia.
                </p>

                <p className="mt-6 max-w-[720px] font-sans text-[15px] leading-8 text-white/82 md:text-[18px] md:leading-9">
                  Me interesa crear imágenes que no solo se vean hermosas, sino
                  que también transmitan verdad, atmósfera y una experiencia
                  memorable desde el primer contacto.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/acercademi" className="mv-button-light">
                    Conocer más
                  </Link>
                  <Link href="/contacto" className="mv-button-outline-light">
                    Hablemos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BODAS */}
        <section className="mx-auto max-w-[1280px] px-4 py-16 md:px-8 md:py-24">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
            <FadeCarousel
              images={bodasImages}
              currentIndex={bodasIndex}
              alt="Bodas"
            />

            <div>
              <p className="mv-script text-[44px] leading-none text-[var(--mv-gold)] md:text-[72px]">
                momentos inolvidables
              </p>
              <h2 className="mv-section-title mt-1">BODAS</h2>
              <p className="mv-body mt-6 max-w-[560px]">
                Coberturas con una mirada elegante, emocional y cinematográfica
                para contar tu historia con belleza, sensibilidad y verdad.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/bodas" className="mv-button-dark">
                  Ver galería
                </Link>
                <a
                  href="https://wa.me/573000000000?text=Hola%20Miles%20Visual,%20quiero%20cotizar%20mi%20boda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mv-button-outline-dark"
                >
                  Cotizar boda
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PREBODAS */}
        <section className="mx-auto max-w-[1280px] px-4 py-16 md:px-8 md:py-24">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14 md:[&>*:first-child]:order-2">
            <FadeCarousel
              images={prebodasImages}
              currentIndex={prebodasIndex}
              alt="Pre-Bodas"
            />

            <div>
              <p className="mv-script text-[44px] leading-none text-[var(--mv-gold)] md:text-[72px]">
                conexión auténtica
              </p>
              <h2 className="mv-section-title mt-1">PRE-BODAS</h2>
              <p className="mv-body mt-6 max-w-[560px]">
                Sesiones íntimas y editoriales para parejas que quieren imágenes
                delicadas, naturales y con una narrativa visual especial.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/prebodas" className="mv-button-dark">
                  Ver galería
                </Link>
                <a
                  href="https://wa.me/573000000000?text=Hola%20Miles%20Visual,%20quiero%20cotizar%20mi%20preboda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mv-button-outline-dark"
                >
                  Cotizar preboda
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOTO ESTUDIO */}
        <section className="mx-auto max-w-[1280px] px-4 py-16 md:px-8 md:py-24">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
            <FadeCarousel
              images={estudioImages}
              currentIndex={estudioIndex}
              alt="Foto estudio"
            />

            <div>
              <p className="mv-script text-[44px] leading-none text-[var(--mv-gold)] md:text-[72px]">
                luz y esencia
              </p>
              <h2 className="mv-section-title mt-1">FOTO ESTUDIO</h2>
              <p className="mv-body mt-6 max-w-[560px]">
                Retratos y piezas visuales con una propuesta limpia, refinada y
                pensada desde la estética, la dirección y el detalle.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/estudio" className="mv-button-dark">
                  Ver galería
                </Link>
                <a
                  href="https://wa.me/573000000000?text=Hola%20Miles%20Visual,%20quiero%20cotizar%20mi%20sesión%20de%20estudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mv-button-outline-dark"
                >
                  Cotizar estudio
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PLANES */}
        <section className="mx-auto max-w-[1280px] px-4 py-20 md:px-8 md:py-28">
          <div className="mb-10 text-center md:mb-14">
            <p className="mv-script text-[44px] leading-none text-[var(--mv-gold)] md:text-[72px]">
              experiencias
            </p>
            <h2 className="mt-1 font-sans text-[34px] font-semibold uppercase tracking-[0.03em] md:text-[62px]">
              PLANES DE BODA
            </h2>
            <p className="mx-auto mt-5 max-w-[760px] font-sans text-[15px] leading-8 text-[var(--mv-ink)]/75 md:text-[18px] md:leading-9">
              Diseñados para parejas que quieren una experiencia cuidada, una
              estética premium y una entrega que se sienta tan especial como su
              historia.
            </p>
          </div>

          <div className="relative mx-auto max-w-[1160px] overflow-hidden rounded-[28px] bg-[#789894] md:rounded-[34px]">
            <div className="grid md:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[340px] md:min-h-[720px]">
                <img
                  src={plans[currentPlan].image}
                  alt={plans[currentPlan].name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/12" />
              </div>

              <div className="px-7 py-8 text-white md:px-10 md:py-10">
                <p className="mv-script text-[42px] leading-none text-white md:text-[68px]">
                  {plans[currentPlan].name}
                </p>

                <p className="mt-2 font-sans text-[18px] font-light uppercase tracking-[0.08em] text-white/95 md:text-[22px]">
                  {plans[currentPlan].subtitle}
                </p>

                <ul className="mt-7 space-y-3">
                  {plans[currentPlan].items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-[9px] h-[4px] w-[4px] rounded-full bg-white/90" />
                      <span className="font-sans text-[15px] leading-7 text-white/95 md:text-[18px] md:leading-8">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex items-center gap-5">
                  <span className="h-px flex-1 bg-white/75" />
                  <p className="font-sans text-[22px] font-light uppercase tracking-[0.08em] text-white md:text-[30px]">
                    {plans[currentPlan].price}
                  </p>
                  <span className="h-px flex-1 bg-white/75" />
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://wa.me/573000000000?text=Hola%20Miles%20Visual,%20quiero%20cotizar%20este%20plan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mv-button-light"
                  >
                    Cotizar este plan
                  </a>
                  <Link href="/contacto" className="mv-button-outline-light">
                    Más información
                  </Link>
                </div>
              </div>
            </div>

            <button onClick={prevPlan} className="mv-arrow-dark left-4 md:left-6">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={nextPlan} className="mv-arrow-dark right-4 md:right-6">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="mx-auto max-w-[1280px] px-4 pb-20 md:px-8 md:pb-28">
          <div className="overflow-hidden rounded-[28px] bg-[#789894] px-7 py-12 text-center text-white md:rounded-[34px] md:px-10 md:py-16">
            <p className="mv-script text-[44px] leading-none text-white md:text-[72px]">
              hagamos historia
            </p>
            <h2 className="mt-2 font-sans text-[30px] font-semibold uppercase tracking-[0.03em] md:text-[54px]">
              TU DÍA MERECE UNA MIRADA INOLVIDABLE
            </h2>
            <p className="mx-auto mt-6 max-w-[760px] font-sans text-[15px] leading-7 text-white/88 md:text-[18px] md:leading-8">
              Una propuesta visual elegante, sensible y premium para parejas que
              quieren imágenes que realmente se sientan.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contacto" className="mv-button-light">
                Agendar consulta
              </Link>
              <a
                href="https://wa.me/573000000000?text=Hola%20Miles%20Visual,%20quiero%20mi%20cotización"
                target="_blank"
                rel="noopener noreferrer"
                className="mv-button-outline-light"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-black/8 bg-white">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-8">
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
                Foto Estudio
              </Link>
              <Link href="/contacto" className="mv-nav-link">
                Contacto
              </Link>
            </nav>

            <p className="font-sans text-[12px] uppercase tracking-[0.12em] text-black/45">
              © 2026 Miles Visual
            </p>
          </div>
        </footer>
      </main>
    </>
>>>>>>> origin/main
  );
}