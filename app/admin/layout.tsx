"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Bell,
  BookImage,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  FolderKanban,
  ImagePlus,
  Images,
  LayoutDashboard,
  Mail,
  Menu,
  MessageSquareQuote,
  PenSquare,
  Plus,
  Search,
  Settings,
  Sparkles,
  UploadCloud,
  Wallet,
} from "lucide-react";

type NavKey =
  | "dashboard"
  | "secciones"
  | "galeria"
  | "reservas"
  | "agenda"
  | "finanzas"
  | "testimonios"
  | "leads"
  | "configuracion";

type NavItem = {
  key: NavKey;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
};

type SectionItem = {
  id: string;
  name: string;
  description: string;
  status: "Publicado" | "Borrador";
  count: string;
};

type BookingItem = {
  id: string;
  client: string;
  service: string;
  date: string;
  status: "Confirmada" | "Pendiente" | "Edición";
  amount: string;
};

type LeadItem = {
  id: string;
  name: string;
  event: string;
  source: string;
  budget: string;
};

type ContentTask = {
  id: string;
  title: string;
  detail: string;
  done: boolean;
};

const navItems: NavItem[] = [
  { key: "dashboard", title: "Dashboard", icon: LayoutDashboard },
  { key: "secciones", title: "Secciones", icon: FolderKanban },
  { key: "galeria", title: "Galería", icon: Images, badge: "128" },
  { key: "reservas", title: "Reservas", icon: BookImage, badge: "8" },
  { key: "agenda", title: "Agenda", icon: CalendarDays },
  { key: "finanzas", title: "Finanzas", icon: Wallet },
  { key: "testimonios", title: "Testimonios", icon: MessageSquareQuote },
  { key: "leads", title: "Leads", icon: Mail, badge: "12" },
  { key: "configuracion", title: "Configuración", icon: Settings },
];

const landingSections: SectionItem[] = [
  {
    id: "hero",
    name: "Hero principal",
    description: "Banner principal, slides fullscreen y llamadas a la acción.",
    status: "Publicado",
    count: "4 slides",
  },
  {
    id: "about",
    name: "Acerca de mí",
    description: "Texto editorial, retrato y botón principal.",
    status: "Publicado",
    count: "1 bloque",
  },
  {
    id: "bodas",
    name: "Bodas",
    description: "Carrusel principal con texto y llamadas a la acción.",
    status: "Publicado",
    count: "3 fotos",
  },
  {
    id: "shootings",
    name: "Shootings",
    description: "Carrusel full width y texto descriptivo debajo.",
    status: "Publicado",
    count: "4 fotos",
  },
  {
    id: "planes",
    name: "Planes",
    description: "Planes con imagen, detalles, precio y botón de cotización.",
    status: "Borrador",
    count: "5 planes",
  },
];

const bookings: BookingItem[] = [
  {
    id: "b1",
    client: "Laura & Sebastián",
    service: "Boda Premium",
    date: "12 Oct 2026",
    status: "Confirmada",
    amount: "$2.400.000",
  },
  {
    id: "b2",
    client: "Valentina R.",
    service: "Shooting editorial",
    date: "18 Oct 2026",
    status: "Pendiente",
    amount: "$850.000",
  },
  {
    id: "b3",
    client: "Daniela & Juan",
    service: "Boda Gold",
    date: "26 Oct 2026",
    status: "Edición",
    amount: "$3.600.000",
  },
];

const leads: LeadItem[] = [
  {
    id: "l1",
    name: "Sara Gómez",
    event: "Boda destino",
    source: "Instagram",
    budget: "$3M - $5M",
  },
  {
    id: "l2",
    name: "Juan Pablo Ruiz",
    event: "Shooting personal",
    source: "WhatsApp",
    budget: "$800K - $1.2M",
  },
  {
    id: "l3",
    name: "Casa Aurea",
    event: "Campaña editorial",
    source: "Web",
    budget: "$4M+",
  },
];

const tasks: ContentTask[] = [
  {
    id: "t1",
    title: "Actualizar texto de Acerca de mí",
    detail: "Revisar tono de marca y cerrar versión final para publicar.",
    done: true,
  },
  {
    id: "t2",
    title: "Subir 3 nuevas fotos a Bodas",
    detail: "Agregar imágenes en alta calidad y reordenar carrusel.",
    done: false,
  },
  {
    id: "t3",
    title: "Configurar plan Diamante",
    detail: "Revisar precio, beneficios y botón de cotización.",
    done: false,
  },
];

