import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AppSlider from './AppSlider';
import { Title, Container2 } from './sharedStyles';
import { experiments } from './experiments/experimentConfig';

const Section = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

const Container = styled.div`
  height: 100%;
  width: 100%;
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
`

const Right = styled.div`
    display: flex;
    flex: 5;
    align-items: center;
    position: relative;
`

const Image = styled.img`
    height: 300px;
    object-fit: contain;
    margin: auto;
    animation: shake 2s infinite ease alternate;

    @keyframes shake {
    100%{
       transform: translateY(30px);
        }
    }
`;


const ShadowTitle = styled(Title)`
    color: rgba(255, 255, 255, .6 );
    transform: scale(1, -3);
    filter: blur(3px);
    position: relative;
    top: -25px;
`;

const Subtitle = styled.h3`
    font-size: 24px;
`

const Desc = styled.p`
font-size: 16px;
`
const Button = styled.button`
    padding: 10px;
    width: 100px;
    color: black;
    background-color: grey;
    border: none;
    cursor: pointer;
    border-radius: 10px;
`

const ExperimentsLink = styled(Link)`
    position: fixed;
    bottom: 50px;
    right: 50px;
    color: rgba(255, 255, 255, 0.3);
    font-family: 'Work Sans', sans-serif;
    font-size: 10px;
    letter-spacing: 2px;
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.2s ease;
    z-index: 50;

    &:hover {
        color: rgba(255, 255, 255, 0.6);
    }
`;

const Hero = () => {
    
    return (
        <Section>
            {/* <ShaderVisual/> */}
            <Container2>
            <Title> johnny sheng's portfolio</Title>
            <AppSlider/>
            {/* <ShadowTitle>JOHNNY SHENG</ShadowTitle> */}
            </Container2>
            <Container>
                <Left>
                </Left>
                <Right>
                    {/* <a href="https://www.wix.com/?utm_source=google&utm_medium=cpc&utm_campaign=20529976750^157109364910^search%20-%20wix&experiment_id=wix^e^710272803327^&gad_source=1&gclid=CjwKCAiA9IC6BhA3EiwAsbltOAfcYBt4CjWq6yPm2HLcHdQ3PTr5hDzUhlp17kqpAN6b6AI249WmGRoCH04QAvD_BwE" target="_blank" rel="noopener noreferrer">
                        <Image src="./assets/Subject 2.png" />
                    </a> */}
                </Right>
            </Container>
            <ExperimentsLink to="/experiments">
                experiments ({experiments.length}) →
            </ExperimentsLink>
        </Section>
    );
};

export default Hero;