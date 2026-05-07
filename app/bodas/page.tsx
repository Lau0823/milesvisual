"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { Menu, X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { useClientStore } from "../../store/useClientStore";

export default function BodasPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<number | string>(0);
  
  const { loadPublicData, settings, plans: displayPlansFull, mediaPosts: mediaPostsFull, isLoaded } = useClientStore();

  useEffect(() => {
    loadPublicData();
  }, [loadPublicData]);

  const displayPlans = useMemo(() => displayPlansFull.filter((p: any) => p.categoria?.toLowerCase().includes('boda')), [displayPlansFull]);
  const bodasGallery = useMemo(() => mediaPostsFull.filter((p: any) => p.category === 'BODAS').map((p: any) => ({ id: p.id, title: p.title, image: p.cloudinaryUrl, description: p.cloudinaryPublicId })), [mediaPostsFull]);

  useEffect(() => {
    if (displayPlans.length > 0 && selectedPlan === 0) {
      setSelectedPlan(displayPlans[0].id);
    }
  }, [displayPlans, selectedPlan]);

  const logoSrc = "/LOGO MILES AMARILLO_Mesa de trabajo 1.png";
  const getSetting = (key: string, defaultValue: string) => settings.find(s => s.key === key)?.value || defaultValue;

  const getOptimizedUrl = (url: string, type: 'image' | 'video' = 'image') => {
    if (!url || !url.includes('cloudinary.com')) return url;
    if (type === 'video') return url.replace('/video/upload/', '/video/upload/f_auto,q_auto,c_scale,w_1280/');
    return url.replace('/upload/', '/upload/f_auto,q_auto/');
  };

  const getPosterUrl = (url: string) => {
    if (!url || !url.includes('cloudinary.com')) return undefined;
    return url.replace('/video/upload/', '/video/upload/f_auto,q_auto,so_0/').replace('.mp4', '.jpg');
  };
  
  let heroVideoSrc = getSetting('bodas_video_url', "https://res.cloudinary.com/dgfp5gcjr/video/upload/v1777429200/VIDEO_3_1_yuof8i.mp4");
  heroVideoSrc = getOptimizedUrl(heroVideoSrc, 'video');

  const getWhatsappLink = (text: string) => {
    const number = getSetting('whatsapp_number', '573148112717');
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  };

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

  const activePlan: any = useMemo(
    () => displayPlans.find((plan: any) => plan.id === selectedPlan) ?? displayPlans[0],
    [selectedPlan, displayPlans]
  );

  const activePhoto =
    selectedPhoto !== null ? bodasGallery[selectedPhoto] : null;

  const prevPhoto = () => {
    if (selectedPhoto === null) return;
    setSelectedPhoto(
      (selectedPhoto - 1 + bodasGallery.length) % bodasGallery.length
    );
  };

  const nextPhoto = () => {
    if (selectedPhoto === null) return;
    setSelectedPhoto((selectedPhoto + 1) % bodasGallery.length);
  };

  if (!isLoaded) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Cargando experiencia...</div>;
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
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMenuOpen(false)}
            />

            <div
              className={`absolute right-0 top-0 flex h-full w-[86%] max-w-[360px] flex-col bg-[var(--mv-cream)] p-6 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
              <div className="flex items-center justify-between">
                <Image
                  src={logoSrc}
                  alt="Miles Visual"
                  width={120}
                  height={60}
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
              BODAS
            </h1>
          </div>
        </div>
      </section>

      {/* FRASE */}
      <section className="mx-auto max-w-[1180px] px-4 py-16 text-center md:px-8 md:py-24">
        <p className="mv-script text-[54px] leading-none text-[var(--mv-gold)] md:text-[92px]">
          Momentos Inolvidables
        </p>
        <h2 className="mt-3 text-[30px] font-semibold uppercase tracking-[0.03em] md:text-[54px]">
          LA FOTO PERFECTA ES AQUELLA QUE CAPTA LO IRREPETIBLE
        </h2>
      </section>

      {/* GRILLA 1 x 6 FULLSCREEN */}
      <section className="space-y-0">
        {bodasGallery.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => setSelectedPhoto(index)}
            className="group relative block min-h-screen w-full overflow-hidden text-left"
          >
            <Image
              src={photo.image}
              alt={photo.title}
              fill
              className="absolute inset-0 object-cover transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,19,20,0.10)_0%,rgba(17,19,20,0.20)_35%,rgba(17,19,20,0.52)_100%)]" />

            <div className="relative z-10 flex min-h-screen items-end">
              <div className="mx-auto w-full max-w-[1320px] px-4 pb-14 md:px-8 md:pb-16">
                <p className="mv-script text-[68px] leading-none text-white/18 md:text-[140px]">
                  bodas
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

      {/* MODAL FOTO */}
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
                <Image
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-center px-6 py-8 md:px-10">
                <p className="mv-script text-[44px] leading-none text-[#789894] md:text-[68px]">
                  bodas
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
            Planes
          </p>
          <h2 className="text-[32px] font-semibold uppercase tracking-[0.03em] md:text-[58px]">
            EXPERIENCIAS DISPONIBLES
          </h2>
        </div>

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

        {activePlan && <div className="overflow-hidden rounded-[30px] bg-white shadow-[0_22px_60px_rgba(0,0,0,0.08)]">
          <div className="grid md:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[360px] md:min-h-[680px]">
              <Image
                src={(activePlan.imagen_url || activePlan.image)}
                alt={activePlan.nombre || activePlan.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="px-6 py-8 md:px-10 md:py-10">
              <p className="mv-script text-[44px] leading-none text-[#789894] md:text-[68px]">
                {activePlan.nombre || activePlan.name}
              </p>
              <p className="mt-2 text-[13px] uppercase tracking-[0.12em] text-[var(--mv-ink)]/55">
                {activePlan.categoria || activePlan.subtitle}
              </p>

              <ul className="mt-7 space-y-3">
                {(activePlan.descripcion ? activePlan.descripcion.split('. ').filter(Boolean) : activePlan.items).map((item: string, idx: number) => (
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
                  {activePlan.precio_base ? "COP " + Number(activePlan.precio_base).toLocaleString() : activePlan.price}
                </p>
                <span className="h-px flex-1 bg-black/10" />
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={getWhatsappLink(`Hola Miles Visual, quiero cotizar el plan ${activePlan.nombre || activePlan.name}`)}
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
        </div>}
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