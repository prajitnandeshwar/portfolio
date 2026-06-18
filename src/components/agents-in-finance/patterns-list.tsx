import { rule } from "./constants";

// Five recurring jobs mapped to compositions of primitives. Each pattern
// row carries a name on the left and a row of rule chips on the right.
// The chips reference the rule names array so the labels move when the
// names do.

type Pattern = {
  name: string;
  chips: string[];
};

const PATTERNS: Pattern[] = [
  {
    name: "Exception triage",
    chips: [rule(4), rule(2), rule(3), `${rule(8)} · inline`],
  },
  {
    name: "Reconciliation review",
    chips: [rule(5), `${rule(8)} · invoked`, rule(2), rule(7)],
  },
  {
    name: "Agent configuration",
    chips: [rule(6), rule(4), rule(1)],
  },
  {
    name: "Daily briefing",
    chips: [`${rule(8)} · ambient`, rule(7), rule(2)],
  },
  {
    name: "External handoff",
    chips: [rule(9), rule(2), rule(3), rule(5)],
  },
];

export function PatternsList() {
  return (
    <div className="mt-7">
      {PATTERNS.map((pattern, i) => (
        <div
          key={pattern.name}
          className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-5 py-4"
          style={{
            borderTop: i === 0 ? "1px solid #E5E2DC" : undefined,
            borderBottom: "1px solid #E5E2DC",
          }}
        >
          <span className="md:w-[200px] md:flex-none text-[15px] font-semibold text-[#1F1F1E]">
            {pattern.name}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {pattern.chips.map((chip) => (
              <span
                key={chip}
                className="text-[12px] font-medium rounded-full px-3 py-0.5 text-[#6B6B68]"
                style={{
                  backgroundColor: "#FAFAF9",
                  border: "1px solid #E5E2DC",
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
