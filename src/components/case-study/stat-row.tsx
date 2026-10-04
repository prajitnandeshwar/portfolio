type Stat = { value: string; suffix?: string; label: string };

// Headline figures strip under the hero. Matches the Notice Tracker stats
// band exactly (same rules, same type scale, amber suffix); the only
// difference is that this one carries five figures rather than four.
export function StatRow({ stats }: { stats: Stat[] }) {
  return (
    <section
      className="px-6 md:px-12 py-10 border-y"
      style={{ borderColor: "#E5E2DC" }}
    >
      <div className="mx-auto max-w-[1080px] grid grid-cols-2 min-[768px]:grid-cols-3 min-[1000px]:grid-cols-5 gap-y-7 gap-x-6">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div
              className="text-[#1F1F1E] font-semibold leading-[1.05] tracking-[-0.015em]"
              style={{ fontSize: "clamp(1.875rem, 3vw, 2.5rem)" }}
            >
              {stat.value}
              {stat.suffix && (
                <span className="text-[#D97706]">{stat.suffix}</span>
              )}
            </div>
            <div className="text-[14px] text-[#6B6B68] mt-1.5">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
