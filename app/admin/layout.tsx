"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, DollarSign, Image as ImageIcon, Users, User, Settings, LogOut, Tag, FileText, Menu, X, MessageCircle } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';
import { useEffect, useState } from 'react';
import { SessionProvider, signOut } from 'next-auth/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const loadLocalData = useAdminStore((state) => state.loadLocalData);
  const totalActiveReservations = useAdminStore((state) => state.totalActiveReservations);
  const totalPosts = useAdminStore((state) => state.totalPosts);

  const menuItems = [
    { href: '/admin', label: 'Resumen', icon: <LayoutDashboard size={18} className="h-5 w-5" /> },
    { href: '/admin/reservas', label: 'Reservas', icon: <Calendar size={18} className="h-5 w-5" /> },
    { href: '/admin/finanzas', label: 'Finanzas', icon: <DollarSign size={18} className="h-5 w-5" /> },
    { href: '/admin/media', label: 'Media', icon: <ImageIcon size={18} className="h-5 w-5" /> },
    { href: '/admin/planes', label: 'Planes', icon: <Tag size={18} className="h-5 w-5" /> },
    { href: '/admin/facturas', label: 'Facturas', icon: <FileText size={18} className="h-5 w-5" /> },
    { href: '/admin/clientes', label: 'Clientes', icon: <Users size={18} className="h-5 w-5" /> },
    { href: '/admin/cotizaciones', label: 'Prospectos', icon: <MessageCircle size={18} className="h-5 w-5" /> },
  ];

  return (
    <SessionProvider>
      <main className="min-h-screen bg-[#f4f0ea] text-[#2d2a27]">
        <div className="flex min-h-screen">
          <aside className="hidden w-[290px] shrink-0 border-r border-black/8 bg-white/70 px-6 py-6 backdrop-blur xl:block sticky top-0 h-screen overflow-y-auto custom-scrollbar">
            <div className="rounded-[24px] bg-[#789894] px-5 py-5 text-white">
              <p className="font-[Allura] text-[42px] leading-none">Miles Visual</p>
              <p className="mt-2 text-[12px] uppercase tracking-[0.18em] text-white/80">
                admin dashboard
              </p>
            </div>

            <nav className="mt-8 grid gap-2">
              {menuItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-[18px] px-4 py-4 text-left transition ${active
                        ? "bg-[#789894] text-white shadow-lg"
                        : "bg-transparent text-[#2d2a27]/80 hover:bg-black/5"
                      }`}
                  >
                    {item.icon}
                    <span className="text-[13px] uppercase tracking-[0.12em]">
                      {item.label}
                    </span>
                  </Link>
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
                  <p className="mt-2 text-[28px] font-semibold">{totalActiveReservations}</p>
                </div>
                <div>
                  <p className="text-[13px] uppercase tracking-[0.12em] text-[#2d2a27]/50">
                    Media
                  </p>
                  <p className="mt-2 text-[28px] font-semibold">{totalPosts}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-black/5 pt-6 grid gap-2">
              <button
                onClick={() => signOut()}
                className="flex w-full items-center justify-center gap-2 rounded-[18px] border border-red-200 bg-red-50 px-4 py-4 text-red-600 transition hover:bg-red-100"
              >
                <LogOut className="h-5 w-5" />
                <span className="text-[13px] uppercase tracking-[0.12em] font-medium">Cerrar Sesión</span>
              </button>
            </div>
          </aside>

          <div
            className={`fixed inset-0 z-50 xl:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"
              }`}
          >
            <div
              className={`absolute inset-0 bg-black/40 transition ${menuOpen ? "opacity-100" : "opacity-0"
                }`}
              onClick={() => setMenuOpen(false)}
            />
            <aside
              className={`absolute left-0 top-0 h-full w-[86%] max-w-[320px] bg-white px-6 py-6 transition-transform duration-300 overflow-y-auto ${menuOpen ? "translate-x-0" : "-translate-x-full"
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
                {menuItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-[18px] px-4 py-4 text-left transition ${active
                          ? "bg-[#789894] text-white shadow-lg"
                          : "bg-transparent text-[#2d2a27]/80 hover:bg-black/5"
                        }`}
                    >
                      {item.icon}
                      <span className="text-[13px] uppercase tracking-[0.12em]">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              <button
                onClick={() => signOut()}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-[18px] border border-red-200 bg-red-50 px-4 py-4 text-red-600 transition hover:bg-red-100"
              >
                <LogOut className="h-5 w-5" />
                <span className="text-[13px] uppercase tracking-[0.12em] font-medium">Cerrar Sesión</span>
              </button>
            </aside>
          </div>

          <div className="min-w-0 flex-1 flex flex-col">
            <header className="sticky top-0 z-30 border-b border-black/8 bg-[#f4f0ea]/90 backdrop-blur xl:hidden">
              <div className="flex items-center gap-4 px-4 py-4 md:px-6">
                <button
                  onClick={() => setMenuOpen(true)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <p className="text-[12px] uppercase tracking-[0.16em] text-[#2d2a27]/50">
                    panel de gestión
                  </p>
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto">
              <div className="p-4 md:p-8">
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
    </SessionProvider>
  );
}
