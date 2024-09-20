import React from "react";
import Navbar from "../components/Navbar";
import Hero from '../components/Hero';
import { SliderData } from "../data/SliderData";
import Testimonials from "../components/Testimonials";
import Features from "../components/Features";
import Content from "../components/Content";

function LandingPage() {
    return (
      <>
        <Hero slides={SliderData} />
        <Content />
        <section id="features"> {/* Add this ID */}
          <Features />
        </section>
        <Testimonials />
      </>
    );
  }
  
  export default LandingPage;