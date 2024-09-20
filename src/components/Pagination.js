import React from 'react';
import styled from 'styled-components';

// Styled components for pagination
const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PaginationList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PaginationItem = styled.li`
  margin: 0 5px;
`;

const PaginationButton = styled.button`
  background-color: ${({ disabled }) => (disabled ? '#d1d5db' : '#3b82f6')};
  color: ${({ disabled }) => (disabled ? '#9ca3af' : 'white')};
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#d1d5db' : '#2563eb')};
  }
`;

const PaginationEllipsis = styled.span`
  padding: 10px 15px;
  color: #9ca3af;
  font-size: 1rem;
`;

function Pagination({ currentPage, totalPages, paginate, goToNextPage, goToPreviousPage }) {
  return (
    <PaginationContainer>
      <PaginationList>
        <PaginationItem>
          <PaginationButton
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </PaginationButton>
        </PaginationItem>

        <PaginationItem>
          <PaginationButton
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
          >
            1
          </PaginationButton>
        </PaginationItem>

        {currentPage > 2 && (
          <PaginationItem>
            <PaginationEllipsis>...</PaginationEllipsis>
          </PaginationItem>
        )}

        {currentPage > 1 && currentPage < totalPages && (
          <PaginationItem>
            <PaginationButton onClick={() => paginate(currentPage)}>
              {currentPage}
            </PaginationButton>
          </PaginationItem>
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationButton onClick={() => paginate(currentPage + 1)}>
              {currentPage + 1}
            </PaginationButton>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationButton
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </PaginationButton>
        </PaginationItem>
      </PaginationList>
    </PaginationContainer>
  );
}

export default Pagination;
