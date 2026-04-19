"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
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
import type { DashboardMember } from "@/src/data/dashboard-data";

const inputCls =
  "w-full px-3 py-3 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500";

export default function AddMemberPage() {
  const { data, hydrated, addMember } = useDashboard();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [groupId, setGroupId] = useState("");
  const [status, setStatus] = useState<DashboardMember["status"]>("active");

  const defaultGroup = data.growthGroups[0]?.id ?? "";

  const effectiveGroupId = groupId || defaultGroup;

  const canSubmit = useMemo(() => {
    return (
      name.trim().length > 1 &&
      email.trim().includes("@") &&
      phone.trim().length > 0 &&
      !!effectiveGroupId
    );
  }, [name, email, phone, effectiveGroupId]);

  if (!hydrated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-slate-500 text-sm">
        Loading workspace…
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !effectiveGroupId) return;
    addMember({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      groupId: effectiveGroupId,
      status,
    });
    router.push("/admin/members");
  };

  return (
    <div className="space-y-8 pb-10">
      <AdminPageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Members", href: "/admin/members" },
          { label: "Add member" },
        ]}
        title="Add member"
        description="Register someone on a cell roster. They appear under Members and in that growth group immediately."
        action={
          <Button variant="outline" className="border-slate-200" asChild>
            <Link href="/admin/members">Back to list</Link>
          </Button>
        }
      />

      <Card className="border-slate-200/80 shadow-sm max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 text-brand-700">
            <UserPlus className="h-5 w-5" />
            <CardTitle className="text-lg">Member details</CardTitle>
          </div>
          <CardDescription>
            Data is stored in this browser until you connect a database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="m-name" className="text-sm font-semibold text-slate-800">
                  Full name
                </label>
                <input
                  id="m-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputCls}
                  placeholder="e.g. Ada Okafor"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="m-email" className="text-sm font-semibold text-slate-800">
                  Email
                </label>
                <input
                  id="m-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                  placeholder="name@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="m-phone" className="text-sm font-semibold text-slate-800">
                  Phone
                </label>
                <input
                  id="m-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputCls}
                  placeholder="+234 …"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="m-group" className="text-sm font-semibold text-slate-800">
                  Growth group
                </label>
                <select
                  id="m-group"
                  value={effectiveGroupId}
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
                <label htmlFor="m-status" className="text-sm font-semibold text-slate-800">
                  Status
                </label>
                <select
                  id="m-status"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as DashboardMember["status"])
                  }
                  className={inputCls}
                >
                  <option value="active">Active</option>
                  <option value="visitor">Visitor</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                type="submit"
                disabled={!canSubmit}
                className="bg-brand-600 hover:bg-brand-700 text-white"
              >
                Save member
              </Button>
              <Button type="button" variant="ghost" asChild>
                <Link href="/admin/members">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
