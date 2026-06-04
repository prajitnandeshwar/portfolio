"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Social = { label: string; href: string };

const socials: Social[] = [
  { label: "Read.cv", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Are.na", href: "#" },
  { label: "X", href: "#" },
];

const reveal = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Contact() {
  return (
    <section
      id="contact"
      className="px-6 md:px-10 py-24 md:py-32 border-t border-border"
    >
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="text-[12px] uppercase tracking-[0.14em] text-muted-foreground mb-3">
            Contact
          </div>
          <h2 className="section-title max-w-2xl" style={{ margin: 0 }}>
            Open to conversations about design, complex products, and interesting problems.
          </h2>
        </motion.div>

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.08 }}
          className="mt-10"
        >
          <a
            href="mailto:prajitnandeshwar33@gmail.com"
            className="group inline-flex items-center gap-2 text-[18px] md:text-xl font-medium underline-amber py-3"
          >
            prajitnandeshwar33@gmail.com
            <ArrowUpRight className="size-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.15 }}
          className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px]"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 ease-out underline-link py-2"
            >
              {s.label}
            </a>
          ))}
          {/* View resume sits in the same row as the socials but with the
              elevated "See selected work" treatment: foreground text, the
              same underline-link, and an ArrowUpRight that lifts on hover. */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 font-medium underline-link py-3 text-foreground"
          >
            View resume
            <ArrowUpRight className="size-4 transition-[transform,color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#D97706]" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
