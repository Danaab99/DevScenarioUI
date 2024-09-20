import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApplications } from '../services/api';
import ApplicationsTable from '../components/ApplicationsTable';
import Pagination from '../components/Pagination';
import Searchbar from '../components/Searchbar';
import styled, { keyframes } from 'styled-components';

// Keyframe animation for fade-in effect
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Content container with the fade-in animation
const ContentContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-in-out;
`;

function AppsPage() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const appsPerPage = 10;
  const navigate = useNavigate(); // Use navigate to programmatically navigate

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await getApplications();
      setApplications(response.data);
      setFilteredApplications(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const filtered = applications.filter((app) => {
        const projectName = app.projectName?.toLowerCase() || '';
        const projectLocation = app.projectLocation?.toLowerCase() || '';
        const appStatus = app.appStatus?.toLowerCase() || '';

        return (
          projectName.includes(searchQuery.toLowerCase()) ||
          projectLocation.includes(searchQuery.toLowerCase()) ||
          appStatus.includes(searchQuery.toLowerCase())
        );
      });
      setFilteredApplications(filtered);
    } else {
      setFilteredApplications(applications);
    }
  }, [searchQuery, applications]);

  const indexOfLastApp = currentPage * appsPerPage;
  const indexOfFirstApp = indexOfLastApp - appsPerPage;
  const currentApps = filteredApplications.slice(indexOfFirstApp, indexOfLastApp);

  const totalPages = Math.ceil(filteredApplications.length / appsPerPage);

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

  if (loading) {
    return <div>Loading applications...</div>;
  }

  return (
    <div
      style={{
        background: 'white',
        padding: '50px 20px',
        minHeight: '100vh',
        color: 'black',
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      <h2
        className="text-left font-montserrat text-4xl font-bold text-black"
        style={{
          color: '#111827',
          fontFamily: 'Montserrat, sans-serif',
          marginTop: '30px',
        }}
      >
        Applications
      </h2>

      <div
        className="actions-container"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}
      >
        <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontFamily: 'Montserrat, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onClick={() => window.location.href = "/create"}
          >
            + Create a New Application
          </button>
          {/* Add Dashboard Button */}
          <button
            style={{
              backgroundColor: '#6b7280',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontFamily: 'Montserrat, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onClick={() => navigate('/dashboard')} // Navigate to dashboard
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* Content section with the fade-in effect */}
      <ContentContainer key={currentPage}>
        <ApplicationsTable applications={currentApps} />
      </ContentContainer>

      <div className="pagination-container">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          goToPreviousPage={goToPreviousPage}
          goToNextPage={goToNextPage}
        />
      </div>
    </div>
  );
}

export default AppsPage;
