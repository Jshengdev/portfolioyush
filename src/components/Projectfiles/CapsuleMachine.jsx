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
  GifContainer,
  OverviewBox,
  MetadataPanel,
  MetadataSection,
  MetadataLabel,
  MetadataValue
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

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  margin: 2rem 0;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ImageCard = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;

  ${ImageCard}:hover & {
    transform: scale(1.05);
  }
`;

const CaptionBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  padding: 12px;
  color: white;
  font-family: 'Work Sans', sans-serif;
  font-size: 0.9rem;
  line-height: 1.4;
  transform: translateY(100%);
  transition: transform 0.3s ease;

  ${ImageCard}:hover & {
    transform: translateY(0);
  }
`;

const CapsuleMachine = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => navigate("/");

  // Find the current project index and get next project
  const currentIndex = projectParty.findIndex(p => p.title === "Capsule Machine");
  const nextProject = currentIndex >= 0 && currentIndex < projectParty.length - 1 ? projectParty[currentIndex + 1] : null;

  return (
    <Container>
      <Left>
        <Title onClick={handleHomeClick}>{'<'}home{'>'}</Title>
      </Left>
      <Right>
        <ContentContainer>
          <HeroSection>
            <HeroTitle>CAPSULE MACHINE</HeroTitle>
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
                <MetadataValue>CAD, Woodworking, Mechanical Design</MetadataValue>
              </MetadataSection>
            </MetadataPanel>
            <VideoContainer>
              <img src="/assets/CM/Capsule machine thumbnail.png" alt="Capsule Machine Thumbnail" style={{ width: '100%', height: 'auto' }} />
            </VideoContainer>
          </HeroSection>

          <OverviewBox>
            <div className="title">Project Overview</div>
            <div className="summary">Creating an interactive installation that blends physical and digital experiences</div>
            <div className="overview">
              The Capsule Machine project represents my exploration into the intersection of physical 
              computing and user experience. Through this interactive installation, I sought to create 
              a tangible connection between users and digital content, using Arduino and custom hardware 
              to transform abstract interactions into physical experiences. The project challenged me to 
              think about how technology can create moments of surprise and delight in physical spaces.
            </div>
          </OverviewBox>

          <ProblemSolutionWrapper>
            <ProblemBox>
              <h2>Challenge</h2>
              <p>I wanted to push my boundaries by learning new skills in mechanical design and fabrication. The goal was to create something tangible that combined my interest in interactive design with practical engineering skills.</p>
            </ProblemBox>
            <SolutionBox>
              <h2>Approach</h2>
              <p>I decided to build a capsule machine from scratch, using it as a vehicle to learn CAD, woodworking, and mechanical design. I sought guidance from experienced makers and documented my learning process along the way.</p>
            </SolutionBox>
          </ProblemSolutionWrapper>

          <SideBySideSection
            title="ACT I — LEARNING CAD"
            text="My journey began with learning Fusion 360 from scratch. I started with simple shapes and gradually worked up to complex mechanical assemblies. Each iteration taught me something new about:
- Parametric design
- Assembly constraints
- Motion studies
- Material considerations

The learning curve was steep, but the satisfaction of seeing my designs come to life was worth it."
            imageGroup={[
              "/assets/CM/gif/CM-frame.gif",
              "/assets/CM/gif/CM-gears.gif",
              "/assets/CM/gif/CM-fullspin.gif"
            ]}
            maxWidth="100%"
            stackedMaxWidth="100%"
          />

          <SideBySideSection
            title="ACT II - WOODWORKING JOURNEY"
            text="From digital designs to physical creation, each step was a lesson in precision and patience. Here's the story of how the Capsule Machine came to life:"
          />

          <ImageGrid>
            <ImageCard>
              <Image src="/assets/CM/CM1.png" alt="Initial Design" loading="lazy" />
              <CaptionBox>Scavenging for scrap wood and using old furniture</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM31.png" alt="Detail Shot" loading="lazy" />
              <CaptionBox>Cleaning up scrap wood</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM30.png" alt="Final Product" loading="lazy" />
              <CaptionBox>Trimming down edges to fight warp</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM29.png" alt="Quality Check" loading="lazy" />
              <CaptionBox>Cleaned up planks</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM28.png" alt="Final Assembly" loading="lazy" />
              <CaptionBox>Wood assortment</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM27.png" alt="Finishing Touches" loading="lazy" />
              <CaptionBox>Glueing scrap wood to create the necessary size piece</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM26.png" alt="Mechanism Test" loading="lazy" />
              <CaptionBox>Sample of glued cutout without cleanup</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM25.png" alt="Gear System" loading="lazy" />
              <CaptionBox>Side panel glued using mismatched wood</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM24.png" alt="Detail Work" loading="lazy" />
              <CaptionBox>Box assembled</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM23.png" alt="Assembly Start" loading="lazy" />
              <CaptionBox>Cleaned panel</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM22.png" alt="First Cuts" loading="lazy" />
              <CaptionBox>Cleaned and cut 45-degree angle bottom piece</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM21.png" alt="Material Selection" loading="lazy" />
              <CaptionBox>Me sanding each panel</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM20.png" alt="Detail Shot" loading="lazy" />
              <CaptionBox>Cleaned bottom piece</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM19.png" alt="Final Product" loading="lazy" />
              <CaptionBox>Secured with pocket screws and plugged and sanded</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM18.png" alt="Quality Check" loading="lazy" />
              <CaptionBox>Side panels cut to 45 degrees</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM17.png" alt="Final Assembly" loading="lazy" />
              <CaptionBox>sample example of assembly</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM16.png" alt="Finishing Touches" loading="lazy" />
              <CaptionBox>Finisher and oil applied</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM15.png" alt="Mechanism Test" loading="lazy" />
              <CaptionBox>applying oil and finish</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM14.png" alt="Gear System" loading="lazy" />
              <CaptionBox>Working thorugh the night</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM13.png" alt="Detail Work" loading="lazy" />
              <CaptionBox>Finished assembly of the box</CaptionBox>
            </ImageCard>
          </ImageGrid>

          <SideBySideSection
            title="ACT III — FINAL ASSEMBLY"
            text="Bringing everything together was the ultimate test:
- Fitting all components together
- Testing and adjusting mechanisms
- Applying finishing touches
- Documenting the process

The final machine represents not just a functional object, but a journey of learning and growth."
            gif="/assets/CapsuleMachine/final-assembly.gif"
            gifMaxWidth="300px"
            gifBorderRadius="48px"
            gifImageBorderRadius="12px"
            gifCaption="[3] Final Assembly Process"
          />

          <ImageGrid>
            <ImageCard>
              <Image src="/assets/CM/CM12.png" alt="Assembly Detail" loading="lazy" />
              <CaptionBox>3D printed components ready for assembly</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM11.png" alt="Assembly Detail" loading="lazy" />
              <CaptionBox>Precision laser-cut frame pieces</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM10.png" alt="Assembly Detail" loading="lazy" />
              <CaptionBox>All components laid out for assembly</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM9.png" alt="Assembly Detail" loading="lazy" />
              <CaptionBox>Frame assembly taking shape</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM8.png" alt="Assembly Detail" loading="lazy" />
              <CaptionBox>Coin mechanism fully constructed</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM7.png" alt="Assembly Detail" loading="lazy" />
              <CaptionBox>Complete mechanism assembly</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM6.png" alt="Assembly Detail" loading="lazy" />
              <CaptionBox>Precision-cut openings in the box</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM5.png" alt="Assembly Detail" loading="lazy" />
              <CaptionBox>Frame integrated into the box</CaptionBox>
            </ImageCard>
            <ImageCard>
              <Image src="/assets/CM/CM4.png" alt="Assembly Detail" loading="lazy" />
              <CaptionBox>The completed capsule machine</CaptionBox>
            </ImageCard>
          </ImageGrid>

          <SideBySideSection
            title="ACT IV — COMMUNITY LEARNING"
            text="This project marked my first deep dive into mechanical design and fabrication. What started as a simple idea evolved through nearly 44 design iterations and countless hours learning CAD from scratch. Each version taught me something new about mechanical systems, material properties, and the importance of precision in design.

The most valuable aspect wasn't just the final product, but the process of learning from those around me. I leaned heavily on the expertise of experienced makers, absorbing their knowledge about:
- Mechanical design principles
- Material selection and properties
- Precision fabrication techniques
- Problem-solving approaches

This collaborative learning experience allowed me to create something completely outside my usual field of expertise. The guidance and feedback from the community transformed what could have been a simple project into a comprehensive learning journey in mechanical design and fabrication."
            gif="/assets/CapsuleMachine/community.gif"
            gifMaxWidth="300px"
            gifBorderRadius="48px"
            gifImageBorderRadius="12px"
            gifCaption="[4] Learning from the Community"
          />

          <ChapterCard>
            <h2>REFLECTIONS</h2>
            <p>This project was more than just building a machine—it was about pushing my boundaries and learning new skills.</p>
            <p>I discovered that <strong>making mistakes is part of the learning process</strong>, and that <strong>asking for help is a strength, not a weakness</strong>. The most valuable lesson was learning to <strong>embrace the iterative nature of design</strong>.</p>
            
            <h3>What's Next?</h3>
            <p>I'm excited to continue developing my fabrication skills and <strong>tackle more complex mechanical projects</strong>. I also want to <strong>share what I've learned</strong> with others starting their own making journeys.</p>
          </ChapterCard>
        </ContentContainer>
        {nextProject && <NextProject currentProject={projectParty[currentIndex]} nextProject={nextProject} />}
      </Right>
    </Container>
  );
};

export default CapsuleMachine;