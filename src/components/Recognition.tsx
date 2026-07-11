"use client";

import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";

export default function Recognition() {
  return (
    <section
      id="recognition"
      className="relative scroll-mt-20 overflow-hidden bg-moss px-6 py-[110px] md:px-8"
    >
      <div className="relative z-[2] mx-auto max-w-[920px]">
        <Eyebrow>Recognition</Eyebrow>
        <Reveal
          as="h2"
          delay={60}
          className="mb-14 font-display text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.12] tracking-[-0.015em] text-ink [text-wrap:balance]"
        >
          Early validation, on our way to more.
        </Reveal>

        <div className="relative pl-10">
          <div className="absolute bottom-1.5 left-[11px] top-1.5 w-0.5 bg-gradient-to-b from-leaf via-sage to-parchment" />

          <Reveal className="relative mb-9">
            <div className="absolute -left-10 top-0.5 h-6 w-6 rounded-full border-4 border-moss bg-leaf shadow-[0_0_0_1px_#5FAE6D]" />
            <div className="mb-1.5 text-xs font-semibold tracking-[0.08em] text-leaf">
              2026
            </div>
            <h3 className="mb-2 font-display text-xl font-semibold text-ink">
              Agriculture &amp; Food Security · Venture Spark Winner
            </h3>
            <p className="text-[15px] leading-relaxed text-body">
              Recognized as a winning early-stage venture at Venture Spark,
              supporting our transition from concept to first prototype.
            </p>
          </Reveal>

          <Reveal delay={100} className="relative mb-9">
            <div className="absolute -left-10 top-0.5 h-6 w-6 rounded-full border-4 border-moss bg-leaf shadow-[0_0_0_1px_#5FAE6D]" />
            <div className="mb-1.5 text-xs font-semibold tracking-[0.08em] text-leaf">
              2026
            </div>
            <h3 className="mb-2 font-display text-xl font-semibold text-ink">
              Hatch 8, NSTP
            </h3>
            <p className="text-[15px] leading-relaxed text-body">
              Selected among a competitive national applicant pool through the
              National Science and Technology Plan&apos;s Hatch 8 program.{" "}
              <span className="italic text-stone">
                Exact applicant figures pending confirmation.
              </span>
            </p>
          </Reveal>

          <Reveal delay={200} className="relative">
            <div className="absolute -left-10 top-0.5 h-6 w-6 rounded-full border-4 border-moss bg-white shadow-[0_0_0_1.5px_#A8C8A1]" />
            <div className="mb-1.5 text-xs font-semibold tracking-[0.08em] text-stone">
              NEXT
            </div>
            <h3 className="mb-2 font-display text-xl font-semibold text-cocoa">
              Research partnership announcement
            </h3>
            <p className="text-[15px] italic leading-relaxed text-body">
              Placeholder for an upcoming academic or clinical research
              collaboration.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
