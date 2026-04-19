"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Shield, UserCog, Crown } from "lucide-react";
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

type Source = "member" | "new";

export default function TeamRolesPage() {
  const {
    data,
    hydrated,
    setGroupLeader,
    addAssistantToGroup,
    resetToSampleData,
    getLeaderById,
  } = useDashboard();

  const [leaderGroupId, setLeaderGroupId] = useState("");
  const [leaderSource, setLeaderSource] = useState<Source>("member");
  const [leaderMemberId, setLeaderMemberId] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [leaderPhone, setLeaderPhone] = useState("");
  const [leaderBio, setLeaderBio] = useState("");
  const [leaderMsg, setLeaderMsg] = useState<string | null>(null);
  const [leaderErr, setLeaderErr] = useState<string | null>(null);

  const [asstGroupId, setAsstGroupId] = useState("");
  const [asstSource, setAsstSource] = useState<Source>("member");
  const [asstMemberId, setAsstMemberId] = useState("");
  const [asstName, setAsstName] = useState("");
  const [asstEmail, setAsstEmail] = useState("");
  const [asstPhone, setAsstPhone] = useState("");
  const [asstNote, setAsstNote] = useState("");
  const [asstMsg, setAsstMsg] = useState<string | null>(null);
  const [asstErr, setAsstErr] = useState<string | null>(null);

  const defaultG = data.growthGroups[0]?.id ?? "";
  const lg = leaderGroupId || defaultG;
  const ag = asstGroupId || defaultG;

  const membersInLeaderGroup = useMemo(
    () => data.members.filter((m) => m.groupId === lg),
    [data.members, lg]
  );

  const membersInAsstGroup = useMemo(
    () => data.members.filter((m) => m.groupId === ag),
    [data.members, ag]
  );

  const currentLeader = useMemo(() => {
    const g = data.growthGroups.find((x) => x.id === lg);
    if (!g?.leaderId) return null;
    return getLeaderById(g.leaderId);
  }, [data.growthGroups, lg, getLeaderById]);

  if (!hydrated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-slate-500 text-sm">
        Loading workspace…
      </div>
    );
  }

  const submitLeader = (e: React.FormEvent) => {
    e.preventDefault();
    setLeaderMsg(null);
    setLeaderErr(null);
    if (leaderSource === "member") {
      if (!leaderMemberId) return;
      setGroupLeader(lg, { memberId: leaderMemberId });
      setLeaderMsg(
        "Cell leader updated. They are now shown under Leaders for this cell."
      );
    } else {
      if (
        leaderName.trim().length < 2 ||
        !leaderEmail.includes("@") ||
        leaderPhone.trim().length < 3
      ) {
        setLeaderErr("Please fill name, email, and phone for the new leader.");
        return;
      }
      setGroupLeader(lg, {
        name: leaderName.trim(),
        email: leaderEmail.trim(),
        phone: leaderPhone.trim(),
        bio: leaderBio.trim() || undefined,
      });
      setLeaderMsg("Cell leader appointed.");
    }
    setTimeout(() => setLeaderMsg(null), 5000);
  };

  const submitAssistant = (e: React.FormEvent) => {
    e.preventDefault();
    setAsstMsg(null);
    setAsstErr(null);
    if (asstSource === "member") {
      if (!asstMemberId) return;
      addAssistantToGroup(ag, {
        memberId: asstMemberId,
        roleNote: asstNote.trim() || undefined,
      });
      setAsstMsg("Assistant added to this cell.");
    } else {
      if (
        asstName.trim().length < 2 ||
        !asstEmail.includes("@") ||
        asstPhone.trim().length < 3
      ) {
        setAsstErr("Please fill name, email, and phone for the new assistant.");
        return;
      }
      addAssistantToGroup(ag, {
        name: asstName.trim(),
        email: asstEmail.trim(),
        phone: asstPhone.trim(),
        roleNote: asstNote.trim() || undefined,
      });
      setAsstMsg("Assistant added.");
    }
    setTimeout(() => setAsstMsg(null), 5000);
  };

  return (
    <div className="space-y-8 pb-10">
      <AdminPageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Team & roles" },
        ]}
        title="Team & roles"
        description="Appoint or replace a cell leader and add assistants. Promoting someone from the roster removes them from the member list for that cell (they still appear under Leaders / Assistants)."
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="border-slate-200" asChild>
              <Link href="/admin/leaders">Leaders</Link>
            </Button>
            <Button variant="outline" className="border-slate-200" asChild>
              <Link href="/admin/assistants">Assistants</Link>
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2 max-w-6xl">
        <Card className="border-slate-200/80 shadow-sm">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2 text-brand-700">
              <Crown className="h-5 w-5" />
              <CardTitle className="text-lg">Cell leader</CardTitle>
            </div>
            <CardDescription>
              Replaces the leader for the selected cell. Previous leader records
              stay in history on the Leaders page until you clean them up in a
              future database-backed version.
            </CardDescription>
            {currentLeader ? (
              <p className="text-xs text-slate-600 pt-1">
                Current:{" "}
                <span className="font-semibold text-slate-800">
                  {currentLeader.name}
                </span>
              </p>
            ) : null}
          </CardHeader>
          <CardContent>
            {leaderErr ? (
              <p
                role="alert"
                className="mb-4 text-sm text-red-800 bg-red-50 border border-red-100 rounded-lg px-3 py-2"
              >
                {leaderErr}
              </p>
            ) : null}
            {leaderMsg ? (
              <p className="mb-4 text-sm text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
                {leaderMsg}
              </p>
            ) : null}
            <form onSubmit={submitLeader} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-800">
                  Growth group
                </label>
                <select
                  value={lg}
                  onChange={(e) => {
                    setLeaderGroupId(e.target.value);
                    setLeaderMemberId("");
                  }}
                  className={inputCls}
                >
                  {data.growthGroups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>

              <fieldset className="space-y-2">
                <legend className="text-sm font-semibold text-slate-800 mb-2">
                  Appoint from
                </legend>
                <div className="flex flex-wrap gap-4 text-sm">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="leader-src"
                      checked={leaderSource === "member"}
                      onChange={() => setLeaderSource("member")}
                      className="text-brand-600"
                    />
                    Existing member
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="leader-src"
                      checked={leaderSource === "new"}
                      onChange={() => setLeaderSource("new")}
                      className="text-brand-600"
                    />
                    New person (not on roster)
                  </label>
                </div>
              </fieldset>

              {leaderSource === "member" ? (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-800">
                    Member in this cell
                  </label>
                  <select
                    value={leaderMemberId}
                    onChange={(e) => setLeaderMemberId(e.target.value)}
                    className={inputCls}
                    required={leaderSource === "member"}
                  >
                    <option value="">Choose member…</option>
                    {membersInLeaderGroup.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                  {membersInLeaderGroup.length === 0 ? (
                    <p className="text-xs text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                      No members in this cell. Add a member first, or appoint a new
                      person.
                    </p>
                  ) : null}
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-semibold text-slate-800">
                      Name
                    </label>
                    <input
                      value={leaderName}
                      onChange={(e) => setLeaderName(e.target.value)}
                      className={inputCls}
                      placeholder="Full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-800">
                      Email
                    </label>
                    <input
                      type="email"
                      value={leaderEmail}
                      onChange={(e) => setLeaderEmail(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-800">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={leaderPhone}
                      onChange={(e) => setLeaderPhone(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-semibold text-slate-800">
                      Bio (optional)
                    </label>
                    <textarea
                      value={leaderBio}
                      onChange={(e) => setLeaderBio(e.target.value)}
                      className={inputCls + " min-h-[88px] resize-y"}
                      placeholder="Short note for the directory"
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="bg-brand-600 hover:bg-brand-700 text-white"
              >
                Save cell leader
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 shadow-sm">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2 text-brand-700">
              <UserCog className="h-5 w-5" />
              <CardTitle className="text-lg">Assistant</CardTitle>
            </div>
            <CardDescription>
              Add an assistant to the cell team. You can promote from the roster
              or add someone who is not listed as a member yet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {asstErr ? (
              <p
                role="alert"
                className="mb-4 text-sm text-red-800 bg-red-50 border border-red-100 rounded-lg px-3 py-2"
              >
                {asstErr}
              </p>
            ) : null}
            {asstMsg ? (
              <p className="mb-4 text-sm text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
                {asstMsg}
              </p>
            ) : null}
            <form onSubmit={submitAssistant} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-800">
                  Growth group
                </label>
                <select
                  value={ag}
                  onChange={(e) => {
                    setAsstGroupId(e.target.value);
                    setAsstMemberId("");
                  }}
                  className={inputCls}
                >
                  {data.growthGroups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>

              <fieldset className="space-y-2">
                <legend className="text-sm font-semibold text-slate-800 mb-2">
                  Add as
                </legend>
                <div className="flex flex-wrap gap-4 text-sm">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="asst-src"
                      checked={asstSource === "member"}
                      onChange={() => setAsstSource("member")}
                      className="text-brand-600"
                    />
                    Existing member
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="asst-src"
                      checked={asstSource === "new"}
                      onChange={() => setAsstSource("new")}
                      className="text-brand-600"
                    />
                    New person
                  </label>
                </div>
              </fieldset>

              {asstSource === "member" ? (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-800">
                    Member in this cell
                  </label>
                  <select
                    value={asstMemberId}
                    onChange={(e) => setAsstMemberId(e.target.value)}
                    className={inputCls}
                    required={asstSource === "member"}
                  >
                    <option value="">Choose member…</option>
                    {membersInAsstGroup.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-semibold text-slate-800">
                      Name
                    </label>
                    <input
                      value={asstName}
                      onChange={(e) => setAsstName(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-800">
                      Email
                    </label>
                    <input
                      type="email"
                      value={asstEmail}
                      onChange={(e) => setAsstEmail(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-800">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={asstPhone}
                      onChange={(e) => setAsstPhone(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-800">
                  Role note (optional)
                </label>
                <input
                  value={asstNote}
                  onChange={(e) => setAsstNote(e.target.value)}
                  className={inputCls}
                  placeholder="e.g. Worship coordinator"
                />
              </div>

              <Button
                type="submit"
                className="bg-brand-600 hover:bg-brand-700 text-white"
              >
                Add assistant
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200/80 shadow-sm max-w-2xl bg-slate-50/50">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-slate-700">
            <Shield className="h-5 w-5" />
            <CardTitle className="text-base">Workspace maintenance</CardTitle>
          </div>
          <CardDescription>
            Restore the built-in sample church dataset if you want a clean demo
            again.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            variant="outline"
            className="border-slate-300 text-slate-700"
            onClick={() => {
              if (
                typeof window !== "undefined" &&
                window.confirm(
                  "Reset all dashboard data in this browser to the sample dataset?"
                )
              ) {
                resetToSampleData();
              }
            }}
          >
            Reset to sample data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
