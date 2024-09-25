import React, { useEffect, useRef, useState } from "react";
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { fadeIn } from "../styles/motion";
import SectionWrapper from '../hoc/SectionWrapper';
import { ContentData } from "../data/ContentData";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled Components for themed styling
const ContentWrapper = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textColor};
  min-height: 100vh;
  transition: background 0.3s ease, color 0.3s ease;
  padding: 20px;
`;

const CardContainer = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.cardTextColor};
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centering content */
  align-items: center; /* Centering content */
  transition: background 0.3s ease, color 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 350px;
  min-width: 300px;
  text-align: center;
`;

const CardTitle = styled.h3`
  color: ${({ theme }) => theme.cardTextColor};
  font-size: 1.2rem; /* Smaller text for modern look */
  font-weight: 500; /* Modern font weight */
  margin-top: 15px;
  text-align: center;
  text-decoration: none; /* No underline */
`;

const StyledIcon = styled.div`
  font-size: 4rem; /* Centered icon size */
  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none; /* No underline */
`;

const ContentCard = ({ index, title, icon, path }) => {
  return (
    <StyledLink to={path}> {/* Wrap the card with a Link */}
      <Tilt className="xs:w-[250px] sm:w-[300px] w-full">
        <motion.div
          variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }} // Retrigger card animations
        >
          <CardContainer>
            <StyledIcon>{icon}</StyledIcon> {/* Centered icon */}
            <CardTitle>{title}</CardTitle> {/* Updated title */}
          </CardContainer>
        </motion.div>
      </Tilt>
    </StyledLink>
  );
};

const letterVariant = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.05,
    },
  }),
};

function AnimatedText({ text }) {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(false);
          setTimeout(() => {
            setIsVisible(true);
          }, 200);
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  const letters = text.split("");

  return (
    <motion.div
      ref={textRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="text-left font-montserrat text-4xl font-bold"
    >
      {letters.map((letter, i) => (
        <motion.span key={i} custom={i} variants={letterVariant}>
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
}

function Content() {
  return (
    <ContentWrapper>
      <AnimatedText text="See all the tables that you need in 1 click." />
      <div className="mt-20 flex flex-wrap gap-10 justify-center">
        {ContentData.map((item, index) => (
          <ContentCard key={item.title} index={index} {...item} />
        ))}
      </div>
    </ContentWrapper>
  );
}

export default SectionWrapper(Content, "content");
