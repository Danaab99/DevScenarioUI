import React from 'react';
import { motion } from 'framer-motion';
import { textVariant } from '../styles/motion';
import {testimonialsData } from '../data/TestimonialsData'
import SectionWrapper from '../hoc/SectionWrapper';

const TestimonialsCard = ({ testimonial }) => (
  <motion.div
    className="bg-gray-800 text-white p-6 rounded-lg shadow-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <p className="text-xl italic">"{testimonial.text}"</p>
    <div className="mt-4">
      <h3 className="text-lg font-semibold">{testimonial.name}</h3>
      <p className="text-gray-400">{testimonial.title}</p>
    </div>
  </motion.div>
);

const Testimonials = () => {
  return (
    <div className="py-20 px-10 bg-gray-100">
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }} // Retriggers the animation when in view
      >
        <p className="text-left font-montserrat text-4xl font-bold text-black">
          What Our Clients Say
        </p>
        
      </motion.div>

      <div className="mt-10 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {testimonialsData.map((testimonial, index) => (
          <TestimonialsCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Testimonials, "testimonials")
