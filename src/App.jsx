import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import About from './components/About'; 
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Line from './components/Line';
import Projects from './components/Projects'; 
import Grove from './components/Projectfiles/Grove';
import CapsuleMachine from './components/Projectfiles/CapsuleMachine';
import Lens from './components/Projectfiles/Lens';
import Sticker from './components/Projectfiles/Sticker';
import Hoodie from './components/Projectfiles/Hoodie';
import { AnimatePresence, motion } from 'framer-motion';
import Cursor from './Cursor';
import './App.css';
import ShaderVisual from './components/ShaderVisual';


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
        <Route path="/projects/Sticker" 
        element={
        <PageWrapper>
          <Sticker />
        </PageWrapper>} />
        <Route path="/projects/Hoodie" 
        element={
        <PageWrapper>
          <Hoodie />
        </PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
