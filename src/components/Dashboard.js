import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getApplications } from '../services/api';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Styled container with top padding to account for the fixed navbar
const DashboardContainer = {
  padding: '100px 20px',
  background: 'white',
  minHeight: '100vh',
  fontFamily: 'Montserrat, sans-serif',
};

const Dashboard = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Applications',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [],
      },
    ],
  });

  const [selectedOption, setSelectedOption] = useState('status');
  const chartRef = useRef(); // Ref for capturing the chart as an image
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await getApplications();
      const applications = response.data;

      let dataByOption = {};

      if (selectedOption === 'status') {
        dataByOption = applications.reduce((acc, app) => {
          acc[app.appStatus] = (acc[app.appStatus] || 0) + 1;
          return acc;
        }, {});
      } else if (selectedOption === 'location') {
        dataByOption = applications.reduce((acc, app) => {
          acc[app.projectLocation] = (acc[app.projectLocation] || 0) + 1;
          return acc;
        }, {});
      } else if (selectedOption === 'projectName') {
        dataByOption = applications.reduce((acc, app) => {
          acc[app.projectName] = (acc[app.projectName] || 0) + 1;
          return acc;
        }, {});
      } else if (selectedOption === 'projectValue') {
        dataByOption = applications.reduce((acc, app) => {
          const valueRange =
            app.projectValue < 10000
              ? 'Below 10k'
              : app.projectValue < 50000
              ? '10k - 50k'
              : 'Above 50k';
          acc[valueRange] = (acc[valueRange] || 0) + 1;
          return acc;
        }, {});
      }

      setChartData({
        labels: Object.keys(dataByOption),
        datasets: [
          {
            label: `Number of Applications by ${selectedOption}`,
            backgroundColor: 'rgba(75,192,192,1)',
            data: Object.values(dataByOption),
          },
        ],
      });
    }

    fetchData();
  }, [selectedOption]);

  const downloadPDF = () => {
    const input = chartRef.current;
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.text('Applications Overview', 15, 10);
      pdf.addImage(imgData, 'PNG', 10, 30, 180, 100); // Adjust the size and position of the chart in the PDF
      pdf.save('dashboard.pdf');
    });
  };

  return (
    <div style={DashboardContainer}>
      <h2>Applications Overview</h2>

      {/* Dropdown for selecting chart data */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="chart-option">Choose chart data: </label>
        <select
          id="chart-option"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        >
          <option value="status">Applications by Status</option>
          <option value="location">Applications by Location</option>
          <option value="projectValue">Applications by Project Value</option>
        </select>
      </div>

      <div ref={chartRef}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: `Applications by ${selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}`,
                fontSize: 20,
              },
              legend: {
                display: true,
                position: 'right',
              },
            },
          }}
        />
      </div>

      {/* Export as PDF Button */}
      <button
        onClick={downloadPDF}
        style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          fontSize: '1.1rem',
          fontFamily: 'Montserrat, sans-serif',
          cursor: 'pointer',
          marginTop: '20px',
          marginRight: '10px',
        }}
      >
        Export as PDF
      </button>

      {/* Go Back Button */}
      <button
        style={{
          backgroundColor: '#6b7280',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          fontSize: '1.1rem',
          fontFamily: 'Montserrat, sans-serif',
          cursor: 'pointer',
          marginTop: '20px',
        }}
        onClick={() => navigate('/applications')}
      >
        Go Back to Applications
      </button>
    </div>
  );
};

export default Dashboard;
