import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
import { ChainDiagram } from "@/components/case-study/chain-diagram";
import { CountryMatrix } from "@/components/case-study/country-matrix";
import { RulingsTable } from "@/components/case-study/rulings-table";
import { ArchitectureDiagram } from "@/components/case-study/architecture-diagram";
import { AuditTerminal } from "@/components/case-study/audit-terminal";
import { LimitCards } from "@/components/case-study/limit-cards";
import { LiveEmbed } from "@/components/case-study/live-embed";
import { Takeaways } from "@/components/case-study/takeaways";
import { OutcomesSection } from "@/components/case-study/outcomes-section";
import { Call } from "@/components/case-study/call";

export const metadata: Metadata = {
  // The root layout appends " · Prajit Nandeshwar" via its title
  // template, so this is just the page name.
  title: "Tax Assurance",
  description:
    "Designing VAT and SST returns a finance team can trust enough to sign. Built country by country across Saudi Arabia, Malaysia and France.",
};

const CREDITS = [
  {
    label: "Role",
    value: "Lead Designer. Designed and built with an agent in the terminal",
  },
  { label: "Product", value: "Tax Assurance, on Clear's AI platform CTAI" },
  { label: "Timeline", value: "April to present" },
  { label: "Read", value: "10 min" },
  { label: "Data", value: "Synthetic demo companies, and one real prospect, masked" },
];

