"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ClipboardList, Plus } from "lucide-react";
import { useDashboard } from "@/src/context/DashboardDataContext";
import { AdminPageHeader } from "@/src/components/admin/admin-ui";
import { AdminModal } from "@/src/components/admin/admin-modal";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";

const inputCls =
  "w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-colors";

const EMPTY_FORM = {
  groupId: "",
  meetingDate: new Date().toISOString().slice(0, 10),
  attendance: 10,
  topic: "",
  notes: "",
};

export default function MeetingReportsPage() {
  const { data, hydrated, getGroupLabel, addMeetingReport } = useDashboard();
  const rows = data.meetingReports;
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const gid = form.groupId || data.growthGroups[0]?.id || "";
  const canSubmit = gid.length > 0 && form.meetingDate.length > 0 && form.attendance >= 0;

  function openModal() {
    setForm({ ...EMPTY_FORM, meetingDate: new Date().toISOString().slice(0, 10) });
    setSubmitted(false);
    setModalOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (!canSubmit) return;
    addMeetingReport({
      groupId: gid,
      meetingDate: form.meetingDate,
      attendance: Math.max(0, Math.floor(form.attendance)),
      topic: form.topic.trim() || undefined,
      notes: form.notes.trim() || undefined,
    });
    setModalOpen(false);
    setForm(EMPTY_FORM);
    setSubmitted(false);
  }

  // Sort newest first
  const sortedRows = useMemo(
    () => [...rows].sort((a, b) => b.meetingDate.localeCompare(a.meetingDate)),
    [rows]
  );

  if (!hydrated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-slate-500 text-sm">
        Loading workspace…
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <AdminPageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Meeting reports" },
        ]}
        title="Meeting reports"
        description="Log weekly cell meetings: attendance, topic, and notes."
        action={
          <Button className="bg-brand-600 hover:bg-brand-700 text-white" onClick={openModal}>
            <Plus className="h-4 w-4 mr-2" />
            New report
          </Button>
        }
      />

      <Card className="border-slate-200/80 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="flex flex-row items-start gap-3 space-y-0 border-b border-slate-100">
          <ClipboardList className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
          <div>
            <CardTitle className="text-lg">Recent reports</CardTitle>
            <CardDescription>
              {rows.length === 0
                ? "No reports yet — add your first meeting."
                : `${rows.length} report${rows.length === 1 ? "" : "s"} on file.`}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {rows.length === 0 ? (
            <div className="rounded-xl m-4 border border-dashed border-slate-200 bg-slate-50/80 px-6 py-12 text-center">
              <p className="text-slate-600 text-sm mb-4">
                Capture attendance and what God did in the meeting.
              </p>
              <Button onClick={openModal} className="bg-brand-600 hover:bg-brand-700 text-white">
                Add meeting report
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 border-b border-slate-100">
                    <th className="px-5 py-3.5">Date</th>
                    <th className="px-5 py-3.5">Cell</th>
                    <th className="px-5 py-3.5">Attendance</th>
                    <th className="px-5 py-3.5">Topic</th>
                    <th className="px-5 py-3.5 hidden md:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sortedRows.map((r) => (
                    <tr
                      key={r.id}
                      className="bg-white hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="px-5 py-4 text-slate-900 whitespace-nowrap font-medium">
                        {r.meetingDate}
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/growth-groups/${r.groupId}`}
                          className="font-medium text-brand-700 hover:underline"
                        >
                          {getGroupLabel(r.groupId)}
                        </Link>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 font-bold tabular-nums text-slate-900">
                          {r.attendance}
                          <span className="text-xs font-normal text-slate-400">people</span>
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-700 max-w-[12rem] truncate">
                        {r.topic ?? "—"}
                      </td>
                      <td className="px-5 py-4 text-slate-500 max-w-sm truncate hidden md:table-cell">
                        {r.notes ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── New report modal ── */}
      <AdminModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="New meeting report"
        description="Record what happened in cell: numbers, theme, and a short follow-up note."
        width="max-w-xl"
      >
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Growth group — full width */}
            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="mod-mr-group" className="text-sm font-semibold text-slate-800">
                Growth group
              </label>
              <select
                id="mod-mr-group"
                value={gid}
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

            {/* Date */}
            <div className="space-y-1.5">
              <label htmlFor="mod-mr-date" className="text-sm font-semibold text-slate-800">
                Meeting date <span className="text-red-500">*</span>
              </label>
              <input
                id="mod-mr-date"
                type="date"
                value={form.meetingDate}
                onChange={(e) => setForm((f) => ({ ...f, meetingDate: e.target.value }))}
                className={cn(
                  inputCls,
                  submitted && !form.meetingDate && "border-red-400"
                )}
              />
            </div>

            {/* Attendance */}
            <div className="space-y-1.5">
              <label htmlFor="mod-mr-att" className="text-sm font-semibold text-slate-800">
                Attendance count <span className="text-red-500">*</span>
              </label>
              <input
                id="mod-mr-att"
                type="number"
                min={0}
                value={form.attendance}
                onChange={(e) => setForm((f) => ({ ...f, attendance: Number(e.target.value) }))}
                className={inputCls}
              />
            </div>

            {/* Topic — full width */}
            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="mod-mr-topic" className="text-sm font-semibold text-slate-800">
                Topic / series{" "}
                <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                id="mod-mr-topic"
                value={form.topic}
                onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
                className={inputCls}
                placeholder="e.g. Faith that moves mountains"
              />
            </div>

            {/* Notes — full width */}
            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="mod-mr-notes" className="text-sm font-semibold text-slate-800">
                Notes{" "}
                <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <textarea
                id="mod-mr-notes"
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                rows={3}
                className={cn(inputCls, "resize-none")}
                placeholder="Visitors, salvations, prayer needs, next meeting emphasis…"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-1 border-t border-slate-100">
            <Button
              type="submit"
              disabled={submitted && !canSubmit}
              className="bg-brand-600 hover:bg-brand-700 text-white"
            >
              Save report
            </Button>
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
