"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  ImagePlus,
  LayoutDashboard,
  Mail,
  Menu,
  MessageSquareMore,
  Plus,
  Search,
  Settings,
  Trash2,
  Upload,
  UserRound,
  X,
} from "lucide-react";

type BookingStatus = "confirmada" | "pendiente" | "cancelada";
type PaymentStatus = "pagado" | "pendiente";

type Booking = {
  id: number;
  client: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  amount: number;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
};

type MediaItem = {
  id: number;
  title: string;
  category: "bodas" | "prebodas" | "estudio";
  status: "publicado" | "borrador";
  image: string;
};

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const initialBookings: Booking[] = [
  {
    id: 1,
    client: "Laura Gómez",
    email: "laura@email.com",
    phone: "+57 300 111 1111",
    service: "Boda",
    date: "2026-04-18",
    time: "15:00",
    amount: 2400000,
    bookingStatus: "confirmada",
    paymentStatus: "pagado",
  },
  {
    id: 2,
    client: "Andrés Pardo",
    email: "andres@email.com",
    phone: "+57 300 222 2222",
    service: "Pre-Boda",
    date: "2026-04-22",
    time: "10:00",
    amount: 850000,
    bookingStatus: "pendiente",
    paymentStatus: "pendiente",
  },
  {
    id: 3,
    client: "Sara Molina",
    email: "sara@email.com",
    phone: "+57 300 333 3333",
    service: "Foto Estudio",
    date: "2026-05-03",
    time: "14:30",
    amount: 1100000,
    bookingStatus: "confirmada",
    paymentStatus: "pagado",
  },
  {
    id: 4,
    client: "Camilo & Valeria",
    email: "camilo@email.com",
    phone: "+57 300 444 4444",
    service: "Boda",
    date: "2026-05-14",
    time: "16:00",
    amount: 3600000,
    bookingStatus: "pendiente",
    paymentStatus: "pendiente",
  },
];

const initialMedia: MediaItem[] = [
  {
    id: 1,
    title: "Boda editorial 01",
    category: "bodas",
    status: "publicado",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Preboda golden hour",
    category: "prebodas",
    status: "publicado",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Studio portrait clean",
    category: "estudio",
    status: "borrador",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Boda ceremonia 02",
    category: "bodas",
    status: "publicado",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
  },
];

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatusClasses(status: BookingStatus) {
  if (status === "confirmada") {
    return "bg-emerald-100 text-emerald-700";
  }
  if (status === "pendiente") {
    return "bg-amber-100 text-amber-700";
  }
  return "bg-rose-100 text-rose-700";
}

function getPaymentClasses(status: PaymentStatus) {
  return status === "pagado"
    ? "bg-[#789894] text-white"
    : "bg-white text-[#2d2a27] border border-[#2d2a27]/15";
}

