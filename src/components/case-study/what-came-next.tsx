import Link from "next/link";
import type { ReactNode } from "react";

// Closing section. By spec: NO uppercase label. The title carries it alone.
type WhatCameNextProps = {
  title: string;
  body: ReactNode;
  ctaLabel: string;
  ctaHref: string;
};

export function WhatCameNext({
  title,
  body,
  ctaLabel,
  ctaHref,
}: WhatCameNextProps) {
  return (
    <section
      className="px-6 md:px-12 py-10 md:py-14"
      style={{ backgroundColor: "#FAFAF9" }}
    >
      <div className="mx-auto max-w-[1080px]">
        <h2
          className="font-semibold text-[#1F1F1E] tracking-[-0.02em] leading-[1.15] mb-6"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2rem)" }}
        >
          {title}
        </h2>

        <div className="space-y-4 text-[17px] text-[#6B6B68] leading-[1.6]">
          {body}
        </div>

        <Link
          href={ctaHref}
          className="group inline-flex items-center gap-2 mt-8 text-[15px] font-medium text-[#1F1F1E] transition-colors duration-200 ease-out"
        >
          <span className="relative">
            {ctaLabel}
            <span
              aria-hidden
              className="absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-100 transition-colors duration-200"
              style={{ backgroundColor: "#E5E2DC" }}
            />
            <span
              aria-hidden
              className="absolute left-0 right-0 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100"
              style={{ backgroundColor: "#D97706" }}
            />
          </span>
          <span
            aria-hidden
            className="transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:text-[#D97706]"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
