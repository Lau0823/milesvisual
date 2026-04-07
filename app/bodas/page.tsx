"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Slide = {
  id: number;
  image: string;
  alt: string;
};

type GalleryItem = {
  id: number;
  image: string;
  title: string;
  description: string;
};

const heroSlides: Slide[] = [
  { id: 1, image: "https://i.pinimg.com/control1/1200x/5f/3b/2a/5f3b2a1806de0e599003c14c9310c5dd.jpg", alt: "Novios en ceremonia" },
  { id: 2, image: "https://i.pinimg.com/control1/1200x/1c/db/72/1cdb72404a639c1f95574ca567692b35.jpg", alt: "Pareja editorial" },
  { id: 3, image: "https://i.pinimg.com/1200x/54/e1/03/54e103aff53ce485d5a6394ae7f7c6c2.jpg", alt: "Vestido de novia" },
  { id: 4, image: "https://i.pinimg.com/736x/88/1d/63/881d6395afca545fe10dc60a276ccbef.jpg", alt: "Novios caminando" },
  { id: 5, image: "https://i.pinimg.com/736x/a8/90/21/a8902169561a41d45682e0ee8e0aa045.jpg", alt: "Momento íntimo" },
];

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: "https://i.pinimg.com/control1/1200x/24/7e/37/247e37db64dcefefcc4f4fe366219f9e.jpg",
    title: "La espera",
    description:
      "Ese instante antes de verlo todo cambiar. La calma, los nervios y la belleza silenciosa del comienzo.",
  },
  {
    id: 2,
    image: "https://i.pinimg.com/736x/c7/df/04/c7df04506a4ff18e8484aba22c33e290.jpg",
    title: "El sí",
    description:
      "La ceremonia contada desde la emoción real, sin artificios, con una mirada elegante y atemporal.",
  },
  {
    id: 3,
    image: "https://i.pinimg.com/control1/1200x/3c/2b/f5/3c2bf5836164c5115c4169be1c15e8e5.jpg",
    title: "Luz de tarde",
    description:
      "Retratos suaves y editoriales donde la luz acompaña la narrativa y transforma el momento en memoria.",
  },
  {
    id: 4,
    image: "https://i.pinimg.com/control1/1200x/44/0a/be/440abe02ff2cff0f6fce3b0ed3a41e0a.jpg",
    title: "Detalles que hablan",
    description:
      "Texturas, flores, joyas, invitaciones y pequeños objetos que construyen la identidad visual de la boda.",
  },
  {
    id: 5,
    image: "https://i.pinimg.com/control1/1200x/8e/03/69/8e0369af883df7db465c61edc51d2cb5.jpg",
    title: "Mirarse",
    description:
      "Una conexión íntima capturada con naturalidad, elegancia y sensibilidad.",
  },
  {
    id: 6,
    image: "https://i.pinimg.com/control1/736x/28/af/d0/28afd095acc5d962d0529e092726fdd3.jpg",
    title: "La celebración",
    description:
      "La energía de los abrazos, las risas y la fiesta convertidas en imágenes vivas y sofisticadas.",
  },
  {
    id: 7,
    image: "https://i.pinimg.com/1200x/7e/23/2c/7e232cbf4eb38d6a5bfbda44029adba2.jpg",
    title: "Retrato editorial",
    description:
      "Composición, dirección sutil y luz cuidada para crear imágenes que se sientan como una publicación.",
  },
  {
    id: 8,
    image: "https://i.pinimg.com/736x/91/2f/19/912f19fd6acbba8ee188cec1ca72ce59.jpg",
    title: "Lo que queda",
    description:
      "Momentos que parecían pequeños, pero terminan siendo de los más recordados.",
  },
  {
    id: 9,
    image: "https://i.pinimg.com/736x/f9/1e/df/f91edfb9b419d326cb7ba5c3efc9dccc.jpg",
    title: "Final abierto",
    description:
      "Porque una boda no termina ese día; continúa en la memoria, en las imágenes y en la forma en que vuelve a sentirse.",
  },
];

