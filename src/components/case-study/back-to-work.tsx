import Link from "next/link";

// The quiet link that closes every case study, under the next case study
// card. Same words and arrow as the link at the top of each page.
export function BackToWork() {
  return (
    <Link
      href="/#work"
      className="group inline-flex items-center gap-2 mt-8 text-[14px] text-[#6B6B68] hover:text-[#D97706] transition-colors duration-200 ease-out"
    >
      <span
        aria-hidden
        className="transition-transform duration-200 ease-out group-hover:-translate-x-[2px]"
      >
        ←
      </span>
      Back to work
    </Link>
  );
}
