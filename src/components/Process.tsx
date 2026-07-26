"use client";

import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";

const STEPS = [
  {
    num: 1,
    delay: 0,
    title: "Research",
    desc: "Understanding the craving itself before touching a formulation.",
  },
  {
    num: 2,
    delay: 90,
    title: "Food-Grade Formulation",
    desc: "Building from safe, food-grade ingredients as the foundation.",
  },
  {
    num: 3,
    delay: 180,
    title: "Nutritional Fortification",
    desc: "Adding real nutritional value, not just mimicking a texture.",
  },
  {
    num: 4,
    delay: 0,
    title: "Safety",
    desc: "Rigorous safety review at every stage of development.",
  },
  {
    num: 5,
    delay: 90,
    title: "Testing",
    desc: "Iterating with real feedback before anything is finalized.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative scroll-mt-20 px-6 py-[120px] md:px-8"
    >
      <div className="mx-auto max-w-[1160px]">
        <Eyebrow>How We Build It</Eyebrow>
        <Reveal
          as="h2"
          delay={60}
          className="mb-[60px] max-w-[720px] font-display text-[clamp(28px,3.6vw,44px)] font-black leading-[1.12] text-ink [text-wrap:balance]"
        >
          A process built for credibility, stage by stage.
        </Reveal>

        <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step) => (
            <Reveal
              key={step.num}
              delay={step.delay}
              className="relative rounded-lg border border-sand bg-white p-[30px] shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-high"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-ink font-display text-base font-bold text-white">
                {step.num}
              </div>
              <h3 className="mb-2.5 font-display text-[19px] font-black text-ink">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-body">{step.desc}</p>
            </Reveal>
          ))}

          <Reveal
            delay={180}
            className="relative rounded-lg border border-ink bg-ink p-[30px] shadow-med transition-transform duration-300 hover:-translate-y-[5px]"
          >
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.22] font-display text-base font-bold text-white">
              6
            </div>
            <h3 className="mb-2.5 font-display text-[19px] font-black text-white">
              Future Clinical Validation
            </h3>
            <p className="text-sm leading-relaxed text-white/90">
              Working toward clinical research partnerships as we scale.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
