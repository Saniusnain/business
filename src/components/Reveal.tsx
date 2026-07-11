"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type ElementType,
  type ComponentPropsWithoutRef,
} from "react";

type RevealProps<T extends ElementType> = {
  as?: T;
  delay?: number;
} & ComponentPropsWithoutRef<T>;

/**
 * Fades content in with a slight upward drift the first time it scrolls into
 * view. Hiding is applied only after mount, so content stays visible without
 * JavaScript (and for crawlers).
 */
export default function Reveal<T extends ElementType = "div">({
  as,
  delay = 0,
  ...rest
}: RevealProps<T>) {
  const ref = useRef<HTMLElement | null>(null);

  const setRef = useCallback((node: HTMLElement | null) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer: number | undefined;
    let revealed = false;
    const show = () => {
      if (revealed) return;
      revealed = true;
      timer = window.setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "none";
      }, delay);
    };

    if (!("IntersectionObserver" in window)) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition =
      "opacity .7s cubic-bezier(.16,.84,.44,1), transform .7s cubic-bezier(.16,.84,.44,1)";
    el.style.willChange = "opacity, transform";

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show();
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);

    // Failsafe: never leave content hidden if the observer misfires
    const failsafe = window.setTimeout(show, 3000);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [delay]);

  const Tag = (as ?? "div") as ElementType;
  return <Tag {...rest} ref={setRef} />;
}
