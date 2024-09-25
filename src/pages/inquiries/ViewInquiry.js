import React from 'react';
import { getInquiryById } from '../../services/api';
import { inquiryFormConfig } from '../../config/formConfig';
import EntityDetailsView from '../../components/EntityDetailsView';

const ViewInquiry = () => {
  return (
    <EntityDetailsView
      title="Inquiry Details"
      viewConfig={inquiryFormConfig}
      fetchData={getInquiryById}
      navigateBack={() => window.history.back()}
    />
  );
};

export default ViewInquiry;
