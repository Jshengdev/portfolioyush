import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as THREE from 'three';
import BaseExperimentShader from '../BaseExperimentShader';
import fragmentShader from '../../../shaders/experiments/v27.frag.glsl?raw';
import { getPrevExperiment, getNextExperiment, getExperimentById } from '../experimentConfig';
import { ThemeContext } from '../../../context/ThemeContext';

/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  V27: [YOUR EXPERIMENT NAME]                                     ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  READ MASTER VISION FIRST                                       │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * BEFORE CODING, READ:
 *   1. docs/experiments/MASTER_VISION.md  <- The whole vision
 *   2. This file's research sections      <- The specific inspiration
 *
 * CRITICAL RULE: Never start from scratch. Always have inspiration.
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  BEFORE YOU CODE: RESEARCH FIRST                                │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * 1. EXPLORE THE CODEBASE:
 *    - Browse /src/shaders/experiments/*.frag.glsl for techniques
 *    - Read /src/components/experiments/v{N}/index.jsx for UI patterns
 *    - Check /public/assets/ for textures you could use
 *
 * 2. GATHER INSPIRATION:
 *    - Shadertoy.com - search for specific effects
 *    - The Book of Shaders (thebookofshaders.com)
 *    - /docs/experiments/ for any reference images
 *
 * 3. IF STUCK, RESEARCH ONLINE:
 *    Use WebSearch/WebFetch to find:
 *    - GLSL tutorials for specific techniques
 *    - Mathematical formulas (SDF, noise, waves)
 *    - Artist references (Refik Anadol, Casey Reas, etc.)
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  WHAT THIS EXPERIMENT IS                                        │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * Core concept:
 *
 * Key visual elements:
 *   -
 *   -
 *   -
 *
 * Emotional/aesthetic goal:
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  WHAT THIS EXPERIMENT IS NOT                                    │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * Avoid:
 *   -
 *   -
 *
 * Don't duplicate:
 *   - (list similar experiments to differentiate from)
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  CHECKLIST                                                      │
 * └─────────────────────────────────────────────────────────────────┘
 * [ ] Researched existing experiments for overlap
 * [ ] Found 2-3 reference sources (links in README.md)
 * [ ] Shader compiles, 60fps
 * [ ] Navigation works (ESC, arrows)
 * [ ] Updated experimentConfig.js (name, description, colors)
 */

const CURRENT_ID = 'v27';

// ═══════════════════════════════════════════════════════════════════
// NAVIGATION (standard - modify style if needed)
// ═══════════════════════════════════════════════════════════════════
const NavOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  pointer-events: none;
  & > * { pointer-events: auto; }
`;

const NavButton = styled.button`
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
  padding: 8px 16px;
  font-family: 'PP Neue Montreal', sans-serif;
  font-size: 12px;
  letter-spacing: 2px;
  cursor: pointer;
  backdrop-filter: blur(5px);
  transition: all 0.2s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
  }
`;

const NavGroup = styled.div`
  display: flex;
  gap: 10px;
`;

// ═══════════════════════════════════════════════════════════════════
// YOUR COMPONENTS
// ═══════════════════════════════════════════════════════════════════



// ═══════════════════════════════════════════════════════════════════
// EXPERIMENT
// ═══════════════════════════════════════════════════════════════════
const Experiment = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const prev = getPrevExperiment(CURRENT_ID);
  const next = getNextExperiment(CURRENT_ID);
  const current = getExperimentById(CURRENT_ID);

  // ─────────────────────────────────────────────────────────────────
  // YOUR STATE
  // ─────────────────────────────────────────────────────────────────


  // ─────────────────────────────────────────────────────────────────
  // YOUR UNIFORMS (connect to shader)
  // ─────────────────────────────────────────────────────────────────
  const [customUniforms] = useState(() => ({
    // u_yourParam: { value: 1.0 },
  }));

  // ─────────────────────────────────────────────────────────────────
  // KEYBOARD
  // ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') navigate('/experiments');
      if (e.key === 'ArrowLeft' && prev) navigate(`/experiments/${prev.id}`);
      if (e.key === 'ArrowRight' && next) navigate(`/experiments/${next.id}`);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, prev, next]);

  // ─────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────
  return (
    <>
      <BaseExperimentShader
        fragmentShader={fragmentShader}
        title={`${CURRENT_ID.toUpperCase()}: ${current?.name || 'Experiment'}`}
        customUniforms={customUniforms}
      />

      <NavOverlay>
        <NavButton onClick={() => navigate('/experiments')}>← BACK</NavButton>
        <NavGroup>
          <NavButton onClick={() => navigate(`/experiments/${prev?.id}`)}>← PREV</NavButton>
          <NavButton onClick={() => navigate(`/experiments/${next?.id}`)}>NEXT →</NavButton>
        </NavGroup>
      </NavOverlay>
    </>
  );
};

export default Experiment;
