import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { IoMdArrowRoundForward } from 'react-icons/io'; // Import the arrow

const HeroSection = styled.section`
  height: 100vh;
  max-height: 1100px;
  position: relative;
  overflow: hidden;
`;

const HeroWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 1s ease-in-out; /* Smooth transition for the whole row */
`;

const HeroSlide = styled.div`
  min-width: 100%;
  height: 100%;
  position: relative;
`;

const HeroSlider = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100vh;
    bottom: 0;
    left: 0;
    overflow: hidden;
    opacity: 0.4;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.6) 100%
    );
  }
`;

const HeroImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover; /* Ensures image covers the container */
  transition: opacity 1s ease-in-out;
`;

const HeroContent = styled.div`
  z-index: 10;
  max-width: 1600px;
  width: calc(100% - 100px);
  color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 50px;
  margin-top: auto;
  margin-bottom: 100px;

  h1 {
    font-size: clamp(0.8rem, 6vw, 1.5rem);
    font-weight: 700;
    text-transform: uppercase;
    text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
    text-align: left;
    margin-bottom: 0.8rem;
    line-height: 1.2;
    max-width: 800px;
  }
`;

const Arrow = styled(IoMdArrowRoundForward)`
  margin-left: 0.5rem;
`;

function Hero({ slides }) {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const timeout = useRef(null);

  // Function to move to the next slide
  const nextSlide = () => {
    setCurrent((prevCurrent) => (prevCurrent === length - 1 ? 0 : prevCurrent + 1));
  };

  // Auto-scroll through the slides
  useEffect(() => {
    timeout.current = setTimeout(nextSlide, 5000); // Each image stays for 5 seconds

    return function () {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [current, length]);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <HeroSection>
      <HeroWrapper
        style={{
          transform: `translateX(-${current * 100}%)`, // Moves the whole row of slides
        }}
      >
        {slides.map((slide, index) => (
          <HeroSlide key={index}>
            <HeroSlider>
              <HeroImage src={slide.image} alt={slide.title} />
              <HeroContent>
                <h1>{slide.title}</h1>
                
              </HeroContent>
            </HeroSlider>
          </HeroSlide>
        ))}
      </HeroWrapper>
    </HeroSection>
  );
}

export default Hero;
