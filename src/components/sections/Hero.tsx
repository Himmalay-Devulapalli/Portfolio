"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import HeroStatement from "./HeroStatement";
import HeroNewsletter from "./HeroNewsletter";
import HeroPitch from "./HeroPitch";

const ease = [0.23, 1, 0.32, 1] as const;
const AUTOPLAY = 7000; // ms per slide

const slides = [
  { id: "intro", label: "Intro", render: () => <HeroStatement /> },
  { id: "newsletter", label: "Newsletter", render: () => <HeroNewsletter /> },
  { id: "open-to-work", label: "Open to work", render: () => <HeroPitch /> },
];
const n = slides.length;
const wrap = (i: number) => ((i % n) + n) % n;

const gridStyle: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, rgba(15,27,45,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,27,45,0.09) 1px, transparent 1px)",
  backgroundSize: "48px 48px",
  maskImage: "linear-gradient(to bottom, black 0%, black 30%, transparent 85%)",
  WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 30%, transparent 85%)",
};

function Arrow({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      aria-label={dir === "left" ? "Previous slide" : "Next slide"}
      onClick={onClick}
      className={`absolute top-1/2 z-40 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg/80 text-ink shadow-lift backdrop-blur transition-colors hover:border-navy hover:text-navy sm:flex ${
        dir === "left" ? "left-3 lg:left-5" : "right-3 lg:right-5"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d={dir === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
      </svg>
    </button>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const touchX = useRef<number | null>(null);

  // Pause auto-advance while hovering any content slide (so it can be read/acted on).
  const paused = hovering && index !== 0;

  const paginate = useCallback((d: number) => setIndex((i) => wrap(i + d)), []);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => paginate(1), AUTOPLAY);
    return () => clearTimeout(t);
  }, [index, reduce, paused, paginate]);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-bg"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) paginate(dx < 0 ? 1 : -1);
      }}
    >
      {/* Faint transparent grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0" style={gridStyle} />

      {/* Autoplay progress bar */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[3px] bg-border/40">
          <div
            key={index}
            onAnimationEnd={() => paginate(1)}
            style={{
              animation: `carousel-progress ${AUTOPLAY}ms linear forwards`,
              animationPlayState: paused ? "paused" : "running",
            }}
            className="h-full w-full origin-left bg-navy"
          />
        </div>
      )}

      {/* Slide indicator (top-center) */}
      <div className="absolute left-1/2 top-6 z-30 flex -translate-x-1/2 items-center gap-2.5">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIndex(i)}
            aria-label={`Go to ${s.label} slide`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-navy" : "w-2 bg-border hover:bg-ink-muted"
            }`}
          />
        ))}
      </div>

      {/* Big side arrows */}
      <Arrow dir="left" onClick={() => paginate(-1)} />
      <Arrow dir="right" onClick={() => paginate(1)} />

      {/* Sliding track */}
      <motion.div
        className="relative z-10 flex"
        animate={{ x: `-${index * 100}%` }}
        transition={reduce ? { duration: 0 } : { duration: 0.7, ease }}
      >
        {slides.map((s) => (
          <div
            key={s.id}
            className="flex h-dvh w-full shrink-0 flex-col justify-end overflow-hidden px-6 pb-8 pt-20 sm:px-14 sm:pb-10 lg:px-20"
          >
            {s.render()}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
