"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";

// The Tax Assurance hero: three board screenshots stacked back to front,
// each drifting a few pixels against the others. Positions are
// percentages of a 2:1 container, so the composition holds at any width.
//
// The drift lives in globals.css as plain keyframes, matching how the
// Notice Tracker notice pile does its float. Under reduced motion the
// layers are dropped entirely for a single flat image, which is both
// calmer and lighter than three files.

const LAYERS = [
  {
    cls: "hero-layer-saudi",
    src: "/work/tax-assurance/hero/hero-saudi.webp",
    alt: "The Saudi Arabia VAT assurance board",
    left: "2.9%",
    top: "20.8%",
    z: 10,
    shadow: "0 1px 2px rgba(0,0,0,0.04), 0 8px 20px rgba(0,0,0,0.06)",
  },
  {
    cls: "hero-layer-malaysia",
    src: "/work/tax-assurance/hero/hero-malaysia.webp",
    alt: "The Malaysia SST assurance board",
    left: "47.9%",
    top: "20.8%",
    z: 20,
    shadow: "0 1px 2px rgba(0,0,0,0.04), 0 8px 20px rgba(0,0,0,0.06)",
  },
  {
    cls: "hero-layer-france",
    src: "/work/tax-assurance/hero/hero-france.webp",
    alt: "The France VAT assurance board",
    left: "25.4%",
    top: "7.5%",
    z: 30,
    shadow: "0 4px 8px rgba(0,0,0,0.06), 0 22px 48px rgba(0,0,0,0.10)",
  },
];

export function HeroLayers() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <Image
        src="/work/tax-assurance/hero/hero-static.webp"
        alt="The France, Saudi Arabia and Malaysia Tax Assurance boards"
        width={2400}
        height={1200}
        priority
        sizes="(max-width: 768px) 100vw, 700px"
        className="block w-full h-auto"
      />
    );
  }

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: "2 / 1", margin: 0 }}
    >
      {LAYERS.map((l) => (
        <div
          key={l.cls}
          className={`${l.cls} absolute overflow-hidden border`}
          style={{
            left: l.left,
            top: l.top,
            width: "49.2%",
            zIndex: l.z,
            borderRadius: "1.5%",
            borderColor: "var(--border)",
            boxShadow: l.shadow,
            margin: 0,
          }}
        >
          <Image
            src={l.src}
            alt={l.alt}
            width={1600}
            height={1000}
            priority
            sizes="(max-width: 768px) 50vw, 350px"
            className="block w-full h-auto"
          />
        </div>
      ))}
    </div>
  );
}
