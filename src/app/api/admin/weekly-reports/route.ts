import { NextResponse } from "next/server";
import { requireAdminSupabase } from "@/src/lib/api/admin-auth";

export async function GET(request: Request) {
  const auth = await requireAdminSupabase(request);
  if (!auth.ok) return auth.response;

  const { data, error } = await auth.supabase
    .from("weekly_reports")
    .select("id, group_name, week_of, status, submitted_at")
    .order("submitted_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ reports: data ?? [] });
}
