import React, { useState } from 'react';
import { createStatusLevel } from '../services/api'; // API call to create a new status level
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CreateContainer = styled.div`
  padding: 50px;
  background: linear-gradient(to right, #e5e7eb, #f3f4f6);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 30px;
  margin-top: 30px
`;

const Form = styled.form`
  background: white;
  border-radius: 15px;
  padding: 40px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 15px 30px;
  border-radius: 8px;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #2563eb;
  }
`;

const NewStatusLevel = () => {
  const [statusName, setStatusName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createStatusLevel({ statusName });
      alert('Status level created successfully');
      navigate('/status-levels'); // Redirect to status levels page after creation
    } catch (error) {
      console.error('Error creating status level:', error);
    }
  };

  return (
    <CreateContainer>
      <Title>Create New Status Level</Title>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="statusName">Status Name</label>
        <input
          type="text"
          id="statusName"
          value={statusName}
          onChange={(e) => setStatusName(e.target.value)}
          required
        />
        <Button type="submit">Create Status Level</Button>
      </Form>
    </CreateContainer>
  );
};

export default NewStatusLevel;
