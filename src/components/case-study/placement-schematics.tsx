"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { type IterationStatus } from "@/components/case-study/status-badge";
import { ImageLightbox } from "@/components/site/image-lightbox";

// Five places the AI reading could live, drawn as small layout sketches.
// Real screenshots of these all look alike; the sketch shows the one thing
// that changed: where the AI block (sparkle) sits relative to the
// documents (white sheets with grey text lines).
//
// Each tile opens the real screen in the lightbox. Hover lifts the tile
// (a little larger, a deeper shadow) so it reads as clickable.
//
// Some placements were a flow, not one screen (click, wait, read). In the
// lightbox those play in place as a looping animation with a step strip
// under them; the arrows move between the five placements only.
//
// Palette (matched to the Figma frame): neutral grey wireframes. A tile
// marked shipped turns warm (none of these five did: the shipped Clear AI
// panel is shown in the AI sequence further down).

type Layout = "underPdf" | "compareDocs" | "button" | "chat" | "panelTop";

type Screen = {
  // Short name for the state, when a placement has more than one.
  step?: string;
  src: string;
  alt: string;
  // What the screen shows, in one line, for the lightbox.
  caption: string;
};

type Placement = {
  layout: Layout;
  label: string;
  status: IterationStatus;
  verdict: string;
  screens: readonly Screen[];
};

function Doc({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col gap-[5px] rounded-[4px] bg-white px-2 py-2 ring-1 ring-[#E3E0DA] ${className}`}
    >
      <div className="h-[3px] w-2/3 rounded-full bg-[#D1D1D6]" />
      <div className="h-[3px] w-full rounded-full bg-[#EBEBEC]" />
      <div className="h-[3px] w-5/6 rounded-full bg-[#EBEBEC]" />
      <div className="h-[3px] w-3/4 rounded-full bg-[#EBEBEC]" />
    </div>
  );
}

function Ai({
  className = "",
  compact = false,
  onTint = false,
}: {
  className?: string;
  compact?: boolean;
  // True inside the shipped (warm) tile: the block turns white.
  onTint?: boolean;
}) {
  return (
    <div
      className={`flex gap-1.5 rounded-[4px] px-2 py-1.5 ring-1 ring-[#E3E0DA] ${
        onTint ? "bg-white" : "bg-[#EBEBEC]"
      } ${
        compact ? "items-center" : "flex-col"
      } ${className}`}
    >
      <Sparkles aria-hidden className="size-3 shrink-0 text-[#B6B6BF]" />
      {!compact && (
        <>
          <div className="h-[3px] w-4/5 rounded-full bg-[#B6B6BF]" />
          <div className="h-[3px] w-3/5 rounded-full bg-[#B6B6BF]" />
        </>
      )}
      {compact && <div className="h-[3px] flex-1 rounded-full bg-[#B6B6BF]" />}
    </div>
  );
}

function Sketch({ layout }: { layout: Layout }) {
  const frame = "h-full w-full p-3 gap-2";
  switch (layout) {
    case "underPdf":
      return (
        <div className={`${frame} flex flex-col`}>
          <Doc className="flex-[3]" />
          <Ai className="flex-[1.2]" />
        </div>
      );
    case "compareDocs":
      return (
        <div className={`${frame} grid grid-cols-2 grid-rows-[3fr_1.2fr]`}>
          <Doc />
          <Doc />
          <Ai className="col-span-2" />
        </div>
      );
    case "button":
      return (
        <div className={`${frame} flex flex-col`}>
          <Ai compact className="w-3/5 rounded-full" />
          <Doc className="flex-1" />
        </div>
      );
    case "chat":
      return (
        <div className={`${frame} grid grid-cols-[1.6fr_1fr]`}>
          <Doc />
          <div className="flex flex-col justify-end gap-1.5 rounded-[4px] bg-white p-1.5 ring-1 ring-[#E3E0DA]">
            <Ai compact className="mr-3" />
            <div className="ml-3 h-3 rounded-[4px] bg-[#EBEBEC]" />
          </div>
        </div>
      );
    case "panelTop":
      return (
        <div className={`${frame} flex flex-col`}>
          <Ai className="flex-[1.2]" />
          <Doc className="flex-[3]" />
        </div>
      );
  }
}

export function PlacementSchematics({
  placements,
  caption,
}: {
  placements: readonly Placement[];
  caption: string;
}) {
  const [openAt, setOpenAt] = useState<number | null>(null);

  // One lightbox item per placement. A placement that was a flow (click,
  // wait, read) plays its screens in place as a short animation, rather
  // than each state showing up as a separate item.
  const frames = placements.map((p) => p.screens[0].src);
  const captions = placements.map((p) => `${p.label}. ${p.screens[0].caption}`);
  const steps = placements.map((p) =>
    p.screens.length > 1
      ? p.screens.map((s, i) => ({
          src: s.src,
          label: s.step ?? `Step ${i + 1}`,
          caption: `${p.label}, ${(s.step ?? `step ${i + 1}`).toLowerCase()}. ${s.caption}`,
        }))
      : undefined,
  );

  return (
    <figure className="my-8 md:my-10" style={{ marginLeft: 0, marginRight: 0 }}>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-5 md:gap-x-5">
        {placements.map((p, i) => {
          const shipped = p.status === "shipped";
          return (
            <div key={p.label}>
              <button
                type="button"
                onClick={() => setOpenAt(i)}
                aria-label={`Open the real screen: ${p.screens[0].alt}`}
                className={`block w-full cursor-zoom-in rounded-lg transition-[transform,box-shadow,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.04] hover:shadow-[0_10px_24px_-6px_rgba(31,31,30,0.18),0_2px_6px_rgba(31,31,30,0.06)] focus-visible:-translate-y-0.5 focus-visible:scale-[1.04] focus-visible:shadow-[0_10px_24px_-6px_rgba(31,31,30,0.18)] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 ${
                  shipped
                    ? "bg-[#FBF7F0] ring-1 ring-[#E6CFAC]"
                    : "bg-[#F4F4F5] hover:bg-[#F7F7F8]"
                }`}
                style={{ aspectRatio: "4/3", margin: 0 }}
              >
                <Sketch layout={p.layout} />
              </button>
              <div className="mt-3 flex flex-col items-start gap-1">
                <p className="text-[14px] font-semibold leading-[1.3] text-[#1F1F1E]" style={{ margin: 0 }}>
                  {p.label}
                </p>
                <p className="text-[13px] leading-[1.45] text-[#6B6B68]" style={{ margin: 0 }}>
                  {p.verdict}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <figcaption className="text-[14px] text-[#6B6B68]" style={{ margin: 0, marginTop: "1.25rem" }}>
        {caption}
      </figcaption>

      <ImageLightbox
        open={openAt !== null}
        onOpenChange={(o) => !o && setOpenAt(null)}
        frames={frames}
        captions={captions}
        steps={steps}
        initialIndex={openAt ?? 0}
        caption={caption}
        title="Five placements for the AI reading"
      />
    </figure>
  );
}
