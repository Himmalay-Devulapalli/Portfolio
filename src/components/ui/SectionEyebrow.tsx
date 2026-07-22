"use client";

import { motion } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

type Props = {
  label: string;
  index?: string;
  /** "light" for use on dark/navy backgrounds */
  tone?: "dark" | "light";
};

// Section marker: mono index + pulsing dot + label + a rule that draws in on scroll.
export default function SectionEyebrow({ label, index, tone = "dark" }: Props) {
  const light = tone === "light";
  return (
    <div className="flex items-center gap-3">
      {index && (
        <span className={`font-mono text-xs font-medium ${light ? "text-white/50" : "text-navy/60"}`}>
          {index}
        </span>
      )}
      <span
        className={`flex items-center gap-2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em] ${
          light ? "text-white/80" : "text-navy"
        }`}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-50 ${
              light ? "bg-white" : "bg-navy"
            }`}
          />
          <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${light ? "bg-white" : "bg-navy"}`} />
        </span>
        {label}
      </span>
      <span className={`relative h-px min-w-12 flex-1 overflow-hidden rounded-full ${light ? "bg-white/20" : "bg-border"}`}>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className={`absolute inset-0 origin-left bg-gradient-to-r to-transparent ${
            light ? "from-white/70 via-white/30" : "from-navy via-navy/40"
          }`}
        />
      </span>
    </div>
  );
}
