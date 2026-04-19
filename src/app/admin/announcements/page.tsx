"use client";

import { useState, useMemo } from "react";
import { AdminPageHeader } from "@/src/components/admin/admin-ui";
import { AdminModal } from "@/src/components/admin/admin-modal";
import { Button } from "@/src/components/ui/button";
import { Bell, Pin, Plus, Trash2, Megaphone, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/src/lib/utils";

type Announcement = {
  id: string;
  title: string;
  body: string;
  type: "info" | "urgent" | "praise";
  pinned: boolean;
  createdAt: string;
};

const SEED: Announcement[] = [
  {
    id: "ann-001",
    title: "All-cell leaders meeting",
    body: "All growth group leaders are expected to attend the zonal review on Saturday, 26 April 2026 at 10:00 AM in the main hall.",
    type: "urgent",
    pinned: true,
    createdAt: "2026-04-18",
  },
  {
    id: "ann-002",
    title: "Testimony Sunday — share a praise report",
    body: "We celebrate breakthroughs! Submit your testimony via the WhatsApp group before Friday so we can arrange a praise segment.",
    type: "praise",
    pinned: false,
    createdAt: "2026-04-15",
  },
  {
    id: "ann-003",
    title: "Attendance tracking reminder",
    body: "Please ensure all cell meeting reports are submitted within 24 hours of each meeting for accurate dashboard analytics.",
    type: "info",
    pinned: false,
    createdAt: "2026-04-10",
  },
];

const typeConfig = {
  info: {
    icon: Info,
    bg: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-800",
    label: "Info",
  },
  urgent: {
    icon: AlertTriangle,
    bg: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-800",
    label: "Urgent",
  },
  praise: {
    icon: Megaphone,
    bg: "bg-amber-50 border-amber-200",
    badge: "bg-amber-100 text-amber-800",
    label: "Praise",
  },
};

const EMPTY_FORM = { title: "", body: "", type: "info" as Announcement["type"] };

const inputCls =
  "w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-colors";

export default function AnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>(SEED);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = form.title.trim().length > 0 && form.body.trim().length > 0;

  const sorted = useMemo(
    () => [...items].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)),
    [items]
  );

  function openModal() {
    setForm(EMPTY_FORM);
    setSubmitted(false);
    setModalOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (!canSubmit) return;
    const ann: Announcement = {
      id: `ann-${Date.now()}`,
      title: form.title.trim(),
      body: form.body.trim(),
      type: form.type,
      pinned: false,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setItems((prev) => [ann, ...prev]);
    setModalOpen(false);
    setForm(EMPTY_FORM);
    setSubmitted(false);
  }

  function togglePin(id: string) {
    setItems((prev) =>
      prev.map((a) => (a.id === id ? { ...a, pinned: !a.pinned } : a))
    );
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="space-y-8 pb-10">
      <AdminPageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Announcements" },
        ]}
        title="Announcements"
        description="Post and pin announcements for all cell leaders to see at login."
        action={
          <Button
            className="bg-brand-600 hover:bg-brand-700 text-white"
            onClick={openModal}
          >
            <Plus className="h-4 w-4 mr-2" />
            New announcement
          </Button>
        }
      />

      {/* List */}
      <div className="space-y-4">
        {sorted.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-12 text-center">
            <Bell className="h-8 w-8 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm mb-4">No announcements yet.</p>
            <Button onClick={openModal} className="bg-brand-600 hover:bg-brand-700 text-white">
              <Plus className="h-4 w-4 mr-2" /> Post first announcement
            </Button>
          </div>
        )}
        {sorted.map((ann) => {
          const cfg = typeConfig[ann.type];
          const Icon = cfg.icon;
          return (
            <div
              key={ann.id}
              className={cn(
                "rounded-2xl border flex gap-4 items-start p-5 transition-shadow hover:shadow-md",
                cfg.bg,
                ann.pinned && "ring-2 ring-brand-300"
              )}
            >
              <div className="shrink-0 mt-0.5">
                <Icon className="h-5 w-5 text-slate-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="font-bold text-slate-900 text-sm">{ann.title}</p>
                  <span className={cn("text-[10px] font-bold uppercase px-2 py-0.5 rounded-full", cfg.badge)}>
                    {cfg.label}
                  </span>
                  {ann.pinned && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-brand-100 text-brand-800">
                      Pinned
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{ann.body}</p>
                <p className="text-xs text-slate-400 mt-2">{ann.createdAt}</p>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-brand-700"
                  onClick={() => togglePin(ann.id)}
                  title={ann.pinned ? "Unpin" : "Pin"}
                >
                  <Pin className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-red-600"
                  onClick={() => remove(ann.id)}
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Create announcement modal ── */}
      <AdminModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="New announcement"
        description="This will be visible to all leaders at login. Pin important ones."
        width="max-w-lg"
      >
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Title */}
          <div className="space-y-1.5">
            <label htmlFor="mod-ann-title" className="text-sm font-semibold text-slate-800">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="mod-ann-title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className={cn(
                inputCls,
                submitted && !form.title.trim() && "border-red-400"
              )}
              placeholder="Announcement title…"
            />
            {submitted && !form.title.trim() && (
              <p className="text-xs text-red-500">Title is required.</p>
            )}
          </div>

          {/* Body */}
          <div className="space-y-1.5">
            <label htmlFor="mod-ann-body" className="text-sm font-semibold text-slate-800">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="mod-ann-body"
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              rows={3}
              className={cn(
                inputCls,
                "resize-none",
                submitted && !form.body.trim() && "border-red-400"
              )}
              placeholder="What do you want to communicate?"
            />
            {submitted && !form.body.trim() && (
              <p className="text-xs text-red-500">Message is required.</p>
            )}
          </div>

          {/* Type */}
          <div className="space-y-1.5">
            <p className="text-sm font-semibold text-slate-800">Type</p>
            <div className="flex gap-2">
              {(["info", "urgent", "praise"] as const).map((t) => {
                const cfg = typeConfig[t];
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, type: t }))}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all capitalize",
                      form.type === t
                        ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:border-brand-300 hover:bg-brand-50"
                    )}
                  >
                    <cfg.icon className="h-3.5 w-3.5" />
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-1 border-t border-slate-100">
            <Button
              type="submit"
              disabled={submitted && !canSubmit}
              className="bg-brand-600 hover:bg-brand-700 text-white"
            >
              Post announcement
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
