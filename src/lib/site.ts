export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://business-zeta-blush.vercel.app/";

export const SITE_NAME = "CraveLab";

export const SITE_TAGLINE = "Turning harmful cravings into safer choices";

export const SITE_DESCRIPTION =
  "CraveLab develops science-backed edible alternatives that turn harmful cravings into safer, more thoughtful choices — through food science, nutrition, and research.";

export const CONTACT_EMAIL = "teamcravelab@gmail.com";

export const CONTACT_PHONE = "+92 344 4151556";

export const CONTACT_PHONE_HREF = "tel:+923444151556";

export const CONTACT_WHATSAPP = "923444151556";

export const NAV_LINKS = [
  { href: "/#problem", label: "The Problem" },
  { href: "/#why", label: "Why CraveLab" },
  { href: "/#solution", label: "Our Solution" },
  { href: "/#process", label: "How We Build It" },
  { href: "/#recognition", label: "Recognition" },
  { href: "/shop", label: "Shop" },
  { href: "/#contact", label: "Contact" },
] as const;
