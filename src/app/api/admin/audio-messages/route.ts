import { NextResponse } from "next/server";
import { requireAdminSupabase } from "@/src/lib/api/admin-auth";

export async function GET(request: Request) {
  const auth = await requireAdminSupabase(request);
  if (!auth.ok) return auth.response;

  const { data, error } = await auth.supabase
    .from("audio_messages")
    .select("id, title, slug, category, published_at, audio_url")
    .order("published_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ audioMessages: data ?? [] });
}
