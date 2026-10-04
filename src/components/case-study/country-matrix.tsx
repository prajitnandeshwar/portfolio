type MatrixRow = { label: string; cells: string[]; span?: boolean };

type CountryMatrixProps = {
  countries: string[];
  rows: MatrixRow[];
};

// What changed between countries, and what was not allowed to. Scrolls
// horizontally on narrow screens rather than crushing the columns.
export function CountryMatrix({ countries, rows }: CountryMatrixProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse min-w-[720px] text-[14.5px]">
        <thead>
          <tr>
            <th
              className="text-left font-medium text-[13px] text-[#6B6B68] pr-4 pb-3 border-b"
              style={{ borderColor: "#E5E2DC" }}
            />
            {countries.map((c) => (
              <th
                key={c}
                className="text-left font-medium text-[15px] text-[#1F1F1E] pr-4 pb-3 border-b"
                style={{ borderColor: "#E5E2DC" }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <td
                className="w-1/5 align-top py-3.5 pr-4 border-b font-medium leading-[1.5]"
                style={{
                  borderColor: "#E5E2DC",
                  backgroundColor: r.span ? "#F4F1EB" : undefined,
                  paddingLeft: r.span ? "0.75rem" : undefined,
                  // The row that says what never changed is the point of
                  // the table, so it carries the one accent in it.
                  color: r.span ? "#D97706" : "#1F1F1E",
                }}
              >
                {r.label}
              </td>
              {r.span ? (
                <td
                  colSpan={countries.length}
                  className="align-top py-3.5 pr-4 border-b text-[#6B6B68] leading-[1.5]"
                  style={{ borderColor: "#E5E2DC", backgroundColor: "#F4F1EB" }}
                >
                  {r.cells[0]}
                </td>
              ) : (
                r.cells.map((c, i) => (
                  <td
                    key={i}
                    className="align-top py-3.5 pr-4 border-b text-[#6B6B68] leading-[1.5]"
                    style={{ borderColor: "#E5E2DC" }}
                  >
                    {c}
                  </td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
