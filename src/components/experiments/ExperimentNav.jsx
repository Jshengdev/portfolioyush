import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 100px 60px;
  color: ${props => props.theme.colors.text.primary};
`;

const Title = styled.h1`
  font-family: 'Work Sans', sans-serif;
  font-size: 24px;
  margin-bottom: 40px;
  letter-spacing: 2px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NavItem = styled.li`
  margin-bottom: 16px;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text.secondary};
  text-decoration: none;
  font-family: 'Work Sans', sans-serif;
  font-size: 14px;
  letter-spacing: 1px;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.text.primary};
  }
`;

/**
 * Navigation page for experimental shader versions
 * Links to all v1-v5 shader experiments
 */
function ExperimentNav() {
  return (
    <Container>
      <Title>SHADER EXPERIMENTS</Title>
      <NavList>
        <NavItem><NavLink to="/experiments/v1">v1 - Base Version</NavLink></NavItem>
        <NavItem><NavLink to="/experiments/v2">v2 - Experiment 2</NavLink></NavItem>
        <NavItem><NavLink to="/experiments/v3">v3 - Experiment 3</NavLink></NavItem>
        <NavItem><NavLink to="/experiments/v4">v4 - Experiment 4</NavLink></NavItem>
        <NavItem><NavLink to="/experiments/v5">v5 - Experiment 5</NavLink></NavItem>
      </NavList>
    </Container>
  );
}

export default ExperimentNav;
