import React, { lazy, Suspense, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as CustomThemeProvider, ThemeContext } from './context/ThemeContext';
import './assets/fonts/fonts.css';
// Lazy loaded page components
const About = lazy(() => import('./components/About'));
const Hero = lazy(() => import('./components/Hero'));
const Contact = lazy(() => import('./components/Contact'));
const Projects = lazy(() => import('./components/Projects'));
const Grove = lazy(() => import('./components/Projectfiles/Grove'));
const CapsuleMachine = lazy(() => import('./components/Projectfiles/CapsuleMachine'));
const Ark = lazy(() => import('./components/Projectfiles/Ark'));
const AP = lazy(() => import('./components/Projectfiles/AP'));
const Lens = lazy(() => import('./components/Projectfiles/Lens'));
const Collection = lazy(() => import('./components/Projectfiles/Collection'));
const Archive = lazy(() => import('./components/Archive'));
const NextProject = lazy(() => import('./components/NextProject'));
// Always loaded components (needed for initial render)
import Navbar from './components/Navbar';
import Line from './components/Line';
import { AnimatePresence, motion } from 'framer-motion';
import Cursor from './Cursor';
import './App.css';
import ShaderVisual from './components/ShaderVisual';
import ThemeToggle from './components/ThemeToggle';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  border: 30px solid ${props => props.theme.colors.background.overlay};
  position: fixed;
  box-sizing: border-box;
`;

const Frame = styled.div`
  position: fixed;
  left: 30px;
  right: 30px;
  top: 30px;
  bottom: 30px;
  border: 2.5px solid ${props => props.theme.colors.border.primary};
  overflow: hidden;
`;

const Left = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: center;
    transform: translateY(80%);
    padding: 60px;
    margin-left: -30px;
    z-index: 100;
`

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: ${props => props.theme.colors.text.secondary};
  font-family: 'Work Sans', sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
`

/**
 * Page transition wrapper component
 * Provides fade-in/fade-out animations for route changes
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 */
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .5 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated route container with Framer Motion transitions
 * Uses AnimatePresence for smooth route transitions with "wait" mode
 * Wrapped with Suspense for lazy-loaded components
 */
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingContainer>Loading...</LoadingContainer>}>
        <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Hero />
            </PageWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <PageWrapper>
              <About />
            </PageWrapper>
          }
        />
        <Route
          path="/archive"
          element={
            <PageWrapper>
              <Archive />
            </PageWrapper>
          }
        />
        <Route
          path="/contact"
          element={
            <PageWrapper>
              <Contact />
            </PageWrapper>
          }
        />
        <Route
          path="/projects"
          element={
            <PageWrapper>
              <Projects />
            </PageWrapper>
          }
        />
        <Route path="/projects/Grove" 
        element={
        <PageWrapper>
          <Grove />
        </PageWrapper>} />
        <Route path="/projects/CapsuleMachine" 
        element={
        <PageWrapper>
          <CapsuleMachine />
        </PageWrapper>} />
        <Route path="/projects/Lens" 
        element={
        <PageWrapper>
          <Lens />
        </PageWrapper>} />
        <Route path="/projects/TheCollection" 
        element={
        <PageWrapper>
          <Collection />
        </PageWrapper>} />
        <Route path="/projects/NextProject" 
        element={
        <PageWrapper>
          <NextProject />
        </PageWrapper>} />
        <Route path="/projects/Ark"
          element={
            <PageWrapper>
              <Ark />
            </PageWrapper>
          }
        />
        <Route path="/projects/AlainaPamela"
          element={
            <PageWrapper>
              <AP />
            </PageWrapper>
          }
        />
      </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

/**
 * App content component that uses ThemeContext
 * Wraps the app with StyledThemeProvider using the current theme from context
 */
function AppContent() {
  const { theme } = useContext(ThemeContext);

  // Set body background color to match theme
  useEffect(() => {
    document.body.style.backgroundColor = theme.colors.background.primary;
  }, [theme]);

  return (
    <StyledThemeProvider theme={theme}>
      <Cursor />
      <Container>
        <Frame>
          <ShaderVisual />
          <Left>
            <Navbar/>
          </Left>
          <Line/>
          <AnimatedRoutes />
        </Frame>
        <ThemeToggle />
      </Container>
    </StyledThemeProvider>
  );
}

/**
 * Main application component with routing and layout
 * - Defines all routes for the portfolio site
 * - Provides CustomThemeProvider for theme context (light/dark mode)
 * - Provides StyledThemeProvider for styled-components
 * - Implements fixed frame layout with border design
 * - Handles page transitions with Framer Motion
 * - Includes global components: Cursor, ShaderVisual, Navbar, Line, ThemeToggle
 *
 * Structure:
 * Router → CustomThemeProvider → AppContent → StyledThemeProvider → rest of app
 *
 * Routes:
 * - / (Hero)
 * - /about (About)
 * - /projects (Projects listing)
 * - /archive (Archive gallery)
 * - /contact (Contact info)
 * - /projects/:projectName (Individual project pages)
 */
function App() {
  return (
    <Router>
      <CustomThemeProvider>
        <AppContent />
      </CustomThemeProvider>
    </Router>
  );
}

export default App;
