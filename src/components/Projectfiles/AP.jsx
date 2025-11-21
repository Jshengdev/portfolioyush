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

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
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
  imageStyles,
  containerStyle
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
        <div className="stacked" style={containerStyle}>
          {imageGroup.map((src, idx) => (
            <img key={idx} src={src} alt={`${title} ${idx + 1}`} style={imageStyles && imageStyles[idx]} />
          ))}
        </div>
      )}
    </ImageColumn>
  </SideBySideWrapper>
);

const AP = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => navigate("/");

  // Find the current project index and get next project
  const currentIndex = projectParty.findIndex(p => p.title === "Alaina Pamela");
  const nextProject = currentIndex >= 0 && currentIndex < projectParty.length - 1 ? projectParty[currentIndex + 1] : null;

  return (
    <Container>
      <Left>
        <Title onClick={handleHomeClick}>{'<'}home{'>'}</Title>
      </Left>
      <Right>
        <ContentContainer>
          <HeroSection>
            <HeroTitle>ALAINA PAMELA</HeroTitle>
            <MetadataPanel>
              <MetadataSection>
                <MetadataLabel>Role:</MetadataLabel>
                <MetadataValue>Director of Photography & Production Intern</MetadataValue>
              </MetadataSection>
              <MetadataSection>
                <MetadataLabel>Timeline:</MetadataLabel>
                <MetadataValue>2025</MetadataValue>
              </MetadataSection>
              <MetadataSection>
                <MetadataLabel>Skills:</MetadataLabel>
                <MetadataValue>Cinematography</MetadataValue>
              </MetadataSection>
            </MetadataPanel>
            <VideoGrid>
              <VideoWrapper>
                <iframe
                  src="https://www.youtube.com/embed/VUj64OmN5yw"
                  title="First Music Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </VideoWrapper>
              <VideoWrapper>
                <iframe
                  src="https://www.youtube.com/embed/KRmews63T3Q"
                  title="Second Music Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </VideoWrapper>
            </VideoGrid>
          </HeroSection>

          <OverviewBox>
            <h2 className="title">Project Overview</h2>
            <p className="overview">
              Documenting my experience as a Director of Photography intern for Alaina Pamela. From technical execution to creative direction. it open the field of cinematography for me.
            </p>
          </OverviewBox>

          <ProblemSolutionWrapper>
            <ProblemBox>
              <h2>Challenge</h2>
              <p>
                Stepping into high-production music sets— gaining high agency and figuring out how to contribute
                meaningfully as both a DP intern and creative collaborator.
              </p>
            </ProblemBox>
            <SolutionBox>
              <h2>Approach</h2>
              <p>
                I leaned on intuition, technical trial-and-error, and trust. From lighting moody scenes to directing BTS
                trailers, I treated every moment as a chance to build a visual language from the ground up.
              </p>
            </SolutionBox>
          </ProblemSolutionWrapper>


          <SideBySideSection
            title="ACT I — Let There Be Light"
            text={`I was lighting scenes, manning the camera, and trying to understand the creative direction.
Small team meant more freedom — most of what I learned came from experimenting.`}
            imageGroup={[
              "/assets/AP/AP-bts1.png",
              "/assets/AP/AP-bts2.png"
            ]}
            maxWidth="100%"
            stackedMaxWidth="100%"
            imageStyles={[
              { width: '100%', display: 'block', marginBottom: '1rem' },
              { width: '100%', display: 'block', marginBottom: '1rem' },
            ]}
            containerStyle={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '1rem'
            }}
          />

          <SideBySideSection
            title="ACT II — Creative Direction"
            text={`I directed and filmed BTS trailers for music video shoots, with full control over lighting and visual tone. 
              Working with fog, diffusers, and colored LEDs, I learned how to light for emotion and these moments helped me shift from technician to storyteller`}
            imageGroup={[
              "/assets/AP/AP-sample1.gif",
              "/assets/AP/AP-sample3.gif"
            ]}
            maxWidth="100%"
            stackedMaxWidth="100%"
            imageStyles={[
              { width: '60%', display: 'block', marginBottom: '1rem' },
              { width: '60%', display: 'block', marginBottom: '1rem' },
            ]}
            containerStyle={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '1rem'
            }}
          />

          <SideBySideSection
            title="ACT III — The Space Between"
            text={`Thesis of my working style.

What I really learned is that I live somewhere between technical execution and creative intention.
On higher-budget shoots, 
I stepped into a hybrid role as a gaffer and production assistant. 

I handled lighting rigs, adjusted little details, and suggested visual effects that shaped the final look. Even in fast-paced environments, I found space to contribute creatively gain experience.`}
            gif="/assets/AP/AP-BTSsample2.gif"
            gifCaption="Technical execution meets creative vision"
            gifMaxWidth="60%"
            gifBorderRadius="12px"
            gifImageBorderRadius="12px"
          />

          <ChapterCard>
            <h2>REFLECTIONS</h2>
            <p>From the start, the chaotic nature of this type of work was honestly what made it great. No real rules, just a small team figuring things out.
              I learned more through trial and error and while many times i was doing roles all over the place, i was able to find my own space.
            </p>
          </ChapterCard>
        </ContentContainer>
        {nextProject && <NextProject currentProject={projectParty[currentIndex]} nextProject={nextProject} />}
      </Right>
    </Container>
  );
};

export default AP; 