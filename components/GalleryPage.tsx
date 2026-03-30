"use client";

import { useState } from "react";
import type { PhotoItem } from "@/data/galery";
import Lightbox from "./Lightbox";

type Props = {
  title: string;
  subtitle: string;
  photos: PhotoItem[];
};

export default function GalleryPage({ title, subtitle, photos }: Props) {
  const [selected, setSelected] = useState<PhotoItem | null>(null);

  return (
    <section className="mx-auto max-w-[1180px] px-5 py-24 md:px-8">
      <div className="mb-10 md:mb-14 max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.24em] text-neutral-500">
          {subtitle}
        </p>
        <h1 className="mt-3 text-4xl font-light leading-none text-neutral-900 md:text-6xl">
          {title}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {photos.map((photo) => (
          <button
            key={photo.id}
            onClick={() => setSelected(photo)}
            className="group text-left"
          >
            <div className="overflow-hidden bg-white">
              <img
                src={photo.src}
                alt={photo.title}
                className="h-[360px] w-full object-cover transition duration-500 group-hover:scale-105 md:h-[460px]"
              />
            </div>

            <div className="border border-t-0 border-black/10 px-4 py-4">
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