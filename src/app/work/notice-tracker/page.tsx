import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { CaseStudyStats } from "@/components/case-study/case-study-stats";
import {
  CaseStudySection,
  Prose,
  Em,
} from "@/components/case-study/case-study-section";
import { CaseStudyTriad } from "@/components/case-study/case-study-triad";
import { CaseStudySubLabel } from "@/components/case-study/case-study-sub-label";
import { ScreenshotPlaceholder } from "@/components/case-study/screenshot-placeholder";
import { ScrollingScreenshot } from "@/components/case-study/scrolling-screenshot";
import { HeroDashboardPlaceholder } from "@/components/case-study/hero-dashboard-placeholder";
import { CaseIdAnimation } from "@/components/case-study/case-id-animation";
import { Call } from "@/components/case-study/call";
import { ArchitectureMap } from "@/components/case-study/architecture-map";
import { RepliesOpening } from "@/components/case-study/replies-opening";
import { PivotVisual } from "@/components/case-study/pivot-visual";
import { AIExtractionSequence } from "@/components/case-study/ai-extraction-sequence";
import { ChaosNoticesPile } from "@/components/case-study/chaos-notices-pile";
import { Takeaways } from "@/components/case-study/takeaways";
import { WhatCameNext } from "@/components/case-study/what-came-next";
import { NextCaseStudy } from "@/components/case-study/next-case-study";
import { AnnotatedScreens } from "@/components/case-study/annotated-screens";
import { OutcomesSection } from "@/components/case-study/outcomes-section";
import { NoticeVsCase } from "@/components/case-study/notice-vs-case";
import { OptionsRow } from "@/components/case-study/options-row";
import { AiWorkSplit, type WorkSplitRow } from "@/components/case-study/ai-work-split";
import { PlacementSchematics } from "@/components/case-study/placement-schematics";

export const metadata: Metadata = {
  // The root layout appends " · Prajit Nandeshwar" via its title
  // template, so this is just the page name. Setting the full string
  // here is what made the tab read the name twice.
  title: "Notice Tracker",
  description:
    "AI-powered platform for managing GST notices at scale. 100+ enterprises, 85% adoption, ₹2.3Cr ARR.",
  // Page specific cards. The image comes from opengraph-image.png in this
  // folder, which takes precedence over the site wide one.
  openGraph: {
    title: "Notice Tracker · Prajit Nandeshwar",
    description:
      "AI-powered platform for managing GST notices at scale. 100+ enterprises, 85% adoption, ₹2.3Cr ARR.",
    url: "https://prajitnandeshwar.in/work/notice-tracker",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notice Tracker · Prajit Nandeshwar",
    description:
      "AI-powered platform for managing GST notices at scale. 100+ enterprises, 85% adoption, ₹2.3Cr ARR.",
  },
};

const STATS = [
  { value: "100", suffix: "+", label: "Enterprises" },
  { value: "85", suffix: "%", label: "User adoption" },
  { value: "90", suffix: "%", label: "Tracking success" },
  { value: "₹2.3", suffix: "Cr", label: "Annual revenue" },
];

// Iteration data. Every new image lives in public/work/notice-tracker/v3.
// Each figure uses a different pattern, chosen to fit the decision it shows.

const CASEVIEW_OPTIONS = [
  {
    label: "Every stage as rows",
    src: "/work/notice-tracker/v3/caseview-1-table.webp",
    alt: "Case view exploration showing every stage of a case as rows in one table.",
    verdict: "Complete, but everything competes at once.",
  },
  {
    label: "Banner and locked stages",
    src: "/work/notice-tracker/v3/caseview-2-banner.webp",
    alt: "Case view exploration with a large case banner on top and later stages locked below it.",
    verdict: "A loud header pushed the actual work down the page.",
  },
  {
    label: "Timeline on the left",
    src: "/work/notice-tracker/v3/caseview-3-left-timeline.webp",
    alt: "Case view exploration with a stage timeline in a left column and stage details on the right.",
    verdict: "Clear order, but it split attention across two columns.",
  },
  {
    label: "Status timeline",
    src: "/work/notice-tracker/v3/caseview-4-status-timeline.webp",
    alt: "Case view exploration with a horizontal status timeline across the top of the case.",
    verdict: "The closest, but it became a second timeline beside the audit trail.",
  },
];

