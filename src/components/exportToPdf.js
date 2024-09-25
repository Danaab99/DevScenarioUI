import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (elementId, title) => {
  const input = document.getElementById(elementId);
  
  // Hide the buttons temporarily before capturing the screenshot
  const buttons = input.querySelectorAll('button');
  buttons.forEach(button => button.style.display = 'none');

  // Capture the screenshot
  html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${title}.pdf`);

    // Restore the buttons after the PDF is generated
    buttons.forEach(button => button.style.display = 'inline-block');
  });
};
