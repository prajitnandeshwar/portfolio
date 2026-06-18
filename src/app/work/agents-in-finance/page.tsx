import type { Metadata } from "next";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { CaseStudyStats } from "@/components/case-study/case-study-stats";
import {
  CaseStudySection,
  Prose,
  Lead,
  Pull,
  Em,
} from "@/components/case-study/case-study-section";
import { CaseStudySubLabel } from "@/components/case-study/case-study-sub-label";
import { ScreenshotPlaceholder } from "@/components/case-study/screenshot-placeholder";
import { WhatCameNext } from "@/components/case-study/what-came-next";

import { rule } from "@/components/agents-in-finance/constants";
import { StackDiagram } from "@/components/agents-in-finance/stack-diagram";
import { SourcesList } from "@/components/agents-in-finance/sources-list";
import { RulesGrid } from "@/components/agents-in-finance/rules-grid";
import { EchoDemo } from "@/components/agents-in-finance/echo-demo";
import { EvidenceDemo } from "@/components/agents-in-finance/evidence-demo";
import { LimitSliderDemo } from "@/components/agents-in-finance/limit-slider-demo";
import { AgentVoiceDemo } from "@/components/agents-in-finance/agent-voice-demo";
import { TrustLoop } from "@/components/agents-in-finance/trust-loop";
import { VoiceCompare } from "@/components/agents-in-finance/voice-compare";
import { PaletteSwatches } from "@/components/agents-in-finance/palette-swatches";
import { MotionTokensDemo } from "@/components/agents-in-finance/motion-tokens-demo";
import { PatternsList } from "@/components/agents-in-finance/patterns-list";
import { Checklist } from "@/components/agents-in-finance/checklist";

export const metadata: Metadata = {
  title: "Agents in Finance",
  description:
    "A design language for AI agents that do real financial work. Ten rules for how an agent and a finance team work together, proven on Global Recon.",
};

const HERO_STATS = [
  { value: "10", label: "Named rules" },
  { value: "5", label: "Composable patterns" },
  { value: "25", label: "Agents tested against" },
  { value: "3", label: "Motion tokens, total" },
];

const OUTCOMES = [
  { value: "··", label: "Agent surfaces shipped on the grammar" },
  { value: "··", label: "Designers and PMs building with the kit" },
  { value: "··", label: "Countries live on Global Recon" },
  { value: "··", label: "Crit questions, down from re-litigation" },
];

const TAKEAWAYS: { n: string; heading: string; body: string }[] = [
  {
    n: "01",
    heading: "Contracts, not screens.",
    body: "Screens answer a question once. Contracts answer it for every flow that follows. The layer between principle and component is where design direction actually gets enforced.",
  },
  {
    n: "02",
    heading: "Trust is a loop.",
    body: "Act within limits, record it, build a track record, earn wider limits, and let every fix become a rule. The interface is how the agent earns autonomy, one period at a time.",
  },
  {
    n: "03",
    heading: "Ship the grammar as a tool.",
    body: "A direction that lives in a document needs policing. A direction that lives in the team's generative tooling enforces itself. Encode it where the work happens.",
  },
];

