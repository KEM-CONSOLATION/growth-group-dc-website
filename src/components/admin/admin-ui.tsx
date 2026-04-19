"use client";

import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { cn } from "@/src/lib/utils";

/** Full-color `dc-logo.png` on a white tile so it reads correctly on royal blue chrome. */
export function AdminBrandLogo({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const box =
    size === "sm"
      ? "p-1 rounded-lg"
      : size === "lg"
        ? "p-2 rounded-2xl"
        : "p-1.5 rounded-xl";
  const pixel = size === "sm" ? 36 : size === "lg" ? 56 : 44;
  const h = size === "sm" ? "h-7" : size === "lg" ? "h-11" : "h-9";

  return (
    <div
      className={cn(
        "bg-white shadow-sm shrink-0 ring-1 ring-black/5",
        box,
        className
      )}
    >
      <Image
        src="/dc-logo.png"
        alt="Dominion City Church"
        width={pixel}
        height={pixel}
        className={cn("w-auto object-contain", h)}
      />
    </div>
  );
}

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const avatarHues = [210, 225, 200, 185, 240, 265] as const;

export function AdminAvatar({
  name,
  className,
  size = "md",
}: {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const initials = initialsFromName(name);
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  const hue = avatarHues[Math.abs(hash) % avatarHues.length];
  const sizeCls =
    size === "sm"
      ? "h-8 w-8 text-[10px]"
      : size === "lg"
        ? "h-12 w-12 text-sm"
        : "h-9 w-9 text-xs";

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold text-white shadow-inner ring-2 ring-white/30",
        sizeCls,
        className
      )}
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 55%, 42%) 0%, hsl(${hue}, 60%, 32%) 100%)`,
      }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

/** Minimal sparkline — decorative trend line for KPI cards. */
export function Sparkline({
  values,
  className,
  strokeClassName = "text-brand-400",
}: {
  values: number[];
  className?: string;
  strokeClassName?: string;
}) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const w = 100;
  const h = 32;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  });
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn("w-full h-8 overflow-visible", className)}
      preserveAspectRatio="none"
      aria-hidden
    >
      <polyline
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(strokeClassName)}
        stroke="currentColor"
        points={pts.join(" ")}
      />
    </svg>
  );
}

export function AdminPageHeader({
  breadcrumbs,
  title,
  description,
  action,
}: {
  breadcrumbs: { label: string; href?: string }[];
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between pb-6 border-b border-slate-200/80">
      <div className="space-y-1 min-w-0">
        <nav className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
          {breadcrumbs.map((b, i) => (
            <span key={`${b.label}-${i}`} className="flex items-center gap-1">
              {i > 0 ? (
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              ) : null}
              {b.href ? (
                <Link
                  href={b.href}
                  className="hover:text-brand-700 transition-colors truncate max-w-[10rem] sm:max-w-none"
                >
                  {b.label}
                </Link>
              ) : (
                <span className="text-slate-700 font-medium truncate max-w-[12rem] sm:max-w-none">
                  {b.label}
                </span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>
        {description ? (
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function AdminMetricCard({
  label,
  value,
  href,
  icon: Icon,
  trend,
  trendLabel,
  sparkValues,
}: {
  label: string;
  value: number | string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  trend?: string;
  trendLabel?: string;
  sparkValues?: number[];
}) {
  const inner = (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-brand-200/80">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="relative flex items-start justify-between gap-3">
        <div className="space-y-3 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <p className="text-3xl sm:text-4xl font-bold tabular-nums text-slate-900 tracking-tight">
            {value}
          </p>
          {trend ? (
            <p className="text-sm">
              <span className="font-semibold text-emerald-600">{trend}</span>
              {trendLabel ? (
                <span className="text-slate-500"> {trendLabel}</span>
              ) : null}
            </p>
          ) : null}
          <p className="text-sm font-medium text-brand-700 flex items-center gap-1 group-hover:gap-2 transition-all">
            View details
            <ChevronRight className="h-4 w-4" />
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-2.5 text-white shadow-lg shadow-brand-900/15">
            <Icon className="h-5 w-5" />
          </div>
          {sparkValues && sparkValues.length > 1 ? (
            <div className="w-20 opacity-80 group-hover:opacity-100 transition-opacity">
              <Sparkline values={sparkValues} strokeClassName="text-brand-500" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl">
        {inner}
      </Link>
    );
  }
  return inner;
}

export function AdminTableToolbar({
  placeholder,
  value,
  onChange,
  countLabel,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  countLabel: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-9 pr-3 h-9 rounded-md border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/25 focus:border-brand-500"
        />
      </div>
      <p className="text-xs font-medium text-slate-500 tabular-nums">{countLabel}</p>
    </div>
  );
}
