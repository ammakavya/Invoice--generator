import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import InvoiceComponent from './components/InvoiceComponent';
import { Box } from '@mui/material';

const App = () => {
  const generatePDF = () => {
    
    const input = document.getElementById('pdfContent'); 
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 350; 
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      position += imgHeight;

      
      if (imgHeight >= pageHeight) {
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      }

      pdf.save('invoice.pdf'); 
    });
  };

  return (
    <div className='app'>
      <div id="pdfContent" style={styles.contentContainer}>
       
        <div style={styles.invoiceComponent}>
          <InvoiceComponent />
        </div>
        <Box sx={{marginTop:'10rem',marginRight:'10rem'}}>
        <div style={styles.buttonContainer}>
          <button  onClick={generatePDF}>Generate PDF</button>
        </div>
        </Box>
       
      </div>
    </div>
  );
};


const styles = {
  contentContainer: {
    Margintop:'10rem',
    display: 'flex', 
       
    justifyContent: 'space-between', 
  },
  invoiceComponent: {
    flex: 1, 
    marginRight: '20px',
  },
  buttonContainer: {
    flexShrink: 0,
    marginRight:'10rem',
    
    marginbottom:'10rem' ,
    margintop :'15rem'
  },
};

export default App;
