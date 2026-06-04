"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const AMBER = "#D97706";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { y: 12, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section
      id="top"
      className="px-6 md:px-10 pt-24 md:pt-32 pb-20 md:pb-24 min-h-[55vh] flex items-center"
    >
      {/* Hero is a centered cover. The inner container is the same 1200px
          box used by other sections so the viewport-level mx-auto stays
          consistent, but text-center centers the content inside, unlike
          the body sections which sit left-aligned on the gridline. */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-[1200px] w-full text-center"
        style={{ margin: "0 auto" }}
      >
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-muted-foreground"
          style={{ marginTop: 0, marginBottom: "2.5rem" }}
        >
          <span className="relative inline-flex h-1.5 w-1.5">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-50 animate-ping"
              style={{ backgroundColor: AMBER }}
            />
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: AMBER }}
            />
          </span>
          Available for select roles, 2026
        </motion.div>

        <motion.h1
          variants={item}
          className="text-balance font-medium leading-[1.08] tracking-[-0.02em] text-foreground max-w-3xl"
          style={{
            fontSize: "clamp(1.75rem, 4.2vw, 3.25rem)",
            margin: "0 auto",
          }}
        >
          Lead Product Designer shipping enterprise compliance software, end to end
          <span style={{ color: AMBER }}>.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="max-w-xl text-pretty text-[15px] md:text-base leading-relaxed text-muted-foreground"
          style={{ margin: "2rem auto 0" }}
        >
          I lead design strategy for Clear&rsquo;s India and Global B2B portfolio: 8 products, 1,500+ enterprise customers, 4 countries. I design AI-augmented compliance products and prototype enterprise software in code.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[15px]"
          style={{ marginTop: "3rem" }}
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-1.5 font-medium underline-link py-3"
          >
            See selected work
            <ArrowUpRight
              className="size-4 transition-[transform,color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#D97706]"
            />
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-1.5 text-muted-foreground py-3"
          >
            Get in touch
            <ArrowUpRight className="size-4 transition-[transform,color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#D97706]" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
