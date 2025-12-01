import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import * as d3 from 'd3';

// ═══════════════════════════════════════════════════════════════════
// KEYFRAME ANIMATIONS
// ═══════════════════════════════════════════════════════════════════

// Buildings - larger sway movement
const breathe = keyframes`
  0%, 100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  25% {
    transform: translateX(3px) scale(1.01);
  }
  50% {
    transform: translateX(0) scale(1.015);
    opacity: 0.85;
  }
  75% {
    transform: translateX(-3px) scale(1.01);
  }
`;

// Parks - gentle sway
const sway = keyframes`
  0%, 100% {
    transform: translateX(0) rotate(0deg);
  }
  25% {
    transform: translateX(1.5px) rotate(0.4deg);
  }
  75% {
    transform: translateX(-1.5px) rotate(-0.4deg);
  }
`;

// Water - opacity shimmer
const shimmer = keyframes`
  0%, 100% { opacity: 0.18; }
  50% { opacity: 0.28; }
`;

// YouDot breathing with glow - brand rose colors
const breatheYou = keyframes`
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    box-shadow:
      0 0 0 2px rgba(200, 164, 164, 0.35),
      0 0 0 5px rgba(200, 164, 164, 0.15),
      0 0 12px rgba(162, 81, 96, 0.25);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.12);
    box-shadow:
      0 0 0 3px rgba(200, 164, 164, 0.3),
      0 0 0 8px rgba(200, 164, 164, 0.12),
      0 0 20px rgba(162, 81, 96, 0.3);
  }
`;

// YouDot outer ripple rings
const rippleOut = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0.7);
    opacity: 0.5;
    border-width: 1px;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.6);
    opacity: 0;
    border-width: 0.5px;
  }
`;

// Organic ripple for pings
const organicRipple = keyframes`
  0% {
    width: 10px;
    height: 10px;
    opacity: 0.6;
    border-width: 1.5px;
  }
  40% {
    border-width: 1px;
  }
  100% {
    width: 160px;
    height: 160px;
    opacity: 0;
    border-width: 0.5px;
  }
`;

// Radar sweep animation
const radarSweep = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
    opacity: 0.7;
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
    opacity: 0;
  }
`;

// Organic fade for pebblers - subtle presence, ease out
const organicFade = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  20% {
    opacity: 0.35;
    transform: translate(-50%, -50%) scale(1);
  }
  70% {
    opacity: 0.35;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
`;

// ═══════════════════════════════════════════════════════════════════
// STYLED COMPONENTS
// ═══════════════════════════════════════════════════════════════════

const MapOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70vw;
  height: 70vh;
  max-width: 800px;
  max-height: 600px;
  background-color: #F5F2EB;
  z-index: 500;
  display: ${props => props.$visible ? 'block' : 'none'};
  overflow: hidden;
  cursor: crosshair;
  border-radius: 4px;
  border: 1px solid rgba(122, 110, 93, 0.3);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);

  /* Postcard paper texture grain */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    opacity: 0.12;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    mix-blend-mode: multiply;
  }

  /* Secondary fine grain layer */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;
    opacity: 0.08;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fine'%3E%3CfeTurbulence type='turbulence' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fine)'/%3E%3C/svg%3E");
    mix-blend-mode: overlay;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(245, 240, 232, 0.9);
  border: 1px solid rgba(162, 81, 96, 0.3);  /* Brand dark rose */
  color: #A25160;  /* Brand dark rose */
  padding: 6px 12px;
  font-size: 9px;
  letter-spacing: 1.5px;
  cursor: pointer;
  font-family: inherit;
  z-index: 100;
  backdrop-filter: blur(4px);

  &:hover {
    border-color: rgba(162, 81, 96, 0.6);
    background: rgba(200, 164, 164, 0.2);  /* Light rose tint */
  }
`;

const YouDot = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 8px;
  height: 8px;
  background: #A25160;  /* Brand dark rose */
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
  box-shadow:
    0 0 0 2px rgba(200, 164, 164, 0.35),
    0 0 0 5px rgba(200, 164, 164, 0.15),
    0 0 12px rgba(162, 81, 96, 0.25);
  animation: ${breatheYou} 3s ease-in-out infinite;

  /* Outer ripple rings */
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    border: 1px solid rgba(162, 81, 96, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  &::before {
    width: 20px;
    height: 20px;
    animation: ${rippleOut} 4s ease-out infinite;
  }

  &::after {
    width: 32px;
    height: 32px;
    animation: ${rippleOut} 4s ease-out infinite 1.2s;
  }
`;

const PebblerDot = styled.div`
  position: absolute;
  width: 16px;
  height: 11px;
  background-image: url('/assets/pebl/rockicon.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: translate(-50%, -50%);
  z-index: 40;
  opacity: 0;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))
          sepia(0.3)
          hue-rotate(${props => props.$hue || 0}deg)
          saturate(0.8);
  animation: ${organicFade} 6s ease-in-out forwards;
  cursor: pointer;
  pointer-events: auto;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
              opacity 0.3s ease-out,
              filter 0.3s ease;

  &:hover {
    transform: translate(-50%, -70%) scale(1.4);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25))
            brightness(0.7)
            hue-rotate(${props => props.$hue || 0}deg)
            saturate(1.2);
    animation-play-state: paused;
    opacity: 1 !important;
  }
