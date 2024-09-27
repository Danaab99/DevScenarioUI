import React from 'react';
import styled from 'styled-components';

// Styled button component
const StyledButton = styled.button`
  display: inline-flex; // Set display to flex to align children inline
  align-items: center; // Align children vertically in the center
  justify-content: center; // Center content horizontally
  background-color: ${(props) => props.bgColor || "#3b82f6"};
  color: ${(props) => props.textColor || "white"};
  padding: ${(props) => props.padding || "8px 15px"};
  border-radius: 8px;
  font-size: ${(props) => props.fontSize || "0.9rem"};
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#2563eb"};
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 8px 15px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 6px 10px;
  }
`;

// Button Component
const Button = ({ onClick, children, bgColor, hoverColor, textColor, padding, fontSize }) => {
  return (
    <StyledButton
      onClick={onClick}
      bgColor={bgColor}
      hoverColor={hoverColor}
      textColor={textColor}
      padding={padding}
      fontSize={fontSize}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
