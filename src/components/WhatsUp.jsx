import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.colors.background.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 9999;
`;

const VideoContainer = styled(motion.div)`
  width: 100%;
  max-width: 850px;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.4);
  border: 1px solid ${props => props.theme.colors.border.subtle};
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const YouTubeEmbed = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 60px;
  width: 100%;
  max-width: 650px;
`;

const Title = styled(motion.h1)`
  font-family: ${props => props.theme.fonts.display};
  font-size: clamp(1.2rem, 3.5vw, 2.5rem);
  color: ${props => props.theme.colors.text.primary};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 8px;
  margin: 0;
  line-height: 1.4;
  font-weight: 200;
`;

const DescriptionBox = styled(motion.div)`
  padding: 40px;
  background-color: ${props => props.theme.colors.background.secondary};
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const Description = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.text.secondary};
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: center;
  margin: 0;
  font-weight: 300;
`;

const WhatsUp = () => {
  // YouTube video ID: MtCWD0mtCsg
  const youtubeId = "MtCWD0mtCsg";
  
  return (
    <Container>
      <VideoContainer
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <YouTubeEmbed
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&loop=1&playlist=${youtubeId}&modestbranding=1&rel=0`}
          title="my cute IOT tomagatchi friend"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </VideoContainer>

      <ContentWrapper>
        <Title
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          my cute IOT tomagatchi friend
        </Title>

        <DescriptionBox
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Description>
            This is a standalone experience dedicated to my IOT Tomagatchi project. 
            Stay tuned for more updates on this cute digital companion!
          </Description>
        </DescriptionBox>
      </ContentWrapper>
    </Container>
  );
};

export default WhatsUp;

