"use client";

import { useState, type FormEvent } from "react";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
} from "@/lib/site";

const AUDIENCES = [
  "Healthcare professionals & researchers",
  "Investors & incubators",
  "Individuals & families",
  "Press & media",
];

const ROLES = [
  { value: "healthcare", label: "Healthcare professional / researcher" },
  { value: "investor", label: "Investor / incubator" },
  { value: "individual", label: "Individual / family" },
  { value: "press", label: "Press / media" },
  { value: "collaborator", label: "Potential collaborator" },
  { value: "curious", label: "Just curious" },
];

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Errors = Partial<Record<"name" | "email" | "role" | "message", boolean>>;

const inputClasses =
  "w-full rounded-xl border border-parchment bg-cream px-[15px] py-[13px] text-[15px] text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-stone focus:border-leaf focus:shadow-[0_0_0_3px_rgba(95,174,109,0.15)]";

function FieldError({ children }: { children: React.ReactNode }) {
  return <div className="mt-1.5 text-[12.5px] text-clay">{children}</div>;
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({ name: "", email: "", role: "", message: "" });

  const set = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!form.name.trim()) next.name = true;
    if (!EMAIL_RE.test(form.email.trim())) next.email = true;
    if (!form.role) next.role = true;
    if (!form.message.trim()) next.message = true;
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden px-6 py-[120px] md:px-8"
    >
      <div className="pointer-events-none absolute -right-[100px] top-[60px] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(168,200,161,0.28),rgba(168,200,161,0)_70%)] blur-[22px] [animation:floatC_20s_ease-in-out_infinite]" />
      <div className="relative z-[2] mx-auto grid max-w-[1160px] items-start gap-16 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Eyebrow>Get in Touch</Eyebrow>
          <Reveal
            as="h2"
            delay={60}
            className="mb-5 font-display text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.12] tracking-[-0.015em] text-ink"
          >
            Let&apos;s talk.
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className="mb-[34px] text-[17px] leading-[1.64] text-body"
          >
            Whether you&apos;re a researcher, a healthcare professional, a
            potential collaborator, or simply curious about what we&apos;re
            building — we&apos;d like to hear from you.
          </Reveal>

          <Reveal delay={160} className="mb-9 flex flex-wrap gap-2.5">
            {AUDIENCES.map((audience) => (
              <span
                key={audience}
                className="rounded-full border border-[#dbe7d6] bg-moss px-[15px] py-2 text-[13px] font-medium text-forest"
              >
                {audience}
              </span>
            ))}
          </Reveal>

          <Reveal delay={200} className="flex flex-col gap-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3.5 text-ink transition-colors hover:text-leaf"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf/[0.12]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="#5FAE6D" strokeWidth="1.8" />
                  <path d="M4 7l8 6 8-6" stroke="#5FAE6D" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <span>
                <span className="block text-xs font-medium text-stone">Email</span>
                <span className="text-[15px] font-semibold">{CONTACT_EMAIL}</span>
              </span>
            </a>
            <div className="flex items-center gap-3.5 text-ink">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf/[0.12]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 4h3l1.5 4.5-2 1.5a12 12 0 006 6l1.5-2 4.5 1.5V19a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"
                    stroke="#5FAE6D"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>
                <span className="block text-xs font-medium text-stone">Phone</span>
                <span className="text-[15px] font-semibold">
                  {CONTACT_PHONE} — Aiman Hamdani, Founder
                </span>
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={100}
          className="rounded-3xl border border-sand bg-white p-6 shadow-[0_12px_40px_rgba(122,92,71,0.1)] sm:p-9"
        >
          {submitted ? (
            <div className="px-3 py-10 text-center">
              <div className="mx-auto mb-[22px] flex h-16 w-16 items-center justify-center rounded-full bg-leaf/[0.14] [animation:bob_2.6s_ease-in-out_infinite]">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12.5l4 4 10-10"
                    stroke="#5FAE6D"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="mb-2.5 font-display text-[22px] font-semibold text-ink">
                Thank you for reaching out.
              </h3>
              <p className="mx-auto max-w-[340px] text-[15px] leading-relaxed text-body">
                We&apos;ve received your message and will get back to you soon.
                We read every note personally.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-[7px] block text-[13px] font-semibold text-ink"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={set("name")}
                  aria-invalid={errors.name || undefined}
                  className={inputClasses}
                />
                {errors.name && <FieldError>Please enter your name.</FieldError>}
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-[7px] block text-[13px] font-semibold text-ink"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set("email")}
                  aria-invalid={errors.email || undefined}
                  className={inputClasses}
                />
                {errors.email && (
                  <FieldError>Please enter a valid email address.</FieldError>
                )}
              </div>
              <div>
                <label
                  htmlFor="contact-role"
                  className="mb-[7px] block text-[13px] font-semibold text-ink"
                >
                  I am a...
                </label>
                <select
                  id="contact-role"
                  value={form.role}
                  onChange={set("role")}
                  aria-invalid={errors.role || undefined}
                  className={`${inputClasses} cursor-pointer appearance-none`}
                >
                  <option value="">Select one</option>
                  {ROLES.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
                {errors.role && <FieldError>Please select an option.</FieldError>}
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-[7px] block text-[13px] font-semibold text-ink"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Tell us a little about why you're reaching out."
                  value={form.message}
                  onChange={set("message")}
                  aria-invalid={errors.message || undefined}
                  className={`${inputClasses} resize-y`}
                />
                {errors.message && (
                  <FieldError>Please enter a short message.</FieldError>
                )}
              </div>
              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-leaf p-[15px] text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(95,174,109,0.3)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(95,174,109,0.42)]"
              >
                Send message
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
