import React, { useState } from 'react';
import { createInquiry } from '../services/api'; // API call to create a new inquiry
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import FormGroup from '../components/FormGroup'; // Reuse FormGroup component
import Alert from '../components/Alert'; // Reuse Alert component
import { Link } from 'react-router-dom';

// Styled Components for layout
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

  &:disabled {
    background-color: #9ca3af; /* Disabled button color */
    cursor: not-allowed;
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

function NewInquiry() {
  const [sendToPerson, setSendToPerson] = useState('');
  const [sendToRole, setSendToRole] = useState('');
  const [subject, setSubject] = useState('');
  const [inquiry, setInquiry] = useState('');
  const [response, setResponse] = useState('');
  const [askedDt, setAskedDt] = useState('');
  const [completedDt, setCompletedDt] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if required fields are filled
    if (!sendToPerson || !sendToRole || !subject || !inquiry) {
      setAlertMessage('Please fill in all required fields.');
      setAlertType('danger');
      return;
    }

    const newInquiry = {
      sendToPerson,
      sendToRole,
      subject,
      inquiry,
      response,
      askedDt: askedDt || null,
      completedDt: completedDt || null,
    };

    try {
      await createInquiry(newInquiry); // Call API to create inquiry
      setAlertMessage('Inquiry created successfully!');
      setAlertType('success');
      setTimeout(() => navigate('/inquiries'), 1500); // Redirect to inquiries page after 1.5 seconds
    } catch (error) {
      console.error('Error creating inquiry:', error);
      setAlertMessage('Failed to create inquiry. Please try again.');
      setAlertType('danger');
    }
  };

  // Disable the button if the required fields are empty
  const isFormValid = sendToPerson && sendToRole && subject && inquiry;

  return (
    <CreateContainer>
      <Title>Create New Inquiry</Title>

      {alertMessage && (
        <Alert
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage('')}
        />
      )}

      <Form onSubmit={handleSubmit}>
        <FormGroup
          label="Send To Person"
          type="text"
          value={sendToPerson}
          onChange={(e) => setSendToPerson(e.target.value)}
          name="sendToPerson"
          placeholder="Enter person's name"
          required
        />
        <FormGroup
          label="Send To Role"
          type="text"
          value={sendToRole}
          onChange={(e) => setSendToRole(e.target.value)}
          name="sendToRole"
          placeholder="Enter role"
          required
        />
        <FormGroup
          label="Subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          name="subject"
          placeholder="Enter subject"
          required
        />
        <FormGroup
          label="Inquiry"
          isTextArea={true}
          value={inquiry}
          onChange={(e) => setInquiry(e.target.value)}
          name="inquiry"
          placeholder="Enter inquiry"
          required
        />
        <FormGroup
          label="Response"
          isTextArea={true}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          name="response"
          placeholder="Enter response (optional)"
        />
        <FormGroup
          label="Asked Date"
          type="date"
          value={askedDt}
          onChange={(e) => setAskedDt(e.target.value)}
          name="askedDt"
        />
        <FormGroup
          label="Completed Date"
          type="date"
          value={completedDt}
          onChange={(e) => setCompletedDt(e.target.value)}
          name="completedDt"
        />

        <Button type="submit" disabled={!isFormValid}>Create Inquiry</Button>
      </Form>

      <BackLink to="/inquiries">Back to Inquiries</BackLink>
    </CreateContainer>
  );
}

export default NewInquiry;
