"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Category = "Bodas" | "Retrato" | "Editorial" | "Eventos";

type PhotoItem = {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  image: string;
};

type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const categories: {
  name: Category;
  cover: string;
  description: string;
}[] = [
  {
    name: "Bodas",
    cover:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80",
    description: "Historias emotivas, elegantes y atemporales.",
  },
  {
    name: "Retrato",
    cover:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=80",
    description: "Presencia, identidad y dirección visual premium.",
  },
  {
    name: "Editorial",
    cover:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=80",
    description: "Imágenes aspiracionales con estética de campaña.",
  },
  {
    name: "Eventos",
    cover:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=80",
    description: "Cobertura visual con energía, detalle y emoción.",
  },
];

const photos: PhotoItem[] = [
  {
    id: "bodas-1",
    title: "Bodas / ceremonia",
    subtitle: "Momentos irrepetibles contados con elegancia.",
    category: "Bodas",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "bodas-2",
    title: "Bodas / celebración",
    subtitle: "Emoción real y narrativa visual.",
    category: "Bodas",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "bodas-3",
    title: "Bodas / detalles",
    subtitle: "Luz, textura y memoria en pequeños momentos.",
    category: "Bodas",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "bodas-4",
    title: "Bodas / fiesta",
    subtitle: "La energía de la noche capturada con estilo.",
    category: "Bodas",
    image:
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "bodas-5",
    title: "Bodas / pareja",
    subtitle: "Retratos emotivos con una estética atemporal.",
    category: "Bodas",
    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1400&q=80",
  },

  {
    id: "retrato-1",
    title: "Retrato / estudio",
    subtitle: "Presencia, identidad y dirección visual.",
    category: "Retrato",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "retrato-2",
    title: "Retrato / lifestyle",
    subtitle: "Una imagen más íntima y auténtica.",
    category: "Retrato",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "retrato-3",
    title: "Retrato / black",
    subtitle: "Contraste, carácter y una mirada poderosa.",
    category: "Retrato",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "retrato-4",
    title: "Retrato / soft light",
    subtitle: "Minimalismo y sensibilidad en una sola toma.",
    category: "Retrato",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "retrato-5",
    title: "Retrato / creative",
    subtitle: "Estética editorial para marca personal.",
    category: "Retrato",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1400&q=80",
  },

  {
    id: "editorial-1",
    title: "Editorial / campaña",
    subtitle: "Una estética cinematográfica para marcas y talento.",
    category: "Editorial",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "editorial-2",
    title: "Editorial / fashion",
    subtitle: "Visuales premium con intención de marca.",
    category: "Editorial",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "editorial-3",
    title: "Editorial / magazine",
    subtitle: "Una narrativa visual más artística y sofisticada.",
    category: "Editorial",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "editorial-4",
    title: "Editorial / monochrome",
    subtitle: "Fuerza visual con una dirección minimalista.",
    category: "Editorial",
    image:
      "https://images.unsplash.com/photo-1500336624523-d727130c3328?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "editorial-5",
    title: "Editorial / campaign portrait",
    subtitle: "Imagen aspiracional para marcas y talento.",
    category: "Editorial",
    image:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=1400&q=80",
  },

  {
    id: "eventos-1",
    title: "Eventos / social",
    subtitle: "Cobertura visual con emoción y ritmo.",
    category: "Eventos",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "eventos-2",
    title: "Eventos / premium",
    subtitle: "Ambiente, energía y detalle en cada toma.",
    category: "Eventos",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "eventos-3",
    title: "Eventos / stage",
    subtitle: "Luces, atmósfera y narrativa de escena.",
    category: "Eventos",
    image:
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "eventos-4",
    title: "Eventos / crowd",
    subtitle: "Instantes espontáneos que cuentan el ambiente.",
    category: "Eventos",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "eventos-5",
    title: "Eventos / gala",
    subtitle: "Elegancia documental para experiencias premium.",
    category: "Eventos",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80",
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Camila & Juan",
    role: "Boda destino",
    quote:
      "La experiencia fue impecable. Cada imagen se sintió editorial, emotiva y demasiado elegante.",
  },
  {
    name: "Valentina R.",
    role: "Marca personal",
    quote:
      "No fueron solo fotos: fue dirección visual, presencia y una estética que elevó mi marca.",
  },
  {
    name: "Casa Aurea",
    role: "Campaña editorial",
    quote:
      "Miles Visual entendió perfecto el tono premium que queríamos. El resultado se sintió de campaña internacional.",
  },
];

