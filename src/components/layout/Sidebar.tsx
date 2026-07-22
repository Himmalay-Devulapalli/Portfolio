"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { navItems, profile } from "@/lib/data";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const ids = navItems.map((n) => n.id);

// Inline stroke icons (consistent 1.8 stroke) keyed by nav id.
const icons: Record<string, ReactNode> = {
  home: (
    <>
      <path d="m3 10.5 9-7 9 7" />
      <path d="M5 9v11h14V9" />
    </>
  ),
  about: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </>
  ),
  "product-experience": (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
    </>
  ),
  "case-studies": (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  resume: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 13h6M9 17h6" />
    </>
  ),
  contact: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
};

// Full social icons (brand marks filled, line icons stroked) keyed by label.
const socialIcons: Record<string, ReactNode> = {
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4V24h-4V8zM8 8h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V24H8V8z" />
    </svg>
  ),
  Email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.24-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.24a11.5 11.5 0 0 1 6 0c2.29-1.56 3.3-1.24 3.3-1.24.66 1.66.24 2.88.12 3.18.77.84 1.24 1.92 1.24 3.24 0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  ),
  Newsletter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <path d="M4 4h13v16H4z" />
      <path d="M17 8h3v9a2 2 0 0 1-2 2h-1" />
      <path d="M7 8h7M7 12h7M7 16h4" />
    </svg>
  ),
};

export default function Sidebar() {
  const active = useScrollSpy(ids);

  return (
    <aside className="sticky top-0 z-40 hidden h-screen w-max max-w-xs shrink-0 flex-col border-r border-border bg-bg py-8 pl-5 pr-8 lg:flex">
      {/* Identity */}
      <a
        href="#home"
        className="group flex items-center gap-3 rounded-xl px-1 py-1 transition-colors"
      >
        <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-sm font-semibold text-white shadow-soft">
          {profile.name.slice(0, 2).toUpperCase()}
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-bg bg-emerald-500" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-ink">{profile.name}</span>
          <span className="text-xs text-ink-soft">{profile.role}</span>
        </span>
      </a>

      {/* Nav */}
      <p className="mb-2 mt-10 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
        Menu
      </p>
      <nav className="flex flex-col gap-0.5">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? "true" : undefined}
              className="group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium"
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-lg bg-navy-soft"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              {isActive && (
                <motion.span
                  layoutId="nav-accent"
                  className="absolute -left-5 bottom-1.5 top-1.5 w-[3px] rounded-r-full bg-navy"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors ${
                  isActive ? "text-navy" : "text-ink-muted group-hover:text-ink"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[18px] w-[18px]"
                >
                  {icons[item.id]}
                </svg>
              </span>
              <span
                className={`relative z-10 transition-all duration-200 group-hover:translate-x-0.5 ${
                  isActive ? "text-navy" : "text-ink-soft group-hover:text-ink"
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Social links pinned to the bottom */}
      <div className="mt-auto pt-8">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
          Connect
        </p>
        <div className="flex items-center gap-1.5 px-1">
          {profile.socials.map((s) => {
            const external = s.href.startsWith("http");
            return (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                title={s.label}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-navy-soft hover:text-navy"
              >
                {socialIcons[s.label]}
              </a>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
