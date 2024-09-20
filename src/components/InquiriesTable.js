// InquiriesList.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Background Container for the whole table section
const BackgroundContainer = styled.div`
  background: linear-gradient(to right, #e5e7eb, #f3f4f6); /* Light gradient background */
  padding: 50px 0;
  min-height: 100vh;
`;

// Card Grid for arranging inquiries in a grid layout
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

const Title = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const Details = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  margin-bottom: 20px;
`;

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

// Inquiries List component
const InquiriesTable = ({ inquiries, handleDelete }) => {
  const displayedInquiries = inquiries.slice(0, 9); // Display only 9 inquiries at a time

  return (
    <BackgroundContainer>
      <CardGrid>
        {displayedInquiries.map((inquiry) => (
          <Card key={inquiry.id}>
            <Title>{inquiry.subject}</Title>
            <Details>Person: {inquiry.sendToPerson}</Details>
            <Details>Role: {inquiry.sendToRole}</Details>
            <Details>Asked Date: {inquiry.askedDt ? new Date(inquiry.askedDt).toLocaleDateString() : 'N/A'}</Details>
            <Details>Completed Date: {inquiry.completedDt ? new Date(inquiry.completedDt).toLocaleDateString() : 'N/A'}</Details>

            <ButtonGroup>
              <EditButton to={`/edit-inquiry/${inquiry.id}`}>Edit</EditButton>
              <DeleteButton onClick={() => handleDelete(inquiry.id)}>Delete</DeleteButton>
              <ActionButton to={`/inquiries/${inquiry.id}`}>View Details</ActionButton>
            </ButtonGroup>
          </Card>
        ))}
      </CardGrid>
    </BackgroundContainer>
  );
};

export default InquiriesTable;
