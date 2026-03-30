export type Category = "bodas" | "prebodas" | "estudio";

export type PhotoItem = {
  id: number;
  src: string;
  title: string;
  category: Category;
};

export const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80",
    title: "MILES VISUAL",
    subtitle: "Fotografía editorial para historias que merecen quedarse.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=80",
    title: "Recuerdos atemporales",
    subtitle: "Imágenes elegantes, sensibles y auténticas.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1800&q=80",
    title: "Momentos especiales",
    subtitle: "Cada historia merece una mirada bella y honesta.",
  },
];

export const allPhotos: PhotoItem[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
    title: "Velo y luz",
    category: "bodas",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80",
    title: "Editorial romántico",
    category: "bodas",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1600&q=80",
    title: "Instante eterno",
    category: "bodas",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    title: "Historia previa",
    category: "prebodas",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1600&q=80",
    title: "Miradas sinceras",
    category: "prebodas",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80",
    title: "Antes del gran día",
    category: "prebodas",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1600&q=80",
    title: "Retrato delicado",
    category: "estudio",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80",
    title: "Luz suave",
    category: "estudio",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1600&q=80",
    title: "Minimal portrait",
    category: "estudio",
  },
];