import type { ReactNode } from "react";

// Page shell for a long-form case study: the cream page colour and ink
// text that every case study sits on.
//
// Everything inside uses the shared section components, so a case study is
// a stack of full width CaseStudySection blocks rather than its own
// layout. Notice Tracker can move onto this shell unchanged.
export function CaseStudyLayout({ children }: { children: ReactNode }) {
  return (
    <main
      className="case-study flex-1"
      style={{ backgroundColor: "#FAFAF9", color: "#1F1F1E" }}
    >
      {children}
    </main>
  );
}

// A subhead inside a section, one step below the section title. Same 20px
// semibold as the takeaway headings, so the page only ever uses three
// heading sizes.
export function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-[20px] font-semibold text-[#1F1F1E] tracking-[-0.01em] leading-[1.3] mt-12 mb-4">
      {children}
    </h3>
  );
}
