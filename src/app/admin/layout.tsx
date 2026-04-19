"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  UserCog,
  UserPlus,
  Network,
  LogOut,
  Menu,
  X,
  ArrowRightLeft,
  ClipboardList,
  Shield,
  BarChart2,
  Settings2,
  Bell,
} from "lucide-react";
import { getSession, signOut } from "@/src/lib/dashboard-session";
import type { DashboardSession } from "@/src/lib/dashboard-session";
import { AdminAvatar, AdminBrandLogo } from "@/src/components/admin/admin-ui";
import { cn } from "@/src/lib/utils";
import { DashboardDataProvider } from "@/src/context/DashboardDataContext";

/* ── Nav structure ── */
const navGroups = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { name: "Analytics", href: "/admin/analytics", icon: BarChart2 },
    ],
  },
  {
    label: "People & roles",
    items: [
      { name: "Members", href: "/admin/members", icon: UserPlus },
      { name: "Assign to cell", href: "/admin/assign", icon: ArrowRightLeft },
      { name: "Team & roles", href: "/admin/roles", icon: Shield },
    ],
  },
  {
    label: "Cells",
    items: [
      { name: "Growth groups", href: "/admin/growth-groups", icon: Network },
      { name: "Meeting reports", href: "/admin/meeting-reports", icon: ClipboardList },
      { name: "Leaders", href: "/admin/leaders", icon: Users },
      { name: "Assistants", href: "/admin/assistants", icon: UserCog },
    ],
  },
  {
    label: "System",
    items: [
      { name: "Announcements", href: "/admin/announcements", icon: Bell },
      { name: "Settings", href: "/admin/settings", icon: Settings2 },
    ],
  },
] as const;

/* ── Sidebar inner content (shared between desktop + mobile) ── */
function SidebarContent({
  pathname,
  displayName,
  displayEmail,
  onNav,
  onLogout,
}: {
  pathname: string;
  displayName: string;
  displayEmail: string;
  onNav: () => void;
  onLogout: () => void;
}) {
  /* Shorten long emails so they don't overflow */
  const shortEmail =
    displayEmail.length > 24
      ? displayEmail.split("@")[0].slice(0, 14) + "…@" + displayEmail.split("@")[1]
      : displayEmail;

  return (
    <div className="flex flex-col h-full">

      {/* ── Brand header ── */}
      <div className="flex items-center gap-3.5 px-5 py-5 shrink-0 border-b border-white/10">
        <AdminBrandLogo size="lg" className="shadow-lg" />
        <div className="min-w-0">
          <p className="text-[15px] font-extrabold text-white leading-tight tracking-tight">
            Growth Groups
          </p>
          <p className="text-[9.5px] text-white/55 font-bold mt-0.5 uppercase tracking-[0.2em]">
            Leadership Dashboard
          </p>
        </div>
      </div>

      {/* ── Nav links ── */}
      <nav className="flex-1 px-3 py-5 space-y-6 overflow-y-auto overscroll-contain min-h-0">
        {navGroups.map((group) => (
          <div key={group.label}>
            {/* Section label + rule */}
            <div className="flex items-center gap-2 px-2 mb-2">
              <span className="text-[9px] font-black uppercase tracking-[0.22em] text-white/35 shrink-0">
                {group.label}
              </span>
              <div className="flex-1 h-px bg-white/[0.08]" />
            </div>

            <ul className="space-y-[2px]">
              {group.items.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/admin" &&
                    pathname.startsWith(`${item.href}/`));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNav}
                      className={cn(
                        "group flex items-center gap-3 rounded-[10px] px-2.5 py-[9px]",
                        "text-[13.5px] font-medium transition-all duration-150",
                        active
                          ? "bg-white/[0.15] text-white"
                          : "text-white/70 hover:bg-white/[0.07] hover:text-white"
                      )}
                    >
                      {/* Icon pill */}
                      <span
                        className={cn(
                          "flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[8px] transition-all duration-150",
                          active
                            ? "bg-white text-brand-700 shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                            : "bg-white/[0.09] text-white/60 group-hover:bg-white/[0.18] group-hover:text-white"
                        )}
                      >
                        <item.icon className="h-[14px] w-[14px]" />
                      </span>

                      <span className="flex-1 truncate">{item.name}</span>

                      {/* Active dot */}
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white/80 shrink-0" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── Profile + sign-out ── */}
      <div className="shrink-0 px-3 pb-4 pt-2 border-t border-white/[0.08] space-y-2">
        {/* Profile card */}
        <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.09] px-3 py-2.5 ring-1 ring-white/[0.06]">
          <AdminAvatar name={displayName} size="md" className="ring-2 ring-white/25 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] font-bold text-white truncate leading-snug">
              {displayName}
            </p>
            <p
              className="text-[10.5px] text-white/45 font-medium truncate mt-0.5"
              title={displayEmail}
            >
              {shortEmail}
            </p>
          </div>
          {/* Settings gear shortcut */}
          <Link
            href="/admin/settings"
            onClick={onNav}
            title="Settings"
            className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.08] text-white/50 hover:bg-white/[0.18] hover:text-white transition-all duration-150"
          >
            <Settings2 className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Sign-out button */}
        <button
          type="button"
          onClick={onLogout}
          className={cn(
            "group w-full flex items-center justify-center gap-2",
            "rounded-xl px-3 py-2.5 text-[13px] font-semibold",
            "text-white/60 border border-white/[0.12]",
            "hover:bg-red-500/[0.18] hover:text-white hover:border-red-400/40",
            "transition-all duration-150"
          )}
        >
          <LogOut className="h-[14px] w-[14px] transition-transform duration-150 group-hover:-translate-x-0.5" />
          Sign out
        </button>
      </div>
    </div>
  );
}

