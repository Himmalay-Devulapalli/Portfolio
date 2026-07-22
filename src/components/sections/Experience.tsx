"use client";

import { motion } from "framer-motion";
import { experience, roleDuration } from "@/lib/data";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import Badge from "@/components/ui/Badge";
import CareerSnapshot from "@/components/sections/CareerSnapshot";

const ease = [0.22, 1, 0.36, 1] as const;

const initials = (name: string) =>
  (name.replace(/[^A-Z]/g, "").slice(0, 2) || name.slice(0, 2)).toUpperCase();

export default function Experience() {
  return (
    <section
      id="product-experience"
      className="relative border-t border-border bg-surface/50 pb-20 pt-10 sm:pb-28 sm:pt-12"
    >
      <div className="w-full px-6 sm:px-10 lg:px-14">
        <SectionEyebrow label="Product Experience" index="02" />

        <div className="mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-12">
          {/* Timeline */}
          <div className="relative">
            <span
              aria-hidden
              className="absolute bottom-3 left-[19px] top-3 w-px bg-gradient-to-b from-navy/50 via-border to-transparent sm:left-[23px]"
            />

            <div className="flex flex-col gap-5 sm:gap-6">
              {experience.map((role, i) => {
                const current = role.period.includes("Present");
                return (
                  <motion.div
                    key={role.company + role.period}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-70px" }}
                    transition={{ duration: 0.55, delay: i * 0.08, ease }}
                    className="relative flex gap-4 sm:gap-6"
                  >
                    {/* Node / monogram */}
                    <div className="relative z-10 shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-[11px] font-semibold text-white shadow-soft ring-4 ring-surface sm:h-12 sm:w-12 sm:text-xs">
                        {initials(role.company)}
                      </div>
                      {current && (
                        <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-surface bg-emerald-500" />
                        </span>
                      )}
                    </div>

                    {/* Card */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2, ease }}
                      className="group flex-1 rounded-2xl border border-border bg-bg p-5 shadow-soft transition-colors hover:border-navy/30 hover:shadow-lift sm:p-6"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                        <div>
                          <h3 className="text-base font-bold tracking-tight text-ink sm:text-lg">
                            {role.title}
                          </h3>
                          <p className="mt-0.5 text-sm text-ink-soft">
                            <span className="font-medium text-navy">{role.company}</span>
                            {role.type ? ` · ${role.type}` : ""}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-soft px-3 py-1 text-xs font-medium text-navy">
                          {current && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
                          {role.period}
                          <span className="font-normal text-navy/60">
                            · {roleDuration(role.start, role.end)}
                          </span>
                        </span>
                      </div>

                      {/* Location */}
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-muted">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3.5 w-3.5"
                        >
                          <path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z" />
                          <circle cx="12" cy="10" r="2.5" />
                        </svg>
                        {role.location}
                      </p>

                      {/* Highlights */}
                      <ul className="mt-4 flex flex-col gap-2">
                        {role.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex gap-2.5 text-sm leading-relaxed text-ink-soft"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mt-[3px] h-3.5 w-3.5 shrink-0 text-navy"
                            >
                              <path d="m5 12 5 5L20 7" />
                            </svg>
                            {h}
                          </li>
                        ))}
                      </ul>

                      {/* Skills */}
                      {role.skills && role.skills.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                          {role.skills.map((s) => (
                            <Badge key={s}>{s}</Badge>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sticky visual snapshot */}
          <CareerSnapshot />
        </div>
      </div>
    </section>
  );
}
