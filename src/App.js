import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import InvoiceComponent from './components/InvoiceComponent';

const MyComponent = () => {
  // Your form data and states here

  const generatePDF = () => {
    const input = document.getElementById('pdfContent'); // The ID of the element you want to convert
    html2canvas(input, { scale: 2}).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 400 // Width of the image in PDF
      const pageHeight = pdf.internal.pageSize.height; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      position += heightLeft;

      // If the content exceeds one page
      if (heightLeft >= pageHeight) {
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      }

      pdf.save('invoice.pdf'); // Save the generated PDF
    });
  };

  return (
    <div className='app'>
      <div id="pdfContent">
    <InvoiceComponent/>
      </div>
      <div>
      <button onClick={generatePDF}>Generate PDF</button>
      </div>
     
    </div>
  );
};

export default MyComponent;
