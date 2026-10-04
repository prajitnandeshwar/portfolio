type Check = { label: string; detail: string };

// A render audit, shown as the terminal output it actually is. Mono, dark,
// and scrollable on narrow screens rather than wrapping into noise.
export function AuditTerminal({
  command,
  checks,
}: {
  command: string;
  checks: Check[];
}) {
  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: "#1F1F1E", backgroundColor: "#1F1F1E" }}
    >
      <div className="overflow-x-auto">
        <pre className="font-mono text-[12.5px] md:text-[13px] leading-[1.9] p-5 md:p-6 min-w-[560px]">
          <span className="block mb-2" style={{ color: "#D97706" }}>
            {command}
          </span>
          {checks.map((c) => (
            <span key={c.label} className="block">
              <span style={{ color: "#6EE7A8" }}>[PASS]</span>{" "}
              <span style={{ color: "#F2F2F0" }}>{c.label}</span>{" "}
              <span style={{ color: "#8A8A86" }}>{c.detail}</span>
            </span>
          ))}
        </pre>
      </div>
    </div>
  );
}
