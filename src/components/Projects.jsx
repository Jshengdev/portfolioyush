import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Container2, } from "./sharedStyles";
import { projectParty } from "../data/projectname.jsx";
import NextProject from './NextProject';

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

const softGlow = keyframes`
  0% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1),
                0 0 40px rgba(255, 255, 255, 0.05);
  }
  50% {
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.2),
                0 0 60px rgba(255, 255, 255, 0.1);
  }
  100% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1),
                0 0 40px rgba(255, 255, 255, 0.05);
  }
`;

const Section = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  width: 100%;
  height: 100%;
`;

const Left = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ProjectList = styled(motion.ul)`
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    align-items: flex-end;
    row-gap: 150px;
    list-style: none;
    padding-bottom: 200px;
`;

const ProjectItem = styled(motion.li)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: color 0.3s ease-in;

  &:hover {
    color: white;
  }

  .project-title {
    font-size: 48px;
    font-weight: 100;
    font-family: "ade";
    text-transform: uppercase;
    mask-image: linear-gradient(to right, transparent, #000 20%, #000 70%, transparent),
    linear-gradient(to bottom, transparent, #000 20%, #000 70%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, #000 40%, #000 60%, transparent),
    linear-gradient(to bottom, transparent, #000 50%, transparent);
  }

  .project-description {
    font-size: 12px;
    font-weight: 800;
    font-family: "work sans, black";
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const PreviewContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: ${softGlow} 4s infinite;
  perspective: 1000px;
  transform-style: preserve-3d;
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  transform-style: preserve-3d;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const PreviewImage = styled(motion.img)`
  max-width: 90%;
  max-height: 80vh;
  object-fit: contain;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.5s ease;
  filter: brightness(1.1) contrast(1.1);
  border-radius: 24px;
  box-shadow: 0 0 50px rgba(255, 255, 255, 0.3),
              0 0 100px rgba(255, 255, 255, 0.1),
              0 8px 32px rgba(0, 0, 0, 0.1),
              0 2px 8px rgba(0, 0, 0, 0.1);
  transform: perspective(1000px) rotateY(-5deg);
  transform-style: preserve-3d;
  backface-visibility: hidden;
  margin: 0 auto;
  display: block;
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

const getFontSize = (title) => {
  const length = title.length;
  if (length > 20) return '2.5rem';
  if (length > 14) return '2.8rem';
  if (length > 6) return '3.2rem';
  return '4.2rem';
};

const PreviewTitle = styled(motion.h1)`
  font-family: 'Ade', serif;
  font-size: ${props => getFontSize(props.title)};
  color: white;
  position: absolute;
  left: 1rem;
  top: 40%;
  transform: translateY(-50%);
  z-index: 2;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.8s ease;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: ${props => props.isVisible ? glow : 'none'} 3s infinite;
  mix-blend-mode: exclusion;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2),
               0 0 50px rgba(255, 255, 255, 0.3),
               0 0 70px rgba(255, 255, 255, 0.1);
  max-width: 40%;
  line-height: 1.2;
  font-weight: 300;
`;

const Projects = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageError, setImageError] = useState(false);

  const handleHeroClick = () => {
    navigate("/");
  };

  const handleProjectClick = (projectTitle) => {
    const formattedTitle = projectTitle.replace(/\s+/g, ""); 
    navigate(`/projects/${formattedTitle}`);
  };

  const handleProjectHover = (project) => {
    setImageError(false);
    setSelectedProject(project);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Find the current project index and get next project
  const currentIndex = selectedProject ? projectParty.findIndex(p => p.id === selectedProject.id) : -1;
  const nextProject = currentIndex >= 0 && currentIndex < projectParty.length - 1 ? projectParty[currentIndex + 1] : null;

  return (
    <Section>
      <Container>
        <Left>
          <ProjectList>
            {projectParty.map((project) => (
              <ProjectItem
                key={project.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: .1 }}
                onClick={() => handleProjectClick(project.title)}
                onMouseEnter={() => handleProjectHover(project)}
              >
                <span className="project-title">{project.title}</span>
                <span className="project-description">{project.description}</span>
              </ProjectItem>
            ))}
          </ProjectList>
        </Left>
        <Right>
          <PreviewContainer>
            {selectedProject && selectedProject.image && !imageError ? (
              <>
                <ImageWrapper>
                  <PreviewImage
                    key={selectedProject.id}
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    isVisible={true}
                    onError={handleImageError}
                    initial={{ opacity: 0, scale: 0.95, rotateY: -5 }}
                    animate={{ opacity: 1, scale: 1, rotateY: -2 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </ImageWrapper>
                <ImageOverlay />
                <PreviewTitle
                  key={selectedProject.id}
                  isVisible={true}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  title={selectedProject.title}
                >
                  {selectedProject.title.toUpperCase()}
                </PreviewTitle>
              </>
            ) : null}
          </PreviewContainer>
        </Right>
        <Container2>
          <Title onClick={handleHeroClick}>johnny sheng's projects</Title>
        </Container2>
      </Container>
      {selectedProject && <NextProject currentProject={selectedProject} nextProject={nextProject} />}
    </Section>
  );
};

export default Projects;
