import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

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

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  
`;

const Container2 = styled.div`
  position: fixed;
  width: 100%;
  left: 45px;
  top: 50px;
`;

const Title = styled.h1`
  font-family: "work sans";
  font-weight: 300;
  font-size: 36px;
  transform: translateX(15px);
  transform-origin: 0 0;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.7);
  transition: transform 0.5s, color 0.3s ease-in-out;
  &:hover {
    transform: scale(1.01);
    color: white;
  }
`;

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Projects = () => {
  const navigate = useNavigate();

  const projectParty = [ //later use a backend database maybe
    { title: "Grove", description: "WIP" },
    { title: "Capsule Machine", description: "WIP" },
    { title: "Lens Studio (ABC)", description: "WIP" },
    { title: "Mindset APES", description: "WIP" },
    { title: "Fashion Design", description: "WIP" },
    { title: "Travels", description: "my cinematic video adventures coming soon" },
    { title: "Film", description: "coming soon. - mouseparty4949" },
    { title: "Coming soon", description: "Art" },
  ];

  const handleHeroClick = () => {
    navigate("/");
  };

  const handleProjectClick = (projectTitle) => {
    const formattedTitle = projectTitle.replace(/\s+/g, ""); 
    navigate(`/projects/${formattedTitle}`);
  };

  return (
    <Section>
      <Container>
        <Left>
          <ProjectList>
            {projectParty.map((project, index) => (
              <ProjectItem
                key={(index)}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: .1 }}
                onClick={() => handleProjectClick(project.title)} 
              >
                <span className="project-title">{project.title}</span>
                <span className="project-description">{project.description}</span>
              </ProjectItem>
            ))}
          </ProjectList>
        </Left>
        <Right />
        <Container2>
          <Title onClick={handleHeroClick}>johnny sheng's projects</Title>
        </Container2>
      </Container>
    </Section>
  );
};

export default Projects;
