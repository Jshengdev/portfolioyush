import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ScrollContainer = styled.div`
  position: relative;
  width: max-content;
  height: 100vh;
  overflow: hidden;
  background: #000;

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const ScrollWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: max-content;
  will-change: transform;
  padding: 0 60px;
  gap: 60px;
`;

const ScrollItem = styled(motion.div)`
  flex: 0 0 400px;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 12px;
`;

const Image = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const Caption = styled(motion.div)`
  position: absolute;
  top: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.9);
  font-family: "Ade", sans-serif;
  font-size: 1rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 10px 20px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  backdrop-filter: blur(4px);
`;

const projects = [
  {
    title: 'Tokyo Creative Salon',
    image: '/public/assets/GROVE/V3 profile.png'
  },
  {
    title: 'Shogo Tominaga',
    image: '/public/assets/GROVE/V3 profile.png',
  },
  {
    title: 'Anime Scene',
    image: '/public/assets/GROVE/V3 profile.png',
  },
  {
    title: 'Yona Yona Beer',
    image: '/public/assets/GROVE/V3 profile.png',
  },
  {
    title: 'Creative Design',
    image: '/public/assets/GROVE/V3 profile.png',
  },
  {
    title: 'Art Gallery',
    image: '/public/assets/GROVE/background.jpg',
  },
];

const HorizontalScroll = () => {
  const scrollRef = useRef();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let targetScroll = el.scrollLeft;
    let currentScroll = el.scrollLeft;
    let animationFrameId = null;

    const onWheel = (e) => {
      e.preventDefault();
      const maxScroll = el.scrollWidth - el.clientWidth;

      // Update scroll target
      targetScroll += e.deltaY * 1.5;
      targetScroll = Math.max(0, Math.min(maxScroll, targetScroll));

      // Only start animation if not already in progress
      if (!animationFrameId) {
        const animate = () => {
          currentScroll += (targetScroll - currentScroll) * 0.1;
          el.scrollLeft = currentScroll;

          if (Math.abs(targetScroll - currentScroll) > 0.5) {
            animationFrameId = requestAnimationFrame(animate);
          } else {
            el.scrollLeft = targetScroll;
            animationFrameId = null; // reset
          }
        };
        animate();
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', onWheel);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const getRandomMargin = () => {
    const direction = Math.random() > 0.5 ? 'marginTop' : 'marginBottom';
    const value = Math.floor(Math.random() * 80) + 40;
    return { [direction]: `${value}px` };
  };

  return (
    <ScrollContainer>
      <ScrollWrapper ref={scrollRef}>
        {projects.map((project, index) => (
          <ScrollItem
            key={index}
            style={getRandomMargin()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ImageWrapper>
              <Image
                src={project.image}
                alt={project.title}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
              <Caption
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              >
                {project.title}
              </Caption>
            </ImageWrapper>
          </ScrollItem>
        ))}
      </ScrollWrapper>
    </ScrollContainer>
  );
};

export default HorizontalScroll;