import type { ReactNode } from "react";
import { BackToWork } from "./back-to-work";

// Closing section. By spec: NO uppercase label. The title carries it alone.
type WhatCameNextProps = {
  title: string;
  body: ReactNode;
  // Optional card for the next case study, shown above the link.
  next?: ReactNode;
};

export function WhatCameNext({
  title,
  body,
  next,
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

        {next && <div style={{ marginTop: "2.5rem" }}>{next}</div>}

        <BackToWork />
      </div>
    </section>
  );
}

