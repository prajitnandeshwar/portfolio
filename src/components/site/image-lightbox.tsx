"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Centered floating image on a translucent dim overlay. Built on a
// ShadCN Dialog (Base UI portal, scroll lock, Escape, focus return).
//
// Design intent: the image floats inside a rounded card; the rest of
// the viewport stays dimmed but partially visible. Tall screenshots
// scroll vertically inside the card via native overflow. Multi-frame
// tiles get a prev / dots / next strip at the bottom of the viewport.
// Horizontal swipe at the card edge advances frames.

const SWIPE_THRESHOLD = 60;
const SWIPE_VERT_BIAS = 1.5;

type ImageLightboxProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // Either provide a list of image URLs (frames) or a single arbitrary
  // React node (eg. an inline SVG). When node is provided it renders
  // inside the same card, so SVGs that need to keep their fonts (Inter,
  // for the IA map) stay inline rather than being rasterised.
  frames?: string[];
  node?: ReactNode;
  caption?: string;
  initialIndex?: number;
  // Optional: short label used for the (visually hidden) dialog title.
  // Required for accessibility; falls back to "Image preview".
  title?: string;
};

export function ImageLightbox({
  open,
  onOpenChange,
  frames = [],
  node,
  caption,
  initialIndex = 0,
  title = "Image preview",
}: ImageLightboxProps) {
  const [index, setIndex] = useState(initialIndex);

  // Reset to the first frame whenever a new lightbox session opens.
  useEffect(() => {
    if (open) setIndex(initialIndex);
  }, [open, initialIndex]);

  // Keyboard navigation. Escape is handled by Dialog itself.
  useEffect(() => {
    if (!open || frames.length < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
      else if (e.key === "ArrowRight")
        setIndex((i) => Math.min(frames.length - 1, i + 1));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, frames.length]);

  // Horizontal swipe to advance frames. Tracks total pointer movement
  // from down to up; if dominantly horizontal past the threshold, the
  // frame changes. Vertical drags are ignored (the card scrolls
  // natively in that case).
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragStart.current || frames.length < 2) {
      dragStart.current = null;
      return;
    }
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    const adx = Math.abs(dx);
    const ady = Math.abs(dy);
    if (adx > SWIPE_THRESHOLD && adx > ady * SWIPE_VERT_BIAS) {
      if (dx > 0 && index > 0) {
        setIndex((i) => i - 1);
      } else if (dx < 0 && index < frames.length - 1) {
        setIndex((i) => i + 1);
      }
    }
    dragStart.current = null;
  };

  const hasFrames = frames.length > 0;
  const multiFrame = frames.length > 1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        // Override DialogContent defaults so it owns the full viewport:
        // no card padding, no max-width, no ring, no centered translate.
        // The actual visible card sits inside.
        className="fixed inset-0 top-0 left-0 z-[60] flex items-center justify-center translate-x-0 translate-y-0 max-w-none w-screen h-[100dvh] gap-0 rounded-none p-4 bg-black/75 ring-0"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {caption && (
          <DialogDescription className="sr-only">{caption}</DialogDescription>
        )}

        {/* Close X, 44px tap target, anchored to the viewport corner so
            it never moves with the card. */}
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Close image"
          className="tap justify-center absolute top-3 right-3 z-[70] text-white/85 hover:text-[#D97706] transition-colors"
        >
          <X className="size-6" strokeWidth={1.75} />
        </button>

        {/* Centred floating card. Width caps at 92vw or 1100px; height
            caps so caption and nav have room below. Tall images scroll
            vertically inside via native overflow. */}
        <div
          className="flex flex-col items-center gap-4 max-h-full max-w-full"
          style={{ width: "min(92vw, 1100px)" }}
        >
          <div
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="relative w-full rounded-lg bg-white overflow-y-auto"
            style={{
              maxHeight: multiFrame || caption ? "72vh" : "82vh",
              touchAction: "pan-y",
            }}
          >
            {node ? (
              <div className="w-full">{node}</div>
            ) : hasFrames ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={frames[index]}
                src={frames[index]}
                alt={title}
                draggable={false}
                className="block w-full h-auto select-none"
                style={{ margin: 0 }}
              />
            ) : (
              <p className="text-[#6B6B68] p-6 text-center">
                No image to display.
              </p>
            )}
          </div>

          {/* Caption sits under the card on the dim backdrop. */}
          {caption && (
            <p
              className="text-white/85 text-[13px] md:text-[14px] text-center leading-relaxed max-w-2xl"
              style={{ margin: 0 }}
            >
              {caption}
            </p>
          )}

          {/* Multi-frame nav: prev / dots / next strip below the
              caption. Hidden when there is only one frame. */}
          {multiFrame && (
            <div
              className="flex items-center gap-4 text-white/80 px-3 py-1.5 rounded-full"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.45)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              <button
                type="button"
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                disabled={index === 0}
                aria-label="Previous frame"
                className="tap justify-center disabled:opacity-25 hover:text-white transition-colors"
              >
                <ChevronLeft className="size-5" strokeWidth={1.75} />
              </button>
              <div className="flex items-center gap-1.5">
                {frames.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to frame ${i + 1}`}
                    className="tap justify-center"
                  >
                    <span
                      className={`block size-1.5 rounded-full transition-colors ${
                        i === index ? "bg-white" : "bg-white/35"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  setIndex((i) => Math.min(frames.length - 1, i + 1))
                }
                disabled={index === frames.length - 1}
                aria-label="Next frame"
                className="tap justify-center disabled:opacity-25 hover:text-white transition-colors"
              >
                <ChevronRight className="size-5" strokeWidth={1.75} />
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
