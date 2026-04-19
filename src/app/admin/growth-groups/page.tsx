"use client";

import { useMemo, useState } from "react";
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
import {
  AdminAvatar,
  AdminPageHeader,
  AdminTableToolbar,
} from "@/src/components/admin/admin-ui";
import { ChevronRight, Users } from "lucide-react";

export default function GrowthGroupsPage() {
  const { data, getLeaderById } = useDashboard();
  const { growthGroups } = data;
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return growthGroups;
    return growthGroups.filter((g) => {
      const leader = getLeaderById(g.leaderId);
      const hay = `${g.name} ${g.city} ${g.state} ${leader?.name ?? ""}`.toLowerCase();
      return hay.includes(s);
    });
  }, [growthGroups, q]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Growth groups" },
        ]}
        title="Growth groups"
        description="Active cells with leaders, rhythm, and roster counts. Search filters this list locally until your API is live."
      />

      <Card className="border-slate-200/80 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-slate-100 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle className="text-lg font-bold">Cell directory</CardTitle>
              <CardDescription>Structured roster similar to a home-cell workspace</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Users className="h-4 w-4 text-brand-600" />
              {growthGroups.length} cells
            </div>
          </div>
        </CardHeader>
        <AdminTableToolbar
          placeholder="Search by cell, city, or leader…"
          value={q}
          onChange={setQ}
          countLabel={`Showing ${filtered.length} of ${growthGroups.length}`}
        />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 bg-slate-50/90">
                  <th className="px-4 py-3.5">Cell</th>
                  <th className="px-4 py-3.5 hidden md:table-cell">Location</th>
                  <th className="px-4 py-3.5">Leader</th>
                  <th className="px-4 py-3.5">Schedule</th>
                  <th className="px-4 py-3.5 text-right">Members</th>
                  <th className="px-4 py-3.5 w-14" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((g) => {
                  const leader = getLeaderById(g.leaderId);
                  return (
                    <tr
                      key={g.id}
                      className="bg-white hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <AdminAvatar name={g.name} size="sm" />
                          <div>
                            <p className="font-semibold text-slate-900">{g.name}</p>
                            {g.healthScore != null ? (
                              <p className="text-xs text-slate-500">
                                Health {g.healthScore}%
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 hidden md:table-cell">
                        {g.city}, {g.state}
                      </td>
                      <td className="px-4 py-3.5">
                        {leader ? (
                          <div className="flex items-center gap-2">
                            <AdminAvatar name={leader.name} size="sm" />
                            <span className="text-slate-800">{leader.name}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">
                        {g.meetingDay} {g.meetingTime}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <span className="inline-flex items-center justify-end min-w-[2rem] font-semibold tabular-nums text-slate-900">
                          {g.memberIds.length}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-slate-400 group-hover:text-brand-700"
                          asChild
                        >
                          <Link href={`/admin/growth-groups/${g.id}`}>
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-slate-500">
              No cells match your search.
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
