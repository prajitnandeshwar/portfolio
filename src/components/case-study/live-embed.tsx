// The live board, embedded. It is a static file with no network requests.
//
// The board needs at least 820px to lay out, so below 900px the iframe is
// replaced by a note rather than shown broken.
export function LiveEmbed({
  src,
  title,
  height = 780,
  narrowNote,
}: {
  src: string;
  title: string;
  height?: number;
  narrowNote: string;
}) {
  return (
    <>
      <div
        className="hidden min-[900px]:block rounded-xl border overflow-hidden"
        style={{ borderColor: "#E5E2DC", backgroundColor: "#FFFFFF" }}
      >
        <iframe
          src={src}
          title={title}
          loading="lazy"
          className="block w-full border-0"
          style={{ height: `${height}px` }}
        />
      </div>

      <div
        className="min-[900px]:hidden rounded-xl border p-6"
        style={{ borderColor: "#E5E2DC", backgroundColor: "#FFFFFF" }}
      >
        <p className="text-[15px] text-[#6B6B68] leading-[1.6]">{narrowNote}</p>
      </div>
    </>
  );
}
