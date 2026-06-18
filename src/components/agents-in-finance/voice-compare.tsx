import { NAVY } from "./constants";

// Two cards side by side: the wrong voice (struck through, washed) and
// the right voice (on the agent's own navy surface). The pair is the
// strongest single argument for navy as a voice marker.

export function VoiceCompare() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div
        className="rounded-lg p-4"
        style={{ border: "1px solid #E5E2DC", backgroundColor: "#FFFFFF" }}
      >
        <div className="text-[10px] font-semibold tracking-[0.07em] uppercase text-[#9C9C97] mb-2.5">
          Not this
        </div>
        <p
          className="text-[14px] leading-[1.6] text-[#9C9C97]"
          style={{
            textDecoration: "line-through",
            textDecorationColor: "rgba(107, 114, 128, 0.4)",
            textDecorationThickness: "1px",
            margin: 0,
          }}
        >
          Great news! I&rsquo;ve gone ahead and fixed 142 invoices for you!
          Everything looks perfect now, you&rsquo;re all set, don&rsquo;t worry
          about a thing!
        </p>
      </div>
      <div
        className="rounded-lg p-4"
        style={{
          backgroundColor: NAVY.bg,
          border: `1px solid ${NAVY.bg}`,
        }}
      >
        <div
          className="text-[10px] font-semibold tracking-[0.07em] uppercase mb-2.5"
          style={{ color: NAVY.muted }}
        >
          This
        </div>
        <p
          className="text-[14px] leading-[1.6]"
          style={{ color: NAVY.fg, margin: 0 }}
        >
          142 invoices below your gate were matched and resolved. 6 are above
          it and waiting for you. Every change is on the period trail.
        </p>
      </div>
    </div>
  );
}
