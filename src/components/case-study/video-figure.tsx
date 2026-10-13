"use client";

import { useReducedMotion } from "framer-motion";

// A looping screen recording. Autoplays muted and inline so it behaves as
// motion rather than media: no controls, nothing to pause, no sound.
// Under prefers-reduced-motion the poster stands in and nothing moves.
//
// No frame. The recording carries its own soft shadows on a background
// that already matches the page, so a border, a surface fill and a second
// shadow would only draw a box around a picture of a box.
export function VideoFigure({
  src,
  poster,
  alt,
  width,
  height,
}: {
  src: string;
  poster: string;
  alt: string;
  width: number;
  height: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={poster}
        alt={alt}
        width={width}
        height={height}
        className="block w-full h-auto"
        style={{ margin: 0 }}
      />
    );
  }

  return (
    <video
      src={src}
      poster={poster}
      width={width}
      height={height}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
      className="block w-full h-auto"
      style={{ margin: 0 }}
    />
  );
}
