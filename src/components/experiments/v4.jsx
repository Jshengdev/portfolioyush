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
 * Experiment v4 - Shader experiment variant 4
 * Placeholder for custom shader implementation
 */
function ExperimentV4() {
  return (
    <Container>
      <Title>EXPERIMENT V4</Title>
      <Description>Shader experiment 4 - Coming soon</Description>
    </Container>
  );
}

export default ExperimentV4;
