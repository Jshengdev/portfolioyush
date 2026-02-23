import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useCountUp(targetValue, options = {}) {
  const { duration = 2, prefix = '', suffix = '', decimals = 0 } = options
  const ref = useRef(null)
  const [display, setDisplay] = useState(prefix + '0' + suffix)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obj = { val: 0 }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: targetValue,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            setDisplay(prefix + obj.val.toFixed(decimals) + suffix)
          },
        })
      },
    })

    return () => st.kill()
  }, [targetValue, duration, prefix, suffix, decimals])

  return { ref, display }
}
