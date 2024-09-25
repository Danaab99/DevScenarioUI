import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EntityCreationForm from '../../components/EntityCreationForm'; // Import the GenericForm component
import { createApplication } from '../../services/api';
import { applicationFormConfig } from '../../config/formConfig'; // Import the form config

function NewApplication() {
  const [formValues, setFormValues] = useState({
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
  const [initialFormValues] = useState({ ...formValues }); // Save initial form values
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const newApplication = { ...formValues };
    await createApplication(newApplication);
  };

  const isFormValid = Object.values(formValues).every((value) => value.trim() !== '');

  // Check if there are unsaved changes
  const hasUnsavedChanges = () => {
    return JSON.stringify(formValues) !== JSON.stringify(initialFormValues);
  };

  return (
    <EntityCreationForm
      title="Create New Application"
      formData={applicationFormConfig.map((field) => ({
        ...field,
        value: formValues[field.name],
      }))}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      isFormValid={isFormValid}
      hasUnsavedChanges={hasUnsavedChanges} // Pass hasUnsavedChanges
      navigateBack={() => navigate('/applications')}
    />
  );
}

export default NewApplication;
