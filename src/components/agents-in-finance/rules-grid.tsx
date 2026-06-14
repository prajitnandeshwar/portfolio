import { NAVY, rule } from "./constants";

// 2 by 5 grid of named primitives, plus a question and a one-line
// lineage note. Cell 07 (the agent-voice rule) is the only navy cell on
// the page, which itself is an example of the rule it states.
//
// Four cells carry a "Live below" badge because there is a working
// demo of that primitive lower on the page.

type RuleCell = {
  n: number;
  question: string;
  lineage: string;
  navy?: boolean;
  liveBelow?: boolean;
};

const CELLS: RuleCell[] = [
  {
    n: 1,
    question: "How do I know the agent understood me?",
    lineage: "from Claude Code's plan step",
    liveBelow: true,
  },
  {
    n: 2,
    question: "Why should I believe what it says?",
    lineage: "Carbon's explainer, made mandatory",
    liveBelow: true,
  },
  {
    n: 3,
    question: "What happens when it's wrong?",
    lineage: "finance maker-checker",
  },
  {
    n: 4,
    question: "When does it act alone, when does it ask?",
    lineage: "PAIR's automate-vs-augment",
    liveBelow: true,
  },
  {
    n: 5,
    question: "What does it remember, and for how long?",
    lineage: "invented for compliance",
  },
  {
    n: 6,
    question: "How do I shape how it behaves?",
    lineage: "Anthropic's editable constitution",
  },
  {
    n: 7,
    question: "How do I tell the agent apart from the app?",
    lineage: "Carbon's AI layer, inverted",
    navy: true,
    liveBelow: true,
  },
  {
    n: 8,
    question: "Where does the AI show up?",
    lineage: "invented for focus",
  },
  {
    n: 9,
    question: "Can an outsider reconstruct what happened?",
    lineage: "Agentforce's provenance, deepened",
  },
  {
    n: 10,
    question: "Does correcting it once teach it for good?",
    lineage: "HAX feedback, made to compound",
  },
];

export function RulesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {CELLS.map((cell) => {
        const navy = cell.navy === true;
        return (
          <div
            key={cell.n}
            className="rounded-lg p-5 transition-[transform,border-color] duration-[120ms] ease-out hover:-translate-y-0.5"
            style={
              navy
                ? {
                    backgroundColor: NAVY.bg,
                    border: `1px solid ${NAVY.bg}`,
                  }
                : {
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E2DC",
                  }
            }
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="font-mono text-[11px]"
                style={{ color: navy ? NAVY.muted : "#9C9C97" }}
              >
                {String(cell.n).padStart(2, "0")}
              </span>
              {cell.liveBelow && (
                <span
                  className="text-[10px] font-semibold tracking-[0.05em] uppercase rounded-[4px] px-1.5 py-0.5"
                  style={
                    navy
                      ? {
                          color: NAVY.muted,
                          backgroundColor: NAVY.soft,
                        }
                      : {
                          color: NAVY.bg,
                          backgroundColor: "#EEF1F8",
                        }
                  }
                >
                  Live below
                </span>
              )}
            </div>
            <div
              className="text-[15px] font-semibold tracking-[-0.01em] mb-1.5"
              style={{ color: navy ? NAVY.fg : "#1F1F1E" }}
            >
              {rule(cell.n)}
            </div>
            <div
              className="text-[13px] leading-[1.5]"
              style={{ color: navy ? NAVY.muted : "#6B6B68" }}
            >
              {cell.question}
            </div>
            <div
              className="text-[11px] italic mt-2"
              style={{ color: navy ? NAVY.muted : "#9C9C97" }}
            >
              {cell.lineage}
            </div>
          </div>
        );
      })}
    </div>
  );
}
