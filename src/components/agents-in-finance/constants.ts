// Shared tokens for the Agents in Finance case study.
//
// 1. Rule names. The 10 primitives are shown by name throughout the
//    page (catalog grid, four demo headers, the "other six" prose, the
//    pattern chips). The names are placeholders for now; Prajit will
//    supply final names. Editing this one array updates every reference
//    on the page.
//
// 2. Motion durations. Three values, three meanings. Used by every
//    interactive demo and the motion-tokens visualisation.
//
// 3. Navy palette. Reserved for agent-voice surfaces only per the
//    brief. Used by EchoDemo, EvidenceDemo claim block, AgentVoiceDemo,
//    the stack diagram's Primitives layer, the trust loop centre, the
//    voice-comparison "This" card, the catalog's rule 07 cell, and
//    nowhere else.

export const RULE_NAMES = [
  "[[NAME 01]]",
  "[[NAME 02]]",
  "[[NAME 03]]",
  "[[NAME 04]]",
  "[[NAME 05]]",
  "[[NAME 06]]",
  "[[NAME 07]]",
  "[[NAME 08]]",
  "[[NAME 09]]",
  "[[NAME 10]]",
] as const;

// Helper so call sites read as `rule(1)` instead of `RULE_NAMES[0]`.
// The catalog uses 1-based numbering throughout; this matches that.
export function rule(n: number): string {
  return RULE_NAMES[n - 1] ?? `[[NAME ${String(n).padStart(2, "0")}]]`;
}

// Motion durations in milliseconds. Three tokens, three meanings.
//   instant     acknowledgment, the agent heard you
//   standard    revelation, something opens
//   deliberate  commitment, something becomes real
export const DUR = {
  instant: 120,
  standard: 240,
  deliberate: 400,
} as const;

// The agent's surface colours. Used as inline CSS values throughout the
// case study so no other component in the project can accidentally
// reference them.
export const NAVY = {
  bg: "#0E1733",
  soft: "#16203F",
  line: "#2A3656",
  fg: "#E7EBF6",
  muted: "#9AA6C8",
} as const;
