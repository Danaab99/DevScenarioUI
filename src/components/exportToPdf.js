import jsPDF from 'jspdf';
import 'jspdf-autotable';

const exportToPDF = (data) => {
  const doc = new jsPDF();
  doc.text('Applications', 14, 16);
  
  const tableColumn = ['ID', 'Project Name', 'Status', 'Start Date'];
  const tableRows = [];

  data.forEach(app => {
    const appData = [
      app.id,
      app.projectName,
      app.appStatus,
      app.startDate
    ];
    tableRows.push(appData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  doc.save('applications.pdf');
};
