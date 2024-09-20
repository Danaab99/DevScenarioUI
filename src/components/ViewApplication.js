import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getApplicationById } from '../services/api';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import FormGroup from '../components/FormGroup'; // Importing FormGroup for consistency
import Alert from '../components/Alert'; // For showing any errors or messages

// Styled Components for the layout
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

const ExportButton = styled(Button)`
  background-color: #10b981;

  &:hover {
    background-color: #059669;
  }
`;

const EditButton = styled(Button)`
  background-color: #3b82f6;

  &:hover {
    background-color: #2563eb;
  }
`;

function ViewApplication() {
  const { id } = useParams(); // Get the application ID from the URL
  const [application, setApplication] = useState(null); // Store the application details
  const [alertMessage, setAlertMessage] = useState(''); // Alert state for handling errors
  const [alertType, setAlertType] = useState(''); // Alert type for success/danger
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await getApplicationById(id); // Fetch application by ID
        setApplication(response.data);
      } catch (error) {
        console.error('Error fetching application details:', error);
        setAlertMessage('Error fetching application details.');
        setAlertType('danger');
      }
    };
    fetchApplication();
  }, [id]);

  const downloadPDF = () => {
    const input = document.getElementById('application-details');
    const scale = 2; // Increase the scale to improve the quality
  
    html2canvas(input, { scale: scale, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('application-details.pdf');
    });
  };

  if (!application) {
    return <div>Loading application details...</div>;
  }

  return (
    <DetailsContainer>
      <Title>View Application</Title>

      {/* Display alert if there's an error */}
      {alertMessage && (
        <Alert
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage('')}
        />
      )}

      <Form id="application-details">
        {/* Using FormGroup to display application details */}
        <FormGroup label="Project Reference" type="text" value={application.projectRef} readOnly />
        <FormGroup label="Project Name" type="text" value={application.projectName} readOnly />
        <FormGroup label="Project Location" type="text" value={application.projectLocation} readOnly />
        <FormGroup label="App Status" type="text" value={application.appStatus} readOnly />
        <FormGroup label="Open Date" type="text" value={application.openDt} readOnly />
        <FormGroup label="Start Date" type="text" value={application.startDt} readOnly />
        <FormGroup label="Completed Date" type="text" value={application.completedDt} readOnly />
        <FormGroup label="Project Value" type="text" value={application.projectValue} readOnly />
        <FormGroup label="Status ID" type="text" value={application.statusId} readOnly />
        <FormGroup label="Notes" isTextArea={true} value={application.notes} readOnly />
      </Form>

      <div style={{ marginTop: '20px' }}>
        <BackButton onClick={() => navigate(-1)}>Go Back</BackButton>
        <ExportButton onClick={downloadPDF}>Export as PDF</ExportButton>
        <EditButton onClick={() => navigate(`/edit/${id}`)}>Edit Application</EditButton>
      </div>
    </DetailsContainer>
  );
}

export default ViewApplication;
