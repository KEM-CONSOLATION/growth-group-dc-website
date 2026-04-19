"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClipboardList } from "lucide-react";
import { useDashboard } from "@/src/context/DashboardDataContext";
import { AdminPageHeader } from "@/src/components/admin/admin-ui";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

const inputCls =
  "w-full px-3 py-3 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500";

export default function NewMeetingReportPage() {
  const { data, hydrated, addMeetingReport } = useDashboard();
  const router = useRouter();
  const [groupId, setGroupId] = useState("");
  const [meetingDate, setMeetingDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [attendance, setAttendance] = useState(10);
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");

  const defaultG = data.growthGroups[0]?.id ?? "";
  const gid = groupId || defaultG;

  const canSubmit = useMemo(() => {
    return gid.length > 0 && meetingDate.length > 0 && attendance >= 0;
  }, [gid, meetingDate, attendance]);

  if (!hydrated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-slate-500 text-sm">
        Loading workspace…
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    addMeetingReport({
      groupId: gid,
      meetingDate,
      attendance: Math.max(0, Math.floor(attendance)),
      topic: topic.trim() || undefined,
      notes: notes.trim() || undefined,
    });
    router.push("/admin/meeting-reports");
  };

  return (
    <div className="space-y-8 pb-10">
      <AdminPageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Meeting reports", href: "/admin/meeting-reports" },
          { label: "New" },
        ]}
        title="New meeting report"
        description="Record what happened in cell: numbers, theme, and a short testimony or follow-up note."
        action={
          <Button variant="outline" className="border-slate-200" asChild>
            <Link href="/admin/meeting-reports">All reports</Link>
          </Button>
        }
      />

      <Card className="border-slate-200/80 shadow-sm max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 text-brand-700">
            <ClipboardList className="h-5 w-5" />
            <CardTitle className="text-lg">Meeting details</CardTitle>
          </div>
          <CardDescription>
            Attendance should match who was physically or online with the group.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="mr-group" className="text-sm font-semibold text-slate-800">
                  Growth group
                </label>
                <select
                  id="mr-group"
                  value={gid}
                  onChange={(e) => setGroupId(e.target.value)}
                  className={inputCls}
                >
                  {data.growthGroups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name} — {g.city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="mr-date" className="text-sm font-semibold text-slate-800">
                  Meeting date
                </label>
                <input
                  id="mr-date"
                  type="date"
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  className={inputCls}
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="mr-att"
                  className="text-sm font-semibold text-slate-800"
                >
                  Attendance count
                </label>
                <input
                  id="mr-att"
                  type="number"
                  min={0}
                  value={attendance}
                  onChange={(e) => setAttendance(Number(e.target.value))}
                  className={inputCls}
                  required
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="mr-topic" className="text-sm font-semibold text-slate-800">
                  Topic / series (optional)
                </label>
                <input
                  id="mr-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className={inputCls}
                  placeholder="e.g. Faith that moves mountains"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="mr-notes" className="text-sm font-semibold text-slate-800">
                  Notes (optional)
                </label>
                <textarea
                  id="mr-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={inputCls + " min-h-[120px] resize-y"}
                  placeholder="Visitors, salvations, prayer needs, next meeting emphasis…"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                type="submit"
                disabled={!canSubmit}
                className="bg-brand-600 hover:bg-brand-700 text-white"
              >
                Save report
              </Button>
              <Button type="button" variant="ghost" asChild>
                <Link href="/admin/meeting-reports">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