const editorialSections = [
  {
    id: 1,
    eyebrow: "01",
    title: "Más que fotos, una atmósfera",
    text: "La intención no es solo documentar una boda, sino traducirla visualmente: la luz, la elegancia, el silencio antes de entrar, la textura del vestido, el movimiento de las manos, la presencia de quienes aman. Cada imagen busca sentirse refinada, honesta y profundamente viva.",
    imageLarge: "https://i.pinimg.com/736x/85/53/a1/8553a1eb8dc478e2022f76bb82abf5a6.jpg",
    imageSmall: "https://i.pinimg.com/control1/736x/d0/de/fb/d0defbbc7f6b72c5f8f8f7620ad5691a.jpg",
  },
  {
    id: 2,
    eyebrow: "02",
    title: "Una narrativa con sensibilidad editorial",
    text: "Cada historia se construye con equilibrio entre espontaneidad y estética. El resultado es una galería que se siente natural, pero también cuidadosamente compuesta: como un recuerdo íntimo con la elegancia visual de una revista.",
    imageLarge: "https://i.pinimg.com/736x/73/36/6a/73366ac3f08c52a8372affc6858cef54.jpg",
    imageSmall: "https://i.pinimg.com/control1/736x/e1/47/5d/e1475d1926bd6afa386fbfcb76ab1651.jpg",
  },
  {
    id: 3,
    eyebrow: "03",
    title: "Belleza que permanece",
    text: "Las tendencias pasan; la emoción verdadera permanece. Por eso el enfoque está en crear imágenes sobrias, sofisticadas y atemporales, capaces de conservar no solo cómo se veía el día, sino cómo se sentía.",
    imageLarge: "https://i.pinimg.com/736x/74/35/ce/7435ce0750ad47144df829731febc38b.jpg",
    imageSmall: "https://i.pinimg.com/736x/ad/17/5c/ad175c1eaeed667831ddbdb9926b256c.jpg",
  },
];

const experienceCards = [
  {
    title: "Cobertura editorial",
    text: "Una narrativa visual pensada para capturar desde lo íntimo hasta lo grandioso, con una estética refinada.",
  },
  {
    title: "Dirección sutil",
    text: "Acompañamiento delicado para retratos naturales, elegantes y sin rigidez.",
  },
  {
    title: "Detalles con intención",
    text: "Cada elemento de la boda forma parte de la historia: flores, papel, joyería, arquitectura y luz.",
  },
];