const weekDays = ["L", "M", "Mi", "J", "V", "S", "D"];
const calendarDays = [
  ["", "", "1", "2", "3", "4", "5"],
  ["6", "7", "8", "9", "10", "11", "12"],
  ["13", "14", "15", "16", "17", "18", "19"],
  ["20", "21", "22", "23", "24", "25", "26"],
  ["27", "28", "29", "30", "31", "", ""],
];

export default function PhotographerDashboardPage() {
  const [activeNav, setActiveNav] = useState<NavKey>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = useMemo(
    () => [
      {
        title: "Ingresos del mes",
        value: "$8.450.000",
        helper: "+18% vs mes anterior",
        tone: "gold" as const,
        icon: CircleDollarSign,
      },
      {
        title: "Reservas activas",
        value: "12",
        helper: "3 nuevas esta semana",
        tone: "green" as const,
        icon: CalendarDays,
      },
      {
        title: "Fotos publicadas",
        value: "128",
        helper: "16 nuevas este mes",
        tone: "slate" as const,
        icon: Images,
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-black text-[#2f3b3a]">
      <div className="fixed left-[-80px] top-[-60px] h-56 w-56 rounded-full bg-[#edff86]" />
      <div className="fixed bottom-[-120px] left-[-120px] h-72 w-72 rounded-full bg-[#edff86]" />
      <div className="fixed right-[-140px] top-16 h-[360px] w-[360px] rounded-full bg-white/25" />

      <div className="relative mx-auto max-w-[1500px] px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-[110px_1fr] xl:grid-cols-[290px_1fr]">
          <aside className="rounded-[2rem] bg-[#000000] text-white shadow-[0_24px_60px_rgba(53,71,68,0.22)]">
            <div className="flex h-full flex-col xl:p-4">
              <div className="hidden xl:block">
                <div className="rounded-[1.8rem] px-3 py-4">
                  <div className="flex items-center gap-4 px-3 py-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                      <Camera className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-white/55">
                        Be.run style
                      </p>
                      <h1 className="mt-1 text-xl font-semibold tracking-tight">
                        Miles Visual
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 xl:hidden">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <Camera className="h-5 w-5" />
                </div>
                <button
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>

              <div
                className={`${
                  mobileMenuOpen ? "block" : "hidden"
                } xl:block`}
              >
                <div className="px-3 py-4">
                  <div className="hidden rounded-[1.5rem] bg-[#070707] px-4 py-4 xl:block">
                    <p className="text-sm font-medium text-white/70">
                      Hola, Miles
                    </p>
                    <p className="mt-1 text-lg font-semibold">Admin dashboard</p>
                    <p className="mt-1 text-sm text-white/55">
                      Gestiona textos, fotos, agenda y reservas.
                    </p>
                  </div>

                  <nav className="mt-0 space-y-2 xl:mt-4">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const active = activeNav === item.key;

                      return (
                        <button
                          key={item.key}
                          onClick={() => setActiveNav(item.key)}
                          className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm transition ${
                            active
                              ? "bg-white text-[#49635f] shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                              : "text-white/85 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <span
                            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                              active
                                ? "bg-[#d4fcc3]"
                                : "bg-white/5 ring-1 ring-white/10"
                            }`}
                          >
                            <Icon className="h-4.5 w-4.5" />
                          </span>
                          <span className="flex-1 font-medium xl:block">
                            {item.title}
                          </span>
                          {item.badge ? (
                            <span
                              className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                                active
                                  ? "bg-[#8d7168] text-white"
                                  : "bg-white/10 text-white/80"
                              }`}
                            >
                              {item.badge}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="mt-auto p-3 xl:block">
                  <div className="rounded-[1.6rem] bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/55">
                      Necesidades del fotógrafo
                    </p>
                    <div className="mt-3 space-y-2 text-sm text-white/80">
                      <p>• Subir fotos por sección</p>
                      <p>• Editar textos de landing</p>
                      <p>• Gestionar reservas</p>
                      <p>• Revisar leads</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="rounded-[2.2rem] bg-[#edff86] p-4 shadow-[0_28px_60px_rgba(73,99,95,0.18)] sm:p-5 lg:p-6">
            <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm text-[#7a8886]">Hi, Miles! style adaptado</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#243332] sm:text-3xl">
                  Dashboard de fotógrafo
                </h2>
                <p className="mt-1 text-sm text-[#7f8d8b]">
                  Administra landing page, contenido, fotos, reservas, agenda y finanzas.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#889794]" />
                  <input
                    type="text"
                    placeholder="Buscar contenido o reservas"
                    className="h-12 w-full rounded-full border border-[#d7dfdd] bg-white pl-11 pr-4 text-sm text-[#2f3b3a] outline-none placeholder:text-[#8a9896] sm:w-72"
                  />
                </div>

                <button className="inline-flex h-12 items-center justify-center rounded-full bg-[#1f2631] px-5 text-sm font-medium text-white transition hover:opacity-95">
                  Upgrade
                </button>
              </div>
            </header>

            <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[2rem] bg-[#3a2e39] p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-[#edff86]">
                      Contenido listo para publicar
                    </p>
                    <p className="mt-1 text-sm text-[#edff86]">
                      Control rápido de textos, fotos y secciones de la landing.
                    </p>
                  </div>
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edff86] text-white">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {stats.map((stat) => (
                    <TopStatCard key={stat.title} {...stat} />
                  ))}
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                  <QuickActionCard
                    title="Subir nuevas fotos"
                    subtitle="Agrega imágenes a hero, bodas, shootings y planes."
                    icon={UploadCloud}
                    button="Subir archivos"
                  />

                  <QuickActionCard
                    title="Editar textos"
                    subtitle="Actualiza títulos, descripciones y botones de la landing."
                    icon={PenSquare}
                    button="Editar contenido"
                  />
                </div>
              </div>

              <div className="rounded-[2rem] bg-[#070707] p-5 text-white shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/65">Agenda</p>
                    <h3 className="mt-1 text-xl font-semibold">Tus días de trabajo</h3>
                  </div>
                  <span className="text-sm text-white/55">Octubre</span>
                </div>

                <div className="mt-5 grid grid-cols-7 gap-2 text-center text-[11px] uppercase tracking-[0.18em] text-white/45">
                  {weekDays.map((day) => (
                    <div key={day} className="py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {calendarDays.map((week, weekIndex) => (
                    <div key={`week-${weekIndex}`} className="grid grid-cols-7 gap-2">
                      {week.map((day, dayIndex) => {
                        const active = day === "18";
                        const highlighted = ["12", "18", "26"].includes(day);
                        return (
                          <div
                            key={`${weekIndex}-${dayIndex}-${day || "empty"}`}
                            className={`flex aspect-square items-center justify-center rounded-2xl text-sm ${
                              !day
                                ? "bg-transparent"
                                : active
                                ? "bg-[#f1c936] font-semibold text-[#1f2631]"
                                : highlighted
                                ? "bg-white/10 text-white"
                                : "bg-white/5 text-white/75"
                            }`}
                          >
                            {day}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-4 text-xs text-white/55">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-white/40" /> Día normal
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#f1c936]" /> Reserva
                  </span>
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
              <div className="space-y-6">
                <div className="rounded-[2rem] bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-[#768683]">Pasos de hoy</p>
                      <h3 className="mt-1 text-xl font-semibold text-[#243332]">
                        Flujo editorial
                      </h3>
                    </div>
                    <span className="rounded-full bg-[#f4f0e6] px-3 py-1 text-xs font-medium text-[#8e7d4a]">
                      3 tareas
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="rounded-[1.4rem] border border-[#e5ebea] bg-[#fafcfb] p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl ${
                              task.done
                                ? "bg-c9fbff text-emerald-700"
                                : "bg-[#f4f0e6] text-[#8d7740]"
                            }`}
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-[#2c3b39]">{task.title}</p>
                            <p className="mt-1 text-sm leading-6 text-[#788784]">
                              {task.detail}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#768683]">Leads</p>
                      <h3 className="mt-1 text-xl font-semibold text-[#243332]">
                        Oportunidades nuevas
                      </h3>
                    </div>
                    <button className="rounded-full bg-[#49635f] px-4 py-2 text-sm font-medium text-white">
                      Ver todos
                    </button>
                  </div>

                  <div className="mt-5 space-y-3">
                    {leads.map((lead) => (
                      <div
                        key={lead.id}
                        className="flex items-center justify-between rounded-[1.4rem] bg-[#fafcfb] px-4 py-4 ring-1 ring-[#e7edeb]"
                      >
                        <div>
                          <p className="font-medium text-[#2a3837]">{lead.name}</p>
                          <p className="mt-1 text-sm text-[#7a8886]">
                            {lead.event} · {lead.source}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-[#8b7440]">
                          {lead.budget}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[2rem] bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-[#768683]">Secciones de la landing</p>
                      <h3 className="mt-1 text-xl font-semibold text-[#243332]">
                        Todo lo que puedes editar
                      </h3>
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-full bg-[#1f2631] px-4 py-2 text-sm font-medium text-white">
                      <Sparkles className="h-4 w-4" />
                      Nuevo bloque
                    </button>
                  </div>

                  <div className="mt-5 overflow-hidden rounded-[1.6rem] border border-[#e2e9e7]">
                    {landingSections.map((section, index) => (
                      <div
                        key={section.id}
                        className={`grid gap-4 px-4 py-4 md:grid-cols-[1.1fr_1.4fr_0.6fr_0.5fr] md:items-center ${
                          index !== landingSections.length - 1
                            ? "border-b border-[#e7edeb]"
                            : ""
                        }`}
                      >
                        <div>
                          <p className="font-medium text-[#253433]">{section.name}</p>
                          <p className="mt-1 text-sm text-[#7a8886]">{section.count}</p>
                        </div>
                        <p className="text-sm leading-6 text-[#677673]">
                          {section.description}
                        </p>
                        <div>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              section.status === "Publicado"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {section.status}
                          </span>
                        </div>
                        <button className="rounded-full border border-[#dbe3e1] px-4 py-2 text-sm text-[#30413f] transition hover:bg-[#49635f] hover:text-white">
                          Editar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                  <div className="rounded-[2rem] bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#768683]">Reservas</p>
                        <h3 className="mt-1 text-xl font-semibold text-[#243332]">
                          Últimas reservas
                        </h3>
                      </div>
                      <button className="rounded-full bg-[#f4f0e6] px-4 py-2 text-sm font-medium text-[#8b7440]">
                        Gestionar
                      </button>
                    </div>

                    <div className="mt-5 space-y-3">
                      {bookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="rounded-[1.4rem] border border-[#e5ebea] bg-[#fafcfb] p-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="font-medium text-[#253433]">
                                {booking.client}
                              </p>
                              <p className="mt-1 text-sm text-[#7a8886]">
                                {booking.service} · {booking.date}
                              </p>
                            </div>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${
                                booking.status === "Confirmada"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : booking.status === "Pendiente"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-sm text-[#6f7f7c]">Valor</span>
                            <span className="font-medium text-[#2f3d3b]">
                              {booking.amount}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[2rem] bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#768683]">Finanzas</p>
                        <h3 className="mt-1 text-xl font-semibold text-[#243332]">
                          Flujo mensual
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f5f4] text-[#49635f]">
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#49635f] text-white">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8 flex h-52 items-end justify-between gap-3">
                      {[38, 62, 50, 72, 46, 80, 58].map((height, i) => (
                        <div key={`bar-${i}`} className="flex flex-1 flex-col items-center gap-2">
                          <div className="relative flex h-44 w-full items-end justify-center">
                            <div
                              className="w-7 rounded-full bg-[#49635f]"
                              style={{ height: `${height}%` }}
                            />
                            <div
                              className="absolute bottom-0 w-3 rounded-full bg-[#d2a018]"
                              style={{ height: `${Math.max(18, height - 20)}%` }}
                            />
                          </div>
                          <span className="text-xs text-[#7f8d8a]">
                            {[
                              "Ene",
                              "Feb",
                              "Mar",
                              "Abr",
                              "May",
                              "Jun",
                              "Jul",
                            ][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopStatCard({
  title,
  value,
  helper,
  tone,
  icon: Icon,
}: {
  title: string;
  value: string;
  helper: string;
  tone: "gold" | "green" | "slate";
  icon: React.ComponentType<{ className?: string }>;
}) {
  const styles = {
    gold: "bg-[#caa73e] text-white",
    green: "bg-[#49635f] text-white",
    slate: "bg-[#5f7672] text-white",
  };

  return (
    <div className={`rounded-[1.6rem] p-4 shadow-sm ${styles[tone]}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-white/75">{title}</p>
          <h4 className="mt-2 text-2xl font-semibold tracking-tight">{value}</h4>
          <p className="mt-2 text-sm text-white/70">{helper}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({
  title,
  subtitle,
  icon: Icon,
  button,
}: {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  button: string;
}) {
  return (
    <div className="rounded-[1.6rem] bg-white/60 p-4 ring-1 ring-white/30 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-medium text-[#2e3b39]">{title}</p>
          <p className="mt-1 text-sm leading-6 text-[#687774]">{subtitle}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1f2631] text-white">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <button className="mt-4 rounded-full bg-[#49635f] px-4 py-2 text-sm font-medium text-white transition hover:opacity-95">
        {button}
      </button>
    </div>
  );
}
