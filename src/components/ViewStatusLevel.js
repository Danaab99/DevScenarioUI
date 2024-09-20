import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStatusLevelById } from '../services/api';
import styled from 'styled-components';

const ViewContainer = styled.div`
  padding: 50px;
  background: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
`;

const ViewStatusLevel = () => {
  const { id } = useParams();
  const [statusLevel, setStatusLevel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatusLevel = async () => {
      try {
        const response = await getStatusLevelById(id);
        setStatusLevel(response.data);
      } catch (error) {
        console.error('Error fetching status level:', error);
      }
    };
    fetchStatusLevel();
  }, [id]);

  if (!statusLevel) {
    return <div>Loading...</div>;
  }

  return (
    <ViewContainer>
      <h2>View Status Level</h2>
      <p>ID: {statusLevel.id}</p>
      <p>Status Name: {statusLevel.statusName}</p>
      <button onClick={() => navigate('/view-status-levels')}>Go Back</button>
    </ViewContainer>
  );
};

export default ViewStatusLevel;
