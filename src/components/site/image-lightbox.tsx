"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

// ── Behavior summary ─────────────────────────────────────────────────
//
// Full-screen lightbox for product screenshots. Renders into a Base UI
// Dialog (via the ShadCN wrapper) so portal mounting, scroll lock, the
// backdrop, and Escape-to-close are handled for free.
//
// At scale = 1.0 the image is fit-to-width inside the viewport. Tall
// images extend below the fold and the container scrolls vertically.
// Pinch zooms in/out (range 1.0 to 4.0). Single-pointer drag pans the
// image when zoomed in, otherwise tracks horizontal intent to swipe to
// the next or previous frame. Double-tap toggles between 1.0 and 2.5x.
//
// The Dialog ring/padding default is reset because the lightbox owns
// the full viewport, not a card.

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;
const DOUBLE_TAP_MS = 300;
const SWIPE_THRESHOLD = 60;
const SWIPE_VERT_BIAS = 1.5;

type ImageLightboxProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // Either provide a list of image URLs (frames) or a single arbitrary
  // React node (eg. an inline SVG). When node is provided it renders
  // inside the same zoom/pan stage as frames would, so SVGs that need
  // to keep their fonts (Inter, in the case of the IA map) stay inline.
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
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Reset when a new lightbox session opens, or when the frame changes.
  useEffect(() => {
    if (open) {
      setIndex(initialIndex);
      setScale(1);
      setTx(0);
      setTy(0);
      // Show the pinch-to-zoom hint once per session, only on coarse
      // pointer devices (where pinch is actually possible).
      if (typeof window !== "undefined") {
        const isCoarse = window.matchMedia("(pointer: coarse)").matches;
        const shown = sessionStorage.getItem("lightbox-hint-shown") === "1";
        if (isCoarse && !shown) {
          setShowHint(true);
          sessionStorage.setItem("lightbox-hint-shown", "1");
          // Fade after 2.5s if the visitor has not interacted.
          const t = window.setTimeout(() => setShowHint(false), 2500);
          return () => window.clearTimeout(t);
        }
      }
    }
  }, [open, initialIndex]);

  // Reset zoom/pan whenever the active frame changes mid-session.
  useEffect(() => {
    setScale(1);
    setTx(0);
    setTy(0);
  }, [index]);

  // Keyboard: ArrowLeft / ArrowRight changes frame (in addition to Escape
  // which Dialog already handles).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (frames.length < 2) return;
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
      else if (e.key === "ArrowRight")
        setIndex((i) => Math.min(frames.length - 1, i + 1));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, frames.length]);

  // ── Gesture handling ────────────────────────────────────────────────
  // Live pointers are kept in a ref-backed map keyed by pointerId. We
  // never want gestures to re-render on every move; React state is only
  // updated when the visible transform actually changes.
  const stageRef = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gestureStart = useRef<{
    distance: number;
    scale: number;
    tx: number;
    ty: number;
    midX: number;
    midY: number;
  } | null>(null);
  const dragStart = useRef<{
    x: number;
    y: number;
    tx: number;
    ty: number;
    totalDx: number;
    totalDy: number;
  } | null>(null);
  const lastTap = useRef<{ time: number; x: number; y: number } | null>(null);

  const dismissHint = () => {
    if (showHint) setShowHint(false);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dismissHint();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2) {
      // Start of pinch. Lock in current geometry.
      const [a, b] = Array.from(pointers.current.values());
      gestureStart.current = {
        distance: Math.hypot(b.x - a.x, b.y - a.y),
        scale,
        tx,
        ty,
        midX: (a.x + b.x) / 2,
        midY: (a.y + b.y) / 2,
      };
      dragStart.current = null;
    } else if (pointers.current.size === 1) {
      // Single-pointer interaction. Could become pan, swipe, or tap.
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        tx,
        ty,
        totalDx: 0,
        totalDy: 0,
      };
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && gestureStart.current) {
      // Pinch. Update scale based on distance ratio. Translate so the
      // pinch midpoint stays under the user's fingers.
      const [a, b] = Array.from(pointers.current.values());
      const d = Math.hypot(b.x - a.x, b.y - a.y);
      const ratio = d / gestureStart.current.distance;
      const next = Math.max(
        MIN_SCALE * 0.85,
        Math.min(MAX_SCALE, gestureStart.current.scale * ratio),
      );
      const rect = stageRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const mx = gestureStart.current.midX - cx;
      const my = gestureStart.current.midY - cy;
      const k = next / gestureStart.current.scale;
      setScale(next);
      setTx(mx + (gestureStart.current.tx - mx) * k);
      setTy(my + (gestureStart.current.ty - my) * k);
    } else if (pointers.current.size === 1 && dragStart.current) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      dragStart.current.totalDx = dx;
      dragStart.current.totalDy = dy;

      if (scale > 1.01) {
        // Pan freely. Clamp loosely so the image cannot drift entirely
        // off-screen.
        const rect = stageRef.current?.getBoundingClientRect();
        if (!rect) return;
        const maxX = (rect.width * (scale - 1)) / 2;
        const maxY = (rect.height * (scale - 1)) / 2;
        const newTx = dragStart.current.tx + dx;
        const newTy = dragStart.current.ty + dy;
        setTx(Math.max(-maxX, Math.min(maxX, newTx)));
        setTy(Math.max(-maxY, Math.min(maxY, newTy)));
      }
      // At scale = 1 we do not move the image on drag. The pointerup
      // handler decides if the drag was a horizontal swipe-to-frame.
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const wasPinching = pointers.current.size === 2;
    pointers.current.delete(e.pointerId);

    if (wasPinching && pointers.current.size < 2) {
      gestureStart.current = null;
      // Snap scale back into [MIN_SCALE, MAX_SCALE] if it drifted below 1
      // during a pinch-out.
      if (scale < MIN_SCALE) {
        setScale(MIN_SCALE);
        setTx(0);
        setTy(0);
      }
      return;
    }

    if (dragStart.current) {
      const { totalDx, totalDy } = dragStart.current;
      const adx = Math.abs(totalDx);
      const ady = Math.abs(totalDy);
      const isTap = adx < 8 && ady < 8;

      // Double-tap toggle.
      if (isTap) {
        const now = performance.now();
        const last = lastTap.current;
        if (
          last &&
          now - last.time < DOUBLE_TAP_MS &&
          Math.hypot(e.clientX - last.x, e.clientY - last.y) < 30
        ) {
          if (scale > 1.01) {
            setScale(1);
            setTx(0);
            setTy(0);
          } else {
            // Zoom toward the tapped point.
            const rect = stageRef.current?.getBoundingClientRect();
            if (rect) {
              const cx = rect.left + rect.width / 2;
              const cy = rect.top + rect.height / 2;
              const k = DOUBLE_TAP_SCALE;
              setScale(k);
              setTx((cx - e.clientX) * (k - 1));
              setTy((cy - e.clientY) * (k - 1));
            } else {
              setScale(DOUBLE_TAP_SCALE);
            }
          }
          lastTap.current = null;
        } else {
          lastTap.current = { time: now, x: e.clientX, y: e.clientY };
        }
      } else if (scale <= 1.01 && frames.length > 1) {
        // Horizontal-dominant swipe at fit-to-width switches frames.
        if (adx > SWIPE_THRESHOLD && adx > ady * SWIPE_VERT_BIAS) {
          if (totalDx > 0 && index > 0) {
            setIndex((i) => i - 1);
          } else if (totalDx < 0 && index < frames.length - 1) {
            setIndex((i) => i + 1);
          }
        }
      }
      dragStart.current = null;
    }
  };

  const onWheel = (e: React.WheelEvent) => {
    // Trackpad pinch reports as a wheel event with ctrlKey set. Map it to
    // a small scale delta so desktop visitors can zoom too.
    if (!e.ctrlKey) return;
    e.preventDefault();
    const next = Math.max(
      MIN_SCALE,
      Math.min(MAX_SCALE, scale - e.deltaY * 0.01),
    );
    setScale(next);
    if (next <= 1.01) {
      setTx(0);
      setTy(0);
    }
  };

  const hasFrames = frames.length > 0;
  const multiFrame = frames.length > 1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        // Override every DialogContent default so it owns the full
        // viewport: no card padding, no ring, no max-width, no centered
        // translate. The stage sits inside.
        className="fixed inset-0 top-0 left-0 z-[60] grid translate-x-0 translate-y-0 max-w-none w-screen h-[100dvh] gap-0 rounded-none p-0 bg-black/95 ring-0 overflow-hidden"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {caption && (
          <DialogDescription className="sr-only">{caption}</DialogDescription>
        )}

        {/* Close X, 44px tap target, top-right. */}
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Close image"
          className="tap justify-center absolute top-3 right-3 z-[70] text-white/75 hover:text-[#D97706] transition-colors"
        >
          <X className="size-6" strokeWidth={1.75} />
        </button>

        {/* Gesture stage. The image lives inside an inner transform
            wrapper so scale and translate compose cleanly. touch-action
            is none so the browser does not steal pinch or pan from us. */}
        <div
          ref={stageRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onWheel={onWheel}
          className="relative w-full h-full overflow-auto flex items-start justify-center px-0 py-0"
          style={{ touchAction: "none" }}
        >
          {node ? (
            <div
              className="origin-center will-change-transform select-none w-full"
              style={{
                transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
              }}
            >
              {node}
            </div>
          ) : hasFrames ? (
            <div
              className="origin-center will-change-transform select-none pointer-events-none w-full"
              style={{
                transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={frames[index]}
                src={frames[index]}
                alt={title}
                draggable={false}
                className="block w-full h-auto select-none"
                style={{ margin: 0 }}
              />
            </div>
          ) : (
            <p className="text-white/70 m-auto">No image to display.</p>
          )}
        </div>

        {/* Persistent caption pinned to the bottom. */}
        {caption && (
          <p
            className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[65] max-w-[min(640px,calc(100vw-32px))] text-center text-[13px] md:text-[14px] leading-relaxed text-white/80 px-4 py-2 rounded-md pointer-events-none"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.45)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              margin: 0,
            }}
          >
            {caption}
          </p>
        )}

        {/* First-touch hint. Fades 2.5s after open or on first gesture. */}
        {showHint && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[65] text-white/85 text-sm rounded-full px-4 py-2 pointer-events-none"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.55)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            Pinch to zoom, double-tap to reset
          </div>
        )}

        {/* Frame navigation: prev, dots, next. Always visible when there
            are multiple frames, including on desktop for keyboard/mouse
            visitors. Hidden when only one frame. */}
        {multiFrame && (
          <div
            className={`absolute z-[65] flex items-center gap-4 text-white/80 ${
              caption ? "bottom-16" : "bottom-4"
            } left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full`}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.55)",
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
      </DialogContent>
    </Dialog>
  );
}
