"use client";

import Reveal from "@/components/Reveal";
import Curve from "@/components/Curve";

const PILLARS = [
  {
    delay: 0,
    title: "Research",
    desc: "Deepening partnerships with clinicians and food scientists.",
  },
  {
    delay: 100,
    title: "Access",
    desc: "Making safer alternatives easier to find and afford.",
  },
  {
    delay: 200,
    title: "Scale",
    desc: "Extending the platform to new categories of non-food craving.",
  },
];

export default function Vision() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-[120px] md:px-8">
      <div className="pointer-events-none absolute -left-20 -top-[120px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(236,183,197,0.20),rgba(236,183,197,0)_70%)] blur-[26px] [animation:driftA_34s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -bottom-[140px] -right-[60px] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(236,183,197,0.14),rgba(236,183,197,0)_70%)] blur-[26px] [animation:driftB_40s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute right-[16%] top-[20%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(81,111,75,0.28),rgba(81,111,75,0)_70%)] blur-[24px] [animation:driftC_30s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute bottom-[10%] left-[24%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(81,111,75,0.22),rgba(81,111,75,0)_70%)] blur-[24px] [animation:driftD_37s_ease-in-out_infinite]" />

      <div className="relative z-[2] mx-auto max-w-[1000px] text-center">
        <Curve tone="pink" className="mx-auto mb-6 h-auto w-40 opacity-60" />
        <Reveal
          as="h2"
          className="mb-5 font-display text-[clamp(28px,3.8vw,46px)] font-black leading-[1.14] text-cream [text-wrap:balance]"
        >
          Our first innovations address one overlooked craving.{" "}
          <span className="text-mint">They won&apos;t be our last.</span>
        </Reveal>
        <Reveal
          as="p"
          delay={80}
          className="mx-auto mb-14 max-w-[640px] text-lg leading-[1.62] text-lichen"
        >
          CraveLab is building a platform for harm reduction through edible
          innovation — one that can grow to meet more overlooked cravings as
          our research expands.
        </Reveal>

        <div className="grid gap-5 text-left md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <Reveal
              key={pillar.title}
              delay={pillar.delay}
              className="rounded-[18px] border border-mint/[0.16] bg-white/5 p-7 backdrop-blur-[4px]"
            >
              <div className="mb-2.5 font-display text-[17px] font-black text-mint">
                {pillar.title}
              </div>
              <p className="text-sm leading-relaxed text-lichen">
                {pillar.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
