import { NextRequest, NextResponse } from "next/server";
import { createProfile, CreateProfileInput } from "@/lib/data";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/session";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as CreateProfileInput;

  if (!body.username || !body.clubId || body.activities.length === 0) {
    return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
  }

  const user = createProfile(body);

  const store = await cookies();
  store.set(SESSION_COOKIE, user.id, { path: "/", maxAge: 60 * 60 * 24 * 30 });

  return NextResponse.json({ user });
}
