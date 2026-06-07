"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

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
};

const projects: Project[] = [
  {
    id: "notice-tracker",
    year: "2024",
    title: "Notice Tracker",
    description: "AI-powered platform for managing GST notices at scale.",
    role: "Lead Designer & PM",
    tags: ["B2B", "AI", "0→1", "₹2.3Cr ARR"],
    href: "/work/notice-tracker",
    image: "/work/notice-tracker.png",
  },
  {
    id: "global-recon",
    year: "2025",
    status: "In design",
    title: "Global Recon",
    description:
      "Multi-jurisdictional reconciliation for global indirect tax compliance.",
    tags: ["B2B", "Multi-jurisdictional", "Compliance"],
    ndaTag: "Pre-launch",
    image: "/work/global-recon.png",
  },
  {
    id: "clear-assurance",
    year: "2023",
    status: "Unshipped",
    title: "Clear Assurance",
    description:
      "Proactive indirect tax intelligence dashboard. Multiple iterations, ultimately did not ship.",
    tags: ["B2B", "Strategy", "Data viz"],
    image: "/work/clear-assurance.png",
  },
  {
    id: "mint-design-system",
    year: "2024",
    title: "Mint Design System",
    description: "Design system powering 8 products across Clear's portfolio.",
    tags: ["Design system", "ShadCN", "Adoption"],
    image: "/work/mint-design-system.png",
  },
];

