"use client";

import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";

const CARDS = [
  {
    delay: 0,
    iconBg: "bg-leaf/[0.12]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="#5FAE6D" strokeWidth="1.8" />
        <path d="M16 16l4 4" stroke="#5FAE6D" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Limited awareness",
    desc: "Many people experiencing harmful cravings for non-food substances — including conditions such as pica — go unrecognized, often for years.",
  },
  {
    delay: 120,
    iconBg: "bg-amber/[0.14]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
          stroke="#E8A33D"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Few safe alternatives",
    desc: "Conventional guidance tends to focus on restriction rather than offering a genuine, satisfying substitute.",
  },
  {
    delay: 240,
    iconBg: "bg-sage/[0.28]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 3v6l-4 8a3 3 0 002.7 4.3h8.6A3 3 0 0019 17l-4-8V3"
          stroke="#5FAE6D"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M8 3h8" stroke="#5FAE6D" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Under-researched territory",
    desc: "Edible innovation aimed at this category has received little dedicated food-science investment — until now.",
  },
];

export default function Problem() {
  return (
    <section
      id="problem"
      className="relative scroll-mt-20 px-6 py-[110px] md:px-8"
    >
      <div className="mx-auto max-w-[1160px]">
        <Eyebrow>The Problem</Eyebrow>
        <Reveal
          as="h2"
          delay={60}
          className="mb-[60px] max-w-[820px] font-display text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.12] tracking-[-0.015em] text-ink [text-wrap:balance]"
        >
          Harmful cravings for non-food substances are far more common than
          most conversations acknowledge.
        </Reveal>

        <div className="grid gap-[22px] md:grid-cols-3">
          {CARDS.map((card) => (
            <Reveal
              key={card.title}
              delay={card.delay}
              className="rounded-[20px] border border-sand bg-white p-8 shadow-[0_2px_10px_rgba(122,92,71,0.05)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(122,92,71,0.12)]"
            >
              <div
                className={`mb-[22px] flex h-12 w-12 items-center justify-center rounded-[14px] ${card.iconBg}`}
              >
                {card.icon}
              </div>
              <h3 className="mb-3 font-display text-xl font-semibold text-ink">
                {card.title}
              </h3>
              <p className="text-[15px] leading-[1.65] text-body">{card.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-[26px] flex items-center gap-3.5 rounded-2xl bg-moss px-[26px] py-5">
          <span className="h-2 w-2 shrink-0 rounded-full bg-sage" />
          <p className="text-sm italic leading-relaxed text-body">
            Figures and citations on prevalence will be added here as our
            research partnerships are finalized — placeholder pending verified
            sourcing.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
