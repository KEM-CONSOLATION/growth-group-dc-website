"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRightLeft } from "lucide-react";
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

export default function AssignToCellPage() {
  const { data, hydrated, assignMemberToGroup, getGroupLabel } = useDashboard();
  const [memberId, setMemberId] = useState("");
  const [groupId, setGroupId] = useState("");
  const [notice, setNotice] = useState<"ok" | null>(null);

  const sortedMembers = useMemo(
    () => [...data.members].sort((a, b) => a.name.localeCompare(b.name)),
    [data.members]
  );

  const selectedMember = data.members.find((m) => m.id === memberId);
  const currentLabel = selectedMember
    ? getGroupLabel(selectedMember.groupId)
    : "";

  const defaultGroup = data.growthGroups[0]?.id ?? "";
  const targetGroupId = groupId || defaultGroup;

  if (!hydrated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-slate-500 text-sm">
        Loading workspace…
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberId || !targetGroupId) return;
    assignMemberToGroup(memberId, targetGroupId);
    setNotice("ok");
    setTimeout(() => setNotice(null), 4000);
  };

  return (
    <div className="space-y-8 pb-10">
      <AdminPageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Assign to cell" },
        ]}
        title="Assign to cell"
        description="Move someone from their current roster into another growth group. Leaders and assistants are managed under Team & roles."
        action={
          <Button variant="outline" className="border-slate-200" asChild>
            <Link href="/admin/members">View members</Link>
          </Button>
        }
      />

      {notice === "ok" ? (
        <div
          role="status"
          className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
        >
          Assignment saved. The member now appears under the selected cell.
        </div>
      ) : null}

      <Card className="border-slate-200/80 shadow-sm max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 text-brand-700">
            <ArrowRightLeft className="h-5 w-5" />
            <CardTitle className="text-lg">Move member</CardTitle>
          </div>
          <CardDescription>
            Pick a person, then choose their new cell. This updates the group
            roster only.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="a-member" className="text-sm font-semibold text-slate-800">
                Member
              </label>
              <select
                id="a-member"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                className={inputCls}
                required
              >
                <option value="">Select a member…</option>
                {sortedMembers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} — currently {getGroupLabel(m.groupId)}
                  </option>
                ))}
              </select>
            </div>

            {selectedMember ? (
              <p className="text-xs text-slate-500">
                Current cell:{" "}
                <span className="font-medium text-slate-700">{currentLabel}</span>
              </p>
            ) : null}

            <div className="space-y-2">
              <label htmlFor="a-group" className="text-sm font-semibold text-slate-800">
                New growth group
              </label>
              <select
                id="a-group"
                value={targetGroupId}
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

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                type="submit"
                disabled={!memberId}
                className="bg-brand-600 hover:bg-brand-700 text-white"
              >
                Save assignment
              </Button>
              <Button type="button" variant="ghost" asChild>
                <Link href="/admin">Dashboard</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
