"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE } from "@/lib/session";

export async function selectUser(formData: FormData) {
  const userId = formData.get("userId") as string;
  const store = await cookies();
  store.set(SESSION_COOKIE, userId, { path: "/", maxAge: 60 * 60 * 24 * 30 });
  redirect("/dashboard");
}
