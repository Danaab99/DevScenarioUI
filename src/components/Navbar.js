import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { FaBars, FaCaretDown , FaTimes} from 'react-icons/fa';
import Dropdown from './Dropdown';
import { MdDarkMode, MdLightMode } from 'react-icons/md'; // Icons for dark and light mode
import { useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { menuData } from '../data/MenuData';
import { lightTheme, darkTheme } from '../Theme'; // Import themes

const Nav = styled.nav`
  height: 60px;
  display: flex;
  justify-content: space-between; // Align items left and right (logo and mobile icon)
  align-items: center;  // Vertically align logo and mobile icon
  padding: 1rem 2rem;
  z-index: 100;
  position: fixed;
  width: 100%;
  background: ${({ theme }) => theme.navbarBackground};
  color: ${({ theme }) => theme.navbarTextColor};

  @media screen and (max-width: 768px) {
    padding: 0 1rem;  
    justify-content: space-between; 
  }
`;

const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;  // Change to flex to align properly
    font-size: 1.8rem;
    cursor: pointer;
    color: ${({ theme }) => theme.navbarTextColor};
    padding: 0; // Reset padding for better alignment
    margin-right: 10px;  // Adjust if needed for spacing
  }
`;
const NavLink = css`
  color: ${({ theme }) => theme.navbarTextColor};
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  line-height: 60px;
`;
const Logo = styled.div`
  ${NavLink};
  cursor: pointer;

  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -40px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MenuBars = styled(FaBars)`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    height: 40px;
    width: 40px;
    cursor: pointer;
    color: ${({ theme }) => theme.navbarTextColor};
  }
`;




const StyledScrollLink = styled(ScrollLink)`
  ${NavLink};
  color: ${({ theme }) => theme.navbarTextColor};

  &:hover {
    color: #ddd;
  }
`;

const NavBtn = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;


const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledExploreButton = styled.button`
  background: ${({ theme }) => theme.buttonBgColor};
  color: ${({ theme }) => theme.buttonTextColor};
  padding: 7px 11px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.buttonHoverColor};
  }

  svg {
    transition: transform 0.3s ease;
    transform: ${(props) => (props.open ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`;

const DropdownMenu = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  position: absolute;
  background-color: #1f2937;
  min-width: 180px;
  border-radius: 10px;
  z-index: 1;
  opacity: ${(props) => (props.open ? 1 : 0)};
  transition: all 0.3s ease;

  a {
    color: white;
    padding: 12px 20px;
    text-decoration: none;
    display: block;
    cursor: pointer;

    &:hover {
      background-color: #374151;
    }
  }
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 50px; // Width of the toggle
  height: 25px; // Height of the toggle
  background: ${({ isDarkMode }) => (isDarkMode ? '#666' : '#ccc')};
  border-radius: 25px;
  cursor: pointer;
  transition: background 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ isDarkMode }) => (isDarkMode ? '26px' : '2px')};
    width: 21px;
    height: 21px;
    border-radius: 50%;
    background: white;
    transition: left 0.3s ease;
  }
`;

// Include the Toggle Switch in the Navbar
const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.textColor};
  margin-right: 20px;
  svg {
    font-size: 30px;
  }
  @media screen and (max-width: 768px) {
    display: none;  // Hide on small screens
  }
`;

const Navbar = ({ toggleTheme, isDarkMode , toggle}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollTarget, setScrollTarget] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleNavigation = (to, isFooter = false) => {
    if (isFooter) {
      scroll.scrollToBottom({ smooth: true, duration: 500 });
    } else if (location.pathname === '/') {
      const targetElement = document.getElementById(to);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setScrollTarget(to);
      navigate('/');
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
  
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  
  useEffect(() => {
    if (location.pathname === '/' && scrollTarget) {
      const scrollTimeout = setTimeout(() => {
        const targetElement = document.getElementById(scrollTarget);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        setScrollTarget(null);
      }, 500);
      return () => clearTimeout(scrollTimeout);
    }
  }, [location.pathname, scrollTarget]);

  return (
    <Nav>
      <Logo onClick={() => handleNavigation('home')}>Dev Scenario</Logo>
      
      <NavMenu>
      <MobileIcon onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </MobileIcon>
        {menuData.map((item, index) => (
          <StyledScrollLink
            key={index}
            to={item.to}
            smooth={item.smooth}
            duration={item.duration}
            onClick={() => handleNavigation(item.to, item.to === 'contact')}
          >
            {item.title}
          </StyledScrollLink>
        ))}
       
      </NavMenu>
      <NavBtn>
      <ThemeToggle onClick={toggleTheme}>
        {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
      </ThemeToggle>
        <DropdownContainer ref={dropdownRef}>
          <StyledExploreButton onClick={handleDropdownToggle} open={dropdownOpen}>
            Explore <FaCaretDown />
          </StyledExploreButton>
          <DropdownMenu open={dropdownOpen}>
  <a onClick={(e) => { 
    e.preventDefault(); 
    navigate('/applications'); 
    setDropdownOpen(false);  // Close dropdown when an option is selected
  }}>Applications</a>
  <a onClick={(e) => { 
    e.preventDefault(); 
    navigate('/inquiries'); 
    setDropdownOpen(false);  // Close dropdown when an option is selected
  }}>Inquiries</a>
  <a onClick={(e) => { 
    e.preventDefault(); 
    navigate('/status-levels'); 
    setDropdownOpen(false);  // Close dropdown when an option is selected
  }}>Status Levels</a>
</DropdownMenu>

        </DropdownContainer>
       
      </NavBtn>

      <MenuBars onClick={toggle} />
    
    </Nav>
  );
};

export default Navbar;
