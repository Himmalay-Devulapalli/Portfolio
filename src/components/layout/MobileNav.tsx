"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems, profile } from "@/lib/data";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-bg/90 px-4 backdrop-blur">
        <a href="#home" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy text-xs font-semibold text-white">
            {profile.name.slice(0, 2).toUpperCase()}
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-ink">{profile.name}</span>
            <span className="text-[11px] text-ink-soft">{profile.role}</span>
          </span>
        </a>
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink"
        >
          <div className="flex w-4 flex-col gap-[3px]">
            <span className={`h-[2px] w-full bg-current transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`h-[2px] w-full bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-[2px] w-full bg-current transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </div>
        </button>
      </header>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="fixed inset-x-0 top-14 z-40 flex flex-col gap-1 border-b border-border bg-bg p-4 shadow-soft"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-navy-soft hover:text-navy"
                >
                  {item.label}
                </a>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
