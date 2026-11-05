"use client";

import {
  Archive,
  ArrowUp,
  BookOpen,
  Bot,
  Building2,
  CalendarDays,
  ChartColumn,
  ChevronDown,
  ChevronRight,
  Copy,
  FileText,
  LayoutGrid,
  Library,
  ListChecks,
  MessageSquare,
  MessageSquareText,
  Mic,
  Plus,
  Share2,
  ShoppingCart,
  Square,
  Star,
  X,
} from 'lucide-react'
import { Bar, Button, Collapse, Field, Roll, Stage, States, Stream, Text, Window, type Act } from '@/components/stageshow/kit'
import './france.css'

// Hero for the France VAT assurance board's chat. The board is open in CTAI;
// the cursor opens "Chat with app", the panel slides in on the left, the
// question is typed and sent, the agent thinks in two steps and answers with
// the documents behind the board's €12,820 of sales VAT at risk. Closing the
// panel is the reset. Every figure is the board's own (v32 data, Oct 2026).

const Q = 'which docs make the 12,820 vat risk?'
const INTRO = 'The €12,820 sales VAT risk comes from nine documents and two grouped cases. Three make up €7,800:'
const INTRO_WORDS = INTRO.split(' ').length

const DOCS = [
  { doc: 'INV-FR-1020', issue: 'E-invoice not issued', vat: '3,000' },
  { doc: 'INV-FR-1050', issue: 'E-reported, not e-invoiced', vat: '2,600' },
  { doc: 'INV-FR-1040', issue: 'Rejected, not corrected', vat: '2,200' },
]
const REST_NOTE = '6 more documents and 2 groups'

type Phase = 'idle' | 'thinking' | 'answer'
type S = {
  open: boolean
  focused: boolean
  draft: string
  sent: boolean
  phase: Phase
  step: string
  words: number
  rows: number
  busy: boolean
}

const initial: S = { open: false, focused: false, draft: '', sent: false, phase: 'idle', step: 'Drawing the connections…', words: 0, rows: 0, busy: false }
const POSTER: S = { open: true, focused: false, draft: '', sent: true, phase: 'answer', step: 'Show intermediate steps', words: INTRO_WORDS, rows: DOCS.length + 1, busy: false }

// Rest on the chat header's empty middle, off the thread
const REST = { wide: { x: 330, y: 92 }, compact: { x: 220, y: 40 } }

async function ask(a: Act<S>) {
  await a.move({ at: 'composer', x: 0.35, y: 0.5 })
  await a.wait(120)
  await a.click()
  await a.set({ focused: true })
  await a.wait(200)
  a.mark('type')
  await a.type('draft', Q, { interval: 34 })
  await a.wait(300)
  await a.click({ at: 'send', x: 0.5, y: 0.5 })
  a.mark('send')
  await a.set({ sent: true, draft: '', focused: false, busy: true })
  a.move('rest')
  await a.wait(500)

  // Two working steps, then they fold into one line
  await a.set({ phase: 'thinking' })
  await a.wait(1300)
  await a.set({ step: 'Reading grouped sales cases…' })
  await a.wait(1300)
  a.mark('answer')
  await a.set({ phase: 'answer', step: 'Show intermediate steps' })
  for (let i = 1; i <= INTRO_WORDS; i++) {
    a.put({ words: i })
    await a.wait(45)
  }
  await a.wait(200)
  for (let i = 1; i <= DOCS.length + 1; i++) {
    await a.set({ rows: i })
    await a.wait(140)
  }
  await a.set({ busy: false })
  a.mark('payoff')
  await a.wait(2600)
}

async function script(a: Act<S>) {
  if (a.layout === 'compact') {
    // The phone column shows the chat alone, already open
    await a.wait(700)
    await ask(a)
    // A new chat clears the thread around the header and composer
    await a.move('newchat')
    await a.wait(150)
    await a.click()
    await a.set({ rows: 0 })
    await a.wait(120)
    await a.set({ phase: 'idle', sent: false })
    await a.wait(500)
    await a.snap({ words: 0, step: initial.step })
    a.move('rest')
    await a.wait(600)
    return
  }

  await a.wait(900)
  await a.move({ at: 'chatbtn', x: 0.8, y: 0.55 })
  await a.wait(150)
  await a.click()
  await a.set({ open: true })
  await a.wait(700)
  await ask(a)

  // Close the panel; the thread resets unseen behind it
  await a.move('close')
  await a.wait(150)
  await a.click()
  await a.set({ open: false })
  a.move('rest')
  await a.wait(700)
  await a.snap({ ...initial })
  await a.wait(500)
}

