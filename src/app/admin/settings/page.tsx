"use client";

import { AdminPageHeader } from "@/src/components/admin/admin-ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { useDashboard } from "@/src/context/DashboardDataContext";
import { RotateCcw, Database, Bell, Shield, Palette } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const { resetToSampleData } = useDashboard();
  const [resetDone, setResetDone] = useState(false);

  function handleReset() {
    if (confirm("Reset all dashboard data to sample data? This cannot be undone.")) {
      resetToSampleData();
      setResetDone(true);
      setTimeout(() => setResetDone(false), 3000);
    }
  }

  return (
    <div className="space-y-8 pb-10">
      <AdminPageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Settings" },
        ]}
        title="Settings"
        description="Manage dashboard preferences, data, and configuration for your growth group admin console."
      />

      {/* Data management */}
      <Card className="border-slate-200/80 shadow-sm rounded-2xl">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Database className="h-4 w-4 text-brand-600" />
            Data management
          </CardTitle>
          <CardDescription>
            Dashboard data is stored in your local browser. Connect Supabase to persist across devices.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
            <div>
              <p className="font-semibold text-slate-900 text-sm">Reset to sample data</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Clears all locally saved records and restores the built-in demo dataset.
              </p>
            </div>
            <Button
              variant="outline"
              className="border-red-200 text-red-700 hover:bg-red-50 shrink-0"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {resetDone ? "Reset done!" : "Reset data"}
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
            <div>
              <p className="font-semibold text-slate-900 text-sm">Supabase connection</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Add your Supabase URL and ANON_KEY in <code className="bg-slate-100 px-1 rounded text-xs">.env.local</code> to enable live data.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 inline-block" />
              Not connected
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-slate-200/80 shadow-sm rounded-2xl">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Bell className="h-4 w-4 text-brand-600" />
            Notifications
          </CardTitle>
          <CardDescription>Configure reminder and alert preferences (coming soon).</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-8 text-center">
            <Bell className="h-6 w-6 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-500">
              Email & push notification settings will be available once Supabase is connected.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Roles & Permissions */}
      <Card className="border-slate-200/80 shadow-sm rounded-2xl">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Shield className="h-4 w-4 text-brand-600" />
            Roles & permissions
          </CardTitle>
          <CardDescription>Manage admin access levels per leader or zone coordinator.</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {[
              { role: "Super Admin", desc: "Full access to all data, settings, and reports.", badge: "bg-brand-100 text-brand-800" },
              { role: "Zone Leader", desc: "Can manage their assigned growth group and submit reports.", badge: "bg-emerald-100 text-emerald-800" },
              { role: "Read Only", desc: "Can view dashboards but not modify any records.", badge: "bg-slate-100 text-slate-700" },
            ].map(({ role, desc, badge }) => (
              <div key={role} className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{role}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${badge}`}>{role}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="border-slate-200/80 shadow-sm rounded-2xl">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Palette className="h-4 w-4 text-brand-600" />
            Appearance
          </CardTitle>
          <CardDescription>Dashboard theme customisation (coming soon).</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex gap-3">
            {["Brand Blue", "Forest Green", "Midnight Violet"].map((c, i) => {
              const colors = ["bg-brand-600", "bg-emerald-600", "bg-violet-600"];
              return (
                <button
                  key={c}
                  className={`group flex flex-col items-center gap-2 opacity-60 cursor-not-allowed`}
                  disabled
                  title="Coming soon"
                >
                  <span className={`h-10 w-10 rounded-full ${colors[i]} border-2 border-white shadow-md ring-2 ring-transparent group-focus:ring-brand-400`} />
                  <span className="text-xs text-slate-500">{c}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
