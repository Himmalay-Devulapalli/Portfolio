"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { experience, totalExperienceMonths } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

// Staggered entrance (matches the timeline cards) + snappy hover lift.
const card = {
  hidden: { opacity: 0, y: 26 },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: d, ease },
  }),
};
const hover = { y: -4, transition: { duration: 0.2, ease } };
const reveal = {
  variants: card,
  initial: "hidden" as const,
  whileInView: "show" as const,
  viewport: { once: true, margin: "-70px" },
};

// Honest, self-derived stats (no invented figures).
const totalMonths = totalExperienceMonths();
const yrs = Math.floor(totalMonths / 12);
const mos = totalMonths % 12;
const tenure = mos ? `${yrs}.${Math.round((mos / 12) * 10)}` : `${yrs}`;
const companies = new Set(experience.map((r) => r.company)).size;

const stats = [
  { value: `${tenure}`, label: "Years", icon: "clock" },
  { value: `${experience.length}`, label: "Roles", icon: "briefcase" },
  { value: `${companies}`, label: "Companies", icon: "building" },
];

// Seniority climb, oldest → newest, plotted as a rising line.
const trajectory = [...experience].reverse();
const chartPts = trajectory.map((_, i) => {
  const x = 18 + (i * 224) / Math.max(1, trajectory.length - 1);
  const y = 96 - (i * 78) / Math.max(1, trajectory.length - 1);
  return { x, y };
});
const line = chartPts.map((p) => `${p.x},${p.y}`).join(" ");
const area = `M${chartPts[0].x},108 L${line.replace(/ /g, " L")} L${chartPts[chartPts.length - 1].x},108 Z`;

const focus = [
  { label: "Discovery & Delivery", value: 90 },
  { label: "AI / ML Products", value: 82 },
  { label: "Strategy & GTM", value: 74 },
];

const icons: Record<string, ReactNode> = {
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v4.5l3 1.5" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
    </>
  ),
};

export default function CareerSnapshot() {
  const current = experience[0];

  return (
    <aside className="mt-10 flex flex-col gap-4 lg:sticky lg:top-8 lg:mt-0">
      {/* Current role spotlight */}
      <motion.div {...reveal} custom={0} whileHover={hover} className="glass rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-xs font-semibold text-white shadow-soft">
            {current.company.replace(/[^A-Z]/g, "").slice(0, 2) || current.company.slice(0, 2)}
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
            </span>
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-600">
              Currently
            </p>
            <p className="truncate text-sm font-semibold text-ink">{current.title}</p>
            <p className="truncate text-xs text-ink-soft">{current.company}</p>
          </div>
        </div>
      </motion.div>

      {/* Career trajectory chart */}
      <motion.div {...reveal} custom={0.08} whileHover={hover} className="glass rounded-2xl p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Career trajectory
          </p>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-navy">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 14l5-5 4 4 7-7" />
              <path d="M17 6h3v3" />
            </svg>
            Growing
          </span>
        </div>
        <svg viewBox="0 0 260 120" className="w-full overflow-visible">
          <defs>
            <linearGradient id="traj" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-navy)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--color-navy)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="10" y1="108" x2="250" y2="108" stroke="var(--color-border)" strokeWidth="1.5" />
          <motion.path
            d={area}
            fill="url(#traj)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
          />
          <motion.polyline
            points={line}
            fill="none"
            stroke="var(--color-navy)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
          />
          {chartPts.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={i === chartPts.length - 1 ? 5 : 3.5}
              fill={i === chartPts.length - 1 ? "var(--color-navy)" : "var(--color-bg)"}
              stroke="var(--color-navy)"
              strokeWidth="2.5"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.22, ease }}
            />
          ))}
        </svg>
        <div className="mt-1 flex justify-between text-[10px] font-medium text-ink-muted">
          <span>Junior</span>
          <span>→</span>
          <span>APM</span>
        </div>
      </motion.div>

      {/* Stat tiles */}
      <motion.div {...reveal} custom={0.16} className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <motion.div
            key={s.label}
            whileHover={{ y: -3, transition: { duration: 0.2, ease } }}
            className="glass rounded-2xl p-3 text-center"
          >
            <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-navy-soft text-navy">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" strokeLinecap="round" strokeLinejoin="round">
                {icons[s.icon]}
              </svg>
            </span>
            <p className="mt-2 font-display text-lg font-bold tracking-tight text-ink">{s.value}</p>
            <p className="text-[10px] text-ink-soft">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Focus bars */}
      <motion.div {...reveal} custom={0.24} whileHover={hover} className="glass rounded-2xl p-5">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
          Where I go deep
        </p>
        <div className="flex flex-col gap-3.5">
          {focus.map((f, i) => (
            <div key={f.label}>
              <p className="mb-1.5 text-xs font-medium text-ink-soft">{f.label}</p>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-navy to-navy-hover"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${f.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Resume CTA */}
      <motion.a
        {...reveal}
        custom={0.32}
        whileHover={{ y: -2, transition: { duration: 0.2, ease } }}
        href="/resume.pdf"
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-navy px-5 py-3.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-navy-hover"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4v11m0 0 4-4m-4 4-4-4" />
          <path d="M5 19h14" />
        </svg>
        Download resume
      </motion.a>
    </aside>
  );
}