const AI_ROWS: WorkSplitRow[] = [
  {
    title: "No AI",
    status: "replaced",
    outcome: "Almost nobody filled it in.",
    cells: [
      { who: "you", text: "Opens the PDF" },
      { who: "you", text: "Types reasons in" },
      { who: "you", text: "Their own reading" },
    ],
    ready: "Whenever someone gets to it",
    src: "/work/notice-tracker/v3/ai-1-manual-reasons.webp",
    alt: "Case view with empty notice reason fields for the user to fill in by hand.",
  },
  {
    title: "On demand",
    status: "replaced",
    outcome: "Fine for one case, tedious across many.",
    cells: [
      { who: "ai", text: "Reads it, after a click" },
      { who: "ai", text: "Fills the case" },
      { who: "you", text: "Waits, then scans" },
    ],
    ready: "After a click and a wait, per case",
    src: "/work/notice-tracker/v3/ai-2-on-demand.webp",
    alt: "A Summarise with Clear Intelligence button in the case, with a loading message.",
  },
  {
    title: "Review gate",
    status: "notShipped",
    outcome: "Approving a value meant reading the PDF.",
    cells: [
      { who: "ai", text: "Reads every notice" },
      { who: "ai", text: "Proposes values" },
      { who: "you", text: "Reopens the PDF to approve each one", flag: true },
    ],
    ready: "Only after every value is approved",
    src: "/work/notice-tracker/v3/ai-3-review-gate.webp",
    alt: "A review screen asking the user to check AI generated fields, grouped by confidence.",
  },
  {
    title: "Overnight",
    status: "shipped",
    outcome: "The case is ready before the team is.",
    cells: [
      { who: "ai", text: "Reads every notice overnight" },
      { who: "ai", text: "Fills and marks each value" },
      { who: "ai", text: "Leaves a blank when unsure" },
    ],
    ready: "Before the team starts work",
    src: "/work/notice-tracker/v3/ai-4-overnight-sync.webp",
    alt: "A sync summary showing new cases and fields Clear AI filled in the background.",
  },
];

const PLACEMENTS = [
  {
    layout: "underPdf",
    label: "Under the PDF",
    status: "explored",
    verdict: "Easy to miss below a long document.",
    screens: [
      {
        src: "/work/notice-tracker/v3/placement-1-under-pdf.webp",
        alt: "A notice PDF open in the case with the AI summary placed below it.",
        caption: "The summary sits under the open notice. On a long document it drops out of view.",
      },
    ],
  },
  {
    layout: "compareDocs",
    label: "Beside two documents",
    status: "explored",
    verdict: "Useful for comparing, crowded for everything else.",
    screens: [
      {
        src: "/work/notice-tracker/v3/placement-2-compare-docs.webp",
        alt: "Two documents open side by side with an AI summary below them.",
        caption: "The notice and its annexure open side by side, with one summary under both.",
      },
    ],
  },
  {
    layout: "button",
    label: "Behind a button",
    status: "replaced",
    verdict: "Slow, and still a manual action.",
    screens: [
      {
        step: "Click",
        src: "/work/notice-tracker/v3/placement-3-button-1-idle.webp",
        alt: "A case with a Summarise with Clear AI button above the stages.",
        caption: "The case opens with no reading. The user has to ask for it.",
      },
      {
        step: "Wait",
        src: "/work/notice-tracker/v3/placement-3-button-2-loading.webp",
        alt: "Clear AI reading the notice after the button was clicked.",
        caption: "Clear AI reads the notice while the user waits.",
      },
      {
        step: "Read",
        src: "/work/notice-tracker/v3/placement-3-button-3-result.webp",
        alt: "The AI summary shown in a popover over the case.",
        caption: "The summary appears in a popover, and the user repeats this for every case.",
      },
    ],
  },
  {
    layout: "chat",
    label: "In a chat",
    status: "notShipped",
    verdict: "Our users live in Excel. We did not expect them to chat.",
    screens: [
      {
        step: "Open",
        src: "/work/notice-tracker/v3/placement-4-chat.webp",
        alt: "A Clear AI chat panel with suggested questions about the notice.",
        caption: "The chat opens empty, with a few suggested questions.",
      },
      {
        step: "Ask",
        src: "/work/notice-tracker/v3/placement-4-chat-2-reply.webp",
        alt: "A conversation with Clear AI about how to reply to a notice.",
        caption: "Answers come one question at a time, in a panel over the case.",
      },
    ],
  },
  {
    layout: "panelTop",
    label: "Summary on top",
    status: "notShipped",
    verdict: "It pushed the stages, the actual work, down the page.",
    screens: [
      {
        src: "/work/notice-tracker/v3/caseview-5-shipped-clear-ai-panel.webp",
        alt: "Case view exploration with the AI summary and reasons in a block above the stages.",
        caption: "Summary and reasons sit above the stages, ready before anyone opens the PDF.",
      },
    ],
  },
] as const;

