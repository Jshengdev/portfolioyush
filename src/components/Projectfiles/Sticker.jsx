import React, { useState, useEffect } from "react";
import styled, { keyframes} from "styled-components";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: grid;
  grid-template-columns: 10% 92%;
  width: 100%;
  height: 100vh; 
`;

const Left = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  overflow-y: auto;
  margin-right: 20px;
  margin-top: 20px;
`;

const Right = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.16);
  overflow-y: auto; 
  padding: 0px;
  backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px); 
`;

const Title = styled.h1`
  font-family: 'Work Sans', sans-serif;
  font-weight: 300;
  font-size: 18px;
  letter-spacing: 2px;
  transform-origin: 0 0;
  transform: translateX(15px);
  transition: transform 0.5s, color 0.3s ease-in-out;
  color: rgba(255, 255, 255, 0.7);

  &:hover {
    transform: scale(1.01);
    color: white;
  }
`;

const fadeUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const MarkdownContainer = styled.div`
  width: 100%;
  max-width: 1200px; 
  padding: 2rem;
  color: var(--paragraph-color);
  text-align: center;
  --heading-color: #ffffff; 
  --paragraph-color: #ffffff; 
  --accent-color: #ff8080;  
  --bg-highlight: rgba(255, 255, 255, 0.06); 
  --transition-speed: 0.3s; 
  --font-heading: 'Ade', sans-serif; 
  --font-body: 'Work Sans', sans-serif; 
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);

  h1, 
  h2, 
  h3, 
  h4 {
    font-family: var(--font-heading);
    color: var(--heading-color);
    text-transform: Uppercase; 
    margin-top: 2rem;
    margin-bottom: 1.75rem;
    animation: ${fadeUp} 0.6s ease forwards;
    letter-spacing: 2px;
  }

  h1 {
    font-size: 2.4rem;
    line-height: 1.2;
    margin-top: 2rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.6rem;
  }

  h4 {
    font-size: 1.4rem;
  }

  p {
    font-family: var(--font-body);
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 3rem;
    margin-right: 12rem;
    margin-left: 12rem;
    color: var(--paragraph-color);
    animation: ${fadeUp} 0.8s ease forwards;
  }

  a {
    color: var(--accent-color);
    text-decoration: none;
    position: relative;
    transition: color var(--transition-speed);

    &:hover {
      color: #ffffff;
    }
    &:after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 50%;
      width: 0;
      height: 2px;
      background-color: var(--accent-color);
      transition: all var(--transition-speed) ease;
    }

    &:hover:after {
      left: 0;
      width: 100%;
    }
  }

  ul, ol {
    text-align: left; 
    display: inline-block; 
    margin: 1rem auto;
    padding: 0 1rem;
    font-family: var(--font-body);
    animation: ${fadeUp} 1s ease forwards;
  }

  li {
    margin: .5rem 0;
    list-style-type: disc;
    line-height: 1.0;
  }

  img {
    display: block;
    width: 75%;
    height: auto;
    margin: 1.5rem auto;
    border-radius: 4px;
    transition: transform var(--transition-speed), box-shadow var(--transition-speed);

    box-shadow: 0 4px 15px rgba(0,0,0,0.2);

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    }
  }

  blockquote {
    margin: 2rem auto;
    padding: 1rem 2rem;
    max-width: 800px;
    background-color: var(--bg-highlight);
    border-left: 4px solid var(--accent-color);
    font-family: var(--font-body);
    font-size: 1rem;
    line-height: 1.6;
    color: #f5f5f5;
    box-shadow: inset 0 0 10px rgba(0,0,0,0.1);

    animation: ${fadeUp} 0.5s ease forwards;

    p {
      margin: 0.5rem 0;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;

    h1 {
      font-size: 1.8rem;
    }
    h2 {
      font-size: 1.6rem;
    }
    h3 {
      font-size: 1.4rem;
    }
    p {
      font-size: 16px;
    }
    img {
      width: 80%;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.6rem;
    }
    h2 {
      font-size: 1.4rem;
    }
    p {
      font-size: 15px;
    }
    li {
      font-size: 15px;
    }
  }
`;

const Sticker = () => {
  const [markdown, setMarkdown] = useState("");
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };

  useEffect(() => {
    fetch("/src/components/Projectfiles/stickerContent.md")
      .then((res) => res.text())
      .then((text) => setMarkdown(text))
      .catch((err) => console.error("Error fetching markdown file:", err));
  }, []);

  return (
    <Container>
      <Left>
        <Title onClick={handleHomeClick}>{'<'}1/24/25{'>'}</Title>
        <Title>WORK</Title>
        <Title>IN</Title> 
        <Title>PROGRESS</Title>
      </Left>
      <Right>
        <MarkdownContainer>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </MarkdownContainer>
      </Right>
    </Container>
  );
};

export default Sticker;
