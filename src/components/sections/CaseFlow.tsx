"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { portfolioItems, type PortfolioItem } from "@/lib/data";

const n = portfolioItems.length;
const wrap = (i: number) => ((i % n) + n) % n;
const EASE = [0.23, 1, 0.32, 1] as const;

// Subtle theme accents cycled across the impact stats.
const ACCENTS = [
  { tint: "bg-navy/[0.05]", ring: "ring-navy/10", bar: "bg-navy", track: "bg-navy/10" },
  { tint: "bg-iris/[0.06]", ring: "ring-iris/15", bar: "bg-iris", track: "bg-iris/10" },
  { tint: "bg-sky/[0.08]", ring: "ring-sky/20", bar: "bg-sky", track: "bg-sky/15" },
];

// Per-type display fields — same layout, different content/labels.
function cardFields(item: PortfolioItem) {
  if (item.kind === "project") {
    return {
      meta: `${item.company} · ${item.period}`,
      lead: item.problem,
      bulletsLabel: "Approach",
      bullets: item.approach,
      chipsLabel: "Technologies",
      chips: item.stack,
      statsLabel: "ROI",
      cta: "View resume",
    };
  }
  return {
    meta: `${item.format} · ${item.focus}`,
    lead: item.summary,
    bulletsLabel: "Key takeaways",
    bullets: item.takeaways,
    chipsLabel: "Topics",
    chips: item.tags,
    statsLabel: "Results",
    cta: "Read case study",
  };
}

