// Six-question checklist that travels with the primitives into design
// review. Numbers render in mono so they read as instrument, not
// decoration.

const QUESTIONS = [
  "Which mode of presence is this?",
  "Where is the evidence?",
  "What is staged, and what is committed?",
  "Where is the gate?",
  "Is the agent voice surface still exclusive?",
  "What lands on the trail?",
];

export function Checklist() {
  return (
    <ol className="my-6 list-none">
      {QUESTIONS.map((q, i) => (
        <li
          key={q}
          className="flex gap-3.5 py-3.5 text-[16px] font-medium text-[#1F1F1E]"
          style={{ borderBottom: "1px solid #E5E2DC" }}
        >
          <span
            className="font-mono text-[12px] text-[#9C9C97] pt-1"
            style={{ flex: "none" }}
            aria-hidden="true"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{q}</span>
        </li>
      ))}
    </ol>
  );
}
