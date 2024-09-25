import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";

import { FeaturesData } from "../data/FeaturesData";
import SectionWrapper from "../hoc/SectionWrapper";
import { textVariant } from "../styles/motion";
import styled, { useTheme } from "styled-components"; // Import useTheme

// Reuse the AnimatedText component from the Content page
const AnimatedText = ({ text }) => {
  const letters = text.split("");

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="text-left font-montserrat text-4xl font-bold"
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Styled components for dark and light mode
const FeaturesWrapper = styled.div`
  background: ${({ theme }) => theme?.background || "#f9fafb"};
  padding: 50px 20px;
  min-height: 100vh;
  transition: background 0.3s ease-in-out;
`;

const FeaturesCardContainer = styled(VerticalTimelineElement)`
  .vertical-timeline-element-content {
    background: ${({ theme }) => theme?.cardBackground || "#fff"};
    color: ${({ theme }) => theme?.cardTextColor || "#000"};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
  }
`;

const FeaturesCard = ({ feature }) => {
  return (
    <FeaturesCardContainer
      contentArrowStyle={{ borderRight: "7px solid #232631" }}
      iconStyle={{
        background: feature.iconBg,
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
      }}
      icon={
        <div style={{ fontSize: "30px", transform: "translateY(5px)" }}>
          {feature.icon}
        </div>
      }
    >
      <h3 className="text-[24px] font-bold">{feature.title}</h3>
      <ul className="list-disc ml-5 space-y-2">
        {feature.points.map((point, index) => (
          <li key={`feature-point-${index}`} className="text-[14px] font-montserrat">
            {point}
          </li>
        ))}
      </ul>
    </FeaturesCardContainer>
  );
};

const Features = () => {
  const theme = useTheme(); // Access theme via useTheme

  const lineColor = theme?.lineColor || "gray"; // Provide default value if theme.lineColor is undefined

  return (
    <FeaturesWrapper theme={theme}>
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
      >
        {/* Reuse AnimatedText and pass the appropriate color from the theme */}
        <div style={{ color: theme.textColor }}> {/* Apply textColor from theme */}
          <AnimatedText text="Explore and manage your databases." />
        </div>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline lineColor={lineColor}>
          {FeaturesData.map((feature, index) => (
            <FeaturesCard key={`feature-${index}`} feature={feature} />
          ))}
        </VerticalTimeline>
      </div>
    </FeaturesWrapper>
  );
};

export default SectionWrapper(Features, "features");
