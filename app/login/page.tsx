"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Menu, X } from "lucide-react";

export default function LoginPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const logoSrc = "/LOGO MILES AMARILLO_Mesa de trabajo 1.png";
  const heroVideoSrc = "/VIDEO 3 .mp4";

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
      <section className="relative min-h-screen overflow-hidden bg-black">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,20,0.16)_0%,rgba(7,16,20,0.28)_38%,rgba(7,16,20,0.62)_100%)]" />

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

        <div className="relative z-20 flex min-h-screen items-center justify-center px-4 py-24 md:px-8">
          <div className="grid w-full max-w-[1100px] overflow-hidden rounded-[30px] bg-white/12 backdrop-blur-md shadow-[0_22px_60px_rgba(0,0,0,0.22)] md:grid-cols-[0.95fr_1.05fr]">
            <div className="hidden min-h-[640px] md:block">
              <img
                src="/prebodas/WhatsApp Image 2026-04-08 at 5.01.11 PM (2).jpeg"
                alt="Miles Visual Login"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="bg-white/90 px-6 py-10 md:px-10 md:py-12">
              <p className="mv-script text-[48px] leading-none text-[#789894] md:text-[76px]">
                login
              </p>
              <h1 className="mt-2 text-[28px] font-semibold uppercase tracking-[0.03em] md:text-[42px]">
                ACCEDE A TU ESPACIO
              </h1>
              <p className="mt-5 max-w-[520px] text-[15px] leading-8 text-[var(--mv-ink)]/75 md:text-[17px] md:leading-9">
                Un acceso con la misma estética del sitio: limpio, elegante y
                pensado para mantener la experiencia visual de Miles Visual.
              </p>

              <form className="mt-8 grid gap-5">
                <label className="grid gap-2">
                  <span className="text-[12px] uppercase tracking-[0.12em] text-[var(--mv-ink)]/60">
                    Correo
                  </span>
                  <div className="flex items-center rounded-[18px] border border-black/10 bg-[var(--mv-cream)] px-4">
                    <Mail className="h-4 w-4 text-[var(--mv-ink)]/45" />
                    <input
                      type="email"
                      placeholder="correo@email.com"
                      className="w-full bg-transparent px-3 py-4 outline-none"
                    />
                  </div>
                </label>

                <label className="grid gap-2">
                  <span className="text-[12px] uppercase tracking-[0.12em] text-[var(--mv-ink)]/60">
                    Contraseña
                  </span>
                  <div className="flex items-center rounded-[18px] border border-black/10 bg-[var(--mv-cream)] px-4">
                    <Lock className="h-4 w-4 text-[var(--mv-ink)]/45" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Tu contraseña"
                      className="w-full bg-transparent px-3 py-4 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-[var(--mv-ink)]/50"
                      aria-label="Mostrar u ocultar contraseña"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </label>

                <div className="flex items-center justify-between text-[13px] text-[var(--mv-ink)]/65">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-[#789894]" />
                    Recuérdame
                  </label>

                  <Link href="#" className="hover:text-[var(--mv-ink)]">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                <button type="submit" className="mv-button-dark">
                  Ingresar
                </button>

                <div className="text-center text-[14px] text-[var(--mv-ink)]/65">
                  ¿Todavía no tienes acceso?{" "}
                  <Link href="/contacto" className="text-[#789894]">
                    Solicítalo aquí
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}