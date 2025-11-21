import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const LineStyled = styled(motion.div)`
    position: absolute;
    top: 0px;
    right: 30%;
    height: 250vh;
    width: 2px;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 9999;
`;

const SecondLine = styled(motion.div)`
    position: absolute;
    top: 0px;
    right: 25%;
    height: 250vh;
    width: 2px;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 9999;
`;

const ThirdLine = styled(motion.div)`
    position: absolute;
    top: 0px;
    right: 25%;
    width: 2px;
    height: 250vh;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 9999;
`;

const LineWithDot = styled(motion.div)`
    position: absolute;
    top: 0px;
    right: 30%;
    height: 15vh;
    width: 2px;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 9999;

    &::after {
        content: '';
        position: absolute;
        width: 15px;
        height: 15px;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        top: 150%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const CLetter = styled(motion.div)`
    position: absolute;
    font-family: work sans;
    font-size: 150px;
    color: rgba(255, 255, 255, 0.5);
    z-index: 9999;
    font-weight: 100;
    pointer-events: none;
`;

const CLetter2 = styled(motion.div)`
    position: absolute;
    font-family: work sans;
    font-size: 150px;
    color: rgba(255, 255, 255, 0.5);
    z-index: 9999;
    font-weight: 100;
    pointer-events: none;
`;

// Consolidated route-based animation configuration
const routeAnimations = {
    '/': {
        line: { x: -160, y: -100, opacity: 1, skewX: -25 },
        secondLine: { opacity: 0, x: -160, y: -100, skewX: -25, height: 250 },
        thirdLine: { opacity: 0, x: -570, y: 200, rotate: 0, height: 100 },
        lineWithDot: { opacity: 0, x: -400, y: -100, rotate: 0 },
        c: { opacity: 0, x: -300, y: -100, rotate: 0 },
        c2: { opacity: 0, x: -100, y: -100, rotate: 0 }
    },
    '/about': {
        line: { x: 150, y: -135, rotate: 90, opacity: 1, skewX: 0, height: 1650 },
        secondLine: { opacity: 1, x: -648, y: 197, rotate: 0, skewX: 20, height: 107 },
        thirdLine: { opacity: 0, x: -570, y: 200, rotate: 0, height: 100 },
        lineWithDot: { opacity: 1, x: 300, y: -135, rotate: 90 },
        c: { opacity: 0, x: -300, y: -100, rotate: 0 },
        c2: { opacity: 0, x: -100, y: -100, rotate: 0 }
    },
    '/archive': {
        line: { x: -800, y: -825, rotate: 90, opacity: 1, skewX: 20, height: 1950 },
        secondLine: { opacity: 1, x: -850, y: -825, rotate: 90, skewX: 20, height: 1950 },
        thirdLine: { opacity: 0, x: -570, y: 200, rotate: 0, height: 100 },
        lineWithDot: { opacity: 1, x: -600, y: -825, rotate: 90 },
        c: { opacity: 0, x: -300, y: -100, rotate: 0 },
        c2: { opacity: 0, x: -100, y: -100, rotate: 0 }
    },
    '/projects': {
        line: { x: -280, y: -235, opacity: 1, skewX: 0 },
        secondLine: { opacity: 1, x: -330, y: -235, skewX: -7, height: 1050 },
        thirdLine: { opacity: 0, x: -570, y: 200, rotate: 0, height: 100 },
        lineWithDot: { opacity: 1, x: -500, y: -235, rotate: 0 },
        c: { opacity: 0, x: -300, y: -100, rotate: 0 },
        c2: { opacity: 0, x: -100, y: -100, rotate: 0 }
    },
    '/contact': {
        line: { x: -555, y: 200, rotate: -25, opacity: 1, height: 100 },
        secondLine: { opacity: 1, x: -648, y: 197, rotate: 0, skewX: 20, height: 107 },
        thirdLine: { opacity: 1, x: -670, y: 200, rotate: 20 },
        lineWithDot: { opacity: 1, x: -360, y: 150, rotate: 6 },
        c: { opacity: 1, x: 475, y: 128, rotate: 140 },
        c2: { opacity: 1, x: 475, y: 139, rotate: -40 }
    },
    '/projects/*': {
        line: { x: -865, y: -235, opacity: 1, skewX: 0 },
        secondLine: { opacity: 1, x: -915, y: -235, skewX: 0, height: 250 },
        thirdLine: { opacity: 0, x: -570, y: 200, rotate: 0, height: 100 },
        lineWithDot: { opacity: 1, x: -1100, y: -235, rotate: 0 },
        c: { opacity: 0, x: -300, y: -100, rotate: 0 },
        c2: { opacity: 0, x: -100, y: -100, rotate: 0 }
    }
};

const Line = () => {
    const location = useLocation();

    // Determine which animation set to use based on current route
    const getRouteKey = () => {
        if (location.pathname.startsWith('/projects/')) return '/projects/*';
        return location.pathname;
    };

    const routeKey = getRouteKey();
    const animations = routeAnimations[routeKey] || routeAnimations['/'];

    const transition = { duration: 1.5, ease: 'easeInOut' };

    return (
        <>
            <LineStyled
                initial={routeAnimations['/'].line}
                animate={animations.line}
                transition={transition}
            />
            <SecondLine
                initial={routeAnimations['/'].secondLine}
                animate={animations.secondLine}
                transition={transition}
            />
            <ThirdLine
                initial={routeAnimations['/'].thirdLine}
                animate={animations.thirdLine}
                transition={transition}
            />
            <LineWithDot
                initial={routeAnimations['/'].lineWithDot}
                animate={animations.lineWithDot}
                transition={transition}
            />
            <CLetter
                initial={routeAnimations['/'].c}
                animate={animations.c}
                transition={transition}
            >
                C
            </CLetter>
            <CLetter2
                initial={routeAnimations['/'].c2}
                animate={animations.c2}
                transition={transition}
            >
                C
            </CLetter2>
        </>
    );
};

export default Line;
