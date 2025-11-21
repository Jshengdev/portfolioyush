import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Container2,
  Title,
  ChapterCard,
  ProblemSolutionWrapper,
  ProblemBox,
  SolutionBox,
  SideBySideWrapper,
  TextColumn,
  ImageColumn,
  GifContainer,
  Bold,
  OverviewBox,
  MetadataPanel,
  MetadataSection,
  MetadataLabel,
  MetadataValue
} from "../sharedStyles";
import NextProject from '../NextProject';
import { projectParty } from "../../data/projectname.jsx";

const Left = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  overflow-y: auto;
  margin-right: 20px;
  margin-top: 20px;
`;

const Right = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(20, 20, 20, 0.3);
  overflow-y: auto; 
  padding: 0px;
  backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px); 
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: white;
  text-align: center;
  font-family: 'Work Sans', sans-serif;

  h1, h2, h3, h4 {
    font-family: 'Ade', sans-serif;
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: 2rem;
    letter-spacing: 2px;
  }

  h1 { font-size: 2rem; line-height: 1.2; }
  h2 { font-size: 1.6rem; }
  h3 { font-size: 1.4rem; }
  h4 { font-size: 1.2rem; }

  p {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 6rem;
    font-weight: 100;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    h1, h2, h3, h4 {
      margin-top: 0;
    }
    h1 { font-size: 1.6rem; }
    h2 { font-size: 1.4rem; }
    h3 { font-size: 1.2rem; }
    p { 
      font-size: 14px;
      margin-bottom: 4rem;
      font-weight: 100;
    }
  }

  @media (max-width: 480px) {
    h1 { font-size: 1.4rem; }
    h2 { font-size: 1.2rem; }
    p { 
      font-size: 13px;
      font-weight: 100;
    }
  }
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 6rem;
  padding-top: 2rem;
`;

const HeroTitle = styled.h1`
  font-family: 'Ade', sans-serif;
  font-size: 3.5rem;
  color: white;
  margin-bottom: 4rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.1), 0 0 20px rgba(136, 169, 215, 0.2);
  transition: all 0.4s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 40px rgba(255, 255, 255, 0.15), 0 0 30px rgba(136, 169, 215, 0.3);
  }

  iframe {
    width: 100%;
    height: 450px;
    border: none;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    iframe {
      height: 350px;
    }
  }

  @media (max-width: 480px) {
    iframe {
      height: 250px;
    }
  }
`;

const SideBySideSection = ({ 
  title, 
  text, 
  image, 
  imageGroup, 
  gif, 
  maxWidth, 
  stackedMaxWidth,
  gifMaxWidth,
  gifBorderRadius,
  gifImageBorderRadius,
  gifCaption,
  imageGroupStyle,
  imageStyle
}) => (
  <SideBySideWrapper style={{ marginBottom: '8rem' }}>
    <TextColumn style={{ marginTop: '2rem' }}>
      <h2 style={{ marginBottom: '2rem' }}>{title}</h2>
      <div style={{ 
        whiteSpace: 'pre-line',
        fontFamily: 'var(--font-body)',
        fontSize: '0.95rem',
        lineHeight: '1.6',
        color: 'var(--paragraph-color)',
        animation: 'fadeUp 0.8s ease forwards',
        fontWeight: 200
      }}>
        {text}
      </div>
    </TextColumn>
    <ImageColumn maxWidth={maxWidth} stackedMaxWidth={stackedMaxWidth}>
      {gif && (
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <GifContainer 
            maxWidth={gifMaxWidth}
            borderRadius={gifBorderRadius}
            imageBorderRadius={gifImageBorderRadius}
          >
            <img src={gif} alt={title} />
          </GifContainer>
          {gifCaption && (
            <p style={{ 
              marginTop: '1rem',
              fontSize: '0.8rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontStyle: 'italic',
              textAlign: 'center',
              maxWidth: gifMaxWidth,
              marginLeft: 'auto',
              marginRight: 'auto',
              fontWeight: 200
            }}>
              {gifCaption}
            </p>
          )}
        </div>
      )}
      {image && !gif && <img src={image} alt={title} />}
      {imageGroup && (
        <div className="stacked" style={imageGroupStyle}>
          {imageGroup.map((src, idx) => (
            <img key={idx} src={src} alt={`${title} ${idx + 1}`} style={imageStyle} />
          ))}
        </div>
      )}
    </ImageColumn>
  </SideBySideWrapper>
);

