"use client";

import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";

export default function Innovations() {
  return (
    <section className="relative overflow-hidden bg-moss px-6 py-[110px] md:px-8">
      <div className="pointer-events-none absolute -bottom-[120px] -right-20 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(81,111,75,0.16),rgba(81,111,75,0)_70%)] blur-[20px] [animation:floatC_20s_ease-in-out_infinite]" />
      <div className="relative z-[2] mx-auto max-w-[1160px]">
        <Eyebrow>First Innovations</Eyebrow>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal
              as="h2"
              delay={60}
              className="mb-[22px] font-display text-[clamp(28px,3.6vw,44px)] font-black leading-[1.12] text-ink [text-wrap:balance]"
            >
              Fortified alternatives, not novelty items.
            </Reveal>
            <Reveal
              as="p"
              delay={120}
              className="mb-8 text-[17px] leading-[1.66] text-body"
            >
              Our first edible innovations are fortified alternatives inspired
              by two of the most commonly craved non-food substances — chalk
              and sand. Each is designed for individuals experiencing harmful
              cravings for non-food substances, including conditions such as
              pica: safe to consume, nutrient-enriched, and visually familiar
              to the craving itself.
            </Reveal>
            <Reveal
              as="a"
              delay={180}
              href="/shop"
              className="inline-flex items-center gap-[9px] rounded-xl bg-ink px-7 py-3.5 text-[15px] font-semibold text-white shadow-soft transition-[transform,box-shadow] duration-200 hover:-translate-y-[3px] hover:shadow-med"
            >
              Order now <span className="text-[17px]">→</span>
            </Reveal>
          </div>
          <div className="flex flex-col gap-[18px]">
            <Reveal
              delay={80}
              className="flex items-center gap-5 rounded-lg border border-parchment bg-white p-7 shadow-soft transition-transform duration-300 hover:translate-x-1.5"
            >
              <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl border border-parchment bg-gradient-to-br from-cream to-parchment font-display text-2xl font-bold text-ink">
                C
              </div>
              <div>
                <div className="mb-1 font-display text-lg font-black text-ink">
                  Chalk-inspired alternative
                </div>
                <div className="text-sm leading-[1.55] text-body">
                  Nutrient-enriched, food-grade, visually familiar to the
                  craving.
                </div>
              </div>
            </Reveal>
            <Reveal
              delay={180}
              className="flex items-center gap-5 rounded-lg border border-parchment bg-white p-7 shadow-soft transition-transform duration-300 hover:translate-x-1.5"
            >
              <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl border border-sage bg-gradient-to-br from-moss to-sage font-display text-2xl font-bold text-ink">
                S
              </div>
              <div>
                <div className="mb-1 font-display text-lg font-black text-ink">
                  Sand-inspired alternative
                </div>
                <div className="text-sm leading-[1.55] text-body">
                  Safe to consume, engineered around the sensation, not the
                  substance.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
