"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { ImageLightbox } from "@/components/site/image-lightbox";

// Notice Tracker information architecture, three regimes resolving to one
// Case ID. This is a figure, not a section: no kicker, no heading, no
// section label of its own. The framing comes from the bridge sentence
// above it and the caption below it.
//
// The SVG is inlined as JSX (not loaded via <img>) so the page Inter
// font is picked up; the embedded style block declares the font family
// for the SVG namespace explicitly. The SVG canvas is the site cream
// #FAFAF9, so the figure sits open on the page with no card, border,
// or panel.
//
// Tapping the SVG opens the same ImageLightbox used elsewhere on the
// site, with the SVG passed as a node prop so it stays inline (Inter
// applies, scaling stays crisp at any zoom). MapSVG is factored out
// so the inline view and the lightbox render the exact same markup.

type ArchitectureMapProps = {
  caption: string;
};

function MapSVG() {
  return (
    <svg
      viewBox="0 0 1320 752"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Notice Tracker information architecture, three regimes resolving to one Case ID"
      style={{ width: "100%", height: "auto", display: "block", margin: 0 }}
    >
      <style>{`
        svg { font-family: 'Inter', -apple-system, system-ui, sans-serif; }
        .eyebrow{ font-size: 10px; font-weight: 600; letter-spacing: 0.14em; }
        .micro  { font-size: 9.5px; font-weight: 600; letter-spacing: 0.14em; }
        .ntitle { font-size: 14px; font-weight: 600; }
        .ntitle-lg { font-size: 16px; font-weight: 600; }
        .nsub   { font-size: 11px; font-weight: 400; }
        .chip-t { font-size: 13px; font-weight: 600; }
        .chip-s { font-size: 11px; font-weight: 400; }
        .link       { fill: none; stroke: #E5E2DC; stroke-width: 1.3; }
        .link-spine { fill: none; stroke: rgba(217,119,6,0.50); stroke-width: 1.3; }
        .tie        { stroke: #E5E2DC; stroke-width: 1; stroke-dasharray: 2 5; }
      `}</style>
      <rect x="0" y="0" width="1320" height="752" fill="#FAFAF9" />

      <text x="152" y="44" textAnchor="middle" className="eyebrow" fill="#9C9C97">ROOT</text>
      <text x="400" y="44" textAnchor="middle" className="eyebrow" fill="#9C9C97">BY REGIME</text>
      <text x="660" y="44" textAnchor="middle" className="eyebrow" fill="#9C9C97">CASE LISTS</text>
      <text x="920" y="44" textAnchor="middle" className="eyebrow" fill="#9C9C97">SPINE</text>
      <text x="1185" y="44" textAnchor="middle" className="eyebrow" fill="#9C9C97">CASE SURFACES</text>

      <path d="M 227.0 300.0 C 274.0 300.0, 274.0 128.0, 321.0 128.0" className="link" />
      <path d="M 227.0 300.0 C 274.0 300.0, 274.0 300.0, 321.0 300.0" className="link" />
      <path d="M 227.0 300.0 C 274.0 300.0, 274.0 472.0, 321.0 472.0" className="link" />
      <path d="M 479.0 128.0 C 530.0 128.0, 530.0 128.0, 581.0 128.0" className="link" />
      <path d="M 479.0 300.0 C 530.0 300.0, 530.0 300.0, 581.0 300.0" className="link" />
      <path d="M 479.0 472.0 C 530.0 472.0, 530.0 472.0, 581.0 472.0" className="link" />
      <path d="M 739.0 128.0 C 786.5 128.0, 786.5 300.0, 834.0 300.0" className="link-spine" />
      <path d="M 739.0 300.0 C 786.5 300.0, 786.5 300.0, 834.0 300.0" className="link-spine" />
      <path d="M 739.0 472.0 C 786.5 472.0, 786.5 300.0, 834.0 300.0" className="link-spine" />
      <path d="M 1006.0 300.0 C 1056.0 300.0, 1056.0 232.0, 1106.0 232.0" className="link" />
      <path d="M 1006.0 300.0 C 1056.0 300.0, 1056.0 368.0, 1106.0 368.0" className="link" />

      <rect x="77.0" y="269.0" width="150" height="62" rx="9" fill="#FAFAF9" stroke="#1F1F1E" strokeWidth="1.4" />
      <text x="152" y="297.0" textAnchor="middle" className="ntitle" fill="#1F1F1E">Notice Tracker</text>
      <text x="152" y="315.0" textAnchor="middle" className="nsub" fill="#6B6B68">Product root</text>

      <rect x="321.0" y="97.0" width="158" height="62" rx="9" fill="#FFFFFF" stroke="#E5E2DC" strokeWidth="1" />
      <text x="400" y="125.0" textAnchor="middle" className="ntitle" fill="#1F1F1E">GST</text>
      <text x="400" y="143.0" textAnchor="middle" className="nsub" fill="#6B6B68">Dashboard</text>

      <rect x="321.0" y="269.0" width="158" height="62" rx="9" fill="#FFFFFF" stroke="#E5E2DC" strokeWidth="1" />
      <text x="400" y="297.0" textAnchor="middle" className="ntitle" fill="#1F1F1E">ITR</text>
      <text x="400" y="315.0" textAnchor="middle" className="nsub" fill="#6B6B68">Dashboard</text>

      <rect x="321.0" y="441.0" width="158" height="62" rx="9" fill="#FFFFFF" stroke="#E5E2DC" strokeWidth="1" />
      <text x="400" y="469.0" textAnchor="middle" className="ntitle" fill="#1F1F1E">TDS</text>
      <text x="400" y="487.0" textAnchor="middle" className="nsub" fill="#6B6B68">TRACES, TAN login</text>

      <rect x="581.0" y="97.0" width="158" height="62" rx="9" fill="#FFFFFF" stroke="#E5E2DC" strokeWidth="1" />
      <text x="660" y="125.0" textAnchor="middle" className="ntitle" fill="#1F1F1E">GST cases</text>
      <text x="660" y="143.0" textAnchor="middle" className="nsub" fill="#6B6B68">Overdue, critical, other</text>

      <rect x="581.0" y="269.0" width="158" height="62" rx="9" fill="#FFFFFF" stroke="#E5E2DC" strokeWidth="1" />
      <text x="660" y="297.0" textAnchor="middle" className="ntitle" fill="#1F1F1E">ITR cases</text>
      <text x="660" y="315.0" textAnchor="middle" className="nsub" fill="#6B6B68">Overdue, critical, other</text>

      <rect x="581.0" y="441.0" width="158" height="62" rx="9" fill="#FFFFFF" stroke="#E5E2DC" strokeWidth="1" />
      <text x="660" y="469.0" textAnchor="middle" className="ntitle" fill="#1F1F1E">TDS cases</text>
      <text x="660" y="487.0" textAnchor="middle" className="nsub" fill="#6B6B68">Overdue, critical, other</text>

      <rect x="834.0" y="257.0" width="172" height="86" rx="10" fill="rgba(217,119,6,0.07)" stroke="#D97706" strokeWidth="1.5" />
      <text x="920" y="279.0" textAnchor="middle" className="micro" fill="#D97706">CANONICAL KEY</text>
      <text x="920" y="302.0" textAnchor="middle" className="ntitle-lg" fill="#1F1F1E">Case</text>
      <text x="920" y="323.0" textAnchor="middle" className="nsub" fill="#6B6B68">Keyed by Case ID</text>

      <rect x="1106.0" y="201.0" width="158" height="62" rx="9" fill="#FFFFFF" stroke="#E5E2DC" strokeWidth="1" />
      <text x="1185" y="229.0" textAnchor="middle" className="ntitle" fill="#1F1F1E">Notice detail</text>
      <text x="1185" y="247.0" textAnchor="middle" className="nsub" fill="#6B6B68">Type, demand, due date</text>

      <rect x="1106.0" y="337.0" width="158" height="62" rx="9" fill="#FFFFFF" stroke="#E5E2DC" strokeWidth="1" />
      <text x="1185" y="365.0" textAnchor="middle" className="ntitle" fill="#1F1F1E">Legal checks</text>
      <text x="1185" y="383.0" textAnchor="middle" className="nsub" fill="#6B6B68">DIN, time bar, section</text>

      <line x1="400" y1="520" x2="400" y2="596" className="tie" />
      <line x1="660" y1="520" x2="660" y2="596" className="tie" />
      <line x1="920" y1="520" x2="920" y2="596" className="tie" />
      <line x1="1185" y1="520" x2="1185" y2="596" className="tie" />

      <rect x="75" y="596" width="1189" height="112" rx="12" fill="none" stroke="#E5E2DC" strokeWidth="1" />
      <text x="95" y="626" className="micro" fill="#9C9C97">SPANS EVERY LEVEL</text>

      <rect x="98.0" y="649.0" width="7" height="7" rx="1.5" fill="#1F1F1E" />
      <text x="117.0" y="649.0" className="chip-t" fill="#1F1F1E">Clear AI</text>
      <text x="117.0" y="668.0" className="chip-s" fill="#6B6B68">Dashboard, case, All Chats</text>

      <rect x="492.5" y="649.0" width="7" height="7" rx="1.5" fill="#1F1F1E" />
      <text x="511.5" y="649.0" className="chip-t" fill="#1F1F1E">Audit trail</text>
      <text x="511.5" y="668.0" className="chip-s" fill="#6B6B68">Every action logged</text>

      <rect x="887.0" y="649.0" width="7" height="7" rx="1.5" fill="#1F1F1E" />
      <text x="906.0" y="649.0" className="chip-t" fill="#1F1F1E">Portal syncs</text>
      <text x="906.0" y="668.0" className="chip-s" fill="#6B6B68">GST, Income Tax, TRACES</text>
    </svg>
  );
}

export function ArchitectureMap({ caption }: ArchitectureMapProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    amount: 0.2,
    once: true,
    margin: "0px 0px -80px 0px",
  });
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.figure
        ref={ref as React.RefObject<HTMLElement>}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
        }
        style={{ margin: "2.5rem 0" }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open architecture map"
          className="block w-full text-left cursor-zoom-in"
          style={{ margin: 0 }}
        >
          <MapSVG />
        </button>
        <figcaption
          className="text-[13px] text-[#9C9C97] text-center"
          style={{ margin: 0, marginTop: "0.75rem" }}
        >
          {caption}
        </figcaption>
      </motion.figure>

      <ImageLightbox
        open={open}
        onOpenChange={setOpen}
        node={<MapSVG />}
        caption={caption}
        title="Notice Tracker architecture"
      />
    </>
  );
}
