"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type StatLine = {
  number: string;  // emphasised in amber, weight 600
  text: string;    // sits after the number, weight 500
};

type StatMomentProps = {
  lines: StatLine[];
};

// Restrained typographic stat treatment. Just type on the page, no card, no
// background. Number portion in amber/600, rest in --text/500. Each line
// fades in with staggered delays on scroll into view.
//
// 40px top and bottom margin per spec, 16px gap between lines.

const DELAYS_SEC = [0.1, 0.4, 0.7] as const;

export function StatMoment({ lines }: StatMomentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    amount: 0.4,
    once: true,
    margin: "0px 0px -80px 0px",
  });
  const reduceMotion = useReducedMotion();

  // Screenshot escape hatch: `?static=1` forces the final state so headless
  // captures can verify the layout (IntersectionObserver does not fire
  // reliably under virtual time).
  const [forceStatic, setForceStatic] = useState(false);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("static") === "1") {
      setForceStatic(true);
    }
  }, []);

  const visible = inView || forceStatic || reduceMotion;

  return (
    <div ref={ref} className="flex flex-col gap-4 my-10">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={forceStatic ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={
            reduceMotion || forceStatic
              ? { duration: 0 }
              : {
                  duration: 0.6,
                  delay: DELAYS_SEC[i] ?? 0.1 + i * 0.3,
                  ease: [0.22, 1, 0.36, 1] as const,
                }
          }
          className="text-[28px] md:text-[32px] font-medium text-[#1F1F1E] leading-[1.2] tracking-[-0.005em]"
        >
          <span className="font-semibold text-[#D97706]">{line.number}</span>
          <span> {line.text}</span>
        </motion.div>
      ))}
    </div>
  );
}
