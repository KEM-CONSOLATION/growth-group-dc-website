"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { useDashboard } from "@/src/context/DashboardDataContext";
import { getSession } from "@/src/lib/dashboard-session";
import {
  AdminAvatar,
  AdminMetricCard,
} from "@/src/components/admin/admin-ui";
import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  Clock,
  MapPin,
  Network,
  Sparkles,
  TrendingUp,
  UserCog,
  UserPlus,
  UserRoundPlus,
  Users,
  ArrowRightLeft,
  Shield,
  Activity,
  BarChart2,
  Bell,
  CheckCircle2,
  Eye,
  UserX,
  Megaphone,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

/* ─── Health ring ─── */
function HealthRing({ value }: { value: number }) {
  const v = Math.min(100, Math.max(0, value));
  const r = 16;
  const c = 2 * Math.PI * r;
  const offset = c - (v / 100) * c;
  const color = v >= 85 ? "#10b981" : v >= 65 ? "#f59e0b" : "#ef4444";
  return (
    <svg className="w-14 h-14 shrink-0 -rotate-90" viewBox="0 0 36 36" aria-hidden>
      <circle cx="18" cy="18" r={r} fill="none" className="stroke-slate-100" strokeWidth="3" />
      <circle
        cx="18"
        cy="18"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={c}
        style={{ strokeDashoffset: offset }}
      />
    </svg>
  );
}