const STATS = [
  { value: "3", label: "tax regimes" },
  { value: "18", label: "coded ZATCA findings" },
  { value: "27", label: "bugs caught by proving the numbers" },
  { value: "26", label: "automated design checks" },
  { value: "6", label: "real customers, three countries" },
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

const AUDIT = [
  { label: "the page declares a doctype", detail: "standards mode" },
  { label: "the board's own values survive the host theme", detail: "identical under both" },
  { label: "every screen renders with no JavaScript error", detail: "8 screens" },
  { label: "the content pane scrolls", detail: "scrolled to 381px" },
  { label: "the nav stays pinned while the content scrolls", detail: "fixed" },
  { label: "every selected control meets WCAG AA (4.5:1)", detail: ".segbtn.on = 17.76:1" },
  { label: "every descendant styled class has its ancestor", detail: "11 classes across 8 screens" },
  { label: "every table row matches its header", detail: "8 screens walked" },
  { label: "charts render at non zero size, leave no orphan", detail: "canvases 2/2, live 2" },
  { label: "the grid is visually identical to .table", detail: "8 computed properties" },
  { label: "every export produces a populated sheet", detail: "5 sheets" },
  { label: "the page never scrolls horizontally", detail: "1366, 1180, 1024, 820" },
];


const OUTCOMES = [
  { value: "6", label: "customers across Malaysia, Saudi Arabia and France" },
  { value: "3", label: "boards in market" },
  { value: "1", label: "proof of concept, on a prospect's own data" },
  { value: "160", label: "lines of design system, down from 72,000 characters" },
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
          tagline="Designing VAT and SST returns a finance team can trust enough to sign. Built country by country across Saudi Arabia, Malaysia and France, then tested on a real prospect's own data."
          credits={CREDITS}
          visual={
            <figure style={{ margin: 0 }}>
              {/* No frame: the composite carries its own soft shadows and
                  its background has been matched to the page, so a border
                  and a surface fill would only draw a second box around it.
                  Bleeds slightly into the right gutter on wide screens so
                  the boards read a little larger. */}
              <div className="relative w-full min-[1200px]:w-[110%]">
                <Image
                  src="/work/tax-assurance/hero-three-boards-clean.png"
                  alt="The France, Saudi and Malaysia Tax Assurance boards"
                  width={2346}
                  height={989}
                  priority
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="block w-full h-auto"
                />
              </div>
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

        {/* 3 · A number someone signs */}
        <CaseStudySection title="A number someone signs">
          <Prose>
            <p>
              {
                "A VAT or SST return is a legal declaration with a person's name on it. Before filing, a tax team reconciles its books against the government's e-invoice records, finds what disagrees, and decides what to fix. Tax Assurance is the board they do that on."
              }
            </p>
            <p>
              {
                "Every design decision came back to one question: would a finance team sign a return based on this screen? I built it one country at a time: Saudi Arabia, then Malaysia, then France. I sat with each tax team, built the board with an agent, and validated it with them as I went. The agent wrote most of the code. I set the direction, made the calls, and judged the output. Then a real prospect tested the approach on their own data."
              }
            </p>
            <p>
              {
                "Every board shares one shape. It is the one thing I did not let vary by country."
              }
            </p>
          </Prose>

          <Figure caption="The reconciliation to filing chain, identical on every board.">
            <Frame>
              <ChainDiagram steps={CHAIN} />
            </Frame>
          </Figure>

          <Prose>
            <p>{"Almost everything on top of that chain changed by country."}</p>
          </Prose>

          <Figure caption="What changed between countries, and what was not allowed to.">
            <Frame>
              <CountryMatrix
                countries={["Malaysia", "Saudi Arabia", "France"]}
                rows={MATRIX_ROWS}
              />
            </Frame>
          </Figure>
        </CaseStudySection>

        {/* 5 · Built on CTAI */}
        <CaseStudySection title="Built on CTAI">
          <Prose>
            <p>
              {
                "CTAI is Clear's AI platform. Finance teams build agents on it to solve their own problems. Every Tax Assurance board lives there."
              }
            </p>
            <p>
              {
                "Boards are not shipped by an engineering team. A builder works with an agent: the agent writes the queries over the account's data and the board itself, a single file app, and the platform publishes it to a shared library. A tax team opens it there, shares it, and can question it in chat."
              }
            </p>
            <p>
              {
                "That changes where design sits. There is no design file and no handoff. Whatever the builder and the agent produce is what the customer sees. So the design system is not a reference document. It is the only thing between a builder and a board that looks like nobody designed it."
              }
            </p>
            <p>
              {
                "The platform is Clear's. The boards, the patterns and the system that renders them are mine."
              }
            </p>
          </Prose>

          <Figure
            src="/work/tax-assurance/ctai-platform-board.png"
            alt="A Tax Assurance board inside CTAI, with the platform's chat open beside it"
            width={3024}
            height={1654}
            caption="A board inside CTAI. The chat is the platform's."
            tag="Demo data"
          />
        </CaseStudySection>

        {/* 4 · Saudi Arabia */}
        <CaseStudySection title="Saudi Arabia: where the patterns came from">
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

          <Figure
            src="/work/tax-assurance/ksa-recon-summary.png"
            alt="Saudi recon summary with findings"
            width={2160}
            height={1737}
            cropHeight={760}
            caption="Each status opens into the findings behind it, in plain language."
            tag="Demo data"
          />

          <SubHeading>Build it in, or hand it to the agent</SubHeading>
          <Prose>
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
                "The same board has a small ask box for quick questions, with the board's computed figures passed to the model as context."
              }
            </p>
            <p>
              {
                "My part was deciding what the board hands to an agent, and what it keeps away from one."
              }
            </p>
            <p>
              <Em>
                {
                  "Give the agent the one-off work. Keep it away from the number being filed."
                }
              </Em>
            </p>
          </Prose>

          <Figure
            src="/work/tax-assurance/ksa-zatca-helper.png"
            alt="ZATCA check handed to an agent"
            width={2160}
            height={1395}
            caption="When to run the check, how, and the prompt to use."
            tag="Demo data"
          />
        </CaseStudySection>

        {/* 6 · Malaysia */}
        <CaseStudySection title="Malaysia: two dashboards became one product">
          <Call
            title="Two dashboards, or one"
            takeaway="If two screens read the same data to answer one question, they are one product."
          >
            <p>
              {
                "I had built the SST reconciliation and the SST-02 filing as two separate dashboards. Once both were on the platform, I looked at them side by side. They read the same data, and a tax team only reconciles in order to file."
              }
            </p>
            <p>
              {
                "Keeping them apart meant finding the same document twice, in two tools, and trusting that two boards agreed. So I merged them into one, with reconciliation and filing as two sections of the same navigation. The cost was a bigger board, and a navigation that had to carry two jobs without either burying the other."
              }
            </p>
          </Call>

          <Prose>
            <p>
              {
                "That combined board became Tax Assurance, and it is why every board has the shape shown at the top of this page."
              }
            </p>
          </Prose>

          <Figure
            src="/work/tax-assurance/my-executive-summary.png"
            alt="Malaysia executive summary"
            width={2160}
            height={3263}
            cropHeight={760}
            caption="The merged board. Reconciliation and SST-02 filing in one navigation, opening on a verdict."
            tag="Demo data"
          />

          <SubHeading>Rules about numbers</SubHeading>
          <Prose>
            <p>
              {
                "Malaysia is where the most important decisions turned out to be about what a number means."
              }
            </p>
          </Prose>

          <div className="my-10">
            <LimitCards limits={MY_LIMITS} />
          </div>

          <Prose>
            <p>
              {
                "The numbers are proved, not trusted. A separate classifier re-derives every document's status from the raw rows, and a test asserts it matches the scenario that generated it, for all 1,255 documents. It caught 27 real bugs. One: adding 25 days to the 2nd of a month stays in the same month, so a document cleared next period was silently marked matched."
              }
            </p>
            <p>
              {
                "Then the customer replied with two kinds of correction. Three mapping corrections moved the return by RM 0.00, because the tax code sets the rate. Confirmed re-codings in the ledger moved it by RM 6,522.10."
              }
            </p>
          </Prose>

          <SubHeading>Stating the change, or computing it</SubHeading>
          <Prose>
            <p>
              {
                "The quick way to show a revision is to overwrite the numbers and add a note. That is how a return quietly drifts from what was actually filed."
              }
            </p>
            <p>
              {
                "So revision 1 stays frozen as filed, and revision 2 is a separate board. The build fails if any revision 1 file changes. A What changed screen computes the difference from both datasets and puts both kinds of correction side by side, so the customer can see why some of their changes moved the return and some could not."
              }
            </p>
            <p>
              <Em>
                {
                  "A filed number never changes quietly."
                }
              </Em>
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
        </CaseStudySection>

        {/* 7 · France */}
        <CaseStudySection title="France: the return as a declaration">
          <Prose>
            <p>
              {
                "France is moving to mandatory e-invoicing, so a single sale can go wrong in more ways than a missing invoice. It can be sent down the wrong lane, rejected by the buyer, or reported without its payment ever being confirmed. Every finding rolls up into one of seven outcomes, each marked review or resolve."
              }
            </p>
          </Prose>

          <SubHeading>The form shows the books. The findings live elsewhere.</SubHeading>
          <Prose>
            <p>
              {
                "The tempting design was to put every difference on the return, beside the box it affects. That turns a statutory form into a worksheet, and the person signing it can no longer tell what they are declaring from what is still disputed."
              }
            </p>
            <p>
              {
                "So the CA3 screen shows the return as the books state it. Differences live on the recon summary. Boxes backed by ledger lines drill into them, and only those boxes carry a link. Every screen ends on the same line: prepared draft, nothing filed or transmitted."
              }
            </p>
            <p>
              <Em>
                {
                  "A return should read as a declaration, not a worksheet."
                }
              </Em>
            </p>
          </Prose>

          <Figure
            src="/work/tax-assurance/france-ca3-return.png"
            alt="CA3 return"
            width={2160}
            height={1478}
            caption="The CA3 return in the form's own French labels, with English beneath."
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

        {/* 8 · Then a real prospect */}
        <CaseStudySection title="Then a real prospect">
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

        {/* 9 · Making it repeatable */}
        <CaseStudySection title="Making it repeatable">
          <Prose>
            <p>
              {
                "By the time France was done, I had written three skills that each claimed to be the design system. All three were mine, written at different points along the way. They disagreed on more than twenty concrete points, and one contradicted itself, still describing a teal brand after the tokens had moved to near black."
              }
            </p>
            <p>
              {
                "That was survivable while I was the only builder, because the real rules lived in my head. It would not survive PMs and engineers building with it, or an agent following it literally."
              }
            </p>
            <p>
              {
                "The tokens were identical across boards. What had drifted was the documentation, the thing an agent or another builder reads to reproduce the system."
              }
            </p>
          </Prose>

          <SubHeading>Rule once, or let every builder decide</SubHeading>
          <Prose>
            <p>
              {
                "The easy fix was to merge the three skills and soften the conflicts into guidance. That works only while one person knows which rule is the real one."
              }
            </p>
            <p>
              {
                "So I ruled. Fourteen conflicts, each decided once, each with a reason, and the system cut from 72,000 characters to a manifest of about 160 lines."
              }
            </p>
            <p>
              {
                "Filters are the clearest example. Boards used to carry a filter bar on top, and whoever built the board chose what went in it. It cost space, and users pushed back. These tables have many columns, and they wanted to filter on whichever one mattered to them. So filtering moved into the column headers. Every column filters, and the bar is gone."
              }
            </p>
            <p>
              <Em>
                {
                  "A design system that does not rule is a suggestion."
                }
              </Em>
            </p>
          </Prose>

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
                "I had built Malaysia by copying the Saudi board, and every copy carried the last country's assumptions. So the two concerns were split. A logic agent holds everything that belongs to a country: it maps an account's own tables onto a fixed column contract and a common tax code vocabulary, and checks the maths. One rendering skill draws everything a person sees. The acceptance test: the Saudi board, rebuilt through the skill alone, had to reproduce the hand built board byte for byte."
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
                "In a single file dashboard, almost every design mistake is silent. One selected control rendered white on near white inside the platform while correct locally, because the platform's injected theme overrode ours. No review could have caught it. So conformance became code: eleven static checks, and fifteen more in a real browser against a deliberately hostile theme. Every check is itself tested: break what it guards, confirm it fails, then revert. "
              }
              <Em>{'"It looks right" is not evidence.'}</Em>
            </p>
          </Prose>

          <Figure caption="A clean render audit on the France VAT board. Design review, run in seconds, on every board.">
            <AuditTerminal
              command="$ python audit_render.py france_vat_assurance"
              checks={AUDIT}
            />
          </Figure>

          <Prose>
            <p>
              {
                "Some things no check can catch: a summary that repeats its own detail and drifts from it, a row with two things to click, a dense screen that reads as clutter. Those came back from review, and they always will. "
              }
              <Em>
                {
                  "The audit is a floor, not a substitute for looking at the page."
                }
              </Em>
            </p>
          </Prose>
        </CaseStudySection>

        {/* 10 · Where it landed */}
        <CaseStudySection title="Where it landed">
          <Prose>
            <p>
              {
                "Tax Assurance boards for Saudi Arabia, Malaysia and France, deployed and demo ready. A working proof of concept on a real prospect's data. And one design system with runnable audits, the standard for every Tax Assurance board and now used by the PMs and engineers who build with it."
              }
            </p>
            <p>
              {
                "Next is a scheduled agent that emails a monthly management pack and alerts from the same tables. It is planned, not built."
              }
            </p>
          </Prose>
        </CaseStudySection>

        {/* 11 · What is still open */}
        <CaseStudySection title="What is still open">
          <Prose>
            <p>
              {
                "Not every board follows its own rules yet: the French board has no verdict or agent handoff, and two headline cards show at-risk figures without naming their scope. And the audits measure what a board has, never what it used to have, so a dropped feature is still caught by a person."
              }
            </p>
          </Prose>
        </CaseStudySection>

        {/* 12 · What I took from this */}
        <CaseStudySection title="What I took from this">
          <Takeaways takeaways={TAKEAWAYS} />
        </CaseStudySection>

        {/* 13 · Outcomes (dark) */}
        <OutcomesSection
          label="Outcomes"
          title="What it adds up to."
          outcomes={OUTCOMES}
        />

        {/* 13 · Closing note */}
        <section className="px-6 md:px-12 pb-16 md:pb-20">
          <div className="mx-auto max-w-[1080px]">
            <div
              className="border-t pt-8 text-[14px] text-[#6B6B68] leading-[1.6]"
              style={{ borderColor: "#E5E2DC" }}
            >
              <p>
                {
                  "Every company in this case study is invented and every figure generated, except the prospect section, where all visuals are masked and the business is described generically."
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
