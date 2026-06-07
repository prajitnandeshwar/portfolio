"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const currently = [
  "Leading design at Clear (B2B Tax GRC)",
  "Prototyping with Claude Code",
  "Designing AI surfaces for compliance products",
];

const previously = [
  { period: "Oct 2024 to Now", role: "Lead Product Designer", company: "Clear" },
  { period: "Mar 2022 to Oct 2024", role: "Senior Product Designer", company: "Clear" },
  { period: "Mar 2021 to Mar 2022", role: "Product Designer", company: "Clear" },
  { period: "Aug 2020 to Feb 2021", role: "Product Design Intern", company: "Freshworks" },
];

const education = [
  { period: "2018 to 2021", degree: "Masters in Digital Game Design", school: "NID Bangalore" },
  { period: "2012 to 2016", degree: "B.Tech in Electrical and Electronics", school: "NIT Trichy" },
];

const speaking = [
  { title: "UX Essentials workshop", venue: "FieldAssist" },
];

const outsideWork = [
  "Sketching and photography",
];

const reveal = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function About() {
  return (
    <section
      id="about"
      className="px-6 md:px-10 py-24 md:py-32 border-t border-border"
    >
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-8 mb-20 md:mb-24"
        >
          <div className="md:col-span-4">
            <div className="text-[12px] uppercase tracking-[0.14em] text-muted-foreground mb-3">
              About
            </div>
            <h2 className="section-title max-w-sm" style={{ margin: 0 }}>
              A little about how I work.
            </h2>
          </div>

          <div className="md:col-span-7 md:col-start-6 space-y-5 text-base leading-[1.7] text-foreground/85 max-w-prose">
            <p>
              I have spent the last 5 years at Clear shipping enterprise compliance software for India and abroad. My work spans Tax GRC, AI-augmented design, and design systems across 8 products serving 1,500+ enterprise customers across India, UAE, Saudi Arabia, Malaysia, and France.
            </p>
            <p className="text-muted-foreground">
              I gravitate toward complex domains where regulations change quarterly, the data is messy, and users are experts who do not tolerate bad software. That is where design has the most leverage.
            </p>
            <p className="text-muted-foreground">
              I prototype in code (currently using Claude Code daily), lead a small B2B design team, and write occasionally about working in regulated B2B software.
            </p>
            <p style={{ margin: 0 }}>
              <a
                href="/prajit-nandeshwar-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-medium underline-link py-3 text-foreground"
              >
                View resume
                <ArrowUpRight className="size-4 transition-[transform,color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#D97706]" />
              </a>
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-12 border-t border-border pt-12"
        >
          <Column title="Currently">
            <ul className="space-y-2.5" style={{ margin: 0 }}>
              {currently.map((item) => (
                <li
                  key={item}
                  className="text-base"
                  style={{ margin: 0 }}
                >
                  {item}
                </li>
              ))}
            </ul>
            <SubBlock title="Speaking">
              <ul className="space-y-2.5" style={{ margin: 0 }}>
                {speaking.map((item) => (
                  <li
                    key={item.title}
                    className="text-base leading-snug"
                    style={{ margin: 0 }}
                  >
                    {item.title}
                    <span className="text-muted-foreground"> · {item.venue}</span>
                  </li>
                ))}
              </ul>
            </SubBlock>
          </Column>

          <Column title="Previously">
            <ul className="space-y-4" style={{ margin: 0 }}>
              {previously.map((item) => (
                <li key={item.period} className="text-base leading-snug">
                  <div>
                    {item.role}
                    <span className="text-muted-foreground"> · {item.company}</span>
                  </div>
                  <div className="text-[12px] text-muted-foreground font-mono tabular-nums mt-1">
                    {item.period}
                  </div>
                </li>
              ))}
            </ul>
          </Column>

          <Column title="Education">
            <ul className="space-y-4" style={{ margin: 0 }}>
              {education.map((item) => (
                <li key={item.period} className="text-base leading-snug">
                  <div>
                    {item.degree}
                    <span className="text-muted-foreground"> · {item.school}</span>
                  </div>
                  <div className="text-[12px] text-muted-foreground font-mono tabular-nums mt-1">
                    {item.period}
                  </div>
                </li>
              ))}
            </ul>
            <SubBlock title="Outside work">
              <ul className="space-y-2.5" style={{ margin: 0 }}>
                {outsideWork.map((item) => (
                  <li
                    key={item}
                    className="text-base leading-snug"
                    style={{ margin: 0 }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </SubBlock>
          </Column>
        </motion.div>
      </div>
    </section>
  );
}

function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  // flex flex-col h-full so a nested "tail" block can use mt-auto to glue
  // itself to the bottom of the column, aligning the second-tier labels
  // across columns of different content heights.
  return (
    <div className="md:col-span-4 flex flex-col h-full">
      <h3
        className="text-[12px] uppercase tracking-[0.14em] text-muted-foreground mb-5"
        style={{ margin: 0, marginBottom: "1.25rem" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function SubBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  // Nested second-tier block under a Column. mt-auto pushes it to the
  // bottom of the parent column so SPEAKING and OUTSIDE WORK land on the
  // same baseline; pt-12 sets the consistent minimum gap above each.
  return (
    <div className="mt-auto pt-12">
      <h3
        className="text-[12px] uppercase tracking-[0.14em] text-muted-foreground"
        style={{ margin: 0, marginBottom: "1.25rem" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