const OUTCOMES = [
  { value: "100", suffix: "+", label: "Enterprises onboarded" },
  { value: "85", suffix: "%", label: "User adoption" },
  { value: "90", suffix: "%", label: "Notice tracking success" },
  { value: "₹2.3", suffix: "Cr", label: "Annual recurring revenue" },
];

const TRIAD = [
  {
    title: "Process and scale",
    body: "What did their current workflow look like? How were their teams structured? What was their monthly and annual notice volume?",
  },
  {
    title: "Prioritisation and impact",
    body: "Which notices were most common? Which carried the highest financial risk? What mattered more, volume or value at stake?",
  },
  {
    title: "The human element",
    body: "How did notices feel? What did anxiety, frustration, and pressure look like in their teams when a notice arrived?",
  },
];

const TAKEAWAYS = [
  {
    number: "01",
    heading: "Find the canonical key.",
    body: (
      <p>
        For Notice Tracker it was the Case ID: one stable identifier that let
        the dashboard, the case list and the AI all describe the same thing.
      </p>
    ),
  },
  {
    number: "02",
    heading: "Try the manual path first.",
    body: (
      <p>
        Letting users add notice reasons by hand failed. That told us the AI
        had to do the reading without being asked, which is what the
        overnight sync does.
      </p>
    ),
  },
  {
    number: "03",
    heading: "Narrow when the usage says so.",
    body: (
      <p>
        We planned for every framework. Usage showed GST was where customers
        got value, so ITR and TDS were scaled back and the effort went into
        GST.
      </p>
    ),
  },
  {
    number: "04",
    heading: "Design for being wrong.",
    body: (
      <p>
        The AI extraction is usually right and occasionally not. The design
        work was making sure a user can always tell what the government sent
        from what the system read.
      </p>
    ),
  },
];

