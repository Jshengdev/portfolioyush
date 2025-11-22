import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../context/ThemeContext';

const ToggleButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.theme.colors.background.secondary};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 2px solid ${props => props.theme.colors.border.primary};
  color: ${props => props.theme.colors.text.primary};
  font-size: 24px;
  cursor: pointer;
  z-index: 10000;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px ${props => props.theme.colors.shadow.accentGlow};
  }
`;

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <ToggleButton onClick={toggleTheme} aria-label="Toggle theme">
      {isDarkMode ? '☀️' : '🌙'}
    </ToggleButton>
  );
};

export default ThemeToggle;