`;

const PingRipple = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border: 1px solid rgba(162, 81, 96, 0.6);  /* Brand dark rose */
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 30;
  pointer-events: none;
  animation: ${organicRipple} 1.6s ease-out forwards;
`;

const RadarScan = styled.div`
  position: absolute;
  width: 480px;
  height: 480px;
  transform: translate(-50%, -50%);
  z-index: 25;
  pointer-events: none;
  animation: ${radarSweep} 1.4s ease-out forwards;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 1px;
    background: linear-gradient(90deg,
      rgba(116, 133, 108, 0.9) 0%,
      rgba(116, 133, 108, 0.5) 50%,
      rgba(116, 133, 108, 0) 100%);  /* #74856C */
    transform-origin: left center;
  }
`;

const MapHint = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  color: #74856C;  /* Brand sage green */
  font-size: 7px;
  font-weight: 300;
  letter-spacing: 1.5px;
  opacity: 0.6;
  text-transform: uppercase;
  z-index: 60;
  pointer-events: none;
`;

const IndexBox = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 60;
  pointer-events: none;

  h3 {
    font-family: 'Cubao Wide', 'Cubao', serif;
    font-size: 14px;
    color: #A25160;  /* Brand dark rose */
    margin: 0;
    letter-spacing: 0.5px;
    text-transform: lowercase;
  }
`;

const LoadingIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #74856C;  /* Brand sage green */
  font-size: 10px;
  letter-spacing: 2px;
  opacity: 0.7;
  z-index: 20;
`;

const ParallaxContainer = styled.div`
  position: absolute;
  top: -30px;
  left: -30px;
  width: calc(100% + 60px);
  height: calc(100% + 60px);
  pointer-events: none;
  z-index: 10;
  transform: translate(${props => props.$offsetX || 0}px, ${props => props.$offsetY || 0}px);
  transition: transform 0.15s ease-out;
`;

const OSMLayer = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /* Building glow - static, stays in place */
  .building-glow {
    opacity: 1;
  }

  /* Building main stroke - animated with big sway */
  .building {
    transform-origin: center;
    animation: ${breathe} 3s ease-in-out infinite;
    animation-delay: var(--stagger, 0s);
  }

  /* Park swaying animation */
  .park {
    transform-origin: center;
    animation: ${sway} 6s ease-in-out infinite;
  }

  /* Water shimmer animation */
  .water {
    animation: ${shimmer} 3s ease-in-out infinite;
  }

  /* Roads - visible, no animation for clarity */
  .road {
    opacity: 1;
  }
`;

