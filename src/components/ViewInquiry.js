import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInquiryById } from '../services/api';
import styled from 'styled-components';
import FormGroup from '../components/FormGroup';
import Alert from '../components/Alert';

const DetailsContainer = styled.div`
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
  margin-top: 30px
`;

const Form = styled.div`
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

function ViewInquiry() {
  const { id } = useParams();
  const [inquiry, setInquiry] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const response = await getInquiryById(id);
        setInquiry(response.data);
      } catch (error) {
        setAlertMessage('Error fetching inquiry details.');
        setAlertType('danger');
      }
    };
    fetchInquiry();
  }, [id]);

  if (!inquiry) {
    return <div>Loading inquiry details...</div>;
  }

  return (
    <DetailsContainer>
      <Title>View Inquiry</Title>
      {alertMessage && (
        <Alert message={alertMessage} type={alertType} onClose={() => setAlertMessage('')} />
      )}
      <Form>
        <FormGroup label="Send To Person" type="text" value={inquiry.sendToPerson} readOnly />
        <FormGroup label="Subject" type="text" value={inquiry.subject} readOnly />
        <FormGroup label="Inquiry" isTextArea value={inquiry.inquiry} readOnly />
        <FormGroup label="Response" isTextArea value={inquiry.response} readOnly />
        <FormGroup label="Asked Date" type="text" value={inquiry.askedDt} readOnly />
        <FormGroup label="Completed Date" type="text" value={inquiry.completedDt} readOnly />
      </Form>
      <BackButton onClick={() => navigate('/inquiries')}>Go Back</BackButton>
    </DetailsContainer>
  );
}

export default ViewInquiry;
