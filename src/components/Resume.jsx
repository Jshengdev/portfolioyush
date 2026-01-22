import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Title, Container2 } from './sharedStyles';

const Section = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const ResumeContainer = styled.div`
  width: 80%;
  height: 75vh;
  margin-top: 80px;
  background: ${props => props.theme.colors.background.secondary};
  border-radius: 12px;
  box-shadow: 0 8px 32px ${props => props.theme.colors.shadow.subtle};
  border: 1px solid ${props => props.theme.colors.border.subtle};
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const PDFViewer = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  display: flex;
  gap: 15px;
  z-index: 10;
`;

const Button = styled.a`
  padding: 12px 24px;
  background: ${props => props.theme.colors.background.overlay};
  color: ${props => props.theme.colors.text.primary};
  text-decoration: none;
  font-family: 'Work Sans', sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
  border: 1px solid ${props => props.theme.colors.border.primary};
  border-radius: 30px;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    background: ${props => props.theme.colors.text.primary};
    color: ${props => props.theme.colors.background.primary};
    transform: translateY(-2px);
  }
`;

const Resume = () => {
  const navigate = useNavigate();
  const resumeUrl = '/assets/Johnny Sheng Resume.pdf'; // Path updated to include assets folder

  const handleHeroClick = () => {
    navigate('/');
  };

  return (
    <Section>
      <Container2>
        <Title onClick={handleHeroClick}>johnny sheng's resume</Title>
      </Container2>
      
      <ResumeContainer>
        <PDFViewer 
          src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
          title="Johnny Sheng Resume"
        />
      </ResumeContainer>

      <Controls>
        <Button href={resumeUrl} download="Johnny_Sheng_Resume.pdf">
          DOWNLOAD PDF
        </Button>
        <Button href={resumeUrl} target="_blank" rel="noopener noreferrer">
          OPEN IN NEW TAB
        </Button>
      </Controls>
    </Section>
  );
};

export default Resume;
