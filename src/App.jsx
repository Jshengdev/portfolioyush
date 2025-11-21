import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import './assets/fonts/fonts.css';
import About from './components/About'; 
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Line from './components/Line';
import Contact from './components/Contact';
import Projects from './components/Projects'; 
import Grove from './components/Projectfiles/Grove';
import CapsuleMachine from './components/Projectfiles/CapsuleMachine';
import Ark from './components/Projectfiles/Ark';
import AP from './components/Projectfiles/AP';
import Lens from './components/Projectfiles/Lens';
import Collection from './components/Projectfiles/Collection';
import { AnimatePresence, motion } from 'framer-motion';
import Cursor from './Cursor';
import './App.css';
import ShaderVisual from './components/ShaderVisual';
import Archive from './components/Archive';
import NextProject from './components/NextProject';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  border: 30px hsla(0, 0.00%, 0.00%, 0.90) solid;
  position: fixed;
  box-sizing: border-box;
`;

const Frame = styled.div`
  position: fixed;
  left: 30px;
  right: 30px;
  top: 30px;
  bottom: 30px;
  border: 2.5px solid rgba(136, 169, 215, 0.47);
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

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
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
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
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
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
