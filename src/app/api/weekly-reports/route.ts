import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/src/lib/supabase";
import { cloudinary } from "@/src/lib/cloudinary";

type PhotoPayload = { name: string; type: string; data: string };

async function uploadBase64Photo(
  photo: PhotoPayload,
  folder: string
): Promise<{ url: string; bytes: number } | null> {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    console.error("Cloudinary env not configured");
    return null;
  }

  try {
    const res = await cloudinary.uploader.upload(photo.data, {
      folder: `growth-group/${folder}`,
      resource_type: "image",
      use_filename: true,
      filename_override: photo.name.replace(/[^a-zA-Z0-9._-]/g, "_"),
    });
    return { url: res.secure_url, bytes: res.bytes ?? 0 };
  } catch (e) {
    console.error("Cloudinary upload failed:", e);
    return null;
  }
}

export async function POST(request: Request) {
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
      groupPhotos,
      activityPhotos,
    } = body || {};

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

    if (!Array.isArray(activities) || activities.length === 0) {
      return NextResponse.json(
        { error: "Activities must be a non-empty array" },
        { status: 400 }
      );
    }

    const admin = createServiceRoleClient();

    const { data: report, error: insertError } = await admin
      .from("weekly_reports")
      .insert({
        group_name: groupName,
        group_leader: groupLeader,
        leader_email: leaderEmail,
        state,
        city,
        week_of: weekOf,
        total_members: attendance.totalMembers,
        present_this_week: attendance.presentThisWeek,
        new_visitors: attendance.newVisitors ?? 0,
        activities: activities.filter(
          (a: string) => typeof a === "string" && a.trim() !== ""
        ),
        topics_discussed: topicsDiscussed,
        prayer_requests: prayerRequests || null,
        testimonies: testimonies || null,
        challenges: challenges || null,
        next_week_plans: nextWeekPlans || null,
        additional_notes: additionalNotes || null,
        status: "pending",
      })
      .select("id")
      .single();

    if (insertError || !report) {
      return NextResponse.json(
        { error: insertError?.message ?? "Failed to create report" },
        { status: 500 }
      );
    }

    const reportId = report.id as string;
    const photoRows: {
      weekly_report_id: string;
      photo_type: string;
      file_name: string;
      file_url: string;
      file_size: number | null;
    }[] = [];

    const gp = (groupPhotos || []) as PhotoPayload[];
    const ap = (activityPhotos || []) as PhotoPayload[];

    for (const p of gp) {
      const up = await uploadBase64Photo(p, "weekly-reports/group");
      if (up) {
        photoRows.push({
          weekly_report_id: reportId,
          photo_type: "group",
          file_name: p.name,
          file_url: up.url,
          file_size: up.bytes,
        });
      }
    }

    for (const p of ap) {
      const up = await uploadBase64Photo(p, "weekly-reports/activity");
      if (up) {
        photoRows.push({
          weekly_report_id: reportId,
          photo_type: "activity",
          file_name: p.name,
          file_url: up.url,
          file_size: up.bytes,
        });
      }
    }

    if (photoRows.length > 0) {
      const { error: photosError } = await admin
        .from("weekly_report_photos")
        .insert(photoRows);
      if (photosError) {
        console.error("weekly_report_photos insert:", photosError);
      }
    }

    return NextResponse.json({ ok: true, id: reportId });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
