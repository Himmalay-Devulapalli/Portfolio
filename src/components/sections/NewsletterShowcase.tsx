"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { newsletter } from "@/lib/data";

const fadeMask: React.CSSProperties = {
  maskImage:
    "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
};

// One infinitely-scrolling vertical column (cards duplicated for a seamless loop).
function Column({
  children,
  direction,
  duration,
  reduce,
}: {
  children: ReactNode;
  direction: "up" | "down";
  duration: number;
  reduce: boolean | null;
}) {
  const y = direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"];
  return (
    <div className="relative flex-1 overflow-hidden" style={fadeMask}>
      <motion.div
        className="flex flex-col gap-4 [transform:translateZ(0)] [will-change:transform] [backface-visibility:hidden]"
        animate={reduce ? undefined : { y }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {!reduce && <div aria-hidden className="flex flex-col gap-4">{children}</div>}
      </motion.div>
    </div>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-bg p-4 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-navy/20 hover:shadow-lift">
      {children}
    </div>
  );
}

export default function NewsletterShowcase() {
  const reduce = useReducedMotion();

  const impactCards = (
    <>
      {newsletter.impact.map((s) => (
        <Card key={s.label}>
          <p className="font-display text-2xl font-bold tracking-tight text-ink">
            {s.value}
          </p>
          <p className="mt-0.5 text-xs leading-snug text-ink-soft">{s.label}</p>
        </Card>
      ))}
    </>
  );

  const editionCards = (
    <>
      {newsletter.editions.map((e) => (
        <Card key={e.n}>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-semibold tracking-wider text-navy">
              EDITION {e.n}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-ink-muted">
              {newsletter.cadence}
            </span>
          </div>
          <p className="mt-2 line-clamp-3 text-sm font-semibold leading-snug text-ink">
            {e.title}
          </p>
        </Card>
      ))}
    </>
  );

  return (
    <div className="relative flex h-full gap-4">
      {/* Published editions — scrolls down */}
      <Column direction="down" duration={32} reduce={reduce}>
        {editionCards}
      </Column>
      {/* Impact & growth — scrolls up */}
      <Column direction="up" duration={26} reduce={reduce}>
        {impactCards}
      </Column>
    </div>
  );
}
