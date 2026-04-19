"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Lock, Mail, LayoutDashboard, Users, Shield } from "lucide-react";
import { signIn } from "@/src/lib/dashboard-session";
import { AdminBrandLogo } from "@/src/components/admin/admin-ui";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const session = signIn(email, password);
    if (!session) {
      setError(
        "Use a valid email address and a password of at least 4 characters."
      );
      setLoading(false);
      return;
    }

    const next = searchParams.get("redirect") || "/admin";
    router.replace(next);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      <div className="relative lg:w-[46%] xl:w-[48%] flex flex-col justify-between px-8 py-10 sm:px-12 sm:py-12 text-white overflow-hidden min-h-[220px] lg:min-h-screen">
        <div
          className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-600 to-brand-800"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.22) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 45%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-3">
            <AdminBrandLogo size="lg" className="shadow-lg" />
            <div>
              <p className="font-bold text-lg tracking-tight text-white">Growth Groups</p>
              <p className="text-xs text-white/80 font-semibold uppercase tracking-widest">
                Leadership workspace
              </p>
            </div>
          </div>
          <div className="hidden lg:block space-y-6 max-w-md">
            <h1 className="text-3xl xl:text-4xl font-bold leading-tight tracking-tight">
              Run your cells with clarity—like a modern home-cell command center.
            </h1>
            <ul className="space-y-4 text-sm text-white/85">
              <li className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/10">
                  <LayoutDashboard className="h-4 w-4" />
                </span>
                <span>
                  <span className="font-semibold text-white">Unified dashboard</span>{" "}
                  for metrics, meetings, and roster movement in one glance.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/10">
                  <Users className="h-4 w-4" />
                </span>
                <span>
                  <span className="font-semibold text-white">People-first views</span>{" "}
                  for leaders, assistants, and members—mapped to each cell.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/10">
                  <Shield className="h-4 w-4" />
                </span>
                <span>
                  <span className="font-semibold text-white">Ready for Supabase</span>{" "}
                  when you replace the preview session with real authentication.
                </span>
              </li>
            </ul>
          </div>
        </div>
        <p className="relative z-10 hidden lg:block text-xs text-white/50">
          Dominion City Church · Growth Group operations
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-slate-50">
        <Card className="w-full max-w-[420px] shadow-xl border-slate-200/80 rounded-2xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-brand-600 to-brand-800" />
          <CardHeader className="text-center space-y-2 pt-8 pb-2">
            <CardTitle className="text-2xl font-bold text-slate-900">
              Sign in
            </CardTitle>
            <CardDescription className="text-slate-600 text-base">
              Access your leadership dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8 pt-2 px-6 sm:px-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error ? (
                <div
                  role="alert"
                  className="p-3 text-sm rounded-xl bg-red-50 text-red-800 border border-red-100"
                >
                  {error}
                </div>
              ) : null}

              <div className="space-y-2">
                <label htmlFor="admin-email" className="text-sm font-semibold text-slate-800">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                    placeholder="you@church.org"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="admin-password" className="text-sm font-semibold text-slate-800">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    id="admin-password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full py-6 text-base font-semibold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-lg shadow-brand-900/10"
                disabled={loading}
              >
                {loading ? "Signing in…" : "Continue to dashboard"}
              </Button>

              <p className="text-xs text-center text-slate-500 leading-relaxed">
                Preview: sign-in is stored in your browser only. Use any email with @
                and a password of 4+ characters. Replace with Supabase Auth when your
                backend is live.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-brand-600">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-white/40 border-t-white" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
