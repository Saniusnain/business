import Image from "next/image";
import { redirect } from "next/navigation";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import LoginForm from "@/app/admin/login/LoginForm";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-[400px] rounded-3xl border border-sand bg-white p-8 shadow-high">
        <div className="mb-6 flex items-center gap-[11px]">
          <Image
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-script text-[24px] leading-none text-ink">
            CraveLab
          </span>
          <span className="ml-auto rounded-full bg-moss px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-ink">
            Admin
          </span>
        </div>
        <h1 className="mb-1.5 font-display text-[22px] font-black text-ink">
          Sign in
        </h1>
        <p className="mb-6 text-[14px] text-body">
          Enter the admin password to manage orders.
        </p>
        {adminConfigured() ? (
          <LoginForm />
        ) : (
          <p className="rounded-xl bg-moss p-4 text-[14px] text-clay">
            Admin access isn&apos;t configured. Set an{" "}
            <code className="font-semibold">ADMIN_PASSWORD</code> (8+
            characters) in the environment.
          </p>
        )}
      </div>
    </main>
  );
}
