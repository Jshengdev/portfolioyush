import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { S01, S02, S03, S04, S05, S06, S07, S07B, S08, S09, S10, S11, S12, S13, S14, S15, S16, S17 } from './slides'
import './styles/nvsc-canary.css'

//                0    1    2    3    4    5    6    7     8    9    10   11   12   13   14   15   16   17
const SLIDES = [S01, S02, S03, S04, S05, S06, S07, S07B, S08, S10, S11, S12, S09, S13, S14, S15, S16, S17]
const SLIDE_NAMES = [
  'TITLE', 'EVOLUTION', 'IMAGINE', 'SIGNAL', 'EXPLOSION',
  'PROBLEM', 'MISSING LAYER', 'CANARY', 'SOLUTION',
  'OBSERVE', 'QA REPORTS', 'PATTERNS', 'COMPETITION',
  'MARKET', 'BUSINESS', 'TEAM', 'MILESTONES', 'CLOSE',
]
// dark slides: 0-TITLE, 1-EVOLUTION, 2-IMAGINE, 3-SIGNAL, 4-EXPLOSION, 6-MISSING LAYER, 7-CANARY, 8-SOLUTION, 9-OBSERVE, 10-QA REPORTS, 11-PATTERNS, 14-BUSINESS, 16-MILESTONES, 17-CLOSE
const DARK = new Set([0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 14, 16, 17])

