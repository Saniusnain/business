import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "cl_admin";
const MAX_AGE = 60 * 60 * 12; // 12 hours

// The password doubles as the signing key, so changing ADMIN_PASSWORD signs
// everyone out.
const secret = () => process.env.ADMIN_PASSWORD ?? "";

const sign = (payload: string) =>
  createHmac("sha256", secret()).update(payload).digest("hex");

const sameString = (a: string, b: string) => {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
};

export const adminConfigured = () => secret().length >= 8;

export const checkPassword = (password: string) =>
  adminConfigured() && sameString(password, secret());

export async function createSession() {
  const exp = String(Date.now() + MAX_AGE * 1000);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(COOKIE)?.value ?? "";
  const [exp, sig] = value.split(".");
  return (
    !!exp && !!sig && Number(exp) > Date.now() && sameString(sig, sign(exp))
  );
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
