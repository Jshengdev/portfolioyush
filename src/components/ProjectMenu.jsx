import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { projectParty } from '../data/projectname';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const glow = keyframes`
  0% {
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
  }
  50% {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  }
  100% {
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const ProjectList = styled.div`
  padding: 2rem;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  overflow-y: auto;
`;

const ProjectItem = styled.div`
  padding: 1rem 0;
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Work Sans', sans-serif;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
    transform: translateX(10px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const PreviewSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
`;

const ProjectImage = styled.img`
  max-width: 80%;
  max-height: 60vh;
  object-fit: contain;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.5s ease;
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  display: ${props => props.src ? 'block' : 'none'};
`;

const ProjectTitle = styled.h1`
  font-family: 'Ade', sans-serif;
  font-size: 3rem;
  color: white;
  margin-top: 2rem;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.5s ease;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: ${props => props.isVisible ? glow : 'none'} 3s infinite;

  &:hover {
    animation: ${glow} 3s infinite;
  }
`;

const ProjectMenu = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleProjectClick = (project) => {
    setImageError(false);
    setSelectedProject(project);
  };

  const handleProjectSelect = (project) => {
    navigate(`/projects/${project.title.replace(/\s+/g, '')}`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Container>
      <ProjectList>
        {projectParty.map((project) => (
          <ProjectItem
            key={project.id}
            onClick={() => handleProjectSelect(project)}
            onMouseEnter={() => handleProjectClick(project)}
          >
            {project.title}
          </ProjectItem>
        ))}
      </ProjectList>
      <PreviewSection>
        {selectedProject && (
          <>
            {selectedProject.image && !imageError ? (
              <ProjectImage
                src={selectedProject.image}
                alt={selectedProject.title}
                isVisible={true}
                onError={handleImageError}
              />
            ) : (
              <div style={{ 
                width: '80%', 
                height: '60vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'rgba(255, 255, 255, 0.3)',
                fontFamily: 'Work Sans, sans-serif',
                fontSize: '1.2rem'
              }}>
                No preview available
              </div>
            )}
            <ProjectTitle isVisible={true}>
              {selectedProject.title.toUpperCase()}
            </ProjectTitle>
          </>
        )}
      </PreviewSection>
    </Container>
  );
};

export default ProjectMenu; 