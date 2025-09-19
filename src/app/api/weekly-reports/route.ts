import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "kgfvpijk";
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
    const {
      groupName,
      groupLeader,
      leaderEmail,
      state,
      city,
      weekOf,
      attendance,
      activities,
      topicsDiscussed,
      prayerRequests,
      testimonies,
      challenges,
      nextWeekPlans,
      additionalNotes,
    } = body || {};

    // Validate required fields
    if (
      !groupName ||
      !groupLeader ||
      !leaderEmail ||
      !state ||
      !city ||
      !weekOf ||
      !attendance ||
      !activities ||
      !topicsDiscussed
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate attendance object
    if (
      typeof attendance.totalMembers !== "number" ||
      typeof attendance.presentThisWeek !== "number" ||
      attendance.totalMembers < 0 ||
      attendance.presentThisWeek < 0
    ) {
      return NextResponse.json(
        { error: "Invalid attendance data" },
        { status: 400 }
      );
    }

    // Validate activities array
    if (!Array.isArray(activities) || activities.length === 0) {
      return NextResponse.json(
        { error: "Activities must be a non-empty array" },
        { status: 400 }
      );
    }


    const doc = {
      _type: "weeklyReport",
      groupName,
      groupLeader,
      leaderEmail,
      state,
      city,
      weekOf,
      attendance: {
        totalMembers: attendance.totalMembers,
        presentThisWeek: attendance.presentThisWeek,
        newVisitors: attendance.newVisitors || 0,
      },
      activities,
      topicsDiscussed,
      prayerRequests: prayerRequests || "",
      testimonies: testimonies || "",
      challenges: challenges || "",
      nextWeekPlans: nextWeekPlans || "",
      additionalNotes: additionalNotes || "",
      submittedAt: new Date().toISOString(),
      status: "pending",
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
