"use client";

import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";

const PRINCIPLES = [
  {
    num: "01",
    delay: 0,
    title: "Start with the person, not the substance",
    desc: "We study the craving itself — its texture, sensation, and triggers — before we ever touch a formulation.",
  },
  {
    num: "02",
    delay: 100,
    title: "Safety is non-negotiable",
    desc: "Every alternative begins from food-grade, safe-to-consume ingredients. Nothing ships without that foundation.",
  },
  {
    num: "03",
    delay: 0,
    title: "Evidence over assumption",
    desc: "We partner with researchers and clinicians so our decisions are grounded in data, not intuition alone.",
  },
  {
    num: "04",
    delay: 100,
    title: "Built to scale beyond one craving",
    desc: "Our platform is designed so today's first innovation is a foundation for the next, not an endpoint.",
  },
];

export default function Solution() {
  return (
    <section
      id="solution"
      className="relative scroll-mt-20 overflow-hidden px-6 py-[120px] md:px-8"
    >
      <div className="pointer-events-none absolute -left-[100px] top-[120px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(81,111,75,0.22),rgba(81,111,75,0)_70%)] blur-[22px] [animation:floatA_20s_ease-in-out_infinite]" />
      <div className="relative z-[2] mx-auto max-w-[1160px]">
        <Eyebrow>Our Solution</Eyebrow>
        <Reveal
          as="h2"
          delay={60}
          className="mb-5 font-display text-[clamp(28px,3.6vw,44px)] font-black leading-[1.12] text-ink [text-wrap:balance]"
        >
          A new category of food innovation.
        </Reveal>
        <Reveal
          as="p"
          delay={120}
          className="mb-14 max-w-[720px] text-lg leading-[1.62] text-body"
        >
          CraveLab is building a platform for safer sensory alternatives —
          edible innovations engineered to meet a craving the way it actually
          feels, not just to stand in for it. Before we talk about specific
          products, it matters why we make them this way.
        </Reveal>

        <div className="grid gap-[22px] md:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <Reveal
              key={p.num}
              delay={p.delay}
              className="rounded-lg border border-sand bg-white p-[34px] shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-high"
            >
              <div className="mb-4 font-display text-base font-bold tracking-[0.02em] text-sage">
                {p.num}
              </div>
              <h3 className="mb-3 font-display text-[21px] font-black text-ink">
                {p.title}
              </h3>
              <p className="text-[15px] leading-[1.65] text-body">{p.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
