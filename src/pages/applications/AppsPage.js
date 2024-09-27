import React from 'react';
import { deleteApplication, getApplications } from '../../services/api';
import PagesData from '../../data/DataManager';

const AppsPage = () => {
  return (
    <PagesData
      title="Applications"
      fetchData={getApplications}
      deleteItem={deleteApplication}
      searchFields={['projectName', 'projectLocation', 'appStatus']}
      createRoute="/create"
      showDashboardButton={true}
      renderCardDetails={app => (
        <>
          <h3>{app.projectName}</h3>
          <p>Location: {app.projectLocation}</p>
          <p>Status: {app.appStatus}</p>
          
          
        </>
      )}
    />
  );
};

export default AppsPage;
