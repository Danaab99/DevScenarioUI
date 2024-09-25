import React from 'react';
import styled from 'styled-components';

const StyledSearchbar = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.searchbarBackgroundColor}; /* Light background to match the table */
  font-family: 'Montserrat', sans-serif;
  color: ${({ theme }) => theme.footerBackground}; /* Dark text color */
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background-color: #e5e7eb; /* Slightly darker background on focus */
  }

  /* Make the search bar responsive */
  @media (max-width: 768px) {
    max-width: 100%; /* Take up full width on smaller screens */
    font-size: 14px; /* Adjust font size for smaller screens */
  }

  @media (max-width: 480px) {
    padding: 10px 15px; /* Adjust padding for very small screens */
    font-size: 12px; /* Further adjust font size for mobile screens */
  }
`;

function Searchbar({ searchQuery, setSearchQuery }) {
  return (
    <StyledSearchbar
      type="text"
      placeholder="Search by project name, location, or status"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}

export default Searchbar;
