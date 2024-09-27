import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation from React Router
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll"; // Import react-scroll for smooth scrolling
import { Dropdown as AntdDropdown, Menu } from "antd"; // Import Ant Design Dropdown and Menu
import { Button } from "antd"; // Import Ant Design Button

// Styled Components for Dropdown Layout
const DropdownContainer = styled.div`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #f8f8f2;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  top: ${({ isOpen }) => (isOpen ? '0' : '-100%')};`
;

const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
;`

const CloseIcon = styled(FaTimes)`
  color: #000d1a;`
;

const DropdownWrapper = styled.div``;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: column; /* Aligns the buttons vertically */
  justify-content: center;
  align-items: center;
  gap: 20px; /* Adds space between buttons */
;`

// Ant Design Menu for Explore Dropdown Button
function Dropdown({ isOpen, toggle }) {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation
  const location = useLocation(); // To check current page
  const [scrollTarget, setScrollTarget] = useState(null); // State to store the scroll target

  // Handle menu click for Ant Design Dropdown
  const handleMenuClick = ({ key }) => {
    navigate(key); // Navigate to the selected route based on the key
    toggle(); // Close the dropdown after navigating
  };



  // Scroll to target if present after landing page loads
  useEffect(() => {
    if (location.pathname === "/" && scrollTarget) {
      const target = scrollTarget === "footer" ? scroll.scrollToBottom({ smooth: true, duration: 500 }) : scroll.scrollTo(scrollTarget, { duration: 500, smooth: true });
      setScrollTarget(null); // Reset scroll target after scrolling
    }
  }, [location.pathname, scrollTarget]);

  // Define the dropdown menu items for Explore button
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="/applications">Applications</Menu.Item>
      <Menu.Item key="/inquiries">Inquiries</Menu.Item>
      <Menu.Item key="/status-levels">Status Levels</Menu.Item>
    </Menu>
  );

  return (
    <DropdownContainer isOpen={isOpen}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <DropdownWrapper>
        <BtnWrap>
          {/* Explore Button with Ant Design Dropdown */}
          <Button
            type="default"
            size="large"
            shape="round"
            onClick={() => {
              navigate("/"); // Navigate to landing page
              toggle(); // Close the dropdown
            }}
          >
            Go to Home Page
          </Button>
          <AntdDropdown overlay={menu} trigger={["click"]}>
            <Button type="primary" size="large" shape="round">
              Explore
            </Button>
          </AntdDropdown>
          
          {/* Button to go to the Landing Page */}
          
        </BtnWrap>
      </DropdownWrapper>
    </DropdownContainer>
  );
}

export default Dropdown;