"use client";

import { useState } from "react";
import { Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { IterationStatus } from "@/components/case-study/status-badge";
import { ImageLightbox } from "@/components/site/image-lightbox";

// The AI evolution as a "who does what" chart. Each row is one attempt;
// each column is one part of the job. A cell says who did that part: the
// user (neutral) or Clear AI (a soft warm tint). The last column says when
// the work was ready. Read down a column and the story tells itself: the
// review gate still left the reading with the user, and only the overnight
// version took the whole job off their hands before the day began.
//
// Uses the same quiet palette as the placement schematics so the two
// figures in this section read as one family. "See screen" (a ShadCN
// Button, link style) opens the real screen in the site lightbox.

type Who = "you" | "ai";

type Cell = { who: Who; text: string; flag?: boolean };

export type WorkSplitRow = {
  title: string;
  status: IterationStatus;
  outcome: string;
  cells: [Cell, Cell, Cell];
  ready: string;
  src: string;
  alt: string;
};

const COLUMNS = ["Reads the notice", "Fills the fields", "Checks the values", "Ready"];

function Chip({ cell }: { cell: Cell }) {
  const ai = cell.who === "ai";
  return (
    <div
      className={`flex items-start gap-2 rounded-md px-2.5 py-2 text-[13px] leading-[1.35] ${
        ai
          ? "bg-[#FBF5EC] text-[#6E4A1F] ring-1 ring-[#EBD9BE]"
          : cell.flag
            ? "bg-[#FBF0EE] text-[#8A4338] ring-1 ring-[#EDCFC9]"
            : "bg-[#F3F1ED] text-[#57564F] ring-1 ring-[#E5E2DC]"
      }`}
    >
      {ai ? (
        <Sparkles aria-hidden className="mt-[1px] size-3.5 shrink-0 text-[#B98545]" />
      ) : (
        <User aria-hidden className="mt-[1px] size-3.5 shrink-0 opacity-60" />
      )}
      <span>{cell.text}</span>
    </div>
  );
}

export function AiWorkSplit({
  rows,
  caption,
}: {
  rows: WorkSplitRow[];
  caption: string;
}) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const grid =
    "grid grid-cols-[minmax(170px,1.25fr)_repeat(3,minmax(0,1fr))_minmax(0,0.9fr)] gap-x-3";

  return (
    <figure className="my-8 md:my-10" style={{ marginLeft: 0, marginRight: 0 }}>
      {/* On phones the chart keeps its columns and scrolls sideways. */}
      <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
        <div className="min-w-[760px] rounded-xl border border-[#E5E2DC] bg-white">
          <div className={`${grid} border-b border-[#E5E2DC] px-5 py-3`}>
            <div />
            {COLUMNS.map((c) => (
              <div
                key={c}
                className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
              >
                {c}
              </div>
            ))}
          </div>

          {rows.map((row, i) => (
            <div
              key={row.title}
              className={`${grid} items-start px-5 py-4 ${
                i < rows.length - 1 ? "border-b border-[#EFEDE8]" : ""
              } ${row.status === "shipped" ? "rounded-b-xl bg-[#FDFBF7]" : ""}`}
            >
              <div className="flex flex-col items-start gap-1.5 pr-2">
                <p className="text-[15px] font-semibold leading-[1.3] text-[#1F1F1E]" style={{ margin: 0 }}>
                  {row.title}
                </p>
                <p className="text-[13px] leading-[1.45] text-[#6B6B68]" style={{ margin: 0 }}>
                  {row.outcome}
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-[12px] text-[#6B6B68] underline-offset-4"
                  onClick={() => setOpenAt(i)}
                >
                  See screen
                </Button>
              </div>
              {row.cells.map((cell, j) => (
                <Chip key={j} cell={cell} />
              ))}
              <div className="flex items-start pt-2 text-[13px] leading-[1.35] text-[#1F1F1E]">
                {row.ready}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-[#6B6B68]">
        <span className="flex items-center gap-1.5">
          <User aria-hidden className="size-3.5 opacity-60" /> The user
        </span>
        <span className="flex items-center gap-1.5">
          <Sparkles aria-hidden className="size-3.5 text-[#B98545]" /> Clear AI
        </span>
      </div>

      <figcaption className="text-[14px] text-[#6B6B68]" style={{ margin: 0, marginTop: "0.75rem" }}>
        {caption}
      </figcaption>

      <ImageLightbox
        open={openAt !== null}
        onOpenChange={(o) => !o && setOpenAt(null)}
        frames={rows.map((r) => r.src)}
        // Each screen gets its own line: the attempt and what it led to.
        captions={rows.map((r) => `${r.title}. ${r.outcome}`)}
        initialIndex={openAt ?? 0}
        caption={caption}
        title="Four ways to bring AI into the case"
      />
    </figure>
  );
}