/* Type badge — visually distinguishes a project from a case study */
function TypeTag({ kind }: { kind: PortfolioItem["kind"] }) {
  const project = kind === "project";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
        project ? "bg-navy text-white" : "bg-iris/10 text-iris ring-1 ring-inset ring-iris/25"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${project ? "bg-emerald-400" : "bg-iris"}`} />
      {project ? "Project" : "Case study"}
    </span>
  );
}

/* Count-up number, respects reduced motion */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const m = value.match(/^(\D*)(\d[\d.,]*)(.*)$/);
  const prefix = m?.[1] ?? "";
  const raw = m ? m[2] : "";
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  const target = m ? parseFloat(raw.replace(/,/g, "")) : 0;
  const suffix = m?.[3] ?? "";
  const [nVal, setNVal] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) return setNVal(target);
    const controls = animate(0, target, {
      duration: 1,
      ease: EASE,
      onUpdate: (v) => setNVal(v),
    });
    return () => controls.stop();
  }, [inView, reduce, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {nVal.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* Interactive impact stat: count-up + animated accent bar */
function ImpactStat({
  value,
  from,
  label,
  i,
  reduce,
}: {
  value: string;
  from?: string;
  label: string;
  i: number;
  reduce: boolean;
}) {
  const a = ACCENTS[i % ACCENTS.length];
  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -3 }}
      transition={{ duration: 0.15, ease: EASE }}
      className={`rounded-xl p-3 ring-1 transition-shadow hover:shadow-soft ${a.tint} ${a.ring}`}
    >
      <p className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
        <CountUp value={value} />
      </p>
      {from && <p className="text-[10px] leading-tight text-ink-muted">from {from}</p>}
      <p className="mt-0.5 text-[11px] leading-tight text-ink-soft">{label}</p>
      <div className={`mt-2 h-1 overflow-hidden rounded-full ${a.track}`}>
        <motion.div
          className={`h-full rounded-full ${a.bar}`}
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={reduce ? { duration: 0 } : { duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
        />
      </div>
    </motion.div>
  );
}

/* Right-half visual — real image if provided, else a styled placeholder (tinted by type) */
function CardVisual({ item }: { item: PortfolioItem }) {
  if (item.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={item.image} alt={item.title} className="h-full w-full object-cover" />;
  }
  const project = item.kind === "project";
  const grad = project
    ? "from-navy via-navy to-[#16314f]"
    : "from-[#312b63] via-[#3b2f6e] to-[#241f47]";
  const label = project ? item.company : item.format;
  const accent = project ? "text-sky" : "text-[#c4b5fd]";
  const foot = project ? "Project preview" : "Case study";

  return (
    <div className={`flex h-full w-full flex-col bg-gradient-to-br ${grad}`}>
      {/* Faux window chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="ml-2 font-mono text-[10px] text-white/40">{item.slug}</span>
      </div>
      {/* Headline metric over a soft grid */}
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-6 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <span className={`relative text-[11px] font-semibold uppercase tracking-[0.2em] ${accent}`}>
          {label}
        </span>
        <span className="relative mt-3 font-display text-6xl font-bold tracking-tight text-white">
          {item.impact[0].value}
        </span>
        <span className="relative mt-1 text-sm text-white/60">{item.impact[0].label}</span>
      </div>
      <div className="px-4 pb-3 text-center font-mono text-[10px] uppercase tracking-widest text-white/35">
        {foot}
      </div>
    </div>
  );
}

// Flat, looping horizontal carousel. Only prev / active / next are visible.
function geometry(w: number) {
  const mobile = w < 640;
  const tablet = w >= 640 && w < 1024;
  const cardW = mobile ? Math.min(w * 0.92, 460) : tablet ? Math.min(w * 0.82, 720) : Math.min(w * 0.74, 1040);
  const sideScale = mobile ? 0.82 : tablet ? 0.76 : 0.74;
  const spacing = mobile ? cardW * 0.42 : tablet ? cardW * 0.34 : cardW * 0.32;
  return { cardW, sideScale, spacing };
}

export default function CaseFlow() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageW, setStageW] = useState(0);
  const activeRef = useRef<HTMLElement>(null);
  const [cardH, setCardH] = useState(620); // adapts to the active card's content

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setStageW(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Measure the active card's natural height so nothing is clipped.
  useLayoutEffect(() => {
    const el = activeRef.current;
    if (!el) return;
    const measure = () => setCardH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [index, stageW]);

  const go = useCallback((dir: number) => setIndex((v) => wrap(v + dir)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const g = geometry(stageW || 1000);

  return (
    <div className="mt-10">
      {/* Stage */}
      <div
        ref={stageRef}
        className="relative flex items-center justify-center overflow-hidden transition-[height] duration-300 ease-out"
        style={{ height: cardH + 40 }}
      >
        {stageW > 0 &&
          portfolioItems.map((item, i) => {
            const m = wrap(i - index);
            const offset = m > n / 2 ? m - n : m;
            const abs = Math.abs(offset);
            const active = offset === 0;
            const visible = abs <= 1;
            const scale = active ? 1 : g.sideScale;
            const f = cardFields(item);

            return (
              <div
                key={item.slug}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: g.cardW,
                  zIndex: active ? 20 : 10 - abs,
                  transform: "translate(-50%, -50%)",
                  pointerEvents: visible ? "auto" : "none",
                }}
              >
                <motion.article
                  ref={active ? activeRef : undefined}
                  style={{ height: active ? undefined : cardH }}
                  className={`w-full overflow-hidden rounded-3xl border bg-bg p-5 sm:p-8 ${
                    active
                      ? "cursor-grab border-navy/15 shadow-[0_30px_80px_-24px_rgba(15,27,45,0.4)] ring-1 ring-navy/10 active:cursor-grabbing"
                      : "cursor-pointer border-border shadow-soft"
                  }`}
                  initial={false}
                  animate={{
                    x: offset * g.spacing,
                    scale,
                    opacity: visible ? (active ? 1 : 0.5) : 0,
                    filter: active ? "blur(0px)" : "blur(2px)",
                  }}
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 210, damping: 30, mass: 0.9 }}
                  drag={active ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.16}
                  dragSnapToOrigin
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) go(1);
                    else if (info.offset.x > 60) go(-1);
                  }}
                  onClick={() => !active && setIndex(i)}
                >
                  {active ? (
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                      {/* Left — details */}
                      <div className="flex min-h-0 flex-col">
                        <div className="flex items-center justify-between gap-3">
                          <TypeTag kind={item.kind} />
                          <span className="text-xs text-ink-muted">{f.meta}</span>
                        </div>

                        {/* Title + lead */}
                        <h3 className="mt-3.5 text-xl font-bold leading-snug tracking-tight text-ink sm:text-2xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.lead}</p>

                        {/* Approach / Key takeaways */}
                        <div className="mt-5">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                            {f.bulletsLabel}
                          </p>
                          <ul className="mt-1.5 space-y-1 text-sm">
                            {f.bullets.map((b) => (
                              <li key={b} className="flex gap-2 leading-snug text-ink-soft">
                                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-navy/50" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies / Topics */}
                        <div className="mt-4">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                            {f.chipsLabel}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {f.chips.map((s) => (
                              <span
                                key={s}
                                className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-[11px] font-medium text-ink"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* ROI / Results — interactive */}
                        <div className="mt-5">
                          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                            {f.statsLabel}
                          </p>
                          <div className="grid grid-cols-3 gap-2.5">
                            {item.impact.map((mm, mi) => (
                              <ImpactStat
                                key={mm.label}
                                value={mm.value}
                                from={mm.from}
                                label={mm.label}
                                i={mi}
                                reduce={!!reduce}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Footer CTA */}
                        <a
                          href={item.href ?? (item.kind === "project" ? "#resume" : "#case-studies")}
                          target={item.href?.startsWith("http") ? "_blank" : undefined}
                          rel={item.href?.startsWith("http") ? "noreferrer noopener" : undefined}
                          className="group/cta mt-5 inline-flex items-center justify-center gap-1.5 rounded-xl bg-navy px-5 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-navy-hover"
                        >
                          {f.cta}
                          <span className="transition-transform group-hover/cta:translate-x-0.5">→</span>
                        </a>
                      </div>

                      {/* Right — visual */}
                      <div className="relative hidden overflow-hidden rounded-2xl border border-border lg:block">
                        <CardVisual item={item} />
                      </div>
                    </div>
                  ) : (
                    /* Preview only */
                    <div className="flex h-full flex-col">
                      <div className="flex items-center justify-between gap-3">
                        <TypeTag kind={item.kind} />
                        <span className="text-xs text-ink-muted">
                          {item.kind === "project" ? item.company : item.format}
                        </span>
                      </div>
                      <h3 className="mt-3.5 text-lg font-bold leading-snug tracking-tight text-ink">
                        {item.title}
                      </h3>
                      <div className="mt-auto">
                        <p className="font-display text-3xl font-bold tracking-tight text-navy">
                          {item.impact[0].value}
                        </p>
                        <p className="mt-1 text-xs text-ink-soft">{item.impact[0].label}</p>
                      </div>
                    </div>
                  )}
                </motion.article>
              </div>
            );
          })}
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-4 sm:gap-5">
        <button
          aria-label="Previous card"
          onClick={() => go(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg text-ink shadow-soft transition-colors hover:border-navy hover:text-navy"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {portfolioItems.map((item, i) => (
            <button
              key={item.slug}
              aria-label={`Go to ${item.title}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-navy" : "w-2 bg-border hover:bg-ink-muted"
              }`}
            />
          ))}
        </div>

        <button
          aria-label="Next card"
          onClick={() => go(1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg text-ink shadow-soft transition-colors hover:border-navy hover:text-navy"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-ink-muted">
        Drag, use arrows, or tap a card to explore
      </p>
    </div>
  );
}
