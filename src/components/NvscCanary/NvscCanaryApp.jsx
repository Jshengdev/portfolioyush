import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  S01, S02, S03, S04, S05, S06, S07, S08, S09, S10,
  S11, S12, S13, S14, S15, S16, S17, S18, S19, S20,
  S21, S22, S23, S24, S25, S26, S27,
} from './slides'
import './styles/nvsc-canary.css'

// 27 slides — storytelling restructure (S02=Title first, S01=Belief second)
const SLIDES = [
  S02, S01, S03, S04, S05, S06, S07, S08, S09,
  S10, S11, S12, S13, S14, S15, S16, S17, S18, S19,
  S20, S21, S22, S23, S24, S25, S26, S27,
]

const SLIDE_NAMES = [
  // Act I: The World (0-8)
  'TITLE', 'BELIEF', 'EVOLUTION', 'VISION', 'VISION DETAIL',
  'SIGNAL', 'SIGNAL LOGOS', 'EXPLOSION', 'VERDICT',
  // Act I→II Pivot: The Problem (9-12)
  'PROBLEM', 'PROBLEM DETAIL', 'THE GAP', 'THE NEED',
  // Act II: The Solution (13-18)
  'CANARY', 'SOLUTION', 'OBSERVE', 'QA REPORTS', 'PATTERNS', 'COMPETITION',
  // Act III: The Opportunity (19-26)
  'OPPORTUNITY', 'MARKET', 'BUSINESS', 'WHY NOW', 'TEAM', 'MILESTONES', 'GROWTH', 'CLOSE',
]

// Dark slides (indices). Light: 9-PROBLEM, 10-PROBLEM DETAIL, 18-COMPETITION, 20-MARKET, 22-WHY NOW, 23-TEAM
const DARK = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 19, 21, 24, 25, 26])

const SPEAKER_NOTES = [
  // 0 - TITLE
  `Thank you. We're Johnny and Teri from Canary.`,

  // 1 - BELIEF
  `We believe in this future. Let me show you why.`,

  // 2 - EVOLUTION
  `Let's talk about where AI actually is right now. In 2022, we got chatbots. You type, it responds. Then came prompt engineering — talking to AI better. Then context and memory — AI that remembers you. Then tool-using agents — AI that can actually use your software. And now, in 2026, we've crossed into something different. Proactive autonomy. AI that doesn't wait for you to type. AI that lives on your computer, sees what you're doing, and acts on its own.`,

  // 3 - VISION
  `This is the world we're heading toward.`,

  // 4 - VISION DETAIL
  `It reads through your files and creates to-do lists. It recognizes your writing style and responds to messages. It watches your patterns and automates them. This isn't a chatbot. This is a new kind of relationship with your computer.`,

  // 5 - SIGNAL
  `And this isn't a future prediction. It's already happening.`,

  // 6 - SIGNAL LOGOS
  `OpenClaw, Manus AI, Claude Computer Use, OpenAI Operator — all launched in the last twelve months. Every major AI lab is now shipping computer control. This opens the door for developers to build on top of this.`,

  // 7 - EXPLOSION
  `OpenClaw — 220,000 GitHub stars and 1.5 million agents in three months. The fastest-growing open-source AI project since ChatGPT. And Meta just acquired Manus AI — a proactive agent with its own simulated computer — for $2 billion. These are massive signals.`,

  // 8 - VERDICT
  `The industry isn't debating whether agents will control our computers. They already do. Every new YC startup is building tool-use agents, not chatbot wrappers.`,

  // 9 - PROBLEM
  `But here's the thing.`,

  // 10 - PROBLEM DETAIL
  `These agents are making a lot of mistakes. You can tell it not to touch your passwords — and it will anyway. You can tell it not to send that message — and it does, because it thinks it should. And because computer-use agents work at the operating system level — not through an API — we don't have the tools to monitor what they're actually doing. We can't log all the actions. We can't evaluate them.`,

  // 11 - THE GAP
  `Think about what we actually need. A way to monitor everything happening on the desktop — not the API, the actual screen. A way to capture every action. Log all of it. Return that data to the developer. Right now, that layer doesn't exist. There is no observation layer for computer-use agents.`,

  // 12 - THE NEED
  `They need data to get better. Someone has to capture it.`,

  // 13 - CANARY
  `That's what we're building.`,

  // 14 - SOLUTION
  `Canary gives you complete observability over your agent. One line of code connects your agent to our platform. We capture everything it does. We tag it, structure it, and give it back to you so you can test, verify, and improve. One line. Everything else is automatic.`,

  // 15 - OBSERVE
  `First: the observation layer. We watch everything your agent does and capture a full behavior trace. Every click, every navigation, every file it opens. You can replay exactly what happened, step by step. This data doesn't exist anywhere else. No tool captures it. We do.`,

  // 16 - QA REPORTS
  `Second: QA reports. Set your requirements — what should the agent do, what should it never do — and we check against them automatically. Pass/fail reports without writing a single test. QA that runs itself.`,

  // 17 - PATTERNS
  `Third: pattern intelligence. Because we're gathering data from all agents on the platform, we see what works and what doesn't across everyone. This creates our flywheel — more agents means better patterns, which means stronger products, which brings more agents. The data compounds.`,

  // 18 - COMPETITION
  `Every AI evaluation tool today operates at the API level — the chatbot level. Braintrust just raised $80 million. LangSmith raised $260 million. But all of these tools check what AI says — text in, text out. They cannot check what a computer-use agent actually does on your screen. The entire top-right quadrant — computer-use agent QA — is completely empty. That's where we are.`,

  // 19 - OPPORTUNITY
  `Twelve billion dollar market. And nobody's building this.`,

  // 20 - MARKET
  `The market signals are undeniable. Every major lab shipped computer control. Meta acquired Manus for $2 billion. And in August, the EU AI Act hits full enforcement — every company deploying agents will need compliance documentation. This is a $12 billion market growing at 46% CAGR. 70+ agent companies per YC batch — every single one needs QA.`,

  // 21 - BUSINESS
  `Free open-source SDK drives adoption — the Langfuse playbook. Startups start free, upgrade when they need the cloud dashboard and reports. Enterprise tier for regulated industries. No paid marketing. Organic, developer-first growth. The data flywheel means the platform gets more valuable with every agent that joins.`,

  // 22 - WHY NOW
  `Computer-use agents didn't exist until three months ago. QA-ing a computer-use agent is a fundamentally different problem than QA-ing a chatbot. The existing tools are architecturally locked into API-level traces — they'd have to rebuild from scratch. And vision AI just dropped 95% in cost. It's now economically viable to observe agent behavior continuously.`,

  // 23 - TEAM
  `Johnny is an AI engineer. He's built a 14-agent orchestration framework. Custom evals and recursive learning loops. Won multiple hackathons. Builds autonomous workflow tools for creative coding and freelance. Developer in the Photon Residency — helped build Flux, #1 on ProductHunt.\n\nTeri has designed products at National Geographic Society and Riot Games. Three-time startup founding product designer. She designs and codes — she ships.\n\nWe're not building for an abstract customer. We are the customer.`,

  // 24 - MILESTONES
  `Right now, we're building the core observation layer and cloud infrastructure. By weeks 4 to 6, we'll have QA reports and a beta launch with first developer teams running live. By April 16th, 10 beta teams with quantified data on what the platform catches.`,

  // 25 - GROWTH
  `By month six, production launch with enterprise pilots. By month twelve, 43 customers and $774K in ARR. Year two, 170 customers at $5.1M. Year three, 500 customers at $12 to $15M ARR.`,

  // 26 - CLOSE
  `The future of AI isn't a smarter chatbot. It's an agent that lives on your computer and does things for you. Every startup building in this space needs QA. Nobody has it. We're building it — and we're here first.\n\nCanary. QA for computer-use agents.`,
]

