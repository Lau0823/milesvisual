"use client";

import { useState } from "react";
import Lightbox from "./Lightbox";
import type { PhotoItem } from "@/data/galery";

type Props = {
  title: string;
  subtitle: string;
  photos: PhotoItem[];
};

export default function GalleryGrid({ title, subtitle, photos }: Props) {
  const [selected, setSelected] = useState<PhotoItem | null>(null);

  return (
    <section className="container-editorial py-12 md:py-16">
      <div className="mb-12 max-w-2xl">
        <p className="section-label">{subtitle}</p>
        <h1 className="section-title mt-3">{title}</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {photos.map((photo) => (
          <button
            key={photo.id}
            onClick={() => setSelected(photo)}
            className="group overflow-hidden bg-white text-left"
          >
            <div className="overflow-hidden">
              <img
                src={photo.src}
                alt={photo.title}
                className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="border-x border-b border-soft px-4 py-4">
              <p className="text-sm text-neutral-800">{photo.title}</p>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <Lightbox
          src={selected.src}
          title={selected.title}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}