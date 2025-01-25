import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Section = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`;

const Container = styled.div`
    display: flex;
`;

const Links = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const List = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 50px;
    list-style: none;
`;

const ListItem = styled.li`
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    font-family: 'ade';
    letter-spacing: 5px;
    cursor: pointer;
    transition: color .3s ease-in;
    &:hover {
        color: white;
    }
`;

const Navbar = () => {
    const navigate = useNavigate();

    const handleAboutClick = () => {
        navigate('/about');
    };
    const handleProjectClick = () => {
        navigate('/projects');
    };

    return (
        <Section>
            <Container>
                <Links>
                    <List>
                        <ListItem onClick={handleAboutClick}>ABOUT</ListItem>
                        <ListItem onClick={handleProjectClick}>PROJECTS</ListItem>
                        <ListItem>ARCHIVE</ListItem>
                        <ListItem>CONTACT</ListItem>
                    </List>
                </Links>
            </Container>
        </Section>
    );
};

export default Navbar;
