/**
 * Experiment Navigation Component
 * Grid-based navigation page for browsing experimental shader pages
 *
 * @module ExperimentNav
 * Displays 5 shader experiments in a responsive grid layout
 */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';

/**
 * Experiment data for navigation cards
 */
const experiments = [
  { id: 'v1', name: 'Aurora', description: 'Flowing color bands like northern lights' },
  { id: 'v2', name: 'Fog', description: 'Layered translucent clouds that drift' },
  { id: 'v3', name: 'Bloom', description: 'Soft drifting light glows' },
  { id: 'v4', name: 'Liquid', description: 'Organic blob shapes that merge' },
  { id: 'v5', name: 'Waves', description: 'Subtle horizontal gradient waves' },
];

/**
 * Fade-up animation keyframe
 */
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

/**
 * Main container - full page, centered content
 */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 4rem 2rem;
  box-sizing: border-box;
`;

/**
 * Page header title
 */
const Title = styled.h1`
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 300;
  font-size: 2.5rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 1rem;
  text-align: center;
  animation: ${fadeUp} 0.6s ease-out forwards;
`;

/**
 * Subtitle with description
 */
const Subtitle = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 300;
  font-size: 1rem;
  color: ${props => props.theme.colors.text.muted};
  margin-bottom: 3rem;
  text-align: center;
  animation: ${fadeUp} 0.6s ease-out 0.1s forwards;
  opacity: 0;
`;

/**
 * Responsive grid layout for experiment cards
 * 3 columns on desktop, 2 on tablet, 1 on mobile
 */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 900px;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
`;

/**
 * Individual experiment card with glass morphism effect
 */
const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: ${props => props.theme.colors.background.secondary};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.colors.border.subtle};
  border-radius: 12px;
  text-decoration: none;
  transition: ${props => props.theme.transitions.standard};
  animation: ${fadeUp} 0.6s ease-out forwards;
  animation-delay: ${props => props.$delay}s;
  opacity: 0;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    border-color: ${props => props.theme.colors.accent.blue};
    box-shadow: 0 8px 32px ${props => props.theme.colors.shadow.glow},
                0 0 20px ${props => props.theme.colors.shadow.accentGlow};
  }
`;

/**
 * Version badge (V1, V2, etc.)
 */
const VersionBadge = styled.span`
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.accent.blue};
  margin-bottom: 0.75rem;
`;

/**
 * Card title - experiment name
 */
const CardTitle = styled.h2`
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 400;
  font-size: 1.25rem;
  letter-spacing: 1px;
  color: ${props => props.theme.colors.text.primary};
  margin: 0 0 0.5rem 0;
  transition: color 0.3s ease;

  ${Card}:hover & {
    color: ${props => props.theme.colors.text.hover};
  }
`;

/**
 * Card description text
 */
const CardDescription = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 300;
  font-size: 0.9rem;
  line-height: 1.5;
  color: ${props => props.theme.colors.text.muted};
  margin: 0;
`;

/**
 * Back link to main site
 */
const BackLink = styled(Link)`
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 300;
  font-size: 0.85rem;
  letter-spacing: 1px;
  color: ${props => props.theme.colors.text.muted};
  text-decoration: none;
  margin-top: 3rem;
  transition: color 0.3s ease;
  animation: ${fadeUp} 0.6s ease-out 0.5s forwards;
  opacity: 0;

  &:hover {
    color: ${props => props.theme.colors.text.hover};
  }
`;

/**
 * ExperimentNav Component
 * Displays a grid of experiment cards for shader exploration
 */
const ExperimentNav = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Container theme={theme}>
      <Title theme={theme}>Shader Experiments</Title>
      <Subtitle theme={theme}>Explore visual effects and WebGL experiments</Subtitle>

      <Grid theme={theme}>
        {experiments.map((experiment, index) => (
          <Card
            key={experiment.id}
            to={`/experiments/${experiment.id}`}
            theme={theme}
            $delay={0.15 + index * 0.08}
          >
            <VersionBadge theme={theme}>
              {experiment.id.toUpperCase()}
            </VersionBadge>
            <CardTitle theme={theme}>{experiment.name}</CardTitle>
            <CardDescription theme={theme}>
              {experiment.description}
            </CardDescription>
          </Card>
        ))}
      </Grid>

      <BackLink to="/" theme={theme}>
        ← Back to Portfolio
      </BackLink>
    </Container>
  );
};

export default ExperimentNav;
