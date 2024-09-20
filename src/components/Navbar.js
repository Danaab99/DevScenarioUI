import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { menuData } from '../data/MenuData';
import { Button } from './Button';
import { useEffect } from 'react';
const Nav = styled.nav`
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  z-index: 100;
  position: fixed;
  width: 100%;
  background: black;
`;

const NavLink = css`
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
`;

const Logo = styled.div`
  ${NavLink};
  font-style: italic;
  cursor: pointer;
`;

const MenuBars = styled(FaBars)`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    background-size: contain;
    height: 40px;
    width: 40px;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-30%, 25%);
    color: #fff;
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

const StyledScrollLink = styled(ScrollLink)`
  ${NavLink};
  color: #fff;

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

// Dropdown Container
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

// Dropdown Menu Items
const DropdownMenu = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  position: absolute;
  background-color: #333;
  min-width: 160px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;

  a {
    color: white;
    padding: 12px 16px;
    text-decoration: none;
    display: block;

    &:hover {
      background-color: #575757;
    }
  }
`;

const Navbar = ({ toggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollTarget, setScrollTarget] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state

  // Toggle Dropdown
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle scrolling after navigation
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
        <DropdownContainer>
          <Button primary="true" onClick={handleDropdownToggle}>
            Explore
          </Button>
          <DropdownMenu open={dropdownOpen}>
            <a onClick={() => navigate('/applications')}>Applications</a>
            <a onClick={() => navigate('/inquiries')}>Inquiries</a>
            <a onClick={() => navigate('/status-levels')}>Status Levels</a>
          </DropdownMenu>
        </DropdownContainer>
      </NavBtn>
      <MenuBars onClick={toggle} />
    </Nav>
  );
};

export default Navbar;
