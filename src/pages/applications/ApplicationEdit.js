import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EntityEditForm from '../../components/EntityEditForm'; // Adjust path if needed
import useFormData from '../../hooks/useFormData';
import { getApplicationById, updateApplication } from '../../services/api';

const EditApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Use custom hook to manage form data
  const {
    data: application,
    handleChange,
    handleSubmit,
    initialFormValues, // Make sure to include initialFormValues
    alertMessage,
    alertType,
    showOptions
  } = useFormData(getApplicationById, updateApplication, id);

  // Define hasUnsavedChanges function to check for unsaved changes
  const hasUnsavedChanges = () => {
    return JSON.stringify(application) !== JSON.stringify(initialFormValues.current);
  };

  // Map application data to form fields
  const formData = [
    { label: 'Application Name', name: 'projectName', type: 'text', value: application.projectName || '' },
    { label: 'Project Reference', name: 'projectRef', type: 'text', value: application.projectRef || '' },
    { label: 'Start Date', name: 'startDate', type: 'date', value: application.startDt || '' },
    { label: 'End Date', name: 'endDate', type: 'date', value: application.endDt || '' },
    { label: 'Status', name: 'statusId', type: 'text', value: application.statusId || '' },
    { label: 'Notes', name: 'notes', isTextArea: true, value: application.notes || '' },
  ];

  return (
    <EntityEditForm
      formData={formData}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      title="Edit Application"
      navigateBack={() => navigate('/applications')}
      hasUnsavedChanges={hasUnsavedChanges} // Pass hasUnsavedChanges function
    />
  );
};

export default EditApplication;