export default function BodasPage() {
  const [current, setCurrent] = useState(0);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollToCard = (index: number) => {
    const container = trackRef.current;
    if (!container) return;

    const cards = container.querySelectorAll("[data-slide-card]");
    const target = cards[index] as HTMLElement | undefined;
    if (!target) return;

    const left =
      target.offsetLeft - (container.clientWidth - target.clientWidth) / 2;

    container.scrollTo({
      left,
      behavior: "smooth",
    });

    setCurrent(index);
  };

  const nextSlide = () => {
    const next = (current + 1) % heroSlides.length;
    scrollToCard(next);
  };

  const prevSlide = () => {
    const prev = (current - 1 + heroSlides.length) % heroSlides.length;
    scrollToCard(prev);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (current + 1) % heroSlides.length;
      scrollToCard(next);
    }, 4500);

    return () => clearInterval(interval);
  }, [current]);

  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cards = Array.from(
        container.querySelectorAll("[data-slide-card]")
      ) as HTMLElement[];

      if (!cards.length) return;

      const containerCenter = container.scrollLeft + container.clientWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setCurrent(closestIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (selectedImage && e.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedImage]);

  return (
    <main className="min-h-screen bg-white  text-[#1d1a17]">
      {/* HERO */}
      <section className="bg-[#00291d] text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
          <div className="mb-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-2xl">
              <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-white/55 md:text-xs">
                Weddings
              </p>
              <h1 className="text-3xl font-light uppercase tracking-[0.08em] md:text-5xl lg:text-6xl">
                Weddings & Real Moments
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 md:text-base">
                Una experiencia visual pensada para sentirse como un álbum
                abierto: elegante, íntima y editorial.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                aria-label="Anterior"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 transition hover:bg-white/10"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Siguiente"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 transition hover:bg-white/10"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {heroSlides.map((slide, index) => {
              const isActive = current === index;

              return (
                <article
                  key={slide.id}
                  data-slide-card
                  className={`
                    relative shrink-0 snap-center overflow-hidden rounded-[1.6rem] transition-all duration-500
                    h-[340px] w-[78%]
                    sm:h-[420px] sm:w-[62%]
                    md:h-[520px] md:w-[42%]
                    lg:h-[580px] lg:w-[31%]
                    ${isActive ? "scale-[1.01] opacity-100" : "opacity-80"}
                  `}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </article>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                aria-label={`Ir al slide ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  current === index ? "w-8 bg-white" : "w-2 bg-white/35"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#8c8178] md:text-xs">
              Bodas
            </p>
            <h2 className="mt-3 text-4xl font-light uppercase tracking-[0.12em] md:text-6xl">
              Una historia
              <br />
              contada con belleza
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-base leading-9 text-[#5f5751] md:text-lg">
              Esta página no está pensada solo para mostrar imágenes, sino para
              invitar al usuario a sentir una boda desde dentro: la atmósfera,
              la emoción contenida, la elegancia de los detalles y la presencia
              de cada instante importante.
            </p>
          </div>
        </div>
      </section>

      {/* QUOTE / TESTIMONIO */}
      <section className="mx-auto max-w-5xl px-4 pb-16 md:px-8 md:pb-24">
        <div className="rounded-[2rem] border border-[#e5dfd8] bg-[#f8f6f3] px-6 py-10 md:px-12 md:py-16">
          <p className="text-center text-2xl font-light italic leading-relaxed text-[#2c2723] md:text-4xl">
            “Sentimos que no estábamos viendo solo nuestras fotos, sino la
            memoria completa de cómo se sintió ese día.”
          </p>
          <p className="mt-6 text-center text-xs uppercase tracking-[0.35em] text-[#8a817a]">
            Comentario de una novia
          </p>
        </div>
      </section>

      {/* SECCIONES EDITORIALES */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8 md:pb-24">
        <div className="space-y-20 md:space-y-28">
          {editorialSections.map((section, index) => (
            <div
              key={section.id}
              className={`grid items-center gap-8 md:gap-12 ${
                index % 2 === 0
                  ? "md:grid-cols-[0.75fr_1.25fr]"
                  : "md:grid-cols-[1.25fr_0.75fr]"
              }`}
            >
              <div className={index % 2 === 0 ? "" : "md:order-2"}>
                <p className="text-[11px] uppercase tracking-[0.35em] text-[#8c8178] md:text-xs">
                  {section.eyebrow}
                </p>
                <h3 className="mt-3 text-3xl font-light uppercase tracking-[0.12em] md:text-5xl">
                  {section.title}
                </h3>
                <p className="mt-6 max-w-xl text-sm leading-8 text-[#5f5751] md:text-base">
                  {section.text}
                </p>
              </div>

              <div
                className={`grid gap-4 sm:grid-cols-2 ${
                  index % 2 === 0 ? "" : "md:order-1"
                }`}
              >
                <div className="relative h-[380px] overflow-hidden rounded-[1.8rem] sm:h-[480px] md:h-[560px]">
                  <Image
                    src={section.imageLarge}
                    alt={section.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[240px] overflow-hidden rounded-[1.8rem] sm:mt-16 sm:h-[320px] md:mt-24 md:h-[380px]">
                  <Image
                    src={section.imageSmall}
                    alt={`${section.title} secundaria`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALERÍA */}
      <section className="bg-[#00291d] py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/50 md:text-xs">
              Galería
            </p>
            <h3 className="mt-3 text-3xl font-light uppercase tracking-[0.12em] md:text-5xl">
              Bodas
            </h3>
            <p className="mt-4 text-sm leading-8 text-white/70 md:text-base">
              Una selección de imágenes que abren la puerta a la atmósfera
              completa del día.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group relative h-[340px] overflow-hidden rounded-[1.6rem] text-left sm:h-[380px] lg:h-[420px]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h4 className="text-lg font-light uppercase tracking-[0.12em] text-white">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm text-white/75">
                    Ver imagen y descripción
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCIA */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="mb-10 max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#8c8178] md:text-xs">
            La experiencia
          </p>
          <h3 className="mt-3 text-3xl font-light uppercase tracking-[0.12em] md:text-5xl">
            Pensado para quienes aman la estética y la emoción
          </h3>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {experienceCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[1.8rem] border border-[#e5dfd8] bg-[#f8f6f3] p-6 md:p-8"
            >
              <h4 className="text-xl font-light uppercase tracking-[0.1em] text-[#1f1b18]">
                {card.title}
              </h4>
              <p className="mt-4 text-sm leading-8 text-[#5f5751] md:text-base">
                {card.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-[#f1ede8]">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center md:px-8 md:py-28">
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#8c8178] md:text-xs">
            Último paso
          </p>
          <h3 className="mt-4 text-3xl font-light uppercase tracking-[0.12em] md:text-5xl">
            Para quienes quieren recordar su boda con belleza y verdad
          </h3>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-[#5f5751] md:text-base">
            Si imaginan una boda con una narrativa visual elegante, íntima y
            atemporal, este puede ser el comienzo de algo hermoso.
          </p>

          <button className="mt-8 rounded-full border border-[#1f1b18] px-8 py-3 text-sm uppercase tracking-[0.22em] text-[#1f1b18] transition hover:bg-[#1f1b18] hover:text-white">
            Consultar fecha
          </button>
        </div>
      </section>

      {/* MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative grid max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white lg:grid-cols-[1.2fr_0.8fr]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>

            <div className="relative h-[360px] bg-black sm:h-[520px] lg:h-[90vh] lg:max-h-[90vh]">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#8c8178] md:text-xs">
                Boda
              </p>
              <h4 className="mt-3 text-2xl font-light uppercase tracking-[0.12em] text-[#1f1b18] md:text-3xl">
                {selectedImage.title}
              </h4>
              <p className="mt-6 text-sm leading-8 text-[#5f5751] md:text-base">
                {selectedImage.description}
              </p>

              <button
                onClick={() => setSelectedImage(null)}
                className="mt-8 w-fit rounded-full border border-[#1f1b18] px-6 py-3 text-sm uppercase tracking-[0.18em] text-[#1f1b18] transition hover:bg-[#1f1b18] hover:text-white"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}