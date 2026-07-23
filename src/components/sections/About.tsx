"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import BentoCard from "@/components/ui/BentoCard";
import ChatCard from "@/components/ui/ChatCard";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { profile } from "@/lib/data";

const focus = [
  "LLM & AI products",
  "0→1 & scaling",
  "Platform & APIs",
  "Experimentation",
  "Data & analytics",
  "GTM strategy",
];

const stack = ["SQL", "Python", "LLM APIs", "RAG & evals", "A/B testing", "Amplitude"];

const stats = [
  { value: "3", label: "AI products shipped" },
  { value: "6", label: "Newsletter editions" },
  { value: "500+", label: "Newsletter subscribers" },
];

const ease = [0.23, 1, 0.32, 1] as const;

/* Count-up number, respects reduced motion */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const m = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
  const prefix = m?.[1] ?? "";
  const target = m ? parseInt(m[2].replace(/,/g, ""), 10) : 0;
  const suffix = m?.[3] ?? "";
  const [n, setN] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) return setN(target);
    const controls = animate(0, target, { duration: 1.1, ease, onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

/* Kinetic masked headline */
function Headline() {
  const reduce = useReducedMotion();
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } };
  const line = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : { hidden: { y: "115%" }, show: { y: 0, transition: { duration: 0.7, ease } } };

  return (
    <motion.h2
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="font-display text-[2.3rem] font-bold leading-[1.06] tracking-tight text-ink sm:text-5xl"
    >
      <span className="block overflow-hidden pb-2">
        <motion.span variants={line} className="block">
          I ship AI-first
        </motion.span>
      </span>
      <span className="block overflow-hidden pb-2">
        <motion.span variants={line} className="block">
          products,{" "}
          <span className="relative whitespace-nowrap text-navy">
            model to metric
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.6, ease }}
              className="absolute -bottom-0.5 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-navy to-iris"
            />
          </span>
          .
        </motion.span>
      </span>
    </motion.h2>
  );
}

/* Skill group: labelled header + staggered, hover-lift chips */
function SkillGroup({
  label,
  items,
  icon,
  mono = false,
}: {
  label: string;
  items: string[];
  icon: React.ReactNode;
  mono?: boolean;
}) {
  const reduce = useReducedMotion();
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
  const chipV = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } } };

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-ink-muted">
          {icon}
          {label}
        </span>
        <span className="font-mono text-[11px] text-ink-muted">
          {items.length.toString().padStart(2, "0")}
        </span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="mt-3.5 flex flex-wrap gap-2"
      >
        {items.map((item) => (
          <motion.span
            key={item}
            variants={chipV}
            whileHover={reduce ? undefined : { y: -2 }}
            transition={{ duration: 0.15, ease }}
            className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-white/70 px-3.5 py-1.5 font-medium text-ink-soft shadow-[0_1px_2px_rgba(15,27,45,0.03)] transition-colors hover:border-navy/40 hover:text-navy hover:shadow-soft ${
              mono ? "font-mono text-[13px]" : "text-sm"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${mono ? "bg-iris/50" : "bg-navy/40"}`} />
            {item}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-dvh flex-col overflow-hidden border-t border-border bg-dotgrid px-3 pb-3 pt-10 sm:px-5 sm:pb-5 sm:pt-12 lg:px-6 lg:pb-6"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-surface/50 via-transparent to-white" />

      <div className="mb-4 px-1 sm:mb-5">
        <SectionEyebrow label="About" index="01" />
      </div>

      <div className="grid flex-1 auto-rows-[minmax(0,auto)] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {/* Statement */}
        <BentoCard
          interactive={false}
          className="flex flex-col justify-center p-8 shadow-soft ring-1 ring-navy/[0.06] sm:col-span-2 sm:p-10 lg:col-span-2 lg:col-start-1 lg:row-span-2 lg:row-start-1"
        >
          <div className="flex items-center gap-4">
            <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy text-lg font-semibold text-white shadow-soft">
              {profile.name.slice(0, 2).toUpperCase()}
              <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-[3px] border-bg bg-emerald-500" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-base font-bold tracking-tight text-ink">
                {profile.name}
              </p>
              <p className="text-sm text-ink-soft">AI-first Tech PM · Remote</p>
            </div>
            <span className="glass-soft ml-auto hidden items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-ink-soft sm:inline-flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to work
            </span>
          </div>

          <div className="mt-7">
            <Headline />
          </div>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            A technical product manager who lives in the details. I partner with engineering and ML
            teams to turn ambiguous problems into products that ship — and pressure-test the roadmap
            with data, not opinions.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <motion.a
              href="#case-studies"
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.12, ease }}
              className="inline-flex items-center justify-center rounded-xl bg-navy px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-navy-hover"
            >
              View case studies
            </motion.a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 rounded-xl border border-ink/15 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-navy hover:text-navy"
            >
              Get in touch
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </BentoCard>

        {/* Assistant */}
        <ChatCard
          delay={0.08}
          className="h-[440px] shadow-soft ring-1 ring-navy/[0.06] sm:max-lg:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:h-auto lg:min-h-[380px]"
        />

        {/* Skills */}
        <BentoCard
          delay={0.2}
          className="flex flex-col justify-center gap-6 p-6 shadow-soft ring-1 ring-navy/[0.06] sm:col-span-2 sm:p-7 lg:col-span-2 lg:col-start-1 lg:row-start-3"
        >
          <SkillGroup
            label="Product"
            items={focus}
            icon={
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            }
          />

          <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

          <SkillGroup
            label="Tech"
            items={stack}
            mono
            icon={
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m8 6-6 6 6 6" />
                <path d="m16 6 6 6-6 6" />
              </svg>
            }
          />
        </BentoCard>

        {/* Feature — numbers + what's next */}
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.28, ease }}
          className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-[#0e2340] p-6 text-white shadow-lift sm:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-3"
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-iris/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-sky/20 blur-3xl" />

          <div className="relative">
            <span className="text-xs font-medium uppercase tracking-wider text-white/50">By the numbers</span>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold tracking-tight sm:text-[1.7rem]">
                    <CountUp value={s.value} />
                  </p>
                  <p className="mt-1 text-[11px] leading-tight text-white/60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative my-5 h-px w-full bg-white/15" />

          <div className="relative">
            <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/50">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky" />
              </span>
              Currently exploring
            </span>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Agentic workflows, LLM eval harnesses, and AI features that{" "}
              <span className="font-medium text-white">earn their place</span> — not bolt-ons.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
