"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  interactive?: boolean;
  plain?: boolean;
};

// Frosted bento tile: staggered entrance + subtle lift on hover (Emil easing).
// `plain` swaps the glass treatment for a clean hairline-bordered white surface.
export default function BentoCard({
  children,
  className = "",
  delay = 0,
  interactive = true,
  plain = false,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      whileHover={
        interactive && !reduce ? { y: -4, transition: { duration: 0.2 } } : undefined
      }
      className={`rounded-3xl ${plain ? "border border-border bg-bg" : "glass"} ${interactive ? "transition-shadow hover:shadow-lift" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
