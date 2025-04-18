import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { 
  Container2, 
  Title, 
  ChapterCard, 
  ProblemSolutionWrapper, 
  ProblemBox, 
  SolutionBox,
  SideBySideWrapper,
  TextColumn,
  ImageColumn,
  GifContainer
} from "../sharedStyles";
import NextProject from '../NextProject';
import { projectParty } from "../../data/projectname.jsx";

const Container = styled.div`
  display: grid;
  grid-template-columns: 10% 92%;
  width: 100%;
  height: 100vh; 
`;

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
    }
  }

  @media (max-width: 480px) {
    h1 { font-size: 1.4rem; }
    h2 { font-size: 1.2rem; }
    p { font-size: 13px; }
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

const MetadataPanel = styled.div`
  position: relative;
  margin: 2rem auto;
  max-width: 600px;
  border-radius: 50px;
  padding: 0.8rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;

const MetadataSection = styled.div`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const MetadataLabel = styled.span`
  font-weight: 300;
  margin-right: 0.5rem;
  color: rgba(255, 255, 255, 0.5);
`;

const MetadataValue = styled.span`
  font-weight: 400;
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
  gifCaption
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
        <div className="stacked">
          {imageGroup.map((src, idx) => (
            <img key={idx} src={src} alt={`${title} ${idx + 1}`} />
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
        <Title onClick={handleHomeClick}>{'<'}1/24/25{'>'}</Title>
        <Title>WORK</Title>
        <Title>IN</Title> 
        <Title>PROGRESS</Title>
      </Left>
      <Right>
        <ContentContainer>
          <HeroSection>
            <HeroTitle>GROVE: AI-POWERED PROJECT MATCHING</HeroTitle>
            <MetadataPanel>
              <MetadataSection>
                <MetadataLabel>Role:</MetadataLabel>
                <MetadataValue>Personal</MetadataValue>
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

          <ProblemSolutionWrapper>
            <ProblemBox>
              <h2>Problem</h2>
              <p>72% of generalists say they lack direction in skill growth.
              Most learning systems are built for specialists—not for people who do a bit of everything.</p>
            </ProblemBox>
            <SolutionBox>
              <h2>Solution</h2>
              <p>Grove is a gamified platform that matches generalists by complementary skills and turns projects into growth journeys. It helps people learn by doing—while building a creative, collaborative community.</p>
            </SolutionBox>
          </ProblemSolutionWrapper>

          <SideBySideSection
            title="ACT I — RESEARCH"
            text="Most platforms reward depth. Grove rewards range—matching generalists through gamified prompts and shared goals to turn exploration into momentum."
            image="/assets/GROVE/FullProgress.png"
            maxWidth="1000px"
          />

          <SideBySideSection
            title="ACT II - What if you could grow like a tree?"
            text="First: Who are you?
Your answers shape the seed — your starting point. Everyone begins differently.

Then: what motivates you? This forms your biome — not where you are, but where you're headed.

Next: your current skills and projects become your bark — the structure you've already built.

Finally: your interests become the fruit — because what you care about always finds a way to show up in what you create.

By the end:
You're planting a version of yourself — and watching how it grows."
            gif="/assets/GROVE/Grove-onboarding.gif"
            gifMaxWidth="300px"
            gifBorderRadius="48px"
            gifImageBorderRadius="12px"
            gifCaption="[1] Grove Onboarding"
          />

          <SideBySideSection
            title="ACT III — COMMUNITY"
            text="A single tree can survive —
but it can thrive when it's part of something bigger.

Our match system takes your profile — and finds others who complement you.

Because the best forests aren't made of the same kind of tree.
They're built on diversity — different roots, different needs, different strengths.
And when those trees grow together, they support each other. They build ecosystems.

This is how I imagine Grove to plant the seeds for a community:
By designing for biodiversity.
By connecting you with collaborators who help you grow — and who grow because of you."
            gif="/assets/GROVE/Grove-matching.gif"
            gifMaxWidth="300px"
            gifBorderRadius="48px"
            gifImageBorderRadius="12px"
            gifCaption="[2] Grove Matching"
          />

          <SideBySideSection
            title="ACT IV — GAMIFICATION"
            text="Growth isn't just measured in tasks—it's in seeds you collect through completing projects and learning.

Each project you complete plants a new seed — shaping your tree's branches and bearing new fruit.
With every collaboration, your tree evolves — each experience leaving a visible mark on how you grow.

Now, it's all about watching your tree grow in ways that mirrors your creative journey."
            gif="/assets/GROVE/Grove-gamification.gif"
            gifMaxWidth="300px"
            gifBorderRadius="48px"
            gifImageBorderRadius="12px"
            gifCaption="[3] Grove Gamification"
          />

          <SideBySideSection
            title="ACT V — THE GROVE"
            text="As you complete projects and collaborate, your friends or The people you've really enjoyed working with are added to your personal Grove — Over time, it becomes a reflection of your growth network:
a garden of projects, collaborators, and ideas you've cultivated along the way.
This Grove isn't just a summary of progress —
it's your creative ecosystem, rooted in shared moments,
growing together, season after season."
            gif="/assets/GROVE/Grove-grove.gif"
            gifMaxWidth="300px"
            gifBorderRadius="48px"
            gifImageBorderRadius="12px"
            gifCaption="[4] The Grove"
          />

          <ChapterCard>
            <h2>REFLECTIONS</h2>
            <p>Grove started as a creative experiment but became a real way to rethink learning.</p>
            <p>I learned that people thrive <strong>through collaboration</strong>, and that gamifying skill growth makes the process more <strong>organic and rewarding</strong>. More than anything, this project reinforced that AI should be a <strong>tool for creativity, not a replacement for it.</strong></p>
            
            <h3>What's Next?</h3>
            <p>Expanding AI matching for mentorship, refining project recommendations, and maybe even turning Grove into a <strong>real prototype</strong>.</p>
          </ChapterCard>
        </ContentContainer>
        {nextProject && <NextProject currentProject={projectParty[currentIndex]} nextProject={nextProject} />}
      </Right>
    </Container>
  );
};

export default Grove;