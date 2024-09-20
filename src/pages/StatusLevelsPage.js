import React, { useEffect, useState } from 'react';
import { getStatusLevels, deleteStatusLevel } from '../services/api'; // API calls
import StatusLevelsTable from '../components/StatusLevelsTable'; // Status Levels Table
import Pagination from '../components/Pagination'; // Optional pagination if needed
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Searchbar from '../components/Searchbar'; // Import Searchbar component

const PageContainer = styled.div`
  background: white;
  padding: 50px 20px;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
`;

const Title = styled.h2`
  color: #111827;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 30px;
  margin-top: 30px;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CreateButton = styled(Link)`
  background-color: #3b82f6;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1.1rem;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #2563eb;
  }
`;

const StatusLevelsPage = () => {
  const [statusLevels, setStatusLevels] = useState([]);
  const [filteredStatusLevels, setFilteredStatusLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const levelsPerPage = 9;

  useEffect(() => {
    fetchStatusLevels();
  }, []);

  const fetchStatusLevels = async () => {
    try {
      const response = await getStatusLevels(); // API call to fetch status levels
      setStatusLevels(response.data);
      setFilteredStatusLevels(response.data); // Initially, show all status levels
      setLoading(false);
    } catch (error) {
      console.error('Error fetching status levels:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this status level?')) {
      try {
        await deleteStatusLevel(id); // API call to delete a status level
        fetchStatusLevels(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting status level:', error);
      }
    }
  };

  // Search functionality
  useEffect(() => {
    const filtered = statusLevels.filter((level) =>
      level.statusName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStatusLevels(filtered);
  }, [searchQuery, statusLevels]);

  // Pagination logic
  const indexOfLastLevel = currentPage * levelsPerPage;
  const indexOfFirstLevel = indexOfLastLevel - levelsPerPage;
  const currentLevels = filteredStatusLevels.slice(indexOfFirstLevel, indexOfLastLevel);

  const totalPages = Math.ceil(filteredStatusLevels.length / levelsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <PageContainer>
      <Title>Status Levels</Title>

      <ActionsContainer>
        <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CreateButton to="/new-status-level">+ Create New Status Level</CreateButton>
      </ActionsContainer>

      {loading ? (
        <div>Loading status levels...</div>
      ) : (
        <>
          <StatusLevelsTable statusLevels={currentLevels} handleDelete={handleDelete} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
            goToPreviousPage={goToPreviousPage}
            goToNextPage={goToNextPage}
          />
        </>
      )}
    </PageContainer>
  );
};

export default StatusLevelsPage;
