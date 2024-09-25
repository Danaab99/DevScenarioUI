import React from 'react';
import { motion } from 'framer-motion';
import { textVariant } from '../styles/motion';
import { testimonialsData } from '../data/TestimonialsData';
import SectionWrapper from '../hoc/SectionWrapper';
import styled, { useTheme } from 'styled-components';

// Styled components for dark and light modes
const TestimonialsWrapper = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textColor};
  padding: 50px 20px;
  min-height: 100vh;
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
`;

const TestimonialsCardWrapper = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.cardTextColor};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
`;

const CardText = styled.p`
  font-size: 1.25rem;
  font-style: italic;
`;

const CardName = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  margin-top: 15px;
`;

const CardTitle = styled.p`
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 1rem;
`;

const TestimonialsCard = ({ testimonial }) => (
  <TestimonialsCardWrapper
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <CardText>"{testimonial.text}"</CardText>
    <div className="mt-4">
      <CardName>{testimonial.name}</CardName>
      <CardTitle>{testimonial.title}</CardTitle>
    </div>
  </TestimonialsCardWrapper>
);

const Testimonials = () => {
  const theme = useTheme(); // Use the current theme

  return (
    <TestimonialsWrapper theme={theme}>
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
      >
        <p className="text-left font-montserrat text-4xl font-bold" style={{ color: theme.textColor }}>
          What Our Clients Say
        </p>
      </motion.div>

      <div className="mt-10 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {testimonialsData.map((testimonial, index) => (
          <TestimonialsCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </TestimonialsWrapper>
  );
};

export default SectionWrapper(Testimonials, "testimonials");
