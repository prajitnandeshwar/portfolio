import Link from "next/link";
import type { ReactNode } from "react";

type Credit = { label: string; value: string };

type CaseStudyHeroProps = {
  backHref: string;
  backLabel: string;
  title: string;
  accentChar?: string;
  tagline: string;
  // Labeled credits strip under the subhead. Items lay out as a left-
  // aligned flex row with clean wrapping; the long Team value naturally
  // wraps to its own line on narrow columns so the three short items
  // (Role, Timeline, Read) stay together.
  credits: Credit[];
  visual: ReactNode;
};

export function CaseStudyHero({
  backHref,
  backLabel,
  title,
  accentChar = "",
  tagline,
  credits,
  visual,
}: CaseStudyHeroProps) {
  return (
    <section className="px-6 md:px-12 pt-20 md:pt-24 pb-10 md:pb-12">
      <div className="mx-auto max-w-[1080px]">
        <Link
          href={backHref}
          className="group inline-flex items-center gap-2 text-[14px] text-[#6B6B68] hover:text-[#D97706] mb-10 transition-colors duration-200 ease-out"
        >
          <span
            aria-hidden
            className="transition-transform duration-200 ease-out group-hover:-translate-x-[2px]"
          >
            ←
          </span>
          {backLabel}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-10 md:gap-12 md:items-center">
          {/* Text column */}
          <div>
            <h1
              className="font-semibold text-[#1F1F1E] leading-[1.05] tracking-[-0.02em] mb-5"
              style={{ fontSize: "clamp(2.25rem, 4.4vw, 3rem)" }}
            >
              {title}
              {accentChar && (
                <span className="text-[#D97706]">{accentChar}</span>
              )}
            </h1>

            <p
              className="text-[18px] text-[#6B6B68] leading-[1.5] mb-8"
              style={{ margin: 0, marginBottom: "2rem" }}
            >
              {tagline}
            </p>

            {/* Credits strip: each item is a small uppercase muted label
                stacked above a stronger value. flex-wrap keeps it tidy
                on narrow widths; the long Team credit drops to its own
                line. */}
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              {credits.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col"
                  style={{ margin: 0 }}
                >
                  <div
                    className="text-[11px] uppercase tracking-[0.14em] text-[#9C9C97]"
                    style={{ margin: 0, marginBottom: "0.375rem" }}
                  >
                    {label}
                  </div>
                  <div
                    className="text-[14.5px] text-[#1F1F1E] leading-tight"
                    style={{ margin: 0 }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual column */}
          <div>{visual}</div>
        </div>
      </div>
    </section>
  );
}
