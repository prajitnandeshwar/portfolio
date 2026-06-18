// Borrowed, tweaked, invented. Five source rows, each a recognisable
// industry reference plus a short note on what was kept, changed, or
// dropped. The structure is intentionally identical to the Patterns
// list further down the page: same horizontal label + body layout, so
// the reader's eye learns the rhythm once.

const SOURCES: { name: string; note: string }[] = [
  {
    name: "Microsoft HAX",
    note: "18 research-backed rules for working with AI, sorted by moment: at the start, during use, when it is wrong, over time. I borrowed the idea that an agent should show what it can do and how well it has done it. In finance that becomes a visible track record.",
  },
  {
    name: "Google PAIR",
    note: "Automate the repetitive, keep humans on the decisions that matter. That is exactly the limits a user sets. I also kept their rule on graceful failure: when the agent cannot finish, it says what it tried and what it needs.",
  },
  {
    name: "IBM Carbon for AI",
    note: "Their best idea is not visual, it is structural: an AI component cannot render without its explanation attached. I borrowed the mechanism and dropped the look. Their AI glows; ours stays quiet and dark, a colleague rather than a magic trick.",
  },
  {
    name: "Salesforce Agentforce",
    note: "Anything an agent sends out carries its provenance. In finance, a reply or an export to an auditor states what the agent drafted and which person approved it. That folds straight into our record.",
  },
  {
    name: "Anthropic, Claude Code",
    note: "The best agent I use every day already works this way with code. It shows its plan before acting, runs safe commands on its own but asks before risky ones, and follows rules its user can read. I do this work in Claude Code daily. Finance deserves the same rigor.",
  },
];

export function SourcesList() {
  return (
    <div className="my-7">
      {SOURCES.map((source, i) => (
        <div
          key={source.name}
          className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-5 py-4"
          style={{
            borderTop: i === 0 ? "1px solid #E5E2DC" : undefined,
            borderBottom: "1px solid #E5E2DC",
          }}
        >
          <span className="md:w-[200px] md:flex-none text-[15px] font-semibold text-[#1F1F1E]">
            {source.name}
          </span>
          <span className="text-[14px] text-[#6B6B68] leading-[1.55]">
            {source.note}
          </span>
        </div>
      ))}
    </div>
  );
}