export function FranceChatHero() {
  return (
    <Stage
      width={1040}
      height={600}
      compact={{ below: 700, width: 358, height: 560 }}
      initial={initial}
      poster={POSTER}
      script={script}
      cursor={{ at: REST }}
      className="frc"
      fill
    >
      {(s, _rect, layout) => {
        const open = layout === 'compact' || s.open
        const chat = (
          <>
        {/* The chat: its column opens to full width, its contents fixed, so nothing reflows */}
        <section className="frc-chat" data-open={open || undefined}>
          <div className="frc-chat__inner">
            <div className="frc-chat__head">
              <span className="frc-agent">
                <Bot size={14} strokeWidth={1.75} />
                <Text>Default Agent</Text>
                <ChevronDown size={13} strokeWidth={1.75} />
              </span>
              {layout === 'compact' ? (
                <span className="frc-iconbtn" data-target="newchat" data-cursor="pointer">
                  <Plus size={15} strokeWidth={1.75} />
                </span>
              ) : (
                <span className="frc-iconbtn" data-target="close" data-cursor="pointer">
                  <X size={15} strokeWidth={1.75} />
                </span>
              )}
            </div>
  
            <div className="frc-thread">
              <Collapse open={s.sent} reveal="drop" from="below">
                <div className="frc-q">
                  <Text wrap className="frc-q__bubble">{Q}</Text>
                  <span className="frc-about">
                    <ChartColumn size={12} strokeWidth={1.75} />
                    <Text className="frc-about__label">Asking about:</Text>
                    <Text className="frc-about__app">France VAT Assurance</Text>
                  </span>
                  <span className="frc-meta">
                    <Text>14:37</Text>
                    <Copy size={12} strokeWidth={1.75} />
                  </span>
                </div>
              </Collapse>
  
              <Collapse open={s.phase !== 'idle'}>
                <div className="frc-step" data-busy={s.busy || undefined}>
                  <ChevronRight size={14} strokeWidth={1.75} />
                  <Roll>{s.step}</Roll>
                </div>
              </Collapse>
  
              <Collapse open={s.phase === 'answer'}>
                <div className="frc-answer">
                  <Stream className="frc-intro" text={INTRO} count={s.words} mark={(_w, i) => i >= 1 && i <= 4} />
                  <div className="frc-table">
                    <Collapse open={s.rows > 0}>
                      <div className="frc-tr frc-tr--head">
                        <Text>Document</Text>
                        <Text>Issue</Text>
                        <Text className="frc-num">VAT (€)</Text>
                      </div>
                    </Collapse>
                    {DOCS.map((d, i) => (
                      <Collapse key={d.doc} open={s.rows > i}>
                        <div className="frc-tr">
                          <Text className="frc-doc">{d.doc}</Text>
                          <Text className="frc-issue">{d.issue}</Text>
                          <Text className="frc-num">{d.vat}</Text>
                        </div>
                      </Collapse>
                    ))}
                    <Collapse open={s.rows > DOCS.length}>
                      <div className="frc-tr frc-tr--rest">
                        <Text>{REST_NOTE}</Text>
                        <Text className="frc-num">5,020</Text>
                      </div>
                    </Collapse>
                  </div>
                </div>
              </Collapse>
            </div>
  
            <div className="frc-composer">
              <Field
                className="frc-field"
                value={s.draft}
                placeholder="Send a follow-up…"
                focused={s.focused}
                box={{ 'data-target': 'composer' }}
              />
              <div className="frc-tools">
                <Plus size={15} strokeWidth={1.75} className="frc-tool" />
                <span className="frc-tool frc-tool--label">
                  <ListChecks size={14} strokeWidth={1.75} />
                  <Text>Plan</Text>
                </span>
                <span className="frc-model">
                  <Text className="frc-model__name">Terra</Text>
                  <Text className="frc-model__effort">High</Text>
                  <ChevronDown size={12} strokeWidth={1.75} />
                </span>
                <Mic size={15} strokeWidth={1.75} className="frc-tool" />
                <span className="frc-send" data-target="send" data-cursor="pointer" data-busy={s.busy || undefined} data-ready={!!s.draft || undefined}>
                  <States value={s.busy ? 'stop' : 'send'} states={{ send: <ArrowUp size={14} strokeWidth={2} />, stop: <Square size={10} strokeWidth={0} fill="currentColor" /> }} />
                </span>
              </div>
            </div>
          </div>
        </section>
          </>
        )
        if (layout === 'compact') {
          // The phone column: the chat panel alone, as a card, off the bottom
          return (
            <>
              <div className="frc-card">{chat}</div>
              <span data-target="rest" style={{ position: 'absolute', left: REST[layout].x, top: REST[layout].y }} />
            </>
          )
        }
        return (
          <>
            <Window url="beta.cleartax.ai" urlShape="pill" className="frc-window">
              <div className="frc-body">
                <Rail />
                {chat}
                <AppPane open={s.open} />
              </div>
            </Window>

            <span data-target="rest" style={{ position: 'absolute', left: REST[layout].x, top: REST[layout].y }} />
          </>
        )
      }}
    </Stage>
  )
}

const RAIL = [
  { Glyph: Plus, label: 'New' },
  { Glyph: MessageSquare, label: 'Chat' },
  { Glyph: Archive, label: 'Vault' },
  { Glyph: BookOpen, label: 'Skills' },
  { Glyph: Library, label: 'Library' },
]

