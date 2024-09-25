import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.footerBackground}; 
  color: ${({ theme }) => theme.footerTextColor}; 
  padding: 20px 0;
  text-align: center;
  width: 100%;  // Ensure the footer spans the full width
  position: relative;
  bottom: 0;
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.footerSecondaryTextColor}; 
  margin-top: 2px;
  transition: color 0.3s ease;
`;

const Footer = () => {
  return (
    <FooterContainer id="contact">
      <p className="text-sm">
        © 2024 IBKS Development Scenario. All rights reserved.
      </p>
      <FooterText>
        Designed with care by Dana Abdo.
      </FooterText>
      <FooterText>
        Contact: +961 76 805 324
      </FooterText>
      <FooterText>Or</FooterText>
      <FooterText>Email: danaabdo2000@icloud.com</FooterText>
    </FooterContainer>
  );
};

export default Footer;
