import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

// The card at the foot of a case study that leads to the next one: the
// project's card image, a quiet label, its name, and an arrow that moves
// on hover. Shared so every case study ends the same way.
export function NextCaseStudy({
  href,
  title,
  image,
}: {
  href: string;
  title: string;
  image: string;
}) {
  return (
    <Link href={href} className="group block">
      <Card className="flex-row items-center gap-5 rounded-2xl px-5 py-5 ring-1 ring-[#E5E2DC] transition-shadow duration-200 ease-out group-hover:shadow-[var(--frame-shadow)] md:px-6">
        <div
          className="relative hidden aspect-[16/9] w-[168px] shrink-0 overflow-hidden rounded-lg border min-[480px]:block"
          style={{ borderColor: "var(--border)", margin: 0 }}
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="168px"
            className="object-cover object-top"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] text-[#9C9C97]">Next case study</p>
          <p
            className="text-[21px] font-medium tracking-[-0.01em] text-[#1F1F1E]"
            style={{ marginTop: "0.25rem" }}
          >
            {title}
          </p>
        </div>
        <ArrowRight
          aria-hidden
          className="size-5 shrink-0 text-[#9C9C97] transition-[transform,color] duration-200 ease-out group-hover:translate-x-1 group-hover:text-[#D97706]"
        />
      </Card>
    </Link>
  );
}
