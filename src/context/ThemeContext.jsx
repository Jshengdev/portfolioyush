import React, { createContext, useState, useEffect } from 'react';
import { darkTheme, lightTheme } from '../theme';

/**
 * Theme Context for managing dark/light mode state
 *
 * Provides:
 * - theme: Current theme object (darkTheme or lightTheme)
 * - isDarkMode: Boolean indicating current mode
 * - toggleTheme: Function to switch between modes
 *
 * State persists to localStorage for user preference
 */
export const ThemeContext = createContext();

/**
 * ThemeProvider component that wraps the app
 * Manages theme state and provides it to all children via context
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export const ThemeProvider = ({ children }) => {
  // Default to dark mode
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save theme preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  /**
   * Toggle between dark and light modes
   */
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Select current theme object based on mode
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
