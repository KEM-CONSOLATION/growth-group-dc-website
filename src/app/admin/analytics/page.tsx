"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useDashboard } from "@/src/context/DashboardDataContext";
import { AdminPageHeader, AdminAvatar } from "@/src/components/admin/admin-ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import {
  TrendingUp,
  Users,
  Activity,
  BarChart2,
  ArrowRight,
  CheckCircle2,
  UserX,
  Eye,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

/* ─── Mini bar chart ─── */
function MiniBarChart({
  bars,
  labels,
  color = "bg-brand-600",
}: {
  bars: number[];
  labels?: string[];
  color?: string;
}) {
  const max = Math.max(...bars, 1);
  return (
    <div className="flex items-end gap-2 h-24 w-full">
      {bars.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full flex items-end justify-center" style={{ height: "80px" }}>
            <div
              className={cn("w-full rounded-t-md transition-all", color)}
              style={{ height: `${Math.round((v / max) * 80)}px` }}
            />
          </div>
          {labels?.[i] && (
            <span className="text-[9px] font-medium text-slate-400 truncate w-full text-center">
              {labels[i]}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── SVG Donut ─── */
function DonutChart({
  segments,
}: {
  segments: { value: number; color: string; label: string }[];
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = 40;
  const cx = 50;
  const cy = 50;
  const circ = 2 * Math.PI * r;

  let cumulative = 0;
  const arcs = segments.map((seg) => {
    const pct = seg.value / total;
    const offset = circ - pct * circ;
    const rotate = (cumulative / total) * 360 - 90;
    cumulative += seg.value;
    return { ...seg, offset, rotate, pct };
  });

  return (
    <svg viewBox="0 0 100 100" className="w-36 h-36 -rotate-90" aria-hidden>
      {arcs.map((a, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          strokeWidth="18"
          stroke={a.color}
          strokeDasharray={circ}
          strokeDashoffset={a.offset}
          style={{ transform: `rotate(${a.rotate}deg)`, transformOrigin: "50px 50px" }}
        />
      ))}
      <circle cx={cx} cy={cy} r="26" fill="white" />
    </svg>
  );
}

/* ─── SVG Line chart ─── */
function LineChart({
  series,
  labels,
}: {
  series: { values: number[]; color: string; label: string }[];
  labels: string[];
}) {
  const allValues = series.flatMap((s) => s.values);
  const max = Math.max(...allValues, 1);
  const W = 400;
  const H = 140;
  const PAD = 8;

  function toPath(values: number[]) {
    return values
      .map((v, i) => {
        const x = PAD + (i / (values.length - 1)) * (W - 2 * PAD);
        const y = H - PAD - ((v / max) * (H - 2 * PAD));
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
  }

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="none">
        {/* horizontal grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = PAD + t * (H - 2 * PAD);
          return (
            <line
              key={t}
              x1={PAD}
              y1={y}
              x2={W - PAD}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth="0.5"
            />
          );
        })}
        {series.map((s) => (
          <path
            key={s.label}
            d={toPath(s.values)}
            fill="none"
            stroke={s.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      {/* x-axis labels */}
      <div className="flex justify-between px-1 mt-1">
        {labels.map((l) => (
          <span key={l} className="text-[10px] text-slate-400 font-medium">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Health gauge ─── */
function HealthGauge({ value }: { value: number }) {
  const v = Math.min(100, Math.max(0, value));
  const color =
    v >= 85 ? "#10b981" : v >= 65 ? "#f59e0b" : "#ef4444";
  const label =
    v >= 85 ? "Excellent" : v >= 65 ? "Good" : "Needs Attention";

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 100 100" className="w-20 h-20 -rotate-90" aria-hidden>
          <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="12" />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - v / 100)}`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center rotate-90">
          <span className="text-lg font-bold text-slate-900">{v}</span>
        </div>
      </div>
      <span className="text-xs font-semibold" style={{ color }}>{label}</span>
    </div>
  );
}

/* ────────────────────────────────────────── */

export default function AnalyticsPage() {
  const { data, getGroupById, getLeaderById } = useDashboard();
  const { growthGroups, members, meetingReports } = data;

  /* Status breakdown */
  const statusCounts = useMemo(() => {
    const active = members.filter((m) => m.status === "active").length;
    const visitor = members.filter((m) => m.status === "visitor").length;
    const inactive = members.filter((m) => m.status === "inactive").length;
    return { active, visitor, inactive };
  }, [members]);

  /* Attendance per cell (from meeting reports) */
  const attendanceByCell = useMemo(() =>
    growthGroups.map((g) => {
      const reports = meetingReports.filter((r) => r.groupId === g.id);
      const total = reports.reduce((s, r) => s + r.attendance, 0);
      const avg = reports.length ? Math.round(total / reports.length) : 0;
      return { ...g, totalAttendance: total, avgAttendance: avg, reportCount: reports.length };
    }), [growthGroups, meetingReports]);

  /* Simulated monthly growth data (6 months) */
  const monthLabels = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
  const memberGrowth = [8, 9, 10, 11, 11, members.length];
  const visitorGrowth = [2, 3, 3, 4, 4, statusCounts.visitor];

  /* Attendance bar data */
  const attendanceBars = attendanceByCell.map((g) => g.totalAttendance);
  const attendanceLabels = attendanceByCell.map((g) => g.name.split(" ")[0]);

  /* Donut segments */
  const donutSegments = [
    { value: statusCounts.active, color: "#10b981", label: "Active" },
    { value: statusCounts.visitor, color: "#f59e0b", label: "Visitor" },
    { value: statusCounts.inactive, color: "#94a3b8", label: "Inactive" },
  ];

  const totalAttendanceAll = meetingReports.reduce((s, r) => s + r.attendance, 0);

  return (
    <div className="space-y-8 pb-10">
      <AdminPageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Analytics" },
        ]}
        title="Analytics"
        description="Visualised insights across all growth cells — attendance trends, member breakdown, and cell health at a glance."
      />

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total members",
            value: members.length,
            icon: Users,
            color: "from-brand-600 to-brand-800",
            sub: `${statusCounts.active} active`,
          },
          {
            label: "Total attendance",
            value: totalAttendanceAll,
            icon: Activity,
            color: "from-emerald-500 to-emerald-700",
            sub: `${meetingReports.length} meetings logged`,
          },
          {
            label: "Active cells",
            value: growthGroups.length,
            icon: BarChart2,
            color: "from-violet-500 to-violet-700",
            sub: "across regions",
          },
          {
            label: "Avg health score",
            value:
              Math.round(
                growthGroups.reduce((s, g) => s + (g.healthScore ?? 80), 0) /
                  (growthGroups.length || 1)
              ) + "%",
            icon: TrendingUp,
            color: "from-amber-500 to-amber-700",
            sub: "across all cells",
          },
        ].map(({ label, value, icon: Icon, color, sub }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm flex items-start justify-between gap-3"
          >
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {label}
              </p>
              <p className="text-3xl font-bold tabular-nums text-slate-900">{value}</p>
              <p className="text-xs text-slate-500">{sub}</p>
            </div>
            <div
              className={cn(
                "rounded-xl bg-gradient-to-br p-2.5 text-white shadow-lg shrink-0",
                color
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Trend + Donut row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 border-slate-200/80 shadow-sm rounded-2xl">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-brand-600" />
              Member growth trend
            </CardTitle>
            <CardDescription>Monthly member & visitor trajectory (sample)</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex gap-4 mb-4">
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                <span className="h-2 w-4 rounded-full bg-brand-600 inline-block" /> Members
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                <span className="h-2 w-4 rounded-full bg-amber-400 inline-block" /> Visitors
              </span>
            </div>
            <LineChart
              series={[
                { values: memberGrowth, color: "#3b5bdb", label: "Members" },
                { values: visitorGrowth, color: "#fbbf24", label: "Visitors" },
              ]}
              labels={monthLabels}
            />
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 shadow-sm rounded-2xl">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-bold">Member status</CardTitle>
            <CardDescription>Distribution across all cells</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 flex flex-col items-center gap-4">
            <DonutChart segments={donutSegments} />
            <div className="w-full space-y-2">
              {[
                { label: "Active", count: statusCounts.active, color: "#10b981", icon: CheckCircle2 },
                { label: "Visitor", count: statusCounts.visitor, color: "#f59e0b", icon: Eye },
                { label: "Inactive", count: statusCounts.inactive, color: "#94a3b8", icon: UserX },
              ].map(({ label, count, color, icon: Icon }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-700 font-medium">
                    <Icon className="h-4 w-4 shrink-0" style={{ color }} />
                    {label}
                  </span>
                  <span className="tabular-nums font-bold text-slate-900">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance by cell bar + cell health */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="border-slate-200/80 shadow-sm rounded-2xl">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-brand-600" />
              Total attendance by cell
            </CardTitle>
            <CardDescription>Sum of reported attendance across all meetings</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {attendanceBars.every((v) => v === 0) ? (
              <p className="text-sm text-slate-500 py-8 text-center">
                No meeting reports logged yet. Add one to see attendance data.
              </p>
            ) : (
              <MiniBarChart
                bars={attendanceBars}
                labels={attendanceLabels}
                color="bg-brand-600"
              />
            )}
            <div className="mt-4 divide-y divide-slate-100">
              {attendanceByCell.map((g) => (
                <div key={g.id} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="font-medium text-slate-800 truncate pr-3">{g.name}</span>
                  <div className="flex items-center gap-4 shrink-0 text-right">
                    <span className="text-xs text-slate-500">
                      {g.reportCount} report{g.reportCount !== 1 ? "s" : ""}
                    </span>
                    <span className="font-bold tabular-nums text-slate-900 w-12">
                      {g.totalAttendance}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cell health overview */}
        <Card className="border-slate-200/80 shadow-sm rounded-2xl">
          <CardHeader className="pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-500" />
              Cell health overview
            </CardTitle>
            <CardDescription>Engagement & attendance health score per cell</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-6">
            {growthGroups.map((g) => {
              const leader = getLeaderById(g.leaderId);
              const score = g.healthScore ?? 80;
              const cellMembers = members.filter((m) => m.groupId === g.id);
              return (
                <div key={g.id} className="flex items-center gap-4">
                  <HealthGauge value={score} />
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="font-bold text-slate-900 text-sm">{g.name}</p>
                    <p className="text-xs text-slate-500">
                      {g.meetingDay}s at {g.meetingTime} · {g.city}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <AdminAvatar name={leader?.name ?? "Leader"} size="sm" />
                      <span className="text-xs text-slate-700 font-medium truncate">
                        {leader?.name ?? "—"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {cellMembers.length} member{cellMembers.length !== 1 ? "s" : ""} rostered
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild className="shrink-0">
                    <Link href={`/admin/growth-groups/${g.id}`}>
                      View
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Per-cell roster breakdown table */}
      <Card className="border-slate-200/80 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base font-bold">Cell roster breakdown</CardTitle>
          <CardDescription>Active, visitor, and inactive per growth group</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-500 text-left">
                  <th className="px-5 py-3.5">Cell</th>
                  <th className="px-5 py-3.5">Leader</th>
                  <th className="px-5 py-3.5 text-emerald-700">Active</th>
                  <th className="px-5 py-3.5 text-amber-700">Visitors</th>
                  <th className="px-5 py-3.5 text-slate-500">Inactive</th>
                  <th className="px-5 py-3.5">Total</th>
                  <th className="px-5 py-3.5">Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {growthGroups.map((g) => {
                  const leader = getLeaderById(g.leaderId);
                  const cellMembers = members.filter((m) => m.groupId === g.id);
                  const active = cellMembers.filter((m) => m.status === "active").length;
                  const visitor = cellMembers.filter((m) => m.status === "visitor").length;
                  const inactive = cellMembers.filter((m) => m.status === "inactive").length;
                  const score = g.healthScore ?? 80;
                  const scoreColor =
                    score >= 85 ? "text-emerald-700 bg-emerald-50" :
                    score >= 65 ? "text-amber-700 bg-amber-50" :
                    "text-red-700 bg-red-50";
                  return (
                    <tr key={g.id} className="hover:bg-slate-50/80 transition-colors bg-white">
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/growth-groups/${g.id}`}
                          className="font-semibold text-brand-700 hover:underline"
                        >
                          {g.name}
                        </Link>
                        <p className="text-xs text-slate-400">{g.city}, {g.state}</p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <AdminAvatar name={leader?.name ?? "Leader"} size="sm" />
                          <span className="text-slate-700 font-medium text-xs">
                            {leader?.name ?? "—"}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-bold tabular-nums text-emerald-700">{active}</td>
                      <td className="px-5 py-4 font-bold tabular-nums text-amber-700">{visitor}</td>
                      <td className="px-5 py-4 font-bold tabular-nums text-slate-500">{inactive}</td>
                      <td className="px-5 py-4 font-bold tabular-nums text-slate-900">{cellMembers.length}</td>
                      <td className="px-5 py-4">
                        <span className={cn("inline-flex px-2.5 py-1 rounded-full text-xs font-bold tabular-nums", scoreColor)}>
                          {score}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
