import React from 'react';
import { getInquiries, deleteInquiry } from '../../services/api';
import PagesData from '../../data/DataManager';

const InquiriesPage = () => {
  return (
    <PagesData
      title="Inquiries"
      fetchData={getInquiries}
      deleteItem={deleteInquiry}
      searchFields={['subject', 'sendToPerson', 'applicationId']}
      createRoute="/create-inquiry"
      showDashboardButton={false}
      renderCardDetails={inquiry => (
        <>
          <h3>{inquiry.subject}</h3>
          <p>Person: {inquiry.sendToPerson}</p>
          <p>Asked Date: {new Date(inquiry.askedDt).toLocaleDateString()}</p>
          <p>Application Id: {inquiry.applicationId}</p>
        </>
      )}
    />
  );
};

export default InquiriesPage;
