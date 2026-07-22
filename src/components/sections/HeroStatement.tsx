"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import MagneticButton from "@/components/ui/MagneticButton";

const ease = [0.23, 1, 0.32, 1] as const;

// Headline broken into masked lines; one navy accent word.
const lines: { t: string; accent?: boolean }[][] = [
  [{ t: "Product judgment." }],
  [{ t: "Builder hands." }],
  [{ t: "Measurable ", accent: false }, { t: "growth", accent: true }],
];

// Rotating words for the accent typewriter.
const rotating = ["growth.", "revenue.", "efficiency.", "scale."];

// Typewriter that types a word, holds, deletes, then cycles to the next.
function TypingWord({ reduce }: { reduce: boolean | null }) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const word = rotating[index];
    if (!deleting && sub === word.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (deleting && sub === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % rotating.length);
      return;
    }
    const t = setTimeout(() => setSub((s) => s + (deleting ? -1 : 1)), deleting ? 55 : 110);
    return () => clearTimeout(t);
  }, [sub, deleting, index, reduce]);

  if (reduce) return <>{rotating[0]}</>;

  return (
    <>
      {rotating[index].substring(0, sub)}
      <motion.span
        aria-hidden
        className="ml-[0.04em] inline-block h-[0.78em] w-[0.05em] translate-y-[0.08em] bg-navy"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5, 1] }}
      />
    </>
  );
}

const marquee = [
  "Prompt-to-product",
  "RAG pipelines",
  "Evals & guardrails",
  "0→1 launches",
  "Experimentation",
  "Customer discovery",
];

export default function HeroStatement() {
  const reduce = useReducedMotion();

  return (
    <>
      {/* Oversized statement */}
      <div className="pb-12 sm:pb-16 lg:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="mb-7 text-sm font-semibold uppercase tracking-[0.2em] text-navy"
        >
          AI-first Technical PM
        </motion.p>

        <h1
          className="font-display font-bold leading-[1.02] tracking-[-0.04em] text-ink"
          style={{ fontSize: "clamp(2.2rem, 6.2vw, 4.75rem)" }}
        >
          {lines.map((segs, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block pb-[0.08em]"
                initial={reduce ? { opacity: 0 } : { y: "115%" }}
                animate={reduce ? { opacity: 1 } : { y: 0 }}
                transition={{ duration: 0.75, delay: 0.2 + i * 0.12, ease }}
              >
                {segs.map((s, j) =>
                  s.accent ? (
                    <span key={j} className="relative inline-block text-navy">
                      <TypingWord reduce={reduce} />
                      <motion.span
                        aria-hidden
                        className="absolute -bottom-1 left-0 h-[0.06em] w-full origin-left bg-navy"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 1.0, ease }}
                      />
                    </span>
                  ) : (
                    <span key={j}>{s.t}</span>
                  )
                )}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>

      {/* Bottom — positioning, CTAs, kinetic marquee */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-xl text-base leading-relaxed text-ink-soft">
            {profile.tagline}
          </p>
          <div className="flex flex-wrap gap-3">
            <MagneticButton
              href="#case-studies"
              className="inline-flex items-center justify-center rounded-xl bg-navy px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-hover"
            >
              View the work &rarr;
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-ink/15 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-navy hover:text-navy"
            >
              Get in touch
            </MagneticButton>
          </div>
        </motion.div>

        {/* Capability marquee — constant linear motion */}
        <div className="mt-8 overflow-hidden border-y border-border py-3.5">
          <motion.div
            className="flex w-max"
            animate={reduce ? undefined : { x: ["0%", "-50%"] }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          >
            {[...marquee, ...marquee].map((m, i) => (
              <span
                key={i}
                className="flex shrink-0 items-center text-sm font-medium uppercase tracking-wider text-ink-soft"
              >
                {m}
                <span className="mx-6 text-navy">/</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
