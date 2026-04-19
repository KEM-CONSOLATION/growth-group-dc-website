import { NextResponse } from "next/server";
import { requireAdminSupabase } from "@/src/lib/api/admin-auth";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminSupabase(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;

  const { data: post, error } = await auth.supabase
    .from("blog_posts")
    .select(
      `
      *,
      blog_post_categories ( category_id ),
      blog_post_tags ( tag )
    `
    )
    .eq("id", id)
    .single();

  if (error || !post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ post });
}

type PatchBody = {
  title: string;
  slug: string;
  excerpt?: string | null;
  body?: string | null;
  main_image_url?: string | null;
  author_id?: string | null;
  published_at?: string | null;
  featured?: boolean;
  category_ids?: string[];
  tags?: string[];
};

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminSupabase(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;

  let body: PatchBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    category_ids = [],
    tags = [],
    title,
    slug,
    excerpt,
    body: postBody,
    main_image_url,
    author_id,
    published_at,
    featured = false,
  } = body;

  if (!title?.trim() || !slug?.trim()) {
    return NextResponse.json(
      { error: "title and slug are required" },
      { status: 400 }
    );
  }

  const { error: updateError } = await auth.supabase
    .from("blog_posts")
    .update({
      title,
      slug,
      excerpt: excerpt ?? null,
      body: postBody ?? null,
      main_image_url: main_image_url ?? null,
      author_id: author_id ?? null,
      published_at: published_at ?? null,
      featured,
    })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  await auth.supabase
    .from("blog_post_categories")
    .delete()
    .eq("blog_post_id", id);
  await auth.supabase.from("blog_post_tags").delete().eq("blog_post_id", id);

  if (category_ids.length) {
    await auth.supabase.from("blog_post_categories").insert(
      category_ids.map((category_id) => ({
        blog_post_id: id,
        category_id,
      }))
    );
  }

  const cleanTags = tags.map((t) => String(t).trim()).filter(Boolean);
  if (cleanTags.length) {
    await auth.supabase.from("blog_post_tags").insert(
      cleanTags.map((tag) => ({ blog_post_id: id, tag }))
    );
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminSupabase(request);
  if (!auth.ok) return auth.response;
  const { id } = await context.params;

  const { error } = await auth.supabase.from("blog_posts").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
