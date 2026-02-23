import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useScrollReveal(buildTimeline, triggerOpts = {}) {
  const sectionRef = useRef(null)

  const build = useCallback(buildTimeline, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 75%',
        once: true,
        ...triggerOpts,
      },
    })

    build(tl, el)

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [build, triggerOpts])

  return sectionRef
}
