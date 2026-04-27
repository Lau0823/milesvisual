"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { Menu, MessageCircle, Send, X } from "lucide-react";

export default function ContactoPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    tipo: "Boda",
    fecha: "",
    mensaje: "",
  });

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

  const whatsappHref = useMemo(() => {
    const text = `Hola Miles Visual, quiero más información.

Nombre: ${form.nombre || "-"}
Teléfono: ${form.telefono || "-"}
Correo: ${form.correo || "-"}
Tipo de sesión: ${form.tipo || "-"}
Fecha estimada: ${form.fecha || "-"}
Mensaje: ${form.mensaje || "-"}`;

    return `https://wa.me/573148112717?text=${encodeURIComponent(text)}`;
  }, [form]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="bg-[var(--mv-cream)] text-[var(--mv-ink)]">
      {/* HERO */}
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

        <div className="relative z-20 flex min-h-[78vh] items-end">
          <div className="mx-auto w-full max-w-[1320px] px-4 pb-14 md:px-8 md:pb-16">
            <p className="mv-script text-[58px] leading-none text-white md:text-[96px]">
              contacto
            </p>
            <h1 className="mt-2 max-w-[780px] text-[34px] font-semibold uppercase leading-[0.94] tracking-[0.03em] text-white md:text-[72px]">
              HABLEMOS DE TU HISTORIA Y DE LA EXPERIENCIA QUE QUIERES CREAR
            </h1>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-[1180px] px-4 py-16 text-center md:px-8 md:py-24">
        <p className="mv-script text-[52px] leading-none text-[var(--mv-gold)] md:text-[84px]">
          agenda
        </p>
        <h2 className="mt-2 text-[28px] font-semibold uppercase tracking-[0.03em] md:text-[48px]">
          CUÉNTANOS LO QUE IMAGINAS
        </h2>
        <p className="mx-auto mt-6 max-w-[760px] text-[15px] leading-8 text-[var(--mv-ink)]/74 md:text-[17px] md:leading-9">
          Completa este formulario y te llevaremos directo a WhatsApp con tu
          mensaje armado. Así podemos responderte más rápido y con más contexto.
        </p>
      </section>

      {/* FORM + INFO */}
      <section className="mx-auto max-w-[1280px] px-4 pb-20 md:px-8 md:pb-28">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="overflow-hidden rounded-[30px] bg-[#789894] px-6 py-8 text-white shadow-[0_22px_60px_rgba(0,0,0,0.08)] md:px-8 md:py-10">
            <p className="mv-script text-[46px] leading-none text-white md:text-[72px]">
              información
            </p>
            <h3 className="mt-2 text-[26px] font-semibold uppercase tracking-[0.03em] md:text-[38px]">
              DATOS DE CONTACTO
            </h3>

            <div className="mt-8 space-y-6">
              <div>
                <p className="text-[12px] uppercase tracking-[0.14em] text-white/70">
                  WhatsApp
                </p>
                <p className="mt-2 text-[18px] font-medium">+57 3148112717</p>
              </div>

              <div>
                <p className="text-[12px] uppercase tracking-[0.14em] text-white/70">
                  Correo
                </p>
                <p className="mt-2 text-[18px] font-medium">milesvisual@gmail.com</p>
              </div>

              <div>
                <p className="text-[12px] uppercase tracking-[0.14em] text-white/70">
                  Ubicación
                </p>
                <p className="mt-2 text-[18px] font-medium">Villavicencio, Colombia</p>
              </div>

              <div>
                <p className="text-[12px] uppercase tracking-[0.14em] text-white/70">
                  Horario de respuesta
                </p>
                <p className="mt-2 text-[18px] font-medium">
                  Lunes a sábado · 8:00 am a 6:00 pm
                </p>
              </div>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-[11px] uppercase tracking-[0.12em] text-[var(--mv-ink)] transition hover:opacity-90"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Ir a WhatsApp
            </a>
          </div>

          <div className="overflow-hidden rounded-[30px] bg-white px-6 py-8 shadow-[0_22px_60px_rgba(0,0,0,0.08)] md:px-10 md:py-10">
            <p className="mv-script text-[46px] leading-none text-[#789894] md:text-[72px]">
              formulario
            </p>
            <h3 className="mt-2 text-[26px] font-semibold uppercase tracking-[0.03em] md:text-[38px]">
              ESCRÍBENOS
            </h3>

            <form onSubmit={onSubmit} className="mt-8 grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-[12px] uppercase tracking-[0.12em] text-[var(--mv-ink)]/60">
                    Nombre
                  </span>
                  <input
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    className="rounded-[18px] border border-black/10 bg-[var(--mv-cream)] px-4 py-4 outline-none transition focus:border-[#789894]"
                    placeholder="Tu nombre"
                    required
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-[12px] uppercase tracking-[0.12em] text-[var(--mv-ink)]/60">
                    Teléfono
                  </span>
                  <input
                    value={form.telefono}
                    onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                    className="rounded-[18px] border border-black/10 bg-[var(--mv-cream)] px-4 py-4 outline-none transition focus:border-[#789894]"
                    placeholder="Tu número"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-[12px] uppercase tracking-[0.12em] text-[var(--mv-ink)]/60">
                    Correo
                  </span>
                  <input
                    type="email"
                    value={form.correo}
                    onChange={(e) => setForm({ ...form, correo: e.target.value })}
                    className="rounded-[18px] border border-black/10 bg-[var(--mv-cream)] px-4 py-4 outline-none transition focus:border-[#789894]"
                    placeholder="correo@email.com"
                    required
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-[12px] uppercase tracking-[0.12em] text-[var(--mv-ink)]/60">
                    Tipo de sesión
                  </span>
                  <select
                    value={form.tipo}
                    onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                    className="rounded-[18px] border border-black/10 bg-[var(--mv-cream)] px-4 py-4 outline-none transition focus:border-[#789894]"
                  >
                    <option>Boda</option>
                    <option>Pre-Boda</option>
                    <option>Foto Estudio</option>
                    <option>Video</option>
                    <option>Otra</option>
                  </select>
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-[12px] uppercase tracking-[0.12em] text-[var(--mv-ink)]/60">
                  Fecha estimada
                </span>
                <input
                  type="date"
                  value={form.fecha}
                  onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                  className="rounded-[18px] border border-black/10 bg-[var(--mv-cream)] px-4 py-4 outline-none transition focus:border-[#789894]"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-[12px] uppercase tracking-[0.12em] text-[var(--mv-ink)]/60">
                  Mensaje
                </span>
                <textarea
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  rows={6}
                  className="resize-none rounded-[18px] border border-black/10 bg-[var(--mv-cream)] px-4 py-4 outline-none transition focus:border-[#789894]"
                  placeholder="Cuéntanos un poco sobre tu evento o tu idea..."
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="submit" className="mv-button-dark">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar a WhatsApp
                </button>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mv-button-outline-dark"
                >
                  Abrir WhatsApp
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>

      <a
        href={whatsappHref}
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