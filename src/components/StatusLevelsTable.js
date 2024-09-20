import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Background Container for the whole table section
const BackgroundContainer = styled.div`
  background: linear-gradient(to right, #e5e7eb, #f3f4f6);
  padding: 50px 0;
  min-height: 100vh;
`;

// Card Grid for arranging status levels in a grid layout
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

// Individual card styling
const Card = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

// Title for the card
const Title = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

// Text for the card details
const Details = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  margin-bottom: 20px;
`;

// Button Group to contain the action buttons
const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

// Styled buttons for actions
const ActionButton = styled(Link)`
  background: #3b82f6;
  color: white;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: center;
  transition: background 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: #2563eb;
  }
`;

const EditButton = styled(Link)`
  background: #6b7280;
  color: white;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: background 0.3s ease;

  &:hover {
    background: #4b5563;
  }
`;

const DeleteButton = styled.button`
  background: #9ca3af;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #6b7280;
  }
`;

// Status Levels Table Component
const StatusLevelsTable = ({ statusLevels, handleDelete }) => {
  return (
    <BackgroundContainer>
      <CardGrid>
        {statusLevels.map((level) => (
          <Card key={level.id}>
            <Title>{level.statusName}</Title>
            <Details>ID: {level.id}</Details>

            <ButtonGroup>
              <EditButton to={`/edit-status-level/${level.id}`}>Edit</EditButton>
              <DeleteButton onClick={() => handleDelete(level.id)}>Delete</DeleteButton>
              <ActionButton to={`/view-status-levels/${level.id}`}>View Details</ActionButton>
            </ButtonGroup>
          </Card>
        ))}
      </CardGrid>
    </BackgroundContainer>
  );
};

export default StatusLevelsTable;
