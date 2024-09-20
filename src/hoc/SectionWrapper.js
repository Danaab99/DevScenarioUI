import { motion } from "framer-motion";
import { styles } from "../styles/motionStyles";
import { staggerContainer } from "../styles/motion";

const SectionWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()} // Ensure container is animated
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }} // Animation retriggers when in view
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>

        {/* Ensure that the component gets the necessary props */}
        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;
