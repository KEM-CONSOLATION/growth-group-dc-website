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
import { AdminModal } from "@/src/components/admin/admin-modal";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { UserRoundPlus } from "lucide-react";
import type { DashboardMember } from "@/src/data/dashboard-data";

const inputCls =
  "w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-colors";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  groupId: "",
  status: "active" as DashboardMember["status"],
};

export default function MembersPage() {
  const { data, hydrated, getGroupLabel, addMember } = useDashboard();
  const { members } = data;
  const [q, setQ] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const effectiveGroupId = form.groupId || data.growthGroups[0]?.id || "";

  const canSubmit =
    form.name.trim().length > 1 &&
    form.email.trim().includes("@") &&
    form.phone.trim().length > 0 &&
    !!effectiveGroupId;

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return members;
    return members.filter((m) => {
      const g = getGroupLabel(m.groupId);
      return `${m.name} ${m.email} ${m.status} ${g}`.toLowerCase().includes(s);
    });
  }, [members, q, getGroupLabel]);

  function openModal() {
    setForm(EMPTY_FORM);
    setSubmitted(false);
    setModalOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (!canSubmit) return;
    addMember({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      groupId: effectiveGroupId,
      status: form.status,
    });
    setModalOpen(false);
    setForm(EMPTY_FORM);
    setSubmitted(false);
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Members" },
        ]}
        title="Members"
        description="Full cell membership with status: active, visitor, or inactive."
        action={
          <Button
            className="bg-brand-600 hover:bg-brand-700 text-white"
            onClick={openModal}
          >
            <UserRoundPlus className="h-4 w-4 mr-2" />
            Add member
          </Button>
        }
      />

      <Card className="border-slate-200/80 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-lg font-bold">Member directory</CardTitle>
          <CardDescription>
            {members.length} member{members.length !== 1 ? "s" : ""} across all cells
          </CardDescription>
        </CardHeader>
        <AdminTableToolbar
          placeholder="Search members, cells, or status…"
          value={q}
          onChange={setQ}
          countLabel={`${filtered.length} people`}
        />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 bg-slate-50/90">
                  <th className="px-4 py-3.5">Member</th>
                  <th className="px-4 py-3.5">Cell</th>
                  <th className="px-4 py-3.5 hidden md:table-cell">Email</th>
                  <th className="px-4 py-3.5 hidden lg:table-cell">Phone</th>
                  <th className="px-4 py-3.5">Joined</th>
                  <th className="px-4 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((m) => (
                  <tr key={m.id} className="bg-white hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <AdminAvatar name={m.name} size="sm" />
                        <span className="font-semibold text-slate-900">{m.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/admin/growth-groups/${m.groupId}`}
                        className="font-medium text-brand-700 hover:underline"
                      >
                        {getGroupLabel(m.groupId)}
                      </Link>
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 hidden md:table-cell">
                      {m.email}
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 hidden lg:table-cell whitespace-nowrap">
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
          {filtered.length === 0 && (
            <div className="px-4 py-10 text-center">
              <p className="text-sm text-slate-500 mb-3">
                {q ? "No members match your search." : "No members yet."}
              </p>
              {!q && (
                <Button onClick={openModal} className="bg-brand-600 hover:bg-brand-700 text-white">
                  <UserRoundPlus className="h-4 w-4 mr-2" />
                  Add your first member
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Add member modal ── */}
      <AdminModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Add member"
        description="Register someone on a cell roster. They appear in the table immediately."
        width="max-w-xl"
      >
        {!hydrated ? (
          <p className="text-sm text-slate-500 py-6 text-center">Loading workspace…</p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Full name — span 2 */}
              <div className="space-y-1.5 sm:col-span-2">
                <label htmlFor="mod-m-name" className="text-sm font-semibold text-slate-800">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  id="mod-m-name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={cn(
                    inputCls,
                    submitted && form.name.trim().length < 2 && "border-red-400 focus:border-red-400 focus:ring-red-400/30"
                  )}
                  placeholder="e.g. Ada Okafor"
                />
                {submitted && form.name.trim().length < 2 && (
                  <p className="text-xs text-red-500">Full name is required.</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="mod-m-email" className="text-sm font-semibold text-slate-800">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="mod-m-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className={cn(
                    inputCls,
                    submitted && !form.email.includes("@") && "border-red-400 focus:border-red-400 focus:ring-red-400/30"
                  )}
                  placeholder="name@email.com"
                />
                {submitted && !form.email.includes("@") && (
                  <p className="text-xs text-red-500">Valid email required.</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label htmlFor="mod-m-phone" className="text-sm font-semibold text-slate-800">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  id="mod-m-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className={cn(
                    inputCls,
                    submitted && form.phone.trim().length === 0 && "border-red-400 focus:border-red-400 focus:ring-red-400/30"
                  )}
                  placeholder="+234 …"
                />
                {submitted && form.phone.trim().length === 0 && (
                  <p className="text-xs text-red-500">Phone number required.</p>
                )}
              </div>

              {/* Growth group */}
              <div className="space-y-1.5">
                <label htmlFor="mod-m-group" className="text-sm font-semibold text-slate-800">
                  Growth group
                </label>
                <select
                  id="mod-m-group"
                  value={effectiveGroupId}
                  onChange={(e) => setForm((f) => ({ ...f, groupId: e.target.value }))}
                  className={inputCls}
                >
                  {data.growthGroups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name} — {g.city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <label htmlFor="mod-m-status" className="text-sm font-semibold text-slate-800">
                  Status
                </label>
                <select
                  id="mod-m-status"
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as DashboardMember["status"] }))}
                  className={inputCls}
                >
                  <option value="active">Active</option>
                  <option value="visitor">Visitor</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-1 border-t border-slate-100">
              <Button
                type="submit"
                disabled={submitted && !canSubmit}
                className="bg-brand-600 hover:bg-brand-700 text-white"
              >
                Save member
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