// ═══════════════════════════════════════════════════════════════════
// DEFAULT LOCATION (Los Angeles)
// ═══════════════════════════════════════════════════════════════════

const DEFAULT_LOCATION = { lat: 34.0224, lng: -118.2851 };

// ═══════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════

function PeblMap({ visible, onClose }) {
  const svgRef = useRef(null);
  const mapRef = useRef(null);

  // Map state
  const [ripples, setRipples] = useState([]);
  const [pebblers, setPebblers] = useState([]);
  const [radarScans, setRadarScans] = useState([]);
  const [mapLoading, setMapLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [osmData, setOsmData] = useState(null);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // Parallax effect - subtle map shift on cursor movement
  const handleMouseMove = useCallback((e) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();

    // Calculate cursor position relative to center (-0.5 to 0.5)
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;

    // Max offset in pixels (how far the map can shift)
    const maxOffset = 30;

    setParallaxOffset({
      x: -xRatio * maxOffset,
      y: -yRatio * maxOffset
    });
  }, []);

  // Reset parallax when cursor leaves
  const handleMouseLeave = useCallback(() => {
    setParallaxOffset({ x: 0, y: 0 });
  }, []);

  // Fetch OSM data from Overpass API with fallback servers
  const fetchOSMData = useCallback(async (lat, lng) => {
    const radius = 400; // meters (reduced for faster response)
    const query = `
      [out:json][timeout:25];
      (
        way["building"](around:${radius},${lat},${lng});
        way["leisure"="park"](around:${radius},${lat},${lng});
        way["highway"~"primary|secondary|tertiary|residential"](around:${radius},${lat},${lng});
      );
      out body; >; out skel qt;
    `;

    // Multiple Overpass API servers for fallback
    const servers = [
      'https://overpass-api.de/api/interpreter',
      'https://overpass.kumi.systems/api/interpreter',
    ];

    for (const server of servers) {
      try {
        console.log('Fetching OSM data from:', server);
        const response = await fetch(server, {
          method: 'POST',
          body: `data=${encodeURIComponent(query)}`,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        if (!response.ok) {
          console.log('Server responded with:', response.status);
          continue; // Try next server
        }

        const data = await response.json();
        console.log('OSM data received:', data.elements?.length, 'elements');
        return data;
      } catch (error) {
        console.error('OSM fetch error from', server, ':', error.message);
        continue; // Try next server
      }
    }

    console.error('All Overpass servers failed');
    return null;
  }, []);

  // Convert OSM data to GeoJSON
  const osmToGeoJSON = useCallback((osmData) => {
    if (!osmData?.elements) return { buildings: [], parks: [], water: [], roads: [] };

    const nodes = {};
    osmData.elements.forEach(el => {
      if (el.type === 'node') nodes[el.id] = [el.lon, el.lat];
    });

    const buildings = [], parks = [], water = [], roads = [];

    osmData.elements.forEach(el => {
      if (el.type === 'way' && el.nodes) {
        const coords = el.nodes.map(id => nodes[id]).filter(Boolean);
        const tags = el.tags || {};

        if (tags.highway && coords.length >= 2) {
          roads.push({
            type: 'Feature',
            geometry: { type: 'LineString', coordinates: coords },
            properties: { highway: tags.highway }
          });
        } else if (coords.length >= 3) {
          const closed = [...coords];
          if (closed[0][0] !== closed[closed.length-1][0] || closed[0][1] !== closed[closed.length-1][1]) {
            closed.push(closed[0]);
          }
          const feature = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [closed] }, properties: tags };

          if (tags.building) buildings.push(feature);
          else if (tags.leisure === 'park' || tags.landuse === 'grass') parks.push(feature);
          else if (tags.natural === 'water') water.push(feature);
        }
      }
    });

    console.log('GeoJSON:', buildings.length, 'buildings,', parks.length, 'parks,', roads.length, 'roads');
    return { buildings, parks, water, roads };
  }, []);

  // Get user location
  const getUserLocation = useCallback(() => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(DEFAULT_LOCATION);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          resolve(DEFAULT_LOCATION);
        },
        { timeout: 5000, enableHighAccuracy: false }
      );
    });
  }, []);

  // Load map data when map opens
  useEffect(() => {
    if (!visible || osmData) return;

    const loadMap = async () => {
      setMapLoading(true);

      // Get user's actual location
      const location = await getUserLocation();
      console.log('Got location:', location);
      setUserLocation(location);

      // Fetch OSM data for that location
      const data = await fetchOSMData(location.lat, location.lng);

      if (data?.elements?.length > 0) {
        const geojson = osmToGeoJSON(data);
        setOsmData({ ...geojson, center: location });
      } else {
        setOsmData({ buildings: [], parks: [], water: [], roads: [], center: location });
      }

      setMapLoading(false);
    };

    loadMap();
  }, [visible, osmData, getUserLocation, fetchOSMData, osmToGeoJSON]);

  // Render OSM data to SVG
  useEffect(() => {
    if (!osmData || !svgRef.current || !visible) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = window.innerWidth;
    const height = window.innerHeight;
    svg.attr('width', width).attr('height', height);

    // Add hand-drawn filter defs
    const defs = svg.append('defs');

    // Hand-drawn displacement filter
    const handDrawnFilter = defs.append('filter')
      .attr('id', 'handDrawn')
      .attr('x', '-5%')
      .attr('y', '-5%')
      .attr('width', '110%')
      .attr('height', '110%');

    handDrawnFilter.append('feTurbulence')
      .attr('type', 'fractalNoise')
      .attr('baseFrequency', '0.02')
      .attr('numOctaves', '2')
      .attr('result', 'noise');

    handDrawnFilter.append('feDisplacementMap')
      .attr('in', 'SourceGraphic')
      .attr('in2', 'noise')
      .attr('scale', '1.2')
      .attr('xChannelSelector', 'R')
      .attr('yChannelSelector', 'G');

    const allFeatures = [...osmData.buildings, ...osmData.parks, ...osmData.water, ...osmData.roads].filter(Boolean);
    if (allFeatures.length === 0) return;

    // Projection centered on user location (3.5x zoom)
    const scale = 4500000;
    const projection = d3.geoMercator()
      .center([osmData.center.lng, osmData.center.lat])
      .scale(scale)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Water FIRST (background layer) - SANAA transparency
    osmData.water.forEach(f => {
      const d = path(f);
      if (d) {
        svg.append('path')
          .attr('d', d)
          .attr('fill', 'rgba(154, 175, 175, 0.18)')
          .attr('stroke', 'none')
          .attr('class', 'water');
      }
    });

    // Parks - sage green tint (#74856C / #DADED3)
    osmData.parks.forEach(f => {
      const d = path(f);
      if (d) {
        svg.append('path')
          .attr('d', d)
          .attr('fill', 'rgba(218, 222, 211, 0.35)')  // #DADED3
          .attr('stroke', 'rgba(116, 133, 108, 0.5)')  // #74856C
          .attr('stroke-width', 0.6)
          .attr('stroke-dasharray', '2,2')
          .attr('filter', 'url(#handDrawn)')
          .attr('class', 'park');
      }
    });

    // Buildings - light glow base + darker moving stroke
    osmData.buildings.forEach((f, index) => {
      const d = path(f);
      if (d) {
        // Glow layer - light rose, stays static
        svg.append('path')
          .attr('d', d)
          .attr('fill', 'none')
          .attr('stroke', 'rgba(200, 164, 164, 0.45)')  // #C8A4A4
          .attr('stroke-width', 2.5)
          .attr('stroke-linejoin', 'round')
          .attr('filter', 'url(#handDrawn)')
          .attr('class', 'building-glow');
        // Main stroke - dark rose, animates
        svg.append('path')
          .attr('d', d)
          .attr('fill', 'none')
          .attr('stroke', 'rgba(162, 81, 96, 0.85)')  // #A25160
          .attr('stroke-width', 0.5)
          .attr('stroke-linejoin', 'round')
          .attr('filter', 'url(#handDrawn)')
          .attr('class', 'building')
          .style('--stagger', `${(index % 20) * 0.15}s`);
      }
    });

    // Roads LAST (on top) - hierarchy by type
    osmData.roads.forEach(f => {
      const d = path(f);
      if (d) {
        const roadType = f.properties?.highway || 'residential';
        const isPrimary = roadType === 'primary' || roadType === 'secondary';
        svg.append('path')
          .attr('d', d)
          .attr('fill', 'none')
          .attr('stroke', isPrimary ? 'rgba(70, 60, 45, 0.8)' : 'rgba(80, 70, 55, 0.65)')
          .attr('stroke-width', isPrimary ? 2.2 : 1.2)
          .attr('stroke-linecap', 'round')
          .attr('filter', 'url(#handDrawn)')
          .attr('class', 'road');
      }
    });

    console.log('Map rendered:', osmData.buildings.length, 'buildings');
  }, [osmData, visible]);

  // Handle map ping
  const handleMapClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Add ripple
    const rippleId = Date.now();
    setRipples(prev => [...prev, { id: rippleId, x, y }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== rippleId));
    }, 1600);

    // Add radar scan
    const radarId = Date.now() + 1;
    setRadarScans(prev => [...prev, { id: radarId, x, y }]);
    setTimeout(() => {
      setRadarScans(prev => prev.filter(r => r.id !== radarId));
    }, 1200);

    // Spawn pebblers with color variety (hue rotation values)
    // Rose: -10 to 10, Sage: 80-100, Taupe: 25-40, Warm: 15-30
    const hues = [0, 5, -5, 90, 95, 30, 35, 20, 85];
    const newPebblers = [];
    const count = 3 + Math.floor(Math.random() * 3); // 3-5 pebblers

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 8 + Math.random() * 20;
      newPebblers.push({
        id: Date.now() + i,
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        hue: hues[Math.floor(Math.random() * hues.length)],
      });
    }

    setPebblers(prev => [...prev, ...newPebblers]);
    setTimeout(() => {
      setPebblers(prev => prev.filter(p => !newPebblers.find(np => np.id === p.id)));
    }, 6000);
  }, []);

  return (
    <MapOverlay
      ref={mapRef}
      $visible={visible}
      onClick={handleMapClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Parallax container - map, YouDot, and pebblers move together */}
      <ParallaxContainer
        $offsetX={parallaxOffset.x}
        $offsetY={parallaxOffset.y}
      >
        <OSMLayer ref={svgRef} />

        {/* Radar scan - thin green sweep line */}
        {radarScans.map(scan => (
          <RadarScan
            key={scan.id}
            style={{ left: `${scan.x}%`, top: `${scan.y}%` }}
          />
        ))}

        {/* Ping ripples - tied to map */}
        {ripples.map(ripple => (
          <PingRipple
            key={ripple.id}
            style={{ left: `${ripple.x}%`, top: `${ripple.y}%` }}
          />
        ))}

        {/* Pebblers - tied to map */}
        {pebblers.map(pebbler => (
          <PebblerDot
            key={pebbler.id}
            $hue={pebbler.hue}
            style={{ left: `${pebbler.x}%`, top: `${pebbler.y}%` }}
          />
        ))}

        <YouDot />
      </ParallaxContainer>

      {/* Loading indicator */}
      {mapLoading && (
        <LoadingIndicator>MAPPING AREA...</LoadingIndicator>
      )}


      {/* Index box - top left */}
      <IndexBox>
        <h3>stalk your pebl ppl</h3>
      </IndexBox>

      {/* Hint */}
      <MapHint>tap to ping nearby pebblers</MapHint>

      {/* Close button */}
      <CloseButton onClick={(e) => { e.stopPropagation(); onClose(); }}>CLOSE</CloseButton>
    </MapOverlay>
  );
}

export default PeblMap;
