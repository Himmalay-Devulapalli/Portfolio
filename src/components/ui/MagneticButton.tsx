"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  download?: boolean | string;
};

// Anchor that subtly drifts toward the cursor with spring physics.
export default function MagneticButton({ href, children, className = "", download }: Props) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  function move(e: PointerEvent<HTMLAnchorElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  }

  function leave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href={href}
      download={download}
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
