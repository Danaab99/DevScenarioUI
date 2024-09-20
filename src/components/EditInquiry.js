import React, { useState, useEffect, useRef } from 'react';
import { getInquiryById, updateInquiry } from '../services/api'; // Replace with your API call
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FormGroup from '../components/FormGroup';
import Alert from '../components/Alert';

const EditContainer = styled.div`
  padding: 50px;
  background: linear-gradient(to right, #e2e8f0, #f8fafc);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
`;

const Form = styled.form`
  background: white;
  border-radius: 15px;
  padding: 50px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
  margin: 30px auto;
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

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 30px;
  margin-top: 30px;
`;

const EditInquiry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState({
    sendToPerson: '',
    subject: '',
    inquiry: '',
    response: '',
    askedDt: '',
    completedDt: '',
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showOptions, setShowOptions] = useState(false); // Add option state for unsaved changes
  const initialFormValues = useRef({}); // Save initial form values

  // Fetch inquiry data by ID
  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const response = await getInquiryById(id);
        setInquiry(response.data);
        initialFormValues.current = { ...response.data };
      } catch (error) {
        setAlertMessage('Failed to fetch inquiry.');
        setAlertType('danger');
      }
    };
    fetchInquiry();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInquiry((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      await updateInquiry(id, inquiry);
      setAlertMessage('Inquiry updated successfully!');
      setAlertType('success');
      setTimeout(() => navigate('/inquiries'), 1500);
    } catch (error) {
      setAlertMessage('Failed to update inquiry.');
      setAlertType('danger');
    }
  };

  // Check if form is modified
  const isFormModified = () => {
    return Object.entries(inquiry).some(
      ([key, value]) => initialFormValues.current[key] !== value
    );
  };

  // Handle Go Back button (check for unsaved changes)
  const handleBack = () => {
    if (isFormModified()) {
      setAlertMessage('You have unsaved changes. Do you want to leave without saving?');
      setAlertType('warning');
      setShowOptions(true); // Show options to save or leave
    } else {
      navigate('/inquiries');
    }
  };

  // Handle Save and Leave
  const handleSaveAndLeave = () => {
    handleSubmit(); // Trigger form submission
    navigate('/inquiries'); // Navigate after saving
  };

  // Handle Leave without Saving
  const handleLeaveWithoutSaving = () => {
    navigate('/inquiries'); // Navigate without saving
  };

  return (
    <EditContainer>
      <Title>Edit Inquiry</Title>
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
        <FormGroup label="Send To Person" type="text" value={inquiry.sendToPerson} onChange={handleChange} name="sendToPerson" />
        <FormGroup label="Subject" type="text" value={inquiry.subject} onChange={handleChange} name="subject" />
        <FormGroup label="Inquiry" isTextArea value={inquiry.inquiry} onChange={handleChange} name="inquiry" />
        <FormGroup label="Response" isTextArea value={inquiry.response} onChange={handleChange} name="response" />
        <FormGroup label="Asked Date" type="date" value={inquiry.askedDt} onChange={handleChange} name="askedDt" />
        <FormGroup label="Completed Date" type="date" value={inquiry.completedDt} onChange={handleChange} name="completedDt" />
        <Button type="submit">Update Inquiry</Button>
        <BackButton type="button" onClick={handleBack}>Go Back</BackButton>
      </Form>
    </EditContainer>
  );
};

export default EditInquiry;
