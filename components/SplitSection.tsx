import Link from "next/link";

type Props = {
  label: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  href: string;
  reverse?: boolean;
  dark?: boolean;
  id?: string;
};

export default function SplitSection({
  label,
  title,
  text,
  image,
  imageAlt,
  href,
  reverse = false,
  dark = false,
  id,
}: Props) {
  return (
    <section
      id={id}
      className="mx-auto max-w-[1180px] px-5 py-12 md:px-8 md:py-16"
    >
      <div
        className={`grid items-center gap-8 md:gap-12 lg:grid-cols-2 ${
          dark ? "bg-[#1f1c1c] px-6 py-8 md:px-10 md:py-10" : ""
        }`}
      >
        <div className={reverse ? "lg:order-2" : ""}>
          <p
            className={`text-[11px] uppercase tracking-[0.24em] ${
              dark ? "text-white/60" : "text-neutral-500"
            }`}
          >
            {label}
          </p>

          <h2
            className={`mt-3 text-4xl font-light leading-none md:text-6xl ${
              dark ? "text-white" : "text-neutral-900"
            }`}
          >
            {title}
          </h2>

          <p
            className={`mt-6 max-w-[470px] text-sm leading-7 md:text-[15px] ${
              dark ? "text-white/75" : "text-neutral-700"
            }`}
          >
            {text}
          </p>

          <Link
            href={href}
            className={`mt-8 inline-flex border px-6 py-3 text-[11px] uppercase tracking-[0.24em] transition ${
              dark
                ? "border-white/25 text-white hover:bg-white hover:text-black"
                : "border-black/15 text-neutral-900 hover:bg-black hover:text-white"
            }`}
          >
            Ver más
          </Link>
        </div>

        <div className={reverse ? "lg:order-1" : ""}>
          <div className="mx-auto w-full max-w-[460px] overflow-hidden bg-neutral-200">
            <div className="aspect-[4/5]">
              <img
                src={image}
                alt={imageAlt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}