"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/15 bg-black/20 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-4 md:px-8">
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/bodas"
            className="text-[11px] uppercase tracking-[0.24em] text-white/85"
          >
            Bodas
          </Link>
          <Link
            href="/prebodas"
            className="text-[11px] uppercase tracking-[0.24em] text-white/85"
          >
            Preboda
          </Link>
          <Link
            href="/estudio"
            className="text-[11px] uppercase tracking-[0.24em] text-white/85"
          >
            Estudio
          </Link>
        </nav>

        <Link href="/" className="text-center leading-none text-white">
          <span className="block text-2xl tracking-tight md:text-4xl">MILES</span>
          <span className="block text-2xl tracking-tight md:text-4xl">VISUAL</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/about"
            className="text-[11px] uppercase tracking-[0.24em] text-white/85"
          >
            Acerca de mí
          </Link>
          <Link
            href="/contact"
            className="text-[11px] uppercase tracking-[0.24em] text-white/85"
          >
            Contacto
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="text-[11px] uppercase tracking-[0.24em] text-white md:hidden"
          aria-label="Abrir menú"
        >
          Menú
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black/85 px-5 py-5 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link
              href="/bodas"
              className="text-[11px] uppercase tracking-[0.24em] text-white/90"
              onClick={() => setOpen(false)}
            >
              Bodas
            </Link>
            <Link
              href="/prebodas"
              className="text-[11px] uppercase tracking-[0.24em] text-white/90"
              onClick={() => setOpen(false)}
            >
              Preboda
            </Link>
            <Link
              href="/estudio"
              className="text-[11px] uppercase tracking-[0.24em] text-white/90"
              onClick={() => setOpen(false)}
            >
              Estudio
            </Link>
            <Link
              href="/about"
              className="text-[11px] uppercase tracking-[0.24em] text-white/90"
              onClick={() => setOpen(false)}
            >
              Acerca de mí
            </Link>
            <Link
              href="/contact"
              className="text-[11px] uppercase tracking-[0.24em] text-white/90"
              onClick={() => setOpen(false)}
            >
              Contacto
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}