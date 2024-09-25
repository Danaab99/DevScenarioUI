import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import Button from './Button';
import FormGroup from './FormGroup';

const EditContainer = styled.div`
  padding: 50px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
`;

const Form = styled.form`
  background: ${({ theme }) => theme.genericTableCardBackground}; // Adjust this based on your theme colors
  border-radius: 15px;
  padding: 50px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 40px;
  text-align: center;
  margin-top: 20px
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding-top: 20px;
`;

function EntityEditForm({ formData, handleSubmit, handleChange, title, navigateBack, hasUnsavedChanges }) {
  const [formChanged, setFormChanged] = useState(false);

  useEffect(() => {
    // Check if there are unsaved changes
    const changes = hasUnsavedChanges();
    console.log('Checking unsaved changes:', changes);
    setFormChanged(changes);
  }, [formData, hasUnsavedChanges]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formChanged) {
      Swal.fire('No Changes', 'No changes were made to the form.', 'info');
      return;
    }

    try {
      await handleSubmit();
      Swal.fire('Updated!', 'Your information has been updated.', 'success')
        .then(() => navigateBack());
    } catch (error) {
      Swal.fire('Failed!', `Failed to update the information: ${error.message}`, 'error');
    }
  };

  const handleBackClick = (e) => {
    e.preventDefault();  // Prevent any form submission
  
    if (formChanged) {
      Swal.fire({
        title: 'Unsaved Changes',
        text: 'You have unsaved changes. Are you sure you want to leave?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, leave'
      }).then((result) => {
        if (result.isConfirmed) {
          navigateBack();
        }
      });
    } else {
      Swal.fire({
        title: 'Confirm',
        text: 'Do you want to go back?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          navigateBack();
        }
      });
    }
  };
  
  
  return (
    <EditContainer>
      <Title>{title}</Title>
      <Form onSubmit={handleFormSubmit}>
        {formData.map((field, index) => (
          <FormGroup
            key={index}
            label={field.label}
            type={field.type}
            value={field.value}
            onChange={(e) => {
              handleChange(field.name, e.target.value);
              console.log(`Field changed: ${field.name}, New value: ${e.target.value}`);
              setFormChanged(true); // Indicate that form data has changed
            }}
            name={field.name}
            isTextArea={field.isTextArea}
          />
        ))}
        <ButtonContainer>
          <Button type="submit" disabled={!formChanged}>Update</Button>
          <Button type="button" onClick={(e) => handleBackClick(e)}>Go Back</Button>

        </ButtonContainer>
      </Form>
    </EditContainer>
  );
}

export default EntityEditForm;
