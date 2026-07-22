"use client";

import { motion, useReducedMotion } from "framer-motion";
import { newsletter } from "@/lib/data";
import NewsletterShowcase from "./NewsletterShowcase";

const ease = [0.23, 1, 0.32, 1] as const;

function LinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

// Entrance helper — replays each time the slide mounts.
function In({
  children,
  delay = 0,
  reduce,
}: {
  children: React.ReactNode;
  delay?: number;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function HeroNewsletter() {
  const reduce = useReducedMotion();
  const words = newsletter.name.split(" ");

  return (
    // Mobile: a top-packed flex column (flex-1 fills the slide so the parent's
    // bottom-anchoring doesn't apply here) — cards, then a fixed gap, then text.
    // Desktop (lg+): unchanged — original grid, text left / showcase right.
    <div className="flex flex-1 flex-col gap-8 lg:flex-none lg:grid lg:w-full lg:items-end lg:gap-10 lg:grid-cols-[1fr_0.82fr]">
      {/* Editions + growth — mobile: stacked above the text; desktop: right column */}
      <div className="h-56 sm:h-72 lg:order-2 lg:h-[calc(100dvh-9rem)]">
        <NewsletterShowcase />
      </div>

      {/* Left — copy + CTA */}
      <div className="flex max-w-2xl flex-col lg:order-1">
        <In reduce={reduce}>
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-navy">
            {newsletter.platform} · {newsletter.cadence}
          </p>
        </In>

        <div className="overflow-hidden">
          <motion.h2
            initial={reduce ? { opacity: 0 } : { y: "110%" }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="font-display font-bold leading-[1.03] tracking-[-0.03em] text-ink"
            style={{ fontSize: "clamp(2.2rem, 6.2vw, 4.75rem)" }}
          >
            {words.map((w, i) => (
              <span key={w} className={i === words.length - 1 ? "text-navy" : ""}>
                {w}
                {i === words.length - 1 ? "." : " "}
              </span>
            ))}
          </motion.h2>
        </div>

        <In delay={0.24} reduce={reduce}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {newsletter.description}
          </p>
        </In>

        <In delay={0.32} reduce={reduce}>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <motion.a
              href={newsletter.url}
              target="_blank"
              rel="noreferrer noopener"
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.12, ease }}
              className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-navy px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-hover"
            >
              <LinkedIn />
              Subscribe on LinkedIn
            </motion.a>
            <p className="text-sm text-ink-soft">
              <span className="font-semibold text-ink">{newsletter.subscribers}</span>{" "}
              subscribers · Published {newsletter.cadence.toLowerCase()}
            </p>
          </div>
        </In>
      </div>
    </div>
  );
}
