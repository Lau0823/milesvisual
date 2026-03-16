import {
  FolderKanban,
  Images,
  FileText,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    title: "Categorías",
    value: "4",
    description: "Bodas, Retrato, Editorial y Eventos",
    icon: FolderKanban,
  },
  {
    title: "Fotos",
    value: "20",
    description: "Colección inicial cargada",
    icon: Images,
  },
  {
    title: "Contenido",
    value: "1",
    description: "Landing principal editable",
    icon: FileText,
  },
  {
    title: "Leads",
    value: "0",
    description: "Sin mensajes nuevos",
    icon: Mail,
  },
];

const shortcuts = [
  {
    title: "Administrar categorías",
    href: "/admin/categorias",
    text: "Crea, edita y ordena las categorías del portafolio.",
  },
  {
    title: "Administrar fotos",
    href: "/admin/fotos",
    text: "Sube imágenes, cambia títulos y organiza galerías.",
  },
  {
    title: "Editar contenido",
    href: "/admin/contenido",
    text: "Actualiza textos del hero, about y llamadas a la acción.",
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 shadow-2xl lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
              Miles Visual CMS
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight lg:text-5xl">
              Administra el portafolio como una marca premium.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-300">
              Desde aquí podrás editar categorías, gestionar fotografías,
              actualizar contenido del sitio y llevar control de leads.
            </p>
          </div>

          <Link
            href="/admin/fotos"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
          >
            Ir a fotos
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-500">{item.title}</p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-tight">
                    {item.value}
                  </h3>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                  <Icon className="h-5 w-5 text-neutral-300" />
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-neutral-400">
                {item.description}
              </p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {shortcuts.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:bg-white/[0.06]"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
              Acceso rápido
            </p>
            <h3 className="mt-4 text-xl font-semibold tracking-tight">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-neutral-400">
              {item.text}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}