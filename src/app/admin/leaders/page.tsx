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
import { useDashboard } from "@/src/context/DashboardDataContext";
import {
  AdminAvatar,
  AdminPageHeader,
  AdminTableToolbar,
} from "@/src/components/admin/admin-ui";

export default function LeadersPage() {
  const { data, getGroupLabel } = useDashboard();
  const { leaders } = data;
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return leaders;
    return leaders.filter((l) => {
      const g = getGroupLabel(l.groupId);
      const hay = `${l.name} ${l.email} ${g}`.toLowerCase();
      return hay.includes(s);
    });
  }, [leaders, q]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Leaders" },
        ]}
        title="Leaders"
        description="Primary cell leaders with appointment dates and linked groups."
      />

      <Card className="border-slate-200/80 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-lg font-bold">Leader roster</CardTitle>
          <CardDescription>One accountable leader per cell in this sample dataset</CardDescription>
        </CardHeader>
        <AdminTableToolbar
          placeholder="Search leaders…"
          value={q}
          onChange={setQ}
          countLabel={`${filtered.length} leader${filtered.length === 1 ? "" : "s"}`}
        />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 bg-slate-50/90">
                  <th className="px-4 py-3.5">Leader</th>
                  <th className="px-4 py-3.5">Cell</th>
                  <th className="px-4 py-3.5 hidden md:table-cell">Email</th>
                  <th className="px-4 py-3.5 hidden lg:table-cell">Phone</th>
                  <th className="px-4 py-3.5">Since</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((l) => (
                  <tr key={l.id} className="bg-white hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <AdminAvatar name={l.name} size="sm" />
                        <div>
                          <p className="font-semibold text-slate-900">{l.name}</p>
                          {l.bio ? (
                            <p className="text-xs text-slate-500 line-clamp-1 max-w-xs">
                              {l.bio}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/admin/growth-groups/${l.groupId}`}
                        className="font-medium text-brand-700 hover:underline"
                      >
                        {getGroupLabel(l.groupId)}
                      </Link>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 hidden md:table-cell">
                      {l.email}
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 hidden lg:table-cell whitespace-nowrap">
                      {l.phone}
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">
                      {l.appointedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-slate-500">
              No leaders match your search.
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
