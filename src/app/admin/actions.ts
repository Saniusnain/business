"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  checkPassword,
  createSession,
  destroySession,
  requireAdmin,
} from "@/lib/admin-auth";
import { getSql } from "@/lib/db";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/orders";

export async function login(_prev: string | null, formData: FormData) {
  const password = formData.get("password");
  if (typeof password !== "string" || !checkPassword(password)) {
    // ponytail: fixed delay only slows guessing; add per-IP rate limiting
    // (e.g. a login_attempts table) if the admin URL gets targeted.
    await new Promise((r) => setTimeout(r, 800));
    return "Incorrect password.";
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

export async function updateStatus(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  const status = formData.get("status");
  if (typeof id !== "string" || !ORDER_STATUSES.includes(status as OrderStatus))
    return;
  await getSql()`update orders set status = ${status} where id = ${id}`;
  revalidatePath("/admin");
}
