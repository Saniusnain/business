"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/Reveal";
import CravingSwap from "@/components/CravingSwap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const fxRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const fx = fxRef.current;
    const card = cardRef.current;
    if (!section || !fx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mx = 0;
    let my = 0;
    let sy = 0;
    const applyFx = () => {
      fx.style.transform = `translate(${mx}px,${my + sy}px)`;
    };

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      mx = px * 30;
      my = py * 22;
      applyFx();
      if (card) {
        card.style.transform = `perspective(1000px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`;
      }
    };
    const onLeave = () => {
      mx = 0;
      my = 0;
      applyFx();
      if (card) {
        card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
      }
    };
    const onScroll = () => {
      sy = window.scrollY * 0.16;
      applyFx();
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative overflow-hidden px-6 pb-[70px] pt-[130px] md:px-8 md:pt-[150px]"
    >
      {/* Floating background orbs */}
      <div
        ref={fxRef}
        className="pointer-events-none absolute inset-0 z-[1] transition-transform duration-[350ms] ease-[cubic-bezier(.16,.84,.44,1)] will-change-transform"
      >
        <div className="absolute -left-40 -top-[140px] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(95,174,109,0.34),rgba(95,174,109,0)_68%)] blur-[20px] [animation:floatA_17s_ease-in-out_infinite]" />
        <div className="absolute -right-[220px] -top-10 h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle_at_60%_40%,rgba(168,200,161,0.42),rgba(168,200,161,0)_68%)] blur-[22px] [animation:floatB_21s_ease-in-out_infinite]" />
        <div className="absolute -bottom-[260px] left-[30%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(232,163,61,0.20),rgba(232,163,61,0)_70%)] blur-[24px] [animation:floatC_19s_ease-in-out_infinite]" />
        <div className="absolute left-[12%] top-[180px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(191,232,198,0.4),rgba(191,232,198,0)_70%)] blur-[20px] [animation:driftD_24s_ease-in-out_infinite]" />
        <div className="absolute -bottom-20 right-[8%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(95,174,109,0.24),rgba(95,174,109,0)_70%)] blur-[22px] [animation:driftC_27s_ease-in-out_infinite]" />
        <div className="absolute left-[40%] top-[130px] h-3.5 w-3.5 rounded-full bg-leaf opacity-50 [animation:floatC_14s_ease-in-out_infinite]" />
        <div className="absolute left-[6%] top-[300px] h-5 w-5 rounded-full bg-mint opacity-70 [animation:floatA_12s_ease-in-out_infinite]" />
        <div className="absolute right-[30%] top-20 h-[11px] w-[11px] rounded-full bg-amber opacity-50 [animation:driftB_16s_ease-in-out_infinite]" />
        <div className="absolute bottom-[120px] left-[26%] h-4 w-4 rounded-full bg-sage opacity-60 [animation:driftA_18s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-[2] mx-auto grid w-full max-w-[1240px] items-center gap-[52px] lg:grid-cols-[1.04fr_0.96fr]">
        {/* Left: copy */}
        <div>
          <Reveal className="mb-[26px] inline-flex items-center gap-2 rounded-full border border-leaf/[0.28] bg-leaf/10 px-4 py-[7px] text-[13px] font-medium tracking-[0.02em] text-forest">
            <span className="h-[7px] w-[7px] rounded-full bg-leaf [animation:bob_2.6s_ease-in-out_infinite]" />
            Harm Reduction · Edible Innovation
          </Reveal>
          <Reveal
            as="h1"
            delay={80}
            className="mb-6 font-display text-[clamp(38px,4.8vw,66px)] font-bold leading-[1.05] tracking-[-0.02em] text-ink [text-wrap:balance]"
          >
            Turning harmful cravings into{" "}
            <span className="relative whitespace-nowrap text-leaf">
              safer choices
              <span className="absolute inset-x-0 bottom-0.5 -z-10 h-[9px] rounded-md bg-leaf/[0.22]" />
            </span>
            .
          </Reveal>
          <Reveal
            as="p"
            delay={160}
            className="mb-[34px] max-w-[520px] text-lg leading-relaxed text-body"
          >
            CraveLab develops science-backed edible alternatives that turn
            harmful cravings into safer, more thoughtful choices — through food
            science, nutrition, and research.
          </Reveal>
          <Reveal delay={240} className="mb-10 flex flex-wrap gap-3.5">
            <a
              href="#why"
              className="rounded-xl bg-leaf px-[30px] py-[15px] text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(95,174,109,0.32)] transition-[transform,box-shadow] duration-200 hover:-translate-y-[3px] hover:shadow-[0_12px_28px_rgba(95,174,109,0.42)]"
            >
              Our story
            </a>
            <a
              href="#solution"
              className="rounded-xl border-[1.5px] border-sage bg-transparent px-[30px] py-[15px] text-[15px] font-semibold text-ink transition-[transform,border-color,background-color] duration-200 hover:-translate-y-[3px] hover:border-leaf hover:bg-leaf/[0.06]"
            >
              See the science
            </a>
          </Reveal>
          <Reveal delay={320} className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-stone">
              Recognized by
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-[15px] py-2 text-[13px] font-semibold text-ink shadow-[0_2px_8px_rgba(122,92,71,0.06)]">
              <span className="h-2 w-2 rounded-full bg-amber" />
              NSTP · Hatch 8
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-[15px] py-2 text-[13px] font-semibold text-ink shadow-[0_2px_8px_rgba(122,92,71,0.06)]">
              <span className="h-2 w-2 rounded-full bg-leaf" />
              Venture Spark Winner
            </span>
          </Reveal>
        </div>

        {/* Right: interactive craving-swap widget */}
        <Reveal delay={220} className="relative">
          <div className="pointer-events-none absolute inset-x-[-4%] inset-y-[-8%] rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(95,174,109,0.18),rgba(95,174,109,0)_64%)] blur-[8px]" />
          <div
            ref={cardRef}
            className="relative transition-transform duration-300 ease-[cubic-bezier(.16,.84,.44,1)] will-change-transform"
          >
            <CravingSwap />
          </div>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <div className="relative z-[2] mt-14 flex flex-col items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone">
          Scroll
        </span>
        <span className="h-9 w-px bg-gradient-to-b from-sage to-sage/0 [animation:bob_2.4s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}
