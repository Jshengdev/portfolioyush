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

// Experimental shader pages
const ExperimentNav = lazy(() => import('./components/experiments/ExperimentNav'));
const ExperimentV1 = lazy(() => import('./components/experiments/v1'));
const ExperimentV2 = lazy(() => import('./components/experiments/v2'));
const ExperimentV3 = lazy(() => import('./components/experiments/v3'));
const ExperimentV4 = lazy(() => import('./components/experiments/v4'));
const ExperimentV5 = lazy(() => import('./components/experiments/v5'));
const ExperimentV6 = lazy(() => import('./components/experiments/v6'));
const ExperimentV7 = lazy(() => import('./components/experiments/v7'));
const ExperimentV8 = lazy(() => import('./components/experiments/v8'));
const ExperimentV9 = lazy(() => import('./components/experiments/v9'));
const ExperimentV10 = lazy(() => import('./components/experiments/v10'));
const ExperimentV11 = lazy(() => import('./components/experiments/v11'));
const ExperimentV12 = lazy(() => import('./components/experiments/v12'));
const ExperimentV13 = lazy(() => import('./components/experiments/v13'));
const ExperimentV14 = lazy(() => import('./components/experiments/v14'));
const ExperimentV15 = lazy(() => import('./components/experiments/v15'));
const ExperimentV16 = lazy(() => import('./components/experiments/v16'));
const ExperimentV17 = lazy(() => import('./components/experiments/v17'));
const ExperimentV19 = lazy(() => import('./components/experiments/v19'));
const ExperimentV18 = lazy(() => import('./components/experiments/v18'));

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
          {/* Experimental shader pages */}
          <Route path="/experiments" element={
            <PageWrapper>
              <ExperimentNav />
            </PageWrapper>
          } />
          <Route path="/experiments/v1" element={
            <PageWrapper>
              <ExperimentV1 />
            </PageWrapper>
          } />
          <Route path="/experiments/v2" element={
            <PageWrapper>
              <ExperimentV2 />
            </PageWrapper>
          } />
          <Route path="/experiments/v3" element={
            <PageWrapper>
              <ExperimentV3 />
            </PageWrapper>
          } />
          <Route path="/experiments/v4" element={
            <PageWrapper>
              <ExperimentV4 />
            </PageWrapper>
          } />
          <Route path="/experiments/v5" element={
            <PageWrapper>
              <ExperimentV5 />
            </PageWrapper>
          } />
          <Route path="/experiments/v6" element={
            <PageWrapper>
              <ExperimentV6 />
            </PageWrapper>
          } />
          <Route path="/experiments/v7" element={
            <PageWrapper>
              <ExperimentV7 />
            </PageWrapper>
          } />
          <Route path="/experiments/v8" element={
            <PageWrapper>
              <ExperimentV8 />
            </PageWrapper>
          } />
          <Route path="/experiments/v9" element={
            <PageWrapper>
              <ExperimentV9 />
            </PageWrapper>
          } />
          <Route path="/experiments/v10" element={
            <PageWrapper>
              <ExperimentV10 />
            </PageWrapper>
          } />
          <Route path="/experiments/v11" element={
            <PageWrapper>
              <ExperimentV11 />
            </PageWrapper>
          } />
          <Route path="/experiments/v12" element={
            <PageWrapper>
              <ExperimentV12 />
            </PageWrapper>
          } />
          <Route path="/experiments/v13" element={
            <PageWrapper>
              <ExperimentV13 />
            </PageWrapper>
          } />
          <Route path="/experiments/v14" element={
            <PageWrapper>
              <ExperimentV14 />
            </PageWrapper>
          } />
          <Route path="/experiments/v15" element={
            <PageWrapper>
              <ExperimentV15 />
            </PageWrapper>
          } />
          <Route path="/experiments/v16" element={
            <PageWrapper>
              <ExperimentV16 />
            </PageWrapper>
          } />
          <Route path="/experiments/v17" element={
            <PageWrapper>
              <ExperimentV17 />
            </PageWrapper>
          } />
          <Route path="/experiments/v19" element={
            <PageWrapper>
              <ExperimentV19 />
            </PageWrapper>
          } />
          <Route path="/experiments/v18" element={
            <PageWrapper>
              <ExperimentV18 />
            </PageWrapper>
          } />
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
            <Navbar />
          </Left>
          <Line />
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
