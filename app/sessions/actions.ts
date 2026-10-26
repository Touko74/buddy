"use server";

import { revalidatePath } from "next/cache";
import { createSession, getUser } from "@/lib/data";
import { getCurrentUserId } from "@/lib/session";

export async function planSession(formData: FormData) {
  const creatorId = await getCurrentUserId();
  const buddyId = formData.get("buddyId") as string;
  const date = formData.get("date") as string;
  const startTime = formData.get("startTime") as string;
  const duration = Number(formData.get("duration"));
  const type = formData.get("type") as string;

  const creator = getUser(creatorId)!;

  createSession({ creatorId, buddyId, clubId: creator.clubId, date, startTime, duration, type });
  revalidatePath("/sessions");
  revalidatePath("/dashboard");
}
