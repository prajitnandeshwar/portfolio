"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { SOCIALS } from "@/lib/socials";

const AMBER = "#D97706";

type NavLink = {
  label: string;
  href: string;
};

export function MobileMenu({
  links,
  activeHash,
  isWorkSubroute,
}: {
  links: NavLink[];
  activeHash: string | null;
  isWorkSubroute: boolean;
}) {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Open menu"
        className="tap justify-center text-foreground"
      >
        <Menu className="size-6" strokeWidth={1.75} />
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-screen sm:max-w-none bg-background border-l-0 flex flex-col px-6 pt-20 pb-10"
      >
        <SheetTitle className="sr-only">Site navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Jump to a section, view the resume, or open social profiles.
        </SheetDescription>

        <SheetClose
          aria-label="Close menu"
          className="tap justify-center absolute top-3 right-3 text-foreground hover:text-[color:var(--amber)] transition-colors"
        >
          <X className="size-6" strokeWidth={1.75} />
        </SheetClose>

        <nav className="flex flex-col gap-1 flex-1">
          {links.map((link) => {
            const slug = link.href.replace(/^.*#/, "");
            const isActive =
              (isWorkSubroute && link.label === "Work") ||
              activeHash === `#${slug}`;
            return (
              <SheetClose
                key={link.href}
                render={
                  <Link
                    href={link.href}
                    className="tap text-[28px] font-medium tracking-tight leading-tight"
                    style={{ color: isActive ? AMBER : undefined }}
                  >
                    {link.label}
                  </Link>
                }
              />
            );
          })}
        </nav>

        <div className="flex flex-col gap-4 mt-auto pt-8 border-t border-border">
          <SheetClose
            render={
              <Link
                href="/prajit-nandeshwar-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="tap inline-flex items-center gap-1.5 text-base font-medium text-foreground"
              >
                View resume
                <ArrowUpRight className="size-4" />
              </Link>
            }
          />
          {/* Socials row. Same icons as Contact and Footer; SheetClose
              wrappers ensure tapping any icon also closes the menu. */}
          <div className="flex items-center gap-2 text-muted-foreground">
            {SOCIALS.map(({ label, href, Icon }) => (
              <SheetClose
                key={label}
                render={
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="tap justify-center hover:text-[#D97706] transition-colors duration-200 ease-out"
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </a>
                }
              />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
