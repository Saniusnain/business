"use client";

import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF } from "@/lib/site";

const EXPLORE = [
  { href: "/#problem", label: "The Problem" },
  { href: "/#why", label: "Why CraveLab" },
  { href: "/#solution", label: "Our Solution" },
  { href: "/#process", label: "How We Build It" },
  { href: "/#recognition", label: "Recognition" },
  { href: "/shop", label: "Shop" },
];

const COMPANY = [
  { href: "/#contact", label: "Contact" },
  { href: "/#contact", label: "Press kit" },
  { href: "/#contact", label: "Careers" },
];

const linkClasses = "text-sm text-celadon transition-colors hover:text-mint";

export default function Footer() {
  return (
    <footer className="bg-ink px-6 pb-10 pt-[72px] md:px-8">
      <div className="mx-auto max-w-[1160px]">
        <div className="grid gap-12 border-b border-hedge pb-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-[18px] flex items-center gap-[11px]">
              <Image
                src="/logo.png"
                alt="CraveLab logo"
                width={42}
                height={42}
                className="rounded-full"
              />
              <span className="font-script text-[24px] leading-none text-cream">
                CraveLab
              </span>
            </div>
            <p className="max-w-[340px] text-sm leading-[1.65] text-fern">
              CraveLab is a harm reduction and edible innovation company,
              developing science-backed alternatives for harmful non-food
              cravings — including conditions such as pica.
            </p>
          </div>
          <nav aria-label="Explore">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-fern">
              Explore
            </div>
            <div className="flex flex-col gap-[11px]">
              {EXPLORE.map((link) => (
                <Link key={link.label} href={link.href} className={linkClasses}>
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
          <nav aria-label="Company">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-fern">
              Company
            </div>
            <div className="flex flex-col gap-[11px]">
              {COMPANY.map((link) => (
                <Link key={link.label} href={link.href} className={linkClasses}>
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
          <nav aria-label="Connect">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-fern">
              Connect
            </div>
            <div className="flex flex-col gap-[11px]">
              <a href={`mailto:${CONTACT_EMAIL}`} className={linkClasses}>
                {CONTACT_EMAIL}
              </a>
              <a href={CONTACT_PHONE_HREF} className={linkClasses}>
                {CONTACT_PHONE}
              </a>
              <a
                href="https://www.linkedin.com/company/cravelab-pakistan/"
                className={linkClasses}
              >
                LinkedIn
              </a>
              <Link href="/#contact" className={linkClasses}>
                Instagram
              </Link>
            </div>
          </nav>
        </div>
        <div className="flex flex-wrap justify-between gap-4 pt-[26px]">
          <span className="text-[13px] text-fern">
            © {new Date().getFullYear()} CraveLab. All rights reserved.
          </span>
          <span className="text-[13px] text-fern">
            Reimagining harm reduction through edible innovation.
          </span>
        </div>
      </div>
    </footer>
  );
}
