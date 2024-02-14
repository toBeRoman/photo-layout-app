// PictureDropzone.tsx
import React, { useState } from 'react';
import { jsPDF } from "jspdf";

const PictureDropzone: React.FC = () => {
  const [pictures, setPictures] = useState<string[]>([]);

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files).slice(0, 12); // Limit to 12 images
    const imageUrls = fileArray.map(file => URL.createObjectURL(file));
    setPictures([...imageUrls]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFiles(event.target.files);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: "a4",
    });
  
    pictures.forEach((url, index) => {
      const x = 0.5 + (index % 3) * 2.5; // Calculate x position
      const y = 1 + Math.floor(index / 3) * 2.5; // Calculate y position
      const width = 2; // Image width
      const height = 2; // Image height
      const borderSize = 0.008; // Border size
  
      // Add image
      doc.addImage(url, 'JPEG', x, y, width, height);
  
      // Draw border
      doc.setDrawColor(0);
      doc.setLineWidth(borderSize);
      doc.rect(x, y, width, height);
  
      if (index === pictures.length - 1) {
        doc.save('layout.pdf');
      }
    });
  };
  

  return (
    <div style={{ width: '8.27in', height: '11.7in', position: 'relative', border: '2px solid black', boxSizing: 'border-box', padding: '10px' }}>
      <input
        type="file"
        multiple
        onChange={handleChange}
        style={{ width: '100%', height: '100%', opacity: 0, position: 'absolute', cursor: 'pointer' }}
        title="Drag and drop images here or click to select"
      />
      {pictures.map((url, index) => (
        <img key={index} src={url} alt="Uploaded" style={{ width: '2in', height: '2in', margin: '4px', border: '2px solid black' }} />
      ))}
      {pictures.length > 0 && (
        <button style={{ position: 'absolute', bottom: '10px', right: '10px' }} onClick={downloadPDF}>
          Download PDF
        </button>
      )}
    </div>
  );
};

export default PictureDropzone;
