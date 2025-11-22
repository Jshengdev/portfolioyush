/**
 * Shared styled-components used across the application
 * Reduces duplication and ensures consistent styling
 * @module sharedStyles
 *
 * Used by: All project detail pages (Grove, CapsuleMachine, Ark, AP, Collection, Lens)
 * Contains: Layout containers, typography, cards, metadata displays, and animations
 */
import styled, { keyframes } from 'styled-components';

/**
 * Fade-up animation keyframe
 * Animates elements from bottom to top with opacity fade
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
 * Main layout container with 10% left margin and 92% content area
 * Used by: All project detail pages
 */
export const Container = styled.div`
  display: grid;
  grid-template-columns: 10% 92%;
  width: 100%;
  height: 100vh;
`;

/**
 * Fixed title container positioned at top-left
 * Used by: Project detail pages for page titles
 */
export const Container2 = styled.div`
  position: fixed;
  width: 100%;
  left: 45px;
  top: 50px;
`;

/**
 * Page title component
 * Responsive with hover scale effect
 * Used by: All project detail pages
 */
export const Title = styled.h1`
  font-family: 'work sans';
  font-weight: 300;
  font-size: 36px;
  transform: translateX(15px);
  transform-origin: 0 0;
  letter-spacing: 2px;
  color: ${props => props.theme.colors.text.secondary};
  transition: transform 0.5s, color 0.3s ease-in-out;
  &:hover {
    transform: scale(1.01);
    color: ${props => props.theme.colors.text.hover};
  }
`;

/**
 * Card component for chapter sections (e.g., Reflections, Conclusion)
 * Includes fade-up animation on mount
 * Used by: Project detail pages for reflections and conclusions
 */
export const ChapterCard = styled.div`
  background-color: ${props => props.theme.colors.background.secondary};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px ${props => props.theme.colors.shadow.subtle};
  margin-top: 2rem;
  margin-bottom: 2rem;
  animation: ${fadeUp} 0.8s ease-out forwards;
  opacity: 0;

  h2 {
    font-family: ${props => props.theme.fonts.display};
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.colors.text.hover};
    text-transform: uppercase;
  }

  p {
    font-family: ${props => props.theme.fonts.primary};
    font-size: 1.1rem;
    line-height: 1.6;
    color: ${props => props.theme.colors.text.secondary};
  }

  strong {
    font-weight: bold;
  }
`;

/**
 * Wrapper for Problem/Solution box pair
 * Responsive flex layout with mobile stacking
 */
export const ProblemSolutionWrapper = styled.div`
  display: flex;
  gap: 3rem;
  margin: 8rem auto;
  max-width: 1000px;
  @media (max-width: 768px) {
    flex-direction: column;
    margin: 6rem auto;
    gap: 2rem;
  }
`;

/**
 * Bold text emphasis component
 * Used for highlighting important text within paragraphs
 */
export const Bold = styled.span`
  font-size: 19px;
  font-weight: 600;
  color: ${props => props.theme.colors.text.emphasis};
`;

/**
 * Base styled component for Problem and Solution boxes
 * Includes glass-morphism effect with backdrop blur
 * Extended by ProblemBox and SolutionBox
 */
export const ProblemSolutionBox = styled.div`
  flex: 0 1 auto;
  padding: 1.5rem;
  background: ${props => props.theme.colors.background.secondary};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 8px 32px ${props => props.theme.colors.shadow.subtle};
  animation: ${fadeUp} 0.8s ease-out forwards;
  opacity: 0;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  text-align: left;
  width: fit-content;

  h2 {
    font-family: ${props => props.theme.fonts.display};
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.text.hover};
    text-transform: uppercase;
  }

  p {
    font-family: ${props => props.theme.fonts.primary};
    font-size: 17px;
    line-height: 1.75;
    color: ${props => props.theme.colors.text.secondary};
    padding: 0;
    margin: 0;
  }
`;

/**
 * Problem statement box with red accent border
 * Extends ProblemSolutionBox
 */
export const ProblemBox = styled(ProblemSolutionBox)`
  border-left: 4px solid ${props => props.theme.colors.accent.red};
`;

/**
 * Solution statement box with blue accent border
 * Extends ProblemSolutionBox
 */
export const SolutionBox = styled(ProblemSolutionBox)`
  border-left: 4px solid ${props => props.theme.colors.accent.blue};
`;

