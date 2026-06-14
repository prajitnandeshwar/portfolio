"use client";

import { NAVY } from "./constants";

// The centrepiece. Four nodes in a clockwise loop, a navy centre that
// says what the loop is for, four dashed edges that flow between them.
//
// The dash flow runs at 1.6s linear, infinite. Reduced motion freezes
// the dash position so the diagram still reads as a connected loop.
//
// SVG is fully responsive: width 100%, viewBox preserves aspect.

export function TrustLoop() {
  return (
    <figure className="my-9" style={{ margin: "2.25rem 0" }}>
      <svg
        viewBox="0 0 720 360"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="The trust loop: act within limits, land on the record, build a track record, widen the limits, with fixes becoming rules at the centre"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <defs>
          <marker
            id="aif-loop-arrow"
            markerWidth="9"
            markerHeight="9"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill={NAVY.bg} />
          </marker>
          <style>{`
            .aif-loop-edge { fill: none; stroke: ${NAVY.bg}; stroke-width: 1.5; stroke-dasharray: 5 6; animation: aif-loop-dash 1.6s linear infinite; }
            @keyframes aif-loop-dash { to { stroke-dashoffset: -22; } }
            @media (prefers-reduced-motion: reduce) {
              .aif-loop-edge { animation: none; }
            }
            .aif-loop-label { font-family: Inter, system-ui, sans-serif; font-size: 14px; font-weight: 600; fill: #1F1F1E; }
            .aif-loop-sub { font-family: Inter, system-ui, sans-serif; font-size: 11.5px; fill: #6B6B68; }
          `}</style>
        </defs>

        {/* Edges, clockwise. Drawn first so nodes paint on top. */}
        <path
          className="aif-loop-edge"
          markerEnd="url(#aif-loop-arrow)"
          d="M 250 70 A 200 130 0 0 1 470 70"
        />
        <path
          className="aif-loop-edge"
          markerEnd="url(#aif-loop-arrow)"
          d="M 545 110 A 200 130 0 0 1 545 250"
        />
        <path
          className="aif-loop-edge"
          markerEnd="url(#aif-loop-arrow)"
          d="M 470 290 A 200 130 0 0 1 250 290"
        />
        <path
          className="aif-loop-edge"
          markerEnd="url(#aif-loop-arrow)"
          d="M 175 250 A 200 130 0 0 1 175 110"
        />

        {/* Outer nodes */}
        <g>
          <rect
            x="270"
            y="36"
            width="180"
            height="52"
            rx="10"
            fill="#FFFFFF"
            stroke="#E5E2DC"
          />
          <text x="360" y="60" textAnchor="middle" className="aif-loop-label">
            Act within limits
          </text>
          <text x="360" y="78" textAnchor="middle" className="aif-loop-sub">
            below the line, the agent acts
          </text>
        </g>
        <g>
          <rect
            x="500"
            y="148"
            width="170"
            height="52"
            rx="10"
            fill="#FFFFFF"
            stroke="#E5E2DC"
          />
          <text x="585" y="172" textAnchor="middle" className="aif-loop-label">
            Land on the record
          </text>
          <text x="585" y="190" textAnchor="middle" className="aif-loop-sub">
            every action, logged
          </text>
        </g>
        <g>
          <rect
            x="270"
            y="272"
            width="180"
            height="52"
            rx="10"
            fill="#FFFFFF"
            stroke="#E5E2DC"
          />
          <text x="360" y="296" textAnchor="middle" className="aif-loop-label">
            Build a track record
          </text>
          <text x="360" y="314" textAnchor="middle" className="aif-loop-sub">
            accuracy you can see
          </text>
        </g>
        <g>
          <rect
            x="50"
            y="148"
            width="170"
            height="52"
            rx="10"
            fill="#FFFFFF"
            stroke="#E5E2DC"
          />
          <text x="135" y="172" textAnchor="middle" className="aif-loop-label">
            Widen the limits
          </text>
          <text x="135" y="190" textAnchor="middle" className="aif-loop-sub">
            earned, not granted
          </text>
        </g>

        {/* Navy centre: fixes become rules */}
        <g>
          <rect
            x="288"
            y="155"
            width="144"
            height="50"
            rx="10"
            fill={NAVY.bg}
          />
          <text
            x="360"
            y="178"
            textAnchor="middle"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="13"
            fontWeight="600"
            fill={NAVY.fg}
          >
            Fixes become rules
          </text>
          <text
            x="360"
            y="195"
            textAnchor="middle"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="11"
            fill={NAVY.muted}
          >
            every correction sticks
          </text>
        </g>
      </svg>
      <figcaption
        className="text-[13px] text-[#9C9C97] text-center"
        style={{ margin: 0, marginTop: "0.75rem" }}
      >
        The loop the whole system runs on. No published AI design system
        names it. It only became visible by laying everyone else&rsquo;s
        work side by side.
      </figcaption>
    </figure>
  );
}
