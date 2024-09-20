import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles/motionStyles";
import { FeaturesData } from "../data/FeaturesData";
import SectionWrapper from "../hoc/SectionWrapper";
import { textVariant } from "../styles/motion";

const FeaturesCard = ({ feature }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "linear-gradient(to right, #111827, #1f2937)", // Black to dark gray gradient
        color: "white", // Text color set to white for contrast
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)", // Added shadow for depth
        borderRadius: "10px", // Rounded corners for aesthetic
      }}
      contentArrowStyle={{ borderRight: "7px solid #232631" }}
      iconStyle={{
        background: feature.iconBg, // Bold color for the circle
        color: "white", // Set icon color to white
        display: "flex", // Ensure flex display for centering
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        width: "60px", // Circle width
        height: "60px", // Circle height
        borderRadius: "50%", // Ensure the circle shape
      }}
      icon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            transform: "translateY(5px)", // Adjust icon slightly downward
          }}
        >
          <div style={{ fontSize: "30px" }}> {/* Adjust icon size */}
            {feature.icon} {/* Render the icon directly */}
          </div>
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{feature.title}</h3>
      </div>

      <ul className="list-disc ml-5 space-y-2">
        {feature.points.map((point, index) => (
          <li
            key={`feature-point-${index}`}
            className="text-white text-[14px] font-montserrat"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Features = () => {
  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #f3f4f6, #e5e7eb)", // Soft light gray gradient
        padding: "50px 20px", // Add padding to fill space
        minHeight: "100vh", // Ensure the section takes the full height of the viewport
      }}
    >
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }} // Ensure animation retriggers
      >
        <p
          className="text-left font-montserrat text-4xl font-bold text-black" // Make it bold
          style={{
            color: "#111827", // Darker text color to match the design
            fontFamily: "Montserrat, sans-serif", // Apply Montserrat font
          }}
        >
          Features
        </p>
        <h2
          className={`${styles.sectionHeadText} text-center font-bold`} // Bold for the heading
          style={{
            color: "#000", // Change to your desired color
            fontFamily: "Montserrat, sans-serif", // Apply Montserrat font
          }}
        >
          Explore and manage your databases.
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline lineColor="gray">
          {FeaturesData.map((feature, index) => (
            <FeaturesCard key={`feature-${index}`} feature={feature} />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default SectionWrapper(Features, "features");
