"use client";

import { useEffect, useRef } from "react";

type Props = {
  photos: string[];
};

export default function HeroAlbum({ photos }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let raf = 0;
    let pos = 0;

    const step = () => {
      pos += 0.35;
      if (pos >= container.scrollWidth / 2) pos = 0;
      container.scrollLeft = pos;
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const items = [...photos, ...photos];

  return (
    <section className="site-container pt-8 md:pt-12">
      <div ref={scrollRef} className="hide-scrollbar overflow-x-auto">
        <div className="flex w-max gap-4 md:gap-6">
          {items.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className={`shrink-0 overflow-hidden bg-white ${
                index % 3 === 0
                  ? "w-[240px] h-[340px] md:w-[340px] md:h-[480px]"
                  : index % 3 === 1
                  ? "w-[280px] h-[340px] md:w-[420px] md:h-[480px]"
                  : "w-[170px] h-[340px] md:w-[220px] md:h-[480px]"
              }`}
            >
              <img
                src={src}
                alt="Momento especial"
                className="h-full w-full object-contain bg-white"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}