import { NextResponse } from "next/server";
import { requireAdminSupabase } from "@/src/lib/api/admin-auth";

export async function GET(request: Request) {
  const auth = await requireAdminSupabase(request);
  if (!auth.ok) return auth.response;

  const { supabase } = auth;

  const [
    blogPosts,
    events,
    groups,
    weeklyReports,
    comments,
    pendingReports,
  ] = await Promise.all([
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("groups").select("*", { count: "exact", head: true }),
    supabase.from("weekly_reports").select("*", { count: "exact", head: true }),
    supabase.from("comments").select("*", { count: "exact", head: true }),
    supabase
      .from("weekly_reports")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
  ]);

  return NextResponse.json({
    blogPosts: blogPosts.count ?? 0,
    events: events.count ?? 0,
    groups: groups.count ?? 0,
    weeklyReports: weeklyReports.count ?? 0,
    comments: comments.count ?? 0,
    pendingReports: pendingReports.count ?? 0,
  });
}
