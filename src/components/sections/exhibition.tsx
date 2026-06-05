"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ── Data ─────────────────────────────────────────────────────────────

type Tile = {
  id: string;
  name: string;
  year: string;
  color: string;
  image?: string;
  hoverImage?: string;
  // Tall screenshots are top-anchored by default so the page header shows
  // in the cropped tile. Set explicitly to override for a single tile.
  objectPosition?: string;
  // Optional CSS scale to push baked-in shadow margins past the tile edge.
  // Used when the source PNG has transparent padding around its content
  // (eg device-shadow exports). Lightbox is unaffected.
  imageScale?: number;
  lightboxCaption: string;
};

const tiles: Tile[] = [
  {
    id: "payment-rec",
    name: "Payment Recommendations",
    year: "2024",
    color: "#F5F2EE",
    image: "/work/payment-recommendations/closed.png",
    hoverImage: "/work/payment-recommendations/open.png",
    lightboxCaption:
      "Max ITC payment recommendations. Block, release, and audit vendor invoices across thousands of vouchers.",
  },
  {
    id: "ims-vs-pr",
    name: "IMS vs PR Reconciliation",
    year: "2024",
    color: "#F0F2F5",
    image: "/exhibition/ims-vs-pr-reconciliation.png",
    lightboxCaption:
      "GST reconciliation. Matching invoices to vendor returns across millions of rows, with action recommendations.",
  },
  {
    id: "poc-compliance",
    name: "POC Compliance Dashboard",
    year: "2025",
    color: "#EEF1F4",
    image: "/exhibition/poc-compliance-dashboard.png",
    lightboxCaption:
      "Compliance health POC. Surfacing patterns across past and future notices.",
  },
  {
    id: "compliance-scorecard",
    name: "Compliance Scorecard",
    year: "2024",
    color: "#E8E3DD",
    image: "/exhibition/compliance-scorecard.png",
    // Source PNG has ~64px transparent shadow margin on each side. The 5%
    // scale pushes those margins past the tile edge so content sits flush.
    imageScale: 1.05,
    lightboxCaption:
      "Compliance Score. A single number that distills risk across entities.",
  },
];

const TILE_ASPECT = "16/9";
// 16:9 matches the source screenshots (old.png 2734×1538, new.png 2732×1536,
// both ratio ≈ 1.778). Aligning container aspect to the source aspect means
// neither image gets cropped by object-cover, so they sit pixel-for-pixel
// flush against each other across the divider.
const SLIDER_ASPECT = "16/9";

const LP0_CAPTION = {
  name: "Clear Compliance Cloud landing, restructured",
  year: "2025",
};

// ── Section ──────────────────────────────────────────────────────────

