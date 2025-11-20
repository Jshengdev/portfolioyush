import React from "react";
import styled, { keyframes } from "styled-components";


const autoRun = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;

const Main = styled.main`
  width: min(1460px, 100vw);
  margin: auto;
  transform: translateX(-4.2%);
`

const Slider = styled.div`
  display: flex;
  width: 100%;
  height: var(--height);
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, #000 70%, #000 100%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, #000 30%, #000 60%, transparent);
`;

const SliderList = styled.div`
  display: flex;
  align-items: left;
  animation: ${autoRun} 12s linear infinite; 
  white-space: nowrap; 
  
`;

const SliderItem = styled.div`
  width: var(--width);
  height: var(--height);
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  font-family: "Ade", sans-serif;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 7px;
  font-size: 20px;
  text-align: center;
  padding: 0 40px; 
`;

const PositionLabel = styled.div`
  font-size: 12px;
  font-family: "ade";
  color: rgba(255, 255, 255, 0.2);
  margin-bottom: 20px; 
  margin-top: 20px; 
`;

const AppSlider = () => {
  const items = [
    "BATMANN",
    "DESIGNER",
    "FILMMAKER",
    "CREATOR",
    "DIRECTOR",
    "DEVELOPER",
    "BUILDER",
    "STORYTELLER", 
  ];

  const sliderHeight = 150; 
  const itemWidth = 150; 


  const duplicatedItems = [...items, ...items]; 

  return (
    <Main>
      <Slider style={{ "--height": `${sliderHeight}px` }}>
        <SliderList style={{ "--width": `${itemWidth}px` }}>
          {duplicatedItems.map((item, index) => (
            <SliderItem
              key={index}
              style={{
                "--width": `${itemWidth}px`,
                "--height": `${sliderHeight}px`,
                "--position": index + 1,
              }}
            >
              <PositionLabel>xxxxxxxx____+-=_=-++___++-!!!+-=___=-+!!!!++++=_!!+=-xxxxx+=-=-____+-=_=-++___++-!!!+-=-------+!++++=_=_!!!--------------</PositionLabel>
              {item}
              <PositionLabel>____-+_+-!!=_+=+=-=-____+-=_=-__++-!!!+-=___=-+!!!!+++=!!!==-=++=!!!_!!=_+=-=-!!+-=_=-===----_=_=_=-=-+-=_=-=___</PositionLabel>
            </SliderItem>
          ))}
        </SliderList>
      </Slider>
    </Main>
  );
};

export default AppSlider;
