import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Title, Container2 } from './sharedStyles';

const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

const Left = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  margin-top: 75px;
  margin-left: 25px;
  text-align: right;
  overflow-y: auto;
  height: 100%;
  border-top: 1px rgba(255, 255, 255, 0.3) solid;
  scrollbar-width: none; 
  -ms-overflow-style: none;
  z-index: 0;

  &::-webkit-scrollbar {
    display: none; 
  }
`;

const Right = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-backdrop-filter: blur(2px);
  scrollbar-width: none;
  -ms-overflow-style: none;
  margin-top: 60px;
  z-index: 2;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: max-content;
  height: 100%;
  gap: 20rem;
  will-change: transform;
`;

const ScrollItem = styled(motion.div)`
  flex: 0 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: scale(0.7);
  transform-origin: left center;
  z-index: 3;
  height: ${props => props.height || 'auto'};
`;

const ImageWrapper = styled.div`
  position: relative;
  width: auto;
  height: 100%;
  margin-bottom: 5px;
  overflow: visible;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
`;

const Image = styled(motion.img)`
  width: auto;
  height: 100%;
  max-width: 70%;
  max-height: 70%;
  object-fit: contain;
  opacity: 0.8;
  transition: opacity 0.6s ease, filter 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  transform: scale(0.7);
  transform-origin: center center;
  z-index: 5;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.2));

  &:hover {
    opacity: 1;
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.35));
  }
`;

const Caption = styled(motion.div)`
  position: absolute;
  left: 90%;
  bottom: 28%;
  color: rgba(255, 255, 255, 0.95);
  font-family: 'Work Sans', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 1px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
  font-weight: 200;
  z-index: 6;
  border-radius: 4px;
  white-space: nowrap;
  text-align: right;
  width: fit-content;
  margin-top: 20px;
  mix-blend-mode: exclusion;
`;


const Archive = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => navigate("/");
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
    const marginValue = Math.floor(Math.random() * 80) + 40;
    const heightValue = Math.floor(Math.random() * 30) + 60; // Random height between 60vh and 90vh
    
    // Generate random skew values between -5 and 5 degrees
    const skewX = (Math.random() * 10 - 5).toFixed(1);
    const skewY = (Math.random() * 10 - 5).toFixed(1);
    
    return { 
      [direction]: `${marginValue}px`,
      height: `${heightValue}vh`,
      transform: `skew(${skewX}deg, ${skewY}deg)`
    };
  };

  return (
    <Container>
      <Left>
      </Left>
      <Right ref={scrollRef}>
        <ScrollWrapper>
          {archiveItems.map((project, index) => {
            const styles = getRandomMargin();
            return (
              <ScrollItem
                key={index}
                style={styles}
                height={styles.height}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ImageWrapper>
                  <Image
                    src={project.image}
                    alt={project.caption}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                </ImageWrapper>
                <Caption
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  {'['}{project.caption}{']'}
                </Caption>
              </ScrollItem>
            );
          })}
        </ScrollWrapper>
      </Right>
      <Container2>
        <Title onClick={handleHomeClick}>johnny sheng's archive</Title>
      </Container2>
    </Container>
  );
};

export default Archive; 