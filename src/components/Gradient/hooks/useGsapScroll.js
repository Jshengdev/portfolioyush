import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Hook for scroll-triggered animations
export function useGsapScroll(callback, deps = []) {
  const elementRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (elementRef.current && callback) {
        callback(elementRef.current, gsap, ScrollTrigger);
      }
    }, elementRef);

    return () => ctx.revert();
  }, deps);

  return elementRef;
}

// Hook for staggered reveal animations
export function useStaggerReveal(selector, options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      gsap.set(elements, {
        opacity: 0,
        y: options.y || 50,
        ...options.from
      });

      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: options.duration || 0.8,
        stagger: options.stagger || 0.15,
        ease: options.ease || 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: options.start || 'top 80%',
          end: options.end || 'bottom 20%',
          toggleActions: options.toggleActions || 'play none none reverse',
          ...options.scrollTrigger
        },
        ...options.to
      });
    }, containerRef);

    return () => ctx.revert();
  }, [selector, JSON.stringify(options)]);

  return containerRef;
}

// Hook for parallax effect
export function useParallax(speed = 0.5) {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(elementRef.current, {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, elementRef);

    return () => ctx.revert();
  }, [speed]);

  return elementRef;
}

// Hook for text reveal animation
export function useTextReveal(options = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      // Split text into spans if needed
      const text = elementRef.current;
      const originalText = text.textContent;

      if (options.splitChars) {
        text.innerHTML = originalText
          .split('')
          .map(char => char === ' ' ? ' ' : `<span class="char">${char}</span>`)
          .join('');

        gsap.from(text.querySelectorAll('.char'), {
          opacity: 0,
          y: options.y || 20,
          rotateX: options.rotateX || 0,
          duration: options.duration || 0.6,
          stagger: options.stagger || 0.02,
          ease: options.ease || 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: options.start || 'top 85%',
            toggleActions: options.toggleActions || 'play none none reverse'
          }
        });
      } else {
        gsap.from(text, {
          opacity: 0,
          y: options.y || 30,
          duration: options.duration || 0.8,
          ease: options.ease || 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: options.start || 'top 85%',
            toggleActions: options.toggleActions || 'play none none reverse'
          }
        });
      }
    }, elementRef);

    return () => ctx.revert();
  }, [JSON.stringify(options)]);

  return elementRef;
}

// Hook for image reveal animation
export function useImageReveal(direction = 'left') {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const image = containerRef.current.querySelector('img, .image-wrapper');
      if (!image) return;

      const directions = {
        left: { x: -100, y: 0 },
        right: { x: 100, y: 0 },
        top: { x: 0, y: -100 },
        bottom: { x: 0, y: 100 }
      };

      const { x, y } = directions[direction] || directions.left;

      gsap.from(image, {
        x,
        y,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [direction]);

  return containerRef;
}

export { gsap, ScrollTrigger };
