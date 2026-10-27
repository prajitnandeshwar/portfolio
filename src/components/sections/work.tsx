"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { NowBuilding } from "./now-building";

type NdaTag = "NDA" | "Pre-launch";

type Project = {
  id: string;
  year: string;
  status?: string;       // e.g. "In design", shown beside the year for unreleased work
  title: string;
  description: string;
  role?: string;         // optional, omit on rows where the default "Lead Designer" is implied
  tags: string[];
  ndaTag?: NdaTag;       // shown next to the figcaption project name
  href?: string;
  image?: string;        // preview screenshot; falls back to a title placeholder when absent
  // When true, the card renders without a navigation wrapper and shows
  // a quiet "In progress" label in place of the arrow. The card keeps
  // every hover style; only the click target and the arrow go away.
  inProgress?: boolean;
  // Card styling for the case studies: a top to bottom panel gradient
  // and an accent for the headline number and the hovered arrow.
  theme?: { from: string; via: string; to: string; accent: string };
  // The headline number in the card footer, e.g. "6" then "customers".
  stat?: { value: string; label: string };
};

const projects: Project[] = [
  {
    id: "tax-assurance",
    year: "2026",
    status: "In market",
    title: "Tax Assurance",
    description:
      "Designing VAT and SST returns a finance team can trust enough to sign.",
    tags: ["B2B", "AI", "Built with an agent"],
    href: "/work/tax-assurance",
    image: "/work/tax-assurance/france-executive-summary.png",
    theme: { from: "#FBF3EC", via: "#F6F3EF", to: "#F4F3F1", accent: "#C8783A" },
    stat: { value: "6", label: "customers" },
  },
  {
    id: "notice-tracker",
    year: "2025–26",
    title: "Notice Tracker",
    description: "AI-powered platform for managing GST notices at scale.",
    tags: ["B2B", "AI", "0 to 1"],
    href: "/work/notice-tracker",
    image: "/work/notice-tracker.png",
    theme: { from: "#FAF1EF", via: "#F6F2F1", to: "#F4F3F2", accent: "#D0634F" },
    stat: { value: "₹2.3 Cr", label: "ARR" },
  },
  // Payment Recommendations and Mint Design System held the next two
  // slots. Both were in progress with no case study behind them, so the
  // section now shows the two case studies only. Their images are still
  // in public/work. Uncomment to bring them back.
  // {
  //   id: "payment-recommendations",
  //   year: "2025",
  //   title: "Payment Recommendations",
  //   description:
  //     "Max ITC payment recommendations. Block, release, and audit vendor invoices across thousands of vouchers.",
  //   tags: ["B2B", "Max ITC", "Vendor invoices"],
  //   image: "/work/payment-recommendations/closed.png",
  //   inProgress: true,
  // },
  // Global Recon held this slot. Tax Assurance covers the same ground
  // (multi country indirect tax reconciliation) with a real case study
  // behind it, so it took the slot. Put this back if you want both.
  // {
  //   id: "global-recon",
  //   year: "2026",
  //   status: "In design",
  //   title: "Global Recon",
  //   description:
  //     "Multi-jurisdictional reconciliation for global indirect tax compliance.",
  //   tags: ["B2B", "Multi-jurisdictional", "Compliance"],
  //   ndaTag: "Pre-launch",
  //   image: "/work/global-recon.png",
  //   inProgress: true,
  // },
  // {
  //   id: "mint-design-system",
  //   year: "2024",
  //   title: "Mint Design System",
  //   description: "Design system powering 8 products across Clear's portfolio.",
  //   tags: ["Design system", "ShadCN", "Adoption"],
  //   image: "/work/mint-design-system.png",
  //   inProgress: true,
  // },
];

