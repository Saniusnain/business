"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

const SWAPS = [
  {
    name: "Chalk",
    raw: "#e7e3d8",
    altTitle: "Chalk-inspired alternative",
    altDesc: "Calcium-enriched, food-grade, and visually familiar to the craving.",
    cravDesc: "One of the most commonly craved non-food substances.",
  },
  {
    name: "Sand",
    raw: "#e9d8b8",
    altTitle: "Sand-inspired alternative",
    altDesc: "Safe to consume, engineered around the sensation — not the substance.",
    cravDesc: "A gritty non-food craving that many people never talk about.",
  },
] as const;

const SPECKLE =
  "radial-gradient(circle at 28% 30%,rgba(0,0,0,0.07) 2.5px,transparent 3px)," +
  "radial-gradient(circle at 66% 40%,rgba(0,0,0,0.06) 2px,transparent 3px)," +
  "radial-gradient(circle at 44% 68%,rgba(0,0,0,0.05) 2.5px,transparent 3px)," +
  "radial-gradient(circle at 76% 74%,rgba(0,0,0,0.05) 2px,transparent 3px),";

const TAGS = ["Safe to consume", "Nutrient-enriched", "Visually familiar"];

export default function CravingSwap() {
  const [swapIdx, setSwapIdx] = useState(0);
  const [isAlt, setIsAlt] = useState(false);
  const cycleRef = useRef<number | undefined>(undefined);

  const startCycle = useCallback(() => {
    window.clearInterval(cycleRef.current);
    cycleRef.current = window.setInterval(() => {
      setIsAlt((alt) => {
        if (!alt) return true;
        setSwapIdx((i) => (i + 1) % SWAPS.length);
        return false;
      });
    }, 2600);
  }, []);

  const pick = (i: number) => {
    setSwapIdx(i);
    setIsAlt(false);
    startCycle();
  };

  useEffect(() => {
    startCycle();
    return () => window.clearInterval(cycleRef.current);
  }, [startCycle]);

  const swap = SWAPS[swapIdx];

  const circleStyle: CSSProperties = {
    background: isAlt
      ? "linear-gradient(135deg,#7fc98d 0%,#4a9358 100%)"
      : SPECKLE + swap.raw,
    boxShadow: isAlt
      ? "0 18px 40px rgba(95,174,109,0.42)"
      : "inset 0 -10px 20px rgba(0,0,0,0.08), 0 10px 22px rgba(0,0,0,0.07)",
    transform: isAlt ? "scale(1.07)" : "scale(1)",
  };

  return (
    <div className="relative rounded-[28px] border border-sand bg-white px-[26px] pb-[30px] pt-[26px] shadow-[0_24px_60px_rgba(51,64,46,0.14)]">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-leaf [animation:bob_2s_ease-in-out_infinite]" />
          <span className="text-[11.5px] font-semibold uppercase tracking-[0.1em] text-stone">
            Craving → Safer choice
          </span>
        </div>
        <div className="flex gap-1 rounded-full bg-[#F1F0EA] p-1">
          {SWAPS.map((s, i) => (
            <button
              key={s.name}
              type="button"
              onClick={() => pick(i)}
              aria-pressed={swapIdx === i}
              className={`cursor-pointer rounded-full px-[17px] py-[7px] text-[13px] font-semibold transition-[background-color,color,box-shadow] duration-200 ${
                swapIdx === i
                  ? "bg-white text-ink shadow-[0_2px_6px_rgba(0,0,0,0.08)]"
                  : "bg-transparent text-body"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mb-5 flex h-[210px] items-center justify-center">
        <div className="absolute h-[196px] w-[196px] rounded-full border-[1.5px] border-dashed border-leaf/30 [animation:spinSlow_26s_linear_infinite]" />
        <div className="absolute h-[168px] w-[168px] rounded-full bg-[radial-gradient(circle,rgba(95,174,109,0.1),rgba(95,174,109,0)_70%)] [animation:ringPulse_3.4s_ease-in-out_infinite]" />
        <div
          style={circleStyle}
          className="relative flex h-[168px] w-[168px] items-center justify-center rounded-full transition-[background,box-shadow,transform] duration-[800ms] ease-[cubic-bezier(.4,0,.2,1)]"
        >
          {isAlt ? (
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12.5l4 4 10-10"
                stroke="#fff"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <span className="font-display text-[19px] font-semibold tracking-[0.02em] text-[#8a8578]">
              {swap.name}
            </span>
          )}
        </div>
      </div>

      <div className="min-h-24 text-center" aria-live="polite">
        <div className="mb-[7px] text-[11.5px] font-semibold uppercase tracking-[0.1em] text-leaf">
          {isAlt ? "The CraveLab answer" : "The craving"}
        </div>
        <div className="mb-2 font-display text-xl font-semibold text-ink">
          {isAlt ? swap.altTitle : swap.name}
        </div>
        <div className="mx-auto max-w-[330px] text-sm leading-[1.55] text-body">
          {isAlt ? swap.altDesc : swap.cravDesc}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2 border-t border-[#F1F0EA] pt-[18px]">
        {TAGS.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-moss px-3 py-[5px] text-xs text-body"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
