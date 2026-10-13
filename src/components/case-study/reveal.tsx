"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

// The entrance used by the Notice Tracker figures, lifted verbatim so both
// case studies move the same way: fade up 16px over 0.6s on the site's
// standard curve, once, when a fifth of the element has cleared the fold.
// Honours prefers-reduced-motion by snapping to the end state.
export const REVEAL_IN_VIEW = {
  amount: 0.2,
  once: true,
  margin: "0px 0px -80px 0px",
} as const;

export const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;
export const REVEAL_DURATION = 0.6;

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, REVEAL_IN_VIEW);
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: REVEAL_DURATION, ease: REVEAL_EASE }
      }
      style={{ margin: 0 }}
    >
      {children}
    </motion.div>
  );
}
