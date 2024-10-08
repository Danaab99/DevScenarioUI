import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar"; // Adjust path if needed
import Dropdown from "./components/Dropdown"; // Adjust path if needed
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import AppsPage from './pages/applications/AppsPage';
import NewApplication from "./pages/applications/NewApplication";
import InquiriesPage from './pages/inquiries/InquiriesPage';
import StatusLevelsPage from './pages/statusLevel/StatusLevelsPage';
import ApplicationsEdit from './pages/applications/ApplicationEdit';
import ViewApplication from "./pages/applications/ViewApplication";
import ViewInquiry from "./pages/inquiries/ViewInquiry";
import EditInquiry from "./pages/inquiries/EditInquiry";
import NewInquiry from "./pages/inquiries/NewInquiry";
import NewStatusLevel from "./pages/statusLevel/NewStatusLevel";
import EditStatusLevel from "./pages/statusLevel/EditStatusLevel";
import ViewStatusLevel from "./pages/statusLevel/ViewStatusLevel";
import { animateScroll as scroll } from "react-scroll";
import Dashboard from "./components/Dashboard";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from './Theme';
import Button from "./components/Button";

const pageTransition = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, x: -100, transition: { duration: 0.6 } },
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Track if dark mode is enabled

  const [scrollTarget, setScrollTarget] = useState(null); // Track the scroll target
  const location = useLocation();
  const navigate = useNavigate();

  // Toggle function to open/close the dropdown
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // Switch between dark and light mode
  };


  // Scroll to the target after page load/transition
  useEffect(() => {
    if (location.pathname === "/" && scrollTarget) {
      const timeout = setTimeout(() => {
        if (scrollTarget === "contact") {
          scroll.scrollToBottom({ smooth: true, duration: 500 });
        } else {
          const targetElement = document.getElementById(scrollTarget);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }
        }
        setScrollTarget(null); // Clear the scroll target after scrolling
      }, 600); // Delay to ensure the page transition completes

      return () => clearTimeout(timeout);
    }
  }, [location.pathname, scrollTarget]);

  // Handle navigation to sections with scroll
  const handleNavigation = (target) => {
    if (location.pathname !== "/") {
      setScrollTarget(target); // Set scroll target if not on the landing page
      navigate("/"); // Navigate to landing page
    } else {
      // If already on the landing page, scroll immediately
      const targetElement = document.getElementById(target);
      if (target === "contact") {
        scroll.scrollToBottom({ smooth: true, duration: 500 });
      } else if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
       <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
       <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} toggle={toggle}/> {/* Pass handleNavigation */}
      <Dropdown isOpen={isOpen} toggle={toggle} /> {/* Pass state and toggle to Dropdown */}
    

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
      
        <Route
            path="/dashboard"
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <Dashboard/>
              </motion.div>
            } />
          <Route
            path="/"
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <LandingPage />
                
              </motion.div>
            }
          />
          <Route
            path="/applications"
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <AppsPage />
              </motion.div>
            }
          />
          <Route
            path="/status-levels"
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <StatusLevelsPage />
              </motion.div>
            }
          />
          <Route
            path="/edit/applications/:id"
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <ApplicationsEdit />
              </motion.div>
            }
          />
          <Route
            path="/applications/:id"
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <ViewApplication />
              </motion.div>
            }
          />
          <Route
            path="/create"
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <NewApplication />
              </motion.div>
            }
          />
          <Route
            path="/inquiries"
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <InquiriesPage />
              </motion.div>
            }
          />
          <Route
            path="/inquiries/:id"
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <ViewInquiry />
              </motion.div>
            }
          />
          <Route
            path="/edit/inquiries/:id"
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <EditInquiry />
              </motion.div>
            }
          />
          <Route
            path="/create-inquiry"
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <NewInquiry />
              </motion.div>
            }
          />
          <Route
            path="/create-status-level"
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <NewStatusLevel />
              </motion.div>
            }
          />
          <Route
            path="/edit/status-levels/:id"
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <EditStatusLevel />
              </motion.div>
            }
          />
          <Route
            path="/status-levels/:id"
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <ViewStatusLevel />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>

      <Footer />
      </ThemeProvider>
    
    </>
  );
}

export default App;
