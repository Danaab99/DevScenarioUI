import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EntityCreationForm from '../../components/EntityCreationForm'; // Reuse GenericForm component
import { createStatusLevel } from '../../services/api'; // API call to create a status level
import { statusLevelFormConfig } from '../../config/formConfig'; // Import the form config

function NewStatusLevel() {
  const [formValues, setFormValues] = useState({
    statusName: '',
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
    const newStatusLevel = { ...formValues };
    await createStatusLevel(newStatusLevel);
  };

  const isFormValid = formValues.statusName.trim() !== '';

  // Check if there are unsaved changes
  const hasUnsavedChanges = () => {
    return JSON.stringify(formValues) !== JSON.stringify(initialFormValues);
  };

  return (
    <EntityCreationForm
      title="Create New Status Level"
      formData={statusLevelFormConfig.map((field) => ({
        ...field,
        value: formValues[field.name],
      }))}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      isFormValid={isFormValid}
      hasUnsavedChanges={hasUnsavedChanges}
      navigateBack={() => navigate('/status-levels')}
    />
  );
}

export default NewStatusLevel;
