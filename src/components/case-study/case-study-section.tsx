import type { ReactNode } from "react";

// Section title only. By design, no `label` prop (no uppercase labels above
// section titles). Tighter padding per the latest spec.
type CaseStudySectionProps = {
  title: string;
  children: ReactNode;
  id?: string;
};

export function CaseStudySection({
  title,
  children,
  id,
}: CaseStudySectionProps) {
  return (
    <section id={id} className="px-6 md:px-12 py-10 md:py-14">
      <div className="mx-auto max-w-[1080px]">
        <h2
          className="font-semibold tracking-[-0.02em] leading-[1.15] text-[#1F1F1E] mb-6"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2rem)" }}
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

// Body prose container. Paragraphs separated by 16px (space-y-4) per spec.
// 17px / weight 400. Line-height tightens on desktop where the eye scans
// shorter line segments, loosens on mobile for thumb-distance reading.
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 text-[17px] text-[#6B6B68] leading-[1.7] md:leading-[1.6]">
      {children}
    </div>
  );
}

// Lead paragraph. One step up from Prose: 19px, ink colour, sets the
// register for a section's opening line. Used sparingly, no more than
// once or twice per section.
export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="text-[19px] text-[#1F1F1E] leading-[1.55] mb-4 last:mb-0">
      {children}
    </p>
  );
}

// Pull quote. Larger weight, left-bordered, breaks the rhythm of the
// surrounding prose. Use when a single sentence should pause the reader.
export function Pull({ children }: { children: ReactNode }) {
  return (
    <p
      className="text-[21px] font-semibold text-[#1F1F1E] leading-[1.45] my-7 pl-5"
      style={{ borderLeft: "3px solid #1F1F1E", margin: "1.75rem 0" }}
    >
      {children}
    </p>
  );
}

// Inline emphasis: 600 weight, --text colour. Never a different size.
export function Em({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-[#1F1F1E]">{children}</strong>;
}
