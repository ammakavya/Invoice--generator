import React, { useRef, useState, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";

// PrintComponent is now wrapped with forwardRef
const PrintComponent = forwardRef(({ formData }, ref) => {
  return (
    <div ref={ref}>
      <h1>Form Summary</h1>

      {/* Conditionally render fields only if they have values */}
      {formData.name && (
        <div>
          <strong>Name:</strong> {formData.name}
        </div>
      )}

      {formData.email && (
        <div>
          <strong>Email:</strong> {formData.email}
        </div>
      )}

      {formData.phone && (
        <div>
          <strong>Phone:</strong> {formData.phone}
        </div>
      )}
    </div>
  );
});

// Main component that handles the form and PDF generation
const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const componentRef = useRef();

  // Function to handle PDF generation
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Form Summary",
  });

  return (
    <div>
      <h1>Fill the Form</h1>

      {/* Form inputs */}
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <br />

      <input
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <br />

      <input
        type="text"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <br />

      {/* Button to generate PDF */}
      <button onClick={handlePrint}>Print / Generate PDF</button>

      {/* This component will be rendered in the PDF */}
      <div style={{ display: "none" }}>
        <PrintComponent ref={componentRef} formData={formData} />
      </div>
    </div>
  );
};

export default FormComponent;
