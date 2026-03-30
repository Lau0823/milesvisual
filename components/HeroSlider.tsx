"use client";

import { useEffect, useState } from "react";

type Slide = {
  image: string;
  title: string;
  subtitle: string;
};

type Props = {
  slides: Slide[];
};

export default function HeroSlider({ slides }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={`${slide.image}-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>
      ))}

      <div className="relative z-10 flex h-full items-center justify-center px-5 text-center md:px-8">
        <div className="max-w-[900px] pt-20">
          <p className="mb-4 text-[11px] uppercase tracking-[0.34em] text-white/80 md:text-[12px]">
            Fotografía editorial · bodas · prebodas · estudio
          </p>

          <h1 className="text-5xl font-light leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            {slides[current].title}
          </h1>

          <p className="mx-auto mt-6 max-w-[640px] text-sm leading-7 text-white/85 md:text-lg">
            {slides[current].subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contenido"
              className="border border-white/30 bg-white px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-black transition hover:bg-transparent hover:text-white"
            >
              Ver portafolio
            </a>

            <a
              href="/contact"
              className="border border-white/30 px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-white transition hover:bg-white hover:text-black"
            >
              Contacto
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              index === current ? "bg-white" : "bg-white/40"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}