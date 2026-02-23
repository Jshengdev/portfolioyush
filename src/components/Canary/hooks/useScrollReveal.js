import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DEFAULT_OPTS = {}

export default function useScrollReveal(buildTimeline, triggerOpts) {
  const sectionRef = useRef(null)
  // Stable reference: use provided opts or a module-level constant
  const opts = triggerOpts || DEFAULT_OPTS

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true,
        ...opts,
      },
    })

    buildTimeline(tl, el)

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill()
      })
    }
  }, []) // Run once on mount — buildTimeline is already memoized by callers

  return sectionRef
}
