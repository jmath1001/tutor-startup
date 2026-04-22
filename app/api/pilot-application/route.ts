import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

type PilotApplicationPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  centerName?: string;
  role?: string;
  studentsPerWeek?: string;
  tutorsCount?: string;
  timeline?: string;
  biggestPain?: string;
  notes?: string;
};

type NormalizedPilotApplicationPayload = {
  fullName: string;
  email: string;
  phone: string;
  centerName: string;
  role: string;
  studentsPerWeek: string;
  tutorsCount: string;
  timeline: string;
  biggestPain: string;
  notes: string;
};

function normalize(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
}

function buildQualificationSummary(payload: NormalizedPilotApplicationPayload) {
  const display = (value: string) => value || "Not provided";

  const lines = [
    "Pilot qualification intake",
    `Name: ${display(payload.fullName)}`,
    `Email: ${display(payload.email)}`,
    `Phone: ${display(payload.phone)}`,
    `Center: ${display(payload.centerName)}`,
    `Role: ${display(payload.role)}`,
    `Students per week: ${display(payload.studentsPerWeek)}`,
    `Tutors count: ${display(payload.tutorsCount)}`,
    `Timeline: ${display(payload.timeline)}`,
    `Biggest pain: ${display(payload.biggestPain)}`,
  ];

  if (payload.notes) {
    lines.push(`Additional notes: ${payload.notes}`);
  }

  return lines.join("\n");
}

function isDuplicateEmailError(code: string | undefined, message: string | undefined) {
  if (code === "23505") {
    return true;
  }
  if (!message) {
    return false;
  }
  return message.toLowerCase().includes("duplicate key");
}

function isMissingColumnError(message: string | undefined) {
  if (!message) {
    return false;
  }
  const lower = message.toLowerCase();
  return lower.includes("column") && lower.includes("does not exist");
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServerKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseServerKey) {
    return NextResponse.json(
      { message: "missing_server_configuration" },
      { status: 500 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as PilotApplicationPayload;

  const payload: NormalizedPilotApplicationPayload = {
    fullName: normalize(body.fullName),
    email: normalize(body.email).toLowerCase(),
    phone: normalize(body.phone),
    centerName: normalize(body.centerName),
    role: normalize(body.role),
    studentsPerWeek: normalize(body.studentsPerWeek),
    tutorsCount: normalize(body.tutorsCount),
    timeline: normalize(body.timeline),
    biggestPain: normalize(body.biggestPain),
    notes: normalize(body.notes),
  };

  if (!payload.email) {
    return NextResponse.json({ message: "email_required" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(payload.email)) {
    return NextResponse.json({ message: "invalid_email" }, { status: 400 });
  }

  const supabase = createClient(supabaseUrl, supabaseServerKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const qualificationSummary = buildQualificationSummary(payload);

  const demoRequestsPrimaryInsert = await supabase.from("demo_requests").insert([
    {
      name: payload.fullName || "Pilot Applicant",
      email: payload.email,
      company: payload.centerName || "Not provided",
      notes: qualificationSummary,
    },
  ]);

  if (!demoRequestsPrimaryInsert.error) {
    return NextResponse.json({ ok: true, mode: "demo_requests_primary" });
  }

  if (isDuplicateEmailError(demoRequestsPrimaryInsert.error.code, demoRequestsPrimaryInsert.error.message)) {
    return NextResponse.json({ message: "email_already_exists" }, { status: 409 });
  }

  if (!isMissingColumnError(demoRequestsPrimaryInsert.error.message)) {
    return NextResponse.json(
      { message: "db_insert_failed", detail: demoRequestsPrimaryInsert.error.message },
      { status: 500 },
    );
  }

  const insertRow = {
    email: payload.email,
    status: "pending",
    full_name: payload.fullName,
    phone: payload.phone,
    center_name: payload.centerName,
    role: payload.role,
    students_per_week: payload.studentsPerWeek,
    tutors_count: payload.tutorsCount,
    timeline: payload.timeline,
    biggest_pain: payload.biggestPain,
    notes: payload.notes || null,
    source: "free_trial",
  };

  const fullInsert = await supabase.from("waitlist_signups").insert([insertRow]);

  if (!fullInsert.error) {
    return NextResponse.json({ ok: true, mode: "waitlist_full" });
  }

  if (isDuplicateEmailError(fullInsert.error.code, fullInsert.error.message)) {
    return NextResponse.json({ message: "email_already_exists" }, { status: 409 });
  }

  if (!isMissingColumnError(fullInsert.error.message)) {
    return NextResponse.json(
      { message: "db_insert_failed", detail: fullInsert.error.message },
      { status: 500 },
    );
  }

  const sameTablePackedInsert = await supabase.from("waitlist_signups").insert([
    {
      email: payload.email,
      status: "pending",
      notes: qualificationSummary,
    },
  ]);

  if (!sameTablePackedInsert.error) {
    return NextResponse.json({ ok: true, mode: "waitlist_notes_payload" });
  }

  if (isDuplicateEmailError(sameTablePackedInsert.error.code, sameTablePackedInsert.error.message)) {
    return NextResponse.json({ message: "email_already_exists" }, { status: 409 });
  }

  if (!isMissingColumnError(sameTablePackedInsert.error.message)) {
    return NextResponse.json(
      { message: "db_insert_failed", detail: sameTablePackedInsert.error.message },
      { status: 500 },
    );
  }

  const fallbackInsert = await supabase.from("waitlist_signups").insert([
    {
      email: payload.email,
      status: "pending",
    },
  ]);

  if (fallbackInsert.error) {
    return NextResponse.json(
      { message: "db_insert_failed", detail: fallbackInsert.error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, mode: "fallback_minimal_columns" });
}
