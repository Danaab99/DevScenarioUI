import React from 'react';
import styled from 'styled-components';
import SectionWrapper from '../hoc/SectionWrapper';

const FooterContainer = styled.footer`
  background: #000;
  color: #fff;
  padding: 20px 0;
  text-align: center;
`;


const Footer = () => {
  return (
    <FooterContainer id="contact" className="bg-black text-white py-5 px-5">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © 2024 IBKS Development Scenario. All rights reserved.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Designed with care by Dana Abdo.

        </p>
        <p className="text-sm text-gray-400 mt-2">
           Contact: +961 76 805 324 
        </p>
        <p className="text-sm text-gray-400 mt-2"> Or </p>
        <p className="text-sm text-gray-400 mt-2"> Email: danaabdo2000@icloud.com</p>
      </div>
    </FooterContainer>
  );
};



export default SectionWrapper(Footer, "footer");
