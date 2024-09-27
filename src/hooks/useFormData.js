import { useState, useEffect, useRef } from 'react';

function useFormData(fetchDataFunc, updateDataFunc, id) {
  const [data, setData] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const initialFormValues = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFunc(id);
        setData(response.data);
        initialFormValues.current = { ...response.data };
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
        setAlertMessage('Failed to fetch data.');
        setAlertType('danger');
      }
    };

    fetchData();
  }, [id, fetchDataFunc]);

  const handleSubmit = async () => {
    try {
      await updateDataFunc(id, data);
      setAlertMessage('Data updated successfully!');
      setAlertType('success');
      setShowOptions(false);
      return Promise.resolve(); // Ensure to return a resolved promise
    } catch (error) {
      console.error(`Error updating data: ${error}`);
      setAlertMessage('Failed to update data.');
      setAlertType('danger');
      return Promise.reject(error); // Ensure to return a rejected promise
    }
  };

  const handleChange = (name, value) => {
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  return {
    data,
    setData,
    alertMessage,
    setAlertMessage,
    alertType,
    setAlertType,
    showOptions,
    setShowOptions,
    handleSubmit,
    handleChange,
    initialFormValues
  };
}

export default useFormData;