export default function AdminDashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "dashboard" | "reservas" | "finanzas" | "media" | "clientes"
  >("dashboard");

  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);

  const [search, setSearch] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(3); // abril
  const [calendarYear, setCalendarYear] = useState(2026);

  const [newBooking, setNewBooking] = useState({
    client: "",
    email: "",
    phone: "",
    service: "Boda",
    date: "",
    time: "",
    amount: "",
  });

  const filteredBookings = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return bookings;
    return bookings.filter(
      (b) =>
        b.client.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        b.service.toLowerCase().includes(q)
    );
  }, [bookings, search]);

  const paidTotal = useMemo(
    () =>
      bookings
        .filter((b) => b.paymentStatus === "pagado")
        .reduce((sum, b) => sum + b.amount, 0),
    [bookings]
  );

  const pendingTotal = useMemo(
    () =>
      bookings
        .filter((b) => b.paymentStatus === "pendiente")
        .reduce((sum, b) => sum + b.amount, 0),
    [bookings]
  );

  const monthSummary = useMemo(() => {
    const map = new Map<string, number>();

    bookings.forEach((booking) => {
      if (booking.paymentStatus !== "pagado") return;
      const date = new Date(`${booking.date}T00:00:00`);
      const key = `${months[date.getMonth()]} ${date.getFullYear()}`;
      map.set(key, (map.get(key) ?? 0) + booking.amount);
    });

    return Array.from(map.entries()).map(([label, total]) => ({
      label,
      total,
    }));
  }, [bookings]);

  const thisMonthBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const date = new Date(`${booking.date}T00:00:00`);
      return (
        date.getMonth() === calendarMonth && date.getFullYear() === calendarYear
      );
    });
  }, [bookings, calendarMonth, calendarYear]);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(calendarYear, calendarMonth, 1);
    const lastDay = new Date(calendarYear, calendarMonth + 1, 0);
    const startWeekday = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const cells: Array<number | null> = [];

    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= totalDays; d++) cells.push(d);

    while (cells.length % 7 !== 0) cells.push(null);

    return cells;
  }, [calendarMonth, calendarYear]);

  const addBooking = () => {
    if (
      !newBooking.client ||
      !newBooking.email ||
      !newBooking.phone ||
      !newBooking.date ||
      !newBooking.time ||
      !newBooking.amount
    ) {
      return;
    }

    const booking: Booking = {
      id: Date.now(),
      client: newBooking.client,
      email: newBooking.email,
      phone: newBooking.phone,
      service: newBooking.service,
      date: newBooking.date,
      time: newBooking.time,
      amount: Number(newBooking.amount),
      bookingStatus: "pendiente",
      paymentStatus: "pendiente",
    };

    setBookings((prev) => [booking, ...prev]);

    setNewBooking({
      client: "",
      email: "",
      phone: "",
      service: "Boda",
      date: "",
      time: "",
      amount: "",
    });
  };

  const togglePaymentStatus = (id: number) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              paymentStatus:
                booking.paymentStatus === "pagado" ? "pendiente" : "pagado",
            }
          : booking
      )
    );
  };

  const deleteMedia = (id: number) => {
    setMedia((prev) => prev.filter((item) => item.id !== id));
  };

  const togglePublish = (id: number) => {
    setMedia((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "publicado" ? "borrador" : "publicado",
            }
          : item
      )
    );
  };

  const sidebarItems = [
    { id: "dashboard", label: "Resumen", icon: LayoutDashboard },
    { id: "reservas", label: "Reservas", icon: CalendarDays },
    { id: "finanzas", label: "Finanzas", icon: CircleDollarSign },
    { id: "media", label: "Media", icon: Camera },
    { id: "clientes", label: "Clientes", icon: UserRound },
  ] as const;

  return (
    <main className="min-h-screen bg-[#f4f0ea] text-[#2d2a27]">
      <div className="flex min-h-screen">
        {/* Sidebar desktop */}
        <aside className="hidden w-[290px] shrink-0 border-r border-black/8 bg-white/70 px-6 py-6 backdrop-blur xl:block">
          <div className="rounded-[24px] bg-[#789894] px-5 py-5 text-white">
            <p className="font-[Allura] text-[42px] leading-none">Miles Visual</p>
            <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-white/80">
              admin dashboard
            </p>
          </div>

          <nav className="mt-8 grid gap-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-3 rounded-[18px] px-4 py-4 text-left transition ${
                    active
                      ? "bg-[#789894] text-white shadow-lg"
                      : "bg-transparent text-[#2d2a27]/80 hover:bg-black/5"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-[13px] uppercase tracking-[0.12em]">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-10 rounded-[24px] bg-[#f4f0ea] p-5">
            <p className="text-[12px] uppercase tracking-[0.14em] text-[#2d2a27]/55">
              estado general
            </p>
            <div className="mt-5 grid gap-4">
              <div>
                <p className="text-[13px] uppercase tracking-[0.12em] text-[#2d2a27]/50">
                  Reservas
                </p>
                <p className="mt-2 text-[28px] font-semibold">{bookings.length}</p>
              </div>
              <div>
                <p className="text-[13px] uppercase tracking-[0.12em] text-[#2d2a27]/50">
                  Media
                </p>
                <p className="mt-2 text-[28px] font-semibold">{media.length}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile panel */}
        <div
          className={`fixed inset-0 z-40 xl:hidden ${
            menuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div
            className={`absolute inset-0 bg-black/40 transition ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setMenuOpen(false)}
          />
          <aside
            className={`absolute left-0 top-0 h-full w-[86%] max-w-[320px] bg-white px-6 py-6 transition-transform duration-300 ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-[Allura] text-[42px] leading-none text-[#789894]">
                  Miles Visual
                </p>
                <p className="mt-1 text-[12px] uppercase tracking-[0.16em] text-[#2d2a27]/60">
                  admin
                </p>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-8 grid gap-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 rounded-[18px] px-4 py-4 text-left transition ${
                      active
                        ? "bg-[#789894] text-white shadow-lg"
                        : "bg-transparent text-[#2d2a27]/80 hover:bg-black/5"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-[13px] uppercase tracking-[0.12em]">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>

        {/* Main */}
        <div className="min-w-0 flex-1">
          {/* Topbar */}
          <header className="sticky top-0 z-30 border-b border-black/8 bg-[#f4f0ea]/90 backdrop-blur">
            <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMenuOpen(true)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white xl:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>

                <div>
                  <p className="text-[12px] uppercase tracking-[0.16em] text-[#2d2a27]/50">
                    panel de gestión
                  </p>
                  <h1 className="mt-1 text-[26px] font-semibold uppercase tracking-[0.03em] md:text-[34px]">
                    Dashboard
                  </h1>
                </div>
              </div>

              <div className="hidden items-center gap-3 md:flex">
                <button className="rounded-full bg-white px-5 py-3 text-[12px] uppercase tracking-[0.12em] shadow-sm">
                  Exportar
                </button>
                <button className="rounded-full bg-[#789894] px-5 py-3 text-[12px] uppercase tracking-[0.12em] text-white shadow-sm">
                  Nuevo registro
                </button>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 md:px-6 md:py-8">
            {/* Summary cards */}
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[28px] bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] uppercase tracking-[0.14em] text-[#2d2a27]/50">
                    Reservas activas
                  </p>
                  <CalendarDays className="h-5 w-5 text-[#789894]" />
                </div>
                <p className="mt-4 text-[34px] font-semibold">{bookings.length}</p>
              </div>

              <div className="rounded-[28px] bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] uppercase tracking-[0.14em] text-[#2d2a27]/50">
                    Ingreso pagado
                  </p>
                  <CheckCircle2 className="h-5 w-5 text-[#789894]" />
                </div>
                <p className="mt-4 text-[34px] font-semibold">
                  {formatMoney(paidTotal)}
                </p>
              </div>

              <div className="rounded-[28px] bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] uppercase tracking-[0.14em] text-[#2d2a27]/50">
                    Pendiente
                  </p>
                  <Clock3 className="h-5 w-5 text-[#789894]" />
                </div>
                <p className="mt-4 text-[34px] font-semibold">
                  {formatMoney(pendingTotal)}
                </p>
              </div>

              <div className="rounded-[28px] bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] uppercase tracking-[0.14em] text-[#2d2a27]/50">
                    Publicaciones
                  </p>
                  <Camera className="h-5 w-5 text-[#789894]" />
                </div>
                <p className="mt-4 text-[34px] font-semibold">{media.length}</p>
              </div>
            </section>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              {/* Left column */}
              <div className="grid gap-6">
                {/* Reservations + form */}
                <section className="rounded-[30px] bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.05)] md:p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-[Allura] text-[42px] leading-none text-[#789894]">
                        reservas
                      </p>
                      <h2 className="mt-1 text-[22px] font-semibold uppercase tracking-[0.03em] md:text-[28px]">
                        Gestión manual
                      </h2>
                    </div>

                    <div className="relative w-full md:max-w-[320px]">
                      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2d2a27]/35" />
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar cliente o servicio"
                        className="w-full rounded-full border border-black/10 bg-[#f4f0ea] py-3 pl-11 pr-4 text-[14px] outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                    <div className="rounded-[24px] bg-[#f4f0ea] p-5">
                      <div className="flex items-center justify-between">
                        <p className="text-[12px] uppercase tracking-[0.14em] text-[#2d2a27]/55">
                          nueva reserva
                        </p>
                        <Plus className="h-5 w-5 text-[#789894]" />
                      </div>

                      <div className="mt-5 grid gap-4">
                        <input
                          value={newBooking.client}
                          onChange={(e) =>
                            setNewBooking((prev) => ({
                              ...prev,
                              client: e.target.value,
                            }))
                          }
                          placeholder="Nombre del cliente"
                          className="rounded-[18px] border border-black/8 bg-white px-4 py-4 outline-none"
                        />
                        <div className="grid gap-4 md:grid-cols-2">
                          <input
                            value={newBooking.email}
                            onChange={(e) =>
                              setNewBooking((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            placeholder="Correo"
                            className="rounded-[18px] border border-black/8 bg-white px-4 py-4 outline-none"
                          />
                          <input
                            value={newBooking.phone}
                            onChange={(e) =>
                              setNewBooking((prev) => ({
                                ...prev,
                                phone: e.target.value,
                              }))
                            }
                            placeholder="Teléfono"
                            className="rounded-[18px] border border-black/8 bg-white px-4 py-4 outline-none"
                          />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <select
                            value={newBooking.service}
                            onChange={(e) =>
                              setNewBooking((prev) => ({
                                ...prev,
                                service: e.target.value,
                              }))
                            }
                            className="rounded-[18px] border border-black/8 bg-white px-4 py-4 outline-none"
                          >
                            <option>Boda</option>
                            <option>Pre-Boda</option>
                            <option>Foto Estudio</option>
                            <option>Video</option>
                          </select>

                          <input
                            value={newBooking.amount}
                            onChange={(e) =>
                              setNewBooking((prev) => ({
                                ...prev,
                                amount: e.target.value,
                              }))
                            }
                            placeholder="Valor"
                            className="rounded-[18px] border border-black/8 bg-white px-4 py-4 outline-none"
                          />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <input
                            type="date"
                            value={newBooking.date}
                            onChange={(e) =>
                              setNewBooking((prev) => ({
                                ...prev,
                                date: e.target.value,
                              }))
                            }
                            className="rounded-[18px] border border-black/8 bg-white px-4 py-4 outline-none"
                          />
                          <input
                            type="time"
                            value={newBooking.time}
                            onChange={(e) =>
                              setNewBooking((prev) => ({
                                ...prev,
                                time: e.target.value,
                              }))
                            }
                            className="rounded-[18px] border border-black/8 bg-white px-4 py-4 outline-none"
                          />
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                          <button
                            onClick={addBooking}
                            className="rounded-full bg-[#789894] px-6 py-3 text-[12px] uppercase tracking-[0.12em] text-white"
                          >
                            Crear reserva
                          </button>
                          <button className="rounded-full border border-black/10 bg-white px-6 py-3 text-[12px] uppercase tracking-[0.12em]">
                            Enviar confirmación
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-[24px] border border-black/8">
                      <div className="grid grid-cols-[1.2fr_0.9fr_0.9fr_0.8fr_0.9fr] bg-[#789894] px-4 py-4 text-[11px] uppercase tracking-[0.12em] text-white">
                        <span>Cliente</span>
                        <span>Servicio</span>
                        <span>Fecha</span>
                        <span>Estado</span>
                        <span>Pago</span>
                      </div>

                      <div className="max-h-[440px] overflow-auto">
                        {filteredBookings.map((booking) => (
                          <div
                            key={booking.id}
                            className="grid grid-cols-[1.2fr_0.9fr_0.9fr_0.8fr_0.9fr] items-center gap-3 border-b border-black/6 px-4 py-4 text-[13px]"
                          >
                            <div>
                              <p className="font-medium">{booking.client}</p>
                              <p className="text-[#2d2a27]/55">{booking.email}</p>
                            </div>
                            <p>{booking.service}</p>
                            <div>
                              <p>{booking.date}</p>
                              <p className="text-[#2d2a27]/55">{booking.time}</p>
                            </div>
                            <span
                              className={`inline-flex w-fit rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.12em] ${getStatusClasses(
                                booking.bookingStatus
                              )}`}
                            >
                              {booking.bookingStatus}
                            </span>
                            <button
                              onClick={() => togglePaymentStatus(booking.id)}
                              className={`inline-flex w-fit rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.12em] transition ${getPaymentClasses(
                                booking.paymentStatus
                              )}`}
                            >
                              {booking.paymentStatus}
                            </button>
                          </div>
                        ))}

                        {filteredBookings.length === 0 && (
                          <div className="px-4 py-12 text-center text-[#2d2a27]/55">
                            No hay resultados para esta búsqueda.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Finances */}
                <section className="rounded-[30px] bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.05)] md:p-6">
                  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="font-[Allura] text-[42px] leading-none text-[#789894]">
                        finanzas
                      </p>
                      <h2 className="mt-1 text-[22px] font-semibold uppercase tracking-[0.03em] md:text-[28px]">
                        Resumen mensual
                      </h2>
                    </div>

                    <p className="max-w-[520px] text-[14px] leading-7 text-[#2d2a27]/65">
                      El switch de cada reserva cambia entre pagado y pendiente.
                      Cuando está en pagado, el valor se suma automáticamente al
                      mes correspondiente.
                    </p>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {monthSummary.length > 0 ? (
                      monthSummary.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-[22px] bg-[#f4f0ea] p-5"
                        >
                          <p className="text-[12px] uppercase tracking-[0.12em] text-[#2d2a27]/55">
                            {item.label}
                          </p>
                          <p className="mt-3 text-[24px] font-semibold">
                            {formatMoney(item.total)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-[22px] bg-[#f4f0ea] p-5 text-[#2d2a27]/55">
                        Aún no hay ingresos pagados registrados.
                      </div>
                    )}
                  </div>
                </section>

                {/* Media manager */}
                <section className="rounded-[30px] bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.05)] md:p-6">
                  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="font-[Allura] text-[42px] leading-none text-[#789894]">
                        media
                      </p>
                      <h2 className="mt-1 text-[22px] font-semibold uppercase tracking-[0.03em] md:text-[28px]">
                        Publicación y gestión
                      </h2>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button className="rounded-full border border-black/10 bg-white px-5 py-3 text-[12px] uppercase tracking-[0.12em]">
                        <Upload className="mr-2 inline h-4 w-4" />
                        Subir
                      </button>
                      <button className="rounded-full bg-[#789894] px-5 py-3 text-[12px] uppercase tracking-[0.12em] text-white">
                        <ImagePlus className="mr-2 inline h-4 w-4" />
                        Nuevo post
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {media.map((item) => (
                      <article
                        key={item.id}
                        className="overflow-hidden rounded-[24px] bg-[#f4f0ea]"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-[240px] w-full object-cover"
                        />
                        <div className="p-4">
                          <p className="text-[15px] font-medium">{item.title}</p>
                          <p className="mt-1 text-[12px] uppercase tracking-[0.12em] text-[#2d2a27]/50">
                            {item.category}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <button
                              onClick={() => togglePublish(item.id)}
                              className={`rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.12em] ${
                                item.status === "publicado"
                                  ? "bg-[#789894] text-white"
                                  : "bg-white text-[#2d2a27]"
                              }`}
                            >
                              {item.status}
                            </button>

                            <button className="rounded-full bg-white px-3 py-2 text-[11px] uppercase tracking-[0.12em]">
                              Editar
                            </button>

                            <button
                              onClick={() => deleteMedia(item.id)}
                              className="rounded-full bg-white px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-rose-600"
                            >
                              <Trash2 className="mr-1 inline h-3.5 w-3.5" />
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div className="grid gap-6">
                {/* Calendar */}
                <section className="rounded-[30px] bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.05)] md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-[Allura] text-[42px] leading-none text-[#789894]">
                        calendario
                      </p>
                      <h2 className="mt-1 text-[22px] font-semibold uppercase tracking-[0.03em] md:text-[28px]">
                        Agenda visual
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setCalendarMonth((prev) => (prev === 0 ? 11 : prev - 1))
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() =>
                          setCalendarMonth((prev) => (prev === 11 ? 0 : prev + 1))
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 rounded-[24px] bg-[#f4f0ea] p-5">
                    <div className="mb-4 text-center">
                      <p className="text-[14px] uppercase tracking-[0.16em] text-[#2d2a27]/60">
                        {months[calendarMonth]} {calendarYear}
                      </p>
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center text-[11px] uppercase tracking-[0.12em] text-[#2d2a27]/45">
                      {["D", "L", "M", "M", "J", "V", "S"].map((d, idx) => (
                        <span key={`${d}-${idx}`}>{d}</span>
                      ))}
                    </div>

                    <div className="mt-3 grid grid-cols-7 gap-2">
                      {calendarDays.map((day, idx) => {
                        const hasBooking =
                          day !== null &&
                          thisMonthBookings.some((booking) => {
                            const date = new Date(`${booking.date}T00:00:00`);
                            return date.getDate() === day;
                          });

                        return (
                          <div
                            key={idx}
                            className={`flex aspect-square items-center justify-center rounded-[14px] text-[13px] ${
                              day === null
                                ? "bg-transparent"
                                : hasBooking
                                ? "bg-[#789894] text-white"
                                : "bg-white text-[#2d2a27]"
                            }`}
                          >
                            {day}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-[12px] uppercase tracking-[0.14em] text-[#2d2a27]/55">
                      Reservas del mes
                    </p>

                    <div className="mt-4 space-y-3">
                      {thisMonthBookings.length > 0 ? (
                        thisMonthBookings.map((booking) => (
                          <div
                            key={booking.id}
                            className="rounded-[20px] border border-black/8 bg-white p-4"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="font-medium">{booking.client}</p>
                                <p className="mt-1 text-[13px] text-[#2d2a27]/55">
                                  {booking.service}
                                </p>
                              </div>
                              <span className="rounded-full bg-[#f4f0ea] px-3 py-1 text-[11px] uppercase tracking-[0.12em]">
                                {booking.date}
                              </span>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                              <button className="rounded-full bg-[#789894] px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-white">
                                <Mail className="mr-1 inline h-3.5 w-3.5" />
                                Confirmar
                              </button>
                              <button className="rounded-full bg-[#f4f0ea] px-3 py-2 text-[11px] uppercase tracking-[0.12em]">
                                <MessageSquareMore className="mr-1 inline h-3.5 w-3.5" />
                                Detalle
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-[20px] bg-[#f4f0ea] p-4 text-[#2d2a27]/55">
                          No hay reservas registradas para este mes.
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* Config block */}
                <section className="rounded-[30px] bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.05)] md:p-6">
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-[#789894]" />
                    <h2 className="text-[22px] font-semibold uppercase tracking-[0.03em] md:text-[28px]">
                      Vista futura
                    </h2>
                  </div>

                  <div className="mt-5 grid gap-4">
                    <div className="rounded-[22px] bg-[#f4f0ea] p-5">
                      <p className="text-[12px] uppercase tracking-[0.12em] text-[#2d2a27]/55">
                        Próximo backend
                      </p>
                      <p className="mt-3 text-[15px] leading-8 text-[#2d2a27]/72">
                        Esta vista ya está pensada para conectarse después con
                        base de datos, Cloudinary, reservas reales, correos de
                        confirmación y calendario sincronizado.
                      </p>
                    </div>

                    <div className="rounded-[22px] bg-[#f4f0ea] p-5">
                      <p className="text-[12px] uppercase tracking-[0.12em] text-[#2d2a27]/55">
                        Próximos módulos
                      </p>
                      <ul className="mt-3 space-y-2 text-[15px] leading-7 text-[#2d2a27]/72">
                        <li>• Integración con calendario real</li>
                        <li>• Envío de correo automático</li>
                        <li>• Subida real a Cloudinary</li>
                        <li>• Finanzas conectadas a base de datos</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}