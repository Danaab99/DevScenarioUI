import axios from 'axios';

const API_URL = 'https://localhost:7084/api/application';  // Ensure the correct URL is used
const API_URL_1 = 'https://localhost:7084/api/inquries'; 
const API_URL_2 = 'https://localhost:7084/api/statuslevel'; 

export const getApplications = () => axios.get(API_URL);

export const getApplicationById = (id) => axios.get(`${API_URL}/${id}`);

export const createApplication = (newApplication) => axios.post(API_URL, newApplication);

export const updateApplication = (id, updatedApplication) => axios.put(`${API_URL}/${id}`, updatedApplication);

export const deleteApplication = (id) => axios.delete(`${API_URL}/${id}`);

export const getInquiries = () => axios.get(`${API_URL_1}`);
export const getInquiryById = (id) => axios.get(`${API_URL_1}/${id}`);   // Add this function
export const createInquiry = (newInquiry) => axios.post(API_URL_1, newInquiry);  // Add this if needed
export const updateInquiry = (id, updatedInquiry) => axios.put(`${API_URL_1}/${id}`, updatedInquiry);  // Add this function
export const deleteInquiry = (id) => axios.delete(`${API_URL_1}/${id}`);

export const getStatusLevels = () => axios.get(API_URL_2);

export const deleteStatusLevel = (id) => axios.delete(`${API_URL_2}/${id}`);
export const createStatusLevel = (newStatusLevel) => axios.post(`${API_URL_2}`, newStatusLevel);

export const getStatusLevelById = (id) => axios.get(`${API_URL_2}/${id}`);

export const updateStatusLevel = (id, updatedStatusLevel) => axios.put(`${API_URL_2}/${id}`, updatedStatusLevel);
