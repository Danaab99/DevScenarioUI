import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import Button from './Button'; // Import your reusable Button component
import { lightTheme, darkTheme } from '../Theme';
import ThemeProvider from 'styled-components';
// Styled components definitions
const BackgroundContainer = styled.div`
  background: ${({ theme }) => theme.backgroundGradient};
  
  min-height: 100vh;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  
  padding: 100px 50px;
  max-width: 1200px;
  margin: 0 auto;
  background: ${({ theme }) => theme?.background || "#f9fafb"};
  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Single column layout for smaller screens */
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.genericTableCardBackground};
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease;
  color: ${({ theme }) => theme.genericTableCardTextColor};
  &:hover {
    transform: scale(1.05);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 480px) {
    flex-direction: column; /* Stack buttons vertically on very small screens */
    gap: 5px;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.4rem;
  font-family: 'Montserrat', sans-serif;
  color: ${({ theme }) => theme.textColor};
  font-weight: bold;
  text-align: left;
  margin-bottom: 40px;
  margin-top: 40px;
  padding: 0 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 0 15px;
  }
`;

const TopControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

// GenericTable component
const EntityDisplayGrid = ({ title, items, handleDelete, renderCardDetails, children }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <BackgroundContainer>
      <PageTitle>{title}</PageTitle>
      <TopControls>{children}</TopControls>
      <CardGrid>
        {items.map(item => (
          <Card key={item.id}>
            {renderCardDetails(item)}
            <ButtonGroup>
              {/* Edit Button */}
              <Button
                onClick={() => navigate(`/edit/${item.type}/${item.id}`)} // Navigate using React Router
                bgColor="#6b7280"
                hoverColor="#4b5563"
                textColor="white"
                padding="8px 10px" // Adjusted padding for smaller buttons
                fontSize="0.75rem" // Smaller font size for buttons inside the card
              >
                Edit
              </Button>

              {/* Delete Button */}
              <Button
                onClick={() => handleDelete(item.id)}
                bgColor="#9ca3af"
                hoverColor="#6b7280"
                textColor="white"
                padding="8px 10px" // Adjusted padding for smaller buttons
                fontSize="0.75rem" // Smaller font size for buttons inside the card
              >
                Delete
              </Button>

              {/* View Details Button */}
              <Button
                onClick={() => navigate(`/${item.type}/${item.id}`)} // Navigate using React Router
                bgColor="#3b82f6"
                hoverColor="#2563eb"
                textColor="white"
                padding="8px 10px" // Adjusted padding for smaller buttons
                fontSize="0.75rem" // Smaller font size for buttons inside the card
              >
                View Details
              </Button>
            </ButtonGroup>
          </Card>
        ))}
      </CardGrid>
    </BackgroundContainer>
  );
};

export default EntityDisplayGrid;
