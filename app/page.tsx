"use client";

import Link from "next/link";
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
];

const plans = [
  {
    id: 1,
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
      {images.map((image, index) => (
        <img
          key={image}
          src={image}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
            currentIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
          }`}
        />
      ))}
      <div className={`relative ${heightClass}`} />
    </div>
  );
}

export default function HomePage() {
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
                </Link>
              </div>
            </div>
          </div>

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
  );
}