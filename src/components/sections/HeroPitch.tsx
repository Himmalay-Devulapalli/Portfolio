"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile, openToWork } from "@/lib/data";
import MagneticButton from "@/components/ui/MagneticButton";

const ease = [0.23, 1, 0.32, 1] as const;

export default function HeroPitch() {
  const reduce = useReducedMotion();

  return (
    <>
      {/* Statement */}
      <div className="pb-12 sm:pb-16 lg:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-navy"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {openToWork.status}
        </motion.p>

        <div className="overflow-hidden">
          <motion.h2
            initial={reduce ? { opacity: 0 } : { y: "110%" }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="font-display font-bold leading-[1.03] tracking-[-0.03em] text-ink"
            style={{ fontSize: "clamp(2.2rem, 6.2vw, 4.75rem)" }}
          >
            Let&apos;s build your next <span className="text-navy">0&rarr;1</span>.
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease }}
          className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg"
        >
          {openToWork.blurb}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.38, ease }}
          className="mt-6 flex flex-wrap gap-2"
        >
          {openToWork.targets.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-white/60 px-3.5 py-1.5 text-xs font-medium text-ink-soft"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Proof + CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease }}
        className="flex flex-col gap-6 border-t border-border pt-6 sm:flex-row sm:items-end sm:justify-between"
      >
        <dl className="flex gap-8">
          {openToWork.proof.map((p) => (
            <div key={p.label}>
              <dt className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {p.value}
              </dt>
              <dd className="mt-1 text-xs text-ink-soft">{p.label}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap gap-3">
          <MagneticButton
            href="/resume.pdf"
            className="inline-flex items-center justify-center rounded-xl bg-navy px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-hover"
          >
            Download résumé &rarr;
          </MagneticButton>
          <MagneticButton
            href={`mailto:${profile.email}`}
            className="inline-flex items-center justify-center rounded-xl border border-ink/15 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-navy hover:text-navy"
          >
            Get in touch
          </MagneticButton>
        </div>
      </motion.div>
    </>
  );
}
