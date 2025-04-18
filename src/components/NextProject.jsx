import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const glow = keyframes`
  0% {
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.1),
                 0 0 10px rgba(255, 255, 255, 0.1),
                 0 0 15px rgba(255, 255, 255, 0.1);
  }
  50% {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3),
                 0 0 20px rgba(255, 255, 255, 0.2),
                 0 0 30px rgba(255, 255, 255, 0.1);
  }
  100% {
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.1),
                 0 0 10px rgba(255, 255, 255, 0.1),
                 0 0 15px rgba(255, 255, 255, 0.1);
  }
`;

const NextProjectContainer = styled.div`
  width: 100%;
  padding: 4rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  margin-top: 4rem;
  margin-bottom: 6rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 800px;
  width: 100%;
  padding: 0 2rem;
  position: relative;
`;

const PreviewImage = styled(motion.img)`
  max-width: 300px;
  max-height: 200px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.4) 15%,
    rgba(0, 0, 0, 0.2) 25%,
    rgba(0, 0, 0, 0) 45%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 1;
  pointer-events: none;
  mix-blend-mode: multiply;
`;

const ProjectInfo = styled.div`
  position: absolute;
  bottom: -2rem;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 2;
`;

const ProjectTitle = styled.h3`
  font-family: 'Work Sans', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-weight: 200;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const ProjectDescription = styled.p`
  font-family: 'Work Sans', sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0.2rem 0 0;
  font-weight: 200;
`;

const ArrowButton = styled(motion.button)`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
  position: absolute;
  z-index: 3;

  &:hover {
    color: white;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const NextProject = ({ currentProject, nextProject }) => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    if (nextProject) {
      const formattedTitle = nextProject.title.replace(/\s+/g, "");
      navigate(`/projects/${formattedTitle}`);
    }
  };

  const handlePrevClick = () => {
    if (currentProject) {
      const formattedTitle = currentProject.title.replace(/\s+/g, "");
      navigate(`/projects/${formattedTitle}`);
    }
  };

  return (
    <NextProjectContainer>
      <ContentWrapper>
        {nextProject && nextProject.image && (
          <>
            <PreviewImage
              src={nextProject.image}
              alt={nextProject.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.5 }}
            />
            <ImageOverlay />
            <ProjectInfo>
              <ProjectTitle>[Next Project]</ProjectTitle>
              <ProjectTitle>{nextProject.title}</ProjectTitle>
              <ProjectDescription>{nextProject.description}</ProjectDescription>
            </ProjectInfo>
            <ArrowButton
              onClick={handleNextClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{ right: '2rem' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </ArrowButton>
          </>
        )}
      </ContentWrapper>
    </NextProjectContainer>
  );
};

export default NextProject; 