import React , {useState} from "react";
import Navbar from "../components/Navbar";
import Hero from '../components/Hero';
import { SliderData } from "../data/SliderData";
import Testimonials from "../components/Testimonials";
import Features from "../components/Features";
import Content from "../components/Content";
import { lightTheme, darkTheme } from "../Theme";

function LandingPage() {
  
    return (
      <>
        <Hero slides={SliderData} />
        <section id="content">
        <Content />
        </section>
        <section id="features"> {/* Add this ID */}
        <Features />
        </section>
        <Testimonials />
      </>
    );
  }
  
  export default LandingPage;