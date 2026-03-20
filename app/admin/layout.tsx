'use client';

import React, { useMemo, useState } from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Wallet,
  ImageIcon,
  FolderKanban,
  Mail,
  Settings,
  Camera,
  Search,
  Bell,
  Plus,
  Upload,
  Trash2,
  Pencil,
  ChevronRight,
  Phone,
  CalendarClock,
  MapPin,
  Eye,
  Check,
  X,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Menu,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function money(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-[24px] md:rounded-[28px] border border-white/10 bg-white/[0.06] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.28)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[#d7b48a]/70">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-lg sm:text-xl font-medium text-[#fff2e2]">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-sm text-white/55">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

function StatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <GlassCard className="p-4">
      <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/45">
        {label}
      </p>
      <h3 className="mt-3 text-xl sm:text-2xl font-semibold text-[#fff2e2] break-words">
        {value}
      </h3>
      <p className="mt-2 text-xs text-white/45">{helper}</p>
    </GlassCard>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white/60">{label}</span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'w-full min-w-0 rounded-[16px] sm:rounded-[18px] border border-white/10 bg-black/20 px-4 py-3 text-sm text-[#fff2e2] outline-none placeholder:text-white/30 focus:border-[#e1ab71]/30',
        props.className,
      )}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        'w-full min-w-0 rounded-[16px] sm:rounded-[18px] border border-white/10 bg-black/20 px-4 py-3 text-sm text-[#fff2e2] outline-none focus:border-[#e1ab71]/30',
        props.className,
      )}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        'w-full min-w-0 rounded-[16px] sm:rounded-[18px] border border-white/10 bg-black/20 px-4 py-3 text-sm text-[#fff2e2] outline-none placeholder:text-white/30 focus:border-[#e1ab71]/30',
        props.className,
      )}
    />
  );
}

type View =
  | 'overview'
  | 'reservas'
  | 'clientes'
  | 'finanzas'
  | 'publicaciones'
  | 'planes'
  | 'mensajes'
  | 'settings';

type PlanName = 'Basic' | 'Classic' | 'Premium' | 'Diamante' | 'Gold';
type FinanceStatus = 'Pagado' | 'Pendiente';
type BookingStatus = 'Confirmada' | 'Pendiente' | 'Nueva';
type PublicationStatus = 'Borrador' | 'Publicado';

type FinanceRow = {
  id: number;
  client: string;
  plan: PlanName;
  amount: number;
  date: string;
  method: string;
  status: FinanceStatus;
};

type Booking = {
  id: number;
  client: string;
  phone: string;
  date: string;
  place: string;
  plan: PlanName;
  status: BookingStatus;
};

type Publication = {
  id: number;
  section: string;
  title: string;
  text: string;
  buttonText: string;
  image: string;
  status: PublicationStatus;
};

type MessageItem = {
  id: number;
  name: string;
  text: string;
  tag: string;
  open: boolean;
};

const plans: { name: PlanName; price: number; info: string }[] = [
  { name: 'Basic', price: 1500000, info: 'Cobertura inicial' },
  { name: 'Classic', price: 2200000, info: 'Más tiempo y más fotos' },
  { name: 'Premium', price: 3200000, info: 'Experiencia editorial' },
  { name: 'Diamante', price: 4500000, info: 'Cobertura extendida' },
  { name: 'Gold', price: 5200000, info: 'Plan más completo' },
];

const nav: Array<{
  id: View;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'reservas', label: 'Reservas', icon: CalendarDays },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'finanzas', label: 'Finanzas', icon: Wallet },
  { id: 'publicaciones', label: 'Publicaciones', icon: ImageIcon },
  { id: 'planes', label: 'Planes', icon: FolderKanban },
  { id: 'mensajes', label: 'Mensajes', icon: Mail },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const bookingsSeed: Booking[] = [
  {
    id: 1,
    client: 'Valentina Torres',
    phone: '+57 301 245 8890',
    date: '2026-03-22T10:00',
    place: 'Bogotá Studio',
    plan: 'Basic',
    status: 'Confirmada',
  },
  {
    id: 2,
    client: 'Diego Ramírez',
    phone: '+57 310 884 1182',
    date: '2026-03-24T16:30',
    place: 'Villa de Leyva',
    plan: 'Premium',
    status: 'Pendiente',
  },
];

const financeSeed: FinanceRow[] = [
  {
    id: 1,
    client: 'Valentina Torres',
    plan: 'Basic',
    amount: 1500000,
    date: '2026-03-22',
    method: 'Transferencia',
    status: 'Pagado',
  },
  {
    id: 2,
    client: 'Diego Ramírez',
    plan: 'Premium',
    amount: 800000,
    date: '2026-03-24',
    method: 'Efectivo',
    status: 'Pendiente',
  },
  {
    id: 3,
    client: 'Paula Herrera',
    plan: 'Classic',
    amount: 2200000,
    date: '2026-03-12',
    method: 'Transferencia',
    status: 'Pagado',
  },
  {
    id: 4,
    client: 'María Rojas',
    plan: 'Gold',
    amount: 5200000,
    date: '2026-02-18',
    method: 'Transferencia',
    status: 'Pagado',
  },
];

const publicationsSeed: Publication[] = [
  {
    id: 1,
    section: 'Hero',
    title: 'Imágenes que no solo documentan un momento',
    text: 'Una memoria visual elegante y sensible.',
    buttonText: 'Reserva tu fecha',
    image:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',
    status: 'Publicado',
  },
  {
    id: 2,
    section: 'About',
    title: 'Una presentación más editorial, romántica y elegante.',
    text: 'Acerca de mí y de la propuesta visual.',
    buttonText: 'Conoce más',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    status: 'Borrador',
  },
];

