import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useGsapScroll';
import DotMatrixImage from '../components/DotMatrixImage';
import ravenLogo from '../assets/ravenlogogradiientttttt.png';

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const textElements = textRef.current.querySelectorAll('.animate-in');
      gsap.from(textElements, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });

      gsap.from(imageRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intro"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div ref={textRef} className="text-center lg:text-left order-2 lg:order-1">
            <h1
              className="animate-in text-7xl md:text-8xl lg:text-9xl mb-6 gradient-text"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                lineHeight: 0.9,
              }}
            >
              Gradient
            </h1>

            <p
              className="animate-in text-2xl md:text-3xl"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
                color: '#6E6E6E',
              }}
            >
              A personalization layer that lets anyone dream up AR tools.
            </p>
          </div>

          <div ref={imageRef} className="flex items-center justify-center order-1 lg:order-2 edge-fade">
            <DotMatrixImage
              src={ravenLogo}
              alt="Gradient logo"
              className="w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]"
              animated={true}
              config={{
                gridSize: 5,
                scanSpeed: 2,
                canvasSize: 500,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
