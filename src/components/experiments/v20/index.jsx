import React, { useRef, useEffect, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as THREE from 'three';
import { getPrevExperiment, getNextExperiment, getExperimentById } from '../experimentConfig';
import { ThemeContext } from '../../../context/ThemeContext';
import fragmentShader from '../../../shaders/experiments/galois.frag.glsl?raw';

/**
 * V20: GALOIS - Interactive Galois Theory Visualization
 *
 * A visualization of polynomial domain coloring that helps explain
 * why there's no general formula for solving quintic (degree 5+) equations.
 *
 * Visual Effect:
 * - Domain coloring shows polynomial behavior across complex plane
 * - White/bright regions indicate zeros (polynomial solutions)
 * - Hue encodes phase angle, brightness encodes magnitude
 * - Interactive controls for polynomial degree and coefficients
 *
 * Technical Details:
 * - Complex polynomial evaluation in GLSL
 * - HSV to RGB color mapping for phase visualization
 * - Grid overlay with unit circle reference
 * - Smooth solution glow animation
 *
 * Based on the 7-step GALOIS implementation guide.
 * @see GALOIS_IMPLEMENTATION_GUIDE.md
 */

const CURRENT_ID = 'v20';

// Styled Components
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.$isDarkMode ? '#000' : '#fff'};
`;

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

  & > * {
    pointer-events: auto;
  }
`;

const NavButton = styled.button`
  background: ${props => props.theme.colors.background.overlay};
  border: 1px solid ${props => props.theme.colors.border.subtle};
  color: ${props => props.theme.colors.text.secondary};
  padding: 8px 16px;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 12px;
  letter-spacing: 2px;
  cursor: pointer;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: ${props => props.theme.transitions.standard};

  &:hover {
    background: ${props => props.theme.colors.background.secondary};
    color: ${props => props.theme.colors.text.hover};
    border-color: ${props => props.theme.colors.accent.blue};
  }
`;

const NavGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ControlPanel = styled.div`
  position: fixed;
  bottom: 40px;
  left: 40px;
  background: ${props => props.$isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  border: 1px solid ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 8px;
  padding: 20px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 100;
  min-width: 280px;
`;

const ControlTitle = styled.div`
  color: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
  font-family: 'Roboto Mono', monospace;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const ControlRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const ControlLabel = styled.label`
  color: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'};
  font-family: 'Roboto Mono', monospace;
  font-size: 11px;
`;

const ControlSlider = styled.input`
  width: 120px;
  height: 4px;
  -webkit-appearance: none;
  background: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 2px;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #4A9EFF;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #4A9EFF;
    cursor: pointer;
    border: none;
  }
`;

const ControlValue = styled.span`
  color: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
  font-family: 'Roboto Mono', monospace;
  font-size: 10px;
  min-width: 40px;
  text-align: right;
`;

const EquationDisplay = styled.div`
  color: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'};
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  text-align: center;
`;

const SolutionInfo = styled.div`
  color: ${props => props.$isDarkMode ? 'rgba(74, 158, 255, 0.8)' : 'rgba(74, 158, 255, 1)'};
  font-family: 'Roboto Mono', monospace;
  font-size: 10px;
  margin-top: 8px;
  text-align: center;
`;

const TitleOverlay = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'};
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  pointer-events: none;
  z-index: 1;
`;

/**
 * Format a complex number for display
 */
const formatComplex = (re, im) => {
  if (Math.abs(im) < 0.001) return re.toFixed(2);
  if (Math.abs(re) < 0.001) return `${im.toFixed(2)}i`;
  const sign = im >= 0 ? '+' : '';
  return `${re.toFixed(2)}${sign}${im.toFixed(2)}i`;
};

/**
 * Generate polynomial equation string
 */
const generateEquation = (coefficients, degree) => {
  const terms = [];
  for (let i = degree; i >= 0; i--) {
    const coef = coefficients[i];
    if (Math.abs(coef.x) < 0.001 && Math.abs(coef.y) < 0.001) continue;

    let term = '';
    if (i === degree) {
      term = i === 0 ? formatComplex(coef.x, coef.y) : '';
    } else {
      const sign = terms.length > 0 ? ' + ' : '';
      term = sign;
    }

    if (i === 0) {
      term += formatComplex(coef.x, coef.y);
    } else if (i === 1) {
      const c = formatComplex(coef.x, coef.y);
      term += c === '1.00' ? 'z' : `(${c})z`;
    } else {
      const c = formatComplex(coef.x, coef.y);
      term += c === '1.00' ? `z${superscript(i)}` : `(${c})z${superscript(i)}`;
    }

    if (term.trim()) terms.push(term);
  }

  return terms.join('') + ' = 0';
};

