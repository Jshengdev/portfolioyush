import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Container2,
  Title,
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

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  width: 100%;
  max-width: 1600px;
  margin: 2rem auto;
  padding: 0;
`;

const GalleryItem = styled.div`
  position: relative;
  width: 100%;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  border-radius: 0;
  overflow: hidden;
  box-shadow: none;
  transition: all 0.4s ease;

  &:hover {
    transform: scale(1.02);
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const Caption = styled.div`
  position: relative;
  width: 100%;
  text-align: left;
  padding: 1rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Work Sans', sans-serif;
  font-weight: 300;
  line-height: 1.4;
  margin-top: 1rem;
`;

const GalleryTitle = styled.h2`
  text-align: left;
  margin-bottom: 6rem;
  margin-top: 6rem;
  padding-top: 6rem;
  font-family: 'Ade', sans-serif;
  font-size: 2rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const GalleryTitleRight = styled.h2`
  text-align: right;
  margin-bottom: 6rem;
  margin-top: 6rem;
  padding-top: 6rem;
  font-family: 'Ade', sans-serif;
  font-size: 2rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  margin-left: 1rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  border-radius: 0;
  overflow: hidden;
  box-shadow: none;
  transition: all 0.4s ease;

  &:hover {
    transform: scale(1.02);
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageGridFive = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 100%;
  margin-left: 1rem;
  gap: 1rem;
`;

const ImageGridThree = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  margin-left: 1rem;
  gap: 1rem;
`;

const TravelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  width: 100%;
  max-width: 1600px;
  margin: 2rem auto;
  gap: 1rem;
`;

const TravelTitle = styled.h2`
  text-align: center;
  margin-bottom: 6rem;
  margin-top: 6rem;
  padding-top: 6rem;
  font-family: 'Ade', sans-serif;
  font-size: 2.5rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Blurb = styled.p`
  font-family: 'Work Sans', sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 4rem;
  max-width: 800px;
`;

const Collection = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => navigate("/");

  // Find the current project index and get next project
  const currentIndex = projectParty.findIndex(p => p.title === "Collection");
  const nextProject = currentIndex >= 0 && currentIndex < projectParty.length - 1 ? projectParty[currentIndex + 1] : null;

  return (
    <Container>
      <Left>
        <Title onClick={handleHomeClick}>{'<'}home{'>'}</Title>
      </Left>
      <Right>
        <ContentContainer>
          <HeroSection>
            <HeroTitle>COLLECTION</HeroTitle>
            <MetadataPanel>
              <MetadataSection>
                <MetadataLabel>Role:</MetadataLabel>
                <MetadataValue>Director</MetadataValue>
              </MetadataSection>
              <MetadataSection>
                <MetadataLabel>Timeline:</MetadataLabel>
                <MetadataValue>2024</MetadataValue>
              </MetadataSection>
              <MetadataSection>
                <MetadataLabel>Skills:</MetadataLabel>
                <MetadataValue>Cinematography, Editing</MetadataValue>
              </MetadataSection>
            </MetadataPanel>
          </HeroSection>

          <OverviewBox>
            <h2>Look through my lens</h2>
            <p>
              A curated selection of my film work, showcasing various projects and creative explorations.
              Each piece represents a unique journey in storytelling and visual expression.
            </p>
          </OverviewBox>

          <GalleryTitle>Selected Works</GalleryTitle>
          <GalleryGrid>
            <GalleryItem>
              <VideoWrapper>
                <iframe
                  src="https://www.youtube.com/embed/6ECQqjWx82U"
                  title="Horror Short Film"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </VideoWrapper>
              <Caption>
                Silent Short Film<br />
                Individual work with a creative concept and use of harsh and dark lighting.
              </Caption>
            </GalleryItem>
            <GalleryItem>
              <ImageGrid>
                <ImageWrapper>
                  <img src="/assets/C/C-f6.png" alt="Film still 1" />
                </ImageWrapper>
                <ImageWrapper>
                  <img src="/assets/C/C-f2.png" alt="Film still 2" />
                </ImageWrapper>
                <ImageWrapper>
                  <img src="/assets/C/C-f4.png" alt="Film still 3" />
                </ImageWrapper>
                <ImageWrapper>
                  <img src="/assets/C/C-f3.png" alt="Film still 4" />
                </ImageWrapper>
                <ImageWrapper>
                  <img src="/assets/C/C-f7.png" alt="Film still 5" />
                </ImageWrapper>
                <ImageWrapper>
                  <img src="/assets/C/C-f5.png" alt="Film still 6" />
                </ImageWrapper>
              </ImageGrid>
            </GalleryItem>
          </GalleryGrid>

          <GalleryTitle>-</GalleryTitle>
          <GalleryGrid>
            <GalleryItem>
              <VideoWrapper>
                <iframe
                  src="https://www.youtube.com/embed/wjOG0EY_ey8?si=i6kwbvhEa8kW14j4" 
                  title="Project Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </VideoWrapper>
              <Caption>
                Horror Short Film<br />
                Simple little project. Solo production from start to finish.
              </Caption>
            </GalleryItem>
            <GalleryItem>
              <ImageGridFive>
                <ImageWrapper>
                  <img src="/assets/C/EF1.png" alt="Project still 1" />
                </ImageWrapper>
                <ImageWrapper>
                  <img src="/assets/C/EF2.png" alt="Project still 2" />
                </ImageWrapper>
                <ImageWrapper>
                  <img src="/assets/C/EF3.png" alt="Project still 3" />
                </ImageWrapper>
                <ImageWrapper>
                  <img src="/assets/C/EF4.png" alt="Project still 4" />
                </ImageWrapper>
              </ImageGridFive>
            </GalleryItem>
          </GalleryGrid>

          <GalleryTitle>Solo Travel Cinematics</GalleryTitle>
          <Blurb>
            {"Solo traveled to japan, vietnam, indonesia, malaysia, and singapore"}
          </Blurb>
          <TravelGrid>
            <ImageWrapper>
              <img src="/assets/C/C1.png" alt="Travel still 1" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C2.png" alt="Travel still 2" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C3.png" alt="Travel still 3" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C4.png" alt="Travel still 4" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C5.png" alt="Travel still 5" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C6.png" alt="Travel still 6" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C7.png" alt="Travel still 7" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C8.png" alt="Travel still 8" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C9.png" alt="Travel still 9" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C10.png" alt="Travel still 10" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C11.png" alt="Travel still 11" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C12.png" alt="Travel still 12" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C13.png" alt="Travel still 13" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C14.png" alt="Travel still 14" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C15.png" alt="Travel still 15" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C16.png" alt="Travel still 16" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C17.png" alt="Travel still 17" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C18.png" alt="Travel still 18" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C19.png" alt="Travel still 19" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C20.png" alt="Travel still 20" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C21.png" alt="Travel still 21" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C22.png" alt="Travel still 22" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C23.png" alt="Travel still 23" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C24.png" alt="Travel still 24" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C25.png" alt="Travel still 25" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C26.png" alt="Travel still 26" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C27.png" alt="Travel still 27" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/C28.png" alt="Travel still 28" />
            </ImageWrapper>
          </TravelGrid>

          <GalleryTitle>Clothing Stills</GalleryTitle>
          <ImageGridThree>
            <ImageWrapper>
              <img src="/assets/C/F1.png" alt="Still 1" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/F2.png" alt="Still 2" />
            </ImageWrapper>
            <ImageWrapper>
              <img src="/assets/C/F3.png" alt="Still 3" />
            </ImageWrapper>
          </ImageGridThree>
        </ContentContainer>
        {nextProject && <NextProject currentProject={projectParty[currentIndex]} nextProject={nextProject} />}
      </Right>
    </Container>
  );
};

export default Collection; 