export default function NoticeTrackerPage() {
  return (
    <>
      <Nav />
      <main
        className="case-study flex-1"
        style={{ backgroundColor: "#FAFAF9", color: "#1F1F1E" }}
      >
        {/* 1 · Hero */}
        <CaseStudyHero
          backHref="/#work"
          backLabel="Back to work"
          title="Notice Tracker"
          accentChar="."
          tagline="Turning scattered GST notices into cases a tax team can track. From a two-day build customers rejected, to ₹2.3 Cr in annual revenue."
          credits={[
            { label: "Role", value: "Lead Designer & PM" },
            { label: "Timeline", value: "2025–26" },
            { label: "Read", value: "11 min" },
            { label: "Team", value: "Founder, Product, Engineering, Sales" },
          ]}
          visual={<HeroDashboardPlaceholder />}
        />

        {/* 2 · Stats strip */}
        <CaseStudyStats stats={STATS} />

        {/* 3 · The chaos before */}
        <CaseStudySection title="The chaos before.">
          <Prose>
            <p>
              Indian enterprises were managing thousands of GST notices across
              emails, spreadsheets, and a government portal that was never
              designed for compliance teams. A single missed deadline could
              mean penalties in lakhs, sometimes crores.
            </p>
            <p>
              The portal returned communications. Teams needed cases. There was
              no priority signaling, no chronological view, no team workflow.
              Just a list of documents with cryptic reference IDs, scattered
              across months.
            </p>
          </Prose>

          <ChaosNoticesPile />

          <Prose>
            <p>
              We did not initially plan to build a notice product. Our
              enterprise customers pulled us toward it. They kept asking for
              the same thing in different words: a way to stop losing money to
              deadlines they could not see.
            </p>
          </Prose>
        </CaseStudySection>

        {/* 4 · The first attempt (new in v3) */}
        <CaseStudySection title="The first attempt.">
          <Prose>
            <p>
              When a customer asked for help, we answered fast. We built a
              GST notice tracker in two days on our old framework: every
              notice moving through seven legal stages, each stage with an
              owner and target dates.
            </p>
            <p>
              It was shot down. Users could not tell what to track, the stages
              confused them, and assigning owners was tedious. We had built what
              was asked for before understanding the work.
            </p>
          </Prose>

          <AnnotatedScreens
            screens={[
              {
                src: "/work/notice-tracker/v3/v0-notice-overview.webp",
                alt: "Version 0 overview listing GST notices for each business, with counts broken down by seven legal stages.",
                caption: "Version 0 overview: every business, every stage, in one table.",
                aspect: "504/285",
                pins: [
                  {
                    n: 1,
                    x: 28,
                    y: 28,
                    note: {
                      title: "No sense of what to track",
                      body: "Totals for every stage and every business, all at once. Nothing said what needed attention.",
                    },
                  },
                  {
                    n: 2,
                    x: 74,
                    y: 42,
                    note: {
                      title: "Seven legal stages",
                      body: "Every notice split from summons to Supreme Court. The stages confused more than they helped.",
                    },
                  },
                ],
              },
              {
                src: "/work/notice-tracker/v3/v0-stage-editor.webp",
                alt: "Version 0 stage editor where each of seven stages has an owner, a start date and a target date.",
                caption: "Version 0 stage editor: an owner and dates for every stage.",
                aspect: "504/285",
                pins: [
                  {
                    n: 3,
                    x: 37,
                    y: 48,
                    note: {
                      title: "An owner for every stage",
                      body: "Each stage needed an owner, a start date and a target date, set by hand. Tedious, so nobody kept it up.",
                    },
                  },
                ],
              },
            ]}
          />

          <Prose>
            <p>
              That failure is where the real product started. This time, I went
              to understand the work before designing anything.
            </p>
          </Prose>
        </CaseStudySection>

        {/* 4 · Understanding the chaos */}
        <CaseStudySection title="Understanding the chaos.">
          <Prose>
            <p>
              Before talking to customers again, I spent a week inside the
              government&rsquo;s GST portal. Mapped every screen, every
              workflow, every data field. I needed to know what the system
              actually returned, not what customers thought it returned.
            </p>
            <p>
              Then we ran customer interviews. We asked questions in three
              categories:
            </p>
          </Prose>

          <CaseStudyTriad items={TRIAD} />

          <div className="mt-10">
            <Prose>
              <p>
                Most products would ask the first category. The second and
                third are where the real insight came from. Customers did not
                want a tool that organized documents. They wanted a tool that
                protected them from financial damage.
              </p>
              <p>
                We ran the research as a two-week sprint, with the
                engineering lead and product head in every review. The IA
                locked before we touched UI.
              </p>
            </Prose>
          </div>
        </CaseStudySection>

        {/* 5 · The breakthrough */}
        <CaseStudySection title="The breakthrough.">
          <Prose>
            <p>
              Our deepest analysis of the government portal revealed its single
              greatest flaw. The portal returned a dump of communications
              without a clear chronological trail. Multiple updates related to
              the same legal matter could appear as separate items with
              different reference IDs, scattered across months.
            </p>
            <p>
              A case is not a document. A case is a conversation between a tax
              authority and a taxpayer, often spanning multiple stages:
              Intimation, Notice, Order, sometimes higher courts. The
              government&rsquo;s reference IDs were document IDs. We needed
              case IDs.
            </p>
          </Prose>

          <CaseIdAnimation />

          <Call
            title="Mirror the portal, or model the domain"
            takeaway="Mirroring the source is the safe choice, and it means inheriting its problems."
          >
            <p>
              Our first instinct, and our first version, followed the portal:
              notices listed flat, the way the government returns them.
            </p>
            <p>
              That has a real argument behind it. Users already knew that view. Nothing in our product would contradict what they saw when they logged into the portal, and we would never have to defend a structure the government did not recognise.
            </p>
            <p>
              The problem is that it inherits the portal&rsquo;s flaw. A flat list of reference IDs is not how a tax dispute works, and users were already doing the linking by hand, in spreadsheets, every month.
            </p>
            <p>
              So we grouped on GSTIN first, then made the Case ID the spine. Reference IDs did not disappear. They became data points hanging off the case rather than the thing you navigate by.
            </p>
          </Call>

          <Prose>
            <p>
              So every screen and every interaction anchors to a stable Case
              ID. That one decision simplified the information architecture:
              the dashboard could group by case, not by communication. The case
              list could prioritise by case status, not by document type. The
              case page could show a true chronological history. And the AI,
              when we added it later, could summarise across the life of a case
              rather than one document at a time.
            </p>
          </Prose>

          <NoticeVsCase />

          <Prose>
            <p>
              The spine kept growing. Linking related cases started as a manual
              action: search, select up to five cases, link. Once the AI could
              read notices, it linked them automatically.
            </p>
          </Prose>
        </CaseStudySection>

        {/* 6 · Three pages, three personas */}
        <CaseStudySection title="Three pages, three personas.">
          <Prose>
            <p>
              Our research surfaced three distinct user types, each with a
              different job to be done. The product had to serve all three,
              but they needed different views.
            </p>
            <p>
              <Em>The CFO</Em> needed a 30-second risk view. Total financial
              exposure, what is overdue, what is time-critical. No need to see
              individual notices. They just need to know how worried to be.
            </p>
            <p>
              <Em>The Tax Head</Em> needed to triage. Which entities carry the
              most risk? Which team members should handle what? How is the
              pipeline looking?
            </p>
            <p>
              <Em>The Analyst</Em> needed to do the work. Read the notice,
              gather the data, draft the reply. Maximum context on a single
              screen, minimum hunting.
            </p>
            <p>I designed three pages, one for each role.</p>
          </Prose>

          {/* Sub-section 1: Dashboard */}
          <div className="mt-8">
            <CaseStudySubLabel text="Dashboard · CFO view" className="mb-3" />
            <ScrollingScreenshot
              topbar="/work/notice-tracker/dashboard-topbar.png"
              rail="/work/notice-tracker/dashboard-rail.png"
              content={{
                src: "/work/notice-tracker/dashboard-content.png",
                width: 2636,
                height: 2316,
              }}
              full="/work/notice-tracker/dashboard-full.png"
              alt="The Notice Tracker dashboard, showing case buckets, workflow status and a PAN level summary."
              caption="The Notice Tracker dashboard, showing case buckets, workflow status and a PAN level summary."
            />
            <div className="mt-6">
              <Prose>
                <p>
                  Total financial demand at the top. Time-sensitive buckets
                  next: Overdue, Time-Critical, Other. A workflow status bar
                  chart showing where cases are stuck (Pending on Me, Pending
                  on Government, In Litigation, Closed). A PAN-level summary
                  table that identifies which business entities carry the most
                  risk, broken down by stage.
                </p>
                <p>
                  This page exists to be read in 30 seconds. Everything that
                  takes longer than that to understand was cut.
                </p>
              </Prose>
            </div>
          </div>

          {/* Sub-section 2: Case List */}
          <div className="mt-8">
            <CaseStudySubLabel text="Case List · Tax Head view" className="mb-3" />
            <ScreenshotPlaceholder
              src="/work/notice-tracker/pan-view.png"
              alt="PAN-level case list with filters, demand-amount columns, and status chips"
              caption="Inbox-inspired case list with smart filters and bold-unread treatment"
            />
            <div className="mt-6">
              <Prose>
                <p>
                  An inbox-inspired layout. New cases in bold, viewed cases
                  grayed out. Overdue dates marked in red, impossible to miss.
                  Smart filters consistent with the dashboard&rsquo;s buckets,
                  so a manager moving from one page to the other carries the
                  same mental model.
                </p>
                <p>
                  The interaction patterns borrow from email because tax heads
                  already know how to use email. We did not need to teach them
                  a new system.
                </p>
              </Prose>
            </div>
          </div>

          {/* Sub-section 3: Case Workspace */}
          <div className="mt-8">
            <CaseStudySubLabel
              text="Case Workspace · Analyst view"
              className="mb-3"
            />
            <Prose>
              <p>
                The Analyst&rsquo;s screen took the most iterations. Every
                version held the same information. The question was what
                someone sees first.
              </p>
            </Prose>
            <OptionsRow
              options={CASEVIEW_OPTIONS}
              shipped={{
                label: "Latest stage open",
                src: "/work/notice-tracker/case-view.png",
                alt: "Shipped case workspace with case details on the left, stages in the centre with only the latest open, and history, files and comments on the right.",
                verdict: "The latest stage open, older stages collapsed until needed.",
              }}
            />
            <Call
              title="Two timelines, or one"
            >
              <p>
                The status timeline read well on its own. But the case already
                had an audit trail recording everything that happened. Two
                timelines for one case would leave people unsure which to
                trust.
              </p>
              <p>
                So I cut it, and used progressive disclosure instead: the
                latest stage open, older stages collapsed, the audit trail as
                the single record.
              </p>
            </Call>
            <div className="mt-6">
              <Prose>
                <p>
                  Three columns. Context locked left. Chronological timeline
                  center. Collaboration hub right.
                </p>
                <p>
                  The center column is the heart of the product. It presents
                  the complete case history in reverse chronological order,
                  grouped by stage. Each stage is a collapsible card. By
                  default, only the latest stage is open. Older stages stay
                  tucked away until needed.
                </p>
                <p>
                  I added a small detail: when a stage is collapsed, the
                  envelope icon next to &ldquo;Replies&rdquo; shows as closed.
                  When you expand it, the envelope animates open.
                </p>
                <RepliesOpening />
                <p>
                  It is the smallest possible touch of personality. It also
                  reinforces the interaction without text instructions.
                </p>
              </Prose>
            </div>
          </div>

        </CaseStudySection>

        {/* 7 · The decision to narrow */}
        <CaseStudySection title="The decision to narrow.">
          <Prose>
            <p>
              The first plan was to solve every notice at once, so the design
              covered every framework. Underneath it sat one structure: every
              regime, every notice and every system layer resolved to the same
              Case ID.
            </p>
          </Prose>

          <ArchitectureMap caption="The full architecture as first scoped: GST, ITR and TDS, all resolving to one Case ID." />

          <Prose>
            <p>
              When we shipped, we went one step at a time: GST first, then ITR
              and TDS. Customers loved it for GST notices specifically. ITR and
              TDS were a different story.
            </p>
          </Prose>

          <Call
            title="Every framework, or depth in one"
          >
            <p>
              Customers had asked for every framework, and covering them all
              would have made the product look bigger in every sales demo.
            </p>
            <p>
              But within three months the data was unambiguous. Usage on ITR
              and TDS stayed low, and support tickets showed their workflows
              did not match. The notice formats, the deadline structures and
              the expectations were all different.
            </p>
            <p>
              I scaled them back, kept Direct Tax as a sales assist for opening
              conversations, and moved the engineering bandwidth into AI for
              GST, where customers were already getting value.
            </p>
          </Call>

          <h3 className="mt-12 mb-4 text-[22px] font-semibold tracking-[-0.01em] leading-[1.3] text-[#1F1F1E]">
            Naming the narrower product.
          </h3>
          <Prose>
            <p>
              Narrowing changed what the product was. The name had not caught
              up: it still promised everything, when the product now did one
              thing well.
            </p>
          </Prose>

          <PivotVisual
            oldName="Notice Management"
            newName="Notice Tracker"
            accentChar="."
            oldSubLabel="Implied a broad scope"
            newSubLabel="Encoded a narrow promise"
          />

          <Prose>
            <p>
              The rename came straight out of the decision to narrow. Management implied a broad scope we had just
              chosen not to build. Tracker encoded the narrow promise: never
              miss a notice.
            </p>
            <p>
              Engagement on core GST features rose. Off-track feature requests
              dropped. Sales conversations got cleaner because the name did
              the qualification work.
            </p>
          </Prose>
        </CaseStudySection>

        {/* 8 · Adding intelligence */}
        <CaseStudySection title="Adding intelligence.">
          <Prose>
            <p>Tracking solved the organization problem. The remaining problem was comprehension.</p>
            <p>
              Government notices arrive as inconsistent PDFs, often in regional
              languages, with no standard format. Reading them is slow.
              Misreading them is expensive.
            </p>
            <p>
              We tried it without AI first. Users could add the reasons behind
              each notice themselves. Almost nobody did: reading a PDF and
              typing it in is the work they wanted to escape. That is when AI
              became the only way.
            </p>
          </Prose>

          <AiWorkSplit
            rows={AI_ROWS}
            caption="Four ways to bring AI into the case. Read down the columns: only the last one takes the whole job off the user, before the day begins."
          />

          <Call
            title="Ask for approval, or earn trust"
            takeaway="An approval step that requires the original work is not a safeguard. It is the original work."
          >
            <p>
              The review gate looked like the responsible choice: the AI
              proposes, the user approves. But to approve a value, a user had
              to open the PDF and read it, which undid the point of reading it
              automatically.
            </p>
            <p>
              So it never shipped, and trust moved into the interface instead.
              Every AI value carries a Clear AI marker, so a user always knows
              which numbers the government sent and which ones we read. And the
              model leaves a field blank rather than guessing. We reviewed more
              than a hundred real notices by hand to tune where that line sat:
              an empty cell sends someone to the PDF, a confident wrong number
              stops them from going.
            </p>
            <p>
              What I would change: the source PDF sat two clicks away, inside
              attachments. For the one field a user most wants to check, that
              is one click too many.
            </p>
          </Call>

          <h3 className="mt-12 mb-4 text-[22px] font-semibold tracking-[-0.01em] leading-[1.3] text-[#1F1F1E]">
            Where the AI&rsquo;s reading should live.
          </h3>
          <Prose>
            <p>
              Once the AI could read a notice, the next question was where its
              reading should appear: a summary, the reasons behind the notice,
              and the fields the portal never returns, like demand amount, tax
              section and due date. We tried it in five places.
            </p>
          </Prose>

          <PlacementSchematics
            placements={[...PLACEMENTS]}
            caption="Five iterations on where the AI reading should live. Click any sketch to see the real screen."
          />

          <Call
            title="A chat, or AI where they already work"
            takeaway="Put the AI where the work already happens, not where the technology is fashionable."
          >
            <p>
              A chat with Clear AI was the obvious move at the time, and we
              designed it fully: suggested questions, its steps while thinking,
              a hand-off to a support ticket, an honest error with a way to try
              again.
            </p>
            <p>
              We did not ship it. Our users are tax teams who live in Excel.
              They scan tables, filter and export; they do not start
              conversations with software. So the AI went to them instead: into
              the Clear AI panel beside each case, and into the fields of
              the case list.
            </p>
          </Call>

          <Prose>
            <p>Here is what shipped, for a single notice.</p>
          </Prose>

          <AIExtractionSequence />

          <Prose>
            <p>
              One small decision went the other way. The AI started out as
              Clear Intelligence. We shortened it to Clear AI: it fit the
              interface better, and it kept us clear of any association with
              Apple Intelligence.
            </p>
            <p>
              We shipped it in phases. Early Access first, with a small cohort
              of real customers feeding us their actual notices for training.
              General Availability followed only when extraction accuracy
              crossed a threshold where the AI felt invisible.
            </p>
          </Prose>
        </CaseStudySection>

        {/* 9 · What I took from this */}
        <CaseStudySection title="What I took from this.">
          <Takeaways takeaways={TAKEAWAYS} />
        </CaseStudySection>

        {/* 10 · Outcomes (dark), restored from the live version */}
        <OutcomesSection
          label="Outcomes"
          title="What it added up to."
          outcomes={OUTCOMES}
        />

        {/* 11 · What came next (no uppercase label, title carries it) */}
        <WhatCameNext
          title="From tracking to litigation."
          next={
            <NextCaseStudy
              href="/work/tax-assurance"
              title="Tax Assurance"
              image="/work/tax-assurance/france-executive-summary.png"
            />
          }
          body={
            <>
              <p>
                Notice Tracker covers the first chapter of a tax dispute:
                receive, understand, reply on time. For most enterprises, the
                story ends there.
              </p>
              <p>
                The ones that escalate are different. Disputes turn into
                hearings, hearings into appeals, sometimes years of
                proceedings. The financial exposure is larger. The workflows
                are longer. The same Case ID still anchors everything.
              </p>
              <p>
                That&rsquo;s what&rsquo;s coming next. Clear is extending the
                platform into the full litigation lifecycle as a dedicated
                product, CCC Litigate. Same spine, deeper domain, longer time
                horizons.
              </p>
            </>
          }
        />
      </main>
      <Footer />
    </>
  );
}
