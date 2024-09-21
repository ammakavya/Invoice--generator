import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import InvoiceComponent from './components/InvoiceComponent';
import FormComponent from './components/FormComponent';
import { Margin } from '@mui/icons-material';
import { Box } from '@mui/material';

const App = () => {
  // Your form data and states here

  const generatePDF = () => {
    const input = document.getElementById('pdfContent'); // The ID of the element you want to convert
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 400; // Width of the image in PDF
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      position += imgHeight;

      // If the content exceeds one page
      if (imgHeight >= pageHeight) {
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      }

      pdf.save('invoice.pdf'); // Save the generated PDF
    });
  };

  return (
    <div className='app'>
      <div id="pdfContent" style={styles.contentContainer}>
        {/* Content and button displayed side by side */}
        <div style={styles.invoiceComponent}>
          <InvoiceComponent />
        </div>
        <Box sx={{marginTop:'10rem',marginRight:'10rem'}}>
        <div style={styles.buttonContainer}>
          <button onClick={generatePDF}>Generate PDF</button>
        </div>
        </Box>
       
      </div>
      {/* Uncomment to use FormComponent */}
      {/* <FormComponent /> */}
    </div>
  );
};

// Inline styles to display content side by side
const styles = {
  contentContainer: {
    Margintop:'10rem',
    display: 'flex', 
        // Flexbox layout
   // Vertically center
    justifyContent: 'space-between', // Add space between the components
  },
  invoiceComponent: {
    flex: 1, // Take up the remaining space
    marginRight: '20px', // Add some space between component and button
  },
  buttonContainer: {
    flexShrink: 0,
    marginRight:'10rem',
    
    marginbottom:'10rem' ,
    margintop :'15rem'// Prevent button from shrinking
  },
};

export default App;
