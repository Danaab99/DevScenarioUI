import React, { useState, useEffect, useRef } from 'react';
import { getApplicationById, updateApplication } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FormGroup from '../components/FormGroup';
import Alert from '../components/Alert';

const EditContainer = styled.div`
  padding: 50px;
  background: linear-gradient(to right, #e2e8f0, #f8fafc); /* Lighter, more contrasting background */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center the content vertically */
  font-family: 'Montserrat', sans-serif;
`;

const Form = styled.form`
  background: white; /* Use white for a bright, clean look */
  border-radius: 15px;
  padding: 50px; /* Add more padding */
  width: 100%;
  max-width: 800px; /* Widen the form */
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1); /* Softer shadow */
  margin: 30px auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px; /* Add more padding to inputs */
  border-radius: 8px;
  border: 1px solid #d1d5db; /* Lighter border for input fields */
  background-color: #f9fafb; /* Light input background */
  color: #111827; /* Darker text */
  font-size: 1.1rem; /* Slightly bigger font size */
  margin-bottom: 20px;

  &:focus {
    outline: none;
    border: 2px solid #3b82f6;
    background-color: #e5e7eb; /* Slight change in background on focus */
  }
`;

const Button = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 15px 30px; /* Bigger buttons */
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

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937; /* Dark text color for contrast */
  margin-bottom: 30px;
  margin-top: 30px;
`;

const EditApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState({
    appStatus: '',
    projectRef: '',
    projectName: '',
    projectLocation: '',
    openDt: '',
    startDt: '',
    completedDt: '',
    projectValue: '',
    statusId: '',
    notes: '',
  });

  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showOptions, setShowOptions] = useState(false); // Prevent opening alert on load
  const initialFormValues = useRef({}); // Store the initial form values for unsaved changes check

  // Fetch application data by ID
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await getApplicationById(id);
        setApplication(response.data);
        initialFormValues.current = { ...response.data }; // Save initial form values
      } catch (error) {
        setAlertMessage('Failed to fetch application.');
        setAlertType('danger');
      }
    };
    fetchApplication();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplication((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      await updateApplication(id, application);
      setAlertMessage('Application updated successfully!');
      setAlertType('success');
      setShowOptions(false); 
      setTimeout(() => navigate('/applications'), 1500); 
    } catch (error) {
      setAlertMessage('Failed to update application.');
      setAlertType('danger');
    }
  };

  // Handle back button (check for unsaved changes)
  const handleBack = () => {
    const hasUnsavedChanges = Object.entries(application).some(
      ([key, value]) => initialFormValues.current[key] !== value
    );

    if (hasUnsavedChanges) {
      setAlertMessage('You have unsaved changes. Do you want to leave without saving?');
      setAlertType('warning');
      setShowOptions(true);
    } else {
      navigate('/applications');
    }
  };

  const handleSaveAndLeave = () => {
    handleSubmit();
    navigate('/applications');
  };

  const handleLeaveWithoutSaving = () => {
    navigate('/applications');
  };

  return (
    <EditContainer>
      <Title>Edit Application</Title>
      {alertMessage && (
        <Alert
          message={alertMessage}
          type={alertType}
          showOptions={showOptions}
          onSave={handleSaveAndLeave}
          onLeave={handleLeaveWithoutSaving}
          onClose={() => setAlertMessage('')} 
        />
      )}
      <Form onSubmit={handleSubmit}>
        <FormGroup
          label="App Status"
          type="text"
          value={application.appStatus}
          onChange={handleChange}
          name="appStatus"
        />
        <FormGroup
          label="Project Reference"
          type="text"
          value={application.projectRef}
          onChange={handleChange}
          name="projectRef"
        />
        <FormGroup
          label="Project Name"
          type="text"
          value={application.projectName}
          onChange={handleChange}
          name="projectName"
        />
        <FormGroup
          label="Project Location"
          type="text"
          value={application.projectLocation}
          onChange={handleChange}
          name="projectLocation"
        />
        <FormGroup
          label="Open Date"
          type="date"
          value={application.openDt}
          onChange={handleChange}
          name="openDt"
        />
        <FormGroup
          label="Start Date"
          type="date"
          value={application.startDt}
          onChange={handleChange}
          name="startDt"
        />
        <FormGroup
          label="Completed Date"
          type="date"
          value={application.completedDt}
          onChange={handleChange}
          name="completedDt"
        />
        <FormGroup
          label="Project Value"
          type="number"
          value={application.projectValue}
          onChange={handleChange}
          name="projectValue"
          step="0.01"
        />
        <FormGroup
          label="Status ID"
          type="number"
          value={application.statusId}
          onChange={handleChange}
          name="statusId"
        />
        <FormGroup
          label="Notes"
          isTextArea={true}
          value={application.notes}
          onChange={handleChange}
          name="notes"
        />
        <Button type="submit">Update Application</Button>
        <BackButton type="button" onClick={handleBack}>Go Back</BackButton>
      </Form>
    </EditContainer>
  );
};

export default EditApplication;
