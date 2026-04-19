import { NextResponse } from "next/server";
import { requireAdminSupabase } from "@/src/lib/api/admin-auth";

export async function GET(request: Request) {
  const auth = await requireAdminSupabase(request);
  if (!auth.ok) return auth.response;

  const { data, error } = await auth.supabase
    .from("groups")
    .select("id, name, slug, state, city")
    .order("name");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ groups: data ?? [] });
}
