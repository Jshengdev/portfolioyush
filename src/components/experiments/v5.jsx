import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 100px 60px;
  color: ${props => props.theme.colors.text.primary};
`;

const Title = styled.h1`
  font-family: 'Work Sans', sans-serif;
  font-size: 24px;
  margin-bottom: 20px;
  letter-spacing: 2px;
`;

const Description = styled.p`
  font-family: 'Work Sans', sans-serif;
  font-size: 14px;
  color: ${props => props.theme.colors.text.secondary};
  letter-spacing: 1px;
`;

/**
 * Experiment v5 - Shader experiment variant 5
 * Placeholder for custom shader implementation
 */
function ExperimentV5() {
  return (
    <Container>
      <Title>EXPERIMENT V5</Title>
      <Description>Shader experiment 5 - Coming soon</Description>
    </Container>
  );
}

export default ExperimentV5;
