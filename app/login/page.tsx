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
}