"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileMenu } from "./mobile-menu";

const AMBER = "#D97706";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Exhibition", href: "/#exhibition" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Nav() {
  // Active section follows either the URL hash on the home page OR the
  // current pathname for case-study routes (/work/*).
  const pathname = usePathname();
  const [hash, setHash] = useState<string | null>(null);

  // ?demo=nav-<slug> forces the matching link into hover state for screenshots.
  const [demoSlug, setDemoSlug] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => setHash(window.location.hash || null);
    sync();
    window.addEventListener("hashchange", sync);

    const params = new URLSearchParams(window.location.search);
    const demo = params.get("demo");
    if (demo?.startsWith("nav-")) setDemoSlug(demo.slice(4));

    // ?scrollTo=<section-id>: scroll the page so that section sits just below
    // the fixed nav. Used by the screenshot pipeline to capture specific folds.
    const scrollTo = params.get("scrollTo");
    if (scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(scrollTo);
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.scrollY - 56 + 8;
        window.scrollTo({ top: y, behavior: "instant" });
        setHash(`#${scrollTo}`);
      }, 400);
    }

    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const isWorkSubroute = pathname?.startsWith("/work/");

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/60"
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 md:px-10 h-14">
        <Link href="/" className="tap text-[13px] font-medium tracking-tight">
          Prajit Nandeshwar
        </Link>

        {/* Mobile: hamburger reveals a full-screen overlay menu. */}
        <div className="md:hidden">
          <MobileMenu
            links={links}
            activeHash={hash}
            isWorkSubroute={!!isWorkSubroute}
          />
        </div>

        <nav className="hidden md:flex items-center gap-1 text-[13px]">
          {links.map((link) => {
            const slug = link.href.replace(/^.*#/, "");
            // Active when:
            //  - we're on a /work/* page and this is the Work link, or
            //  - the URL hash matches this link's anchor
            const isActive =
              (isWorkSubroute && link.label === "Work") ||
              hash === `#${slug}`;
            const isForcedHover = demoSlug === slug;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative px-3 py-2 min-h-[44px] inline-flex items-center text-muted-foreground"
                data-force-hover={isForcedHover || undefined}
              >
                {link.label}
                <span
                  aria-hidden
                  className={[
                    "pointer-events-none absolute left-3 right-3 bottom-1.5 h-px origin-left transition-transform duration-150 ease-out",
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100 group-data-[force-hover]:scale-x-100",
                  ].join(" ")}
                  style={{ backgroundColor: AMBER }}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}
