import React from 'react';
import { deleteStatusLevel, getStatusLevels } from '../../services/api';
import PagesData from '../../data/DataManager';

const StatusLevelsPage = () => {
  return (
    <PagesData
      title="Status Levels"
      fetchData={getStatusLevels}
      deleteItem={deleteStatusLevel}
      searchFields={['statusName', 'id']}
      createRoute="/create-status-level"
      showDashboardButton={false}
      renderCardDetails={level => (
        <>
          <h3>{level.statusName}</h3>
          <p>ID: {level.id}</p>
        </>
      )}
      handleSearch={(item, searchQuery) => {
        return ['statusName', 'id'].some(field => {
          const fieldValue = item[field];

          // Handle field value only if it exists
          if (fieldValue !== undefined && fieldValue !== null) {
            // For strings, apply toLowerCase and compare
            if (typeof fieldValue === 'string') {
              return fieldValue.toLowerCase().includes(searchQuery.toLowerCase());
            }

            // For numbers, compare directly (e.g., for 'id')
            if (typeof fieldValue === 'number') {
              return fieldValue.toString().includes(searchQuery);
            }
          }

          return false; // If the field is not string or number, return false
        });
      }}
    />
  );
};

export default StatusLevelsPage;
