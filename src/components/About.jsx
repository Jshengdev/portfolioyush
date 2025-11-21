import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { Title, Container2 } from './sharedStyles';

const Section = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  flex: 4;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 60px;
`;

const Right = styled.div`
  display: flex;
  flex: 5;
  align-items: center;
  position: relative;
  right: -55%;
  top: 10%;
`;

const Aboutme = styled.div`
  position: absolute;
  color: rgba(255, 255, 255, 0.7);
  padding: 100px;
  top: 35%;
  font-size: 16px;
  font-family: 'ade';
  letter-spacing: 2px;
  line-height: 1.8;
  border-radius: 10px;
  max-width: 800px;
  transform: translateY(-50%);
`;

const About = () => {
  const navigate = useNavigate();

  const handleHeroClick = () => {
    navigate('/');
  };

  return (
    <Section>
      <Container2>
        <Title onClick={handleHeroClick}>johnny sheng's about</Title>
      </Container2>
      <Container>
        <Right>
          <Aboutme>
            When they ask about what i do, I have many passions — somewhere between solo backpacking through Indonesian rainforests, ideating media content, coding at hackathons or just building a network at USC.
            <br /><br />
            I've always kinda stitched together a bunch of different obsessions while figuring things out in the moment.
            <br /><br />
            And i guess now, i have a museum of failures, an archive of memories, and the ongoing collection of dad lore I'm saving for my future kids.
            <br /><br />
            Right now, I'm obsessed with documenting the growth of my life, developing the website of my dreams, and bringing others along for the ride.
          </Aboutme>
        </Right>
      </Container>
    </Section>
  );
};

export default About;
