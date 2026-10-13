"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";
import { FieldError, inputClasses, labelClasses } from "@/components/form";
import { primaryBtn } from "@/components/shop/ui";

export default function LoginForm() {
  const [error, action, pending] = useActionState(login, null);

  return (
    <form action={action} className="flex flex-col gap-5">
      <div>
        <label htmlFor="admin-password" className={labelClasses}>
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          aria-invalid={!!error || undefined}
          className={inputClasses}
        />
        <div aria-live="polite">
          {error && <FieldError>{error}</FieldError>}
        </div>
      </div>
      <button
        type="submit"
        disabled={pending}
        className={`${primaryBtn} w-full`}
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
