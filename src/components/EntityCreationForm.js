import React from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import Button from './Button';

// Styled Components
const CreateContainer = styled.div`
  background: ${({ theme }) => theme.backgroundGradient};  // Assuming you have a gradient in your theme
  
  min-height: 100vh;
  transition: all 0.3s ease;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
`;

const Form = styled.form`
  background: ${({ theme }) => theme.formBackgroundColor};
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 800px; // Larger width for better layout
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  color: 'black';
  border: 2px solid ${({ theme }) => theme.inputBorderColor};
  border-radius: 10px;
  font-size: 16px;
  &:focus {
    border-color: ${({ theme }) => theme.inputFocusBorderColor};
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  color: 'black';
  border: 2px solid ${({ theme }) => theme.inputBorderColor};
  border-radius: 10px;
  font-size: 16px;
  resize: vertical;
  &:focus {
    border-color: ${({ theme }) => theme.inputFocusBorderColor};
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 40px; // More margin for better visual separation
  margin-top: 20px;
`;

const FormGroupContainer = styled.div`
  margin-bottom: 25px; // Slightly more spacing
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 10px; // Increase for clarity
  color: ${({ theme }) => theme.textColor};
`;

// Using styled-components for buttons could allow for more precise styling
const StyledButton = styled(Button)`
  color: 
  width: 100%;
  padding: 10px 0;
  font-size: 18px; // Larger text for better readability
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; // This will place one button on each end of the container
  width: 100%; // Ensure the container spans the full width of its parent
  margin-top: 20px; // Add some top margin for spacing from the form elements
`;

// Function components
const FormGroup = ({ label, type, value, onChange, name, isTextArea, placeholder, required }) => (
  <FormGroupContainer>
    <Label htmlFor={name}>{label}</Label>
    {isTextArea ? (
      <TextArea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    ) : (
      <Input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    )}
  </FormGroupContainer>
);

const EntityCreationForm = ({ title, formData, handleSubmit, handleChange, isFormValid, navigateBack, hasUnsavedChanges }) => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSubmit(); // Execute the form submission logic
      Swal.fire({
        title: 'Success!',
        text: 'The form has been submitted successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        navigateBack();
      });
    } catch (error) {
      Swal.fire('Error', 'There was an issue submitting the form', 'error');
    }
  };

  const handleBackClick = () => {
    if (hasUnsavedChanges()) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You have unsaved changes. If you leave, your changes will not be saved.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Leave',
        cancelButtonText: 'Stay',
      }).then((result) => {
        if (result.isConfirmed) {
          navigateBack();
        }
      });
    } else {
      navigateBack();
    }
  };

  return (
    <CreateContainer>
      <Title>{title}</Title>
      <Form onSubmit={handleFormSubmit}>
        {formData.map((field, index) => (
          <FormGroup
            key={index}
            label={field.label}
            type={field.type}
            value={field.value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            name={field.name}
            isTextArea={field.isTextArea}
            placeholder={field.placeholder}
            required={field.required}
          />
        ))}
       <ButtonContainer>
        <StyledButton type="submit" disabled={!isFormValid}>Submit</StyledButton>
        <StyledButton onClick={handleBackClick}>Go Back</StyledButton>
      </ButtonContainer>
      </Form>
      
    </CreateContainer>
  );
};

export default EntityCreationForm;
