"use client";

type Props = {
  src: string;
  title: string;
  onClose: () => void;
};

export default function Lightbox({ src, title, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-xs uppercase tracking-[0.25em] text-white"
        >
          Cerrar
        </button>

        <img
          src={src}
          alt={title}
          className="max-h-[88vh] max-w-full object-contain"
        />

        <p className="mt-3 text-center text-sm text-white/75">{title}</p>
      </div>
    </div>
  );
}