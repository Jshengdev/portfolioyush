import React, { useEffect, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as THREE from 'three';
import { getPrevExperiment, getNextExperiment, getExperimentById } from '../experimentConfig';
import { ThemeContext } from '../../../context/ThemeContext';
import vertexShader from '../../../shaders/experiments/bokeh.vert.glsl?raw';
import fragmentShader from '../../../shaders/experiments/bokeh.frag.glsl?raw';

/**
 * V8: Blurry Web Experiment
 *
 * Visual Effect:
 * - 3D Wireframe/Point cloud structure
 * - Strong Depth of Field (Bokeh) effect
 * - Points out of focus become large and blurry
 *
 * Technical Details:
 * - Custom Three.js scene (not using BaseExperimentShader)
 * - Custom ShaderMaterial for DoF simulation
 * - IcosahedronGeometry for the "web" structure
 */

const CURRENT_ID = 'v8';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
  background: ${props => props.theme.colors.background.primary};
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
    border-color: ${props => props.theme.colors.accent.primary};
  }
`;

const NavGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Title = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: ${props => props.theme.colors.text.secondary};
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  pointer-events: none;
  z-index: 1;
`;

const WebExperiment = () => {
    const navigate = useNavigate();
    const { theme, isDarkMode } = useContext(ThemeContext);
    const mountRef = useRef(null);
    const animationRef = useRef(null);

    const prev = getPrevExperiment(CURRENT_ID);
    const next = getNextExperiment(CURRENT_ID);
    const current = getExperimentById(CURRENT_ID);

    useEffect(() => {
        if (!mountRef.current) return;

        // --- Three.js Setup ---
        const scene = new THREE.Scene();
        // Fog for depth cue
        scene.fog = new THREE.FogExp2(isDarkMode ? 0x000000 : 0xffffff, 0.05);
        scene.background = new THREE.Color(isDarkMode ? 0x050505 : 0xf0f0f0);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // --- Geometry ---
        // Create a complex wireframe structure
        const geometry = new THREE.IcosahedronGeometry(2, 4); // High detail

        // We want to render this as points for the bokeh effect
        // But also maybe lines? Let's stick to points for the "blurry particles" look first

        const material = new THREE.ShaderMaterial({
            uniforms: {
                u_time: { value: 0 },
                u_focus: { value: 5.0 }, // Focus distance
                u_aperture: { value: 3.0 }, // Blur strength
                u_maxBlur: { value: 1.0 },
                color: { value: new THREE.Color(isDarkMode ? 0xffffff : 0x000000) }
            },
            vertexShader,
            fragmentShader,
            transparent: true,
            depthTest: false, // Disable depth test for additive-like blending
            blending: THREE.AdditiveBlending
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // Add a second layer for "web" lines (optional, maybe just points is better for bokeh)
        // Let's add a wireframe mesh with simple material for structure
        const wireGeo = new THREE.WireframeGeometry(geometry);
        const wireMat = new THREE.LineBasicMaterial({
            color: isDarkMode ? 0x444444 : 0xcccccc,
            transparent: true,
            opacity: 0.1
        });
        const wireframe = new THREE.LineSegments(wireGeo, wireMat);
        scene.add(wireframe);

        // --- Animation ---
        const startTime = performance.now();

        const animate = () => {
            const time = (performance.now() - startTime) / 1000;

            points.rotation.y = time * 0.1;
            points.rotation.x = time * 0.05;

            wireframe.rotation.y = time * 0.1;
            wireframe.rotation.x = time * 0.05;

            // Animate focus
            material.uniforms.u_time.value = time;
            // material.uniforms.u_focus.value = 5.0 + Math.sin(time * 0.5) * 2.0;

            renderer.render(scene, camera);
            animationRef.current = requestAnimationFrame(animate);
        };
        animate();

        // --- Interaction ---
        const onMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;

            // Rotate based on mouse
            points.rotation.y += x * 0.01;
            points.rotation.x += y * 0.01;

            // Change focus based on mouse Y
            // material.uniforms.u_focus.value = 3.0 + (e.clientY / window.innerHeight) * 5.0;
        };
        window.addEventListener('mousemove', onMouseMove);

        // --- Resize ---
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);

        // --- Cleanup ---
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [isDarkMode]);

    // Keyboard Nav
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
        <Container theme={theme}>
            <div ref={mountRef} />
            <Title theme={theme}>
                {`${CURRENT_ID.toUpperCase()}: ${current?.name || 'Web'}`}
            </Title>
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
        </Container>
    );
};

export default WebExperiment;
