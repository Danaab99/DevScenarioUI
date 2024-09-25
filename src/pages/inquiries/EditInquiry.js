import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EntityEditForm from '../../components/EntityEditForm'; // Reusable form component
import useFormData from '../../hooks/useFormData'; // Custom hook for handling form data
import { getInquiryById, updateInquiry } from '../../services/api'; // API calls

const EditInquiry = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Use custom hook to manage form data
  const {
    data: inquiry,
    handleChange,
    handleSubmit,
    initialFormValues,
  } = useFormData(getInquiryById, updateInquiry, id);

  // Define hasUnsavedChanges function to check for unsaved changes
  const hasUnsavedChanges = () => {
    return JSON.stringify(inquiry) !== JSON.stringify(initialFormValues.current);
  };

  // Map inquiry data to form fields
  const formData = [
    { label: 'Send To Person', name: 'sendToPerson', type: 'text', value: inquiry.sendToPerson },
    { label: 'Subject', name: 'subject', type: 'text', value: inquiry.subject },
    { label: 'Inquiry', name: 'inquiry', isTextArea: true, value: inquiry.inquiry },
    { label: 'Response', name: 'response', isTextArea: true, value: inquiry.response },
    { label: 'Asked Date', name: 'askedDt', type: 'date', value: inquiry.askedDt },
    { label: 'Completed Date', name: 'completedDt', type: 'date', value: inquiry.completedDt },
  ];

  return (
    <EntityEditForm
      formData={formData}
      handleSubmit={handleSubmit} // Submission will be handled in GenericEditForm
      handleChange={handleChange}
      title="Edit Inquiry"
      navigateBack={() => navigate('/inquiries')}
      hasUnsavedChanges={hasUnsavedChanges} // Check for unsaved changes
    />
  );
};

export default EditInquiry;
