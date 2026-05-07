"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { Menu, X, ChevronLeft, ChevronRight, MessageCircle, Instagram, Star } from "lucide-react";
import { useClientStore } from "../store/useClientStore";

// Función de optimización de Cloudinary movida fuera para ser accesible por todos los componentes
const getOptimizedUrl = (url: string, type: 'image' | 'video' = 'image') => {
  if (!url || !url.includes('cloudinary.com')) return url;
  if (type === 'video') {
    // Quitamos br_2m y vc_vp9 para que el inicio sea más fluido (nativo)
    return url.replace('/video/upload/', '/video/upload/f_auto,q_auto,c_scale,w_1280/');
  }
  return url.replace('/upload/', '/upload/f_auto,q_auto/');
};

// Nueva función para generar la imagen de portada del video automáticamente
const getPosterUrl = (url: string) => {
  if (!url || !url.includes('cloudinary.com')) return undefined;
  // Cambiamos /video/upload/ por /video/upload/so_0/ (start offset 0) y la extensión a .jpg
  return url.replace('/video/upload/', '/video/upload/f_auto,q_auto,so_0/').replace('.mp4', '.jpg');
};

const bodasImages = [
  "https://res.cloudinary.com/dgfp5gcjr/image/upload/v1778118632/1_icimdx.jpg",
  "https://res.cloudinary.com/dgfp5gcjr/image/upload/v1778118811/2_b0wn6p.jpg",
  "https://res.cloudinary.com/dgfp5gcjr/image/upload/v1778120052/6_cvfner.jpg",
  "https://res.cloudinary.com/dgfp5gcjr/image/upload/v1778120052/4_nfyvww.jpg",
  "https://res.cloudinary.com/dgfp5gcjr/image/upload/v1778120052/8_iashwf.jpg",
  "https://res.cloudinary.com/dgfp5gcjr/image/upload/v1778120052/3_uaqeks.jpg",
];

const prebodasImages = [
  "/prebodas/WhatsApp Image 2026-04-08 at 5.01.09 PM (1).jpeg",
  "/prebodas/WhatsApp Image 2026-04-08 at 5.01.10 PM (2).jpeg",
  "/prebodas/WhatsApp Image 2026-04-08 at 5.01.11 PM (2).jpeg",
];

const estudioImages = [
  "https://res.cloudinary.com/dgfp5gcjr/image/upload/v1777916404/DSC09548.jpg-squished_n5huzj.jpg",
  "/estudio/WhatsApp Image 2026-04-13 at 12.24.20 PM (2).jpeg",
  "/estudio/WhatsApp Image 2026-04-13 at 12.24.24 PM.jpeg",
];