export function Exhibition() {
  const [openTileId, setOpenTileId] = useState<string | null>(null);
  const openTile = tiles.find((t) => t.id === openTileId) ?? null;

  // ?demo=exhibition-hover-<id> forces a single tile (or "lp0") into hover
  // state for screenshot capture. id matches a tile.id or the string "lp0".
  const [demoHoverId, setDemoHoverId] = useState<string | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const demo = params.get("demo");
    const prefix = "exhibition-hover-";
    if (demo?.startsWith(prefix)) setDemoHoverId(demo.slice(prefix.length));

    // ?openLightbox=<tile-id> auto-opens the lightbox for capture/verification.
    const openId = params.get("openLightbox");
    if (openId) setOpenTileId(openId);
  }, []);

  return (
    <section
      id="exhibition"
      className="px-6 md:px-10 py-24 md:py-32 border-t border-border bg-surface"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 max-w-3xl">
          <div className="text-[12px] uppercase tracking-[0.14em] text-muted-foreground mb-3">
            UI exhibition
          </div>
          <h2 className="section-title" style={{ margin: 0 }}>
            A few interface moments, lifted out of context.
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl">
            Pieces I am proud of, from products that shipped and some that did not.
          </p>
        </div>

        {/* Row 1: LP0 before/after slider. Self-contained figure with its
            own max-width, gallery shadow, and external caption */}
        <LP0Slider />

        {/* Rows 2+: uniform 2-column grid, every tile 16:10 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {tiles.map((tile) => (
            <TileCard
              key={tile.id}
              tile={tile}
              forceHover={demoHoverId === tile.id}
              onOpen={() => setOpenTileId(tile.id)}
            />
          ))}
        </div>
      </div>

      <Lightbox tile={openTile} onClose={() => setOpenTileId(null)} />
    </section>
  );
}

// ── Caption overlay (shared by tiles + slider) ───────────────────────

function HoverCaption({
  name,
  year,
  forceVisible = false,
}: {
  name: string;
  year: string;
  forceVisible?: boolean;
}) {
  // The gradient sits in the bottom 30% of the tile, fading from transparent
  // at the top to ~50% black at the bottom. Text rides the gradient at
  // bottom-left with 24px padding.
  const visibilityClasses = forceVisible
    ? "opacity-100"
    : "opacity-0 group-hover:opacity-100";
  return (
    <div
      aria-hidden
      className={`absolute inset-x-0 bottom-0 h-[30%] pointer-events-none transition-opacity duration-[400ms] ease-in-out ${visibilityClasses}`}
      style={{
        backgroundImage:
          "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%)",
      }}
    >
      {/* Caption uses a layered text-shadow so the white type stays legible
          on light screenshots without forcing a heavy gradient over the
          image. Same black overlay color, applied per glyph instead of as
          a wash. */}
      <div
        className="absolute bottom-6 left-6 flex items-baseline gap-1.5"
        style={{
          textShadow:
            "0 1px 2px rgba(0,0,0,0.6), 0 0 14px rgba(0,0,0,0.45)",
        }}
      >
        <span className="text-white font-medium text-[15px] tracking-tight">
          {name}
        </span>
        <span className="text-white/85 font-normal text-[13px]">·</span>
        <span className="text-white/85 font-normal text-[13px]">{year}</span>
      </div>
    </div>
  );
}

// ── Tile ─────────────────────────────────────────────────────────────

