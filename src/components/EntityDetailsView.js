import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import FormGroup from './FormGroup';
import Alert from './Alert';
import Button from './Button'; // Reuse your Button component
import { exportToPDF } from './exportToPdf' // Import the exportToPDF function

// Styled Components
const ViewContainer = styled.div`
  padding: 60px 20px;
 
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.genericTableCardBackground};
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  
`;

const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.labelTextColor};
  text-align: center;
  margin-bottom: 30px;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 40px;
`;

const Field = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  padding: 15px 0;

  & span {
    font-weight: 600;
    color: ${({ theme }) => theme.labelTextColor};
  }

  & p {
    color: ${({ theme }) => theme.labelTextColor};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const EntityDetailsView = ({ title, viewConfig, fetchData, navigateBack }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const response = await fetchData(id);
        setData(response.data);
      } catch (error) {
        setAlertMessage('Error fetching data.');
        setAlertType('danger');
      }
    };
    fetchDataById();
  }, [id, fetchData]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleExportToPDF = () => {
    exportToPDF('view-container', title); // Pass the ID of the container to capture
  };

  return (
    <ViewContainer id="view-container">
      <Card>
        <Title>{title}</Title>

        {alertMessage && (
          <Alert message={alertMessage} type={alertType} onClose={() => setAlertMessage('')} />
        )}

        <FieldContainer>
          {viewConfig.map((field) => (
            <Field key={field.name}>
              <span>{field.label}</span>
              <p>{data[field.name] || 'N/A'}</p>
            </Field>
          ))}
        </FieldContainer>

        <ButtonContainer>
          <Button
            onClick={() => (navigateBack ? navigateBack() : navigate(-1))}
            bgColor="#6b7280"
            hoverColor="#4b5563"
            textColor="white"
            padding="15px 30px"
          >
            Go Back
          </Button>
          <Button
            onClick={handleExportToPDF}
            bgColor="#3b82f6"
            hoverColor="#059669"
            textColor="white"
            padding="15px 30px"
          >
            Export as PDF
          </Button>
        </ButtonContainer>
      </Card>
    </ViewContainer>
  );
};

export default EntityDetailsView;