const variants = {
  enter: (d) => ({ opacity: 0, y: d > 0 ? 20 : -20 }),
  center: { opacity: 1, y: 0 },
  exit: (d) => ({ opacity: 0, y: d > 0 ? -20 : 20 }),
}

export default function NvscCanaryApp() {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const [showNotes, setShowNotes] = useState(true)

  const go = useCallback((next) => {
    if (next < 0 || next >= SLIDES.length) return
    setDir(next > idx ? 1 : -1)
    setIdx(next)
  }, [idx])

  useEffect(() => {
    const handler = (e) => {
      if (['ArrowRight', 'ArrowDown', ' '].includes(e.key)) { e.preventDefault(); go(idx + 1) }
      if (['ArrowLeft', 'ArrowUp'].includes(e.key)) { e.preventDefault(); go(idx - 1) }
      if (e.key === 'n' || e.key === 'N') setShowNotes(v => !v)
      if (e.key >= '1' && e.key <= '9') go(parseInt(e.key) - 1)
      if (e.key === '0') go(9)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [idx, go])

  const dark = DARK.has(idx)
  const Slide = SLIDES[idx]

  return (
    <div className="nvsc-canary-root">
      <div
        className="deck"
        onClick={(e) => {
          if (e.target.closest('button') || e.target.closest('.speaker-notes')) return
          go(e.clientX > window.innerWidth / 2 ? idx + 1 : idx - 1)
        }}
      >
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Slide />
          </motion.div>
        </AnimatePresence>

        {/* Dot navigation */}
        <div className="nav-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`nav-dot-btn${i === idx ? ' active' : ''}${!dark ? ' dark-dot' : ''}`}
              onClick={(e) => { e.stopPropagation(); go(i) }}
              title={SLIDE_NAMES[i]}
            />
          ))}
        </div>

        {/* Counter */}
        <div className={`slide-counter${!dark ? ' slide-counter--light' : ''}`}>
          {String(idx + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </div>

        {/* Slide name */}
        <div className={`slide-name${!dark ? ' slide-name--light' : ''}`}>
          {SLIDE_NAMES[idx]}
        </div>

        {/* Arrow buttons */}
        <button
          className={`nav-arrow nav-prev${!dark ? ' nav-arrow--light' : ''}`}
          onClick={(e) => { e.stopPropagation(); go(idx - 1) }}
          disabled={idx === 0}
        >{'\u2190'}</button>
        <button
          className={`nav-arrow nav-next${!dark ? ' nav-arrow--light' : ''}`}
          onClick={(e) => { e.stopPropagation(); go(idx + 1) }}
          disabled={idx === SLIDES.length - 1}
        >{'\u2192'}</button>

        {/* Speaker notes toggle */}
        <button
          className={`speaker-toggle${!dark ? ' speaker-toggle--light' : ''}`}
          onClick={(e) => { e.stopPropagation(); setShowNotes(v => !v) }}
          title="Toggle speaker script (N)"
        >
          {showNotes ? '\u2715 Hide speaker script' : '\u266A Show speaker script'}
        </button>

        {/* Speaker notes panel */}
        {showNotes && (
          <div className={`speaker-notes${!dark ? ' speaker-notes--light' : ''}`}>
            <div className="speaker-notes-header">SPEAKER SCRIPT</div>
            <div className="speaker-notes-body">
              {SPEAKER_NOTES[idx]}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
