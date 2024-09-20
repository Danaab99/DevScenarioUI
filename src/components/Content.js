import React, { useState, useEffect, useRef } from "react";
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from "../styles/motion";
import SectionWrapper from '../hoc/SectionWrapper';
import { ContentData } from "../data/ContentData";
// Content Card component for displaying each card
import { Link } from "react-router-dom"; // Import Link
// Letter animation variants for Framer Motion
const letterVariant = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.05, // Delay each letter by 0.05 seconds
    },
  }),
};



// Content Card component for displaying each card
const ContentCard = ({ index, title, icon, path }) => {
  return (
    <Link to={path}> {/* Wrap the card with a Link */}
      <Tilt className="xs:w-[250px] sm:w-[300px] w-full">
        <motion.div
          variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }} // Retrigger card animations
          className="w-full bg-gradient-to-r from-gray-800 to-black p-[1px] rounded-[20px] shadow-card"
        >
          <div className="bg-gray-900 rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
            <div className="text-white text-4xl">{icon}</div>
            <h3 className="text-white text-sm font-bold text-center">{title}</h3>
          </div>
        </motion.div>
      </Tilt>
    </Link>
  );
};

// Animated text component with intersection observer
// Animated text component with intersection observer
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
        className="text-left font-montserrat text-4xl font-bold text-black "
      >
        {letters.map((letter, i) => (
          <motion.span key={i} custom={i} variants={letterVariant}>
            {letter}
          </motion.span>
        ))}
      </motion.div>
    );
  }
  
// Main Content component
function Content() {
  return (
    <>
      

      {/* Animated "See all tables" Text */}
      <AnimatedText text="See all the tables that you need in 1 click." />

      {/* Card Section */}
      <div className="mt-20 flex flex-wrap gap-10 justify-center">
        {ContentData.map((item, index) => (
          <ContentCard key={item.title} index={index} {...item} />
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(Content, "content");
