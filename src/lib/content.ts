import { createClient } from "@supabase/supabase-js";

function getPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  );
}

export type BlogCategory = {
  id: string;
  title: string;
  slug: string;
  color: string | null;
};

export type BlogPostCard = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  publishedAt: string;
  author: {
    name: string;
    image: string | null;
    role: string | null;
  };
  mainImage: string | null;
  categories: BlogCategory[];
  tags: string[];
  featured: boolean;
};

export type BlogPostDetail = BlogPostCard & {
  body: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  author: BlogPostCard["author"] & { bio: string | null };
};

export type BlogComment = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

function mapCategories(
  rows:
    | { category: BlogCategory | null }[]
    | null
    | undefined
): BlogCategory[] {
  if (!rows?.length) return [];
  return rows
    .map((r) => r.category)
    .filter((c): c is BlogCategory => Boolean(c));
}

function mapTags(
  rows: { tag: string }[] | null | undefined
): string[] {
  if (!rows?.length) return [];
  return rows.map((r) => r.tag);
}

export async function fetchBlogList(params: {
  q?: string;
  categorySlug?: string;
}): Promise<{ posts: BlogPostCard[]; categories: BlogCategory[] }> {
  const supabase = getPublicClient();
  const now = new Date().toISOString();

  const [{ data: catRows }, { data: postRows }] = await Promise.all([
    supabase.from("categories").select("id, title, slug, color").order("title"),
    supabase
      .from("blog_posts")
      .select(
        `
        id,
        title,
        slug,
        excerpt,
        published_at,
        featured,
        main_image_url,
        author:authors ( name, image_url, role ),
        blog_post_categories ( category:categories ( id, title, slug, color ) ),
        blog_post_tags ( tag )
      `
      )
      .not("published_at", "is", null)
      .lte("published_at", now)
      .order("published_at", { ascending: false }),
  ]);

  const categories = (catRows ?? []) as BlogCategory[];

  let posts: BlogPostCard[] = (postRows ?? []).map((row: Record<string, unknown>) => {
    const author = row.author as
      | { name: string; image_url: string | null; role: string | null }
      | null;
    return {
      id: row.id as string,
      title: row.title as string,
      slug: row.slug as string,
      excerpt: (row.excerpt as string | null) ?? null,
      publishedAt: row.published_at as string,
      featured: Boolean(row.featured),
      mainImage: (row.main_image_url as string | null) ?? null,
      author: {
        name: author?.name ?? "Author",
        image: author?.image_url ?? null,
        role: author?.role ?? null,
      },
      categories: mapCategories(
        row.blog_post_categories as { category: BlogCategory | null }[]
      ),
      tags: mapTags(row.blog_post_tags as { tag: string }[]),
    };
  });

  if (params.categorySlug) {
    posts = posts.filter((p) =>
      p.categories.some((c) => c.slug === params.categorySlug)
    );
  }

  if (params.q?.trim()) {
    const q = params.q.trim().toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.excerpt ?? "").toLowerCase().includes(q)
    );
  }

  return { posts, categories };
}

export async function fetchBlogPostBySlug(
  slug: string
): Promise<BlogPostDetail | null> {
  const supabase = getPublicClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("blog_posts")
    .select(
      `
      id,
      title,
      slug,
      excerpt,
      body,
      published_at,
      featured,
      main_image_url,
      seo_title,
      seo_description,
      author:authors ( name, image_url, role, bio ),
      blog_post_categories ( category:categories ( id, title, slug, color ) ),
      blog_post_tags ( tag )
    `
    )
    .eq("slug", slug)
    .not("published_at", "is", null)
    .lte("published_at", now)
    .maybeSingle();

  if (error || !data) return null;

  const row = data as Record<string, unknown>;
  const author = row.author as {
    name: string;
    image_url: string | null;
    role: string | null;
    bio: string | null;
  } | null;

  return {
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    excerpt: (row.excerpt as string | null) ?? null,
    body: (row.body as string | null) ?? null,
    publishedAt: row.published_at as string,
    featured: Boolean(row.featured),
    mainImage: (row.main_image_url as string | null) ?? null,
    seoTitle: (row.seo_title as string | null) ?? null,
    seoDescription: (row.seo_description as string | null) ?? null,
    author: {
      name: author?.name ?? "Author",
      image: author?.image_url ?? null,
      role: author?.role ?? null,
      bio: author?.bio ?? null,
    },
    categories: mapCategories(
      row.blog_post_categories as { category: BlogCategory | null }[]
    ),
    tags: mapTags(row.blog_post_tags as { tag: string }[]),
  };
}

export async function fetchApprovedComments(
  blogPostId: string
): Promise<BlogComment[]> {
  const supabase = getPublicClient();
  const { data } = await supabase
    .from("comments")
    .select("id, name, message, created_at")
    .eq("blog_post_id", blogPostId)
    .eq("approved", true)
    .order("created_at", { ascending: false });

  return (data ?? []).map((c) => ({
    id: c.id,
    name: c.name,
    message: c.message,
    createdAt: c.created_at,
  }));
}

export async function fetchLikesCount(blogPostId: string): Promise<number> {
  const supabase = getPublicClient();
  const { count } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("blog_post_id", blogPostId);
  return count ?? 0;
}

