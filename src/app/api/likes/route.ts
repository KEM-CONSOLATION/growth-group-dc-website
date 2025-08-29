import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";
const token = process.env.SANITY_API_TOKEN;

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

export async function POST(request: Request) {
  if (!projectId || !token) {
    return NextResponse.json(
      { error: "Server not configured for writes" },
      { status: 500 }
    );
  }

  try {
    const { postId, sessionId } = await request.json();
    if (!postId)
      return NextResponse.json({ error: "Missing postId" }, { status: 400 });

    const doc = {
      _type: "like",
      post: { _type: "reference", _ref: postId },
      sessionId: sessionId || null,
      createdAt: new Date().toISOString(),
    };
    const created = await writeClient.create(doc);
    return NextResponse.json({ ok: true, id: created._id });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
