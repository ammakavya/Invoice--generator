import React, { useRef, useState, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintComponent = forwardRef(({ formData }, ref) => {
    return (
      <div ref={ref}>
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