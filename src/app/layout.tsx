import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

// Inter is the single typeface for the entire site. Weights 400 / 500 / 600 / 700.
// No second font family is loaded by design.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prajit Nandeshwar, Lead Product Designer",
  description:
    "Lead Product Designer at Clear, shipping enterprise compliance software end to end. Tax GRC, AI-augmented design, and design systems across 8 products and 4 countries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased scroll-smooth scroll-pt-14`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-foreground selection:text-background overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
