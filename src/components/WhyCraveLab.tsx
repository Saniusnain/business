"use client";

import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";

export default function WhyCraveLab() {
  return (
    <section
      id="why"
      className="relative overflow-hidden bg-ink px-6 py-[120px] md:px-8"
    >
      <div className="pointer-events-none absolute -right-20 -top-[100px] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(95,174,109,0.28),rgba(95,174,109,0)_70%)] blur-[20px] [animation:floatB_22s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -bottom-[120px] -left-[60px] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(191,232,198,0.16),rgba(191,232,198,0)_70%)] blur-[20px] [animation:floatC_18s_ease-in-out_infinite]" />

      <div className="relative z-[2] mx-auto grid max-w-[1160px] items-start gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow light>Why CraveLab</Eyebrow>
          <Reveal
            as="h2"
            delay={60}
            className="font-display text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.14] tracking-[-0.015em] text-cream [text-wrap:balance]"
          >
            The philosophy behind CraveLab.
          </Reveal>
        </div>
        <div className="flex flex-col gap-7">
          <Reveal as="p" className="text-[19px] leading-[1.62] text-celadon">
            Some health challenges remain overlooked — not because they
            don&apos;t matter, but because they don&apos;t fit neatly into
            existing solutions.
          </Reveal>
          <Reveal
            as="p"
            delay={90}
            className="text-[19px] leading-[1.62] text-celadon"
          >
            Conventional guidance tends to stop at restriction — telling people
            what to avoid, without offering something safer to reach for
            instead. We believe innovation should reach the places that
            approach leaves behind.
          </Reveal>
          <Reveal
            as="p"
            delay={180}
            className="text-[19px] leading-[1.62] text-celadon"
          >
            CraveLab exists because we don&apos;t think harmful cravings should
            simply be accepted as inevitable.{" "}
            <span className="font-medium text-mint">
              We think food science can offer something better.
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
