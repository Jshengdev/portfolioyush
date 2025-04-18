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
        <div className="stacked">
          {imageGroup.map((src, idx) => (
            <img key={idx} src={src} alt={`${title} ${idx + 1}`} style={imageStyles && imageStyles[idx]} />
          ))}
        </div>
      )}
    </ImageColumn>
  </SideBySideWrapper>
);

const Ark = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => navigate("/");

  // Find the current project index and get next project
  const currentIndex = projectParty.findIndex(p => p.title === "Ark");
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
            <HeroTitle>SKINARK: SWEAT SMARTER</HeroTitle>
            <MetadataPanel>
              <MetadataSection>
                <MetadataLabel>Role:</MetadataLabel>
                <MetadataValue>Product Designer</MetadataValue>
              </MetadataSection>
              <MetadataSection>
                <MetadataLabel>Timeline:</MetadataLabel>
                <MetadataValue>2025</MetadataValue>
              </MetadataSection>
              <MetadataSection>
                <MetadataLabel>Skills:</MetadataLabel>
                <MetadataValue>UX Research, Product Design, Systems Thinking</MetadataValue>
              </MetadataSection>
            </MetadataPanel>
            <VideoContainer>
              <img src="/public/assets/Ark/ARK-landing.png" alt="SkinARK Thumbnail" style={{ width: '100%', height: 'auto' }} />
            </VideoContainer>
          </HeroSection>

          <ProblemSolutionWrapper>
            <ProblemBox>
              <h2>Problem</h2>
              <p>Men were skipping skincare after workouts not from laziness, but confusion. The only feedback they received was breakouts days later, and products felt random while routines felt emotional. The real problem wasn't skin - it was clarity.</p>
            </ProblemBox>
            <SolutionBox>
              <h2>Solution</h2>
              <p>We designed a wearable that turns sweat into personalized skincare insights, making skincare as trackable as heart rate. By reframing sweat as data rather than a nuisance, we created a system that provides real-time feedback and actionable recommendations.</p>
            </SolutionBox>
          </ProblemSolutionWrapper>

          <SideBySideSection
            title="ACT I — UNDERSTANDING THE MARKET"
            text="Our research journey began with a deep dive into the skincare market:
- Comprehensive market research and competitive analysis
- User surveys and behavioral studies
- TAM/SAM/SOM analysis for market sizing
- Feasibility study of existing competitors

We discovered that while the skincare market was crowded, there was a significant gap in post-workout skincare solutions, especially for men. This insight led us to reimagine the traditional sweat patch as a skincare tool."
            imageGroup={[
              "/public/assets/Ark/ARK-Marketresearch.png",
              "/public/assets/Ark/ARK-survey.png",
              "/public/assets/Ark/ARK-TAMSAMSOM.png",
              "/public/assets/Ark/ARK-feasibilitycompetititor.png",
              "/public/assets/Ark/ARK-reimaginethesweatpatch.png"
            ]}
            maxWidth="100%"
            stackedMaxWidth="100%"
            imageStyles={[
              { width: '100%', display: 'block', marginBottom: '1rem' },
              { width: '100%', display: 'block', marginBottom: '1rem' },
              { width: '100%', display: 'block', marginBottom: '1rem' },
              { width: '100%', display: 'block', marginBottom: '1rem' },
              { width: '100%', display: 'block' }
            ]}
            containerStyle={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '1rem'
            }}
          />

          <SideBySideSection
            title="ACT II — PRODUCT DESIGN & DEVELOPMENT"
            text="Turning insights into a tangible product:
- Initial product concept and design iterations
- User interface design and experience mapping
- Prototype development and testing

Our goal was to create a product that felt natural during workouts while providing valuable skincare insights."
            imageGroup={[
              "/public/assets/Ark/ARK-product.png",
              "/public/assets/Ark/ARK-UI.png"
            ]}
            maxWidth="100%"
            stackedMaxWidth="100%"
          />

          <SideBySideSection
            title="ACT III — BUILDING THE ECOSYSTEM"
            text="Creating a comprehensive skincare solution:
- Community engagement and feedback loops
- Social media strategy and user education
- Integration with existing skincare routines
- Building trust through transparency

We focused on creating not just a product, but an entire ecosystem that supports users' skincare journey."
            imageGroup={[
              "/public/assets/Ark/ARK-community and ecosystem.png",
              "/public/assets/Ark/ARK-Socialmedia.png"
            ]}
            maxWidth="100%"
            stackedMaxWidth="100%"
            imageStyles={[
              { width: '100%' },
              { width: '50%', margin: '0 auto' }
            ]}
          />

          <SideBySideSection
            title="ACT IV — BRAND IDENTITY"
            text="Establishing a strong brand presence:
- Logo design and visual identity
- Brand messaging and positioning
- Target audience communication
- Market differentiation

We crafted a brand that speaks to both skincare enthusiasts and fitness-focused individuals, bridging the gap between these two worlds."
            imageGroup={[
              "/public/assets/Ark/ARK-logo.png"
            ]}
            maxWidth="100%"
            stackedMaxWidth="100%"
          />

          <ChapterCard>
            <h2>REFLECTIONS</h2>
            <p>SkinARK taught me that good design isn't just about the product — it's about creating a new kind of conversation. When we stop treating skincare like self-care and start treating it like training, we empower a whole new kind of user to care.</p>
            
            <h3>Key Learnings</h3>
            <p>• Design can transform emotional experiences into trackable metrics<br/>
            • Cultural context matters in product design<br/>
            • Systems thinking creates more than products — it creates new behaviors</p>
          </ChapterCard>
        </ContentContainer>
        {nextProject && <NextProject currentProject={projectParty[currentIndex]} nextProject={nextProject} />}
      </Right>
    </Container>
  );
};

export default Ark; 