"use server";

import { revalidatePath } from "next/cache";
import { updateBuddyRequestStatus } from "@/lib/data";

export async function respondToInvite(requestId: string, status: "accepted" | "declined") {
  updateBuddyRequestStatus(requestId, status);
  revalidatePath("/invitations");
  revalidatePath("/dashboard");
}
