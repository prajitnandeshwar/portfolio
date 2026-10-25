import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import {
  CaseStudySection,
  Prose,
  Em,
} from "@/components/case-study/case-study-section";
import { CaseStudyLayout } from "@/components/case-study/case-study-layout";
import { StatRow } from "@/components/case-study/stat-row";
import { Figure, Frame } from "@/components/case-study/figure";
import { VideoFigure } from "@/components/case-study/video-figure";
import { HeroLayers } from "@/components/case-study/hero-layers";
import { ChainDiagram } from "@/components/case-study/chain-diagram";
import { LiveEmbed } from "@/components/case-study/live-embed";
import { NextCaseStudy } from "@/components/case-study/next-case-study";
import { BackToWork } from "@/components/case-study/back-to-work";

// Copy: _import/tax-assurance-v3-copy.md (the v3 case study). The layout
// is the original one: large section headings, text first, then media.

export const metadata: Metadata = {
  // The root layout appends " · Prajit Nandeshwar" via its title
  // template, so this is just the page name.
  title: "Tax Assurance",
  description:
    "Designing VAT and SST returns a finance team can trust enough to sign. Built country by country across Saudi Arabia, Malaysia and France.",
  // Page specific cards. The image comes from opengraph-image.png in this
  // folder, which takes precedence over the site wide one.
  openGraph: {
    title: "Tax Assurance · Prajit Nandeshwar",
    description:
      "Designing VAT and SST returns a finance team can trust enough to sign. Built country by country across Saudi Arabia, Malaysia and France.",
    url: "https://prajitnandeshwar.in/work/tax-assurance",
    images: [
      {
        url: "/work/tax-assurance/hero/og-tax-assurance.png",
        width: 1200,
        height: 630,
        alt: "The France, Saudi Arabia and Malaysia Tax Assurance boards",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tax Assurance · Prajit Nandeshwar",
    description:
      "Designing VAT and SST returns a finance team can trust enough to sign. Built country by country across Saudi Arabia, Malaysia and France.",
    images: ["/work/tax-assurance/hero/og-tax-assurance.png"],
  },
};

const CREDITS = [
  { label: "Role", value: "Lead Designer" },
  { label: "Timeline", value: "April to present" },
  { label: "Read", value: "5 min" },
  {
    label: "Project type",
    value: "0 to 1 product, Agent design, Design systems, Design engineering",
  },
  { label: "Tools", value: "Claude Code, Figma" },
];

const STATS = [
  { value: "6", label: "customers" },
  { value: "3", label: "tax regimes" },
  { value: "18", label: "coded findings" },
  { value: "26", label: "automated design checks" },
];

const CHAIN = [
  {
    k: "1",
    title: "Books against the government record",
    body: "The ledger on one side, the authority's e-invoice record on the other.",
  },
  {
    k: "2",
    title: "Every document lands in one outcome",
    body: "Matched, mismatched, missing, awaiting confirmation. Never two outcomes, never none.",
  },
  {
    k: "3",
    title: "Every outcome maps to a return box",
    body: "So reconciliation and filing are one piece of work, not two tools.",
  },
  {
    k: "4",
    title: "Every box drills back",
    body: "From the number on the form to the documents behind it, filtered.",
  },
];

export default function TaxAssurancePage() {
  return (
    <>
      <Nav />
      <CaseStudyLayout>
        {/* 1 · Hero. The header in one column, then the film at full
            content width. Built here rather than with CaseStudyHero, whose
            visual sits in a side column. */}
        <section className="px-6 md:px-12 pt-20 md:pt-24 pb-4 md:pb-6">
          <div className="mx-auto max-w-[1080px]">
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 text-[14px] text-[#6B6B68] hover:text-[#D97706] mb-10 transition-colors duration-200 ease-out"
            >
              <span
                aria-hidden
                className="transition-transform duration-200 ease-out group-hover:-translate-x-[2px]"
              >
                ←
              </span>
              Back to work
            </Link>

            <h1
              className="font-semibold text-[#1F1F1E] leading-[1.05] tracking-[-0.02em] mb-5"
              style={{ fontSize: "clamp(2.25rem, 4.4vw, 3rem)" }}
            >
              Tax Assurance
              <span className="text-[#D97706]">.</span>
            </h1>

            <p
              className="text-[18px] text-[#6B6B68] leading-[1.5]"
              style={{ margin: 0, marginBottom: "2rem" }}
            >
              Designing VAT and SST returns a finance team can trust enough to sign. Built with AI agents, country by country, across Saudi Arabia, Malaysia and France.
            </p>

            <div className="flex flex-wrap gap-x-12 gap-y-6">
              {CREDITS.map(({ label, value }) => (
                <div key={label} className="flex flex-col" style={{ margin: 0 }}>
                  <div
                    className="text-[11px] uppercase tracking-[0.14em] text-[#9C9C97]"
                    style={{ margin: 0, marginBottom: "0.375rem" }}
                  >
                    {label}
                  </div>
                  <div
                    className="text-[14.5px] text-[#1F1F1E] leading-tight"
                    style={{ margin: 0 }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <Figure
              caption="Asking the board which documents make up the €12,820 at risk. The chat is CTAI’s; the board it reads is mine."
              tag="Demo data"
            >
              {/* The film sits in the same frame as a screenshot, on a warm
                  dotted backdrop, so its cropped edges read as a window. */}
              <div
                className="rounded-2xl border p-3 min-[480px]:p-5 md:p-10"
                style={{
                  borderColor: "#E5E2DC",
                  backgroundColor: "#F3F0EB",
                  backgroundImage:
                    "radial-gradient(#DDD7CE 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                  margin: 0,
                }}
              >
                <div
                  className="overflow-hidden rounded-xl border"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                    boxShadow: "var(--frame-shadow)",
                    margin: 0,
                  }}
                >
                  <VideoFigure
                    src="/work/tax-assurance/ask-the-board.mp4"
                    poster="/work/tax-assurance/ask-the-board-poster.png"
                    alt="Asking CTAI's chat which documents make up the €12,820 at risk on a Tax Assurance board"
                    width={1600}
                    height={874}
                    eager
                  />
                </div>
              </div>
            </Figure>
          </div>
        </section>

        {/* 2 · Stats strip */}
        <StatRow stats={STATS} />

        {/* Sections sit closer than the shared CaseStudySection spacing:
            about 0.45 of it. */}
        <div className="[&>section]:py-[18px] md:[&>section]:py-6">

        {/* 3 · Intro, no heading */}
        <section className="px-6 md:px-12 py-10 md:py-14">
          <div className="mx-auto max-w-[1080px]">
            <Prose>
              <p>
                {
                  "A VAT or SST return is a legal declaration with someone’s name on it. Before filing, a tax team reconciles its books against the government’s e-invoice records, finds what disagrees, and decides what to fix."
                }
              </p>
              <p>
                {
                  "Tax Assurance is where they do that. It lives on CTAI, Clear’s AI platform, where boards are built with agents rather than handed to engineering. I designed it and built it one country at a time, working with each customer’s tax team."
                }
              </p>
              <p>
                {
                  "That is too much for one case study. These are the six calls that mattered most."
                }
              </p>
            </Prose>
          </div>
        </section>

        {/* 4 · Two dashboards became one product */}
        <CaseStudySection title="Two dashboards became one product">
          <Prose>
            <p>
              {
                "I had built reconciliation and SST filing as two separate dashboards. Side by side, they read the same data, and a tax team only reconciles in order to file. Keeping them apart meant finding every document twice, and trusting two boards to agree."
              }
            </p>
            <p>
              {
                "So I merged them, with reconciliation and filing as two sections of one navigation. The cost was a bigger board whose navigation had to carry two jobs. That combined board became Tax Assurance, and every board since follows the same chain."
              }
            </p>
          </Prose>

          <Figure caption="Reconciliation and filing, read from the same data, became one board.">
            <VideoFigure
              src="/work/tax-assurance/merge.mp4"
              poster="/work/tax-assurance/merge-poster.png"
              alt="The reconciliation board and the filing board merging into one"
              width={1280}
              height={720}
            />
          </Figure>

          <Figure caption="The reconciliation to filing chain, identical on every board.">
            <Frame>
              <ChainDiagram steps={CHAIN} />
            </Frame>
          </Figure>
        </CaseStudySection>

        {/* 5 · Eighteen findings instead of three buckets */}
        <CaseStudySection title="Eighteen findings instead of three buckets">
          <Prose>
            <p>
              {
                "A client told us the reconciliation looked too simple. They were right. Matched, mismatched and missing were cosmetic."
              }
            </p>
            <p>
              {
                "So the buckets became eighteen findings drawn from how ZATCA actually treats documents, from a missing cryptographic stamp to a credit note with no original. Each carries its own rule for tax at risk and its own next step. Each is decided once, in the query that reads the data, so the summary, the list and the filters cannot disagree."
              }
            </p>
            <p>
              {
                "My manager’s push did the rest. The board now opens on a verdict: not ready to file, how many documents are holding it up, and how much VAT is at risk."
              }
            </p>
          </Prose>

          <Figure
            caption="Three cosmetic buckets became eighteen findings, each in its own row on the board."
            tag="Demo data"
          >
            <VideoFigure
              src="/work/tax-assurance/findings.mp4"
              poster="/work/tax-assurance/findings-poster.png"
              alt="Three reconciliation buckets opening into eighteen coded findings"
              width={1280}
              height={720}
            />
          </Figure>
        </CaseStudySection>

        {/* 6 · An agent that never touches the filing */}
        <CaseStudySection title="An agent that never touches the filing">
          <Prose>
            <p>
              {
                "Every board is built with an agent. I wrote the logic agent that maps an account’s own tables onto a fixed contract and checks the maths, and the rendering skill that draws everything a person sees. A new board starts as a prompt, not a sprint."
              }
            </p>
            <p>
              {
                "The same thinking decided what the board hands to agents. Auditing e-invoices against ZATCA’s own cleared feed is a real need, but that feed is not in the workspace. So instead of building it in, the board writes the prompt for an agent, and states the boundary on screen: the agent’s work does not change this filing. "
              }
              <Em>
                {
                  "The agent gets the one-off work. It never touches the number being filed."
                }
              </Em>
            </p>
          </Prose>

          <Figure
            src="/work/tax-assurance/ksa-zatca-helper.png"
            alt="The board's ZATCA check, with the prompt it writes for an agent"
            width={2160}
            height={1005}
            caption="The board writes the prompt for an agent, and states that the agent’s work does not change this filing."
            tag="Demo data"
          />
        </CaseStudySection>

        {/* 7 · One shape, three countries */}
        <CaseStudySection title="One shape, three countries">
          <Prose>
            <p>
              {
                "Saudi Arabia, Malaysia and France share almost nothing: different returns, different rates, different government records. Everything that belongs to a country lives in its own logic. Everything a person sees comes from one system, so a new country means new rules, not a new product."
              }
            </p>
            <p>
              {
                "The differences became small, deliberate rules. In Malaysia, the posted tax code sets the rate, so a customer’s mapping correction can never move a filed number. In France, the CA3 form shows the return as the books state it, and every difference lives on its own screen. The person signing can always tell what they are declaring from what is still in dispute."
              }
            </p>
          </Prose>

          <Figure
            caption="France, Saudi Arabia and Malaysia. Three tax regimes, one shape."
            tag="Demo data"
          >
            <HeroLayers />
          </Figure>

          <Figure
            caption="The French board, live. Click through it."
            tag="Demo data"
          >
            <LiveEmbed
              src="/demos/france-vat-assurance.html"
              title="France VAT assurance board, live, demo data"
              still="/work/tax-assurance/france-executive-summary.png"
            />
          </Figure>
        </CaseStudySection>

        {/* 8 · Trusted on a real prospect's data */}
        <CaseStudySection title="Trusted on a real prospect’s data">
          <Prose>
            <p>
              {
                "A Malaysian device distributor then tested it on their own e-invoices, with no ledger at all. Almost everything they sell sits outside SST, so the return covers a thin slice of what was invoiced."
              }
            </p>
            <p>
              {
                "So the overview proves where every invoiced line went before it shows the return: taxable, credit notes, out of scope, not validated, adding up to everything invoiced. When two of my early figures turned out wrong, the corrections went onto the screen and to the stakeholder, with the cause. "
              }
              <Em>
                {
                  "With a prospect deciding whether to trust you, the correction is part of the product."
                }
              </Em>
            </p>
          </Prose>

          <Figure
            src="/work/tax-assurance/prospect-every-line-accounted.png"
            alt="Every sales e-invoice line accounted for, before the return"
            width={1366}
            height={430}
            caption="Every invoiced line accounted for before the return."
            tag="Masked"
          />
        </CaseStudySection>

        {/* 9 · A design system that checks itself */}
        <CaseStudySection title="A design system that checks itself">
          <Prose>
            <p>
              {
                "By France, my own design system had drifted across three documents that disagreed on more than twenty points. That was survivable while I was the only builder. It was not once PMs, engineers and agents were building with it."
              }
            </p>
            <p>
              {
                "So I ruled once on every conflict, cut 72,000 characters of guidance to a manifest of about 160 lines, and made conformance code: 26 checks, each broken on purpose once to prove it can fail. The checks are a floor. Whether a screen is clear enough to sign from is still my call."
              }
            </p>
          </Prose>

          <Figure caption="Three drifting skills became one short manifest, checked on every board.">
            <VideoFigure
              src="/work/tax-assurance/system.mp4"
              poster="/work/tax-assurance/system-poster.png"
              alt="Three conflicting design system skills reduced to one manifest"
              width={1280}
              height={720}
            />
          </Figure>
        </CaseStudySection>

        {/* 10 · In market with six customers */}
        <CaseStudySection title="In market with six customers">
          <Prose>
            <p>
              {
                "Tax Assurance is live with six customers across Saudi Arabia, Malaysia and France, and PMs and engineers now build boards on the same system."
              }
            </p>
          </Prose>
        </CaseStudySection>

        </div>

        {/* 11 · Closing note */}
        <section className="px-6 md:px-12 pb-16 md:pb-20">
          <div className="mx-auto max-w-[1080px]">
            <div
              className="border-t pt-8 text-[14px] text-[#6B6B68] leading-[1.6]"
              style={{ borderColor: "#E5E2DC" }}
            >
              <p>
                {
                  "Every company shown in this case study is invented and every figure generated, except the prospect section, where all visuals are masked and the business is described generically."
                }
              </p>
              <div style={{ marginTop: "2.5rem" }}>
                <NextCaseStudy
                  href="/work/notice-tracker"
                  title="Notice Tracker"
                  image="/work/notice-tracker.png"
                />
              </div>
              <BackToWork />
            </div>
          </div>
        </section>
      </CaseStudyLayout>
      <Footer />
    </>
  );
}
