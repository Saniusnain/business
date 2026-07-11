"use client";

import Reveal from "@/components/Reveal";

export default function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  const color = light ? "bg-mint" : "bg-leaf";
  const text = light ? "text-mint" : "text-leaf";
  return (
    <Reveal className="mb-[22px] inline-flex items-center gap-2.5">
      <span className={`h-[1.5px] w-7 ${color}`} />
      <span
        className={`text-[13px] font-semibold uppercase tracking-[0.14em] ${text}`}
      >
        {children}
      </span>
    </Reveal>
  );
}
