type Stat = {
  value: string;
  suffix?: string;
  label: string;
};

export function CaseStudyStats({ stats }: { stats: Stat[] }) {
  return (
    <section
      className="px-6 md:px-12 py-10 border-y"
      style={{ borderColor: "#E5E2DC" }}
    >
      <div className="mx-auto max-w-[1080px] grid grid-cols-2 md:grid-cols-4 gap-y-7 gap-x-6">
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
