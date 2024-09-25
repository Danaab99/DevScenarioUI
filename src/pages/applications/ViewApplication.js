import React from 'react';
import { getApplicationById } from '../../services/api';
import { applicationFormConfig } from '../../config/formConfig';
import EntityDetailsView from '../../components/EntityDetailsView';

const ViewApplication = () => {
  return (
    <EntityDetailsView
      title="Application Details"
      viewConfig={applicationFormConfig}
      fetchData={getApplicationById}
      navigateBack={() => window.history.back()}
    />
  );
};

export default ViewApplication;