function TileCard({
  tile,
  forceHover,
  onOpen,
}: {
  tile: Tile;
  forceHover: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-force-hover={forceHover || undefined}
      className="group relative block w-full text-left"
      aria-label={`Open ${tile.name}`}
    >
      <div
        style={{ backgroundColor: tile.color, aspectRatio: TILE_ASPECT }}
        className={`relative w-full rounded-lg border border-border overflow-hidden cursor-pointer transition-[transform,box-shadow] duration-[400ms] ease-in-out shadow-[var(--frame-shadow)] group-hover:scale-[1.02] group-hover:shadow-[var(--frame-shadow-hover)] ${
          forceHover
            ? "scale-[1.02] shadow-[var(--frame-shadow-hover)]"
            : ""
        }`}
      >
        {tile.image && (
          <Image
            src={tile.image}
            alt={tile.name}
            fill
            sizes="(max-width: 768px) 100vw, 540px"
            className="object-cover select-none pointer-events-none"
            style={{
              objectPosition: tile.objectPosition ?? "top",
              transform: tile.imageScale ? `scale(${tile.imageScale})` : undefined,
              transformOrigin: "top center",
            }}
            draggable={false}
          />
        )}

        {tile.hoverImage && (
          <Image
            src={tile.hoverImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 540px"
            className={`object-cover select-none pointer-events-none opacity-0 transition-opacity duration-[400ms] ease-in-out group-hover:opacity-100 pointer-coarse:opacity-100 ${
              forceHover ? "opacity-100" : ""
            }`}
            style={{
              objectPosition: tile.objectPosition ?? "top",
              transform: tile.imageScale ? `scale(${tile.imageScale})` : undefined,
              transformOrigin: "top center",
            }}
            draggable={false}
          />
        )}

        <HoverCaption
          name={tile.name}
          year={tile.year}
          // Hover-only across all tiles for consistent behaviour. Both image
          // tiles and placeholder colour tiles reveal caption + gradient on
          // hover only.
          forceVisible={forceHover}
        />
      </div>
    </button>
  );
}

// ── LP0 Slider ───────────────────────────────────────────────────────

function LP0Slider() {
  // The divider is animated via rAF + lerp: each frame the displayed position
  // moves 15% of the remaining distance toward the cursor's target. Gives the
  // drag a subtle "follow" feel instead of pixel-locking to the cursor.
  const [displayPos, setDisplayPos] = useState(50);

  const targetRef = useRef(50);
  const animRef = useRef(50);
  const rafRef = useRef<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [isCoarse, setIsCoarse] = useState(false);

  // Discovery hint: a 50 to 60 to 40 to 50 sway over 1.6s. Plays on each
  // proper-in-view entry until the user interacts, then never again.
  // armedRef flips true on each entry below 0.15 then above 0.55.
  // isHintingRef guards against stacking if the user scrolls in and out
  // during a sway. hasInteractedRef permanently suppresses the hint once
  // the visitor makes any real input.
  const armedRef = useRef(true);
  const isHintingRef = useRef(false);
  const hasInteractedRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setIsCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    if (reduceMotion) return;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const tween = (
      from: number,
      to: number,
      durationMs: number,
      ease: (t: number) => number,
    ) =>
      new Promise<void>((resolve) => {
        const start = performance.now();
        const step = (now: number) => {
          // Any interaction or active drag aborts the in-flight sway.
          if (hasInteractedRef.current || draggingRef.current) {
            resolve();
            return;
          }
          const t = Math.min((now - start) / durationMs, 1);
          const v = from + (to - from) * ease(t);
          animRef.current = v;
          targetRef.current = v;
          setDisplayPos(v);
          if (t < 1) requestAnimationFrame(step);
          else resolve();
        };
        requestAnimationFrame(step);
      });

    const playHint = async () => {
      if (isHintingRef.current) return;
      if (hasInteractedRef.current) return;
      if (draggingRef.current) return;
      isHintingRef.current = true;
      armedRef.current = false;
      try {
        await tween(50, 60, 400, easeOut);
        await tween(60, 40, 700, easeInOut);
        await tween(40, 50, 500, easeInOut);
      } finally {
        isHintingRef.current = false;
      }
    };

    // Two thresholds: 0.55 to fire on proper in-view, 0.15 to re-arm only
    // after the slider has clearly left the viewport. The padding between
    // them avoids twitchy restarts on small scroll jitters near the edge.
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const ratio = entry.intersectionRatio;
        if (ratio >= 0.55 && armedRef.current) {
          playHint();
        } else if (ratio <= 0.15) {
          armedRef.current = true;
        }
      },
      { threshold: [0, 0.15, 0.55, 1] },
    );

    observerRef.current = observer;
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [reduceMotion]);

  // rAF loop: lerp current toward target. Stops when close enough.
  useEffect(() => {
    const step = () => {
      const diff = targetRef.current - animRef.current;
      if (Math.abs(diff) < 0.05) {
        animRef.current = targetRef.current;
        setDisplayPos(animRef.current);
        rafRef.current = null;
        return;
      }
      animRef.current += diff * 0.15;
      setDisplayPos(animRef.current);
      rafRef.current = requestAnimationFrame(step);
    };

    const requestStep = () => {
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(step);
    };

    const updateTarget = (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      targetRef.current = (x / rect.width) * 100;
      requestStep();
    };

    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      updateTarget(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };

    // Attach updateTarget through the closure via a ref so handlePointerDown
    // can use it too.
    (containerRef.current as unknown as { _updateTarget?: (x: number) => void } | null)
      ?._updateTarget;
    (containerRef.current as unknown as { _updateTarget?: (x: number) => void } | null) &&
      ((containerRef.current as unknown as { _updateTarget: (x: number) => void })._updateTarget =
        updateTarget);

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    // First real input permanently suppresses the hint. Setting the flag
    // also aborts any in-flight sway on the next rAF step. Hovering does
    // not get here, since it never fires pointerdown.
    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true;
      observerRef.current?.disconnect();
      observerRef.current = null;
    }

    if (isCoarse) {
      // Tap toggles fully-before vs fully-after
      targetRef.current = targetRef.current > 50 ? 0 : 100;
      // Kick the rAF loop
      if (rafRef.current === null) {
        const step = () => {
          const diff = targetRef.current - animRef.current;
          if (Math.abs(diff) < 0.05) {
            animRef.current = targetRef.current;
            setDisplayPos(animRef.current);
            rafRef.current = null;
            return;
          }
          animRef.current += diff * 0.15;
          setDisplayPos(animRef.current);
          rafRef.current = requestAnimationFrame(step);
        };
        rafRef.current = requestAnimationFrame(step);
      }
      return;
    }
    draggingRef.current = true;
    const ref = containerRef.current as unknown as {
      _updateTarget?: (x: number) => void;
    } | null;
    ref?._updateTarget?.(e.clientX);
    e.preventDefault();
  };

  return (
    <figure style={{ margin: 0, marginBottom: "4rem" }}>
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        className="lp0-slider relative w-full rounded-xl overflow-hidden select-none cursor-col-resize bg-white"
        style={{
          touchAction: "none",
          aspectRatio: SLIDER_ASPECT,
          boxShadow: "var(--frame-shadow)",
        }}
      >
        {/* Before. Full-cover image, sits behind */}
        <div className="absolute inset-0">
          <Image
            src="/work/lp0/old.png"
            alt="Clear Compliance Cloud landing, before redesign"
            fill
            sizes="(max-width: 768px) 100vw, 1080px"
            className="object-cover select-none pointer-events-none"
            draggable={false}
            priority
          />
        </div>

        {/* After. Full-cover image, clipped from the left so it reveals
            progressively as the divider moves right */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${displayPos}%)` }}
        >
          <Image
            src="/work/lp0/new.png"
            alt="Clear Compliance Cloud landing, after redesign"
            fill
            sizes="(max-width: 768px) 100vw, 1080px"
            className="object-cover select-none pointer-events-none"
            draggable={false}
            priority
          />
        </div>

        {/* 2px white divider with thin black halo so it reads on both light
            and dark screenshot regions. Neutral, no brand colour. */}
        <div
          aria-hidden
          className="lp0-divider"
          style={{
            left: `${displayPos}%`,
            transform: "translateX(-1px)",
          }}
        />

        {/* 40px white drag handle on the divider with two grabber bars inside.
            Outer wrapper centres the handle; inner element handles hover
            scale + shadow intensification via .lp0-slider:hover. */}
        <div
          aria-hidden
          className="absolute top-1/2 pointer-events-none"
          style={{
            left: `${displayPos}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="lp0-handle">
            <span className="lp0-grabber" />
            <span className="lp0-grabber" />
          </div>
        </div>

        {/* Before / After labels. Dark pills with backdrop blur. Readable
            against any underlying screenshot, unobtrusive. */}
        <span
          aria-hidden
          className="absolute top-4 left-4 z-10 pointer-events-none text-[10px] font-medium uppercase tracking-[0.12em] text-white rounded-md"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            padding: "6px 12px",
          }}
        >
          Before
        </span>
        <span
          aria-hidden
          className="absolute top-4 right-4 z-10 pointer-events-none text-[10px] font-medium uppercase tracking-[0.12em] text-white rounded-md"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            padding: "6px 12px",
          }}
        >
          After
        </span>
      </div>

      {/* External caption, 16px below the slider, left-aligned to the
          shared section gridline. No overlay gradient on the slider. */}
      <figcaption
        className="text-[14px] text-[#6B6B68]"
        style={{ margin: 0, marginTop: "1rem" }}
      >
        {LP0_CAPTION.name}
        <span className="text-[#9C9C97]"> · {LP0_CAPTION.year}</span>
      </figcaption>
    </figure>
  );
}

