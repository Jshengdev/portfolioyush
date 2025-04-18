import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const Container2 = styled.div`
  position: fixed;
  width: 100%;
  left: 45px;
  top: 50px;
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

  &::-webkit-scrollbar {
    display: none; 
  }
`;

const Right = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  background: rgba(20, 20, 20, 0.3);
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  scrollbar-width: none;
  -ms-overflow-style: none;
  margin-top: 60px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: max-content;
  height: 100%;
  gap: 120px;
  padding: 0 60px;
  will-change: transform;
`;

const ScrollItem = styled(motion.div)`
  flex: 0 0 280px;
  height: ${props => props.height || '70vh'};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 40px);
  overflow: hidden;
  border-radius: 12px;
  margin-bottom: 12px;
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
  position: relative;
  color: rgba(255, 255, 255, 0.95);
  font-family: 'Work Sans', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 1px;
  padding: 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
  font-weight: 500;
  z-index: 10;
  width: 100%;
  text-align: right;
`;

const Title = styled.h1`
    font-family: 'work sans';
    font-weight: 300;
    font-size: 36px;
    transform: translateX(15px);
    letter-spacing: 2px;
    transform-origin: 0 0;
    transition: transform 0.5s, color 0.3s ease-in-out;
    color: rgba(255, 255, 255, .7);
        &:hover {
        transform: scale(1.01);
        color: white;
    }
    // transform: scale(1,1.1) skew(-2deg) translateX(0.5%);
`

const projects = [
  {
    title: 'Tokyo Creative Salon',
    image: 'assets/Grove/V3 profile.png'
  },
  {
    title: 'Shogo Tominaga',
    image: 'assets/Grove/V3 profile.png',
  },
  {
    title: 'Anime Scene',
    image: 'assets/Grove/V3 profile.png',
  },
  {
    title: 'Yona Yona Beer',
    image: 'assets/Grove/V3 profile.png',
  },
  {
    title: 'Creative Design',
    image: 'assets/Grove/V3 profile.png',
  },
  {
    title: 'Art Gallery',
    image: 'assets/Grove/background.jpg',
  },
  {
    title: 'Additional Project 1',
    image: 'assets/Grove/V3 profile.png',
  },
  {
    title: 'Additional Project 2',
    image: 'assets/Grove/V3 profile.png',
  },
  {
    title: 'Additional Project 3',
    image: 'assets/Grove/V3 profile.png',
  },
];

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
    return { 
      [direction]: `${marginValue}px`,
      height: `${heightValue}vh`
    };
  };

  return (
    <Container>
      <Left>
      </Left>
      <Right ref={scrollRef}>
        <ScrollWrapper>
          {projects.map((project, index) => {
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
                    alt={project.title}
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
                  {'['}{project.title}{']'}
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