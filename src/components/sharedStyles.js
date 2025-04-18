import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container2 = styled.div`
  position: fixed;
  width: 100%;
  left: 45px;
  top: 50px;
`;

export const Title = styled.h1`
  font-family: "work sans";
  font-weight: 300;
  font-size: 24px;
  transform: translateX(15px);
  transform-origin: 0 0;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.7);
  transition: transform 0.5s, color 0.3s ease-in-out;
  &:hover {
    transform: scale(1.01);
    color: white;
  }
`;

export const ChapterCard = styled.div`
  background-color: rgba(255, 255, 255, 0.03);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  margin-bottom: 2rem;
  animation: ${fadeUp} 0.8s ease-out forwards;
  opacity: 0;

  h2 {
    font-family: var(--font-heading);
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: white;
    text-transform: uppercase;
  }

  p {
    font-family: var(--font-body);
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--paragraph-color);
  }

  strong {
    font-weight: bold;
  }
`;

export const ProblemSolutionWrapper = styled.div`
  display: flex;
  gap: 2rem;
  margin: 8rem auto;
  max-width: 1000px;
  @media (max-width: 768px) {
    flex-direction: column;
    margin: 6rem auto;
  }
`;

export const ProblemSolutionBox = styled.div`
  flex: 1;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: ${fadeUp} 0.8s ease-out forwards;
  opacity: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);

  h2 {
    font-family: var(--font-heading);
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: white;
    text-transform: uppercase;
  }

  p {
    font-family: var(--font-body);
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--paragraph-color);
  }
`;

export const ProblemBox = styled(ProblemSolutionBox)`
  border-left: 4px solid rgba(255, 128, 128, 0.5);
`;

export const SolutionBox = styled(ProblemSolutionBox)`
  border-left: 4px solid rgba(136, 169, 215, 0.5);
`;

export const SideBySideWrapper = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 3rem auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 4rem;
  flex-wrap: wrap;
  padding: 0 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    padding: 0 1rem;
  }
`;

export const TextColumn = styled.div`
  flex: 0 1 400px;
  min-width: 250px;
  text-align: left;
  padding-top: 0;
  h2 {
    font-family: var(--font-heading);
    font-size: 1.8rem;
    margin-bottom: 1.2rem;
    color: white;
    animation: ${fadeUp} 0.5s ease forwards;
  }
  p {
    font-family: var(--font-body);
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--paragraph-color);
    animation: ${fadeUp} 0.8s ease forwards;
    margin-bottom: 0;
  }
`;

export const ImageColumn = styled.div`
  flex: 0 1 600px;
  min-width: 250px;
  text-align: center;
  padding-top: 0;
  img {
    width: 100%;
    max-width: ${props => props.maxWidth || '600px'};
    border-radius: 12px;
    box-shadow: 0 0 30px rgba(255,255,255,0.08), 0 0 15px rgba(153, 190, 255, 0.2);
    transition: 0.3s ease;
    &:hover {
      transform: scale(1.02);
      box-shadow: 0 0 40px rgba(255,255,255,0.12), 0 0 20px rgba(153, 190, 255, 0.3);
    }
  }
  .stacked {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    img {
      max-width: ${props => props.stackedMaxWidth || '400px'};
      margin: 0 auto;
    }
  }
`;

export const GifContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: ${props => props.maxWidth || '800px'};
  margin: 0 auto;
  border-radius: ${props => props.borderRadius || '24px'};
  overflow: hidden;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.1), 0 0 20px rgba(136, 169, 215, 0.2);
  transition: all 0.4s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 40px rgba(255, 255, 255, 0.15), 0 0 30px rgba(136, 169, 215, 0.3);
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: ${props => props.imageBorderRadius || 'inherit'};
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`; 