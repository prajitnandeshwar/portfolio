"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// The Exhibition's own lightbox, on the shadcn Dialog (portal, scroll
// lock, Escape, focus moved in on open and returned on close). The case
// studies keep the shared ImageLightbox.
//
// A wide frame is fitted on screen whole, as large as the viewport
// allows. A tall frame (the scorecard) keeps its reading width and
// scrolls inside the card, since shrinking it to fit would make it
// unreadable.
//
// Pieces with more than one frame get arrows beside the image (hidden
// under 768px, where a swipe does the job), dots with a "1 of 2" count
// under the caption, and the left and right arrow keys. Frames crossfade
// over 200ms; with reduced motion they swap instantly.

const SWIPE_THRESHOLD = 60;
const SWIPE_VERT_BIAS = 1.5;

// Shared by the close and the arrow buttons: a ring at white 18% that
// firms to 35% on hover.
const RING_BUTTON =
  "grid place-items-center rounded-full border border-white/[0.18] text-white transition-[border-color,opacity] duration-200 ease-out hover:border-white/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70";

export function ExhibitionLightbox({
  open,
  onOpenChange,
  frames,
  caption,
  title,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  frames: string[];
  caption?: string;
  title: string;
}) {
  const [index, setIndex] = useState(0);
  // Whether each image is taller than wide, read as it loads. Kept per
  // image, so one tall piece never leaves the next one scrolling.
  const [tall, setTall] = useState<Record<string, boolean>>({});
  const portrait = !!(frames[0] && tall[frames[0]]);
  const multi = frames.length > 1;

  // Every opening starts on the first frame. Done during render, when
  // open flips, rather than in an effect, so there is no extra pass.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setIndex(0);
  }

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(frames.length - 1, i + 1));

  // Left and right arrows move between frames. Capture phase, because the
  // dialog handles keys on their way down and a bubbling listener never
  // hears them. Escape is left to the dialog.
  useEffect(() => {
    if (!open || !multi) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
      else if (e.key === "ArrowRight")
        setIndex((i) => Math.min(frames.length - 1, i + 1));
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open, multi, frames.length]);

  // A mostly horizontal drag past the threshold changes frame; vertical
  // drags are left to the card's own scroll.
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const start = dragStart.current;
    dragStart.current = null;
    if (!start || !multi) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * SWIPE_VERT_BIAS) {
      if (dx > 0) prev();
      else next();
    }
  };

  // The caption's first sentence is the piece's name: medium, full white.
  const split = caption ? caption.indexOf(". ") : -1;
  const lead = caption && split > -1 ? caption.slice(0, split + 1) : caption;
  const rest = caption && split > -1 ? caption.slice(split + 2) : "";

  // Room under the card for the caption, and the dots when there are any.
  const cardMaxHeight = multi ? "70vh" : "76vh";
  // With arrows beside the image (from 768px), the image leaves room for
  // a 44px button and its 72px gap on each side. Below 768px there are no
  // arrows, so it takes the full width.
  const fitMaxWidth = multi
    ? "max-w-[min(94vw,1600px)] min-[768px]:max-w-[min(94vw,1600px,calc(100vw-264px))]"
    : "max-w-[min(94vw,1600px)]";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        // Owns the whole viewport (see ImageLightbox for why each default
        // is overridden, sm:max-w-none in particular). A click on the dim
        // closes; clicks on the image, caption and controls do not.
        onClick={(e) => {
          if (!(e.target as HTMLElement).closest("[data-lightbox-keep]")) {
            onOpenChange(false);
          }
        }}
        className="fixed inset-0 top-0 left-0 z-[60] flex items-center justify-center translate-x-0 translate-y-0 max-w-none sm:max-w-none w-screen h-[100dvh] gap-0 rounded-none p-4 bg-black/75 ring-0"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {caption && (
          <DialogDescription className="sr-only">{caption}</DialogDescription>
        )}

        {/* Close: "Esc" then a ringed ✕, pinned to the viewport corner. */}
        <div
          data-lightbox-keep
          className="absolute top-4 right-4 z-[70] flex items-center gap-2.5"
        >
          <span aria-hidden className="text-[13px] text-white/55">
            Esc
          </span>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close image"
            className={`${RING_BUTTON} size-9`}
          >
            <X className="size-[18px]" strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex max-h-full max-w-full flex-col items-center">
          <div className="relative" data-lightbox-keep>
            {/* The frames share one grid cell, so the card sizes to them
                and a change of frame is a crossfade, not a reload. */}
            <div
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              className={`grid rounded-lg bg-white ${
                portrait ? "overflow-y-auto" : "overflow-hidden"
              }`}
              style={{
                maxHeight: cardMaxHeight,
                width: portrait ? "min(92vw, 1100px)" : undefined,
                touchAction: "pan-y",
              }}
            >
              {frames.map((src, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={src}
                  src={src}
                  alt={i === 0 ? title : `${title}, image ${i + 1}`}
                  aria-hidden={i !== index}
                  draggable={false}
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    const isTall = img.naturalHeight > img.naturalWidth;
                    setTall((t) => (t[src] === isTall ? t : { ...t, [src]: isTall }));
                  }}
                  className={`col-start-1 row-start-1 block select-none transition-opacity duration-200 ease-out motion-reduce:transition-none ${
                    portrait ? "h-auto w-full" : `h-auto w-auto ${fitMaxWidth}`
                  } ${i === index ? "opacity-100" : "opacity-0"}`}
                  style={
                    portrait ? { margin: 0 } : { margin: 0, maxHeight: cardMaxHeight }
                  }
                />
              ))}
            </div>

            {/* Arrows, 72px outside the image, vertically centred. From
                768px only; below that a swipe changes frame. */}
            {multi && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  disabled={index === 0}
                  aria-label="Previous image"
                  className={`${RING_BUTTON} absolute top-1/2 right-full mr-[72px] hidden size-11 -translate-y-1/2 disabled:opacity-35 min-[768px]:grid`}
                >
                  <ChevronLeft className="size-5" strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={index === frames.length - 1}
                  aria-label="Next image"
                  className={`${RING_BUTTON} absolute top-1/2 left-full ml-[72px] hidden size-11 -translate-y-1/2 disabled:opacity-35 min-[768px]:grid`}
                >
                  <ChevronRight className="size-5" strokeWidth={1.75} />
                </button>
              </>
            )}
          </div>

          {caption && (
            <p
              data-lightbox-keep
              className="mt-4 max-w-[720px] text-center text-[15px] leading-relaxed text-white/[0.82]"
            >
              <span className="font-medium text-white">{lead}</span>
              {rest && ` ${rest}`}
            </p>
          )}

          {multi && (
            <div
              data-lightbox-keep
              className="flex items-center gap-3"
              style={{ marginTop: 12 }}
            >
              <div className="flex items-center gap-1.5">
                {frames.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show image ${i + 1}`}
                    aria-current={i === index}
                    className={`h-1.5 rounded-full transition-[width,background-color] duration-200 ease-out ${
                      i === index ? "w-[18px] bg-[#C8783A]" : "w-1.5 bg-white/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[13px] tabular-nums text-white/50">
                {index + 1} of {frames.length}
              </span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
