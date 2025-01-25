import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

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

const Container2 = styled.div`
  position: fixed;
  width: 100%;
  left: 45px;
  top: 50px;
`;

const Title = styled.h1`
    font-family: 'work sans';
    font-weight: 300;
    font-size: 36px;
    transform: translateX(15px);
    letter-spacing: 2px;
    transform-origin: 0 0;
    transition: transform 0.5s, color 0.3s ease-in-out;
    color: rgba(255, 255, 255, .7);
        &:hover {
        transform: scale(1.01);
        color: white;
    }
    // transform: scale(1,1.1) skew(-2deg) translateX(0.5%);
`
const Aboutme = styled.div`
  position: absolute;
  color: rgba(255, 255, 255, 0.7);
  padding: 100px;
  top: 50%;
  font-size: 16px;
  font-family: 'ade';
  letter-spacing: 2px;
  line-height: 1.5;
  border-radius: 10px;
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
                    <Aboutme> Hi, i'm johnny and i practically do a little bit of everything in this world... I love to travel, eat, and failing more than poeple try. I am just using this as filler so i can see where i can position this Container </Aboutme>
                </Right>
            </Container>
        </Section>
    );
};

export default About;