/**
 * Side-by-side layout wrapper for text and image columns
 * Responsive flex layout that wraps on mobile
 * Used by: Project detail pages for ACT sections
 */
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

/**
 * Text column for side-by-side layouts
 * Flexible width with minimum 250px, max 400px
 * Includes fade-up animations for h2 and p elements
 */
export const TextColumn = styled.div`
  flex: 0 1 400px;
  min-width: 250px;
  text-align: left;
  padding-top: 0;
  h2 {
    font-family: ${props => props.theme.fonts.display};
    font-size: 1.8rem;
    margin-bottom: 1.2rem;
    color: ${props => props.theme.colors.text.hover};
    animation: ${fadeUp} 0.5s ease forwards;
  }
  p {
    font-family: ${props => props.theme.fonts.primary};
    font-size: 1.1rem;
    line-height: 1.6;
    color: ${props => props.theme.colors.text.secondary};
    animation: ${fadeUp} 0.8s ease forwards;
    margin-bottom: 0;
  }
`;

/**
 * Image column for side-by-side layouts
 * Supports dynamic maxWidth prop and stacked image layout
 * Includes hover scale and glow effects
 * @prop {string} maxWidth - Maximum width for single images (default: '600px')
 * @prop {string} stackedMaxWidth - Maximum width for stacked images (default: '400px')
 */
export const ImageColumn = styled.div`
  flex: 0 1 600px;
  min-width: 250px;
  text-align: center;
  padding-top: 0;
  img {
    width: 100%;
    max-width: ${props => props.maxWidth || '600px'};
    border-radius: 12px;
    box-shadow: 0 0 30px ${props => props.theme.colors.shadow.glow}, 0 0 15px ${props => props.theme.colors.shadow.accentGlowStrong};
    transition: 0.3s ease;
    &:hover {
      transform: scale(1.02);
      box-shadow: 0 0 40px ${props => props.theme.colors.shadow.glowStrong}, 0 0 20px ${props => props.theme.colors.shadow.accentGlowStrong};
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

/**
 * Container for GIF/video content with customizable dimensions
 * Includes hover scale effect and shadow
 * @prop {string} maxWidth - Maximum width (default: '800px')
 * @prop {string} borderRadius - Border radius (default: '24px')
 * @prop {string} imageBorderRadius - Inner image border radius (default: inherit)
 */
export const GifContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: ${props => props.maxWidth || '800px'};
  margin: 0 auto;
  border-radius: ${props => props.borderRadius || '24px'};
  overflow: hidden;
  box-shadow: 0 0 30px ${props => props.theme.colors.shadow.glow}, 0 0 20px ${props => props.theme.colors.shadow.accentGlow};
  transition: all 0.4s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 40px ${props => props.theme.colors.shadow.glowStrong}, 0 0 30px ${props => props.theme.colors.shadow.accentGlow};
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

/**
 * Overview box for project summaries
 * Includes fade-up animation on mount
 * Used by: Project detail pages for overview sections
 */
export const OverviewBox = styled.div`
  background-color: ${props => props.theme.colors.background.secondary};
  padding: 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  min-height: fit-content;
  height: auto;
  box-shadow: 0 8px 32px ${props => props.theme.colors.shadow.subtle};
  margin: 2rem 0;
  animation: ${fadeUp} 0.8s ease-out forwards;
  opacity: 0;
  border: 1px solid ${props => props.theme.colors.border.subtle};

`;

/**
 * Metadata panel displaying project details (Role, Timeline, Skills)
 * Pill-shaped container with glass-morphism effect
 * Used by: Project detail pages
 */
export const MetadataPanel = styled.div`
  position: relative;
  margin: 2rem auto;
  max-width: 600px;
  border-radius: 50px;
  padding: 0.8rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  border: 1px solid ${props => props.theme.colors.border.subtle};
  box-shadow: 0 0 20px ${props => props.theme.colors.shadow.glow};
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;

/**
 * Individual metadata section within MetadataPanel
 * Contains label and value pairs
 */
export const MetadataSection = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
`;

/**
 * Label text for metadata (e.g., "Role:", "Timeline:")
 * Lighter color to distinguish from value
 */
export const MetadataLabel = styled.span`
  font-weight: 300;
  margin-right: 0.5rem;
  color: ${props => props.theme.colors.text.muted};
`;

/**
 * Value text for metadata
 * Slightly bolder than label for emphasis
 */
export const MetadataValue = styled.span`
  font-weight: 400;
  text-align: left;
`; 