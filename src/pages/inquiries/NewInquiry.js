import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EntityCreationForm from '../../components/EntityCreationForm'; // Reuse the GenericForm component
import { createInquiry } from '../../services/api'; // API to create inquiry
import { inquiryFormConfig } from '../../config/formConfig'; // Import the form config

function NewInquiry() {
  const [formValues, setFormValues] = useState({
    sendToPerson: '',
    sendToRole: '',
    subject: '',
    inquiry: '',
    response: '',
    askedDt: '',
    completedDt: '',
    applicationId: '',
  });
  const [initialFormValues] = useState({ ...formValues }); // Save initial form values
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const newInquiry = { ...formValues };
    await createInquiry(newInquiry);
  };

  const isFormValid = Object.values(formValues).every((value) => value.trim() !== '');

  // Check if there are unsaved changes
  const hasUnsavedChanges = () => {
    return JSON.stringify(formValues) !== JSON.stringify(initialFormValues);
  };

  return (
    <EntityCreationForm
      title="Create New Inquiry"
      formData={inquiryFormConfig.map((field) => ({
        ...field,
        value: formValues[field.name],
      }))}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      isFormValid={isFormValid}
      hasUnsavedChanges={hasUnsavedChanges} // Pass hasUnsavedChanges
      navigateBack={() => navigate('/inquiries')}
    />
  );
}

export default NewInquiry;
