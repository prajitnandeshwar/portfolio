import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import {
  CaseStudySection,
  Prose,
  Em,
} from "@/components/case-study/case-study-section";
import {
  CaseStudyLayout,
  SubHeading,
} from "@/components/case-study/case-study-layout";
import { StatRow } from "@/components/case-study/stat-row";
import { Figure, Frame } from "@/components/case-study/figure";
import { Reveal } from "@/components/case-study/reveal";
import { VideoFigure } from "@/components/case-study/video-figure";
import { HeroLayers } from "@/components/case-study/hero-layers";
import { ChainDiagram } from "@/components/case-study/chain-diagram";
import { CountryMatrix } from "@/components/case-study/country-matrix";
import { RulingsTable } from "@/components/case-study/rulings-table";
import { ArchitectureDiagram } from "@/components/case-study/architecture-diagram";
import { LimitCards } from "@/components/case-study/limit-cards";
import { LiveEmbed } from "@/components/case-study/live-embed";
import { Takeaways } from "@/components/case-study/takeaways";
import { Call } from "@/components/case-study/call";

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
  { label: "Role", value: "Lead Designer. Designed and built with AI agents" },
  { label: "Product", value: "Tax Assurance, on Clear's AI platform CTAI" },
  { label: "Timeline", value: "April to present" },
  { label: "Read", value: "12 min" },
  {
    label: "Data",
    value: "Synthetic demo companies, and one real prospect, masked",
  },
];

