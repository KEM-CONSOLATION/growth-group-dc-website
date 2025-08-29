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
    const body = await request.json();
    const { postId, name, email, message } = body || {};
    if (!postId || !name || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const doc = {
      _type: "comment",
      post: { _type: "reference", _ref: postId },
      name,
      email,
      message,
      approved: false,
      createdAt: new Date().toISOString(),
    };

    const created = await writeClient.create(doc);
    return NextResponse.json({ ok: true, id: created._id });
  } catch (err: unknown) {
    // Safely narrow the error type
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
