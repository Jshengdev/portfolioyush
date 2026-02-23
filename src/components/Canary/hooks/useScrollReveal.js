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
      // revert() removes all inline styles GSAP applied, then kills.
      // Critical for React 18 Strict Mode: without revert(), .from() tweens
      // leave inline opacity:0 on elements after the first mount/unmount cycle,
      // and the second mount captures opacity:0 as the "to" value → elements
      // stay permanently invisible.
      tl.revert()
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill()
      })
    }
  }, []) // Run once on mount — buildTimeline is already memoized by callers

  return sectionRef
}
