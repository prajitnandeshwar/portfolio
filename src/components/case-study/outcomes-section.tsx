type Outcome = {
  value: string;
  suffix?: string;
  label: string;
};

type OutcomesSectionProps = {
  label: string;
  title: string;
  outcomes: Outcome[];
};

// Dark Outcomes section. Background is --text (#1F1F1E), NOT navy. White
// text. Amber on the unit suffix.

export function OutcomesSection({
  label,
  title,
  outcomes,
}: OutcomesSectionProps) {
  return (
    <section
      className="px-6 md:px-12 py-10 md:py-14"
      style={{ backgroundColor: "#1F1F1E", color: "white" }}
    >
      <div className="mx-auto max-w-[1080px]">
        <div className="text-[12px] uppercase tracking-[0.12em] text-white/50 font-medium mb-3">
          {label}
        </div>
        <h2
          className="font-semibold text-white tracking-[-0.02em] leading-[1.15] max-w-3xl mb-8"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2rem)" }}
        >
          {title}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-10">
          {outcomes.map((o) => (
            <div key={o.label}>
              <div
                className="text-white font-semibold leading-[1.05] tracking-[-0.015em]"
                style={{ fontSize: "clamp(2.25rem, 3.6vw, 3rem)" }}
              >
                {o.value}
                {o.suffix && (
                  <span className="text-[#D97706]">{o.suffix}</span>
                )}
              </div>
              <div className="mt-2 text-[14px] text-white/60">{o.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
