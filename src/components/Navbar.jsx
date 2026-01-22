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
    color: ${props => props.theme.colors.text.secondary};
    font-size: 12px;
    font-family: 'ade';
    letter-spacing: 5px;
    cursor: pointer;
    transition: color .3s ease-in;
    &:hover {
        color: ${props => props.theme.colors.text.hover};
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
    const handleArchiveClick = () => {
        navigate('/archive');
    };
    const handleContactClick = () => {
        navigate('/contact');
    };
    const handleResumeClick = () => {
        navigate('/resume');
    };

    return (
        <Section>
            <Container>
                <Links>
                    <List>
                        <ListItem onClick={handleAboutClick}>ABOUT</ListItem>
                        <ListItem onClick={handleProjectClick}>PROJECTS</ListItem>
                        <ListItem onClick={handleArchiveClick}>ARCHIVE</ListItem>
                        <ListItem onClick={handleContactClick}>CONTACT</ListItem>
                        <ListItem onClick={handleResumeClick}>RESUME</ListItem>
                    </List>
                </Links>
            </Container>
        </Section>
    );
};

export default Navbar;