const Grove = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => navigate("/");

  // Find the current project index and get next project
  const currentIndex = projectParty.findIndex(p => p.title === "Grove");
  const nextProject = currentIndex >= 0 && currentIndex < projectParty.length - 1 ? projectParty[currentIndex + 1] : null;

  return (
    <Container>
      <Left>
        <Title onClick={handleHomeClick}>{'<'}home{'>'}</Title>
      </Left>
      <Right>
        <ContentContainer>
          <HeroSection>
            <HeroTitle>GROVE</HeroTitle>
            <MetadataPanel>
              <MetadataSection>
                <MetadataLabel>Role:</MetadataLabel>
                <MetadataValue>Personal Project</MetadataValue>
              </MetadataSection>
              <MetadataSection>
                <MetadataLabel>Timeline:</MetadataLabel>
                <MetadataValue>2024</MetadataValue>
              </MetadataSection>
              <MetadataSection>
                <MetadataLabel>Skills:</MetadataLabel>
                <MetadataValue>UI/UX, Figma</MetadataValue>
              </MetadataSection>
            </MetadataPanel>
            <VideoContainer>
              <iframe 
                src="https://www.youtube.com/embed/Dyqf3vj1LmU?autoplay=0&rel=0" 
                title="Grove Project Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </VideoContainer>
          </HeroSection>

          <OverviewBox>
            <h2>Building a community platform that connects people through shared interests</h2>
            <p>
              Grove emerged from the need to create meaningful connections while building projects. 
              I focused on creating an experience that felt both personal and scalable, 
              balancing the intimacy of small communities with the potential for growth. The project challenged 
              me to think deeply about how digital spaces can foster genuine human connection while visualizing progress through a uniquely generated tree avatars. 
            </p>
          </OverviewBox>
          <ProblemSolutionWrapper>
            <ProblemBox>
              <h2>Problem</h2>
              <p>
                <Bold>72% </Bold>of generalists say they lack direction in skill growth with half never seeing the fruits fo their labor.
                Most learning systems are built for <Bold>efficiency</Bold> or <Bold>specialists</Bold>.
                I didn't need more courses — I needed a way to find the right people to build with.
              </p>
            </ProblemBox>
            <SolutionBox>
              <h2>Solution</h2>
              <p>
                <Bold>Grove</Bold> is an onboarding experience designed to connect people with <Bold>complementary collaborators-- </Bold> It turns creative projects into personal growth journeys.
                A learning system built for <Bold>alignment</Bold>, planting a grove of diverse creatives.
              </p>
            </SolutionBox>
          </ProblemSolutionWrapper>

          <SideBySideSection
            title="THE SEED"
            text={`Every great forest begins with a single seed.

            But at its root, there's something deeper:

            Why do most platforms ask who you are—before helping you figure that out for yourself?  
            And how might we design for the ones who don't fit cleanly into boxes, but still crave connection?`}
            image="/assets/GROVE/seednobackgorund.png"
            maxWidth="350px"
          />

          <SideBySideSection
            title="Just How do i create connections?"
            text={`What are the right questions to ask to really understand someone?
            The wireframes were the first interations to the the most important step, visualizing just who are you?`}
            imageGroup={[
              "/assets/GROVE/Grove-v1.png",
              "/assets/GROVE/Grove-reference.png",
              "/assets/GROVE/FullProgress.png"
            ]}
            stackedMaxWidth="100%"
          />

          <SideBySideSection
            title="YOU GROW LIKE A TREE"
            text={`Most creatives struggle to find a single term to describe themselves, so I wanted that answer to grow overtime.
            Onboarding should feel like a personality test that reflects what drive your curiosity more than anything.

            Each answer shapes your tree:

            Your seed is your start.
            Your biome is your direction.
            Your bark is your past.
            Your fruit is your passion.

            The more you respond, the more your tree evolves — a soft, visual way to see who you're becoming.
            With a tree unique to you, people like visualizations of their progress.
            It's personal, reflective, and honestly… cool.`}
            gif="/assets/GROVE/Grove-onboarding.gif"
            gifMaxWidth="300px"
            gifBorderRadius="48px"
            gifImageBorderRadius="12px"
            gifCaption="[1] Grove Onboarding"
          />

          <SideBySideSection
            title="THE FOREST FINDS YOU"
            text={`How might we design a matching system that reflects how creativity actually grows-- nonlinearly like branches on a tree.

Most platforms sort people by what they do, Grove focuses on why they do it and rewards complementarity.
I wanted people to find each other based on what kind of projects move them. Not just what skills they offer.

everyone has a unique biome that have been adapted to through experiences.
Your tree isn't a profile — it's your story.

Your tree reflects how you move through the world.
and because connection is built on people, not profiles, every choice is a quiet opening to whole new environmenets`}
            gif="/assets/GROVE/Grove-matching.gif"
            gifMaxWidth="300px"
            gifBorderRadius="48px"
            gifImageBorderRadius="12px"
            gifCaption="[2] Grove Matching"
          />

          <SideBySideSection
            title="PROGRESS you can see"
            text={`How can we naturally visualize your progress?

              While traditionaly gamifcation comes with tracking points or badges, Grove is designed to encourage breadth and reward depth
              Your tree will respond visuallyto how you create, connect, and reflect. 

              Wide branching canopy? You've touched a lot.

Deep roots? You've gone hard on something.

Crooked growth? you've reached out of your comfort zone.

              Building on shared rituals, collaborative sprints and even failed projects will make your grove feel more and more like yours.
Tasks become fruit. Collaborators become branches.
What you grow is visible and every effort leaves a mark.`}
            gif="/assets/GROVE/Grove-gamification.gif"
            gifMaxWidth="300px"
            gifBorderRadius="48px"
            gifImageBorderRadius="12px"
            gifCaption="[3] Grove Gamification"
          />

          <SideBySideSection
            title="THE GROVE"
            text={`A social project building community designed around how real connection happens.

As you collaborate and create, your network becomes a reflection of your path.

For the ones who grow by following a gut feeling and your every interation creates a pattern unique to you.
as a living network, you dont need to annouce who you are because you'll wander through forests of potential instead of scrolling through profiles.`}
            gif="/assets/GROVE/Grove-grove.gif"
            gifMaxWidth="300px"
            gifBorderRadius="48px"
            gifImageBorderRadius="12px"
            gifCaption="[4] The Grove"
          />

          <ChapterCard>
            <h2>REFLECTIONS</h2>
            <p>Grove was started as personal project to understand myself and ideate a solution for people like myself-- lateral thinkers, who grow through expereinces.
              And just like how any tree grows and branches out, I realized it was more of a way to connect with people at its roots. From a onboarding experience you watch grow, 
              to a social network designed around diversity and constantly looking for connections in overlooked spaces.</p>

            <p><strong>People don't thrive because they specialize. They thrive because they connect.</strong></p>
            <h3>WHAT'S NEXT?</h3>
            <p>Next, I'd love to bring Grove into a space where this kind of collective growth is already happening.
Not to replace the community — but to help it see itself. Something along the lines of growing my own grove whereever that may be.  </p>
          </ChapterCard>
        </ContentContainer>
        {nextProject && <NextProject currentProject={projectParty[currentIndex]} nextProject={nextProject} />}
      </Right>
    </Container>
  );
};

export default Grove;