import { NextResponse } from "next/server";
import { requireAdminSupabase } from "@/src/lib/api/admin-auth";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminSupabase(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;

  let body: { approved?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body.approved !== "boolean") {
    return NextResponse.json({ error: "approved boolean required" }, { status: 400 });
  }

  const { error } = await auth.supabase
    .from("comments")
    .update({ approved: body.approved })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