export default function AgentsInFinancePage() {
  return (
    <>
      <Nav />
      <main
        className="case-study flex-1"
        style={{ backgroundColor: "#FAFAF9", color: "#1F1F1E" }}
      >
        {/* 1. Hero (no visual; text spans the column) */}
        <CaseStudyHero
          backHref="/#work"
          backLabel="Back to work"
          title="Agents in Finance"
          accentChar="."
          tagline="A design language for AI agents that do real financial work. Ten rules for how an agent and a finance team work together, proven on Global Recon."
          credits={[
            { label: "Role", value: "Lead Product Designer" },
            { label: "Timeline", value: "2025 to 2026" },
            { label: "Read", value: "12 min, interactive" },
            { label: "Scope", value: "Org design direction" },
          ]}
        />

        {/* 2. Stats strip */}
        <CaseStudyStats stats={HERO_STATS} />

        {/* 3. The moment */}
        <CaseStudySection title="The same questions, three times over.">
          <Lead>
            By the third AI feature I designed at Clear, I noticed I was
            answering the same questions again and again. When should the AI
            act on its own? How does it prove what it says? What does the
            user see when it gets something wrong?
          </Lead>
          <Prose>
            <p>
              Each product answered these on its own. Global Recon, our tax
              reconciliation product. CTAI, our agent platform. Litigate, our
              tax dispute product. Three teams, three sets of answers, the
              same hard problems. That works for one product. It does not
              work for a company shipping AI agents across thirty plus
              countries, designed by more people than me.
            </p>
            <p>
              The industry was arriving at the same realization. When
              Microsoft redesigned Copilot in 2026, their design chief argued
              that the real thing to design is no longer the interface. It is
              what the AI produces, and how visibly the person stays in
              control. That is the right idea. It is also the consumer
              version of it.
            </p>
            <p>
              Finance needs a harder edition. When a consumer chatbot gets
              something wrong, someone is mildly annoyed. When a tax agent
              gets something wrong, a company files the wrong numbers with a
              government.
            </p>
          </Prose>
          <Pull>
            So I stopped designing screens one at a time and wrote down the
            rules instead: a small set of named agreements between the AI
            and the person using it, shared by every product.
          </Pull>
        </CaseStudySection>

        {/* 4. Contracts, not screens */}
        <CaseStudySection title="Contracts, not screens.">
          <Prose>
            <p>
              I call these rules primitives. The word sounds technical, but
              the idea is simple. A primitive is a named agreement between
              the AI and the user. It answers one question, the same way,
              everywhere in the product.
            </p>
            <p>
              It is not a UI component, which is too small to carry a
              promise. It is not a poster of principles, which is too vague
              to settle an argument in a design review. It sits in between:
              concrete enough to enforce, general enough to reuse.
            </p>
          </Prose>
          <figure style={{ margin: "2.25rem 0" }}>
            <StackDiagram />
            <figcaption
              className="text-[13px] text-[#9C9C97] text-center"
              style={{ margin: 0, marginTop: "0.75rem" }}
            >
              The system in five layers. Primitives sit between belief and
              component, where design direction actually gets enforced.
            </figcaption>
          </figure>
        </CaseStudySection>

        {/* 5. Why finance is different */}
        <CaseStudySection title="Why finance is different.">
          <Lead>
            First, a quick translation. Reconciliation means matching what a
            company told the government against what sits in its own books.
            Every gap between the two is called an exception, and every
            exception is a question: did we make a mistake, or did someone
            else?
          </Lead>
          <Prose>
            <p>
              Global Recon does this across countries, against tax
              authorities like ZATCA in Saudi Arabia, the FTA in the UAE, and
              LHDN in Malaysia. The person using it is professionally liable
              for what the software does. An AI that misreads an exception
              does not produce a funny answer. It produces a wrong tax
              filing, a penalty, and a tax head explaining it to a government
              auditor.
            </p>
            <p>
              That constraint shaped every rule that follows. Proof for every
              claim, nothing irreversible, clear limits on what the AI may do
              alone, and a complete record of who did what. These are not
              nice extras in this category. They are the foundation. The
              design challenge was making all of that rigor feel light: more
              like Linear, less like enterprise software apologizing for
              itself.
            </p>
          </Prose>
        </CaseStudySection>

        {/* 6. Borrowed, tweaked, invented */}
        <CaseStudySection title="Borrowed, tweaked, invented.">
          <Prose>
            <p>
              None of this came from a blank page. The best design systems
              show their references, so I started by studying what the big
              AI teams had already published, then kept what worked, changed
              what did not fit finance, and invented only where there was a
              real gap.
            </p>
          </Prose>
          <SourcesList />
          <Prose>
            <p>
              What none of them publishes is the middle layer: enforceable
              rules for how an agent behaves while doing work someone signs
              their name to. Principles are too soft to settle a design
              review. Visual labels say &ldquo;an AI made this&rdquo; without
              saying what the AI may do. That gap is what this language
              fills.
            </p>
          </Prose>
          <Pull>
            A world-class system is not invented from nothing. It is the
            right borrowings, tuned for a domain nobody else was designing
            for.
          </Pull>
        </CaseStudySection>

        {/* 7. The grammar / catalog */}
        <CaseStudySection title="The grammar.">
          <Prose>
            <p>
              Ten rules, pulled out of real prototype work rather than
              invented on a whiteboard. Each is a named answer to one
              question. Four of them are live on this page. Try them.
            </p>
            <p style={{ fontSize: 15, color: "#6B6B68" }}>
              A note on the names. The bracketed labels below are
              placeholders. The goal is a name for each rule that is both
              memorable and instantly clear to someone outside finance, and
              that work is still in progress. The question under each name
              is the part that already holds.
            </p>
          </Prose>
          <div className="mt-8">
            <RulesGrid />
            <figcaption
              className="text-[13px] text-[#9C9C97] text-center"
              style={{ margin: 0, marginTop: "1rem" }}
            >
              Ten rules. Each one borrowed, tweaked, or invented, and labeled
              honestly. The navy cell keeps its own rule: that surface
              belongs to the agent alone.
            </figcaption>
          </div>
        </CaseStudySection>

        {/* 8. Primitive 01: Echo */}
        <CaseStudySection title={`${rule(1)}.`}>
          <Prose>
            <p>
              Before doing anything with multiple steps, the AI repeats the
              instruction back in its own words and shows its plan. The user
              confirms, corrects, or cancels. Echo turns a possible
              misunderstanding into a checkpoint, before any damage exists.
            </p>
          </Prose>
          <figure style={{ margin: "2.25rem 0" }}>
            <EchoDemo />
            <figcaption
              className="text-[13px] text-[#9C9C97] text-center"
              style={{ margin: 0, marginTop: "0.75rem" }}
            >
              The agent says the task back to you before touching anything.
              Press Run, then become the checkpoint yourself.
            </figcaption>
          </figure>
          <Prose>
            <p style={{ fontSize: 15, color: "#6B6B68" }}>
              The discipline runs both ways. The agent stays quiet for small,
              undoable-in-a-click actions, because if it asks you to confirm
              everything, you stop reading the confirmations, and a
              checkpoint nobody reads is not a checkpoint.
            </p>
          </Prose>
        </CaseStudySection>

        {/* 9. Primitive 02: Evidence */}
        <CaseStudySection title={`${rule(2)}.`}>
          <Prose>
            <p>
              Every claim the AI makes carries its source, and the user can
              click from any statement to the underlying record: the
              invoice, the ledger entry, the regulation, the earlier
              conversation. A claim without a source does not ship.
            </p>
            <p>
              When an auditor asks &ldquo;how do you know this&rdquo;, the
              answer is that paper trail, not the AI&rsquo;s confidence. If
              the AI&rsquo;s reasoning cannot be reconstructed for an
              outsider, it cannot be relied on for a tax position.
            </p>
          </Prose>
          <figure style={{ margin: "2.25rem 0" }}>
            <EvidenceDemo />
            <figcaption
              className="text-[13px] text-[#9C9C97] text-center"
              style={{ margin: 0, marginTop: "0.75rem" }}
            >
              Every assertion is one click from the record that supports it.
              The evidence opens from its chip, never a cut to a new screen.
            </figcaption>
          </figure>
        </CaseStudySection>

        {/* 10. Primitive 04: Gates */}
        <CaseStudySection title={`${rule(4)}.`}>
          <Prose>
            <p>
              The AI&rsquo;s freedom to act is bounded by limits the user can
              always see: amount, risk, confidence. Below the gate, the AI
              acts and records what it did. Above it, the AI proposes and
              waits for a person.
            </p>
            <p>
              The limits are set in the user&rsquo;s own terms: an amount, a
              risk level, a confidence bar. The agent&rsquo;s freedom is
              explained in words the user already trusts, never in machine
              learning terms nobody should have to learn.
            </p>
          </Prose>
          <figure style={{ margin: "2.25rem 0" }}>
            <LimitSliderDemo />
            <figcaption
              className="text-[13px] text-[#9C9C97] text-center"
              style={{ margin: 0, marginTop: "0.75rem" }}
            >
              Autonomy expressed in the user&rsquo;s own professional
              language. Drag the gate and watch it redistribute.
            </figcaption>
          </figure>
          <Prose>
            <p style={{ fontSize: 15, color: "#6B6B68" }}>
              Limits start cautious and widen as the agent earns it. They
              live on a main screen, never hidden in settings. Hiding the
              steering wheel does not make the car safer.
            </p>
          </Prose>
        </CaseStudySection>

        {/* 11. Primitive 07: Voice */}
        <CaseStudySection title={`${rule(7)}.`}>
          <Prose>
            <p>
              When the agent speaks, it speaks on a dark navy surface, and
              nothing else in the product ever does. Accountability requires
              knowing who said what. A user skimming a dense recon screen
              separates &ldquo;the system displays&rdquo; from &ldquo;the
              agent asserts&rdquo; without reading a label.
            </p>
          </Prose>
          <figure style={{ margin: "2.25rem 0" }}>
            <AgentVoiceDemo />
            <figcaption
              className="text-[13px] text-[#9C9C97] text-center"
              style={{ margin: 0, marginTop: "0.75rem" }}
            >
              Navy means the agent is speaking. Nowhere else, ever. The
              surface fades up a beat before the words begin.
            </figcaption>
          </figure>
          <Prose>
            <p style={{ fontSize: 15, color: "#6B6B68" }}>
              The exclusivity rule is the whole primitive. One decorative
              navy card anywhere in the product breaks the grammar
              everywhere.
            </p>
          </Prose>
        </CaseStudySection>

        {/* 12. The other six */}
        <CaseStudySection title="The other six.">
          <Prose>
            <p>
              <Em>{rule(3)}.</Em> The agent never makes a change you cannot
              take back. It prepares; a person commits, with the real
              consequence named on the button (&ldquo;Submit to FTA&rdquo;,
              not &ldquo;Confirm&rdquo;). Finance teams already split work
              this way: one person prepares, another approves. The agent
              joins as the preparer, never the approver.
            </p>
            <p>
              <Em>{rule(5)}.</Em> One filing period is one conversation,
              saved automatically. What was said in January never quietly
              shapes a March recommendation, and the agent&rsquo;s behavior
              never shifts in the middle of a period without telling you.
            </p>
            <p>
              <Em>{rule(6)}.</Em> The rules the agent follows live on a page
              you can open, read, and change, never buried in a one-time
              setup. Think of it as the agent&rsquo;s constitution, written
              in plain language, edited by you. Every change shows its
              effect before it applies, because tax rules move mid-year and
              a setup wizard assumes a stable world that tax does not have.
            </p>
            <p>
              <Em>{rule(8)}.</Em> AI shows up in exactly three places. It
              can start the conversation, held to the highest bar for being
              worth your attention. It waits in a chat bar that is always
              one click away. And it offers small suggestions next to the
              thing you are working on, taken or ignored in one tap. Every
              new AI feature picks its place before design begins.
            </p>
            <p>
              <Em>{rule(9)}.</Em> Every action the agent takes, every limit
              decision, every human approval lands on one record you can
              browse and export, organized the way a government auditor
              would read it. The other rules fill it in automatically. The
              record is the product&rsquo;s testimony.
            </p>
            <p>
              <Em>{rule(10)}.</Em> When you correct the agent once, it
              offers to make your correction a standing rule. Fix a
              misclassified vendor today, and every similar case is handled
              your way tomorrow. Correction stops evaporating and starts
              compounding, which is how the agent slowly becomes yours.
            </p>
          </Prose>
          <ScreenshotPlaceholder
            caption="Three annotated stills, draft-versus-commit, the record, and the rules page, from the Global Recon build."
            aspect="16/9"
          />
        </CaseStudySection>

        {/* 13. The trust loop */}
        <CaseStudySection title="The trust loop.">
          <Lead>
            Lay the rules side by side and something bigger appears. They
            are not ten separate features. They are one loop, and the loop
            is the whole point.
          </Lead>
          <Prose>
            <p>
              The agent acts only inside the limits you set. Every action
              lands on the record. The record builds a track record you can
              see. A good track record gives you a reason to widen the
              limits. And every fix you make along the way becomes a rule,
              so the agent keeps getting more like you.
            </p>
          </Prose>
          <Pull>
            Trust is never granted up front. It is earned, one period at a
            time, and the interface is how it gets earned.
          </Pull>
          <TrustLoop />
        </CaseStudySection>

        {/* 14. The language */}
        <CaseStudySection title="The language.">
          <Lead>
            Rules of behavior are half the system. The other half is how the
            agent speaks, looks, and moves. These were defined together,
            because users experience them together.
          </Lead>

          <div className="mt-8">
            <CaseStudySubLabel text="How it speaks" className="mb-3" />
            <Prose>
              <p>
                The agent&rsquo;s voice has rules as strict as its behavior.
                Plain words over jargon. It says what it did and why, in the
                user&rsquo;s vocabulary: invoices, periods, amounts, never
                tokens or confidence scores. Every claim carries its source.
                When it cannot finish something, it says what it tried, what
                is missing, and the next step, instead of guessing or going
                quiet. It is calm about bad news, never cheerful, and it
                never exclaims.
              </p>
            </Prose>
            <figure style={{ margin: "1.75rem 0" }}>
              <VoiceCompare />
              <figcaption
                className="text-[13px] text-[#9C9C97] text-center"
                style={{ margin: 0, marginTop: "0.75rem" }}
              >
                The agent is a careful colleague. Specific, sourced, calm.
                Enthusiasm is not reassurance.
              </figcaption>
            </figure>
          </div>

          <div className="mt-8">
            <CaseStudySubLabel text="How it looks" className="mb-3" />
            <Prose>
              <p>
                Five colors carry the entire system, and each one is a rule,
                not a decoration. Money is always set in tabular figures so
                columns align. Density is earned: a screen shows what a
                30-second read needs, and nothing more.
              </p>
            </Prose>
            <figure style={{ margin: "1.75rem 0" }}>
              <PaletteSwatches />
              <figcaption
                className="text-[13px] text-[#9C9C97] text-center"
                style={{ margin: 0, marginTop: "0.75rem" }}
              >
                Every color carries one rule. When color means something,
                users stop needing labels.
              </figcaption>
            </figure>
          </div>

          <div className="mt-8">
            <CaseStudySubLabel text="How it moves" className="mb-3" />
            <Prose>
              <p>
                Motion is how the system shows its state of mind, so it has
                three meanings and only three.{" "}
                <Em>Streaming means thinking.</Em> The agent&rsquo;s words
                arrive progressively, never as a finished wall.{" "}
                <Em>Expansion means depth.</Em> Detail always opens from the
                thing it belongs to; evidence grows out of its chip.{" "}
                <Em>Settling means commitment.</Em> The moment something
                becomes real gets a slower, weighted landing.
              </p>
              <p>
                Three durations carry the whole system. Nothing loops,
                nothing bounces, one thing moves at a time. If a motion does
                not tell the user something about what the system is doing,
                it gets cut.
              </p>
            </Prose>
            <figure style={{ margin: "1.75rem 0" }}>
              <MotionTokensDemo />
              <figcaption
                className="text-[13px] text-[#9C9C97] text-center"
                style={{ margin: 0, marginTop: "0.75rem" }}
              >
                Three durations, three meanings: acknowledgment, revelation,
                commitment. Feel the difference.
              </figcaption>
            </figure>
          </div>
        </CaseStudySection>

        {/* 15. Patterns, not pages */}
        <CaseStudySection title="Patterns, not pages.">
          <Prose>
            <p>
              The rules combine into named patterns for recurring jobs. I
              tested the set against roughly twenty five candidate agents
              mapped across Clear&rsquo;s CTAI platform, covering the major
              finance workflows from purchasing to reporting to tax.
              Whenever a pattern could not express an agent, that meant a
              rule was missing, not that the agent was an edge case. That
              test is how two of the rules earned their place: the record,
              and fixes becoming rules.
            </p>
          </Prose>
          <PatternsList />
          <figcaption
            className="text-[13px] text-[#9C9C97] text-center"
            style={{ margin: 0, marginTop: "1rem" }}
          >
            Five jobs, ten rules, every agent on the roadmap expressible.
            The grammar test.
          </figcaption>
        </CaseStudySection>

        {/* 16. Making it hold */}
        <CaseStudySection title="Making it hold without me in the room.">
          <Prose>
            <p>
              A catalog nobody applies is a PDF. Three mechanisms made the
              direction self-enforcing.
            </p>
          </Prose>

          <div className="mt-7">
            <CaseStudySubLabel
              text="It lives in the design system"
              className="mb-3"
            />
            <Prose>
              <p>
                The rules entered Mint, Clear&rsquo;s design system, as real
                tokens and components: the agent&rsquo;s dark surface, the
                proof chip, the prepared-versus-committed states, the limit
                control, and the three motion durations. And like Carbon,
                the enforcement is structural: the agent&rsquo;s surface
                component will not render without its proof attached, so
                on-pattern is the path of least resistance. A short
                checklist travels with them too. Six questions, asked of
                every AI feature before review:
              </p>
            </Prose>
            <Checklist />
          </div>

          <div className="mt-7">
            <CaseStudySubLabel
              text="It ships as a generative kit"
              className="mb-3"
            />
            <Prose>
              <p>
                The part I find most interesting. I encoded the primitives
                and conventions as a Claude Code skill, so any designer on
                the team can generate an on-pattern, navigable prototype
                instead of assembling one from documentation. I prototype in
                code daily; now the grammar does too.
              </p>
            </Prose>
            <Pull>
              The design direction is not a document people are asked to
              follow. It is the default output of the tool they already
              build with.
            </Pull>
            <ScreenshotPlaceholder
              caption="Split frame: the rule page for [[NAME 01]] on the left, a skill-generated prototype following it on the right, with thin annotation lines connecting each rule clause to the rendered result."
              aspect="16/9"
            />
          </div>
        </CaseStudySection>

        {/* 17. Global Recon, the proof */}
        <CaseStudySection title="Global Recon, the proof.">
          <Prose>
            <p>
              A grammar proves itself on a real product. Global Recon&rsquo;s
              Mitigate Risks architecture is the flagship: four pages, every
              contract working together.
            </p>
            <p>
              The <Em>Dashboard</Em> opens with the morning briefing on the
              agent&rsquo;s own dark surface, every flagged number carrying
              its proof. The <Em>Rules page</Em> holds the limits and shows
              their effect before anything applies. The{" "}
              <Em>Exceptions view</Em> runs the triage pattern: small inline
              suggestions, flags where a human is needed, prepared-but-not-
              committed fixes. The <Em>Document view</Em> is where proof
              opens up, a split layout with chat beside the source records,
              and the agent restating any multi-step instruction before it
              runs.
            </p>
          </Prose>
          <ScreenshotPlaceholder
            caption="The four-page Mitigate Risks walkthrough: Dashboard, Tuning Layer, Exceptions View, Document View."
            aspect="16/9"
          />
        </CaseStudySection>

        {/* 18. What I took from this */}
        <CaseStudySection title="What I took from this.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {TAKEAWAYS.map((t) => (
              <div key={t.n}>
                <div className="font-mono text-[13px] text-[#9C9C97] mb-2.5">
                  {t.n}
                </div>
                <h3 className="text-[18px] font-semibold text-[#1F1F1E] mb-2">
                  {t.heading}
                </h3>
                <p className="text-[14px] text-[#6B6B68] leading-[1.6]">
                  {t.body}
                </p>
              </div>
            ))}
          </div>
        </CaseStudySection>

        {/* 19. What it added up to */}
        <CaseStudySection title="What it added up to.">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-7 gap-x-6 my-2">
            {OUTCOMES.map((o) => (
              <div
                key={o.label}
                className="pt-5"
                style={{ borderTop: "2px solid #1F1F1E" }}
              >
                <div
                  className="text-[30px] font-bold tracking-[-0.01em] text-[#1F1F1E]"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {o.value}
                </div>
                <div className="text-[13px] text-[#6B6B68] mt-1">
                  {o.label}
                </div>
              </div>
            ))}
          </div>
          <Prose>
            <p style={{ marginTop: "2rem" }}>
              The honest version, even before the numbers land: the
              questions stopped being re-litigated. New agent surfaces start
              from contracts, not from a blank canvas. And the thing I
              designed stopped being a set of screens and became the way
              this product thinks.
            </p>
          </Prose>
        </CaseStudySection>

        {/* 20. From one product to a platform */}
        <WhatCameNext
          title="From one product to a platform."
          ctaLabel="See more work"
          ctaHref="/#work"
          body={
            <>
              <p>
                Global Recon proved the grammar on reconciliation. The same
                contracts now govern how agents behave across Clear&rsquo;s
                CTAI platform: litigation, anomaly detection, filing
                assurance, and the finance pillars beyond tax. Same spine,
                more agents, one grammar.
              </p>
            </>
          }
        />
      </main>
      <Footer />
    </>
  );
}
