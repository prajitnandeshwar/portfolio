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
import { HeroDashboardPlaceholder } from "@/components/case-study/hero-dashboard-placeholder";
import { CaseIdAnimation } from "@/components/case-study/case-id-animation";
import { ArchitectureMap } from "@/components/case-study/architecture-map";
import { RepliesOpening } from "@/components/case-study/replies-opening";
import { PivotVisual } from "@/components/case-study/pivot-visual";
import { AIExtractionSequence } from "@/components/case-study/ai-extraction-sequence";
import { ChaosNoticesPile } from "@/components/case-study/chaos-notices-pile";
import { Takeaways } from "@/components/case-study/takeaways";
import { OutcomesSection } from "@/components/case-study/outcomes-section";
import { WhatCameNext } from "@/components/case-study/what-came-next";

export const metadata: Metadata = {
  title: "Notice Tracker · Prajit Nandeshwar",
  description:
    "AI-augmented platform for managing GST notices at scale. 100+ enterprises, 85% adoption, ₹2.3Cr ARR.",
};

const STATS = [
  { value: "100", suffix: "+", label: "Enterprises" },
  { value: "85", suffix: "%", label: "User adoption" },
  { value: "95", suffix: "%", label: "Tracking success" },
  { value: "₹2.3", suffix: "Cr", label: "Annual revenue" },
];

const OUTCOMES = [
  { value: "100", suffix: "+", label: "Enterprises onboarded" },
  { value: "85", suffix: "%", label: "User adoption" },
  { value: "95", suffix: "%", label: "Notice tracking success" },
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
        For Notice Tracker, it was the Case ID. Every complex domain has one.
        The stable identifier that makes everything else coherent. Finding it
        is the difference between a feature and a product.
      </p>
    ),
  },
  {
    number: "02",
    heading: "Names defend roadmaps.",
    body: (
      <p>
        Renaming Management to Tracker did more for product clarity than any
        roadmap document. The name encodes the promise. Encode the right
        promise.
      </p>
    ),
  },
  {
    number: "03",
    heading: "Discipline beats demand.",
    body: (
      <p>
        Customers asked for Direct Tax. Data said it would not work. Killing
        it was harder than building Notice Tracker, and more important. The
        thing that ships well is rarely the thing that was loudest in the
        meeting.
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
          tagline="AI-augmented platform for managing GST notices at scale."
          credits={[
            { label: "Role", value: "Lead Designer & PM" },
            { label: "Timeline", value: "2024" },
            { label: "Read", value: "7 min" },
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

        {/* 4 · Understanding the chaos */}
        <CaseStudySection title="Understanding the chaos.">
          <Prose>
            <p>
              Before we talked to customers, I spent a week inside the
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
                We ran the research as three two-week sprints, with the
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

          <Prose>
            <p>
              So we built the entire product around a single insight: every
              interaction, every screen, every interaction model anchors to a
              stable Case ID.
            </p>
            <p>
              This single decision simplified the entire information
              architecture. The dashboard could group by case, not by
              communication. The case list could prioritize by case status, not
              by document type. The case detail page could show a true
              chronological history. The AI layer, when we added it later,
              could summarize across the case lifetime rather than per
              document.
            </p>
            <p>
              <Em>
                The Case ID became the spine. Every other design decision
                flowed through it.
              </Em>
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
            <ScreenshotPlaceholder
              src="/work/notice-tracker/dashboard.png"
              alt="Notice Tracker dashboard with PAN-level summary, demand buckets, and GST cases overview"
              caption="Dashboard with PAN-level summary, demand buckets, workflow status"
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
            <ScreenshotPlaceholder
              src="/work/notice-tracker/case-view.png"
              alt="Case detail workspace with case metadata left, activity center middle, and Clear AI activity hub right"
              caption="Three-column workspace with context, timeline, and collaboration hub"
            />
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

          <Prose>
            <p>
              Underneath those three screens sat one structure. Every regime, every notice, and every system layer resolved to the same Case ID.
            </p>
          </Prose>

          <ArchitectureMap caption="The full architecture as first scoped: GST, ITR and TDS, all resolving to one Case ID." />
        </CaseStudySection>

        {/* 7 · The decision to narrow */}
        <CaseStudySection title="The decision to narrow.">
          <Prose>
            <p>We launched. The product worked. Customers loved it for GST notices specifically.</p>
            <p>
              Then we extended to Direct Tax notices. We assumed the workflow
              would translate. It did not.
            </p>
            <p>
              Within three months, the data was unambiguous. Direct Tax usage
              was low. Support tickets revealed a fundamental workflow
              mismatch. The notice formats were different. The deadline
              structures were different. The user expectations were different.
            </p>
            <p>
              I led the call to stop active development on Direct Tax. We
              repositioned it as a sales-assist tool, valuable for opening
              doors with prospective customers, but not draining engineering
              resources to maintain as a primary feature.
            </p>
            <p>
              Two of the three regimes in that architecture came off. Direct Tax moved to sales assist, GST got the depth instead.
            </p>
            <p>
              Then I made one more decision that turned out to matter: we
              renamed the product.
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
              The rename was not marketing. It was strategic. Management
              implied a broad scope. Tracker encoded a narrow promise. The new
              name told customers what we were and what we were not.
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
            <p>We added an AI layer with three capabilities:</p>
          </Prose>

          <AIExtractionSequence />

          <Prose>
            <p>
              <Em>AI Summaries.</Em> A plain-language explanation of what the
              notice is actually demanding, generated from the PDF content.
            </p>
            <p>
              <Em>Reason Extraction.</Em> Automatic identification of the
              specific reason for the notice. Was it a mismatch? A late
              filing? An ITC dispute? Surfaced in structured form.
            </p>
            <p>
              <Em>Structured Parsing.</Em> The government portal does not
              return these fields. Users had to read every PDF to find the
              demand amount, the relevant tax section, the actual due date. We
              extracted these upfront and populated them directly in the case
              list table view, so the team could triage at a glance instead of
              opening every document.
            </p>
            <p>
              We shipped it in phases. Early Access first, with a small cohort
              of real customers feeding us their actual notices for training.
              General Availability followed only when extraction accuracy
              crossed a threshold where the AI felt invisible.
            </p>
            <p>
              The principle for the AI rollout was simple:{" "}
              <Em>ship as a capability, not a demo</Em>. Trust gets earned
              through accuracy on real data, not through marketing
              screenshots.
            </p>
          </Prose>
        </CaseStudySection>

        {/* 9 · What I took from this */}
        <CaseStudySection title="What I took from this.">
          <Takeaways takeaways={TAKEAWAYS} />
        </CaseStudySection>

        {/* 10 · Outcomes (dark) */}
        <OutcomesSection
          label="Outcomes"
          title="What it added up to."
          outcomes={OUTCOMES}
        />

        {/* 11 · What came next (no uppercase label, title carries it) */}
        <WhatCameNext
          title="From tracking to litigation."
          ctaLabel="See more work"
          ctaHref="/#work"
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
                That&rsquo;s what&rsquo;s coming next. We are extending the
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
