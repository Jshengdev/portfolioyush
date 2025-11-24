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
 * Experiment v2 - Shader experiment variant 2
 * Placeholder for custom shader implementation
 */
function ExperimentV2() {
  return (
    <Container>
      <Title>EXPERIMENT V2</Title>
      <Description>Shader experiment 2 - Coming soon</Description>
    </Container>
  );
}

export default ExperimentV2;
