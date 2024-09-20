import React, { useState, useEffect, useRef } from 'react';
import { getStatusLevelById, updateStatusLevel } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FormGroup from '../components/FormGroup';
import Alert from '../components/Alert';

const EditContainer = styled.div`
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
  margin-top: 30px;
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

const BackButton = styled(Button)`
  background-color: #6b7280;

  &:hover {
    background-color: #4b5563;
  }
`;

function EditStatusLevel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [statusLevel, setStatusLevel] = useState({ statusName: '' });
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showOptions, setShowOptions] = useState(false); // To show save/leave buttons inside the alert
  const initialFormValues = useRef({});

  // Fetch status level data by ID
  useEffect(() => {
    const fetchStatusLevel = async () => {
      try {
        const response = await getStatusLevelById(id);
        setStatusLevel(response.data);
        initialFormValues.current = response.data; // Store initial form values
      } catch (error) {
        console.error('Error fetching status level:', error);
        setAlertMessage('Failed to fetch status level.');
        setAlertType('danger');
      }
    };
    fetchStatusLevel();
  }, [id]);

  const handleChange = (e) => {
    setStatusLevel({ ...statusLevel, statusName: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStatusLevel(id, statusLevel);
      setAlertMessage('Status level updated successfully!');
      setAlertType('success');
      setShowOptions(false); // Hide options when form is saved
      setTimeout(() => navigate('/status-levels'), 1500);
    } catch (error) {
      console.error('Error updating status level:', error);
      setAlertMessage('Failed to update status level.');
      setAlertType('danger');
    }
  };

  // Handle unsaved changes when navigating back
  const handleBack = () => {
    const hasUnsavedChanges = initialFormValues.current.statusName !== statusLevel.statusName;

    if (hasUnsavedChanges) {
      setAlertMessage('You have unsaved changes. Do you want to leave without saving?');
      setAlertType('warning');
      setShowOptions(true); // Show save/leave options
    } else {
      navigate('/status-levels');
    }
  };

  const handleSaveAndLeave = () => {
    handleSubmit(); // Save the form
    navigate('/status-levels'); // Then navigate back
  };

  const handleLeaveWithoutSaving = () => {
    navigate('/status-levels'); // Leave without saving
  };

  return (
    <EditContainer>
      <Title>Edit Status Level</Title>

      {/* Alert with save/leave buttons when unsaved changes are detected */}
      {alertMessage && (
        <Alert
          message={alertMessage}
          type={alertType}
          showOptions={showOptions}
          onSave={handleSaveAndLeave} // Save and navigate
          onLeave={handleLeaveWithoutSaving} // Leave without saving
          onClose={() => setAlertMessage('')} // Close the alert
        />
      )}

      <Form onSubmit={handleSubmit}>
        <FormGroup
          label="Status Name"
          type="text"
          value={statusLevel.statusName}
          onChange={handleChange}
          name="statusName"
        />
        <Button type="submit">Update Status Level</Button>
        <BackButton type="button" onClick={handleBack}>Go Back</BackButton>
      </Form>
    </EditContainer>
  );
}

export default EditStatusLevel;