export function Work() {
  const [activeIdx, setActiveIdx] = useState(0);

  // ?demo=work-<index> forces hover on that row for screenshot capture.
  const [demoIdx, setDemoIdx] = useState<number | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const demo = params.get("demo");
    if (demo?.startsWith("work-")) {
      const n = parseInt(demo.slice(5), 10);
      if (!Number.isNaN(n) && n >= 0 && n < projects.length) {
        setDemoIdx(n);
        setActiveIdx(n);
      }
    }
  }, []);

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

        {/* Desktop: split view (list left, sticky preview right). 5fr / 7fr
            gives the preview ~58% of the row width so details in the
            screenshots stay legible. items-start (not items-center) lets
            the right column position itself with sticky top, so the
            preview follows the viewport as the visitor scrolls through
            the project list. */}
        <div className="hidden md:grid md:grid-cols-[5fr_7fr] md:gap-10 md:items-start">
          <ul
            className="border-t border-border"
            onMouseLeave={() => setActiveIdx((i) => i)}
          >
            {projects.map((project, i) => (
              <DesktopRow
                key={project.id}
                project={project}
                index={i}
                active={activeIdx === i}
                forceHover={demoIdx === i}
                onHover={() => setActiveIdx(i)}
              />
            ))}
          </ul>

          <div className="md:sticky md:top-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={projects[activeIdx].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <Preview project={projects[activeIdx]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: stacked rows. Whole card (image + text) is a single
            anchor; tapping anywhere navigates to the case study or, if
            none exists, to the contact section. This matches what most
            visitors instinctively expect when a project tile is tapped. */}
        <ul className="md:hidden space-y-10">
          {projects.map((project) => (
            <li key={project.id}>
              <a
                href={project.href ?? "#contact"}
                className="block group"
              >
                <Preview project={project} compact />
                <MobileRow project={project} />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-xl text-[12px] text-muted-foreground">
          Detailed walkthroughs available on request. Some products are pre-launch and cannot be shown publicly.
        </p>
      </div>
    </section>
  );
}

function YearLine({ project }: { project: Project }) {
  // In-design projects: "2025 · In design" in tag-line styling.
  // Shipped projects: bare year in mono-numeric metadata styling.
  // Both turn amber on row hover.
  if (project.status) {
    return (
      <p className="text-[12px] text-muted-foreground/65 transition-colors duration-200 ease-out group-hover:text-[#D97706] group-data-[force-hover]:text-[#D97706]">
        {project.year} · {project.status}
      </p>
    );
  }
  return (
    <span className="text-[12.5px] font-mono tabular-nums text-muted-foreground transition-colors duration-200 ease-out group-hover:text-[#D97706] group-data-[force-hover]:text-[#D97706]">
      {project.year}
    </span>
  );
}

function DesktopRow({
  project,
  index,
  active,
  forceHover,
  onHover,
}: {
  project: Project;
  index: number;
  active: boolean;
  forceHover: boolean;
  onHover: () => void;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      onMouseEnter={onHover}
      className="border-b border-border"
    >
      <a
        href={project.href ?? "#contact"}
        data-force-hover={forceHover || undefined}
        className={`group block px-3 -mx-3 py-3 rounded-md transition-colors duration-200 ease-out data-[force-hover]:bg-surface ${
          active ? "bg-surface" : "hover:bg-surface"
        }`}
      >
        <div className="flex items-baseline justify-between gap-4">
          <YearLine project={project} />
          <ArrowUpRight
            className="size-4 text-muted-foreground transition-[transform,color] duration-200 ease-out group-hover:text-[#D97706] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-data-[force-hover]:text-[#D97706] group-data-[force-hover]:-translate-y-0.5 group-data-[force-hover]:translate-x-0.5"
          />
        </div>
        <h3 className="mt-1.5 text-[17px] font-medium tracking-tight leading-snug">
          {project.title}
        </h3>
        {project.role && (
          <div className="mt-0.5 text-[13px] text-muted-foreground">
            {project.role}
          </div>
        )}
        <p
          className={`text-[13px] leading-snug text-foreground/80 ${
            project.role ? "mt-1.5" : "mt-2"
          }`}
        >
          {project.description}
        </p>
        <p className="mt-2 text-[12px] text-muted-foreground/65">
          {project.tags.join(" · ")}
        </p>
      </a>
    </motion.li>
  );
}

function MobileRow({ project }: { project: Project }) {
  return (
    <div className="mt-5">
      <div className="flex items-baseline justify-between gap-4">
        <YearLine project={project} />
        <ArrowUpRight className="size-4 text-muted-foreground" />
      </div>
      <h3 className="mt-2 text-[18px] font-medium tracking-tight leading-snug">
        {project.title}
      </h3>
      {project.role && (
        <div className="mt-1 text-[13px] text-muted-foreground">
          {project.role}
        </div>
      )}
      <p
        className={`text-[13.5px] leading-snug text-foreground/80 ${
          project.role ? "mt-2" : "mt-2.5"
        }`}
      >
        {project.description}
      </p>
      <p className="mt-2 text-[12px] text-muted-foreground/65">
        {project.tags.join(" · ")}
      </p>
    </div>
  );
}

function Preview({
  project,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <figure style={{ margin: 0 }}>
      {/* Fixed 11:6 frame for every project so the tile shape never shifts
          as the active entry changes. 11:6 (~1.83) matches the widest
          featured image (Global Recon, 1.83); Clear Assurance fits with a
          negligible bottom crop, taller exports crop from the bottom. */}
      <div
        className="relative w-full overflow-hidden rounded-xl border border-border"
        style={{
          aspectRatio: "11 / 6",
          backgroundColor: "var(--surface)",
          boxShadow: "var(--frame-shadow)",
          margin: 0,
        }}
        aria-label={`${project.title} preview`}
      >
        {project.image ? (
          // Pinned top-left, full width, natural height. The frame's
          // overflow-hidden crops any overflow from the bottom only.
          // No object-fit so the image cannot be cropped on the sides.
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.image}
            alt={project.title}
            draggable={false}
            loading="lazy"
            className="select-none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "auto",
              display: "block",
              margin: 0,
            }}
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
      <figcaption className="mt-3 flex items-baseline gap-2 text-[13px]">
        <span className="text-muted-foreground">{project.title}</span>
        {project.ndaTag && (
          <span className="text-[10.5px] uppercase tracking-[0.08em] font-medium text-muted-foreground/70 border border-border rounded-full px-1.5 py-0.5">
            {project.ndaTag}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
