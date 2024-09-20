import React from 'react';
import styled from 'styled-components';

const StyledSearchbar = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  background-color: #f3f4f6; /* Light background to match the table */
  font-family: 'Montserrat', sans-serif;
  color: #111827; /* Dark text color */
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background-color: #e5e7eb; /* Slightly darker background on focus */
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