const messagesSeed: MessageItem[] = [
  {
    id: 1,
    name: 'Laura Gómez',
    text: 'Quiero cotizar una sesión de pareja para abril.',
    tag: 'Pareja',
    open: false,
  },
  {
    id: 2,
    name: 'Sara Mendoza',
    text: '¿Tienes disponibilidad para una boda en junio?',
    tag: 'Boda',
    open: false,
  },
  {
    id: 3,
    name: 'María José',
    text: 'Me interesa una sesión de maternidad en estudio.',
    tag: 'Maternidad',
    open: false,
  },
];

function monthTitle(date: Date) {
  return new Intl.DateTimeFormat('es-CO', {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function toDateOnly(value: string) {
  if (!value) return '';
  return value.slice(0, 10);
}

function formatBookingDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(parsed);
}

export default function AdminDashboardPage() {
  const [view, setView] = useState<View>('overview');
  const [toast, setToast] = useState<string>('');
  const [search, setSearch] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>(bookingsSeed);
  const [finances, setFinances] = useState<FinanceRow[]>(financeSeed);
  const [publications, setPublications] =
    useState<Publication[]>(publicationsSeed);
  const [messages, setMessages] = useState<MessageItem[]>(messagesSeed);

  const [financeTab, setFinanceTab] = useState<'form' | 'list'>('form');
  const [publicationTab, setPublicationTab] = useState<'editor' | 'feed'>(
    'editor',
  );

  const today = new Date();
  const [calendarMonth, setCalendarMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(
    toDateOnly(new Date().toISOString()),
  );

  const [financeForm, setFinanceForm] = useState<{
    client: string;
    plan: PlanName;
    amount: string;
    date: string;
    method: string;
    status: FinanceStatus;
  }>({
    client: '',
    plan: 'Basic',
    amount: '',
    date: '',
    method: 'Transferencia',
    status: 'Pagado',
  });

  const [bookingForm, setBookingForm] = useState<{
    client: string;
    phone: string;
    date: string;
    place: string;
    plan: PlanName;
  }>({
    client: '',
    phone: '',
    date: '',
    place: '',
    plan: 'Basic',
  });

  const [publicationForm, setPublicationForm] = useState<{
    id: number | null;
    section: string;
    title: string;
    text: string;
    buttonText: string;
    image: string;
    status: PublicationStatus;
  }>({
    id: null,
    section: 'Hero',
    title: '',
    text: '',
    buttonText: '',
    image: '',
    status: 'Publicado',
  });

  const [settingsState, setSettingsState] = useState({
    reservations: true,
    testimonials: true,
    emailAlerts: true,
    blockSundays: false,
  });

  const showToast = (msg: string) => {
    setToast(msg);
    window.clearTimeout((showToast as unknown as { timer?: number }).timer);
    (showToast as unknown as { timer?: number }).timer = window.setTimeout(() => {
      setToast('');
    }, 2200);
  };

  const totalRevenue = useMemo(
    () =>
      finances
        .filter((f) => f.status === 'Pagado')
        .reduce((acc, item) => acc + item.amount, 0),
    [finances],
  );

  const totalPending = useMemo(
    () =>
      finances
        .filter((f) => f.status === 'Pendiente')
        .reduce((acc, item) => acc + item.amount, 0),
    [finances],
  );

  const reservedThisMonth = bookings.length;
  const totalClients = new Set([
    ...bookings.map((b) => b.client),
    ...finances.map((f) => f.client),
  ]).size;

  const financeChart = useMemo(() => {
    const monthNames = [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ];

    const map: Record<
      string,
      { month: string; ingresos: number; pendientes: number }
    > = {};

    monthNames.slice(0, 6).forEach((m) => {
      map[m] = { month: m, ingresos: 0, pendientes: 0 };
    });

    finances.forEach((row) => {
      const parsed = new Date(row.date);
      if (Number.isNaN(parsed.getTime())) return;
      const month = monthNames[parsed.getMonth()];
      if (!map[month]) return;

      if (row.status === 'Pagado') map[month].ingresos += row.amount;
      else map[month].pendientes += row.amount;
    });

    return Object.values(map);
  }, [finances]);

  const filteredFinances = useMemo(() => {
    if (!search.trim()) return finances;
    return finances.filter(
      (row) =>
        row.client.toLowerCase().includes(search.toLowerCase()) ||
        row.plan.toLowerCase().includes(search.toLowerCase()) ||
        row.method.toLowerCase().includes(search.toLowerCase()),
    );
  }, [finances, search]);

  const filteredBookings = useMemo(() => {
    if (!search.trim()) return bookings;
    return bookings.filter(
      (row) =>
        row.client.toLowerCase().includes(search.toLowerCase()) ||
        row.plan.toLowerCase().includes(search.toLowerCase()) ||
        row.place.toLowerCase().includes(search.toLowerCase()),
    );
  }, [bookings, search]);

  const filteredPublications = useMemo(() => {
    if (!search.trim()) return publications;
    return publications.filter(
      (row) =>
        row.title.toLowerCase().includes(search.toLowerCase()) ||
        row.section.toLowerCase().includes(search.toLowerCase()),
    );
  }, [publications, search]);

  const bookingsForSelectedDate = useMemo(() => {
    return bookings.filter((booking) => toDateOnly(booking.date) === selectedDate);
  }, [bookings, selectedDate]);

  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startWeekDay = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: Array<{
      date: Date;
      dateKey: string;
      currentMonth: boolean;
      hasBookings: boolean;
      count: number;
    }> = [];

    for (let i = 0; i < startWeekDay; i++) {
      const d = new Date(year, month, i - startWeekDay + 1);
      const key = toDateOnly(d.toISOString());
      const count = bookings.filter((b) => toDateOnly(b.date) === key).length;
      cells.push({
        date: d,
        dateKey: key,
        currentMonth: false,
        hasBookings: count > 0,
        count,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const key = toDateOnly(d.toISOString());
      const count = bookings.filter((b) => toDateOnly(b.date) === key).length;
      cells.push({
        date: d,
        dateKey: key,
        currentMonth: true,
        hasBookings: count > 0,
        count,
      });
    }

    while (cells.length % 7 !== 0) {
      const d = new Date(year, month, daysInMonth + (cells.length % 7) + 1);
      const key = toDateOnly(d.toISOString());
      const count = bookings.filter((b) => toDateOnly(b.date) === key).length;
      cells.push({
        date: d,
        dateKey: key,
        currentMonth: false,
        hasBookings: count > 0,
        count,
      });
    }

    return cells;
  }, [calendarMonth, bookings]);

  const addFinanceRow = () => {
    if (!financeForm.client || !financeForm.amount || !financeForm.date) {
      showToast('Completa cliente, monto y fecha.');
      return;
    }

    const row: FinanceRow = {
      id: Date.now(),
      client: financeForm.client,
      plan: financeForm.plan,
      amount: Number(financeForm.amount),
      date: financeForm.date,
      method: financeForm.method,
      status: financeForm.status,
    };

    setFinances((prev) => [row, ...prev]);
    setFinanceForm({
      client: '',
      plan: 'Basic',
      amount: '',
      date: '',
      method: 'Transferencia',
      status: 'Pagado',
    });
    setFinanceTab('list');
    showToast('Ingreso guardado correctamente.');
  };

  const addBooking = () => {
    if (
      !bookingForm.client ||
      !bookingForm.phone ||
      !bookingForm.date ||
      !bookingForm.place
    ) {
      showToast('Completa todos los campos de la reserva.');
      return;
    }

    const row: Booking = {
      id: Date.now(),
      client: bookingForm.client,
      phone: bookingForm.phone,
      date: bookingForm.date,
      place: bookingForm.place,
      plan: bookingForm.plan,
      status: 'Nueva',
    };

    setBookings((prev) => [row, ...prev]);
    setSelectedDate(toDateOnly(bookingForm.date));
    setBookingForm({
      client: '',
      phone: '',
      date: '',
      place: '',
      plan: 'Basic',
    });
    showToast('Reserva creada.');
  };

  const savePublication = () => {
    if (
      !publicationForm.section ||
      !publicationForm.title ||
      !publicationForm.text
    ) {
      showToast('Completa sección, título y texto.');
      return;
    }

    const payload: Publication = {
      id: publicationForm.id ?? Date.now(),
      section: publicationForm.section,
      title: publicationForm.title,
      text: publicationForm.text,
      buttonText: publicationForm.buttonText,
      image:
        publicationForm.image ||
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop',
      status: publicationForm.status,
    };

    if (publicationForm.id) {
      setPublications((prev) =>
        prev.map((item) => (item.id === publicationForm.id ? payload : item)),
      );
      showToast('Publicación actualizada.');
    } else {
      setPublications((prev) => [payload, ...prev]);
      showToast('Publicación creada.');
    }

    setPublicationForm({
      id: null,
      section: 'Hero',
      title: '',
      text: '',
      buttonText: '',
      image: '',
      status: 'Publicado',
    });
    setPublicationTab('feed');
  };

  const editPublication = (item: Publication) => {
    setPublicationForm({
      id: item.id,
      section: item.section,
      title: item.title,
      text: item.text,
      buttonText: item.buttonText,
      image: item.image,
      status: item.status,
    });
    setPublicationTab('editor');
    setView('publicaciones');
    showToast('Editando publicación.');
  };

  const removePublication = (id: number) => {
    setPublications((prev) => prev.filter((item) => item.id !== id));
    showToast('Publicación eliminada.');
  };

  const removeFinance = (id: number) => {
    setFinances((prev) => prev.filter((item) => item.id !== id));
    showToast('Movimiento eliminado.');
  };

  const togglePublicationStatus = (id: number) => {
    setPublications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'Publicado' ? 'Borrador' : 'Publicado',
            }
          : item,
      ),
    );
    showToast('Estado de publicación actualizado.');
  };

  const toggleMessageOpen = (id: number) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, open: !msg.open } : msg)),
    );
  };

  const toggleSetting = (key: keyof typeof settingsState) => {
    setSettingsState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderOverview = () => (
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4">
        <StatCard
          label="Ingresos"
          value={money(totalRevenue)}
          helper="Pagos registrados"
        />
        <StatCard
          label="Pendiente"
          value={money(totalPending)}
          helper="Por cobrar"
        />
        <StatCard
          label="Reservas"
          value={String(reservedThisMonth)}
          helper="Sesiones activas"
        />
        <StatCard
          label="Clientes"
          value={String(totalClients)}
          helper="Base total registrada"
        />
      </div>

      <div className="grid gap-4 grid-cols-1 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,380px)]">
        <GlassCard className="p-4 sm:p-5 min-w-0">
          <SectionTitle
            eyebrow="Resumen"
            title="Ingresos y pendientes"
            description="Lo que realmente registraste en finanzas."
            action={
              <button
                onClick={() => setView('finanzas')}
                className="rounded-full border border-[#e1ab71]/20 bg-[#e1ab71]/12 px-4 py-2 text-sm text-[#ffd8ac] w-full sm:w-auto"
              >
                Ir a finanzas
              </button>
            }
          />
          <div className="h-[240px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={financeChart}
                margin={{ top: 10, right: 10, left: -18, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e1ab71" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="#e1ab71" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke="rgba(255,255,255,0.06)"
                  strokeDasharray="3 8"
                />
                <XAxis
                  dataKey="month"
                  stroke="#b69774"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#b69774"
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(12,12,14,0.92)',
                    border: '1px solid rgba(225,171,113,0.14)',
                    borderRadius: 18,
                    color: '#fff',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="ingresos"
                  stroke="#efb16d"
                  fill="url(#incomeFill)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-4 sm:p-5 min-w-0">
          <SectionTitle
            eyebrow="Actividad"
            title="Últimos movimientos"
            action={
              <button
                onClick={() => {
                  setFinanceTab('list');
                  setView('finanzas');
                }}
                className="text-sm text-[#f0c28f] w-full text-left sm:w-auto sm:text-right"
              >
                Ver lista
              </button>
            }
          />
          <div className="space-y-3">
            {finances.slice(0, 5).map((row) => (
              <div
                key={row.id}
                className="rounded-[18px] sm:rounded-[22px] border border-white/8 bg-white/[0.04] p-4"
              >
                <p className="font-medium text-[#fff2e2]">{row.client}</p>
                <p className="mt-1 text-sm text-white/55 break-words">
                  {row.plan} · {row.method}
                </p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-xs text-white/40 break-words">{row.date}</span>
                  <span className="text-sm text-[#f0c28f] text-right">
                    {money(row.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );

  const renderReservas = () => (
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-[360px_minmax(0,1fr)]">
        <GlassCard className="p-4 sm:p-5">
          <SectionTitle
            eyebrow="Formulario"
            title="Nueva reserva"
            description="Llena la información real del cliente y servicio."
          />
          <div className="space-y-4">
            <Field label="Nombre del cliente">
              <Input
                value={bookingForm.client}
                onChange={(e) =>
                  setBookingForm((prev) => ({ ...prev, client: e.target.value }))
                }
                placeholder="Ej. Valentina Torres"
              />
            </Field>

            <Field label="Teléfono">
              <Input
                value={bookingForm.phone}
                onChange={(e) =>
                  setBookingForm((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder="+57 300 000 0000"
              />
            </Field>

            <Field label="Fecha y hora">
              <Input
                type="datetime-local"
                value={bookingForm.date}
                onChange={(e) =>
                  setBookingForm((prev) => ({ ...prev, date: e.target.value }))
                }
              />
            </Field>

            <Field label="Lugar">
              <Input
                value={bookingForm.place}
                onChange={(e) =>
                  setBookingForm((prev) => ({ ...prev, place: e.target.value }))
                }
                placeholder="Bogotá Studio / finca / exterior"
              />
            </Field>

            <Field label="Plan">
              <Select
                value={bookingForm.plan}
                onChange={(e) =>
                  setBookingForm((prev) => ({
                    ...prev,
                    plan: e.target.value as PlanName,
                  }))
                }
              >
                {plans.map((plan) => (
                  <option key={plan.name} value={plan.name}>
                    {plan.name}
                  </option>
                ))}
              </Select>
            </Field>

            <button
              onClick={addBooking}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#e1ab71]/20 bg-[#e1ab71]/12 px-4 py-3 text-sm font-medium text-[#ffd8ac]"
            >
              <Plus className="h-4 w-4" />
              Crear reserva
            </button>
          </div>
        </GlassCard>

        <GlassCard className="p-4 sm:p-5 min-w-0">
          <SectionTitle
            eyebrow="Calendario"
            title="Agenda visual"
            description="Las fechas con reservas quedan resaltadas."
            action={
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCalendarMonth(
                      new Date(
                        calendarMonth.getFullYear(),
                        calendarMonth.getMonth() - 1,
                        1,
                      ),
                    )
                  }
                  className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-white/70"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() =>
                    setCalendarMonth(
                      new Date(
                        calendarMonth.getFullYear(),
                        calendarMonth.getMonth() + 1,
                        1,
                      ),
                    )
                  }
                  className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-white/70"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
            }
          />

          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-base sm:text-lg font-medium capitalize text-[#fff2e2]">
              {monthTitle(calendarMonth)}
            </h3>
            <button
              onClick={() => {
                const now = new Date();
                setCalendarMonth(new Date(now.getFullYear(), now.getMonth(), 1));
                setSelectedDate(toDateOnly(now.toISOString()));
              }}
              className="rounded-full border border-[#e1ab71]/20 bg-[#e1ab71]/12 px-4 py-2 text-sm text-[#ffd8ac] w-full sm:w-auto"
            >
              Hoy
            </button>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[560px]">
              <div className="grid grid-cols-7 gap-2 text-center text-[10px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] text-white/35">
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => (
                  <div key={day} className="py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((cell) => {
                  const isSelected = cell.dateKey === selectedDate;
                  const isToday =
                    cell.dateKey === toDateOnly(new Date().toISOString());

                  return (
                    <button
                      key={`${cell.dateKey}-${cell.currentMonth}`}
                      onClick={() => setSelectedDate(cell.dateKey)}
                      className={cn(
                        'relative min-h-[72px] sm:min-h-[88px] rounded-[16px] sm:rounded-[20px] border p-2 sm:p-3 text-left transition',
                        cell.currentMonth
                          ? 'border-white/8 bg-white/[0.04]'
                          : 'border-white/[0.04] bg-white/[0.02]',
                        isSelected && 'border-[#e1ab71]/30 bg-[#e1ab71]/12',
                      )}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={cn(
                            'text-xs sm:text-sm',
                            cell.currentMonth
                              ? 'text-[#fff2e2]'
                              : 'text-white/25',
                            isToday && 'font-semibold text-[#f3c792]',
                          )}
                        >
                          {cell.date.getDate()}
                        </span>
                        {cell.count > 0 ? (
                          <span className="rounded-full bg-[#e1ab71]/15 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] text-[#ffd8ac]">
                            {cell.count}
                          </span>
                        ) : null}
                      </div>

                      {cell.hasBookings ? (
                        <div className="mt-3 sm:mt-4 flex flex-wrap gap-1">
                          {Array.from({ length: Math.min(cell.count, 3) }).map(
                            (_, i) => (
                              <span
                                key={i}
                                className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#efb16d]"
                              />
                            ),
                          )}
                        </div>
                      ) : (
                        <div className="mt-3 sm:mt-4 h-2.5" />
                      )}

                      {isSelected ? (
                        <div className="absolute inset-x-2 sm:inset-x-3 bottom-2 sm:bottom-3 h-[2px] rounded-full bg-[#efb16d]" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-4 sm:p-5">
        <SectionTitle
          eyebrow="Agenda del día"
          title={
            selectedDate ? `Reservas del ${selectedDate}` : 'Selecciona una fecha'
          }
          description="Aquí ves lo agendado para el día seleccionado."
        />
        {bookingsForSelectedDate.length === 0 ? (
          <div className="rounded-[18px] sm:rounded-[22px] border border-white/8 bg-white/[0.04] p-6 text-sm text-white/50">
            No hay reservas para esta fecha.
          </div>
        ) : (
          <div className="space-y-3">
            {bookingsForSelectedDate.map((item) => (
              <div
                key={item.id}
                className="rounded-[20px] sm:rounded-[24px] border border-white/8 bg-white/[0.04] p-4"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <p className="text-base sm:text-lg font-medium text-[#fff2e2]">
                      {item.client}
                    </p>
                    <div className="mt-3 grid gap-2 text-sm text-white/55 md:grid-cols-2">
                      <p className="inline-flex items-center gap-2 break-words">
                        <Phone className="h-4 w-4 shrink-0" />
                        {item.phone}
                      </p>
                      <p className="inline-flex items-center gap-2 break-words">
                        <CalendarClock className="h-4 w-4 shrink-0" />
                        {formatBookingDate(item.date)}
                      </p>
                      <p className="inline-flex items-center gap-2 break-words">
                        <MapPin className="h-4 w-4 shrink-0" />
                        {item.place}
                      </p>
                      <p>{item.plan}</p>
                    </div>
                  </div>

                  <span className="self-start rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/70">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      <GlassCard className="p-4 sm:p-5">
        <SectionTitle
          eyebrow="Lista"
          title="Todas las reservas"
          description="Vista general de todas las sesiones registradas."
        />
        <div className="space-y-3">
          {filteredBookings.map((item) => (
            <div
              key={item.id}
              className="rounded-[20px] sm:rounded-[24px] border border-white/8 bg-white/[0.04] p-4"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <p className="text-base sm:text-lg font-medium text-[#fff2e2]">
                    {item.client}
                  </p>
                  <div className="mt-3 grid gap-2 text-sm text-white/55 md:grid-cols-2">
                    <p className="inline-flex items-center gap-2 break-words">
                      <Phone className="h-4 w-4 shrink-0" />
                      {item.phone}
                    </p>
                    <p className="inline-flex items-center gap-2 break-words">
                      <CalendarClock className="h-4 w-4 shrink-0" />
                      {formatBookingDate(item.date)}
                    </p>
                    <p className="inline-flex items-center gap-2 break-words">
                      <MapPin className="h-4 w-4 shrink-0" />
                      {item.place}
                    </p>
                    <p>{item.plan}</p>
                  </div>
                </div>

                <span className="self-start rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/70">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );

  const renderClientes = () => {
    const clientNames = Array.from(
      new Set([...bookings.map((b) => b.client), ...finances.map((f) => f.client)]),
    );

    return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {clientNames.map((name, i) => (
          <GlassCard key={name} className="p-4 sm:p-5">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/40">
              Cliente {String(i + 1).padStart(2, '0')}
            </p>
            <h3 className="mt-3 text-lg sm:text-xl font-medium text-[#fff2e2] break-words">
              {name}
            </h3>
            <p className="mt-2 text-sm text-white/55">
              Historial generado desde reservas y finanzas.
            </p>
            <button
              onClick={() => {
                setSearch(name);
                setView('finanzas');
                setFinanceTab('list');
                showToast(`Filtrando movimientos de ${name}.`);
              }}
              className="mt-4 inline-flex items-center gap-2 text-sm text-[#f0c28f]"
            >
              Ver movimientos <ChevronRight className="h-4 w-4" />
            </button>
          </GlassCard>
        ))}
      </div>
    );
  };

  const renderFinanzas = () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setFinanceTab('form')}
          className={cn(
            'rounded-full px-4 py-2 text-sm transition w-full sm:w-auto',
            financeTab === 'form'
              ? 'border border-[#e1ab71]/20 bg-[#e1ab71]/12 text-[#ffd8ac]'
              : 'border border-white/10 bg-white/[0.04] text-white/65',
          )}
        >
          Registrar ingreso
        </button>
        <button
          onClick={() => setFinanceTab('list')}
          className={cn(
            'rounded-full px-4 py-2 text-sm transition w-full sm:w-auto',
            financeTab === 'list'
              ? 'border border-[#e1ab71]/20 bg-[#e1ab71]/12 text-[#ffd8ac]'
              : 'border border-white/10 bg-white/[0.04] text-white/65',
          )}
        >
          Lista y gráfico
        </button>
      </div>

      {financeTab === 'form' ? (
        <div className="grid gap-4 grid-cols-1 xl:grid-cols-[380px_minmax(0,1fr)]">
          <GlassCard className="p-4 sm:p-5">
            <SectionTitle
              eyebrow="Excel style"
              title="Registrar dinero recibido"
              description="Como una hoja práctica, pero en forma de formulario."
            />
            <div className="space-y-4">
              <Field label="Nombre del cliente">
                <Input
                  value={financeForm.client}
                  onChange={(e) =>
                    setFinanceForm((prev) => ({
                      ...prev,
                      client: e.target.value,
                    }))
                  }
                  placeholder="Ej. Paula Herrera"
                />
              </Field>

              <Field label="Tipo de servicio">
                <Select
                  value={financeForm.plan}
                  onChange={(e) =>
                    setFinanceForm((prev) => ({
                      ...prev,
                      plan: e.target.value as PlanName,
                    }))
                  }
                >
                  {plans.map((plan) => (
                    <option key={plan.name} value={plan.name}>
                      {plan.name}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label="Cantidad recibida">
                <Input
                  type="number"
                  value={financeForm.amount}
                  onChange={(e) =>
                    setFinanceForm((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                  placeholder="1500000"
                />
              </Field>

              <Field label="Fecha">
                <Input
                  type="date"
                  value={financeForm.date}
                  onChange={(e) =>
                    setFinanceForm((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                />
              </Field>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <Field label="Método">
                  <Select
                    value={financeForm.method}
                    onChange={(e) =>
                      setFinanceForm((prev) => ({
                        ...prev,
                        method: e.target.value,
                      }))
                    }
                  >
                    <option>Transferencia</option>
                    <option>Efectivo</option>
                    <option>Nequi</option>
                    <option>Tarjeta</option>
                  </Select>
                </Field>

                <Field label="Estado">
                  <Select
                    value={financeForm.status}
                    onChange={(e) =>
                      setFinanceForm((prev) => ({
                        ...prev,
                        status: e.target.value as FinanceStatus,
                      }))
                    }
                  >
                    <option value="Pagado">Pagado</option>
                    <option value="Pendiente">Pendiente</option>
                  </Select>
                </Field>
              </div>

              <button
                onClick={addFinanceRow}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#e1ab71]/20 bg-[#e1ab71]/12 px-4 py-3 text-sm font-medium text-[#ffd8ac]"
              >
                <Plus className="h-4 w-4" />
                Guardar registro
              </button>
            </div>
          </GlassCard>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <StatCard
              label="Cobrado"
              value={money(totalRevenue)}
              helper="Pagos marcados como pagado"
            />
            <StatCard
              label="Pendiente"
              value={money(totalPending)}
              helper="Monto aún por cobrar"
            />
            <StatCard
              label="Movimientos"
              value={String(finances.length)}
              helper="Filas registradas"
            />
          </div>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,380px)]">
          <GlassCard className="p-4 sm:p-5 min-w-0">
            <SectionTitle
              eyebrow="Lista"
              title="Movimientos registrados"
              description="Aquí sí ves la lista tipo hoja y luego el gráfico."
            />
            <div className="overflow-x-auto">
              <table className="min-w-[760px] w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/45">
                    <th className="pb-3 pr-4 font-medium">Cliente</th>
                    <th className="pb-3 pr-4 font-medium">Plan</th>
                    <th className="pb-3 pr-4 font-medium">Monto</th>
                    <th className="pb-3 pr-4 font-medium">Fecha</th>
                    <th className="pb-3 pr-4 font-medium">Método</th>
                    <th className="pb-3 pr-4 font-medium">Estado</th>
                    <th className="pb-3 font-medium">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFinances.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-white/6 last:border-none"
                    >
                      <td className="py-4 pr-4 text-[#fff2e2]">{row.client}</td>
                      <td className="py-4 pr-4 text-white/60">{row.plan}</td>
                      <td className="py-4 pr-4 text-[#f0c28f]">
                        {money(row.amount)}
                      </td>
                      <td className="py-4 pr-4 text-white/60">{row.date}</td>
                      <td className="py-4 pr-4 text-white/60">{row.method}</td>
                      <td className="py-4 pr-4 text-white/60">{row.status}</td>
                      <td className="py-4">
                        <button
                          onClick={() => removeFinance(row.id)}
                          className="inline-flex items-center gap-2 text-xs text-red-300"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          borrar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>

          <GlassCard className="p-4 sm:p-5 min-w-0">
            <SectionTitle eyebrow="Gráfico" title="Ingresos por mes" />
            <div className="h-[260px] sm:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={financeChart}
                  barGap={14}
                  margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    vertical={false}
                    stroke="rgba(255,255,255,0.06)"
                    strokeDasharray="3 8"
                  />
                  <XAxis
                    dataKey="month"
                    stroke="#b69774"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#b69774"
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(12,12,14,0.92)',
                      border: '1px solid rgba(225,171,113,0.14)',
                      borderRadius: 18,
                      color: '#fff',
                    }}
                  />
                  <Bar
                    dataKey="ingresos"
                    fill="#efb16d"
                    radius={[999, 999, 999, 999]}
                    maxBarSize={16}
                  />
                  <Bar
                    dataKey="pendientes"
                    fill="rgba(255,255,255,0.12)"
                    radius={[999, 999, 999, 999]}
                    maxBarSize={16}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );

  const renderPublicaciones = () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setPublicationTab('editor')}
          className={cn(
            'rounded-full px-4 py-2 text-sm transition w-full sm:w-auto',
            publicationTab === 'editor'
              ? 'border border-[#e1ab71]/20 bg-[#e1ab71]/12 text-[#ffd8ac]'
              : 'border border-white/10 bg-white/[0.04] text-white/65',
          )}
        >
          Crear publicación
        </button>
        <button
          onClick={() => setPublicationTab('feed')}
          className={cn(
            'rounded-full px-4 py-2 text-sm transition w-full sm:w-auto',
            publicationTab === 'feed'
              ? 'border border-[#e1ab71]/20 bg-[#e1ab71]/12 text-[#ffd8ac]'
              : 'border border-white/10 bg-white/[0.04] text-white/65',
          )}
        >
          Feed publicado
        </button>
      </div>

      {publicationTab === 'editor' ? (
        <div className="grid gap-4 grid-cols-1 xl:grid-cols-[420px_minmax(0,1fr)]">
          <GlassCard className="p-4 sm:p-5">
            <SectionTitle
              eyebrow="Social style"
              title="Editor de publicaciones"
              description="Formulario útil para armar una sección como si fuera una publicación."
            />
            <div className="space-y-4">
              <Field label="Sección">
                <Select
                  value={publicationForm.section}
                  onChange={(e) =>
                    setPublicationForm((prev) => ({
                      ...prev,
                      section: e.target.value,
                    }))
                  }
                >
                  <option>Hero</option>
                  <option>About</option>
                  <option>Bodas</option>
                  <option>Retratos</option>
                  <option>Planes</option>
                  <option>Contacto</option>
                </Select>
              </Field>

              <Field label="Título">
                <Input
                  value={publicationForm.title}
                  onChange={(e) =>
                    setPublicationForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Título principal"
                />
              </Field>

              <Field label="Texto">
                <Textarea
                  rows={5}
                  value={publicationForm.text}
                  onChange={(e) =>
                    setPublicationForm((prev) => ({
                      ...prev,
                      text: e.target.value,
                    }))
                  }
                  placeholder="Texto de la sección"
                />
              </Field>

              <Field label="Botón">
                <Input
                  value={publicationForm.buttonText}
                  onChange={(e) =>
                    setPublicationForm((prev) => ({
                      ...prev,
                      buttonText: e.target.value,
                    }))
                  }
                  placeholder="Reserva ahora"
                />
              </Field>

              <Field label="Imagen URL">
                <Input
                  value={publicationForm.image}
                  onChange={(e) =>
                    setPublicationForm((prev) => ({
                      ...prev,
                      image: e.target.value,
                    }))
                  }
                  placeholder="https://..."
                />
              </Field>

              <Field label="Estado">
                <Select
                  value={publicationForm.status}
                  onChange={(e) =>
                    setPublicationForm((prev) => ({
                      ...prev,
                      status: e.target.value as PublicationStatus,
                    }))
                  }
                >
                  <option value="Publicado">Publicado</option>
                  <option value="Borrador">Borrador</option>
                </Select>
              </Field>

              <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                <button
                  onClick={savePublication}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#e1ab71]/20 bg-[#e1ab71]/12 px-4 py-3 text-sm font-medium text-[#ffd8ac]"
                >
                  <Upload className="h-4 w-4" />
                  {publicationForm.id ? 'Guardar cambios' : 'Publicar sección'}
                </button>

                <button
                  onClick={() =>
                    setPublicationForm({
                      id: null,
                      section: 'Hero',
                      title: '',
                      text: '',
                      buttonText: '',
                      image: '',
                      status: 'Publicado',
                    })
                  }
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/70"
                >
                  <X className="h-4 w-4" />
                  Limpiar
                </button>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="overflow-hidden min-w-0">
            <div
              className="h-[220px] sm:h-[260px] bg-cover bg-center"
              style={{
                backgroundImage: `url(${
                  publicationForm.image ||
                  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop'
                })`,
              }}
            />
            <div className="p-4 sm:p-5">
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/40">
                {publicationForm.section || 'Hero'}
              </p>
              <h3 className="mt-3 text-2xl sm:text-3xl font-medium text-[#fff2e2] break-words">
                {publicationForm.title || 'Previsualización de la sección'}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55 break-words">
                {publicationForm.text ||
                  'Aquí verás cómo se siente la publicación antes de enviarla al feed interno.'}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button className="rounded-full border border-[#e1ab71]/20 bg-[#e1ab71]/12 px-4 py-2 text-sm text-[#ffd8ac]">
                  {publicationForm.buttonText || 'Botón'}
                </button>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/60">
                  {publicationForm.status}
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredPublications.map((item) => (
            <GlassCard key={item.id} className="overflow-hidden min-w-0">
              <div
                className="h-48 sm:h-56 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/40">
                    {item.section}
                  </p>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/65">
                    {item.status}
                  </span>
                </div>

                <h3 className="mt-3 text-base sm:text-lg font-medium text-[#fff2e2] break-words">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-white/55 break-words">
                  {item.text}
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <button className="rounded-full border border-[#e1ab71]/20 bg-[#e1ab71]/12 px-4 py-2 text-sm text-[#ffd8ac]">
                    {item.buttonText || 'Ver más'}
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => togglePublicationStatus(item.id)}
                      className="text-white/70"
                      title="Cambiar estado"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => editPublication(item)}
                      className="text-white/70"
                      title="Editar"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => removePublication(item.id)}
                      className="text-red-300"
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );

  const renderPlanes = () => (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {plans.map((plan) => (
        <GlassCard key={plan.name} className="p-4 sm:p-5">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/40">
            Plan
          </p>
          <h3 className="mt-3 text-lg sm:text-xl font-medium text-[#fff2e2]">
            {plan.name}
          </h3>
          <p className="mt-2 text-sm text-white/50">{plan.info}</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <span className="text-xl sm:text-2xl font-semibold text-[#f3c792] break-words">
              {money(plan.price)}
            </span>
            <button
              onClick={() => {
                setFinanceForm((prev) => ({ ...prev, plan: plan.name }));
                setView('finanzas');
                setFinanceTab('form');
                showToast(`Plan ${plan.name} cargado en finanzas.`);
              }}
              className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/70 w-full sm:w-auto"
            >
              Usar plan
            </button>
          </div>
        </GlassCard>
      ))}
    </div>
  );

  const renderMensajes = () => (
    <div className="space-y-4">
      {messages.map((msg) => (
        <GlassCard key={msg.id} className="p-4 sm:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base sm:text-lg font-medium text-[#fff2e2] break-words">
                  {msg.name}
                </h3>
                <span className="rounded-full border border-[#e1ab71]/18 bg-[#e1ab71]/10 px-3 py-1 text-xs text-[#f0c28f]">
                  {msg.tag}
                </span>
              </div>
              {msg.open ? (
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/55 break-words">
                  {msg.text}
                </p>
              ) : (
                <p className="mt-3 text-sm text-white/40">
                  Haz clic en abrir para ver el mensaje.
                </p>
              )}
            </div>
            <button
              onClick={() => toggleMessageOpen(msg.id)}
              className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/70 w-full md:w-auto"
            >
              {msg.open ? 'Cerrar' : 'Abrir'}
            </button>
          </div>
        </GlassCard>
      ))}
    </div>
  );

  const renderSettings = () => (
    <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
      <GlassCard className="p-4 sm:p-5">
        <SectionTitle eyebrow="Studio" title="Datos generales" />
        <div className="space-y-3">
          {['Nombre del estudio', 'Correo', 'Teléfono', 'Instagram'].map(
            (item) => (
              <div
                key={item}
                className="rounded-[18px] sm:rounded-[20px] border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-white/60"
              >
                {item}
              </div>
            ),
          )}
        </div>
      </GlassCard>

      <GlassCard className="p-4 sm:p-5">
        <SectionTitle eyebrow="Preferencias" title="Ajustes del panel" />
        <div className="space-y-3 text-sm text-white/65">
          {[
            ['reservations', 'Activar reservas en landing'],
            ['testimonials', 'Mostrar testimonios'],
            ['emailAlerts', 'Recibir alertas por email'],
            ['blockSundays', 'Bloquear domingos'],
          ].map(([key, label]) => {
            const typedKey = key as keyof typeof settingsState;
            const enabled = settingsState[typedKey];
            return (
              <button
                key={key}
                onClick={() => toggleSetting(typedKey)}
                className="flex w-full items-center justify-between gap-4 rounded-[18px] sm:rounded-[20px] border border-white/8 bg-white/[0.04] px-4 py-3 text-left"
              >
                <span className="min-w-0">{label}</span>
                <span
                  className={cn(
                    'h-6 w-11 rounded-full p-1 transition shrink-0',
                    enabled ? 'bg-[#e1ab71]/20' : 'bg-white/10',
                  )}
                >
                  <span
                    className={cn(
                      'block h-4 w-4 rounded-full transition',
                      enabled ? 'translate-x-5 bg-[#efb16d]' : 'bg-white/40',
                    )}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );

  const currentTitle = nav.find((item) => item.id === view)?.label ?? 'Overview';

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0b0b0d] text-white">
      <div
        className="fixed inset-0 bg-cover bg-center opacity-45"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop)',
        }}
      />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(225,171,113,0.12),transparent_24%),linear-gradient(180deg,rgba(10,10,12,0.54),rgba(10,10,12,0.88))]" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1480px] grid-cols-1 gap-4 p-3 sm:p-4 xl:grid-cols-[92px_minmax(0,1fr)] xl:p-5">
        <aside className="hidden xl:block xl:sticky xl:top-5 xl:h-[calc(100vh-2.5rem)]">
          <GlassCard className="flex h-full flex-col items-center p-3">
            <button
              onClick={() => {
                setView('overview');
                showToast('Volviste al overview.');
              }}
              className="mb-4 flex h-14 w-14 items-center justify-center rounded-[22px] border border-[#e1ab71]/18 bg-[#e1ab71]/10 text-[#efb16d]"
              title="Ir al overview"
            >
              <Camera className="h-5 w-5" />
            </button>

            <nav className="flex w-full flex-1 flex-col items-center gap-2">
              {nav.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setView(item.id)}
                    title={item.label}
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-[18px] border transition-all duration-200',
                      view === item.id
                        ? 'border-[#e1ab71]/22 bg-[#e1ab71]/12 text-[#ffd7aa] shadow-[0_10px_25px_rgba(225,171,113,0.16)]'
                        : 'border-white/8 bg-white/[0.04] text-white/55 hover:border-white/14 hover:bg-white/[0.07] hover:text-white/85',
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto flex flex-col gap-2 pt-3">
              <button
                onClick={() => showToast('Usa la barra superior para buscar.')}
                className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/8 bg-white/[0.04] text-white/55 hover:bg-white/[0.07]"
              >
                <Search className="h-4 w-4" />
              </button>
              <button
                onClick={() => showToast('No tienes notificaciones nuevas.')}
                className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/8 bg-white/[0.04] text-white/55 hover:bg-white/[0.07]"
              >
                <Bell className="h-4 w-4" />
              </button>
            </div>
          </GlassCard>
        </aside>

        <section className="space-y-4 min-w-0">
          <GlassCard className="p-4 md:p-5">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3 xl:hidden">
                <button
                  onClick={() => setMobileNavOpen((prev) => !prev)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/75"
                >
                  <Menu className="h-5 w-5" />
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => showToast('Usa la barra superior para buscar.')}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/75"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => showToast('No tienes notificaciones nuevas.')}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/75"
                  >
                    <Bell className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {mobileNavOpen ? (
                <div className="xl:hidden">
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                    {nav.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setView(item.id);
                            setMobileNavOpen(false);
                          }}
                          className={cn(
                            'flex flex-col items-center justify-center gap-2 rounded-[18px] border px-2 py-3 text-[11px] transition',
                            view === item.id
                              ? 'border-[#e1ab71]/22 bg-[#e1ab71]/12 text-[#ffd7aa]'
                              : 'border-white/8 bg-white/[0.04] text-white/65',
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] sm:tracking-[0.34em] text-white/40">
                    MILES VISUAL
                  </p>
                  <h1 className="mt-2 text-xl sm:text-2xl font-medium text-[#fff2e2] md:text-[32px] break-words">
                    {currentTitle}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm text-white/50">
                    Panel real para gestionar reservas, finanzas, publicaciones,
                    clientes y planes.
                  </p>
                </div>

                <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:flex-wrap lg:items-center">
                  <div className="relative w-full lg:w-[260px]">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar cliente, plan, publicación..."
                      className="w-full rounded-full border border-white/10 bg-white/[0.04] py-2 pl-9 pr-4 text-sm text-white outline-none placeholder:text-white/30"
                    />
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={() =>
                        showToast('Preview disponible cuando conectes la landing real.')
                      }
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/75 w-full sm:w-auto"
                    >
                      <Eye className="mr-2 inline h-4 w-4" />
                      Ver landing
                    </button>

                    <button
                      onClick={() =>
                        showToast('Cambios publicados localmente en el mockup.')
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e1ab71]/20 bg-[#e1ab71]/12 px-4 py-2 text-sm font-medium text-[#ffd8ac] w-full sm:w-auto"
                    >
                      Publicar cambios
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {view === 'overview' && renderOverview()}
          {view === 'reservas' && renderReservas()}
          {view === 'clientes' && renderClientes()}
          {view === 'finanzas' && renderFinanzas()}
          {view === 'publicaciones' && renderPublicaciones()}
          {view === 'planes' && renderPlanes()}
          {view === 'mensajes' && renderMensajes()}
          {view === 'settings' && renderSettings()}
        </section>
      </div>

      {toast ? (
        <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-24px)] max-w-max -translate-x-1/2 rounded-full border border-[#e1ab71]/20 bg-[#111111]/90 px-4 py-3 text-center text-sm text-[#ffd8ac] backdrop-blur-xl sm:bottom-5 sm:left-auto sm:right-5 sm:w-auto sm:translate-x-0">
          {toast}
        </div>
      ) : null}
    </main>
  );
}