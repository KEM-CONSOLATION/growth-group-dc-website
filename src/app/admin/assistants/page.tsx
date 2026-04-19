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

export default function AssistantsPage() {
  const { data, getGroupLabel } = useDashboard();
  const { assistants } = data;
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return assistants;
    return assistants.filter((a) => {
      const g = getGroupLabel(a.groupId);
      const hay = `${a.name} ${a.email} ${a.roleNote ?? ""} ${g}`.toLowerCase();
      return hay.includes(s);
    });
  }, [assistants, q]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Assistants" },
        ]}
        title="Assistants"
        description="Support leaders across worship, follow-up, prayer, and operations."
      />

      <Card className="border-slate-200/80 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-lg font-bold">Assistant roster</CardTitle>
          <CardDescription>Many-to-one mapping to cells in this sample</CardDescription>
        </CardHeader>
        <AdminTableToolbar
          placeholder="Search assistants or roles…"
          value={q}
          onChange={setQ}
          countLabel={`${filtered.length} assistant${filtered.length === 1 ? "" : "s"}`}
        />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 bg-slate-50/90">
                  <th className="px-4 py-3.5">Name</th>
                  <th className="px-4 py-3.5">Cell</th>
                  <th className="px-4 py-3.5 hidden sm:table-cell">Focus</th>
                  <th className="px-4 py-3.5 hidden md:table-cell">Email</th>
                  <th className="px-4 py-3.5 hidden lg:table-cell">Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((a) => (
                  <tr key={a.id} className="bg-white hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <AdminAvatar name={a.name} size="sm" />
                        <span className="font-semibold text-slate-900">{a.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/admin/growth-groups/${a.groupId}`}
                        className="font-medium text-brand-700 hover:underline"
                      >
                        {getGroupLabel(a.groupId)}
                      </Link>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 hidden sm:table-cell">
                      {a.roleNote ? (
                        <span className="inline-flex rounded-full bg-brand-50 text-brand-800 text-xs font-medium px-2.5 py-0.5">
                          {a.roleNote}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 hidden md:table-cell">
                      {a.email}
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 hidden lg:table-cell whitespace-nowrap">
                      {a.phone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-slate-500">
              No assistants match your search.
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