export type EventRow = {
  id: string;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string | null;
  location: string | null;
  category: string | null;
  image: string | null;
  maxAttendees: number | null;
  currentAttendees: number | null;
  isRegistrationRequired: boolean;
  registrationLink: string | null;
  organizer: string | null;
  contactInfo?: { phone?: string; email?: string; whatsapp?: string };
  tags: string[] | null;
};

function parseContactJson(
  raw: string | null
): EventRow["contactInfo"] | undefined {
  if (!raw?.trim()) return undefined;
  try {
    const o = JSON.parse(raw) as EventRow["contactInfo"];
    if (o && typeof o === "object") return o;
  } catch {
    /* ignore */
  }
  return undefined;
}

function mapEvent(row: Record<string, unknown>): EventRow {
  return {
    id: row.id as string,
    title: row.title as string,
    description: (row.description as string | null) ?? null,
    startDate: row.start_date as string,
    endDate: (row.end_date as string | null) ?? null,
    location: (row.location as string | null) ?? null,
    category: (row.category as string | null) ?? null,
    image: (row.image_url as string | null) ?? null,
    maxAttendees: (row.max_attendees as number | null) ?? null,
    currentAttendees: (row.current_attendees as number | null) ?? null,
    isRegistrationRequired: Boolean(row.is_registration_required),
    registrationLink: (row.registration_link as string | null) ?? null,
    organizer: (row.organizer as string | null) ?? null,
    contactInfo: parseContactJson(row.contact_info as string | null),
    tags: (row.tags as string[] | null) ?? null,
  };
}

export async function fetchEventsSplit(): Promise<{
  upcoming: EventRow[];
  past: EventRow[];
}> {
  const supabase = getPublicClient();
  const now = new Date().toISOString();

  const [upRes, pastRes] = await Promise.all([
    supabase
      .from("events")
      .select("*")
      .gt("start_date", now)
      .order("start_date", { ascending: true }),
    supabase
      .from("events")
      .select("*")
      .lte("start_date", now)
      .order("start_date", { ascending: false }),
  ]);

  const upcoming = (upRes.data ?? []).map((r) =>
    mapEvent(r as Record<string, unknown>)
  );
  const past = (pastRes.data ?? []).map((r) =>
    mapEvent(r as Record<string, unknown>)
  );
  return { upcoming, past };
}

export type DepartmentRow = {
  id: string;
  name: string;
  state: string;
  branch: string | null;
  description: string | null;
  leader: string | null;
  leaderDetails?: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
  activities: string[];
  membersCount: number;
  maxMembers: number | null;
  image: string | null;
  meetingTime: string | null;
  meetingDay: string | null;
  isOpen: boolean;
  tags: string[] | null;
};

function parseLeaderDetails(
  raw: string | null
): DepartmentRow["leaderDetails"] | undefined {
  if (!raw?.trim()) return undefined;
  try {
    const o = JSON.parse(raw) as Record<string, unknown>;
    return {
      phone: typeof o.phone === "string" ? o.phone : undefined,
      email: typeof o.email === "string" ? o.email : undefined,
      whatsapp: typeof o.whatsapp === "string" ? o.whatsapp : undefined,
    };
  } catch {
    return undefined;
  }
}

function formatMeetingTime(t: string | null): string | null {
  if (!t) return null;
  return t.slice(0, 5);
}

export async function fetchDepartments(): Promise<DepartmentRow[]> {
  const supabase = getPublicClient();
  const { data } = await supabase
    .from("departments")
    .select("*")
    .order("name");

  return (data ?? []).map((row) => {
    const r = row as Record<string, unknown>;
    return {
      id: r.id as string,
      name: r.name as string,
      state: (r.state as string) ?? "",
      branch: (r.branch as string | null) ?? null,
      description: (r.description as string | null) ?? null,
      leader: (r.leader as string | null) ?? null,
      leaderDetails: parseLeaderDetails(r.leader_details as string | null),
      activities: (r.activities as string[] | null) ?? [],
      membersCount: (r.members_count as number) ?? 0,
      maxMembers: (r.max_members as number | null) ?? null,
      image: (r.image_url as string | null) ?? null,
      meetingTime: formatMeetingTime(r.meeting_time as string | null),
      meetingDay: (r.meeting_day as string | null) ?? null,
      isOpen: Boolean(r.is_open),
      tags: (r.tags as string[] | null) ?? null,
    };
  });
}

export type AudioMessageRow = {
  id: string;
  title: string;
  speaker: string | null;
  date: string | null;
  description: string | null;
  audioUrl: string;
  durationSeconds: number | null;
  category: string | null;
};

export async function fetchAudioMessages(): Promise<AudioMessageRow[]> {
  const supabase = getPublicClient();
  const now = new Date().toISOString();
  const { data } = await supabase
    .from("audio_messages")
    .select("*")
    .not("published_at", "is", null)
    .lte("published_at", now)
    .order("published_at", { ascending: false });

  return (data ?? []).map((row) => {
    const r = row as Record<string, unknown>;
    return {
      id: r.id as string,
      title: r.title as string,
      speaker: (r.speaker as string | null) ?? null,
      date: (r.published_at as string | null) ?? null,
      description: (r.description as string | null) ?? null,
      audioUrl: r.audio_url as string,
      durationSeconds: (r.duration as number | null) ?? null,
      category: (r.category as string | null) ?? null,
    };
  });
}

export async function fetchAudioCategories(): Promise<string[]> {
  const rows = await fetchAudioMessages();
  return [...new Set(rows.map((r) => r.category).filter(Boolean) as string[])].sort();
}
