"use server";

import { revalidatePath } from "next/cache";
import { createBuddyRequest } from "@/lib/data";
import { getCurrentUserId } from "@/lib/session";

export async function sendInvite(receiverId: string) {
  const senderId = await getCurrentUserId();
  createBuddyRequest(senderId, receiverId);
  revalidatePath(`/buddies/${receiverId}`);
  revalidatePath("/invitations");
}