export function Work() {
  return (
    <section
      id="work"
      className="px-6 md:px-10 py-12 md:py-16 border-t border-border"
    >
      <div className="mx-auto max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-6 md:mb-8"
        >
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-2">
            Selected work
          </div>
          <h2 className="section-title max-w-2xl" style={{ margin: 0 }}>
            Five years at Clear. A handful of things worth showing.
          </h2>
        </motion.div>

        {/* Two case studies side by side from 768px, stacked below it.
            Each card is one panel and one link: the image, then the year,
            title, line, and the headline number with tags. */}
        <ul className="grid grid-cols-1 gap-7 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </ul>

        <NowBuilding />
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const theme = project.theme;

  // The accent rides on a CSS variable, so the arrow's hover class can
  // reach it without a class per project.
  const panelStyle = {
    "--accent": theme?.accent ?? "#D97706",
    backgroundImage: theme
      ? `linear-gradient(to bottom, ${theme.from}, ${theme.via}, ${theme.to})`
      : undefined,
    backgroundColor: theme ? undefined : "var(--surface)",
  } as CSSProperties;

  // On hover the panel lifts 4px with a soft shadow over 250ms. With
  // reduced motion the lift is dropped.
  const panelClassName = `group block rounded-[24px] p-4 transition-[translate,box-shadow] duration-[250ms] ease-out hover:shadow-[0_12px_32px_-12px_rgba(31,31,30,0.18)] motion-safe:hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring${
    project.inProgress ? " cursor-default" : ""
  }`;

  const body = (
    <>
      <Preview project={project} />
      <div style={{ padding: "20px 10px 8px" }}>
        <div className="flex items-center gap-3">
          <p className="flex-1 text-[12.5px] tabular-nums text-muted-foreground">
            {project.year}
            {project.status && ` · ${project.status}`}
          </p>
          {project.inProgress ? (
            <span className="text-[12px] text-muted-foreground/65">
              In progress
            </span>
          ) : (
            // The site's link arrow (as on "See selected work"): it moves
            // 2px up and right and takes the card's accent on hover. With
            // reduced motion only the colour changes.
            <ArrowUpRight
              aria-hidden
              className="size-4 shrink-0 text-foreground transition-[translate,color] duration-200 ease-out group-hover:text-[var(--accent)] motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
            />
          )}
        </div>
        <h3 className="mt-3 text-[20px] font-medium tracking-tight leading-snug">
          {project.title}
        </h3>
        {project.role && (
          <div className="mt-1 text-[13px] text-muted-foreground">
            {project.role}
          </div>
        )}
        <p
          className={`text-[14px] leading-snug text-foreground/80 ${
            project.role ? "mt-2" : "mt-2.5"
          }`}
        >
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          {project.stat && theme && (
            <>
              <p className="flex items-baseline gap-1.5">
                <span
                  className="text-[22px] font-semibold leading-none tracking-tight"
                  style={{ color: theme.accent }}
                >
                  {project.stat.value}
                </span>
                <span className="text-[13px] text-muted-foreground">
                  {project.stat.label}
                </span>
              </p>
              <span aria-hidden className="h-5 w-px bg-border" />
            </>
          )}
          <p className="text-[12.5px] text-muted-foreground">
            {project.tags.join(" · ")}
          </p>
        </div>
      </div>
    </>
  );

  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.35,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
    >
      {project.inProgress ? (
        <div className={panelClassName} style={panelStyle}>
          {body}
        </div>
      ) : (
        <a
          href={project.href ?? "#contact"}
          className={panelClassName}
          style={panelStyle}
        >
          {body}
        </a>
      )}
    </motion.li>
  );
}

function Preview({ project }: { project: Project }) {
  return (
    // 16:9 frame, the shape of the widest screenshot (Notice Tracker).
    // The image runs full width, pinned to the top, so a taller one is
    // cropped from the bottom only, never the sides. 14px corners, a
    // hairline outline and a soft shadow lift it off the panel.
    <div
      className="relative w-full overflow-hidden rounded-[14px] ring-1 ring-black/[0.06]"
      style={{
        aspectRatio: "16 / 9",
        backgroundColor: "var(--surface)",
        boxShadow: "0 1px 2px rgba(31,31,30,0.04), 0 6px 18px -6px rgba(31,31,30,0.10)",
        margin: 0,
      }}
    >
      {project.image ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={project.image}
          alt={`${project.title} preview`}
          draggable={false}
          loading="lazy"
          className="absolute top-0 left-0 block h-auto w-full select-none"
          style={{ margin: 0 }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-[18px] md:text-[22px] font-medium text-foreground/85 px-6 text-center"
            style={{ margin: 0 }}
          >
            {project.title}
          </span>
        </div>
      )}
    </div>
  );
}
