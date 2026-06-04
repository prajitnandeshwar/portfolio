"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useState } from "react";

// Notice Tracker case study hero. A structured grey skeleton plays first
// (with a soft shimmer), then the real dashboard assembles in five
// staggered horizontal bands: each band lifts in with opacity 0 to 1,
// translate 14px to 0, and blur 6px to 0. The matching skeleton band
// fades out on the same timing so the assembly reads as the skeleton
// becoming the screenshot, not a flat crossfade.

const BAND_COUNT = 5;
const BAND_STAGGER = 0.11; // seconds between bands
const BAND_DURATION = 0.45; // seconds, each band's own animation
const SHIMMER_DELAY = 0.5; // seconds, shimmer plays first
const SHIMMER_DURATION = 1.1; // seconds for the sweep across the skeleton

const EASE = [0.22, 1, 0.36, 1] as const;

const SKEL_BAR = "#D1D5DB";
const SKEL_BLOCK = "#E5E7EB";

function bandClip(i: number, count: number) {
  const top = (i / count) * 100;
  const bottom = ((count - i - 1) / count) * 100;
  return `inset(${top}% 0 ${bottom}% 0)`;
}

export function HeroDashboardPlaceholder() {
  const reduceMotion = useReducedMotion();
  const [playId, setPlayId] = useState(0);

  const frameStyle = {
    aspectRatio: "11 / 6",
    backgroundColor: "var(--surface)",
    borderColor: "var(--border)",
    boxShadow: "var(--frame-shadow)",
    margin: 0,
  } as const;

  if (reduceMotion) {
    return (
      <div
        className="relative w-full overflow-hidden rounded-xl border"
        style={frameStyle}
        aria-label="Notice Tracker dashboard"
      >
        <DashboardImage />
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border"
      style={frameStyle}
      aria-label="Notice Tracker dashboard, skeleton to shipped reveal"
    >
      {/* Skeleton bands. Each band is a clipped copy of the full
          structured skeleton; only its horizontal slice is visible.
          Fades out on the same timing as the matching image band. */}
      {Array.from({ length: BAND_COUNT }).map((_, i) => (
        <motion.div
          key={`skel-${playId}-${i}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{
            duration: BAND_DURATION,
            delay: SHIMMER_DELAY + i * BAND_STAGGER,
            ease: EASE,
          }}
          className="absolute inset-0"
          style={{ margin: 0, clipPath: bandClip(i, BAND_COUNT) }}
          aria-hidden
        >
          <Skeleton />
        </motion.div>
      ))}

      {/* Shimmer sweeps across the skeleton during the initial delay,
          then fades out as the bands begin assembling. */}
      <motion.div
        key={`shimmer-${playId}`}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          duration: 0.3,
          delay: SHIMMER_DELAY + 0.1,
          ease: "easeOut",
        }}
        className="absolute inset-0 pointer-events-none"
        style={{ margin: 0 }}
        aria-hidden
      >
        <Shimmer />
      </motion.div>

      {/* Real dashboard rendered as five staggered bands. Each band is
          the full image clipped to its horizontal slice, animating in
          with a lift + sharpen so it reads as focusing into place. */}
      {Array.from({ length: BAND_COUNT }).map((_, i) => (
        <motion.div
          key={`band-${playId}-${i}`}
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: BAND_DURATION,
            delay: SHIMMER_DELAY + i * BAND_STAGGER,
            ease: EASE,
          }}
          className="absolute inset-0"
          style={{ margin: 0, clipPath: bandClip(i, BAND_COUNT) }}
        >
          <DashboardImage />
        </motion.div>
      ))}

      {/* Replay control. Subtle chip in the bottom-right corner. */}
      <button
        type="button"
        onClick={() => setPlayId((id) => id + 1)}
        aria-label="Replay dashboard reveal"
        className="absolute bottom-3 right-3 z-10 inline-flex items-center justify-center size-8 rounded-full text-[#6B6B68] hover:text-[#D97706] transition-colors duration-200 ease-out"
        style={{
          margin: 0,
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <RotateCcw className="size-3.5" />
      </button>
    </div>
  );
}

function DashboardImage() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/work/notice-tracker/dashboard.png"
      alt="Notice Tracker dashboard"
      draggable={false}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "auto",
        display: "block",
        margin: 0,
      }}
    />
  );
}

function Skeleton() {
  return (
    <div
      className="absolute inset-6 flex flex-col gap-3"
      style={{ margin: 0 }}
      aria-hidden
    >
      {/* Header bar: title + small chip */}
      <div className="flex items-center gap-3" style={{ margin: 0 }}>
        <div
          className="h-3 w-28 rounded-sm"
          style={{ margin: 0, backgroundColor: SKEL_BAR }}
        />
        <div
          className="ml-auto h-5 w-16 rounded-full"
          style={{ margin: 0, backgroundColor: SKEL_BLOCK }}
        />
      </div>

      {/* Overview cards row */}
      <div className="grid grid-cols-3 gap-2" style={{ margin: 0 }}>
        <div
          className="h-14 rounded-md"
          style={{ margin: 0, backgroundColor: SKEL_BLOCK }}
        />
        <div
          className="h-14 rounded-md"
          style={{ margin: 0, backgroundColor: SKEL_BLOCK }}
        />
        <div
          className="h-14 rounded-md"
          style={{ margin: 0, backgroundColor: SKEL_BLOCK }}
        />
      </div>

      {/* Bar chart row */}
      <div
        className="flex-1 flex items-end justify-between gap-2 pt-3"
        style={{ margin: 0 }}
      >
        {[40, 70, 55, 90, 65, 45].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              height: `${h}%`,
              backgroundColor:
                i === 3 ? "rgba(217, 119, 6, 0.55)" : SKEL_BAR,
              margin: 0,
            }}
          />
        ))}
      </div>

      {/* Table hint */}
      <div className="flex flex-col gap-1.5" style={{ margin: 0 }}>
        <div
          className="h-2 w-1/2 rounded-sm"
          style={{ margin: 0, backgroundColor: SKEL_BLOCK }}
        />
        <div
          className="h-2 w-2/3 rounded-sm"
          style={{ margin: 0, backgroundColor: SKEL_BLOCK }}
        />
      </div>
    </div>
  );
}

function Shimmer() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ margin: 0 }}
      aria-hidden
    >
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: SHIMMER_DURATION, ease: "easeInOut", delay: 0.1 }}
        className="absolute inset-y-0 w-1/3"
        style={{
          margin: 0,
          background:
            "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent)",
        }}
      />
    </div>
  );
}
