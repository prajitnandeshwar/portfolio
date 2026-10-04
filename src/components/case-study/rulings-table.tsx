type Ruling = { conflict: string; ruling: string; why: string };

// The design system rulings. Each row names a conflict, decides it, and
// says why.
export function RulingsTable({
  headers,
  rulings,
}: {
  headers: [string, string, string];
  rulings: Ruling[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse min-w-[640px] text-[14.5px]">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={h}
                className="text-left font-medium text-[13px] pr-4 pb-3 border-b"
                style={{
                  borderColor: "#E5E2DC",
                  // The middle column holds the decision, which is what the
                  // table exists to show.
                  color: i === 1 ? "#D97706" : "#6B6B68",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rulings.map((r) => (
            <tr key={r.conflict}>
              <td
                className="align-top py-3.5 pr-4 border-b text-[#1F1F1E] font-medium leading-[1.5] w-1/5"
                style={{ borderColor: "#E5E2DC" }}
              >
                {r.conflict}
              </td>
              <td
                className="align-top py-3.5 pr-4 border-b text-[#6B6B68] leading-[1.5]"
                style={{ borderColor: "#E5E2DC" }}
              >
                {r.ruling}
              </td>
              <td
                className="align-top py-3.5 pr-4 border-b text-[#6B6B68] leading-[1.5]"
                style={{ borderColor: "#E5E2DC" }}
              >
                {r.why}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