// ── Lightbox ─────────────────────────────────────────────────────────

function Lightbox({
  tile,
  onClose,
}: {
  tile: Tile | null;
  onClose: () => void;
}) {
  // Ordered frame set: base image first, optional second image after. Tiles
  // with no images fall back to the colour block + name overlay.
  const frames = tile
    ? ([tile.image, tile.hoverImage].filter(Boolean) as string[])
    : [];
  const hasFrames = frames.length > 0;
  const multiFrame = frames.length > 1;

  const [index, setIndex] = useState(0);

  // Reset to frame 0 (the clean base) every time a new tile opens.
  useEffect(() => {
    if (tile) setIndex(0);
  }, [tile]);

  useEffect(() => {
    if (!tile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (!multiFrame) return;
      if (e.key === "ArrowLeft") {
        setIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "ArrowRight") {
        setIndex((i) => Math.min(frames.length - 1, i + 1));
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [tile, onClose, multiFrame, frames.length]);

  return (
    <AnimatePresence>
      {tile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center px-8 py-12 overflow-hidden"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 z-[70] text-white/70 hover:text-[#D97706] transition-colors duration-200 ease-out"
            aria-label="Close"
          >
            <X className="size-6" strokeWidth={1.75} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center gap-6"
          >
            {hasFrames ? (
              // Image renders at width min(90vw, 1100px), natural aspect.
              // Container caps height at 88vh and scrolls vertically for tall
              // screenshots, so the full screen reads at a legible width
              // instead of being shrunk to fit.
              <div
                className="rounded-lg bg-white"
                style={{
                  width: "min(90vw, 1100px)",
                  maxHeight: "88vh",
                  overflowY: "auto",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={frames[index]}
                  src={frames[index]}
                  alt={tile.name}
                  draggable={false}
                  className="block w-full h-auto select-none"
                  style={{ margin: 0 }}
                />
              </div>
            ) : (
              <div
                style={{
                  aspectRatio: TILE_ASPECT,
                  width: `min(90vw, calc(85vh * (${TILE_ASPECT})))`,
                  backgroundColor: tile.color,
                }}
                className="relative rounded-lg overflow-hidden flex items-center justify-center"
              >
                <span
                  className="text-foreground/85 text-[26px] font-medium tracking-tight"
                  style={{ margin: 0 }}
                >
                  {tile.name}
                </span>
              </div>
            )}

            <p
              className="text-white/80 text-[14px] max-w-2xl text-center leading-relaxed"
              style={{ margin: 0 }}
            >
              {tile.lightboxCaption}
            </p>
          </div>

          {/* Multi-frame nav is fixed to the viewport so it stays put while
              the image scrolls inside its container. Hidden entirely for
              single-frame tiles. */}
          {multiFrame && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-5 px-4 py-2 rounded-full text-white/70"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              <button
                type="button"
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                disabled={index === 0}
                aria-label="Previous frame"
                className="disabled:opacity-25 hover:text-white transition-colors duration-200 ease-out"
              >
                <ChevronLeft className="size-5" strokeWidth={1.75} />
              </button>
              <span
                className="font-mono text-[12px] tabular-nums tracking-[0.1em]"
                style={{ margin: 0 }}
              >
                {index + 1} / {frames.length}
              </span>
              <button
                type="button"
                onClick={() => setIndex((i) => Math.min(frames.length - 1, i + 1))}
                disabled={index === frames.length - 1}
                aria-label="Next frame"
                className="disabled:opacity-25 hover:text-white transition-colors duration-200 ease-out"
              >
                <ChevronRight className="size-5" strokeWidth={1.75} />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