/**
 * Convert number to superscript
 */
const superscript = (n) => {
  const superscripts = ['⁰', '¹', '²', '³', '⁴', '⁵'];
  return superscripts[n] || n.toString();
};

/**
 * Default vertex shader
 */
const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const GaloisExperiment = () => {
  const navigate = useNavigate();
  const { theme, isDarkMode } = useContext(ThemeContext);
  const mountRef = useRef(null);
  const animationRef = useRef(null);
  const materialRef = useRef(null);

  // State for polynomial parameters
  const [degree, setDegree] = useState(3);
  const [zoom, setZoom] = useState(4.0);
  const [brightness, setBrightness] = useState(0.5);
  const [saturation, setSaturation] = useState(0.7);

  // Coefficients: array of {x: real, y: imaginary}
  const [coefficients, setCoefficients] = useState([
    { x: 1, y: 0 },   // a₀ (constant)
    { x: 0, y: 0 },   // a₁ (z term)
    { x: 0, y: 0 },   // a₂ (z² term)
    { x: 1, y: 0 },   // a₃ (z³ term) - leading coef for cubic
    { x: 0, y: 0 },   // a₄
    { x: 0, y: 0 },   // a₅
  ]);

  // Navigation data
  const prev = getPrevExperiment(CURRENT_ID);
  const next = getNextExperiment(CURRENT_ID);
  const current = getExperimentById(CURRENT_ID);

  // Update coefficient
  const updateCoefficient = useCallback((index, part, value) => {
    setCoefficients(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [part]: parseFloat(value) };
      return next;
    });
  }, []);

  // Update material uniforms when parameters change
  useEffect(() => {
    if (!materialRef.current) return;

    const mat = materialRef.current;

    // Update degree
    mat.uniforms.u_degree.value = degree;

    // Update coefficients
    coefficients.forEach((coef, i) => {
      mat.uniforms.u_coefficients.value[i].set(coef.x, coef.y);
    });

    // Update other parameters
    mat.uniforms.u_zoom.value = zoom;
    mat.uniforms.u_brightness.value = brightness;
    mat.uniforms.u_saturation.value = saturation;

  }, [degree, coefficients, zoom, brightness, saturation]);

  // WebGL initialization
  useEffect(() => {
    if (!mountRef.current) return;

    const bgColor = isDarkMode
      ? new THREE.Vector3(0.02, 0.02, 0.05)
      : new THREE.Vector3(0.95, 0.95, 0.98);

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });

    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(pixelRatio);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';

    mountRef.current.appendChild(renderer.domElement);

    // Geometry
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Calculate actual resolution
    const actualWidth = window.innerWidth * pixelRatio;
    const actualHeight = window.innerHeight * pixelRatio;

    // Create coefficient uniform array
    const coefficientUniforms = coefficients.map(c => new THREE.Vector2(c.x, c.y));

    // Material with custom uniforms for GALOIS shader
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(actualWidth, actualHeight) },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_backgroundColor: { value: bgColor },
        u_coefficients: { value: coefficientUniforms },
        u_degree: { value: degree },
        u_zoom: { value: zoom },
        u_pan: { value: new THREE.Vector2(0, 0) },
        u_brightness: { value: brightness },
        u_saturation: { value: saturation },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    materialRef.current = material;

    // Mesh
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Animation
    const startTime = performance.now();
    const animate = () => {
      const elapsedTime = (performance.now() - startTime) / 1000;
      material.uniforms.u_time.value = elapsedTime;
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Mouse move
    const onMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;
      material.uniforms.u_mouse.value.set(x, y);
    };
    window.addEventListener('mousemove', onMouseMove);

    // Touch support
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = touch.clientX / window.innerWidth;
        const y = 1 - touch.clientY / window.innerHeight;
        material.uniforms.u_mouse.value.set(x, y);
      }
    };
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Resize
    const onResize = () => {
      const { innerWidth, innerHeight } = window;
      renderer.setSize(innerWidth, innerHeight);
      const resizedWidth = innerWidth * pixelRatio;
      const resizedHeight = innerHeight * pixelRatio;
      material.uniforms.u_resolution.value.set(resizedWidth, resizedHeight);
    };
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);

      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();
      geometry.dispose();
      material.dispose();
      materialRef.current = null;
    };
  }, [isDarkMode]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') navigate('/experiments');
      if (e.key === 'ArrowLeft') navigate(`/experiments/${prev.id}`);
      if (e.key === 'ArrowRight') navigate(`/experiments/${next.id}`);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, prev, next]);

  return (
    <Container $isDarkMode={isDarkMode}>
      <div ref={mountRef} />

      <TitleOverlay $isDarkMode={isDarkMode}>
        {CURRENT_ID.toUpperCase()}: {current?.name || 'Galois'}
      </TitleOverlay>

      <NavOverlay>
        <NavButton theme={theme} onClick={() => navigate('/experiments')}>
          ← BACK
        </NavButton>
        <NavGroup>
          <NavButton theme={theme} onClick={() => navigate(`/experiments/${prev.id}`)}>
            ← PREV
          </NavButton>
          <NavButton theme={theme} onClick={() => navigate(`/experiments/${next.id}`)}>
            NEXT →
          </NavButton>
        </NavGroup>
      </NavOverlay>

      <ControlPanel $isDarkMode={isDarkMode}>
        <ControlTitle $isDarkMode={isDarkMode}>
          Polynomial Controls
        </ControlTitle>

        <ControlRow>
          <ControlLabel $isDarkMode={isDarkMode}>Degree</ControlLabel>
          <ControlSlider
            $isDarkMode={isDarkMode}
            type="range"
            min="2"
            max="5"
            step="1"
            value={degree}
            onChange={(e) => setDegree(parseInt(e.target.value))}
          />
          <ControlValue $isDarkMode={isDarkMode}>{degree}</ControlValue>
        </ControlRow>

        <ControlRow>
          <ControlLabel $isDarkMode={isDarkMode}>Zoom</ControlLabel>
          <ControlSlider
            $isDarkMode={isDarkMode}
            type="range"
            min="1"
            max="10"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
          />
          <ControlValue $isDarkMode={isDarkMode}>{zoom.toFixed(1)}</ControlValue>
        </ControlRow>

        <ControlRow>
          <ControlLabel $isDarkMode={isDarkMode}>a₀ (Re)</ControlLabel>
          <ControlSlider
            $isDarkMode={isDarkMode}
            type="range"
            min="-2"
            max="2"
            step="0.1"
            value={coefficients[0].x}
            onChange={(e) => updateCoefficient(0, 'x', e.target.value)}
          />
          <ControlValue $isDarkMode={isDarkMode}>{coefficients[0].x.toFixed(1)}</ControlValue>
        </ControlRow>

        <ControlRow>
          <ControlLabel $isDarkMode={isDarkMode}>a₁ (Re)</ControlLabel>
          <ControlSlider
            $isDarkMode={isDarkMode}
            type="range"
            min="-2"
            max="2"
            step="0.1"
            value={coefficients[1].x}
            onChange={(e) => updateCoefficient(1, 'x', e.target.value)}
          />
          <ControlValue $isDarkMode={isDarkMode}>{coefficients[1].x.toFixed(1)}</ControlValue>
        </ControlRow>

        <ControlRow>
          <ControlLabel $isDarkMode={isDarkMode}>a₂ (Re)</ControlLabel>
          <ControlSlider
            $isDarkMode={isDarkMode}
            type="range"
            min="-2"
            max="2"
            step="0.1"
            value={coefficients[2].x}
            onChange={(e) => updateCoefficient(2, 'x', e.target.value)}
          />
          <ControlValue $isDarkMode={isDarkMode}>{coefficients[2].x.toFixed(1)}</ControlValue>
        </ControlRow>

        <EquationDisplay $isDarkMode={isDarkMode}>
          {generateEquation(coefficients, degree)}
        </EquationDisplay>

        <SolutionInfo $isDarkMode={isDarkMode}>
          {degree} solutions • White regions = zeros
        </SolutionInfo>
      </ControlPanel>
    </Container>
  );
};

export default GaloisExperiment;