/* ── Shell ── */
function AdminShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session: DashboardSession;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const displayName = session.name ?? "Leader";
  const displayEmail = session.email ?? "";

  const handleLogout = () => {
    signOut();
    router.replace("/admin/login");
  };

  return (
    <DashboardDataProvider>
      <div className="min-h-screen bg-slate-50">

        {/* Mobile top bar */}
        <div
          className={cn(
            "lg:hidden fixed top-0 left-0 right-0 z-40",
            "flex items-center justify-between gap-3 px-4 py-3",
            "bg-gradient-to-r from-[#1a37a0] to-[#1e42b8]",
            "border-b border-white/10 shadow-lg"
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            <AdminBrandLogo size="sm" className="shadow-md" />
            <div className="min-w-0">
              <p className="text-[13px] font-bold truncate tracking-tight text-white">
                Growth Groups
              </p>
              <p className="text-[9px] text-white/55 font-bold uppercase tracking-widest">
                Leadership Dashboard
              </p>
            </div>
          </div>
          <button
            type="button"
            className="h-9 w-9 rounded-lg flex items-center justify-center text-white bg-white/[0.1] hover:bg-white/[0.18] transition-colors shrink-0"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed left-0 z-30 w-[264px] flex flex-col",
            "bg-gradient-to-b from-[#162f8a] via-[#1a35a0] to-[#162e8c]",
            "border-r border-white/[0.08]",
            "shadow-[6px_0_32px_rgba(0,0,0,0.22)]",
            "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform",
            "top-14 h-[calc(100dvh-3.5rem)] lg:top-0 lg:h-dvh",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <SidebarContent
            pathname={pathname}
            displayName={displayName}
            displayEmail={displayEmail}
            onNav={() => setSidebarOpen(false)}
            onLogout={handleLogout}
          />
        </aside>

        {/* Main content */}
        <div className="lg:pl-[264px] pt-14 lg:pt-0 min-h-screen flex flex-col">
          <main
            className={cn(
              "relative flex-1 min-w-0",
              "bg-[#f3f5f9]",
              "lg:h-dvh lg:overflow-y-auto lg:overscroll-contain"
            )}
          >
            <div className="relative p-5 sm:p-8 lg:p-10 max-w-[1600px] mx-auto min-h-full">
              {children}
            </div>
          </main>
        </div>

        {/* Mobile backdrop */}
        {sidebarOpen && (
          <button
            type="button"
            className="lg:hidden fixed inset-0 z-20 top-14 bg-slate-900/50 backdrop-blur-[3px]"
            aria-label="Close menu"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </DashboardDataProvider>
  );
}

/* ── Root layout ── */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<DashboardSession | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const s = getSession();
    if (isLoginPage) {
      if (s) {
        router.replace("/admin");
        return;
      }
      setLoading(false);
      return;
    }

    if (!s) {
      router.replace("/admin/login");
      return;
    }

    setSession(s);
    setLoading(false);
  }, [router, pathname, isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#162f8a]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-11 w-11 border-2 border-white/30 border-t-white mx-auto" />
          <p className="text-white/80 text-sm font-medium">Loading workspace…</p>
        </div>
      </div>
    );
  }

  return <AdminShell session={session}>{children}</AdminShell>;
}