const STATS = [
  { value: "6", label: "customers, in market" },
  { value: "3", label: "tax regimes" },
  { value: "18", label: "coded ZATCA findings" },
  { value: "26", label: "automated design checks" },
  { value: "1", label: "real prospect, proof of concept" },
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

const MATRIX_ROWS = [
  { label: "Return", cells: ["SST-02", "VAT return", "CA3, the 3310-CA3-SD"] },
  {
    label: "Reconciles against",
    cells: [
      "MyInvois e-invoices",
      "ZATCA records, with a Cleartax cross-check",
      "Sales against the e-invoice and e-reporting feed. Purchases against vendor e-invoices",
    ],
  },
  {
    label: "Rate logic",
    cells: [
      "6% and 8% by service type. The posted tax code decides the rate",
      "One standard rate, 15%. The work is classification: the ERP tax code decides whether a line is standard, zero rated, export, exempt, GCC or a non claimable import",
      "20%, 10% and 5.5%, plus self-assessed import VAT",
    ],
  },
  {
    label: "What the board had to add",
    cells: [
      "Revisions after customer input, with a computed What changed screen",
      "Eighteen coded findings drawn from how ZATCA rejects documents. B2C simplified invoices treated as reported, not cleared",
      "E-invoice and e-reporting lanes, credit notes against prior periods, payment confirmations, a per document audit trail",
    ],
  },
  {
    label: "What needs a human",
    cells: [
      "Unrated recharges and rate variances, until confirmed",
      "Each finding arrives with its own what to do. Data quality exceptions sit apart from reconciliation gaps",
      "Outcomes marked review or resolve. Payments awaiting confirmation",
    ],
  },
  {
    label: "Stays identical",
    span: true,
    cells: [
      "Navigation shape, the drill pattern, uncertain value kept out of totals, status as a word, one table treatment",
    ],
  },
];

const MY_LIMITS = [
  {
    title: "0.00, a dash and n/a are different",
    body: "0.00 means two sides agree. A dash means nothing here. n/a means no counterpart can exist.",
  },
  {
    title: "The tax code sets the rate",
    body: "The service mapping only groups, so it can never move a filed figure. A conflict raises a finding instead.",
  },
  {
    title: "Credit notes keep the books' sign",
    body: "Shown in the books' sign convention on both sides. Otherwise a RM 677 gap reads as RM 18,000.",
  },
];

const PROSPECT_LIMITS = [
  {
    title: "Customers keyed by tax ID",
    body: "The largest customer appeared under two names. A pivot by name would have split it in two.",
  },
  {
    title: "Every limit on screen",
    body: "No payment data, so the cash calendar says what falls due, not what is unpaid.",
  },
  {
    title: "A headline checked before it shipped",
    body: "Almost all of the pricing leakage was one customer's contract pricing. That customer is now shown apart, with the reason.",
  },
];

const RULINGS = [
  {
    conflict: "Filters",
    ruling: "Column headers filter. No filter bar above the table",
    why: "Users wanted to filter on any column, not the few a builder picked. The bar also cost space",
  },
  {
    conflict: "Status",
    ruling: "A chip with a word. A dot only alongside text",
    why: "Meaning must never ride on colour alone",
  },
  {
    conflict: "Uppercase",
    ruling: "Forbidden",
    why: "A dashboard is read, not shouted",
  },
  {
    conflict: "Tables",
    ruling: "Two variants only, one per board",
    why: "Mixing them makes a board read as two products",
  },
  {
    conflict: "Colour named tokens",
    ruling: "Retired",
    why: "A colour name carries no meaning and breaks on repalette",
  },
  {
    conflict: "Generic design advice",
    ruling: "This skill wins for dashboards",
    why: 'Otherwise the generic skill keeps firing on the word "dashboard"',
  },
];

const ARCH = [
  {
    heading: "Country logic",
    nodes: [
      { title: "Malaysia SST", sub: "Service tax at 6% and 8%" },
      { title: "Saudi VAT", sub: "Standard rated VAT" },
      { title: "France VAT", sub: "CA3 return" },
    ],
  },
  {
    emphasis: true,
    nodes: [
      { title: "One rendering skill", sub: "Tokens, components, rulings, checks" },
    ],
  },
  {
    heading: "What a tax team opens",
    nodes: [
      { title: "SST-02 board", sub: "Same shell, same patterns" },
      { title: "KSA VAT board", sub: "Same shell, same patterns" },
      { title: "CA3 board", sub: "Same shell, same patterns" },
    ],
  },
];


const TAKEAWAYS = [
  {
    number: "01",
    heading: "Decide a finding once, where the data lives.",
    body: <p>{"Then no two screens can disagree about it."}</p>,
  },
  {
    number: "02",
    heading: "Account for all of it before using any of it.",
    body: (
      <p>
        {
          "An incomplete answer that shows its gaps is more trustworthy than a complete one that hides them."
        }
      </p>
    ),
  },
  {
    number: "03",
    heading: "Define what must be true, then let it be built.",
    body: (
      <p>
        {
          "When agents and other builders do the building, design leadership moves from reviewing screens to defining what must be true, and knowing which parts only a person can judge."
        }
      </p>
    ),
  },
];

export default function TaxAssurancePage() {
  return (
    <>
      <Nav />
      <CaseStudyLayout>
        {/* 1 · Hero */}
        <CaseStudyHero
          backHref="/#work"
          backLabel="All work"
          title="Tax Assurance"
          accentChar="."
          tagline="Designing VAT and SST returns a finance team can trust enough to sign. Built with AI agents, country by country, across Saudi Arabia, Malaysia and France."
          credits={CREDITS}
          visual={
            <figure style={{ margin: 0 }}>
              <HeroLayers />
              <figcaption
                className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px] text-[#6B6B68] leading-[1.5]"
                style={{ margin: 0, marginTop: "1rem" }}
              >
                <span>
                  {
                    "France, Saudi Arabia and Malaysia. Three tax regimes, one shape."
                  }
                </span>
                <span
                  className="text-[11px] uppercase tracking-[0.14em] text-[#9C9C97] border rounded-full px-2.5 py-1"
                  style={{ borderColor: "#E5E2DC" }}
                >
                  Demo data
                </span>
              </figcaption>
            </figure>
          }
        />

        {/* 2 · Stats strip */}
        <StatRow stats={STATS} />

        {/* 3 · A return someone signs */}
        <CaseStudySection title="A return someone signs">
          <Prose>
            <p>
              {
                "A VAT or SST return is a legal declaration with a person's name on it. Before it is filed, a tax manager reconciles the books against the government's e-invoice records, finds what disagrees, and decides what to fix. Then someone senior signs."
              }
            </p>
            <p>
              {
                "When I started, that work lived in two dashboards: one to reconcile, one to prepare the return. Both read the same data. A tax manager found a problem in one, then went looking for the same document in the other, and had to trust that the two agreed."
              }
            </p>
            <p>
              {
                "Every design decision after that came back to one question: would the person signing trust what is on this screen?"
              }
            </p>
          </Prose>
        </CaseStudySection>

        {/* 4 · Built on CTAI */}
        <CaseStudySection title="Built on CTAI">
          <Prose>
            <p>
              {
                "Every Tax Assurance board lives on CTAI, Clear's AI platform. Boards are not shipped by an engineering team. A builder works with an agent, which writes the queries over the account's data and the board itself, and the platform publishes it to a shared library. A tax team opens it there, shares it, and can question it in chat. The platform is Clear's. The boards, the patterns and the system that renders them are mine."
              }
            </p>
          </Prose>

          <Figure
            src="/work/tax-assurance/ctai-platform-board.png"
            alt="A Tax Assurance board inside CTAI, with the platform's chat open beside it"
            width={1600}
            height={875}
            caption="A board inside CTAI. The chat is the platform's."
            tag="Demo data"
          />
        </CaseStudySection>

        {/* 5 · Two dashboards became one product */}
        <CaseStudySection title="Two dashboards became one product">
          <Reveal>
            <Call
              title="Two dashboards, or one"
              takeaway="If two screens read the same data to answer one question, they are one product."
            >
              <p>
                {
                  "I had built the reconciliation and the SST filing as two separate dashboards. Once both were on the platform, I looked at them side by side. They read the same data, and a tax team only reconciles in order to file."
                }
              </p>
              <p>
                {
                  "Keeping them apart meant finding the same document twice, in two tools, and trusting that two boards agreed. So I merged them into one, with reconciliation and filing as two sections of the same navigation. The cost was a bigger board, and a navigation that had to carry two jobs without either burying the other."
                }
              </p>
            </Call>
          </Reveal>

          <Figure caption="Reconciliation and filing, read from the same data, became one board.">
            <VideoFigure
              src="/work/tax-assurance/merge.mp4"
              poster="/work/tax-assurance/merge-poster.png"
              alt="The reconciliation board and the filing board merging into one"
              width={1280}
              height={720}
            />
          </Figure>

          <Prose>
            <p>
              {
                "That combined board became Tax Assurance, which is how the product is sold today. Every board since follows the same chain, in every country."
              }
            </p>
          </Prose>

          <Figure caption="The reconciliation to filing chain, identical on every board.">
            <Frame>
              <ChainDiagram steps={CHAIN} />
            </Frame>
          </Figure>
        </CaseStudySection>

        {/* 5 · The first board: Saudi Arabia */}
        <CaseStudySection title="The first board: Saudi Arabia">
          <Prose>
            <p>
              {
                "The Saudi board builds the VAT return two ways, from the ledger and from the e-invoices cleared or reported to ZATCA, and shows where they disagree."
              }
            </p>
            <p>
              {
                "My manager pointed out that the first version had three problem surfaces, each drilling somewhere different, and none telling the user what to do. So every figure now drills to its documents, each with a what to do line, and the board opens on a verdict: not ready to file, how many documents are holding it up, and how much VAT is at risk."
              }
            </p>
          </Prose>

          <Figure
            src="/work/tax-assurance/ksa-executive-summary.png"
            alt="Saudi executive summary"
            width={2160}
            height={2565}
            cropHeight={760}
            caption="A verdict first, then the figures behind it."
            tag="Demo data"
          />

          <Reveal>
            <Call
              title="Simple buckets, or the true picture"
              takeaway="Decide a finding once, where the data lives, and nowhere else."
            >
              <p>
                {
                  "A client then said the reconciliation looked very simple and was not capturing the true picture. They were right. Matched, mismatched and missing were cosmetic."
                }
              </p>
              <p>
                {
                  "So the buckets became eighteen findings drawn from how ZATCA actually treats documents: stamp missing, rejected by ZATCA, rate against category, simplified invoice where a standard one was required, buyer VAT number missing, credit note with no original, wrong period, late reporting. Each carries its own rule for tax at risk and its own what to do."
                }
              </p>
              <p>
                {
                  "Each code is assigned once, in the query that reads the data. The summary, the document list and the filters cannot disagree, because none of them decides anything."
                }
              </p>
            </Call>
          </Reveal>

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

          <Reveal>
            <Call
              title="Build it in, or hand it to the agent"
              takeaway="Give the agent the one-off work. Keep it away from the number being filed."
            >
              <p>
                {
                  "Auditing the e-invoices against ZATCA's own cleared feed is a real need, but that feed is not held in the workspace. Building it into the board would mean ingesting data the board does not own, for a check that runs during an audit, not every month."
                }
              </p>
              <p>
                {
                  "So the board explains when the check is needed and writes the prompt for it. The user exports the ZATCA report, opens a chat, attaches it and pastes the prompt. The agent matches both sides and builds its own report. The boundary is stated on the screen: the agent's work does not change this filing."
                }
              </p>
              <p>
                {
                  "My part was deciding what the board hands to an agent, and what it keeps away from one."
                }
              </p>
            </Call>
          </Reveal>

          <Figure
            src="/work/tax-assurance/ksa-zatca-helper.png"
            alt="ZATCA check handed to an agent"
            width={2160}
            height={1395}
            caption="When to run the check, how, and the prompt to use."
            tag="Demo data"
          />
        </CaseStudySection>

        {/* 6 · Making it travel */}
        <CaseStudySection title="Making it travel">
          <Prose>
            <p>
              {
                "A tax team in Malaysia or France does the same job as one in Saudi Arabia. Almost nothing else is the same: different returns, different rates, different government records to reconcile against."
              }
            </p>
            <p>
              {
                "So everything that belongs to a country lives in its own logic, and everything a person sees comes from one shared system. A new country means new rules, not a new product."
              }
            </p>
          </Prose>

          <Figure caption="What changed between countries, and what was not allowed to.">
            <Frame>
              <CountryMatrix
                countries={["Malaysia", "Saudi Arabia", "France"]}
                rows={MATRIX_ROWS}
              />
            </Frame>
          </Figure>

          <SubHeading>Malaysia: what a number means</SubHeading>
          <Prose>
            <p>
              {
                "Malaysia is where the most important decisions turned out to be about what a number means."
              }
            </p>
          </Prose>

          <Reveal>
            <div className="my-10">
              <LimitCards limits={MY_LIMITS} />
            </div>
          </Reveal>

          <Prose>
            <p>
              {
                "The numbers are proved, not trusted. A separate classifier re-derives every document's status from the raw rows, and a test asserts it matches the scenario that generated it, for all 1,255 documents. It caught 27 real bugs."
              }
            </p>
            <p>
              {
                "Then the customer replied with two kinds of correction. Three mapping corrections moved the return by RM 0.00, because the tax code sets the rate. Confirmed re-codings in the ledger moved it by RM 6,522.10. Revision 1 stays frozen as filed, revision 2 is a separate board, and the build fails if any revision 1 file changes. What changed between them is computed, never typed."
              }
            </p>
          </Prose>

          <Figure
            src="/work/tax-assurance/my-what-changed.png"
            alt="Malaysia revision 2, what changed"
            width={2160}
            height={3557}
            cropHeight={760}
            caption="What changed. Every figure computed, none entered by hand."
            tag="Demo data"
          />

          <SubHeading>France: the return as a declaration</SubHeading>
          <Prose>
            <p>
              {
                "France is moving to mandatory e-invoicing, so a single sale can go wrong in more ways than a missing invoice. It can be sent down the wrong lane, rejected by the buyer, or reported without its payment ever being confirmed."
              }
            </p>
            <p>
              {
                "The tempting design was to put every difference on the return, beside the box it affects. That turns a statutory form into a worksheet, and the person signing it can no longer tell what they are declaring from what is still disputed. So the CA3 filing form shows the return as the books state it, and the differences live on a screen of their own, VAT form exceptions. Every screen ends on the same line: prepared draft, not filed."
              }
            </p>
          </Prose>

          <Figure
            src="/work/tax-assurance/france-ca3-filing-form.png"
            alt="The CA3 filing form, box by box"
            width={2348}
            height={4952}
            cropHeight={760}
            caption="The CA3 filing form, as the books state it."
            tag="Demo data"
          />

          <Figure
            src="/work/tax-assurance/france-vat-form-exceptions.png"
            alt="VAT form exceptions, the differences behind the return"
            width={2348}
            height={6716}
            cropHeight={760}
            caption="The differences, on a screen of their own."
            tag="Demo data"
          />

          {/* The board needs at least 820px to lay out, so on wide screens
              it breaks out of the reading measure and uses the gutters. */}
          <div className="min-[1400px]:w-[1280px] min-[1400px]:-mx-[100px]">
            <Figure
              caption="The French board, live. Click through it."
              tag="Demo data"
            >
              <LiveEmbed
                src="/demos/france-vat-assurance.html"
                title="France VAT assurance board, live, demo data"
                height={780}
                narrowNote="The live board needs a wider screen. Open it on a laptop to click through all nine screens."
              />
            </Figure>
          </div>
        </CaseStudySection>

        {/* 7 · The real test */}
        <CaseStudySection title="The real test">
          <Prose>
            <p>
              {
                "Everything above runs on synthetic companies. The real test came from a sales call with the finance head of a Malaysian device distributor who used Clear only for e-invoicing. Every sales question took half an hour of exports and pivot tables. SST was filed by hand. And any new tool meant months of IT and security review."
              }
            </p>
            <p>
              {
                "The agreed proof of concept: show something real, from data already in Clear, with no IT involvement. Gaps were acceptable, as long as they were shown rather than hidden. That meant building the SST return from e-invoices alone, with no ledger at all."
              }
            </p>
          </Prose>

          <Call
            title="Show the whole, then the part you used"
            takeaway="When the data is incomplete, account for all of it before using any of it."
          >
            <p>
              {
                "Almost everything this business sells is a device, which sits outside SST for a distributor. So the return covers a thin slice of what was invoiced. Shown on its own, a clean return built from that slice looks complete, and nobody can tell what was left out or why."
              }
            </p>
            <p>
              {
                "So the overview opens by proving where every invoiced line went: taxable, credit notes, out of scope, or not validated. Together they add up to everything invoiced. Only then does it show the return."
              }
            </p>
          </Call>

          <Figure
            src="/work/tax-assurance/prospect-every-line-accounted.png"
            alt="Every sales e-invoice line accounted for, before the return"
            width={1366}
            height={430}
            caption="The completeness proof. Every invoiced line accounted for before the return."
            tag="Masked"
          />

          <Prose>
            <p>
              {
                "The findings are sorted by what they do to the return. Credit notes that cannot support their deduction, tax charged on only part of a line, a service tax rate to confirm, imported services with no tax. A fifth group, e-invoice compliance issues, is labelled as having no effect on the return, so it never gets mistaken for one."
              }
            </p>
            <p>
              {
                "Two of my early claims were wrong: an imported services figure left in unconverted foreign currency, and a possible under-declaration that turned out to be supplier credit notes. The checks caught both. The corrections went onto the screen and to the stakeholder, with the corrected figure and the cause. "
              }
              <Em>
                {
                  "With a prospect deciding whether to trust you, the correction is part of the product."
                }
              </Em>
            </p>
            <p>
              {
                "The same e-invoices then answered the question the finance head asked on the call: how many units of one phone model sold between two dates. That had been a half hour of exports. It became one screen, inside a fourteen screen sales view built from nothing but e-invoices."
              }
            </p>
          </Prose>

          <Figure
            src="/work/tax-assurance/prospect-product-search.png"
            alt="Sales insights product search, units sold by model over a date range"
            width={1366}
            height={1600}
            cropHeight={760}
            caption="The prospect's own question, answered on one screen."
            tag="Masked"
          />

          <Figure
            src="/work/tax-assurance/prospect-sales-overview.png"
            alt="Sales and e-invoice insights overview, built from e-invoices only"
            width={1366}
            height={1500}
            cropHeight={760}
            caption="The wider sales view, built from e-invoices alone, with its limits named on the screen."
            tag="Masked"
          />

          <div className="my-10">
            <LimitCards limits={PROSPECT_LIMITS} />
          </div>

          <Prose>
            <p>
              {
                "The overview loads its own data first and the rest in the background. First paint went from 6.5 to 3.0 seconds, measured."
              }
            </p>
          </Prose>
        </CaseStudySection>

        {/* 8 · How it scales */}
        <CaseStudySection title="How it scales">
          <Prose>
            <p>
              {
                "Because boards are built with agents, there is no design file and no handoff. Whatever the builder and the agent produce is what the customer sees. So the design system is not a reference document. It is the only thing between a builder and a board that looks like nobody designed it."
              }
            </p>
            <p>
              {
                "By the time France was done, my own design system had drifted. I had written three skills that each claimed to be the system, at different points along the way, and they disagreed on more than twenty concrete points. That was survivable while I was the only builder. It would not survive PMs and engineers building with it, or an agent following it literally."
              }
            </p>
            <p>
              {
                "So I ruled once on every conflict, with a reason, and cut the system from 72,000 characters of prose to a manifest of about 160 lines. Filters are the clearest example: users wanted to filter on whichever column mattered to them, so filtering moved into the column headers and the filter bar went."
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

          <Figure caption="Six of the fourteen rulings. Each one names the conflict, decides it, and says why.">
            <Frame>
              <RulingsTable
                headers={["Conflict", "Ruling", "Why"]}
                rulings={RULINGS}
              />
            </Frame>
          </Figure>

          <Prose>
            <p>
              {
                "Then I split the rules from the rendering. A logic agent holds everything that belongs to a country. One rendering skill draws everything a person sees. The acceptance test was blunt: the Saudi board, rebuilt through the skill alone, had to reproduce the hand built board byte for byte."
              }
            </p>
          </Prose>

          <Figure caption="What varies by country is kept out of what a person sees. A new country means new rules, not a new product.">
            <Frame>
              <ArchitectureDiagram columns={ARCH} />
            </Frame>
          </Figure>

          <Prose>
            <p>
              {
                "In a single file dashboard, almost every design mistake is silent. So conformance became code: eleven static checks, and fifteen more in a real browser. Every check is itself tested: break what it guards, confirm it fails, then revert. Some things no check can catch, like a dense screen that reads as clutter. The audit is a floor, not a substitute for looking at the page."
              }
            </p>
          </Prose>

        </CaseStudySection>

        {/* 9 · Where it landed */}
        <CaseStudySection title="Where it landed">
          <Prose>
            <p>
              {
                "Tax Assurance is in market with six customers across Saudi Arabia, Malaysia and France. A real prospect saw it work on their own data. And one design system, with runnable audits, is now what PMs and engineers build with."
              }
            </p>
            <p>
              {
                "Not every board follows its own rules yet, and the audits measure what a board has, never what it used to have, so a dropped feature is still caught by a person."
              }
            </p>
          </Prose>

          <SubHeading>What I took from this</SubHeading>
          <Takeaways takeaways={TAKEAWAYS} />
        </CaseStudySection>

        {/* 10 · Closing note */}
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
              <Link
                href="/#work"
                className="group inline-flex items-center gap-2 mt-5 text-[14px] text-[#6B6B68] hover:text-[#D97706] transition-colors duration-200 ease-out"
              >
                <span
                  aria-hidden
                  className="transition-transform duration-200 ease-out group-hover:-translate-x-[2px]"
                >
                  ←
                </span>
                Back to all work
              </Link>
            </div>
          </div>
        </section>
      </CaseStudyLayout>
      <Footer />
    </>
  );
}
