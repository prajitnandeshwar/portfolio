type TriadItem = {
  title: string;
  body: string;
};

// Three-column row of titled bodies with a top border. Stacks single-column
// on mobile.

export function CaseStudyTriad({ items }: { items: TriadItem[] }) {
  return (
    <div
      className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8 border-t pt-8 md:pt-10"
      style={{ borderColor: "#E5E2DC" }}
    >
      {items.map((item) => (
        <div key={item.title}>
          <h3 className="text-[17px] font-semibold text-[#1F1F1E] mb-2.5">
            {item.title}
          </h3>
          <p className="text-[15px] text-[#6B6B68] leading-[1.6]">
            {item.body}
          </p>
        </div>
      ))}
    </div>
  );
}
