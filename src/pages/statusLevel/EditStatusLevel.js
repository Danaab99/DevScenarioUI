import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStatusLevelById, updateStatusLevel } from '../../services/api'; // API calls
import EntityEditForm from '../../components/EntityEditForm'; // Reusable form component

const EditStatusLevel = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [statusLevel, setStatusLevel] = useState({ statusName: '' });
  const initialFormValues = useRef({}); // To track initial form values

  // Fetch status level data by ID
  useEffect(() => {
    const fetchStatusLevel = async () => {
      try {
        const response = await getStatusLevelById(id);
        setStatusLevel(response.data);
        initialFormValues.current = response.data; // Store initial form values
      } catch (error) {
        console.error('Error fetching status level:', error);
      }
    };
    fetchStatusLevel();
  }, [id]);

  // Handle form field changes
  const handleChange = (name, value) => {
    setStatusLevel((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      await updateStatusLevel(id, statusLevel);
      // Redirect after success
      navigate('/status-levels');
    } catch (error) {
      console.error('Error updating status level:', error);
    }
  };

  // Check if the form has unsaved changes
  const hasUnsavedChanges = () => {
    return JSON.stringify(statusLevel) !== JSON.stringify(initialFormValues.current);
  };

  // Prepare form data for the GenericEditForm
  const formData = [
    { label: 'Status Name', name: 'statusName', type: 'text', value: statusLevel.statusName },
  ];

  return (
    <EntityEditForm
      formData={formData}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      title="Edit Status Level"
      navigateBack={() => navigate('/status-levels')}
      hasUnsavedChanges={hasUnsavedChanges}
    />
  );
};

export default EditStatusLevel;
