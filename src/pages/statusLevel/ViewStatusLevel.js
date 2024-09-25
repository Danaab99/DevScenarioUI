import React from 'react';
import { getStatusLevelById } from '../../services/api';
import { statusLevelFormConfig } from '../../config/formConfig'; // Import form config for status levels
import GenericView from '../../components/EntityDetailsView'; // Import GenericView component
import EntityDetailsView from '../../components/EntityDetailsView';

const ViewStatusLevel = () => {
  return (
    <EntityDetailsView
      title="Status Level Details"
      viewConfig={statusLevelFormConfig} // Pass the status level form config
      fetchData={getStatusLevelById} // API function to fetch status level by ID
      navigateBack={() => window.history.back()} // Define the go-back action
    />
  );
};

export default ViewStatusLevel;
