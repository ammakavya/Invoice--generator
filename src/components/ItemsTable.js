import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ItemsTable = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState({});

  const onSubmit = (formData) => {
    setData(formData);
  };

  const generatePDF = async () => {
    const input = document.getElementById('pdfContent');
    input.style.display = 'block'; 

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    input.style.display = 'none';

    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('invoice.pdf');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('yourCompany')} placeholder="Your Company" />
        <input {...register('yourName')} placeholder="Your Name" />
        <input {...register('companyGSTIN')} placeholder="Company GSTIN" />
        <button type="submit">Submit</button>
      </form>

      <div id="pdfContent" style={{ display: 'none' }}>
        {data.yourCompany && <p>Your Company: {data.yourCompany}</p>}
        {data.yourName && <p>Your Name: {data.yourName}</p>}
        {data.companyGSTIN && <p>Company GSTIN: {data.companyGSTIN}</p>}
      </div>

      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default ItemsTable;
