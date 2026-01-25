import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from './hooks/useGsapScroll';

import BackgroundCanvas from './components/BackgroundCanvas';
import SlideNavigation from './components/SlideNavigation';
import Logo from './components/Logo';

// Slide 1: Title
import IntroSection from './sections/IntroSection';
// Slide 2: The Analogy
import AnalogySection from './sections/AnalogySection';
// Slide 3: The Spectrum Visual
import SpectrumSection from './sections/SpectrumSection';
// Slide 4: The Beat Drop
import BeatDropSection from './sections/BeatDropSection';
// Slide 5: How Might We
import HowMightWeSection from './sections/HowMightWeSection';
// Slide 6: The Answer
import TheAnswerSection from './sections/TheAnswerSection';
// Slide 7: Persona Selection
import PersonaSection from './sections/PersonaSection';
// Slide 8: Profile Generation
import ProfileSection from './sections/ProfileSection';
// Slide 9: How Onboarding Works
import OnboardingSection from './sections/OnboardingSection';
// Slide 10: Orchestration Flow
import OrchestrationSection from './sections/OrchestrationSection';
// Slide 11: Generated Output
import GeneratedOutputSection from './sections/GeneratedOutputSection';
// Slide 12: Vision Expansion
import VisionSection from './sections/VisionSection';
// Slide 13: Simulator Grid
import SimulatorGridSection from './sections/SimulatorGridSection';
// Slide 14: The Close
import TheCloseSection from './sections/TheCloseSection';
// Slide 15: Team
import TeamSection from './sections/TeamSection';
// Slide 16: Final Tagline
import FinalTaglineSection from './sections/FinalTaglineSection';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_SLIDES = 16;

// Scroll to specific slide
function scrollToSlide(index) {
  const slideHeight = window.innerHeight;
  window.scrollTo({
    top: index * slideHeight,
    behavior: 'smooth'
  });
}

function Gradient() {
  const currentSlideRef = useRef(0);

  // Initialize GSAP and keyboard navigation
  useEffect(() => {
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentSlideRef.current < TOTAL_SLIDES - 1) {
          currentSlideRef.current += 1;
          scrollToSlide(currentSlideRef.current);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentSlideRef.current > 0) {
          currentSlideRef.current -= 1;
          scrollToSlide(currentSlideRef.current);
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        currentSlideRef.current = 0;
        scrollToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        currentSlideRef.current = TOTAL_SLIDES - 1;
        scrollToSlide(TOTAL_SLIDES - 1);
      }
    };

    // Track current slide on scroll
    const handleScroll = () => {
      const slideHeight = window.innerHeight;
      const newSlide = Math.round(window.scrollY / slideHeight);
      currentSlideRef.current = Math.min(Math.max(newSlide, 0), TOTAL_SLIDES - 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="gradient-experience">
      {/* Continuous Background Canvas - spans all slides */}
      <BackgroundCanvas totalSlides={TOTAL_SLIDES} />

      {/* Slide Navigation */}
      <SlideNavigation totalSlides={TOTAL_SLIDES} />

      {/* Fixed Logo - top left of every page */}
      <div className="fixed top-6 left-6 z-50">
        <Logo />
      </div>

      {/* Noise Texture Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Slide 1: Title/One-Liner */}
        <IntroSection />

        {/* Slide 2: The Analogy */}
        <AnalogySection />

        {/* Slide 3: The Spectrum Visual */}
        <SpectrumSection />

        {/* Slide 4: The Beat Drop */}
        <BeatDropSection />

        {/* Slide 5: How Might We */}
        <HowMightWeSection />

        {/* Slide 6: The Answer */}
        <TheAnswerSection />

        {/* Slide 7: Persona Selection */}
        <PersonaSection />

        {/* Slide 8: Profile Generation */}
        <ProfileSection />

        {/* Slide 9: How Onboarding Works */}
        <OnboardingSection />

        {/* Slide 10: Orchestration Flow */}
        <OrchestrationSection />

        {/* Slide 11: Generated Output */}
        <GeneratedOutputSection />

        {/* Slide 12: Vision Expansion */}
        <VisionSection />

        {/* Slide 13: Simulator Grid */}
        <SimulatorGridSection />

        {/* Slide 14: The Close */}
        <TheCloseSection />

        {/* Slide 15: Team */}
        <TeamSection />

        {/* Slide 16: Final Tagline + Logo */}
        <FinalTaglineSection />
      </main>
    </div>
  );
}

export default Gradient;
