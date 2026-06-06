import { SOCIALS } from "@/lib/socials";

// Minimal site footer. Single hairline border above, copyright on the
// left, social icons on the right. Stacks on narrow viewports so the
// icon row sits below the copyright on mobile.

export function Footer() {
  return (
    <footer className="px-6 md:px-10 border-t border-border">
      <div className="mx-auto max-w-[1200px] py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[13px] text-muted-foreground">
        <span>
          © 2026 Prajit Nandeshwar · Built with Next.js &amp; shadcn/ui
        </span>
        <div className="flex items-center gap-2">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="tap justify-center text-muted-foreground hover:text-[#D97706] transition-colors duration-200 ease-out"
            >
              <Icon className="size-5" strokeWidth={1.75} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