/* ─── Mini bar chart (attendance) ─── */
function AttendanceBar({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
        <span className="truncate pr-2">{label}</span>
        <span className="tabular-nums text-slate-900">{value}</span>
      </div>
      <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ─── Donut ─── */
function StatusDonut({
  active,
  visitor,
  inactive,
}: {
  active: number;
  visitor: number;
  inactive: number;
}) {
  const total = active + visitor + inactive || 1;
  const segments = [
    { value: active, color: "#10b981" },
    { value: visitor, color: "#f59e0b" },
    { value: inactive, color: "#cbd5e1" },
  ];
  const r = 40;
  const circ = 2 * Math.PI * r;
  let cum = 0;
  const arcs = segments.map((s) => {
    const pct = s.value / total;
    const offset = circ - pct * circ;
    const rotate = (cum / total) * 360 - 90;
    cum += s.value;
    return { ...s, offset, rotate };
  });
  return (
    <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90" aria-hidden>
      {arcs.map((a, i) => (
        <circle
          key={i}
          cx="50" cy="50" r={r}
          fill="none"
          strokeWidth="18"
          stroke={a.color}
          strokeDasharray={circ}
          strokeDashoffset={a.offset}
          style={{ transform: `rotate(${a.rotate}deg)`, transformOrigin: "50px 50px" }}
        />
      ))}
      <circle cx="50" cy="50" r="26" fill="white" />
    </svg>
  );
}

/* ─── Upcoming meeting row ─── */
const DAY_MAP: Record<string, number> = {
  Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
  Thursday: 4, Friday: 5, Saturday: 6,
};

function getNextOccurrence(meetingDay: string): Date {
  const today = new Date();
  const todayDay = today.getDay();
  const target = DAY_MAP[meetingDay] ?? 0;
  let diff = target - todayDay;
  if (diff <= 0) diff += 7;
  const d = new Date(today);
  d.setDate(today.getDate() + diff);
  return d;
}

/* ─── Announcement banner (pinned only) ─── */
const PINNED_ANNOUNCEMENTS = [
  {
    id: "ann-001",
    title: "All-cell leaders meeting",
    body: "Saturday, 26 April 2026 at 10:00 AM — main hall.",
    type: "urgent" as const,
  },
];

const annConfig = {
  urgent: { icon: AlertTriangle, bg: "bg-red-50 border-red-200", badge: "bg-red-100 text-red-800" },
  praise: { icon: Megaphone, bg: "bg-amber-50 border-amber-200", badge: "bg-amber-100 text-amber-800" },
  info: { icon: Bell, bg: "bg-blue-50 border-blue-200", badge: "bg-blue-100 text-blue-800" },
};

/* ─────────────────────────────── */

export default function AdminDashboardPage() {
  const { data, getGroupById, getLeaderById } = useDashboard();
  const { meta, growthGroups, leaders, assistants, members, meetingReports } = data;
  const [firstName, setFirstName] = useState("there");

  useEffect(() => {
    const s = getSession();
    const raw = s?.name?.trim().split(/\s+/)[0];
    if (raw) setFirstName(raw.replace(/^./, (c) => c.toUpperCase()));
  }, []);

  const spark = {
    groups: [2, 2, 3, 3, 3, 4],
    leaders: [2, 2, 3, 3, 3, 3],
    assistants: [4, 4, 5, 5, 5, 5],
    members: [8, 10, 11, 11, 12, members.length],
  };

  /* Member status breakdown */
  const statusCounts = useMemo(() => {
    const active = members.filter((m) => m.status === "active").length;
    const visitor = members.filter((m) => m.status === "visitor").length;
    const inactive = members.filter((m) => m.status === "inactive").length;
    return { active, visitor, inactive };
  }, [members]);

  /* Recent activity */
  const activities = useMemo(() => {
    const sorted = [...members].sort(
      (a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime()
    );
    return sorted.slice(0, 6).map((m) => {
      const g = getGroupById(m.groupId);
      return {
        id: m.id,
        title:
          m.status === "visitor"
            ? `${m.name} visited ${g?.name ?? "a cell"}`
            : `${m.name} joined ${g?.name ?? "a cell"}`,
        sub: new Date(m.joinedAt).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        tone: m.status === "visitor" ? "amber" : "emerald",
      };
    });
  }, [members, getGroupById]);

  const maxMembers = Math.max(...growthGroups.map((g) => g.memberIds.length), 1);

  /* Attendance per cell */
  const attendanceByCell = useMemo(() =>
    growthGroups.map((g) => {
      const reports = meetingReports.filter((r) => r.groupId === g.id);
      return {
        ...g,
        totalAttendance: reports.reduce((s, r) => s + r.attendance, 0),
      };
    }), [growthGroups, meetingReports]);
  const maxAttendance = Math.max(...attendanceByCell.map((g) => g.totalAttendance), 1);

  /* Upcoming meetings — next occurrence per cell */
  const upcomingMeetings = useMemo(() =>
    growthGroups
      .map((g) => ({
        ...g,
        nextDate: getNextOccurrence(g.meetingDay),
        leader: getLeaderById(g.leaderId),
      }))
      .sort((a, b) => a.nextDate.getTime() - b.nextDate.getTime()),
    [growthGroups, getLeaderById]
  );

  /* Top performing cell (by health score) */
  const topCell = useMemo(() =>
    [...growthGroups].sort((a, b) => (b.healthScore ?? 80) - (a.healthScore ?? 80))[0],
    [growthGroups]
  );
  const topLeader = topCell ? getLeaderById(topCell.leaderId) : null;

  const quickOps = [
    { href: "/admin/members", label: "Add member", icon: UserRoundPlus },
    { href: "/admin/assign", label: "Assign to cell", icon: ArrowRightLeft },
    { href: "/admin/meeting-reports", label: "Report a meeting", icon: ClipboardList },
    { href: "/admin/roles", label: "Leader / assistant", icon: Shield },
    { href: "/admin/analytics", label: "View analytics", icon: BarChart2 },
    { href: "/admin/announcements", label: "Announcements", icon: Bell },
  ];

  const totalAttendance = meetingReports.reduce((s, r) => s + r.attendance, 0);

  return (
    <div className="space-y-10">

      {/* Pinned announcements banner */}
      {PINNED_ANNOUNCEMENTS.map((ann) => {
        const cfg = annConfig[ann.type];
        const Icon = cfg.icon;
        return (
          <div key={ann.id} className={cn("rounded-2xl border flex items-start gap-4 p-4", cfg.bg)}>
            <Icon className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <span className={cn("text-[10px] font-bold uppercase px-2 py-0.5 rounded-full mr-2", cfg.badge)}>
                Pinned
              </span>
              <span className="text-sm font-bold text-slate-900">{ann.title}</span>
              <span className="text-sm text-slate-700 ml-2">{ann.body}</span>
            </div>
            <Link href="/admin/announcements" className="text-xs font-semibold text-slate-500 hover:text-brand-700 whitespace-nowrap shrink-0 mt-0.5">
              View all →
            </Link>
          </div>
        );
      })}

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-600 to-brand-800 text-white shadow-xl shadow-brand-900/20">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.28) 0%, transparent 45%), radial-gradient(circle at 90% 80%, rgba(255,255,255,0.1) 0%, transparent 40%)",
          }}
        />
        <div className="relative px-6 py-8 sm:px-10 sm:py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/80">
              <Sparkles className="h-3.5 w-3.5" />
              {meta.organizationName}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Welcome back, {firstName}
            </h1>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              {meta.dashboardTitle}. Monitor cells, leaders, and members in one
              place—structured like a modern home-cell command center.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                asChild
                className="bg-white text-brand-900 hover:bg-white/95 font-semibold shadow-lg"
              >
                <Link href="/admin/growth-groups">Browse growth groups</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/40 bg-white/10 text-white hover:bg-white/15 hover:text-white"
              >
                <Link href="/admin/analytics">Analytics</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/40 bg-white/10 text-white hover:bg-white/15 hover:text-white"
              >
                <Link href="/admin/meeting-reports">Meeting reports</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full lg:w-auto lg:min-w-[300px]">
            <div className="rounded-2xl bg-white/12 backdrop-blur-md border border-white/15 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-white/70">Members</p>
              <p className="text-2xl font-bold mt-1 tabular-nums">{members.length}</p>
              <p className="text-xs text-white/75 mt-0.5">{statusCounts.active} active</p>
            </div>
            <div className="rounded-2xl bg-white/12 backdrop-blur-md border border-white/15 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-white/70">Cells</p>
              <p className="text-2xl font-bold mt-1 tabular-nums">{growthGroups.length}</p>
              <p className="text-xs text-white/75 mt-0.5">active groups</p>
            </div>
            <div className="rounded-2xl bg-white/12 backdrop-blur-md border border-white/15 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-white/70">Attendance</p>
              <p className="text-2xl font-bold mt-1 tabular-nums">{totalAttendance}</p>
              <p className="text-xs text-white/75 mt-0.5">{meetingReports.length} meetings</p>
            </div>
            <div className="rounded-2xl bg-white/12 backdrop-blur-md border border-white/15 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-white/70">Visitors</p>
              <p className="text-2xl font-bold mt-1 tabular-nums">{statusCounts.visitor}</p>
              <p className="text-xs text-white/75 mt-0.5">awaiting follow-up</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick operations */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Church operations</h2>
            <p className="text-sm text-slate-600">Common tasks for growth group oversight.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickOps.map(({ href, label, icon: Icon }) => (
            <Button
              key={href}
              variant="outline"
              className="h-auto py-4 flex-col gap-2 border-slate-200 hover:border-brand-300 hover:bg-brand-50/50"
              asChild
            >
              <Link href={href}>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-center text-xs font-semibold text-slate-900 leading-tight">{label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </section>

      {/* KPI row */}
      <section>
        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Key metrics</h2>
            <p className="text-sm text-slate-600">Tap a card to open the full directory view.</p>
          </div>
          <Link href="/admin/analytics" className="text-sm font-semibold text-brand-700 hover:underline flex items-center gap-1">
            Full analytics <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4">
          <AdminMetricCard
            label="Growth groups"
            value={growthGroups.length}
            href="/admin/growth-groups"
            icon={Network}
            trend="+1"
            trendLabel="vs last quarter (sample)"
            sparkValues={spark.groups}
          />
          <AdminMetricCard
            label="Leaders"
            value={leaders.length}
            href="/admin/leaders"
            icon={Users}
            trend="Stable"
            trendLabel="all cells covered"
            sparkValues={spark.leaders}
          />
          <AdminMetricCard
            label="Assistants"
            value={assistants.length}
            href="/admin/assistants"
            icon={UserCog}
            trend="+2"
            trendLabel="new helpers (sample)"
            sparkValues={spark.assistants}
          />
          <AdminMetricCard
            label="Members"
            value={members.length}
            href="/admin/members"
            icon={UserPlus}
            trend="+8%"
            trendLabel="growth (sample)"
            sparkValues={spark.members}
          />
          <AdminMetricCard
            label="Meeting reports"
            value={meetingReports.length}
            href="/admin/meeting-reports"
            icon={ClipboardList}
            trend="Logged"
            trendLabel="this quarter (preview)"
            sparkValues={[1, 1, 2, 2, meetingReports.length, meetingReports.length + 1]}
          />
        </div>
      </section>

      {/* ── This week at a glance ── */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-4">This week at a glance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Member status donut */}
          <Card className="border-slate-200/80 shadow-sm rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Activity className="h-4 w-4 text-brand-600" />
                Member status
              </CardTitle>
              <CardDescription>Across all cells</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-5 pt-2">
              <StatusDonut
                active={statusCounts.active}
                visitor={statusCounts.visitor}
                inactive={statusCounts.inactive}
              />
              <div className="space-y-2 flex-1">
                {[
                  { label: "Active", count: statusCounts.active, icon: CheckCircle2, color: "text-emerald-600" },
                  { label: "Visitor", count: statusCounts.visitor, icon: Eye, color: "text-amber-600" },
                  { label: "Inactive", count: statusCounts.inactive, icon: UserX, color: "text-slate-400" },
                ].map(({ label, count, icon: Icon, color }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className={cn("flex items-center gap-1.5 font-medium text-slate-700", color)}>
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      {label}
                    </span>
                    <span className="font-bold tabular-nums text-slate-900">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Attendance by cell */}
          <Card className="border-slate-200/80 shadow-sm rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-emerald-600" />
                Total attendance
              </CardTitle>
              <CardDescription>By cell from meeting reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-2">
              {attendanceByCell.map((g) => (
                <AttendanceBar
                  key={g.id}
                  value={g.totalAttendance}
                  max={maxAttendance}
                  label={g.name}
                />
              ))}
              {totalAttendance === 0 && (
                <p className="text-xs text-slate-400 text-center py-4">
                  No reports yet — log your first meeting.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Top performing cell */}
          <Card className="border-slate-200/80 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="pb-2 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏆</span>
                <div>
                  <CardTitle className="text-base font-bold text-emerald-900">Top cell</CardTitle>
                  <CardDescription className="text-emerald-700/80">Highest health score</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {topCell ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-slate-900">{topCell.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{topCell.city}, {topCell.state}</p>
                    </div>
                    <span className="text-2xl font-bold tabular-nums text-emerald-600">
                      {topCell.healthScore ?? 80}%
                    </span>
                  </div>
                  {topLeader && (
                    <div className="flex items-center gap-2">
                      <AdminAvatar name={topLeader.name} size="sm" />
                      <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Leader</p>
                        <p className="text-sm font-semibold text-slate-800">{topLeader.name}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Clock className="h-3.5 w-3.5" />
                    {topCell.meetingDay}s at {topCell.meetingTime}
                  </div>
                  <Button size="sm" className="w-full bg-brand-600 hover:bg-brand-700" asChild>
                    <Link href={`/admin/growth-groups/${topCell.id}`}>View cell profile</Link>
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-slate-400">No cells found.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Upcoming meetings ── */}
      <section>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Upcoming meetings</h2>
            <p className="text-sm text-slate-600">Next scheduled session per growth group.</p>
          </div>
          <Link href="/admin/meeting-reports/new" className="text-sm font-semibold text-brand-700 hover:underline flex items-center gap-1">
            Log a report <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingMeetings.map((g) => {
            const daysUntil = Math.round((g.nextDate.getTime() - new Date().setHours(0,0,0,0)) / 86400000);
            const badge =
              daysUntil === 0 ? { label: "Today", cls: "bg-emerald-100 text-emerald-800" }
              : daysUntil === 1 ? { label: "Tomorrow", cls: "bg-amber-100 text-amber-800" }
              : { label: `In ${daysUntil} days`, cls: "bg-slate-100 text-slate-600" };
            return (
              <Card key={g.id} className="border-slate-200/80 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="rounded-xl bg-brand-600 p-2.5 text-white shrink-0">
                      <CalendarDays className="h-5 w-5" />
                    </div>
                    <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full shrink-0", badge.cls)}>
                      {badge.label}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{g.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {g.nextDate.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 text-xs text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      {g.meetingTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {g.venue}
                    </span>
                  </div>
                  {g.leader && (
                    <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                      <AdminAvatar name={g.leader.name} size="sm" />
                      <span className="text-xs font-medium text-slate-700">{g.leader.name}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Activity + Meetings + Distribution */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Activity */}
        <Card className="xl:col-span-2 border-slate-200/80 shadow-sm overflow-hidden rounded-2xl">
          <CardHeader className="border-b border-slate-100 bg-white pb-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-lg font-bold text-slate-900">
                  Recent roster activity
                </CardTitle>
                <CardDescription>
                  Latest joins and visits from member records
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild className="shrink-0">
                <Link href="/admin/members">Open members</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-slate-100">
              {activities.map((a) => (
                <li
                  key={a.id}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/80 transition-colors"
                >
                  <div
                    className={`h-2 w-2 rounded-full shrink-0 ${
                      a.tone === "amber" ? "bg-amber-400" : "bg-emerald-500"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-900 text-sm">{a.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{a.sub}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300 shrink-0" />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Meetings + distribution */}
        <div className="space-y-6">
          <Card className="border-slate-200/80 shadow-sm rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-brand-600" />
                Meeting rhythm
              </CardTitle>
              <CardDescription>Per-cell schedule overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {growthGroups.map((g) => (
                <div
                  key={g.id}
                  className="rounded-xl border border-slate-100 bg-slate-50/50 p-3"
                >
                  <p className="font-semibold text-slate-900 text-sm">{g.name}</p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {g.meetingDay}s · {g.meetingTime}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {g.city}
                    </span>
                  </div>
                  <Button variant="link" className="h-auto p-0 mt-2 text-brand-700" asChild>
                    <Link href={`/admin/growth-groups/${g.id}`}>Cell profile</Link>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 shadow-sm rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold">Members by cell</CardTitle>
              <CardDescription>Relative roster size</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {growthGroups.map((g) => {
                const n = g.memberIds.length;
                const pct = Math.round((n / maxMembers) * 100);
                return (
                  <div key={g.id}>
                    <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                      <span className="truncate pr-2">{g.name}</span>
                      <span className="tabular-nums text-slate-900">{n}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cell spotlight */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">Cell spotlight</h2>
          <p className="text-sm text-slate-600">
            Health scores — map your own KPIs when data is live.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {growthGroups.map((g) => {
            const leader = getLeaderById(g.leaderId);
            const score = g.healthScore ?? 80;
            const cellMembers = members.filter((m) => m.groupId === g.id);
            const active = cellMembers.filter((m) => m.status === "active").length;
            return (
              <Card
                key={g.id}
                className="border-slate-200/80 shadow-sm rounded-2xl hover:shadow-md transition-shadow"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 leading-snug">{g.name}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {g.city}, {g.state}
                      </p>
                    </div>
                    <HealthRing value={score} />
                  </div>
                  {/* mini member status row */}
                  <div className="mt-3 flex gap-3 text-xs">
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <CheckCircle2 className="h-3 w-3"/> {active} active
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Users className="h-3 w-3"/> {cellMembers.length} total
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <AdminAvatar name={leader?.name ?? "Leader"} size="sm" />
                    <div className="min-w-0 text-sm">
                      <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">Leader</p>
                      <p className="font-medium text-slate-900 truncate">{leader?.name ?? "—"}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="flex-1 bg-brand-600 hover:bg-brand-700" asChild>
                      <Link href={`/admin/growth-groups/${g.id}`}>Open cell</Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/admin/members">Roster</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
