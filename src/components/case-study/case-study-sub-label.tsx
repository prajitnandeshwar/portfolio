// Muted uppercase screen/persona label for the Three Pages sub-sections
// (Dashboard, Case List, Case Workspace) and any sibling drill-down
// label. Matches the canonical section-label style used by the landing
// page (Hero eyebrow, UI Exhibition, About, Contact): 12 px, default
// weight, 0.14em tracking, muted-foreground colour. Amber is reserved
// for the eyebrow dot, headline period, and single data-point accents.

export function CaseStudySubLabel({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={`text-[12px] uppercase tracking-[0.14em] text-muted-foreground ${className}`}
      style={{ marginTop: 0, marginLeft: 0, marginRight: 0 }}
    >
      {text}
    </div>
  );
}
