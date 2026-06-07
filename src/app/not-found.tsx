import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";

// Custom 404. Matches the rest of the site: cream background, Inter,
// quiet copy, amber accent on the actionable link. Sits inside the
// same nav and footer chrome so visitors do not feel like they have
// dropped out of the site.

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex-1 px-6 md:px-10 py-32 md:py-40 flex items-center">
        <div className="mx-auto max-w-[600px] text-center">
          <p className="text-[12px] uppercase tracking-[0.14em] text-muted-foreground mb-4">
            404
          </p>
          <h1
            className="font-medium tracking-[-0.02em] leading-[1.1] mb-5"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Page not found
          </h1>
          <p className="text-base text-muted-foreground mb-10 max-w-prose mx-auto">
            That URL does not exist on this site. It may have moved, or you may
            have typed the address slightly off.
          </p>
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 font-medium underline-link py-3 text-foreground"
          >
            Back to the homepage
            <ArrowUpRight className="size-4 transition-[transform,color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#D97706]" />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
