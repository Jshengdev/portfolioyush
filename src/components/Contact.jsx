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

const LinksContainer = styled.div`
  position: absolute;
  color: rgba(255, 255, 255, 0.7);
  padding: 100px;
  top: 60%;
  font-size: 16px;
  font-family: 'ade';
  letter-spacing: 2px;
  line-height: 1.5;
  text-align: right;
  right: 0;
`;

const StyledLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  margin-right: 20px;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
  }
`;

const Contact = () => {
  const navigate = useNavigate();

  const handleHeroClick = () => {
      navigate('/');
    };
    return (
        <Section>
            <Container2>
                <Title onClick={handleHeroClick}>should you contact johnny?</Title>
            </Container2>
            <Container>
                <Right>
                    <Aboutme> my website is currently under redesign, but you can still find me at the links below!</Aboutme>
                    <LinksContainer>
                        <StyledLink href="https://www.linkedin.com/in/johnny--sheng/" target="_blank" rel="noopener noreferrer">LinkedIn</StyledLink>
                        <StyledLink href="mailto:johnnysheng0@gmail.com">Email</StyledLink>
                    </LinksContainer>
                </Right>
            </Container>
        </Section>
    );
};

export default Contact;
