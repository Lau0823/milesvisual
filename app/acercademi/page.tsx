"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";

const heroPhotos = [
  "/Miles/WhatsApp Image 2026-04-13 at 12.24.19 PM.jpeg",
  "/Miles/WhatsApp Image 2026-04-13 at 12.24.20 PM (1).jpeg",
];

const articleGridPhotos = [
  "/estudio/WhatsApp Image 2026-04-13 at 12.24.20 PM (2).jpeg",
  "/estudio/WhatsApp Image 2026-04-13 at 12.24.20 PM (3).jpeg",
  "/estudio/WhatsApp Image 2026-04-13 at 12.24.21 PM (4).jpeg",
];

export default function AcercaDeMiPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const logoSrc = "/LOGO MILES AMARILLO_Mesa de trabajo 1.png";
  const heroVideoSrc = "/VIDEO 4.mp4";

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

  return (
    <main className="bg-[var(--mv-cream)] text-[var(--mv-ink)]">
      <section className="relative min-h-[78vh] overflow-hidden bg-black">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,20,0.14)_0%,rgba(7,16,20,0.24)_38%,rgba(7,16,20,0.54)_100%)]" />

        <header className="relative z-30 mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 py-6 md:px-8 md:py-8">
          <nav className="hidden items-center gap-8 xl:flex">
            {navLeft.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mv-nav-link-light"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            className="absolute left-1/2 top-6 z-30 -translate-x-1/2"
          >
            <img
              src={logoSrc}
              alt="Miles Visual"
              className="h-[120px] w-auto max-w-[82vw] object-contain sm:h-[150px] md:h-[190px] lg:h-[220px]"
            />
          </Link>

          <nav className="hidden items-center gap-8 xl:flex">
            {navRight.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mv-nav-link-light"
              >
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

        <div className="relative z-20 flex min-h-[78vh] items-end">
          <div className="mx-auto w-full max-w-[1320px] px-4 pb-14 md:px-8 md:pb-16">
            
            <h1 className="  mt-2 max-w-[860px] text-[34px] font-semibold uppercase leading-[0.94] tracking-[0.03em] text-white md:text-[72px]">
              ACERCA DE MILES VISUAL
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[30px] bg-white shadow-[0_22px_60px_rgba(0,0,0,0.08)]">
              <img
                src={heroPhotos[0]}
                alt="Miles Visual 1"
                className="h-[520px] w-full object-cover"
              />
            </div>

            <div className="overflow-hidden rounded-[30px] bg-white shadow-[0_22px_60px_rgba(0,0,0,0.08)]">
              <img
                src={heroPhotos[1]}
                alt="Miles Visual 2"
                className="h-[360px] w-full object-cover"
              />
            </div>
          </div>

          <article className="max-w-[760px]">
            <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--mv-ink)]/50">
              artículo / perfil / visión
            </p>

            <p className="mv-script mt-4 text-[54px] leading-none text-[#789894] md:text-[84px]">
              Miles Visual
            </p>

            <h2 className="mt-3 text-[30px] font-semibold uppercase tracking-[0.03em] md:text-[52px]">
              UNA MIRADA QUE CONVIERTE MOMENTOS EN MEMORIA VISUAL
            </h2>

            <div className="mt-8 space-y-6 text-[15px] leading-8 text-[var(--mv-ink)]/78 md:text-[17px] md:leading-9">
              <p>
                Miles Visual nace desde la sensibilidad por la imagen, la emoción
                y la narrativa estética. Detrás del proyecto está Miles Esteban
                Morales Andrade, fotógrafo y productor audiovisual colombiano,
                establecido en Villavicencio, cuya visión creativa se centra en
                capturar recuerdos con una identidad visual elegante, emocional y
                atemporal.
              </p>

              <p>
                Su trabajo no busca solamente hacer fotos bonitas. Busca crear
                una experiencia, una atmósfera y una forma de mirar que convierta
                cada boda, cada retrato y cada sesión en una pieza visual con
                carácter. En sus imágenes conviven la belleza editorial, la calma
                de la dirección artística y la honestidad de los momentos reales.
              </p>

              <p>
                Miles entiende que cada historia necesita una estética propia.
                Por eso trabaja desde el detalle, la composición, la luz y la
                emoción, ofreciendo no solo fotografía y audiovisual, sino una
                experiencia completa pensada para quienes quieren recordar con
                elegancia y profundidad.
              </p>

              
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contacto" className="mv-button-dark">
                Agendar consulta
              </Link>
              <a
                href="https://wa.me/573148112717?text=Hola%20Miles%20Visual"
                target="_blank"
                rel="noopener noreferrer"
                className="mv-button-outline-dark"
              >
                WhatsApp
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-20 md:px-8 md:pb-28">
        <div className="mb-10 text-center">
          <p className="mv-script text-[48px] leading-none text-[var(--mv-gold)] md:text-[76px]">
            Retratos
          </p>
          <h3 className="mt-2 text-[28px] font-semibold uppercase tracking-[0.03em] md:text-[42px]">
            TRES MIRADAS DE SU UNIVERSO VISUAL
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {articleGridPhotos.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[28px] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
            >
              <img
                src={image}
                alt={`Miles Visual ${index + 1}`}
                className="h-[420px] w-full object-cover transition duration-700 hover:scale-[1.04]"
              />
            </div>
          ))}
        </div>
      </section>

      <a
        href="https://wa.me/573148112717text=Hola%20Miles%20Visual"
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