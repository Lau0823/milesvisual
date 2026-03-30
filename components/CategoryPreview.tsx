import Link from "next/link";

type Props = {
  label: string;
  title: string;
  description: string;
  href: string;
};

export default function CategoryPreview({
  label,
  title,
  description,
  href,
}: Props) {
  return (
    <section className="container-editorial py-16 md:py-24">
      <div className="max-w-xl">
        <p className="section-label">{label}</p>
        <h2 className="section-title mt-3">{title}</h2>
        <p className="body-copy mt-6">{description}</p>

        <Link
          href={href}
          className="mt-8 inline-flex border border-soft px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-neutral-800 transition hover:bg-black hover:text-white"
        >
          Ver galería
        </Link>
      </div>
    </section>
  );
}