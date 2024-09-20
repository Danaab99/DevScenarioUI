import React, { useState } from 'react';
import { createApplication } from '../services/api'; // API call to create an application
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import FormGroup from '../components/FormGroup'; // Importing FormGroup component
import Alert from '../components/Alert'; // Importing Alert component

// Styled Components for the form layout
const CreateContainer = styled.div`
  padding: 50px;
  background: linear-gradient(to right, #f3f4f6, #e5e7eb);
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

const BackLink = styled(Link)`
  background-color: #6b7280;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1rem;
  margin-top: 20px;

  &:hover {
    background-color: #4b5563;
  }
`;

function NewApplication() {
  const [appStatus, setAppStatus] = useState('');
  const [projectRef, setProjectRef] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [openDt, setOpenDt] = useState('');
  const [startDt, setStartDt] = useState('');
  const [completedDt, setCompletedDt] = useState('');
  const [projectValue, setProjectValue] = useState('');
  const [statusId, setStatusId] = useState('');
  const [notes, setNotes] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate(); // To redirect after application creation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newApplication = {
      appStatus,
      projectRef,
      projectName,
      projectLocation,
      openDt: openDt || null,
      startDt: startDt || null,
      completedDt: completedDt || null,
      projectValue: parseFloat(projectValue) || null,
      statusId: parseInt(statusId) || 0,
      notes,
      isDeleted: false, // Default is false for new applications
    };

    try {
      await createApplication(newApplication); // Call API to create application
      setAlertMessage('Application created successfully!');
      setAlertType('success');
      setTimeout(() => navigate('/applications'), 1500); // Redirect to applications page after 1.5 seconds
    } catch (error) {
      console.error('Error creating application:', error);
      setAlertMessage('Failed to create application. Please try again.');
      setAlertType('danger');
    }
  };

  return (
    <CreateContainer>
      <Title>Create New Application</Title>

      {/* Display the Alert component only when there's a message */}
      {alertMessage && (
        <Alert
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage('')} // Close the alert
        />
      )}

      <Form onSubmit={handleSubmit}>
        <FormGroup
          label="App Status"
          type="text"
          value={appStatus}
          onChange={(e) => setAppStatus(e.target.value)}
          name="appStatus"
          placeholder="Enter app status"
          required
        />
        <FormGroup
          label="Project Reference"
          type="text"
          value={projectRef}
          onChange={(e) => setProjectRef(e.target.value)}
          name="projectRef"
          placeholder="Enter project reference"
          required
        />
        <FormGroup
          label="Project Name"
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          name="projectName"
          placeholder="Enter project name"
          required
        />
        <FormGroup
          label="Project Location"
          type="text"
          value={projectLocation}
          onChange={(e) => setProjectLocation(e.target.value)}
          name="projectLocation"
          placeholder="Enter project location"
          required
        />
        <FormGroup
          label="Open Date"
          type="date"
          value={openDt}
          onChange={(e) => setOpenDt(e.target.value)}
          name="openDt"
        />
        <FormGroup
          label="Start Date"
          type="date"
          value={startDt}
          onChange={(e) => setStartDt(e.target.value)}
          name="startDt"
        />
        <FormGroup
          label="Completed Date"
          type="date"
          value={completedDt}
          onChange={(e) => setCompletedDt(e.target.value)}
          name="completedDt"
        />
        <FormGroup
          label="Project Value"
          type="number"
          value={projectValue}
          onChange={(e) => setProjectValue(e.target.value)}
          name="projectValue"
          placeholder="Enter project value"
          step="0.01"
        />
        <FormGroup
          label="Status ID"
          type="number"
          value={statusId}
          onChange={(e) => setStatusId(e.target.value)}
          name="statusId"
          placeholder="Enter status ID"
          required
        />
        <FormGroup
          label="Notes"
          isTextArea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          name="notes"
          placeholder="Enter notes (optional)"
        />

        <Button type="submit">Create Application</Button>
      </Form>

      <BackLink to="/applications">Back to Applications</BackLink>
    </CreateContainer>
  );
}

export default NewApplication;
