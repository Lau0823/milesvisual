<<<<<<< HEAD
"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Menu, X } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // NextAuth states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
      setIsLoading(false);
    } else {
      router.push("/admin");
    }
  };

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

              <form onSubmit={handleLogin} className="mt-8 grid gap-5">
                {error && (
                  <div className="bg-red-100 border border-red-200 text-red-600 text-xs p-3 rounded-xl">
                    {error}
                  </div>
                )}
                <label className="grid gap-2">
                  <span className="text-[12px] uppercase tracking-[0.12em] text-[var(--mv-ink)]/60">
                    Correo
                  </span>
                  <div className="flex items-center rounded-[18px] border border-black/10 bg-[var(--mv-cream)] px-4">
                    <Mail className="h-4 w-4 text-[var(--mv-ink)]/45" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                <button disabled={isLoading} type="submit" className="mv-button-dark disabled:opacity-50">
                  {isLoading ? 'Ingresando...' : 'Ingresar'}
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
=======
"use client";

import Link from "next/link";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useState } from "react";

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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main
      className={`${serif.variable} ${sans.variable} relative min-h-screen overflow-hidden bg-[#0a0a0a] font-sans text-[#f4efe7]`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/f2/0b/7f/f20b7f979cd5f1576c168686047669de.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/35 to-black/70" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="flex items-center justify-between px-6 py-6 sm:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white transition hover:bg-white hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>

          <div className="font-serif text-2xl tracking-[0.18em] text-white sm:text-3xl">
            Miles Visual
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
          <div className="w-full max-w-md rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">
              Acceso privado
            </p>

            <h1 className="mt-4 font-serif text-4xl font-medium tracking-[-0.04em] text-white sm:text-5xl">
              Login
            </h1>

            <p className="mt-4 text-sm leading-7 text-white/65">
              Ingresa a tu panel con una experiencia visual limpia, elegante y
              en sintonía con el sitio.
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.28em] text-white/50">
                  Correo
                </label>
                <input
                  type="email"
                  placeholder="tuemail@ejemplo.com"
                  className="w-full rounded-full border border-white/15 bg-black/20 px-5 py-3 text-sm text-white outline-none placeholder:text-white/35 transition focus:border-white/35"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] uppercase tracking-[0.28em] text-white/50">
                  Contraseña
                </label>
                <div className="flex items-center rounded-full border border-white/15 bg-black/20 px-5 py-3 transition focus-within:border-white/35">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="ml-3 text-white/55 transition hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 text-xs text-white/55">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="accent-white" />
                  Recordarme
                </label>

                <button
                  type="button"
                  className="transition hover:text-white"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition duration-300 hover:scale-[1.02]"
              >
                Iniciar sesión
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-white/55">
              ¿No tienes acceso?{" "}
              <button className="text-white transition hover:text-white/80">
                Solicitar ingreso
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
>>>>>>> origin/main
}