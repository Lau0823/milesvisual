import type { ReactNode } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Images,
  FolderKanban,
  FileText,
  MessageSquareQuote,
  Mail,
  Settings,
  Camera,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Categorías",
    href: "/admin/categorias",
    icon: FolderKanban,
  },
  {
    title: "Fotos",
    href: "/admin/fotos",
    icon: Images,
  },
  {
    title: "Contenido",
    href: "/admin/contenido",
    icon: FileText,
  },
  {
    title: "Testimonios",
    href: "/admin/testimonios",
    icon: MessageSquareQuote,
  },
  {
    title: "Leads",
    href: "/admin/leads",
    icon: Mail,
  },
  {
    title: "Configuración",
    href: "/admin/configuracion",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-white/10 bg-black/30 backdrop-blur-xl lg:border-b-0 lg:border-r">
          <div className="flex h-full flex-col">
            <div className="border-b border-white/10 px-6 py-6">
              <Link href="/admin" className="block">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                    <Camera className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
                      Admin Panel
                    </p>
                    <h1 className="mt-1 text-lg font-semibold tracking-tight">
                      Miles Visual
                    </h1>
                  </div>
                </div>
              </Link>
            </div>

            <nav className="flex-1 px-4 py-5">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm text-neutral-300 transition hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition group-hover:bg-white/[0.08]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            <div className="border-t border-white/10 p-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                  Estado
                </p>
                <p className="mt-2 text-sm text-neutral-300">
                  Panel listo para administrar el portafolio.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-neutral-950/85 backdrop-blur-xl">
            <div className="flex items-center justify-between px-6 py-4 lg:px-8">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
                  Workspace
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">
                  Dashboard administrativo
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-neutral-300 transition hover:bg-white hover:text-black"
                >
                  Ver sitio
                </Link>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-neutral-300">
                  Admin
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-6 py-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}