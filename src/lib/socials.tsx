import type { ComponentType } from "react";

// Inline monochrome SVG icons (Feather / Lucide style, strokeWidth 1.75
// to match the rest of the site's icons). The installed lucide-react
// does not ship brand icons, and the brief explicitly mandates inline
// SVG with currentColor fill so the social icons inherit muted or
// foreground text colour and amber on hover from the parent class.
//
// Both icons are aria-hidden because the surrounding anchor carries an
// aria-label like "LinkedIn" or "Instagram". Screen readers read the
// label, not the decorative path data.

type IconProps = {
  className?: string;
  strokeWidth?: number;
};

function LinkedinIcon({
  className = "size-5",
  strokeWidth = 1.75,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({
  className = "size-5",
  strokeWidth = 1.75,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export type Social = {
  label: string;
  href: string;
  Icon: ComponentType<IconProps>;
};

export const SOCIALS: Social[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/prajit-nandeshwar",
    Icon: LinkedinIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/prajitnandeshwar",
    Icon: InstagramIcon,
  },
];
