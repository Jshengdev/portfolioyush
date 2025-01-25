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
    reset: { 
        x: -160, 
        y: -100,
        opacity: 1,
        skewX: -25,
    },  
};

const Line = () => {
    const location = useLocation();
    const [animation, setAnimation] = useState('reset'); // Set initial state to 'reset'

    useEffect(() => {
        if (location.pathname === '/') {
            setAnimation('reset'); // original home page
        } else if (location.pathname === '/about') {
            setAnimation('about'); // Move the line to the about position
        } else if (location.pathname === '/projects') {
            setAnimation('projects'); // Move the line to the projects position
        } else if (location.pathname.startsWith('/projects/')) {
            setAnimation('projectSht');
        }
    }, [location.pathname]);

    return (
        <LineStyled
            variants={lineVariants}
            initial="reset"
            animate={animation}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
    );
};

export default Line;
