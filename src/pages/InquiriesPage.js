import React, { useEffect, useState } from 'react';
import { getInquiries, deleteInquiry } from '../services/api';
import InquiriesTable from '../components/InquiriesTable';
import Pagination from '../components/Pagination';
import Searchbar from '../components/Searchbar'; // Import the search bar
import { Link } from 'react-router-dom'; // Import Link for the button
import styled from 'styled-components';


const PageContainer = styled.div`
  background: white;
  padding: 50px 20px;
  min-height: 100vh;
  color: black;
  font-family: 'Montserrat', sans-serif;
`;

const Title = styled.h2`
  color: #111827;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 30px;
  margin-top: 30px
`;
// Add styled components for button and search section
const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CreateButton = styled(Link)`
  background-color: #3b82f6;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2563eb;
  }
`;


const InquiriesPage = () => {
    const [inquiries, setInquiries] = useState([]);
    const [filteredInquiries, setFilteredInquiries] = useState([]); // For search filtering
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // Search query state
    const [currentPage, setCurrentPage] = useState(1);
    const inquiriesPerPage = 9;
  
    useEffect(() => {
      fetchInquiries();
    }, []);
  
    const fetchInquiries = async () => {
      try {
        const response = await getInquiries();
        setInquiries(response.data);
        setFilteredInquiries(response.data); // Set the filtered inquiries initially
        setLoading(false);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
        setLoading(false);
      }
    };
  
    const handleDelete = async (id) => {
      if (window.confirm('Are you sure you want to delete this inquiry?')) {
        try {
          await deleteInquiry(id);
          fetchInquiries(); // Refresh the list after deletion
        } catch (error) {
          console.error('Error deleting inquiry:', error);
        }
      }
    };
  
    // Handle search filtering
    useEffect(() => {
      if (searchQuery) {
        const filtered = inquiries.filter((inquiry) =>
          inquiry.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inquiry.sendToPerson?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredInquiries(filtered);
      } else {
        setFilteredInquiries(inquiries);
      }
    }, [searchQuery, inquiries]);
  
    // Pagination logic
    const indexOfLastInquiry = currentPage * inquiriesPerPage;
    const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;
    const currentInquiries = filteredInquiries.slice(indexOfFirstInquiry, indexOfLastInquiry);
  
    const totalPages = Math.ceil(filteredInquiries.length / inquiriesPerPage);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    const goToPreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const goToNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    return (
      <PageContainer>
        <Title>Inquiries</Title>
  
        {/* Add the actions section with search and button */}
        <ActionsContainer>
          <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <CreateButton to="/create-inquiry">+ Create a New Inquiry</CreateButton>
        </ActionsContainer>
  
        {loading ? (
          <div>Loading inquiries...</div>
        ) : (
          <>
            <InquiriesTable inquiries={currentInquiries} handleDelete={handleDelete} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
              goToPreviousPage={goToPreviousPage}
              goToNextPage={goToNextPage}
            />
          </>
        )}
      </PageContainer>
    );
  };
  
  export default InquiriesPage;
  