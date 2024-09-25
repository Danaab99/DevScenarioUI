import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EntityDisplayGrid from '../components/EntityDisplayGrid';
import Pagination from '../components/Pagination';
import SearchBar from '../components/Searchbar';
import styled, { keyframes } from 'styled-components';
import Button from '../components/Button';
import Swal from 'sweetalert2';
import { MdAddCircleOutline, MdDashboard, MdViewList } from 'react-icons/md'; 

// Content container with the fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ContentContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-in-out;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 10px; /* Smaller padding for small screens */
  }
`;

const Title = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 20px;
  line-height: 1.1;
  margin-top: 40px;
  display: flex; // Add flex layout
  align-items: center; // Align the text and icon vertically
  gap: 8px; // Space between icon and text

  @media (max-width: 768px) {
    font-size: 2rem; // Smaller title on small screens
  }

  @media (max-width: 480px) {
    font-size: 1.8rem; // Even smaller for extra small screens
  }
`;

const Message = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  color:  ${({ theme }) => theme.textColor};
  background-color:  ${({ theme }) => theme.backgroundColor};
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  margin-top: 20px;
  border: 1px solid #ff6b6b;

  @media (max-width: 768px) {
    font-size: 1rem; /* Adjust font size on small screens */
    padding: 8px;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px; /* Stack items vertically with gap */
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const DataPage = ({
  title,
  fetchData,
  deleteItem,
  searchFields,
  renderCardDetails,
  createRoute,
  showDashboardButton = false,
}) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await fetchData();
        const dataWithTypes = response.data.map(item => ({
          ...item,
          type: title.toLowerCase().replace(' ', '-') // Dynamically generate the type from the title
        }));
        setData(dataWithTypes);
        setFilteredData(dataWithTypes);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
        setLoading(false);
      }
    };
    fetchAllData();
  }, [fetchData, title]);
  
  // Handle deletion of item
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        await deleteItem(id); // Call the delete API
        const updatedData = data.filter((item) => item.id !== id);
        const updatedFilteredData = filteredData.filter((item) => item.id !== id);

        setData(updatedData);
        setFilteredData(updatedFilteredData);

        // Optionally reset pagination if the last item on the page is deleted
        if (currentPage > Math.ceil(updatedFilteredData.length / itemsPerPage)) {
          setCurrentPage(Math.max(1, currentPage - 1));
        }

        // Show success message
        Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
      }
    } catch (error) {
      console.error(`Error deleting ${title}:`, error);
      Swal.fire('Error!', 'There was an issue deleting the item.', 'error');
    }
  };

  // Handle search filtering based on query
  useEffect(() => {
    if (searchQuery) {
      const filtered = data.filter(item =>
        searchFields.some(field => {
          const fieldValue = item[field];
          if (fieldValue !== undefined && fieldValue !== null) {
            if (typeof fieldValue === 'string') {
              return fieldValue.toLowerCase().includes(searchQuery.toLowerCase());
            }
            if (typeof fieldValue === 'number') {
              return fieldValue.toString().includes(searchQuery);
            }
          }
          return false;
        })
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data, searchFields]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const goToPreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(totalPages, prev + 1));

  return (
    <div style={{ background: 'white', padding: '50px 20px', minHeight: '100vh', fontFamily: 'Montserrat, sans-serif' }}>
      <Title><MdViewList style={{ marginRight: '8px', fontSize: '2.3rem' , marginTop:'5px'}} />{title}</Title>

      <ActionsContainer>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ButtonGroup>
          <Button
            onClick={() => navigate(createRoute)}
            bgColor="#6b7280"
            hoverColor="#4b5563"
          >
            <MdAddCircleOutline style={{ marginRight: '5px' }} /> 
            Create New 
          </Button>
          {showDashboardButton && (
            <Button
              onClick={() => navigate("/dashboard")}
              bgColor="#2563eb"
              hoverColor="#1e40af"
              
            >
                <MdDashboard style={{ marginRight: '5px' }}> Dashboard</MdDashboard>
              Dashboard
            </Button>
          )}
        </ButtonGroup>
      </ActionsContainer>

      <ContentContainer key={currentPage}>
        {filteredData.length > 0 ? (
          <EntityDisplayGrid
            items={filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
            handleDelete={handleDelete}
            renderCardDetails={renderCardDetails}
          />
        ) : (
          <Message>No {title} found matching your search query.</Message>
        )}
      </ContentContainer>

      {filteredData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={setCurrentPage}
          goToPreviousPage={goToPreviousPage}
          goToNextPage={goToNextPage}
        />
      )}
    </div>
  );
};

export default DataPage;