const brands = ["AUREA", "LUMEN", "VELA", "NOVA", "ETEREA", "MONTE"];

export default function Page() {
  const whatsapp =
    "https://wa.me/573102345742?text=Hola%20Miles%20Visual%2C%20quiero%20reservar%20una%20sesi%C3%B3n";

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const currentCategoryPhotos = useMemo(() => {
    if (!activeCategory) return [];
    return photos.filter((photo) => photo.category === activeCategory);
  }, [activeCategory]);

  const selectedPhoto = useMemo(() => {
    if (!selectedPhotoId) return null;
    return photos.find((photo) => photo.id === selectedPhotoId) ?? null;
  }, [selectedPhotoId]);

  const selectedPhotoCategoryPhotos = useMemo(() => {
    if (!selectedPhoto) return [];
    return photos.filter((photo) => photo.category === selectedPhoto.category);
  }, [selectedPhoto]);

  const selectedPhotoIndex = useMemo(() => {
    if (!selectedPhoto) return -1;
    return selectedPhotoCategoryPhotos.findIndex(
      (photo) => photo.id === selectedPhoto.id
    );
  }, [selectedPhoto, selectedPhotoCategoryPhotos]);

  const openCategory = (category: Category) => {
    setActiveCategory(category);
  };

  const backToCategories = () => {
    setActiveCategory(null);
  };

  const openPhoto = (photoId: string) => {
    setSelectedPhotoId(photoId);
  };

  const closePhoto = () => {
    setSelectedPhotoId(null);
  };

  const goToPreviousPhoto = () => {
    if (!selectedPhoto || selectedPhotoCategoryPhotos.length === 0) return;

    const prevIndex =
      selectedPhotoIndex === 0
        ? selectedPhotoCategoryPhotos.length - 1
        : selectedPhotoIndex - 1;

    setSelectedPhotoId(selectedPhotoCategoryPhotos[prevIndex].id);
  };

  const goToNextPhoto = () => {
    if (!selectedPhoto || selectedPhotoCategoryPhotos.length === 0) return;

    const nextIndex =
      selectedPhotoIndex === selectedPhotoCategoryPhotos.length - 1
        ? 0
        : selectedPhotoIndex + 1;

    setSelectedPhotoId(selectedPhotoCategoryPhotos[nextIndex].id);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedPhoto) {
          closePhoto();
          return;
        }
      }

      if (!selectedPhoto) return;

      if (event.key === "ArrowLeft") {
        goToPreviousPhoto();
      }

      if (event.key === "ArrowRight") {
        goToNextPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto, selectedPhotoIndex, selectedPhotoCategoryPhotos]);

  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedPhoto]);

  return (
    <main className="relative overflow-x-hidden bg-neutral-950 text-white selection:bg-white selection:text-black">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950"
      >
        <div className="text-center">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 220 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto h-px bg-white/70"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mt-5 text-xs uppercase tracking-[0.45em] text-neutral-400"
          >
            Miles Visual
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        className="pointer-events-none fixed inset-0 z-0 hidden md:block"
        animate={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.08), transparent 40%)`,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.15 }}
      />

      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1800&q=80"
            alt="Miles Visual hero"
            fill
            priority
            className="object-cover opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_22%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/55 to-neutral-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-transparent to-neutral-950/40" />
          <motion.div
            animate={{ y: [0, -20, 0], opacity: [0.45, 0.6, 0.45] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            className="absolute -left-10 top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0], opacity: [0.18, 0.3, 0.18] }}
            transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
            className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl"
          />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-16 lg:px-10">
          <div className="grid w-full gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <motion.div {...fadeUp} className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-neutral-300 backdrop-blur-md"
              >
                Fotografía premium • Bogotá / Colombia
              </motion.div>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: 70 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  className="text-6xl font-semibold tracking-[-0.08em] sm:text-8xl lg:text-[8.7rem]"
                >
                  MILES
                  <span className="block bg-gradient-to-r from-white via-neutral-300 to-neutral-500 bg-clip-text text-transparent">
                    VISUAL
                  </span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mt-8 max-w-2xl text-lg leading-8 text-neutral-300 sm:text-xl"
              >
                Fotografía con una mirada cinematográfica. Cada imagen está
                pensada para sentirse exclusiva, emocional y memorable.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <a
                  href="#portfolio"
                  className="group relative overflow-hidden rounded-full border border-white/20 px-7 py-3 text-sm font-medium transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                    Ver portafolio
                  </span>
                  <span className="absolute inset-0 translate-y-full bg-white transition-transform duration-500 ease-out group-hover:translate-y-0" />
                </a>

                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative overflow-hidden rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                    Reservar sesión
                  </span>
                  <span className="absolute inset-0 translate-y-full bg-emerald-400 transition-transform duration-500 ease-out group-hover:translate-y-0" />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              {...fadeUp}
              className="grid gap-4"
              transition={{
                duration: 1,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              <motion.div
                whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
                transition={{ duration: 0.4 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl"
              >
                <div className="relative h-[460px] overflow-hidden rounded-[1.5rem] border border-white/10">
                  <Image
                    src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=80"
                    alt="Preview editorial"
                    fill
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                        Featured frame
                      </p>
                      <p className="mt-2 text-lg font-medium">
                        Dirección editorial premium
                      </p>
                    </div>
                    <div className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-neutral-300 backdrop-blur-md">
                      2026
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["+120", "sesiones realizadas"],
                  ["Premium", "dirección visual"],
                  ["1:1", "acompañamiento creativo"],
                ].map(([value, label]) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -6 }}
                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md"
                  >
                    <div className="text-2xl font-semibold tracking-tight">
                      {value}
                    </div>
                    <div className="mt-1 text-sm text-neutral-400">{label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:flex"
        >
          <a
            href="#portfolio"
            className="flex flex-col items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-neutral-400"
          >
            Scroll
            <span className="flex h-12 w-7 items-start justify-center rounded-full border border-white/15 p-1">
              <motion.span
                animate={{ y: [0, 18, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  ease: "easeInOut",
                }}
                className="h-2.5 w-2.5 rounded-full bg-white"
              />
            </span>
          </a>
        </motion.div>
      </section>

      <section className="relative overflow-hidden py-10">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.04),transparent)]" />
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: [0, -900] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="flex whitespace-nowrap text-[13vw] font-semibold uppercase tracking-[-0.06em] text-white/[0.05]"
        >
          <span className="pr-24">
            Miles Visual • Premium Photography • Cinematic Frames • Luxury
            Portraits •
          </span>
          <span className="pr-24">
            Miles Visual • Premium Photography • Cinematic Frames • Luxury
            Portraits •
          </span>
        </motion.div>
      </section>

      <motion.section
        {...fadeUp}
        className="mx-auto max-w-7xl px-6 py-24 lg:px-10"
      >
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
            <div className="relative h-[560px] overflow-hidden rounded-[2rem]">
              <Image
                src="https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1400&q=80"
                alt="Sobre Miles Visual"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-flex rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-neutral-300 backdrop-blur-md">
                  About the vision
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Sobre Miles Visual
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Dirección visual para imágenes que se sientan exclusivas.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
              Miles Visual trabaja cada sesión como una pieza editorial:
              composición, emoción, luz y una estética cuidada hasta el detalle.
              La intención no es solo documentar, sino construir una atmósfera
              visual que eleve la percepción de cada historia, persona o marca.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Estilo", "Cinematográfico y editorial"],
                ["Enfoque", "Experiencia premium"],
                ["Proceso", "Dirección 1:1"],
                ["Resultado", "Imágenes memorables"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="text-sm text-neutral-500">{label}</div>
                  <div className="mt-2 text-base font-medium text-white">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <section id="portfolio" className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <motion.div
          {...fadeUp}
          className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Portafolio
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              {activeCategory
                ? `${activeCategory} · 5 fotos destacadas`
                : "Selecciona una categoría"}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-300">
              {activeCategory
                ? "Haz clic en cualquier foto para verla grande y navegar entre imágenes."
                : "Elige una categoría para ver una selección clara y directa de 5 fotos."}
            </p>
          </div>

          {activeCategory ? (
            <button
              onClick={backToCategories}
              className="inline-flex w-fit rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-black"
            >
              ← Volver a categorías
            </button>
          ) : null}
        </motion.div>

        {!activeCategory ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                onClick={() => openCategory(category.name)}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900 text-left"
              >
                <div className="relative h-[480px] overflow-hidden">
                  <Image
                    src={category.cover}
                    alt={category.name}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-white backdrop-blur-md">
                    Ver 5 fotos
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="mb-3 inline-flex rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-neutral-300 backdrop-blur-md">
                      Categoría
                    </div>
                    <h3 className="text-3xl font-semibold tracking-tight">
                      {category.name}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-300">
                      {category.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <div>
            <div className="mb-8 flex flex-wrap gap-3">
              {categories.map((category) => {
                const isActive = activeCategory === category.name;

                return (
                  <button
                    key={category.name}
                    onClick={() => openCategory(category.name)}
                    className={`rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "border-white bg-white text-black"
                        : "border-white/15 bg-white/5 text-white hover:bg-white hover:text-black"
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {currentCategoryPhotos.map((photo, index) => (
                <motion.button
                  key={photo.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  onClick={() => openPhoto(photo.id)}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900 text-left"
                >
                  <div className="relative h-[420px] overflow-hidden">
                    <Image
                      src={photo.image}
                      alt={photo.title}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent opacity-90" />

                    <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-white backdrop-blur-md">
                      Abrir foto
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <div className="mb-3 inline-flex rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-neutral-300 backdrop-blur-md">
                        {photo.category}
                      </div>
                      <h3 className="text-2xl font-semibold tracking-tight">
                        {photo.title}
                      </h3>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-300">
                        {photo.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </section>

      <motion.section
        {...fadeUp}
        className="mx-auto max-w-7xl px-6 py-24 lg:px-10"
      >
        <div className="grid gap-6 lg:grid-cols-4">
          {[
            "Fotografía de bodas",
            "Retrato profesional",
            "Editorial y moda",
            "Eventos privados",
          ].map((service, index) => (
            <motion.div
              key={service}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:bg-white/[0.06]"
            >
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                0{index + 1}
              </div>
              <h3 className="mt-6 text-xl font-medium tracking-tight">
                {service}
              </h3>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        {...fadeUp}
        className="mx-auto max-w-7xl px-6 py-24 lg:px-10"
      >
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Testimonios
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Lo que dicen quienes vivieron la experiencia.
            </h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl"
            >
              <div className="mb-6 text-4xl leading-none text-white/30">“</div>
              <p className="text-base leading-7 text-neutral-300">
                {item.quote}
              </p>
              <div className="mt-8 border-t border-white/10 pt-5">
                <div className="text-base font-medium text-white">
                  {item.name}
                </div>
                <div className="mt-1 text-sm text-neutral-500">{item.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-7">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: [0, -500] }}
            transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
            className="flex whitespace-nowrap text-xl font-medium tracking-[0.35em] text-neutral-500"
          >
            {[...brands, ...brands].map((brand, index) => (
              <span key={`${brand}-${index}`} className="mr-14 inline-block">
                {brand}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <motion.section
        {...fadeUp}
        className="mx-auto max-w-7xl px-6 pb-24 lg:px-10"
      >
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.02] p-8 shadow-2xl sm:p-12 lg:p-16">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                Reserva
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                Agenda una sesión con una dirección visual premium.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-300">
                Escríbeme por WhatsApp para cotizar, reservar o contarme la idea
                de tu sesión. Creamos imágenes que se sienten tan valiosas como
                tu marca.
              </p>
            </div>

            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                Reservar por WhatsApp
              </span>
              <span className="absolute inset-0 translate-y-full bg-emerald-400 transition-transform duration-500 ease-out group-hover:translate-y-0" />
            </a>
          </div>
        </div>
      </motion.section>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md"
            onClick={closePhoto}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.35 }}
              className="relative h-full w-full overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto flex min-h-full w-full max-w-6xl items-start p-4 sm:p-6 lg:items-center lg:p-8">
                <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950">
                  <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-white/10 bg-neutral-950/90 px-4 py-4 backdrop-blur-md sm:px-6">
                    <button
                      onClick={closePhoto}
                      className="rounded-full border border-white/15 bg-black/40 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-white"
                    >
                      Volver al portafolio
                    </button>

                    <div className="text-center">
                      <div className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                        {selectedPhoto.category}
                      </div>
                      <div className="mt-1 text-sm text-neutral-300">
                        {selectedPhotoIndex + 1} /{" "}
                        {selectedPhotoCategoryPhotos.length}
                      </div>
                    </div>

                    <button
                      onClick={closePhoto}
                      className="rounded-full border border-white/15 bg-black/40 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-white"
                    >
                      Cerrar
                    </button>
                  </div>

                  <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
                    <div className="relative">
                      <div className="relative h-[55vh] w-full sm:h-[65vh] lg:h-[75vh]">
                        <Image
                          src={selectedPhoto.image}
                          alt={selectedPhoto.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <button
                        onClick={goToPreviousPhoto}
                        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-black/45 px-4 py-3 text-lg text-white backdrop-blur-md transition hover:bg-white hover:text-black"
                        aria-label="Foto anterior"
                      >
                        ←
                      </button>

                      <button
                        onClick={goToNextPhoto}
                        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-black/45 px-4 py-3 text-lg text-white backdrop-blur-md transition hover:bg-white hover:text-black"
                        aria-label="Foto siguiente"
                      >
                        →
                      </button>
                    </div>

                    <div className="flex flex-col justify-between bg-neutral-950 p-6 lg:p-10">
                      <div>
                        <div className="mb-4 inline-flex w-fit rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-neutral-300">
                          {selectedPhoto.category}
                        </div>

                        <h3 className="text-3xl font-semibold tracking-tight">
                          {selectedPhoto.title}
                        </h3>

                        <p className="mt-4 max-w-md text-base leading-7 text-neutral-300">
                          {selectedPhoto.subtitle}
                        </p>
                      </div>

                      <div className="mt-8">
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                          <button
                            onClick={goToPreviousPhoto}
                            className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white transition hover:bg-white hover:text-black"
                          >
                            ← Anterior
                          </button>

                          <button
                            onClick={goToNextPhoto}
                            className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white transition hover:bg-white hover:text-black"
                          >
                            Siguiente →
                          </button>
                        </div>

                        <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
                          {selectedPhotoCategoryPhotos.map((photo) => {
                            const isActive = selectedPhoto.id === photo.id;

                            return (
                              <button
                                key={photo.id}
                                onClick={() => setSelectedPhotoId(photo.id)}
                                className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border ${
                                  isActive
                                    ? "border-white"
                                    : "border-white/10"
                                }`}
                              >
                                <Image
                                  src={photo.image}
                                  alt={photo.title}
                                  fill
                                  className="object-cover"
                                />
                              </button>
                            );
                          })}
                        </div>

                        <a
                          href={whatsapp}
                          target="_blank"
                          rel="noreferrer"
                          className="group relative inline-flex w-fit overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
                        >
                          <span className="relative z-10">
                            Reservar sesión
                          </span>
                          <span className="absolute inset-0 translate-y-full bg-emerald-400 transition-transform duration-500 ease-out group-hover:translate-y-0" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}