// CTAI's left rail: the workspace's tools, then the open apps
function Rail() {
  return (
    <nav className="frc-rail">
      {RAIL.map(({ Glyph, label }, i) => (
        <span key={label} className="frc-rail__item" data-on={i === 4 || undefined}>
          <Glyph size={16} strokeWidth={1.6} />
          <Text>{label}</Text>
        </span>
      ))}
      <span className="frc-rail__rule" />
      {['SR Reco…', 'France V…', 'Purchas…'].map((label, i) => (
        <span key={label} className="frc-rail__item frc-rail__app" data-on={i === 1 || undefined}>
          <LayoutGrid size={16} strokeWidth={1.6} />
          <Text>{label}</Text>
        </span>
      ))}
    </nav>
  )
}

const NAV = [
  { Glyph: Star, label: 'Executive summary', on: true },
  { Glyph: FileText, label: 'Sales recon' },
  { label: 'Recon summary' },
  { label: 'Document details' },
  { Glyph: ShoppingCart, label: 'Purchase recon' },
  { label: 'Recon summary' },
  { label: 'Document details' },
  { Glyph: FileText, label: 'CA3 Filing' },
]

// The France board inside CTAI's app pane. It narrows as the chat opens and
// is clipped at the window's edge rather than reflowing.
function AppPane({ open }: { open: boolean }) {
  return (
    // data-crop: the pane clips the board on purpose as the chat opens
    <section className="frc-app" data-crop>
      <div className="frc-app__head">
        <Text className="frc-app__kind">App:</Text>
        <Text className="frc-app__name">France VAT Assurance — Maison Lumière SA</Text>
        <span className="frc-pill">
          <Library size={12} strokeWidth={1.75} />
          <Text>In Library · v35</Text>
        </span>
        <span className="frc-app__actions">
          <Button variant="primary" className="frc-chatbtn" data-target="chatbtn" data-open={open || undefined} icon={<MessageSquareText size={14} strokeWidth={1.75} />}>
            Chat with app
          </Button>
          <Share2 size={15} strokeWidth={1.75} className="frc-app__icon" />
          <X size={15} strokeWidth={1.75} className="frc-app__icon" />
        </span>
      </div>
      <div className="frc-board">
        <aside className="frc-nav">
          <Text className="frc-nav__org">Maison Lumière SA</Text>
          {NAV.map(({ Glyph, label, on }, i) => (
            <span key={i} className="frc-nav__item" data-on={on || undefined} data-sub={!Glyph || undefined}>
              {Glyph && <Glyph size={14} strokeWidth={1.6} />}
              <Text>{label}</Text>
            </span>
          ))}
        </aside>
        <main className="frc-main">
          <div className="frc-title">
            <Text className="frc-title__name">France VAT assurance</Text>
            <span className="frc-tag">
              <Text>Prepared draft · not filed</Text>
            </span>
          </div>
          <Text className="frc-sub">Maison Lumière SA · Sales, purchases, and the CA3 return</Text>
          <div className="frc-scope">
            <span className="frc-scope__pill">
              <Building2 size={13} strokeWidth={1.75} />
              <Text>Maison Lumière SA · FR10</Text>
              <ChevronDown size={12} strokeWidth={1.75} />
            </span>
            <span className="frc-scope__pill">
              <CalendarDays size={13} strokeWidth={1.75} />
              <Text>1 Oct 2026 → 31 Oct 2026</Text>
              <ChevronDown size={12} strokeWidth={1.75} />
            </span>
          </div>

          <div className="frc-recon">
            <div className="frc-recon__head">
              <Text className="frc-recon__title">Sales recon</Text>
              <Text className="frc-recon__sub">Sales ledger vs e-invoices and e-reporting · 42 records</Text>
            </div>
            <div className="frc-kpis">
              <div className="frc-kpi">
                <Text className="frc-kpi__label">Sales VAT at risk</Text>
                <Text className="frc-kpi__value frc-kpi__value--risk">€12,820</Text>
                <Text className="frc-kpi__link">See sales buckets ›</Text>
              </div>
              <div className="frc-kpi">
                <Text className="frc-kpi__label">Sales records to review</Text>
                <Text className="frc-kpi__value">27</Text>
                <Text className="frc-kpi__link">See records ›</Text>
              </div>
              <div className="frc-kpi">
                <Text className="frc-kpi__label">Clean match rate</Text>
                <Text className="frc-kpi__value">30.8%</Text>
                <Bar w={90} h={5} tone={2} />
              </div>
              <div className="frc-kpi">
                <Text className="frc-kpi__label">Exception groups</Text>
                <Text className="frc-kpi__value">5</Text>
                <Bar w={80} h={5} tone={2} />
              </div>
            </div>
            <div className="frc-mix">
              <span style={{ flex: 29, background: '#3f7d58' }} />
              <span style={{ flex: 19, background: '#e8a33d' }} />
              <span style={{ flex: 45, background: '#b42318' }} />
              <span style={{ flex: 7, background: '#d6d9de' }} />
            </div>
            <div className="frc-mixrows">
              {[120, 96, 132].map((w, i) => (
                <div key={i} className="frc-mixrow">
                  <Bar w={w} h={6} tone={2} />
                  <Bar w={60} h={6} tone={1} />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </section>
  )
}
