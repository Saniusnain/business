"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/site";

export default function Navbar() {
  const [elevated, setElevated] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] border-b backdrop-blur-[14px] transition-[background-color,border-color,box-shadow] duration-300 ${
        elevated
          ? "border-parchment/90 bg-cream/90 shadow-soft"
          : "border-transparent bg-cream/70"
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-6 py-3.5 md:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-[11px]">
          <Image
            src="/logo.png"
            alt="CraveLab logo"
            width={42}
            height={42}
            priority
            className="rounded-full"
          />
          <span className="font-script text-[24px] leading-none text-ink">
            CraveLab
          </span>
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-[30px] lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-body transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden shrink-0 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-med lg:inline-block"
        >
          Get in touch
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-parchment/70 bg-cream/95 px-6 pb-6 pt-3 backdrop-blur-[14px] lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-body transition-colors hover:bg-moss hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold text-white shadow-soft"
            >
              Get in touch
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
