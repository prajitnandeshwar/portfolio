"use client";

import { useState } from "react";
import { DemoFrame, AgentLabel } from "./echo-demo";
import { NAVY, rule } from "./constants";

// Demo for primitive 02 (proof on claim). The agent makes a claim, the
// claim carries two chips, each chip names its source. Hover surfaces a
// short preview. Clicking either chip expands a drill panel below with
// the two side-by-side records (one full, one empty, the gap the agent
// flagged). The proof never opens in a new screen.

export function EvidenceDemo() {
  const [open, setOpen] = useState(false);

  return (
    <DemoFrame tag={`Rule 02 · ${rule(2)}`} onReplay={() => setOpen(false)}>
      <div
        className="rounded-[10px] p-5"
        style={{ backgroundColor: NAVY.bg, color: NAVY.fg }}
      >
        <AgentLabel name="RECON AGENT" />
        <p className="text-[15px] leading-[1.6] mb-3" style={{ margin: 0 }}>
          This invoice cleared ZATCA on 14 March but is missing from the
          purchase register.
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <EvidenceChip
            label="ZATCA clearance · INV-8841"
            preview="Clearance record from the ZATCA feed. Cleared 14 Mar 2026, SAR 41,300. Click to open the record."
            onClick={() => setOpen(true)}
          />
          <EvidenceChip
            label="Purchase register · March"
            preview="Entity purchase register, March period. No entry found for INV-8841. Click to inspect."
            onClick={() => setOpen(true)}
          />
        </div>
      </div>

      {/* Drill panel. Expands from the claim, not a route change. */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? 460 : 0,
          opacity: open ? 1 : 0,
          marginTop: open ? "1rem" : 0,
          transition:
            "max-height 240ms ease, opacity 240ms ease, margin-top 240ms ease",
        }}
        aria-hidden={!open}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Doc>
            <DocHeader>ZATCA clearance record</DocHeader>
            <KeyValue k="Invoice" v="INV-8841" />
            <KeyValue k="Cleared" v="14 Mar 2026" />
            <KeyValue k="Amount" v="SAR 41,300" />
            <KeyValue k="Status" v="Cleared · Phase 2" last />
          </Doc>
          <Doc>
            <DocHeader>Purchase register · March</DocHeader>
            <div
              className="flex flex-1 items-center justify-center rounded-lg text-[13px] text-[#9C9C97] p-3 min-h-[90px] text-center leading-[1.5]"
              style={{ border: "1.5px dashed #E5E2DC" }}
            >
              No entry for INV-8841.
              <br />
              This is the gap the agent flagged.
            </div>
          </Doc>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-[12px] font-medium text-[#6B6B68] hover:text-[#1F1F1E] mt-3 underline underline-offset-[3px] bg-transparent border-0 cursor-pointer"
        >
          Close evidence
        </button>
      </div>
    </DemoFrame>
  );
}

function EvidenceChip({
  label,
  preview,
  onClick,
}: {
  label: string;
  preview: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative inline-flex items-center gap-1.5 text-[12.5px] font-medium font-mono rounded-full px-3 py-1 transition-[border-color,background] duration-[120ms]"
      style={{
        backgroundColor: NAVY.soft,
        border: `1px solid ${NAVY.line}`,
        color: NAVY.fg,
      }}
    >
      <span
        className="text-[10px]"
        style={{ color: NAVY.muted }}
        aria-hidden="true"
      >
        ⌕
      </span>
      <span>{label}</span>
      <span
        role="tooltip"
        className="absolute left-0 w-[230px] text-[12px] leading-[1.5] rounded-lg p-2.5 pointer-events-none opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,transform] duration-[120ms] z-[5]"
        style={{
          bottom: "calc(100% + 8px)",
          backgroundColor: "#FFFFFF",
          color: "#1F1F1E",
          border: "1px solid #E5E2DC",
          fontFamily: "Inter, sans-serif",
          boxShadow: "0 8px 24px rgba(14,23,51,0.12)",
        }}
      >
        {preview}
      </span>
    </button>
  );
}

function Doc({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-[10px] p-4 flex flex-col"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E2DC" }}
    >
      {children}
    </div>
  );
}

function DocHeader({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-[11px] font-semibold tracking-[0.07em] uppercase text-[#9C9C97] mb-2.5">
      {children}
    </h4>
  );
}

function KeyValue({ k, v, last }: { k: string; v: string; last?: boolean }) {
  return (
    <div
      className="flex justify-between text-[13px] py-1.5"
      style={{ borderBottom: last ? "none" : "1px solid #FAFAF9" }}
    >
      <span className="text-[#6B6B68]">{k}</span>
      <span className="font-mono text-[12px] font-medium">{v}</span>
    </div>
  );
}
