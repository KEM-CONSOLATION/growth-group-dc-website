"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { useDashboard } from "@/src/context/DashboardDataContext";
import { AdminAvatar, AdminPageHeader } from "@/src/components/admin/admin-ui";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function GrowthGroupDetailPage() {
  const { data, getGroupById, getLeaderById } = useDashboard();
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const group = id ? getGroupById(id) : undefined;
  if (!group) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <h1 className="text-xl font-bold text-slate-900">Cell not found</h1>
        <p className="text-slate-600 mt-2 text-sm">
          This group id is not in the sample data.
        </p>
        <Button className="mt-6" asChild>
          <Link href="/admin/growth-groups">Back to directory</Link>
        </Button>
      </div>
    );
  }

  const leader = getLeaderById(group.leaderId);
  const assistants = data.assistants.filter((a) =>
    group.assistantIds.includes(a.id)
  );
  const members = data.members.filter((m) =>
    group.memberIds.includes(m.id)
  );
  const score = group.healthScore ?? 0;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Growth groups", href: "/admin/growth-groups" },
          { label: group.name },
        ]}
        title={group.name}
        description={`${group.city}, ${group.state} · ${group.venue}`}
        action={
          <Button variant="outline" asChild>
            <Link href="/admin/growth-groups">All cells</Link>
          </Button>
        }
      />

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-slate-200/80 shadow-sm rounded-2xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-700" />
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 font-medium">
                    <MapPin className="h-4 w-4 text-brand-600" />
                    {group.city}, {group.state}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 font-medium">
                    <Calendar className="h-4 w-4 text-brand-600" />
                    {group.meetingDay}s
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 font-medium">
                    <Clock className="h-4 w-4 text-brand-600" />
                    {group.meetingTime}
                  </span>
                </div>
                {group.notes ? (
                  <p className="text-slate-700 leading-relaxed max-w-2xl">{group.notes}</p>
                ) : null}
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Users className="h-4 w-4" />
                  <span className="font-medium text-slate-700">{members.length}</span> members
                  ·{" "}
                  <span className="font-medium text-slate-700">{assistants.length}</span>{" "}
                  assistants
                </div>
              </div>
              {group.healthScore != null ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-6 py-5 text-center min-w-[140px]">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    Cell health
                  </p>
                  <p className="text-4xl font-bold text-brand-700 tabular-nums mt-1">
                    {score}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">sample score / 100</p>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base font-bold">Leader</CardTitle>
            <CardDescription>Primary accountability</CardDescription>
          </CardHeader>
          <CardContent>
            {leader ? (
              <div className="flex gap-4">
                <AdminAvatar name={leader.name} size="lg" />
                <div className="min-w-0 space-y-1 text-sm">
                  <p className="font-bold text-slate-900">{leader.name}</p>
                  <p className="text-slate-600 break-all">{leader.email}</p>
                  <p className="text-slate-600">{leader.phone}</p>
                  <p className="text-xs text-slate-500 pt-2">
                    Appointed {leader.appointedAt}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500">No leader linked.</p>
            )}
          </CardContent>
        </Card>
      </section>

      <Card className="border-slate-200/80 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-slate-100 bg-white">
          <CardTitle className="text-lg font-bold">
            Assistants ({assistants.length})
          </CardTitle>
          <CardDescription>Support and ministry roles</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y divide-slate-100">
            {assistants.map((a) => (
              <li
                key={a.id}
                className="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-slate-50/60"
              >
                <div className="flex items-center gap-3">
                  <AdminAvatar name={a.name} size="sm" />
                  <div>
                    <p className="font-semibold text-slate-900">{a.name}</p>
                    {a.roleNote ? (
                      <p className="text-xs font-medium text-brand-800 mt-0.5">
                        {a.roleNote}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="text-sm text-slate-600 sm:text-right">
                  <p>{a.email}</p>
                  <p className="whitespace-nowrap">{a.phone}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-lg font-bold">Members ({members.length})</CardTitle>
          <CardDescription>Roster for this cell</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 bg-slate-50/90">
                  <th className="px-4 py-3.5">Name</th>
                  <th className="px-4 py-3.5 hidden sm:table-cell">Email</th>
                  <th className="px-4 py-3.5 hidden md:table-cell">Phone</th>
                  <th className="px-4 py-3.5">Joined</th>
                  <th className="px-4 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {members.map((m) => (
                  <tr key={m.id} className="bg-white hover:bg-slate-50/60">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <AdminAvatar name={m.name} size="sm" />
                        <span className="font-semibold text-slate-900">{m.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 hidden sm:table-cell">
                      {m.email}
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 hidden md:table-cell whitespace-nowrap">
                      {m.phone}
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">
                      {m.joinedAt}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={cn(
                          "inline-flex text-xs font-semibold px-2.5 py-1 rounded-full capitalize",
                          m.status === "active" && "bg-emerald-50 text-emerald-800",
                          m.status === "visitor" && "bg-amber-50 text-amber-900",
                          m.status === "inactive" && "bg-slate-100 text-slate-700"
                        )}
                      >
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