const SPEAKER_NOTES = [
  // 0 - TITLE
  `Thank you. We're Johnny and Teri from Canary.`,

  // 1 - EVOLUTION
  `Let's talk about where AI actually is right now. In 2022, we got chatbots. You type, it responds. Then came prompt engineering -- talking to AI better. Then context and memory -- AI that remembers you. Then tool-using agents -- AI that can actually use your software. And now, in 2026, we've crossed into something different. Proactive autonomy. AI that doesn't wait for you to type. AI that lives on your computer, sees what you're doing, and acts on its own.`,

  // 2 - IMAGINE
  `Imagine AI that knows you better than yourself. Imagine AI that can look at your desktop and clean it up. That reads your messages and knows which ones to answer, and how. That watches how you work -- your patterns, your habits -- and starts doing it for you. This isn't a chatbot. This is a new kind of relationship with your computer.`,

  // 3 - SIGNAL
  `And here's the thing -- this isn't a future prediction. The signals are already here. This is happening now.`,

  // 4 - EXPLOSION
  `Three months ago, an open-source project called OpenClaw launched. If you haven't heard of it yet -- you're about to. OpenClaw is a computer-use AI agent. It lives on your desktop and does things for you. Not through a chat window. On your actual computer. Clicking through apps, navigating workflows, moving files, sending messages. It exploded to 160,000 GitHub stars and 1.5 million agents in three months. Meanwhile, Meta acquired Manus AI -- a proactive agent with its own simulated computer -- for $2 billion. OpenAI hired the OpenClaw founder himself. Every major AI lab is now shipping computer control. The industry isn't debating whether agents will control our computers. They already do. Every new YC startup is building tool-use agents, not chatbot wrappers. This is where AI is going.`,

  // 5 - PROBLEM
  `OpenClaw is making a lot of mistakes. You can tell it not to touch your passwords -- and it will anyway. You can tell it not to send that message -- and it does, because it thinks it should. This agent is powerful. It can do a lot. But it's not perfect, and it's not trained well enough yet.\n\nAnd here's the real problem: because computer-use agents work at the operating system level -- not through an API -- we don't have the tools to monitor what they're actually doing. We can't log all the actions an agent makes on your desktop. We can't evaluate them. And we can't use that data to teach the agent to be better.\n\nEvery developer building in this space is asking the same question: how do you build a better product when you can't monitor what the product is doing? There's no QA for this.`,

  // 6 - MISSING LAYER
  `Think about what we actually need. A way to monitor everything happening on the desktop -- not the API, the actual screen. A way to capture every action the agent takes. Every click. Every file it opens. Every message it sends. Log all of it. And then return that data to the developer so they can see what happened, evaluate it, and use it to make their agent better. Right now, that layer doesn't exist. OpenClaw and these autonomous AIs are making a lot of mistakes. How do we actually make them better? We need data. And there's no way to get it.`,

  // 7 - CANARY (transition slide)
  `That's what we're building.`,

  // 8 - SOLUTION
  `Canary is QA for computer-use agents. One line of code connects your agent to our platform. We watch everything your agent does on the computer. We capture that data. We tag it. We structure it. And we give it back to you so you can test, verify, and improve your product. One line. Everything else is automatic.`,

  // 9 - OBSERVE (Feature 1)
  `First: the observation layer. This is the core. We watch everything your agent does on the computer and capture a full behavior trace. Every click. Every navigation. Every file it opens. Every message it sends. You can replay exactly what your agent did, step by step. This data doesn't exist anywhere else. No tool captures it. We do.`,

  // 10 - QA REPORTS (Feature 2)
  `Second: QA reports. Developers set their requirements -- what should the agent do, what should it never do -- and we check against them automatically. Did it complete the task? Did it stay within allowed boundaries? Did it access restricted files? You get a pass/fail report without writing a single test. This is QA that runs itself.`,

  // 11 - PATTERNS (Feature 3)
  `Third: pattern intelligence. Because we're gathering data from all agents on the platform, we can see what works and what doesn't across everyone. Developers use these patterns to build stronger, more reliable agents. And this creates our flywheel -- more agents on the platform means better patterns, which means stronger products, which brings more agents. The data compounds.`,

  // 12 - COMPETITION
  `Today, every AI evaluation tool operates at the API level -- the chatbot level. Braintrust just raised $80 million at an $800 million valuation for AI evaluation. LangSmith raised $260 million. But all of these tools check what AI says -- text in, text out. They cannot check what a computer-use agent actually does on your screen. What it clicked. What files it opened. Whether it sent a message to the wrong person. There's no way to even capture this data. Look at this map. Every single tool is on the left side. The entire right side -- computer-use QA -- is completely empty. That's where we are.`,

  // 13 - MARKET
  `The market signals are undeniable. Claude Computer Use shipped October 2024. OpenAI Operator in January. Microsoft, Amazon, Google -- all in. Browser Use goes viral. OpenClaw explodes. Meta acquires Manus for $2 billion. And in August, the EU AI Act hits full enforcement -- every company deploying agents will need compliance documentation.\n\nThis is a $12 billion market growing at 46% CAGR. Just the YC ecosystem alone has 60 to 70 agent companies per batch -- and they're all building tool-use agents. Every single one of them needs QA. They can't build it themselves -- they're trying to build their product. We're building specifically for these startups. The teams that don't have the infrastructure to do this on their own. This is a massive, addressable market -- and the timestorm is happening right now.`,

  // 14 - BUSINESS
  `Our business model is usage-based with enterprise tiers. Free open-source SDK drives adoption -- the Langfuse playbook. They had 26 million SDK installs per month before being acquired. Startups start on the free tier, upgrade when they need the cloud dashboard and reports. Enterprise tier for regulated industries -- healthcare, finance, legal -- where compliance is mandatory. No paid marketing. Organic, developer-first growth. The data flywheel means the platform gets more valuable with every agent that joins.`,

  // 15 - TEAM
  `Why hasn't anyone built this? Because computer-use agents didn't exist until three months ago. And QA-ing a computer-use agent is a fundamentally different problem than QA-ing a chatbot. You're not logging text in and text out. You're understanding what an agent did on a screen. The existing tools are architecturally locked into API-level traces. They can't just add a feature -- they'd have to rebuild from scratch. And the cost curve just arrived. Vision AI dropped 95% in cost. It's now economically viable to observe agent behavior continuously.\n\nJohnny is an AI engineer. He's built a 14-agent orchestration framework. He's written custom evals and recursive learning loops for agent behavior. He's built desktop agents from scratch -- he lives this problem from a developer's perspective. He was a developer in the Photon Residency and helped build Flux, basically Lovable for AI message agents. He also built epstein.im just for fun. He has a reel that hit 8 million views. He's embedded in the startup and creator world.\n\nTeri has designed products at National Geographic Society and Riot Games. She's a three-time startup founding product designer -- including a zero-to-one B2B product. She designs and codes, which means we iterate without handoff. She's part of three entrepreneurship orgs at USC -- she knows founders.\n\nTogether, we're uniquely positioned. We're not building for an abstract customer. We are the customer.`,

  // 16 - MILESTONES
  `Here's where we are and where we're going. Right now, we're building the core observation layer -- the SDK that captures what agents do on computers, and the cloud infrastructure to support it. By April, we'll have 10 developer teams running QA on their live agents with quantified data on what the platform catches. By month six, production launch with enterprise pilots. By month twelve, 43 customers and $774K in ARR.`,

  // 17 - CLOSE
  `The future of AI isn't a smarter chatbot. It's an agent that lives on your computer and does things for you. OpenClaw, Manus, Claude, Operator -- they're all here. Every startup building in this space needs QA. Nobody has it. We're building it -- and we're here first.\n\nCanary. QA for computer-use agents.`,
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
        >←</button>
        <button
          className={`nav-arrow nav-next${!dark ? ' nav-arrow--light' : ''}`}
          onClick={(e) => { e.stopPropagation(); go(idx + 1) }}
          disabled={idx === SLIDES.length - 1}
        >→</button>

        {/* Speaker notes toggle */}
        <button
          className={`speaker-toggle${!dark ? ' speaker-toggle--light' : ''}`}
          onClick={(e) => { e.stopPropagation(); setShowNotes(v => !v) }}
          title="Toggle speaker script (N)"
        >
          {showNotes ? '✕ Hide speaker script' : '♪ Show speaker script'}
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