const plans = [
  {
    id: 1,
    name: "Basic",
    subtitle: "Fotografía",
    price: "$1.500.000",
    image:
      "https://res.cloudinary.com/dgfp5gcjr/image/upload/v1778120054/5_d4xktj.jpg",
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
  whatsappNumber,
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
  whatsappNumber: string;
}) {
  const getWhatsappLink = (text: string) => {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };
  return (
    <section className="relative min-h-screen overflow-hidden">
      {images.map((image, index) => (
        <Image
          key={image}
          src={getOptimizedUrl(image)}
          alt={`${title} ${index + 1}`}
          fill
          priority={current === index}
          sizes="100vw"
          className={`absolute inset-0 object-cover transition-all duration-700 ${current === index ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
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
                  href={getWhatsappLink("Hola Miles Visual, quiero cotizar")}
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
        poster={getPosterUrl(src)}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
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
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [bodasIndex, setBodasIndex] = useState(0);
  const [prebodasIndex, setPrebodasIndex] = useState(0);
  const [estudioIndex, setEstudioIndex] = useState(0);

  const [selectedPlan, setSelectedPlan] = useState(1);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const { loadPublicData, settings, plans: dbPlans, mediaPosts, isLoaded } = useClientStore();

  useEffect(() => {
    loadPublicData();
  }, [loadPublicData]);



  const getSetting = (key: string, defaultValue: string) =>
    settings.find(s => s.key === key)?.value || defaultValue;



  const getWhatsappLink = (text: string) => {
    const number = getSetting('whatsapp_number', '573148112717');
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  };

  const bodasGallery = mediaPosts
    .filter(p => p.category === 'BODAS')
    .map(p => getOptimizedUrl(p.cloudinaryUrl));

  const prebodasGallery = mediaPosts
    .filter(p => p.category === 'PREBODAS')
    .map(p => getOptimizedUrl(p.cloudinaryUrl));

  const estudioGallery = mediaPosts
    .filter(p => p.category === 'ESTUDIO')
    .map(p => getOptimizedUrl(p.cloudinaryUrl));

  // Fallbacks si no hay fotos en la base de datos
  const finalBodasImages = bodasGallery.length > 0 ? bodasGallery : bodasImages;
  const finalPrebodasImages = prebodasGallery.length > 0 ? prebodasGallery : prebodasImages;
  const finalEstudioImages = estudioGallery.length > 0 ? estudioGallery : estudioImages;

  const displayPlans = useMemo(() => {
    const allPlans = dbPlans.length > 0 ? dbPlans : plans;
    const featured = allPlans.filter((p: any) => p.destacado === true);
    // Si hay destacados, mostramos solo esos. Si no hay ninguno, mostramos los 3 primeros como fallback.
    return featured.length > 0 ? featured : allPlans.slice(0, 3);
  }, [dbPlans]);

  const logoSrc = "/LOGO MILES AMARILLO_Mesa de trabajo 1.png";
  const heroVideoSrc = getOptimizedUrl(getSetting('hero_video_url', "https://res.cloudinary.com/dgfp5gcjr/video/upload/v1777429058/VIDEO_1_1_b0wg0m.mp4"), 'video');
  const middleVideoSrc = getOptimizedUrl(getSetting('middle_video_url', "https://res.cloudinary.com/dgfp5gcjr/video/upload/v1778000231/VIDEO_2_1_ggrrzq.mp4"), 'video');

  const activePlan = useMemo(() => {
    return displayPlans.find((p) => p.id === selectedPlan) || displayPlans[0];
  }, [selectedPlan, displayPlans]);

  useEffect(() => {
    if (isLoaded && displayPlans.length > 0) {
      setSelectedPlan(displayPlans[0].id);
    }
  }, [isLoaded, displayPlans]);

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

  if (!isLoaded) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Cargando experiencias...</div>;
  }

  return (
    <main className="bg-[var(--mv-cream)] text-[var(--mv-ink)]">
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden bg-black">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideoSrc}
          poster={getPosterUrl(heroVideoSrc)}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
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
            <Image
              src={logoSrc}
              alt="Miles Visual"
              width={220}
              height={190}
              priority
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
            className={`fixed inset-0 z-50 transition ${menuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
              }`}
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setMenuOpen(false)} />

            <div
              className={`absolute right-0 top-0 flex h-full w-[86%] max-w-[360px] flex-col bg-[var(--mv-cream)] p-6 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
              <div className="flex items-center justify-between">
                <Image src={logoSrc} alt="Miles Visual" width={100} height={60} className="h-[60px] w-auto object-contain" />
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
            <Image
              src={getOptimizedUrl(getSetting('about_image_1', "https://res.cloudinary.com/dgfp5gcjr/image/upload/v1777471870/WhatsApp_Image_2026-04-13_at_12.24.20_PM_1_tooe7y.jpg"))}
              alt="Fotógrafo 1"
              width={400}
              height={500}
              className="absolute left-0 top-0 h-[72%] w-[62%] rounded-[30px] object-cover shadow-[0_22px_60px_rgba(0,0,0,0.10)]"
            />
            <Image
              src={getOptimizedUrl(getSetting('about_image_2', "https://res.cloudinary.com/dgfp5gcjr/image/upload/v1777471868/WhatsApp_Image_2026-04-13_at_12.24.19_PM_qibzhs.jpg"))}
              alt="Fotógrafo 2"
              width={400}
              height={500}
              className="absolute bottom-0 right-0 h-[72%] w-[62%] rounded-[30px] object-cover shadow-[0_22px_60px_rgba(0,0,0,0.10)]"
            />
          </div>

          <div>
            <p className="text-[34px] font-semibold uppercase leading-none tracking-[0.03em] md:text-[62px]">
              {getSetting('about_title_top', '¿QUIÉNES')}
            </p>
            <p className="mv-script -mt-1 text-[56px] leading-none text-[var(--mv-sage)] md:text-[92px]">
              {getSetting('about_title_bottom', 'SOMOS?')}
            </p>

            <p className="mt-8 max-w-[680px] text-[15px] leading-8 text-[var(--mv-ink)]/74 md:text-[17px] md:leading-9">
              {getSetting('about_text_1', 'Mi nombre es Miles Esteban Morales Andrade, fotógrafo y productor audiovisual de bodas colombiano, establecido en la ciudad de Villavicencio, amante y apasionado por este arte que es la fotografía.')}
            </p>

            <p className="mt-5 max-w-[680px] text-[15px] leading-8 text-[var(--mv-ink)]/74 md:text-[17px] md:leading-9">
              {getSetting('about_text_2', 'Nos dedicamos a plasmar recuerdos con calidad y creatividad para toda la vida. Somos un equipo capacitado y enfocado en brindar una experiencia única y diferente en cada evento que cubrimos.')}
            </p>
          </div>
        </div>
      </section>

      {/* BODAS */}
      <FullscreenSlider
        title="BODAS"
        script="Inolvidables"
        eyebrow="Momentos inolvidables"
        images={finalBodasImages}
        current={bodasIndex}
        onPrev={() =>
          setBodasIndex((prev) => (prev - 1 + finalBodasImages.length) % finalBodasImages.length)
        }
        onNext={() => setBodasIndex((prev) => (prev + 1) % finalBodasImages.length)}
        galleryHref="/bodas"
        quote="Coberturas con una mirada elegante, emocional y cinematográfica para contar tu historia con belleza y verdad."
        whatsappNumber={getSetting('whatsapp_number', '573148112717')}
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
        images={finalPrebodasImages}
        current={prebodasIndex}
        onPrev={() =>
          setPrebodasIndex((prev) => (prev - 1 + finalPrebodasImages.length) % finalPrebodasImages.length)
        }
        onNext={() => setPrebodasIndex((prev) => (prev + 1) % finalPrebodasImages.length)}
        galleryHref="/prebodas"
        quote="Sesiones delicadas y editoriales para retratar la complicidad, la atmósfera y la emoción antes del gran día."
        whatsappNumber={getSetting('whatsapp_number', '573148112717')}
      />

      {/* FOTO ESTUDIO */}
      <FullscreenSlider
        title="FOTO ESTUDIO"
        script="Esencia"
        eyebrow="Luz y detalle"
        images={finalEstudioImages}
        current={estudioIndex}
        onPrev={() =>
          setEstudioIndex((prev) => (prev - 1 + finalEstudioImages.length) % finalEstudioImages.length)
        }
        onNext={() => setEstudioIndex((prev) => (prev + 1) % finalEstudioImages.length)}
        galleryHref="/estudio"
        quote="Retratos y piezas visuales pensadas desde la dirección, la estética y una presencia visual más editorial."
        whatsappNumber={getSetting('whatsapp_number', '573148112717')}
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

        {/* LAS TABS VISIBLES */}
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-5">
          {displayPlans.map((plan: any) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`rounded-[18px] px-4 py-4 text-center text-[12px] font-medium uppercase tracking-[0.12em] transition ${selectedPlan === plan.id
                ? "bg-[#789894] text-white shadow-lg"
                : "bg-white text-[var(--mv-ink)] shadow-sm"
                }`}
            >
              {plan.nombre || plan.name}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-[30px] bg-white shadow-[0_22px_60px_rgba(0,0,0,0.08)]">
          <div className="grid md:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[360px] md:min-h-[680px]">
              <Image
                src={getOptimizedUrl(activePlan.imagen_url || activePlan.image)}
                alt={activePlan.nombre || activePlan.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="absolute inset-0 object-cover"
              />
            </div>

            <div className="px-6 py-8 md:px-10 md:py-10">
              {(() => {
                let itemsList = activePlan.items;
                if (!itemsList && activePlan.descripcion) {
                  try { itemsList = JSON.parse(activePlan.descripcion); } catch (e) { itemsList = [activePlan.descripcion]; }
                }

                return (
                  <>
                    <p className="mv-script text-[44px] leading-none text-[#789894] md:text-[68px]">
                      {activePlan.nombre || activePlan.name}
                    </p>
                    <p className="mt-2 text-[13px] uppercase tracking-[0.12em] text-[var(--mv-ink)]/55">
                      {activePlan.subtitulo || activePlan.categoria || activePlan.subtitle}
                    </p>

                    <ul className="mt-7 space-y-3">
                      {(itemsList || []).map((item: string, idx: number) => (
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
                        $ {activePlan.precio_base ? Number(activePlan.precio_base).toLocaleString() : activePlan.price}
                      </p>
                      <span className="h-px flex-1 bg-black/10" />
                    </div>
                  </>
                );
              })()}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={getWhatsappLink(`Hola Miles Visual, quiero cotizar el plan ${(activePlan as any).nombre || (activePlan as any).name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mv-button-dark"
                >
                  Cotizar
                </a>
                <Link href="/bodas" className="mv-button-outline-dark">
                  Ver galería
                </Link>
              </div>
            </div>
          </div>
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
              href={getWhatsappLink("Hola Miles Visual")}
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
            <Image
              src={testimonials[testimonialIndex].image}
              alt={testimonials[testimonialIndex].name}
              width={80}
              height={80}
              className="mx-auto rounded-full object-cover"
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
        href={getWhatsappLink("Hola Miles Visual")}
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
