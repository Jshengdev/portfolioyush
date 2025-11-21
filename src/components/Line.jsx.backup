import React, { useEffect, useState } from 'react';
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

const WavyLine = styled(motion.div)`
    position: absolute;
    top: 0px;
    right: 30%;
    height: 250vh;
    width: 2px;
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

const lineVariants = {
    projectSht: {
        x: -865,
        y: -235,
        opacity: 1,
        skewX: 0,
    },
    projects: { 
        x: -280,
        y: -235, 
        opacity: 1,
        skewX: 0,
    },
    about: { 
        x: 150,
        y: -135,
        rotate: 90, 
        opacity: 1,
        skewX: 0,
        height: 1650,
    },
    archive: { 
        x: -800,
        y: -825,
        rotate: 90, 
        opacity: 1,
        skewX: 20,
        height: 1950,
    },    
    contact: { 
        x: -555,
        y: 200,
        rotate: -25, 
        opacity: 1,
        height: 100,
    },
    reset: { 
        x: -160, 
        y: -100,
        opacity: 1,
        skewX: -25,
    },  
};

const secondLineVariants = {
    visible: {
        opacity: 1,
        x: -648,
        y: 197,
        rotate: 0,
        skewX: 20,
        height: 107,
    },
    hidden: {
        opacity: 0,
        x: -570,
        y: 200,
        rotate: -7,
        skewX: 20,
        height: 100,
    },
    archive: {
        opacity: 1,
        x: -850,
        y: -825,
        rotate: 90,
        skewX: 20,
        height: 1950,
    },
    projects: {
        opacity: 1,
        x: -330,
        y: -235,
        skewX: -7,
        height: 1050,
    },
    projectSht: {
        opacity: 1,
        x: -915,
        y: -235,
        skewX: 0,
        height: 250,
    },
    reset: {
        opacity: 0,
        x: -160,
        y: -100,
        skewX: -25,
        height: 250,
    }
};

const thirdLineVariants = {
    visible: {
        opacity: 0,
        x: -570,
        y: 200,
        rotate: 0,
    },
    hidden: {
        opacity: 0,
        x: -570,
        y: 200,
        rotate: 0,
        height: 100,
    },
    contact: {
        opacity: 1,
        x: -670,
        y: 200,
        rotate: 20,
    }
};

const cVariants = {
    visible: {
        opacity: 1,
        x: 475,
        y: 128,
        rotate: 140,
    },
    hidden: {
        opacity: 0,
        x: -800,
        y: 100,
        rotate: 0,
    },
    reset: {
        opacity: 0,
        x: -300,
        y: -100,
        rotate: 0,
    }
};

const c2Variants = {
    visible: {
        opacity: 1,
        x: 475,
        y: 139,
        rotate: -40,
    },
    hidden: {
        opacity: 0,
        x: -600,
        y: 100,
        rotate: 0,
    },
    reset: {
        opacity: 0,
        x: -100,
        y: -100,
        rotate: 0,
    }
};

const lineWithDotVariants = {
    visible: {
        opacity: 1,
        x: -360,
        y: 150,
        rotate: 6,
    },
    hidden: {
        opacity: 0,
        x: -700,
        y: 200,
        rotate: 0,
    },
    about: {
        opacity: 1,
        x: 300,
        y: -135,
        rotate: 90,
    },
    archive: {
        opacity: 1,
        x: -600,
        y: -825,
        rotate: 90,
    },
    projects: {
        opacity: 1,
        x: -500,
        y: -235,
        rotate: 0,
    },
    projectSht: {
        opacity: 1,
        x: -1100,
        y: -235,
        rotate: 0,
    },
    reset: {
        opacity: 0,
        x: -400,
        y: -100,
        rotate: 0,
    }
};

const Line = () => {
    const location = useLocation();
    const [animation, setAnimation] = useState('reset');
    const [secondLineAnimation, setSecondLineAnimation] = useState('hidden');
    const [thirdLineAnimation, setThirdLineAnimation] = useState('hidden');
    const [cAnimation, setCAnimation] = useState('hidden');
    const [c2Animation, setC2Animation] = useState('hidden');
    const [lineWithDotAnimation, setLineWithDotAnimation] = useState('hidden');

    useEffect(() => {
        if (location.pathname === '/') {
            setAnimation('reset');
            setSecondLineAnimation('reset');
            setThirdLineAnimation('reset');
            setCAnimation('reset');
            setC2Animation('reset');
            setLineWithDotAnimation('reset');
        } else if (location.pathname === '/about') {
            setAnimation('about');
            setSecondLineAnimation('about');
            setThirdLineAnimation('hidden');
            setCAnimation('reset');
            setC2Animation('reset');
            setLineWithDotAnimation('about');
        } else if (location.pathname === '/archive') {
            setAnimation('archive');
            setSecondLineAnimation('archive');
            setThirdLineAnimation('hidden');
            setCAnimation('reset');
            setC2Animation('reset');
            setLineWithDotAnimation('archive');
        } else if (location.pathname === '/projects') {
            setAnimation('projects');
            setSecondLineAnimation('projects');
            setThirdLineAnimation('hidden');
            setCAnimation('reset');
            setC2Animation('reset');
            setLineWithDotAnimation('projects');
        } else if (location.pathname === '/contact') {
            setAnimation('contact');
            setSecondLineAnimation('visible');
            setThirdLineAnimation('contact');
            setCAnimation('visible');
            setC2Animation('visible');
            setLineWithDotAnimation('visible');
        } else if (location.pathname.startsWith('/projects/')) {
            setAnimation('projectSht');
            setSecondLineAnimation('projectSht');
            setThirdLineAnimation('hidden');
            setCAnimation('reset');
            setC2Animation('reset');
            setLineWithDotAnimation('projectSht');
        }
    }, [location.pathname]);

    return (
        <>
            <LineStyled
                variants={lineVariants}
                initial="reset"
                animate={animation}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
            <SecondLine
                variants={secondLineVariants}
                initial="hidden"
                animate={secondLineAnimation}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
            <ThirdLine
                variants={thirdLineVariants}
                initial="hidden"
                animate={thirdLineAnimation}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
            <LineWithDot
                variants={lineWithDotVariants}
                initial="hidden"
                animate={lineWithDotAnimation}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
            <CLetter
                variants={cVariants}
                initial="hidden"
                animate={cAnimation}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
            >
                C
            </CLetter>
            <CLetter2
                variants={c2Variants}
                initial="hidden"
                animate={c2Animation}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
            >
                C
            </CLetter2>
        </>
    );
};

export default Line;
