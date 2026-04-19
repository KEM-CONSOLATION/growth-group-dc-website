import { NextResponse } from "next/server";
import { requireAdminSupabase } from "@/src/lib/api/admin-auth";

export async function GET(request: Request) {
  const auth = await requireAdminSupabase(request);
  if (!auth.ok) return auth.response;

  const { data, error } = await auth.supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ posts: data ?? [] });
}

type CreateBody = {
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

export async function POST(request: Request) {
  const auth = await requireAdminSupabase(request);
  if (!auth.ok) return auth.response;

  let body: CreateBody;
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

  const { data: created, error: insertError } = await auth.supabase
    .from("blog_posts")
    .insert({
      title,
      slug,
      excerpt: excerpt ?? null,
      body: postBody ?? null,
      main_image_url: main_image_url ?? null,
      author_id: author_id ?? null,
      published_at: published_at ?? null,
      featured,
    })
    .select("id")
    .single();

  if (insertError || !created) {
    return NextResponse.json(
      { error: insertError?.message ?? "Insert failed" },
      { status: 500 }
    );
  }

  const id = created.id as string;

  if (category_ids.length) {
    await auth.supabase.from("blog_post_categories").insert(
      category_ids.map((category_id) => ({
        blog_post_id: id,
        category_id,
      }))
    );
  }

  if (tags.length) {
    const cleanTags = tags.map((t) => String(t).trim()).filter(Boolean);
    if (cleanTags.length) {
      await auth.supabase.from("blog_post_tags").insert(
        cleanTags.map((tag) => ({ blog_post_id: id, tag }))
      );
    }
  }

  return NextResponse.json({ id });
}
